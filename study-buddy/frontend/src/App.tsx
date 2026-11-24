import { useCallback, useEffect, useRef, useState } from "react";
import { api, sendMessage, type Me, type Message, type SessionInfo, type Topic } from "./api";
import { Back, Logo, Plus, Send } from "./components/Icons";
import { AssistantBubble, DraftBubble, UserBubble } from "./components/MessageView";
import { Sidebar } from "./components/Sidebar";

const LS_TOPIC = "sb.topic";

function safeGet(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* niet erg */
  }
}

export default function App() {
  const [me, setMe] = useState<Me | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicId, setTopicId] = useState("");
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState<{ text: string; status: string } | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [toDelete, setToDelete] = useState<SessionInfo | null>(null);
  const [ingesting, setIngesting] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    api.me().then(setMe).catch(() => setError("De server is niet bereikbaar."));
    api.topics().then((ts) => {
      setTopics(ts);
      const saved = safeGet(LS_TOPIC);
      setTopicId(ts.find((t) => t.id === saved)?.id ?? ts[0]?.id ?? "");
    });
  }, []);

  const loadSessions = useCallback(async (tid: string) => {
    const list = await api.sessions(tid);
    setSessions(list);
    return list;
  }, []);

  useEffect(() => {
    if (!topicId) return;
    safeSet(LS_TOPIC, topicId);
    setSessionId(null);
    setMessages([]);
    loadSessions(topicId);
  }, [topicId, loadSessions]);

  useEffect(() => {
    if (!sessionId) return;
    api.messages(sessionId).then(setMessages);
  }, [sessionId]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, draft]);

  const topic = topics.find((t) => t.id === topicId);
  const session = sessions.find((s) => s.id === sessionId);

  async function newSession() {
    const s = await api.createSession(topicId);
    setSessions((prev) => [s, ...prev]);
    setSessionId(s.id);
    setMessages([]);
    setMobileView("chat");
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  async function send() {
    const text = input.trim();
    if (!text || draft) return;
    let sid = sessionId;
    if (!sid) {
      const s = await api.createSession(topicId);
      setSessions((prev) => [s, ...prev]);
      setSessionId(s.id);
      sid = s.id;
    }
    setInput("");
    setError("");
    const temp: Message = {
      id: `tmp-${Date.now()}`,
      role: "user",
      content: text,
      sources: [],
      feedback: null,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, temp]);
    setDraft({ text: "", status: "" });
    try {
      await sendMessage(sid, text, (e) => {
        if (e.type === "status") setDraft((d) => ({ text: d?.text ?? "", status: e.text }));
        else if (e.type === "token") setDraft((d) => ({ text: (d?.text ?? "") + e.text, status: "" }));
        else if (e.type === "reset") setDraft({ text: "", status: "" });
        else if (e.type === "user_saved") setMessages((prev) => prev.map((m) => (m.id === temp.id ? { ...m, id: e.id } : m)));
        else if (e.type === "error") setError(e.text);
        else if (e.type === "done") {
          setMessages((prev) => [...prev, e.message]);
          setSessions((prev) =>
            [{ id: sid!, title: e.session_title, updated_at: new Date().toISOString() }, ...prev.filter((s) => s.id !== sid)],
          );
        }
      });
    } catch {
      setError("Er ging iets mis met de verbinding. Probeer het opnieuw.");
    } finally {
      setDraft(null);
    }
  }

  async function feedback(id: string, value: number) {
    await api.feedback(id, value);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, feedback: value || null } : m)));
  }

  async function reingest() {
    setIngesting(true);
    try {
      await api.reingest();
      for (let i = 0; i < 600; i++) {
        await new Promise((r) => setTimeout(r, 1500));
        if (!(await api.ingestStatus()).bezig) break;
      }
      setTopics(await api.topics());
    } finally {
      setIngesting(false);
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    await api.deleteSession(toDelete.id);
    setSessions((prev) => prev.filter((s) => s.id !== toDelete.id));
    if (sessionId === toDelete.id) {
      setSessionId(null);
      setMessages([]);
      setMobileView("list");
    }
    setToDelete(null);
  }

  return (
    <div className={`app view-${mobileView}`}>
      <Sidebar
        me={me}
        topics={topics}
        topicId={topicId}
        onTopic={setTopicId}
        sessions={sessions}
        sessionId={sessionId}
        onOpen={(id) => {
          setSessionId(id);
          setMobileView("chat");
        }}
        onNew={newSession}
        onRename={async (id, title) => {
          const s = await api.renameSession(id, title);
          setSessions((prev) => prev.map((x) => (x.id === id ? { ...x, title: s.title } : x)));
        }}
        onDelete={setToDelete}
        onReingest={reingest}
        ingesting={ingesting}
      />

      <section className="chat">
        <header className="chat-head">
          <button className="icon-btn only-mobile" aria-label="Terug naar sessies" onClick={() => setMobileView("list")}>
            <Back size={22} />
          </button>
          <span className="only-mobile">
            <Logo size={30} />
          </span>
          <div className="head-text">
            <h1>{session?.title ?? topic?.name ?? "Study Buddy"}</h1>
            <div className="muted small">{session ? topic?.name : "Stel je eerste vraag om een sessie te starten"}</div>
          </div>
        </header>

        <div className="messages" ref={scroller}>
          <div className="messages-inner">
            {messages.length === 0 && !draft && (
              <div className="empty">
                <div className="slant-tag">{topic?.name ?? "Study Buddy"}</div>
                <p>
                  Hoi! Ik ben je Study Buddy. Ik help je om de lesstof zelf onder de knie te krijgen: ik stel vragen, geef hints
                  en verwijs naar de bron. Waar wil je mee aan de slag?
                </p>
                {topic && topic.documents === 0 && (
                  <p className="muted small">Let op: voor dit onderwerp is nog geen lesstof ingelezen.</p>
                )}
              </div>
            )}
            {messages.map((m) =>
              m.role === "user" ? <UserBubble key={m.id} m={m} /> : <AssistantBubble key={m.id} m={m} onFeedback={(v) => feedback(m.id, v)} />,
            )}
            {draft && <DraftBubble text={draft.text} status={draft.status} />}
            {error && (
              <div className="error" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>

        <form
          className="composer"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <button type="button" className="round-btn" aria-label="Nieuwe sessie" onClick={newSession} disabled={!topicId}>
            <Plus size={20} />
          </button>
          <label className="sr-only" htmlFor="msg">
            Bericht aan Study Buddy
          </label>
          <textarea
            id="msg"
            ref={inputRef}
            rows={1}
            value={input}
            maxLength={4000}
            placeholder="Typ je vraag of antwoord…"
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button type="submit" className="send-btn" aria-label="Versturen" disabled={!input.trim() || !!draft || !topicId}>
            <Send size={20} />
          </button>
        </form>
      </section>

      {toDelete && (
        <div className="modal-back" role="presentation" onClick={() => setToDelete(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="del-title" onClick={(e) => e.stopPropagation()}>
            <h2 id="del-title">Sessie verwijderen?</h2>
            <p>
              Je gesprekken zijn anoniem en helpen je docent om te zien welke onderwerpen lastig zijn, zodat het onderwijs beter
              wordt. Wil je deze sessie toch verwijderen? Dat kan niet ongedaan worden gemaakt.
            </p>
            <p className="muted small">“{toDelete.title}”</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setToDelete(null)} autoFocus>
                Bewaren
              </button>
              <button className="btn-danger" onClick={confirmDelete}>
                Verwijderen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
