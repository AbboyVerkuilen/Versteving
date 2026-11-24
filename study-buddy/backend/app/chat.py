"""Eén beurt in het gesprek: lesstof ophalen, taalmodel aanroepen (met tools), streamen en opslaan."""

import json
import logging
import re
from collections.abc import Iterator
from datetime import datetime, timezone

from sqlalchemy.orm import Session

from . import llm, retrieval, websearch
from .config import get_settings
from .models import ChatSession, Message, Topic
from .prompts import TITLE_PROMPT, TOOLS, system_prompt

log = logging.getLogger(__name__)

STATUS = {
    "zoek_lesstof": "Zoekt in de lesstof…",
    "zoek_web": "Zoekt op internet…",
    "lees_webpagina": "Leest een webpagina…",
}


class SourceRegistry:
    """Houdt bij welke bronnen in deze beurt een label ([L1], [W1]) hebben gekregen."""

    def __init__(self) -> None:
        self.items: dict[str, dict] = {}
        self._keys: dict[str, str] = {}
        self._n = {"L": 0, "W": 0}

    def add(self, prefix: str, key: str, info: dict) -> str:
        if key in self._keys:
            return self._keys[key]
        self._n[prefix] += 1
        label = f"{prefix}{self._n[prefix]}"
        self._keys[key] = label
        self.items[label] = {"label": label, **info}
        return label

    def add_hits(self, hits: list[retrieval.Hit]) -> str:
        parts = []
        for h in hits:
            label = self.add(
                "L",
                f"chunk:{h.chunk_id}",
                {"type": "lesstof", "title": h.title, "location": h.location, "excerpt": h.text[:600]},
            )
            where = f", {h.location}" if h.location else ""
            parts.append(f"[{label}] {h.title}{where}\n{h.text}")
        return "\n\n---\n\n".join(parts)

    def cited(self, text: str) -> list[dict]:
        used = dict.fromkeys(re.findall(r"\[([LW]\d+)\]", text))
        return [self.items[l] for l in used if l in self.items]


def _sse(event: dict) -> str:
    return f"data: {json.dumps(event, ensure_ascii=False)}\n\n"


def _run_tool(db: Session, topic: Topic, call: llm.ToolCall, reg: SourceRegistry) -> str:
    q = str(call.arguments.get("zoekvraag") or call.arguments.get("query") or "").strip()
    if call.name == "zoek_lesstof":
        hits = retrieval.search(db, topic.id, q, k=get_settings().retrieval_k)
        return reg.add_hits(hits) or "Geen passende fragmenten in de lesstof gevonden."
    if call.name == "zoek_web":
        results = websearch.search(q)
        if not results:
            return "Geen webresultaten (of web search staat uit)."
        lines = []
        for r in results:
            label = reg.add("W", r["url"], {"type": "web", "title": r["title"], "url": r["url"], "excerpt": r["snippet"]})
            lines.append(f"[{label}] {r['title']}\n{r['url']}\n{r['snippet']}")
        return "\n\n".join(lines)
    if call.name == "lees_webpagina":
        url = str(call.arguments.get("url", ""))
        page = websearch.fetch_page(url)
        if "error" in page:
            return page["error"]
        label = reg.add("W", page["url"], {"type": "web", "title": page["title"] or url, "url": page["url"], "excerpt": page["text"][:300]})
        return f"[{label}] {page['title']}\n{page['url']}\n\n{page['text']}"
    return f"Onbekende tool: {call.name}"


def _history(session: ChatSession, limit: int) -> list[dict]:
    msgs = [m for m in session.messages if m.role in {"user", "assistant"}][-limit:]
    return [{"role": m.role, "content": m.content} for m in msgs]


def answer(db: Session, session: ChatSession, topic: Topic, user_text: str) -> Iterator[str]:
    s = get_settings()
    history = _history(session, s.history_messages)

    user_msg = Message(session_id=session.id, role="user", content=user_text)
    db.add(user_msg)
    db.commit()
    yield _sse({"type": "user_saved", "id": user_msg.id})

    reg = SourceRegistry()
    yield _sse({"type": "status", "text": STATUS["zoek_lesstof"]})
    recent = " ".join(m["content"] for m in history[-2:] if m["role"] == "user")
    hits = retrieval.search(db, topic.id, f"{recent} {user_text}".strip(), k=s.retrieval_k)
    context = reg.add_hits(hits)

    turn = (
        "<lesstof>\n" + (context or "Geen passende fragmenten gevonden.") + "\n</lesstof>\n\n"
        f"Bericht van de student:\n{user_text}"
    )
    messages = [{"role": "system", "content": system_prompt(topic)}, *history, {"role": "user", "content": turn}]
    tools = TOOLS if s.llm_tools else None
    if tools and not s.searxng_url:
        tools = [t for t in TOOLS if t["function"]["name"] == "zoek_lesstof"]

    final_text, usage_total, tools_used = "", {"prompt_tokens": 0, "completion_tokens": 0}, []
    try:
        for round_no in range(s.max_tool_rounds + 1):
            round_text, calls = "", []
            use_tools = tools if round_no < s.max_tool_rounds else None
            for ev in llm.chat_stream(messages, use_tools):
                if ev.kind == "token":
                    round_text += ev.text
                    yield _sse({"type": "token", "text": ev.text})
                elif ev.kind == "tool_calls":
                    calls = ev.tool_calls
                elif ev.kind == "done":
                    for k in usage_total:
                        usage_total[k] += ev.usage.get(k) or 0
            if not calls:
                final_text = round_text
                break
            if round_text:
                yield _sse({"type": "reset"})
            messages.append(
                {
                    "role": "assistant",
                    "content": round_text or None,
                    "tool_calls": [
                        {"id": c.id, "type": "function", "function": {"name": c.name, "arguments": json.dumps(c.arguments)}}
                        for c in calls
                    ],
                }
            )
            for c in calls:
                tools_used.append(c.name)
                yield _sse({"type": "status", "text": STATUS.get(c.name, "Bezig…")})
                messages.append({"role": "tool", "tool_call_id": c.id, "content": _run_tool(db, topic, c, reg)})
    except Exception as exc:
        log.exception("Fout bij taalmodel")
        yield _sse({"type": "error", "text": f"Er ging iets mis bij het taalmodel ({exc.__class__.__name__}). Probeer het opnieuw."})
        return

    final_text = final_text.strip() or "Sorry, ik kon geen antwoord formuleren. Kun je je vraag anders stellen?"
    msg = Message(
        session_id=session.id,
        role="assistant",
        content=final_text,
        sources=reg.cited(final_text),
        meta={"usage": usage_total, "tools": tools_used, "model": s.llm_model if s.llm_enabled else "mock"},
    )
    db.add(msg)
    session.updated_at = datetime.now(timezone.utc)
    if session.title == "Nieuwe sessie":
        session.title = make_title(user_text)
    db.commit()
    yield _sse({"type": "done", "message": message_out(msg), "session_title": session.title})


def make_title(question: str) -> str:
    title = ""
    try:
        title = llm.complete([{"role": "user", "content": TITLE_PROMPT.format(question=question[:500])}], max_tokens=30)
    except Exception:
        log.warning("Titel maken mislukt", exc_info=True)
    title = title.strip().strip('"\'.').splitlines()[0] if title.strip() else ""
    if not title:
        title = question.strip().split("\n")[0]
        title = title[:50] + ("…" if len(title) > 50 else "")
    return title[:120]


def message_out(m: Message) -> dict:
    return {
        "id": m.id,
        "role": m.role,
        "content": m.content,
        "sources": m.sources or [],
        "feedback": m.feedback,
        "created_at": m.created_at.isoformat(),
    }
