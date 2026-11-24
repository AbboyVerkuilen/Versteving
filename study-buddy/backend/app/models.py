import uuid
from datetime import datetime, timezone

from pgvector.sqlalchemy import Vector
from sqlalchemy import (
    JSON,
    Boolean,
    Computed,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import TSVECTOR
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .db import Base


def _uuid() -> str:
    return str(uuid.uuid4())


def _now() -> datetime:
    return datetime.now(timezone.utc)


class User(Base):
    """Anoniem account. In fase 4 komen klascode, cohort en wachtwoord erbij."""

    __tablename__ = "users"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    display_name: Mapped[str] = mapped_column(String(80), unique=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)


class Topic(Base):
    __tablename__ = "topics"
    id: Mapped[str] = mapped_column(String(80), primary_key=True)  # = mapnaam
    name: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(Text, default="")
    behaviour: Mapped[str] = mapped_column(Text, default="")
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    config: Mapped[dict] = mapped_column(JSON, default=dict)


class Document(Base):
    __tablename__ = "documents"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    topic_id: Mapped[str] = mapped_column(ForeignKey("topics.id", ondelete="CASCADE"), index=True)
    source_key: Mapped[str] = mapped_column(String(500))  # bestandsnaam of URL
    title: Mapped[str] = mapped_column(String(300))
    kind: Mapped[str] = mapped_column(String(20))
    content_hash: Mapped[str] = mapped_column(String(64))
    ingested_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)
    chunks: Mapped[list["Chunk"]] = relationship(
        back_populates="document", cascade="all, delete-orphan", passive_deletes=True
    )


class Chunk(Base):
    __tablename__ = "chunks"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    document_id: Mapped[str] = mapped_column(
        ForeignKey("documents.id", ondelete="CASCADE"), index=True
    )
    topic_id: Mapped[str] = mapped_column(String(80), index=True)
    location: Mapped[str] = mapped_column(String(200), default="")  # "p. 12", "dia 4", ...
    text: Mapped[str] = mapped_column(Text)
    tsv = mapped_column(TSVECTOR, Computed("to_tsvector('dutch', text)", persisted=True))
    embedding = mapped_column(Vector(), nullable=True)
    document: Mapped[Document] = relationship(back_populates="chunks")

    __table_args__ = (Index("ix_chunks_tsv", "tsv", postgresql_using="gin"),)


class ChatSession(Base):
    __tablename__ = "chat_sessions"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    topic_id: Mapped[str] = mapped_column(ForeignKey("topics.id", ondelete="CASCADE"), index=True)
    title: Mapped[str] = mapped_column(String(120), default="Nieuwe sessie")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)
    messages: Mapped[list["Message"]] = relationship(
        back_populates="session",
        cascade="all, delete-orphan",
        passive_deletes=True,
        order_by="Message.created_at",
    )


class Message(Base):
    __tablename__ = "messages"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    session_id: Mapped[str] = mapped_column(
        ForeignKey("chat_sessions.id", ondelete="CASCADE"), index=True
    )
    role: Mapped[str] = mapped_column(String(16))  # "user" | "assistant"
    content: Mapped[str] = mapped_column(Text)
    sources: Mapped[list] = mapped_column(JSON, default=list)
    feedback: Mapped[int | None] = mapped_column(Integer, nullable=True)  # 1 / -1
    meta: Mapped[dict] = mapped_column(JSON, default=dict)  # bv. tokengebruik, gebruikte tools
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)
    session: Mapped[ChatSession] = relationship(back_populates="messages")
