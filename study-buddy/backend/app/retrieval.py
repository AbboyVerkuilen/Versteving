"""Hybride zoeken in de lesstof: woorden (Postgres full-text, Nederlands) + betekenis (embeddings)."""

import re
from dataclasses import dataclass

from sqlalchemy import text
from sqlalchemy.orm import Session

from . import llm


@dataclass
class Hit:
    chunk_id: int
    title: str
    location: str
    text: str
    score: float


def _or_query(query: str) -> str:
    words = [w for w in re.findall(r"[\wÀ-ÿ]+", query.lower()) if len(w) > 1]
    return " | ".join(dict.fromkeys(words))


def search(db: Session, topic_id: str, query: str, k: int = 6) -> list[Hit]:
    ranked: dict[int, float] = {}
    rows: dict[int, tuple] = {}

    tsq = _or_query(query)
    if tsq:
        res = db.execute(
            text(
                """
                SELECT c.id, d.title, c.location, c.text
                FROM chunks c JOIN documents d ON d.id = c.document_id
                WHERE c.topic_id = :t AND c.tsv @@ to_tsquery('dutch', :q)
                ORDER BY ts_rank_cd(c.tsv, to_tsquery('dutch', :q)) DESC
                LIMIT 20
                """
            ),
            {"t": topic_id, "q": tsq},
        ).all()
        for rank, r in enumerate(res):
            ranked[r[0]] = ranked.get(r[0], 0) + 1 / (60 + rank)
            rows[r[0]] = r

    vec = llm.embed([query], purpose="query")
    if vec:
        res = db.execute(
            text(
                """
                SELECT c.id, d.title, c.location, c.text
                FROM chunks c JOIN documents d ON d.id = c.document_id
                WHERE c.topic_id = :t AND c.embedding IS NOT NULL
                  AND vector_dims(c.embedding) = :dims
                ORDER BY c.embedding <=> CAST(:v AS vector)
                LIMIT 20
                """
            ),
            {"t": topic_id, "v": str(vec[0]), "dims": len(vec[0])},
        ).all()
        for rank, r in enumerate(res):
            ranked[r[0]] = ranked.get(r[0], 0) + 1 / (60 + rank)
            rows[r[0]] = r

    best = sorted(ranked.items(), key=lambda kv: kv[1], reverse=True)[:k]
    return [Hit(cid, rows[cid][1], rows[cid][2], rows[cid][3], score) for cid, score in best]
