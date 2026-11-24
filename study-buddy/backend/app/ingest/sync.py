"""Leest de map `topics/` in en houdt onderwerpen en documenten in de database bij.

Structuur per onderwerp:
    topics/<id>/topic.yaml      naam, beschrijving, webpagina's, ...
    topics/<id>/gedrag.md       didactisch gedrag van de tutor voor dit onderwerp
    topics/<id>/documenten/     pdf, docx, pptx, md, txt, vtt, srt, html
"""

import hashlib
import logging
from pathlib import Path

import yaml
from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from .. import llm
from ..config import get_settings
from ..models import Chunk, Document, Topic
from ..websearch import fetch_page
from .chunking import chunk_sections
from .parsers import SUPPORTED, Section, kind_for, parse_file, _markdown

log = logging.getLogger(__name__)

EMBED_BATCH = 32


def sync_all(db: Session) -> dict:
    root = get_settings().topics_dir
    report: dict = {}
    seen = set()
    if root.exists():
        for folder in sorted(p for p in root.iterdir() if p.is_dir() and (p / "topic.yaml").exists()):
            seen.add(folder.name)
            try:
                report[folder.name] = sync_topic(db, folder)
            except Exception as exc:
                db.rollback()
                log.exception("Onderwerp %s kon niet worden ingelezen", folder.name)
                report[folder.name] = {"fout": str(exc)}
    for topic in db.scalars(select(Topic)):
        if topic.id not in seen and topic.active:
            topic.active = False  # map verwijderd: verbergen, gesprekken blijven bewaard
    db.commit()
    return report


def sync_topic(db: Session, folder: Path) -> dict:
    cfg = yaml.safe_load((folder / "topic.yaml").read_text(encoding="utf-8")) or {}
    behaviour_file = folder / "gedrag.md"
    topic = db.get(Topic, folder.name) or Topic(id=folder.name)
    topic.name = cfg.get("naam", folder.name)
    topic.description = cfg.get("beschrijving", "")
    topic.active = bool(cfg.get("actief", True))
    topic.behaviour = behaviour_file.read_text(encoding="utf-8") if behaviour_file.exists() else ""
    topic.config = {k: v for k, v in cfg.items() if k not in {"naam", "beschrijving", "actief"}}
    db.add(topic)
    db.commit()

    titles: dict = cfg.get("titels", {}) or {}
    wanted: dict[str, tuple[str, str, callable]] = {}

    docs_dir = folder / "documenten"
    if docs_dir.exists():
        for path in sorted(docs_dir.rglob("*")):
            if path.is_file() and path.suffix.lower() in SUPPORTED:
                key = str(path.relative_to(docs_dir))
                title = titles.get(key) or titles.get(path.name) or path.stem.replace("_", " ")
                wanted[key] = (title, kind_for(path), lambda p=path: (_file_hash(p), lambda: parse_file(p)))

    for entry in cfg.get("webpaginas", []) or []:
        url = entry if isinstance(entry, str) else entry.get("url")
        title = None if isinstance(entry, str) else entry.get("titel")
        if url:
            wanted[url] = (title, "web", lambda u=url: _web_loader(u))

    existing = {d.source_key: d for d in db.scalars(select(Document).where(Document.topic_id == topic.id))}
    stats = {"nieuw": 0, "bijgewerkt": 0, "ongewijzigd": 0, "verwijderd": 0, "fouten": []}

    for key, (title, kind, loader) in wanted.items():
        try:
            content_hash, parse = loader()
        except Exception as exc:
            stats["fouten"].append(f"{key}: {exc}")
            continue
        doc = existing.get(key)
        if doc and doc.content_hash == content_hash:
            stats["ongewijzigd"] += 1
            _backfill_embeddings(db, doc)
            continue
        try:
            sections = parse()
            if isinstance(sections, tuple):  # webpagina: (titel, secties)
                page_title, sections = sections
                title = title or page_title or key
        except Exception as exc:
            stats["fouten"].append(f"{key}: {exc}")
            continue
        if doc:
            db.delete(doc)
            db.flush()
            stats["bijgewerkt"] += 1
        else:
            stats["nieuw"] += 1
        _store(db, topic.id, key, title or key, kind, content_hash, sections)
        db.commit()
        log.info("Ingelezen: %s / %s", topic.id, key)

    for key, doc in existing.items():
        if key not in wanted:
            db.delete(doc)
            stats["verwijderd"] += 1
    db.commit()
    return stats


def _store(db, topic_id, key, title, kind, content_hash, sections: list[Section]) -> None:
    doc = Document(topic_id=topic_id, source_key=key, title=title[:300], kind=kind, content_hash=content_hash)
    db.add(doc)
    db.flush()
    chunks = chunk_sections(sections)
    rows = [Chunk(document_id=doc.id, topic_id=topic_id, location=c.location[:200], text=c.text) for c in chunks]
    for i in range(0, len(rows), EMBED_BATCH):
        batch = rows[i : i + EMBED_BATCH]
        vectors = llm.embed([f"{title}\n{c.text}" for c in batch], purpose="passage")
        if vectors:
            for row, vec in zip(batch, vectors):
                row.embedding = vec
    db.add_all(rows)


def _backfill_embeddings(db: Session, doc: Document) -> None:
    """Vult ontbrekende embeddings aan, bijv. als de sleutel pas later is ingesteld."""
    if not get_settings().embeddings_enabled:
        return
    missing = db.scalars(select(Chunk).where(Chunk.document_id == doc.id, Chunk.embedding.is_(None))).all()
    for i in range(0, len(missing), EMBED_BATCH):
        batch = missing[i : i + EMBED_BATCH]
        vectors = llm.embed([f"{doc.title}\n{c.text}" for c in batch], purpose="passage")
        if not vectors:
            return
        for row, vec in zip(batch, vectors):
            row.embedding = vec
        db.commit()


def _file_hash(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for block in iter(lambda: f.read(1 << 20), b""):
            h.update(block)
    return h.hexdigest()


def _web_loader(url: str):
    page = fetch_page(url, max_chars=200_000)
    if "error" in page:
        raise RuntimeError(page["error"])
    content_hash = hashlib.sha256(page["text"].encode()).hexdigest()
    return content_hash, lambda: (page["title"], _markdown(page["text"]))


def clear_topic(db: Session, topic_id: str) -> None:
    db.execute(delete(Document).where(Document.topic_id == topic_id))
    db.commit()
