"""Zoeken op internet (via SearXNG) en webpagina's veilig ophalen."""

import ipaddress
import logging
import socket
from urllib.parse import urlparse

import httpx

from .config import get_settings
from .ingest.parsers import html_to_text

log = logging.getLogger(__name__)

USER_AGENT = "StudyBuddy/0.1 (educatieve tutor)"
MAX_PAGE_BYTES = 2_000_000


def search(query: str, max_results: int = 5) -> list[dict]:
    s = get_settings()
    if not s.searxng_url:
        return []
    try:
        r = httpx.get(
            f"{s.searxng_url.rstrip('/')}/search",
            params={"q": query, "format": "json", "language": "nl", "safesearch": 1},
            timeout=15,
        )
        r.raise_for_status()
        results = r.json().get("results", [])
    except Exception as exc:
        log.warning("Web search mislukt: %s", exc)
        return []
    out = []
    for res in results:
        url = res.get("url", "")
        if not url.startswith(("http://", "https://")):
            continue
        out.append(
            {"title": res.get("title", "")[:200], "url": url, "snippet": res.get("content", "")[:500]}
        )
        if len(out) >= max_results:
            break
    return out


def is_public_url(url: str) -> bool:
    """Weigert interne adressen, zodat het taalmodel geen interne systemen kan benaderen."""
    try:
        parsed = urlparse(url)
        if parsed.scheme not in {"http", "https"} or not parsed.hostname:
            return False
        for info in socket.getaddrinfo(parsed.hostname, parsed.port or 443):
            ip = ipaddress.ip_address(info[4][0])
            if not ip.is_global:
                return False
        return True
    except Exception:
        return False


def fetch_page(url: str, max_chars: int = 6000) -> dict:
    if not is_public_url(url):
        return {"error": "Deze URL is niet toegestaan."}
    try:
        with httpx.Client(timeout=15, follow_redirects=False, headers={"User-Agent": USER_AGENT}) as c:
            current = url
            for _ in range(4):  # redirects handmatig volgen, en elke stap controleren
                r = c.get(current)
                if r.is_redirect:
                    current = str(r.next_request.url) if r.next_request else ""
                    if not is_public_url(current):
                        return {"error": "Doorverwijzing naar een niet-toegestane URL."}
                    continue
                break
            r.raise_for_status()
            ctype = r.headers.get("content-type", "")
            if "html" not in ctype and "text" not in ctype:
                return {"error": f"Geen tekstpagina ({ctype})."}
            title, text = html_to_text(r.content[:MAX_PAGE_BYTES].decode(r.encoding or "utf-8", "replace"))
            return {"url": current, "title": title[:200], "text": text[:max_chars]}
    except Exception as exc:
        return {"error": f"Ophalen mislukt: {exc.__class__.__name__}"}
