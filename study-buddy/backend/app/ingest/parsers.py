"""Zet documenten om naar tekstsecties met een vindplaats ("p. 12", "dia 4", "03:15", ...)."""

import re
from dataclasses import dataclass
from pathlib import Path

from bs4 import BeautifulSoup


@dataclass
class Section:
    location: str
    text: str


SUPPORTED = {".pdf", ".docx", ".pptx", ".txt", ".md", ".vtt", ".srt", ".html", ".htm"}


def kind_for(path: Path) -> str:
    ext = path.suffix.lower()
    return {
        ".pdf": "pdf",
        ".docx": "word",
        ".pptx": "powerpoint",
        ".vtt": "transcript",
        ".srt": "transcript",
        ".html": "web",
        ".htm": "web",
    }.get(ext, "tekst")


def parse_file(path: Path) -> list[Section]:
    ext = path.suffix.lower()
    if ext == ".pdf":
        return _pdf(path)
    if ext == ".docx":
        return _docx(path)
    if ext == ".pptx":
        return _pptx(path)
    if ext in {".vtt", ".srt"}:
        return _transcript(path.read_text(encoding="utf-8", errors="replace"))
    if ext in {".html", ".htm"}:
        return parse_html(path.read_text(encoding="utf-8", errors="replace"))
    if ext == ".md":
        return _markdown(path.read_text(encoding="utf-8", errors="replace"))
    return [Section("", path.read_text(encoding="utf-8", errors="replace"))]


def _clean(text: str) -> str:
    text = text.replace("­", "")  # zachte afbreekstreepjes
    text = re.sub(r"-\n(?=[a-z])", "", text)  # woordafbreking aan regeleinde
    text = re.sub(r"[ \t]+", " ", text)
    return re.sub(r"\n{3,}", "\n\n", text).strip()


def _pdf(path: Path) -> list[Section]:
    from pypdf import PdfReader

    reader = PdfReader(str(path))
    sections = []
    for i, page in enumerate(reader.pages, start=1):
        label = i
        try:
            label = reader.page_labels[i - 1] or i  # gedrukt paginanummer als dat bestaat
        except Exception:
            pass
        text = _clean(page.extract_text() or "")
        if text:
            sections.append(Section(f"p. {label}", text))
    return sections


def _docx(path: Path) -> list[Section]:
    import docx

    doc = docx.Document(str(path))
    sections: list[Section] = []
    heading, buf = "", []
    for para in doc.paragraphs:
        style = (para.style.name or "").lower() if para.style is not None else ""
        if style.startswith(("heading", "kop", "title", "titel")) and para.text.strip():
            if buf:
                sections.append(Section(heading, _clean("\n".join(buf))))
            heading, buf = para.text.strip()[:150], []
        elif para.text.strip():
            buf.append(para.text)
    for table in doc.tables:
        rows = [" | ".join(c.text.strip() for c in row.cells) for row in table.rows]
        buf.append("\n".join(rows))
    if buf:
        sections.append(Section(heading, _clean("\n".join(buf))))
    return sections


def _pptx(path: Path) -> list[Section]:
    from pptx import Presentation

    prs = Presentation(str(path))
    sections = []
    for i, slide in enumerate(prs.slides, start=1):
        parts = []
        for shape in slide.shapes:
            if shape.has_text_frame:
                parts.append(shape.text_frame.text)
            if getattr(shape, "has_table", False) and shape.has_table:
                for row in shape.table.rows:
                    parts.append(" | ".join(c.text for c in row.cells))
        if slide.has_notes_slide and slide.notes_slide.notes_text_frame is not None:
            notes = slide.notes_slide.notes_text_frame.text.strip()
            if notes:
                parts.append(f"Notities: {notes}")
        text = _clean("\n".join(parts))
        if text:
            sections.append(Section(f"dia {i}", text))
    return sections


_TS = re.compile(r"(\d{1,2}:)?(\d{1,2}):(\d{2})[.,]\d{1,3}\s*-->")


def _transcript(raw: str) -> list[Section]:
    """VTT/SRT: groepeer per ~2 minuten, met beginstijd als vindplaats."""
    sections, buf, start, block_start_s = [], [], "", None
    for line in raw.splitlines():
        line = line.strip()
        m = _TS.search(line)
        if m:
            h = int((m.group(1) or "0:")[:-1])
            s = h * 3600 + int(m.group(2)) * 60 + int(m.group(3))
            if block_start_s is None:
                block_start_s, start = s, line.split("-->")[0].strip().split(".")[0].split(",")[0]
            elif s - block_start_s >= 120 and buf:
                sections.append(Section(start, _clean(" ".join(buf))))
                buf, block_start_s = [], s
                start = line.split("-->")[0].strip().split(".")[0].split(",")[0]
            continue
        if not line or line.isdigit() or line.upper().startswith(("WEBVTT", "NOTE")):
            continue
        buf.append(re.sub(r"<[^>]+>", "", line))
    if buf:
        sections.append(Section(start, _clean(" ".join(buf))))
    return sections


def _markdown(raw: str) -> list[Section]:
    sections, heading, buf = [], "", []
    for line in raw.splitlines():
        if line.startswith("#"):
            if "".join(buf).strip():
                sections.append(Section(heading, _clean("\n".join(buf))))
            heading, buf = line.lstrip("#").strip()[:150], []
        else:
            buf.append(line)
    if "".join(buf).strip():
        sections.append(Section(heading, _clean("\n".join(buf))))
    return sections


def html_to_text(html: str) -> tuple[str, str]:
    """Geeft (titel, leesbare tekst) van een webpagina."""
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "header", "aside", "form", "noscript"]):
        tag.decompose()
    title = soup.title.get_text(strip=True) if soup.title else ""
    main = soup.find("main") or soup.find("article") or soup.body or soup
    lines = []
    for el in main.find_all(["h1", "h2", "h3", "h4", "p", "li", "td", "th", "pre"]):
        t = el.get_text(" ", strip=True)
        if t:
            prefix = "## " if el.name in {"h1", "h2", "h3", "h4"} else ""
            lines.append(prefix + t)
    text = "\n".join(lines) or main.get_text("\n", strip=True)
    return title, _clean(text)


def parse_html(html: str) -> list[Section]:
    _, text = html_to_text(html)
    return _markdown(text)
