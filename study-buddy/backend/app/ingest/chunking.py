import re

from .parsers import Section

MAX_CHARS = 2400
OVERLAP_CHARS = 300


def chunk_sections(sections: list[Section]) -> list[Section]:
    """Splits secties in stukken van ~400-600 woorden, op alinea- of zinsgrenzen."""
    out: list[Section] = []
    for sec in sections:
        text = sec.text.strip()
        if not text:
            continue
        if len(text) <= MAX_CHARS:
            out.append(sec)
            continue
        pieces = _split(text)
        cur = ""
        for piece in pieces:
            if cur and len(cur) + len(piece) + 1 > MAX_CHARS:
                out.append(Section(sec.location, cur.strip()))
                cur = cur[-OVERLAP_CHARS:].split(" ", 1)[-1] + " "
            cur += piece + "\n"
        if cur.strip():
            out.append(Section(sec.location, cur.strip()))
    return out


def _split(text: str) -> list[str]:
    parts = []
    for para in re.split(r"\n\s*\n", text):
        if len(para) <= MAX_CHARS:
            parts.append(para)
        else:
            parts.extend(re.split(r"(?<=[.!?])\s+", para))
    return [p for p in parts if p.strip()]
