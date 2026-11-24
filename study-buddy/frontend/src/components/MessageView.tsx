import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { Message, Source } from "../api";
import { Doc, Globe, ThumbDown, ThumbUp } from "./Icons";

const time = (iso?: string) =>
  iso ? new Date(iso).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }) : "";

/** Zet bronlabels als [L1] om naar klikbare verwijzingen. */
function withCitations(text: string) {
  return text.replace(/\[([LW]\d+)\](?!\()/g, "[$1](#bron-$1)");
}

function Markdown({ text, onCite }: { text: string; onCite?: (label: string) => void }) {
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          a: ({ href, children }) => {
            if (href?.startsWith("#bron-")) {
              const label = href.slice(6);
              return (
                <button className="cite" onClick={() => onCite?.(label)} aria-label={`Bron ${label}`}>
                  {label}
                </button>
              );
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
        }}
      >
        {withCitations(text)}
      </ReactMarkdown>
    </div>
  );
}

function SourceList({ sources, open, setOpen }: { sources: Source[]; open: string | null; setOpen: (l: string | null) => void }) {
  if (!sources.length) return null;
  const active = sources.find((s) => s.label === open);
  return (
    <div className="sources">
      <div className="chips">
        {sources.map((s) => (
          <button
            key={s.label}
            className={`chip ${open === s.label ? "active" : ""}`}
            onClick={() => setOpen(open === s.label ? null : s.label)}
            aria-expanded={open === s.label}
          >
            {s.type === "web" ? <Globe size={13} /> : <Doc size={13} />}
            <span className="chip-label">{s.label}</span>
            <span className="chip-title">
              {s.type === "web" ? hostname(s.url) : s.title}
              {s.location ? `, ${s.location}` : ""}
            </span>
          </button>
        ))}
      </div>
      {active && (
        <div className="excerpt">
          <div className="excerpt-title">
            {active.title}
            {active.location ? ` · ${active.location}` : ""}
          </div>
          {active.excerpt && <p>{tidy(active.excerpt)}…</p>}
          {active.url && (
            <a href={active.url} target="_blank" rel="noopener noreferrer">
              Open bron op {hostname(active.url)}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/** Harde regeleinden uit pdf's weghalen, lijstjes en alinea's behouden. */
const tidy = (t: string) => t.replace(/\n(?!\n|- |\d+\.)/g, " ");

function hostname(url?: string) {
  try {
    return url ? new URL(url).hostname.replace(/^www\./, "") : "";
  } catch {
    return url ?? "";
  }
}

export function UserBubble({ m }: { m: Message }) {
  return (
    <div className="msg user">
      <p>{m.content}</p>
      <time>{time(m.created_at)}</time>
    </div>
  );
}

export function AssistantBubble({ m, onFeedback }: { m: Message; onFeedback: (v: number) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <article className="msg ai">
      <div className="who">Study Buddy</div>
      <Markdown text={m.content} onCite={(l) => setOpen(open === l ? null : l)} />
      <SourceList sources={m.sources} open={open} setOpen={setOpen} />
      <div className="ai-foot">
        <div className="fb">
          <button
            aria-label="Nuttig antwoord"
            aria-pressed={m.feedback === 1}
            className={m.feedback === 1 ? "on" : ""}
            onClick={() => onFeedback(m.feedback === 1 ? 0 : 1)}
          >
            <ThumbUp size={17} />
          </button>
          <button
            aria-label="Niet nuttig antwoord"
            aria-pressed={m.feedback === -1}
            className={m.feedback === -1 ? "on" : ""}
            onClick={() => onFeedback(m.feedback === -1 ? 0 : -1)}
          >
            <ThumbDown size={17} />
          </button>
        </div>
        <time>{time(m.created_at)}</time>
      </div>
    </article>
  );
}

export function DraftBubble({ text, status }: { text: string; status: string }) {
  if (!text) {
    return (
      <div className="msg ai typing" aria-live="polite">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="status">{status || "Study Buddy denkt na…"}</span>
      </div>
    );
  }
  return (
    <article className="msg ai" aria-live="polite" aria-busy="true">
      <div className="who">Study Buddy</div>
      <Markdown text={text} />
    </article>
  );
}
