export type Source = {
  label: string;
  type: "lesstof" | "web";
  title: string;
  location?: string;
  url?: string;
  excerpt?: string;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources: Source[];
  feedback: number | null;
  created_at: string;
};

export type Topic = { id: string; name: string; description: string; documents: number };
export type SessionInfo = { id: string; title: string; updated_at: string };
export type Me = { display_name: string; llm: string; web_search: boolean };

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}

const headers = { "Content-Type": "application/json" };

export const api = {
  me: () => fetch("/api/me").then((r) => json<Me>(r)),
  topics: () => fetch("/api/topics").then((r) => json<Topic[]>(r)),
  sessions: (topicId: string) =>
    fetch(`/api/sessions?topic_id=${encodeURIComponent(topicId)}`).then((r) => json<SessionInfo[]>(r)),
  createSession: (topicId: string) =>
    fetch("/api/sessions", { method: "POST", headers, body: JSON.stringify({ topic_id: topicId }) }).then((r) =>
      json<SessionInfo>(r),
    ),
  renameSession: (id: string, title: string) =>
    fetch(`/api/sessions/${id}`, { method: "PATCH", headers, body: JSON.stringify({ title }) }).then((r) =>
      json<SessionInfo>(r),
    ),
  deleteSession: (id: string) => fetch(`/api/sessions/${id}`, { method: "DELETE" }).then((r) => json(r)),
  messages: (sessionId: string) => fetch(`/api/sessions/${sessionId}/messages`).then((r) => json<Message[]>(r)),
  reingest: () => fetch("/api/admin/ingest", { method: "POST" }).then((r) => json(r)),
  ingestStatus: () => fetch("/api/admin/ingest").then((r) => json<{ bezig: boolean }>(r)),
  feedback: (messageId: string, value: number) =>
    fetch(`/api/messages/${messageId}/feedback`, { method: "POST", headers, body: JSON.stringify({ value }) }).then(
      (r) => json(r),
    ),
};

export type StreamEvent =
  | { type: "user_saved"; id: string }
  | { type: "status"; text: string }
  | { type: "token"; text: string }
  | { type: "reset" }
  | { type: "error"; text: string }
  | { type: "done"; message: Message; session_title: string };

/** Stuurt een bericht en leest het antwoord als stream (server-sent events). */
export async function sendMessage(sessionId: string, content: string, onEvent: (e: StreamEvent) => void) {
  const res = await fetch(`/api/sessions/${sessionId}/messages`, {
    method: "POST",
    headers,
    body: JSON.stringify({ content }),
  });
  if (!res.ok || !res.body) throw new Error(`${res.status}`);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buffer.indexOf("\n\n")) >= 0) {
      const raw = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      const line = raw.split("\n").find((l) => l.startsWith("data: "));
      if (line) onEvent(JSON.parse(line.slice(6)) as StreamEvent);
    }
  }
}
