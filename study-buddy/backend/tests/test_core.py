"""Tests. Vereist een Postgres-database met pgvector (DATABASE_URL), zoals in docker compose."""

import json
from pathlib import Path

import pytest

from app import chat, llm, websearch
from app.db import SessionLocal, init_db
from app.ingest.chunking import MAX_CHARS, chunk_sections
from app.ingest.parsers import Section, parse_file
from app.ingest.sync import sync_topic
from app.models import ChatSession, Topic, User


@pytest.fixture(scope="module")
def db(tmp_path_factory):
    init_db()
    folder = tmp_path_factory.mktemp("topics") / "test-onderwerp"
    (folder / "documenten").mkdir(parents=True)
    (folder / "topic.yaml").write_text("naam: Testonderwerp\n", encoding="utf-8")
    (folder / "documenten" / "reader.md").write_text(
        "# Wet van Hooke\nDe spanning is evenredig met de rek: sigma = E maal epsilon.\n"
        "# Vloeigrens\nBoven de vloeigrens treedt blijvende vervorming op.\n",
        encoding="utf-8",
    )
    s = SessionLocal()
    sync_topic(s, folder)
    user = s.query(User).filter_by(display_name="pytest").first() or User(display_name="pytest")
    s.add(user)
    s.commit()
    yield s
    s.query(ChatSession).filter_by(user_id=user.id).delete()
    s.query(Topic).filter_by(id="test-onderwerp").delete()
    s.commit()
    s.close()


def _events(stream):
    return [json.loads(chunk[6:]) for chunk in stream]


def test_chunking_respects_max_size():
    long = ("Dit is een zin over ontwerpen. " * 400).strip()
    chunks = chunk_sections([Section("p. 1", long)])
    assert len(chunks) > 1
    assert all(len(c.text) <= MAX_CHARS + 200 for c in chunks)
    assert all(c.location == "p. 1" for c in chunks)


def test_parse_docx_and_pptx(tmp_path: Path):
    import docx
    from pptx import Presentation

    d = docx.Document()
    d.add_heading("Programma van eisen", level=1)
    d.add_paragraph("Een eis is meetbaar.")
    d.save(tmp_path / "a.docx")
    secs = parse_file(tmp_path / "a.docx")
    assert secs[0].location == "Programma van eisen" and "meetbaar" in secs[0].text

    p = Presentation()
    slide = p.slides.add_slide(p.slide_layouts[1])
    slide.shapes.title.text = "Morfologisch overzicht"
    p.save(tmp_path / "b.pptx")
    secs = parse_file(tmp_path / "b.pptx")
    assert secs[0].location == "dia 1" and "Morfologisch" in secs[0].text


def test_parse_transcript(tmp_path: Path):
    (tmp_path / "t.vtt").write_text(
        "WEBVTT\n\n00:00:01.000 --> 00:00:04.000\nWelkom bij het college.\n\n"
        "00:03:00.000 --> 00:03:04.000\nNu het tweede deel.\n",
        encoding="utf-8",
    )
    secs = parse_file(tmp_path / "t.vtt")
    assert [s.location for s in secs] == ["00:00:01", "00:03:00"]


def test_private_urls_are_blocked():
    assert not websearch.is_public_url("http://localhost:8000/api")
    assert not websearch.is_public_url("http://169.254.169.254/latest/meta-data")
    assert not websearch.is_public_url("file:///etc/passwd")
    assert "error" in websearch.fetch_page("http://127.0.0.1/")


def test_answer_with_tool_round(db, monkeypatch):
    """Model roept eerst zoek_lesstof aan, daarna komt het antwoord met een bronlabel."""
    calls = {"n": 0}

    def fake_stream(messages, tools=None):
        calls["n"] += 1
        if calls["n"] == 1:
            assert tools, "tools moeten worden meegegeven"
            assert "<lesstof>" in messages[-1]["content"]
            yield llm.StreamEvent("token", text="Even zoeken.")
            yield llm.StreamEvent(
                "tool_calls", tool_calls=[llm.ToolCall("c1", "zoek_lesstof", {"zoekvraag": "vloeigrens"})]
            )
            yield llm.StreamEvent("done", usage={"prompt_tokens": 10, "completion_tokens": 2})
        else:
            tool_msg = messages[-1]
            assert tool_msg["role"] == "tool" and "[L" in tool_msg["content"]
            yield llm.StreamEvent("token", text="Boven de vloeigrens blijft de staaf langer [L1].")
            yield llm.StreamEvent("done", usage={"prompt_tokens": 20, "completion_tokens": 8})

    monkeypatch.setattr(llm, "chat_stream", fake_stream)
    monkeypatch.setattr(chat, "make_title", lambda q: "Vloeigrens")
    user = db.query(User).filter_by(display_name="pytest").one()
    topic = db.get(Topic, "test-onderwerp")
    session = ChatSession(user_id=user.id, topic_id=topic.id)
    db.add(session)
    db.commit()

    events = _events(chat.answer(db, session, topic, "Wat gebeurt er boven de vloeigrens?"))
    kinds = [e["type"] for e in events]
    assert "reset" in kinds  # tussentekst vóór de toolaanroep wordt weggehaald
    done = events[-1]
    assert done["type"] == "done"
    assert done["message"]["content"] == "Boven de vloeigrens blijft de staaf langer [L1]."
    assert done["message"]["sources"][0]["label"] == "L1"
    assert done["session_title"] == "Vloeigrens"
    db.refresh(session)
    assert [m.role for m in session.messages] == ["user", "assistant"]
    assert session.messages[1].meta["usage"] == {"prompt_tokens": 30, "completion_tokens": 10}


def test_uncited_sources_are_not_stored(db, monkeypatch):
    def fake_stream(messages, tools=None):
        yield llm.StreamEvent("token", text="Wat denk je zelf?")
        yield llm.StreamEvent("done")

    monkeypatch.setattr(llm, "chat_stream", fake_stream)
    user = db.query(User).filter_by(display_name="pytest").one()
    session = ChatSession(user_id=user.id, topic_id="test-onderwerp", title="x")
    db.add(session)
    db.commit()
    done = _events(chat.answer(db, session, db.get(Topic, "test-onderwerp"), "Wet van Hooke?"))[-1]
    assert done["message"]["sources"] == []
