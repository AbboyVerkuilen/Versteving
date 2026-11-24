"""Uitwisselbare koppeling met het taalmodel.

`openai_compatible` werkt met elke API die de OpenAI chat-completions-vorm volgt (NVIDIA, Mistral,
Ollama, vLLM, ...). Zonder API-sleutel of met LLM_PROVIDER=mock draait een testmodel dat geen
echte antwoorden geeft, zodat de rest van de app getest kan worden.
"""

import json
import logging
import re
from collections.abc import Iterator
from dataclasses import dataclass, field

from .config import get_settings

log = logging.getLogger(__name__)


@dataclass
class ToolCall:
    id: str
    name: str
    arguments: dict


@dataclass
class StreamEvent:
    kind: str  # "token" | "tool_calls" | "done"
    text: str = ""
    tool_calls: list[ToolCall] = field(default_factory=list)
    usage: dict = field(default_factory=dict)


def _client(base_url: str, api_key: str):
    from openai import OpenAI

    return OpenAI(base_url=base_url, api_key=api_key, timeout=120, max_retries=2)


def chat_stream(messages: list[dict], tools: list[dict] | None = None) -> Iterator[StreamEvent]:
    s = get_settings()
    if not s.llm_enabled:
        yield from _mock_stream(messages)
        return

    client = _client(s.llm_base_url, s.llm_api_key)
    kwargs = dict(
        model=s.llm_model,
        messages=messages,
        temperature=s.llm_temperature,
        max_tokens=s.llm_max_tokens,
        stream=True,
        stream_options={"include_usage": True},
    )
    if tools and s.llm_tools:
        kwargs["tools"] = tools
        kwargs["tool_choice"] = "auto"

    stream = client.chat.completions.create(**kwargs)
    calls: dict[int, dict] = {}
    usage: dict = {}
    for chunk in stream:
        if getattr(chunk, "usage", None):
            usage = {
                "prompt_tokens": chunk.usage.prompt_tokens,
                "completion_tokens": chunk.usage.completion_tokens,
            }
        if not chunk.choices:
            continue
        delta = chunk.choices[0].delta
        if delta.content:
            yield StreamEvent("token", text=delta.content)
        for tc in delta.tool_calls or []:
            slot = calls.setdefault(tc.index, {"id": "", "name": "", "args": ""})
            if tc.id:
                slot["id"] = tc.id
            if tc.function and tc.function.name:
                slot["name"] += tc.function.name
            if tc.function and tc.function.arguments:
                slot["args"] += tc.function.arguments

    if calls:
        parsed = []
        for i, c in sorted(calls.items()):
            try:
                args = json.loads(c["args"] or "{}")
            except json.JSONDecodeError:
                args = {}
            parsed.append(ToolCall(id=c["id"] or f"call_{i}", name=c["name"], arguments=args))
        yield StreamEvent("tool_calls", tool_calls=parsed, usage=usage)
    yield StreamEvent("done", usage=usage)


def complete(messages: list[dict], max_tokens: int = 200) -> str:
    """Kort, niet-gestreamd antwoord (bijv. voor een sessietitel)."""
    s = get_settings()
    if not s.llm_enabled:
        return ""
    client = _client(s.llm_base_url, s.llm_api_key)
    resp = client.chat.completions.create(
        model=s.llm_model, messages=messages, temperature=0.2, max_tokens=max_tokens
    )
    return (resp.choices[0].message.content or "").strip()


def embed(texts: list[str], purpose: str) -> list[list[float]] | None:
    """purpose: "query" of "passage". Geeft None als embeddings niet beschikbaar zijn."""
    s = get_settings()
    if not s.embeddings_enabled or not texts:
        return None
    client = _client(s.embed_base_url or s.llm_base_url, s.embed_api_key or s.llm_api_key)
    extra = {}
    if "nvidia" in (s.embed_base_url or s.llm_base_url):
        extra = {"input_type": purpose, "truncate": "END"}
    try:
        resp = client.embeddings.create(model=s.embed_model, input=texts, extra_body=extra or None)
        return [d.embedding for d in resp.data]
    except Exception as exc:  # embeddings zijn een verbetering, geen voorwaarde
        log.warning("Embeddings mislukt (%s); verder met zoeken op woorden.", exc)
        return None


def _mock_stream(messages: list[dict]) -> Iterator[StreamEvent]:
    last = next((m["content"] for m in reversed(messages) if m["role"] == "user"), "")
    labels = sorted(set(re.findall(r"\[(L\d+)\]", last)))[:2]
    cite = " ".join(f"[{l}]" for l in labels)
    answer = (
        "Dit is een **testantwoord**: er is nog geen taalmodel ingesteld (zet `LLM_API_KEY` in `.env`).\n\n"
        + (f"Ik vond wel relevante lesstof voor je vraag {cite}. " if labels else "Ik vond geen passende lesstof. ")
        + "Wat weet je zelf al over dit onderwerp?"
    )
    for word in re.findall(r"\S+\s*", answer):
        yield StreamEvent("token", text=word)
    yield StreamEvent("done")
