# Study Buddy

Een AI-tutor waarmee studenten in gesprek gaan over een onderwerp, op basis van jouw lesstof.
Zie [`docs/eisen.md`](docs/eisen.md) voor alle eisen en de fasering.

**Stand: fase 1** – chat met sessies, onderwerpen met lesstof (RAG), web search, bronvermelding,
strikt binnen de lesstof. Accounts, tegoed, dossier, visuals en dashboard volgen in fase 2–5.

## Lokaal starten op Windows

### Eenmalig installeren
1. Installeer **Docker Desktop**: <https://www.docker.com/products/docker-desktop/>.
   Kies tijdens de installatie voor WSL 2 (standaard). Herstart je laptop als daarom gevraagd wordt.
2. Installeer **Git**: <https://git-scm.com/download/win> (standaardopties zijn prima).
3. Open **PowerShell** en haal de code op:
   ```powershell
   git clone https://github.com/AbboyVerkuilen/Versteving.git
   cd Versteving
   git checkout ccr-017b544b-zvp07d
   cd study-buddy
   ```
4. Maak je instellingenbestand en open het in Kladblok:
   ```powershell
   copy .env.example .env
   notepad .env
   ```
   Vul bij `LLM_API_KEY=` je NVIDIA API-sleutel in (begint met `nvapi-`) en verander `SEARXNG_SECRET`
   in een willekeurige reeks tekens. Sla op.
   Zonder sleutel start Study Buddy in **testmodus**: alles werkt, maar de antwoorden zijn nep.

### Starten
Start Docker Desktop, en dan in PowerShell (in de map `study-buddy`):
```powershell
docker compose up --build
```
De eerste keer duurt dit een paar minuten. Open daarna <http://localhost:8000>.
Stoppen: `Ctrl+C` in PowerShell, of `docker compose down`.

## Lesstof toevoegen

Elk onderwerp is een map in `topics/`:

```
topics/
  ontwerpen-technische-innovaties/
    topic.yaml        naam, beschrijving, nette titels, webpagina's
    gedrag.md         jouw extra afspraken voor de tutor bij dit onderwerp
    documenten/       pdf, docx, pptx, md, txt, vtt/srt (transcripties), html
```

1. Zet je bestanden in `documenten/`. Bij een pdf gebruikt Study Buddy de gedrukte paginanummers als die
   in het bestand staan; anders het paginanummer van de pdf.
2. Geef bestanden desgewenst een nette titel in `topic.yaml` onder `titels:`.
3. Klik in Study Buddy linksonder op **Lesstof opnieuw inlezen** (of herstart).

Een nieuw onderwerp maak je door een map te kopiëren en `topic.yaml` en `gedrag.md` aan te passen.
Documenten in `documenten/` gaan **niet** mee naar GitHub (auteursrecht), zie `.gitignore`.

Het onderwerp *Voorbeeld: spanning en rek* bevat een korte, zelfgeschreven voorbeeldtekst om mee te testen.

## Hoe het werkt

- **Zoeken in de lesstof**: combinatie van zoeken op woorden (Postgres, Nederlandse taalregels) en op
  betekenis (embeddings via de NVIDIA-sleutel). Bij elke vraag worden de beste fragmenten meegegeven; het
  taalmodel kan daarnaast zelf gericht zoeken.
- **Web search**: via een eigen SearXNG-zoekmachine in Docker, zonder extra sleutel of kosten. Webpagina's
  ophalen kan alleen van publieke adressen.
- **Bronnen**: het taalmodel zet labels als [L1] (lesstof) en [W1] (web) achter zinnen. Alleen echt
  geciteerde bronnen worden getoond; klik erop voor de vindplaats en het fragment.
- **Gedrag**: het standaard didactisch profiel staat in `backend/app/prompts.py`; per onderwerp komt
  `gedrag.md` erbij.

### Taalmodel wisselen
In `.env`: `LLM_BASE_URL`, `LLM_API_KEY` en `LLM_MODEL`. Elke OpenAI-compatibele API werkt (NVIDIA,
Mistral, Ollama, ...). Geeft het model fouten bij tool calling, zet dan `LLM_TOOLS=false`.

> **Privacy:** de NVIDIA-API draait buiten de EU. Gebruik die alleen voor testgesprekken, niet met
> echte studenten. Voor productie stappen we over naar een EU-optie (zie eisen N1).

> **Beveiliging:** in fase 1 is er nog geen inlog; iedereen op `localhost` is "Testaccount". Docker maakt
> de app daarom alleen bereikbaar vanaf je eigen computer. Zet dit niet online vóór fase 4.

## Ontwikkelen (optioneel)

Backend (Python 3.12+, Postgres met pgvector):
```bash
cd backend && python -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn app.main:app --reload --port 8000
.venv/bin/pytest
```
Frontend (Node 22): `cd frontend && npm install && npm run dev` (op <http://localhost:5173>, stuurt `/api`
door naar poort 8000).

Testen in Docker: `docker compose run --rm app pytest`.
