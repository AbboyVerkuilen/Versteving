import { useState } from "react";
import type { Me, SessionInfo, Topic } from "../api";
import { Logo, Pencil, Plus, Trash } from "./Icons";

type Props = {
  me: Me | null;
  topics: Topic[];
  topicId: string;
  onTopic: (id: string) => void;
  sessions: SessionInfo[];
  sessionId: string | null;
  onOpen: (id: string) => void;
  onNew: () => void;
  onRename: (id: string, title: string) => void;
  onDelete: (s: SessionInfo) => void;
  onReingest: () => void;
  ingesting: boolean;
};

const day = (iso: string) => {
  const d = new Date(iso);
  const today = new Date();
  const diff = Math.round((new Date(today.toDateString()).getTime() - new Date(d.toDateString()).getTime()) / 86400000);
  if (diff === 0) return "Vandaag";
  if (diff === 1) return "Gisteren";
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "short" });
};

export function Sidebar(p: Props) {
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  return (
    <nav className="sidebar" aria-label="Sessies">
      <div className="brand">
        <Logo size={36} inverted />
        <span>study buddy</span>
      </div>

      <div className="side-body">
        {p.me && (
          <div className="me">
            <div className="avatar" aria-hidden="true">
              {p.me.display_name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="me-name">{p.me.display_name}</div>
              <div className="muted small">Lokale testomgeving</div>
            </div>
          </div>
        )}

        <label className="field">
          Onderwerp
          <select value={p.topicId} onChange={(e) => p.onTopic(e.target.value)}>
            {p.topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        <button className="btn-primary slant" onClick={p.onNew} disabled={!p.topicId}>
          <Plus size={18} /> Nieuwe sessie
        </button>

        <div className="session-list">
          <div className="list-head">Sessies</div>
          {p.sessions.length === 0 && <p className="muted small pad">Nog geen sessies. Start een nieuwe sessie.</p>}
          {p.sessions.map((s) => (
            <div key={s.id} className={`session ${s.id === p.sessionId ? "current" : ""}`}>
              {editing === s.id ? (
                <form
                  className="rename"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (draft.trim()) p.onRename(s.id, draft.trim());
                    setEditing(null);
                  }}
                >
                  <label className="sr-only" htmlFor={`rn-${s.id}`}>
                    Nieuwe titel
                  </label>
                  <input id={`rn-${s.id}`} autoFocus value={draft} maxLength={120} onChange={(e) => setDraft(e.target.value)} onBlur={() => setEditing(null)} />
                </form>
              ) : (
                <button className="session-open" onClick={() => p.onOpen(s.id)} aria-current={s.id === p.sessionId ? "page" : undefined}>
                  <span className="s-title">{s.title}</span>
                  <span className="s-date">{day(s.updated_at)}</span>
                </button>
              )}
              <div className="s-actions">
                <button
                  aria-label={`Hernoem ${s.title}`}
                  onClick={() => {
                    setDraft(s.title);
                    setEditing(s.id);
                  }}
                >
                  <Pencil size={15} />
                </button>
                <button aria-label={`Verwijder ${s.title}`} onClick={() => p.onDelete(s)}>
                  <Trash size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="side-foot">
          {p.me && <p className="muted small">Taalmodel: {p.me.llm}{p.me.web_search ? " · web search aan" : " · web search uit"}</p>}
          <p className="muted small">Je praat met een AI. Controleer belangrijke informatie in de lesstof.</p>
          <button className="link-btn small" onClick={p.onReingest} disabled={p.ingesting}>
            {p.ingesting ? "Lesstof wordt ingelezen…" : "Lesstof opnieuw inlezen"}
          </button>
        </div>
      </div>
    </nav>
  );
}
