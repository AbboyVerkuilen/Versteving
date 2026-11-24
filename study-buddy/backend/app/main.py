import logging
import threading
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from . import chat
from .config import get_settings
from .db import SessionLocal, get_db, init_db
from .ingest.sync import sync_all
from .models import ChatSession, Chunk, Document, Message, Topic, User

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger("studybuddy")

ingest_state = {"bezig": False, "rapport": {}}


_sync_lock = threading.Lock()


def start_sync() -> bool:
    """Start inlezen op de achtergrond; False als er al een inleesronde loopt."""
    with _sync_lock:
        if ingest_state["bezig"]:
            return False
        ingest_state["bezig"] = True
    threading.Thread(target=run_sync, daemon=True).start()
    return True


def run_sync() -> None:
    try:
        with SessionLocal() as db:
            ingest_state["rapport"] = sync_all(db)
            log.info("Onderwerpen ingelezen: %s", ingest_state["rapport"])
    finally:
        ingest_state["bezig"] = False


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    start_sync()
    yield


app = FastAPI(title="Study Buddy", lifespan=lifespan)


# --- Gebruiker -------------------------------------------------------------------------------
# Fase 1: één lokaal testaccount. In fase 4 komt inloggen met klascode hiervoor in de plaats.
DEV_USER = "Testaccount"


def current_user(db: Session = Depends(get_db)) -> User:
    user = db.scalar(select(User).where(User.display_name == DEV_USER))
    if not user:
        user = User(display_name=DEV_USER)
        db.add(user)
        db.commit()
    return user


def own_session(session_id: str, db: Session, user: User) -> ChatSession:
    s = db.get(ChatSession, session_id)
    if not s or s.user_id != user.id:
        raise HTTPException(404, "Sessie niet gevonden")
    return s


# --- API -------------------------------------------------------------------------------------
@app.get("/api/me")
def me(user: User = Depends(current_user)):
    s = get_settings()
    return {
        "display_name": user.display_name,
        "llm": s.llm_model if s.llm_enabled else "testmodus (geen taalmodel ingesteld)",
        "web_search": bool(s.searxng_url),
    }


@app.get("/api/topics")
def topics(db: Session = Depends(get_db)):
    rows = db.execute(
        select(Topic, func.count(Document.id))
        .outerjoin(Document, Document.topic_id == Topic.id)
        .where(Topic.active.is_(True))
        .group_by(Topic.id)
        .order_by(Topic.name)
    ).all()
    return [{"id": t.id, "name": t.name, "description": t.description, "documents": n} for t, n in rows]


@app.get("/api/admin/ingest")
def ingest_status(db: Session = Depends(get_db)):
    docs = db.execute(
        select(Document.topic_id, Document.title, Document.kind, func.count(Chunk.id))
        .join(Chunk, Chunk.document_id == Document.id, isouter=True)
        .group_by(Document.id)
        .order_by(Document.topic_id, Document.title)
    ).all()
    return {
        "bezig": ingest_state["bezig"],
        "rapport": ingest_state["rapport"],
        "documenten": [{"onderwerp": t, "titel": ti, "soort": k, "fragmenten": n} for t, ti, k, n in docs],
    }


@app.post("/api/admin/ingest")
def ingest_now():
    return {"gestart": start_sync()}


class NewSession(BaseModel):
    topic_id: str


@app.get("/api/sessions")
def list_sessions(topic_id: str, db: Session = Depends(get_db), user: User = Depends(current_user)):
    rows = db.scalars(
        select(ChatSession)
        .where(ChatSession.user_id == user.id, ChatSession.topic_id == topic_id)
        .order_by(ChatSession.updated_at.desc())
    ).all()
    return [{"id": s.id, "title": s.title, "updated_at": s.updated_at.isoformat()} for s in rows]


@app.post("/api/sessions")
def create_session(body: NewSession, db: Session = Depends(get_db), user: User = Depends(current_user)):
    topic = db.get(Topic, body.topic_id)
    if not topic or not topic.active:
        raise HTTPException(404, "Onderwerp niet gevonden")
    s = ChatSession(user_id=user.id, topic_id=topic.id)
    db.add(s)
    db.commit()
    return {"id": s.id, "title": s.title, "updated_at": s.updated_at.isoformat()}


class RenameSession(BaseModel):
    title: str = Field(min_length=1, max_length=120)


@app.patch("/api/sessions/{session_id}")
def rename_session(session_id: str, body: RenameSession, db: Session = Depends(get_db), user: User = Depends(current_user)):
    s = own_session(session_id, db, user)
    s.title = body.title.strip()
    db.commit()
    return {"id": s.id, "title": s.title}


@app.delete("/api/sessions/{session_id}")
def delete_session(session_id: str, db: Session = Depends(get_db), user: User = Depends(current_user)):
    s = own_session(session_id, db, user)
    db.delete(s)
    db.commit()
    return {"verwijderd": True}


@app.get("/api/sessions/{session_id}/messages")
def get_messages(session_id: str, db: Session = Depends(get_db), user: User = Depends(current_user)):
    s = own_session(session_id, db, user)
    return [chat.message_out(m) for m in s.messages]


class NewMessage(BaseModel):
    content: str = Field(min_length=1, max_length=4000)


@app.post("/api/sessions/{session_id}/messages")
def post_message(session_id: str, body: NewMessage, user: User = Depends(current_user)):
    db = SessionLocal()  # leeft zo lang als de stream
    try:
        s = own_session(session_id, db, user)
    except HTTPException:
        db.close()
        raise
    topic = db.get(Topic, s.topic_id)

    def stream():
        try:
            yield from chat.answer(db, s, topic, body.content.strip())
        finally:
            db.close()

    return StreamingResponse(
        stream(), media_type="text/event-stream", headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"}
    )


class Feedback(BaseModel):
    value: int = Field(ge=-1, le=1)


@app.post("/api/messages/{message_id}/feedback")
def feedback(message_id: str, body: Feedback, db: Session = Depends(get_db), user: User = Depends(current_user)):
    m = db.get(Message, message_id)
    if not m or m.role != "assistant":
        raise HTTPException(404, "Bericht niet gevonden")
    own_session(m.session_id, db, user)
    m.feedback = body.value or None
    db.commit()
    return {"feedback": m.feedback}


# --- Frontend (gebouwde React-app) ------------------------------------------------------------
_static = get_settings().static_dir
if _static and Path(_static).exists():
    app.mount("/assets", StaticFiles(directory=Path(_static) / "assets"), name="assets")

    @app.get("/{path:path}", include_in_schema=False)
    def spa(path: str):
        file = Path(_static) / path
        if path and file.is_file() and file.resolve().is_relative_to(Path(_static).resolve()):
            return FileResponse(file)
        return FileResponse(Path(_static) / "index.html")
