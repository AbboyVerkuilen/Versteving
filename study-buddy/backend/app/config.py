from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql+psycopg://sb:sb@localhost:5432/studybuddy"
    topics_dir: Path = Path(__file__).resolve().parents[2] / "topics"
    static_dir: Path | None = None

    # Taalmodel (OpenAI-compatibele API: NVIDIA, Mistral, Ollama, ...). "mock" = zonder taalmodel testen.
    llm_provider: str = "openai_compatible"
    llm_base_url: str = "https://integrate.api.nvidia.com/v1"
    llm_api_key: str = ""
    llm_model: str = "meta/llama-3.3-70b-instruct"
    llm_tools: bool = True
    llm_temperature: float = 0.4
    llm_max_tokens: int = 1500

    # Embeddings voor semantisch zoeken. Leeg model = alleen zoeken op woorden (full-text).
    embed_base_url: str = ""
    embed_api_key: str = ""
    embed_model: str = "nvidia/llama-3.2-nv-embedqa-1b-v2"

    # Web search via SearXNG (draait mee in docker compose). Leeg = web search uit.
    searxng_url: str = ""

    retrieval_k: int = 6
    history_messages: int = 20
    max_tool_rounds: int = 4

    @property
    def llm_enabled(self) -> bool:
        return self.llm_provider != "mock" and bool(self.llm_api_key)

    @property
    def embeddings_enabled(self) -> bool:
        return self.llm_provider != "mock" and bool(self.embed_model) and bool(
            self.embed_api_key or self.llm_api_key
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
