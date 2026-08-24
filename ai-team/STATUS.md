# STATUS — getestet am 2026-08-24

Nur tatsächlich getestete Ergebnisse (Zero-Fiction).

## OpenCode
- CLI v1.18.22: CONNECTED (getestet)

## Claude Code v2.1.238
- Installation: OK
- Diagnose 1: ANTHROPIC_API_KEY ist auf User-Ebene gesetzt (persistent, Machine-Level: nein)
  → Claude nutzt damit API-Billing statt Abo → "Credit balance is too low"
- Diagnose 2: Ohne Env-Key greift gespeicherter OAuth-Login, aber:
  → "Failed to authenticate: OAuth session expired and could not be refreshed"
- Ursache (bestätigt durch Tests): 1) Env-Key überschreibt Abo-Weg, 2) OAuth-Session abgelaufen
- Status: REQUIRES USER ACTION (siehe HANDOFFS.md)

## Arena AI
- Kein CLI/MCP/offizielle Agent-API vorhanden (lokal geprüft + Websuche)
- Offizielle Datenquelle existiert: HuggingFace-Leaderboard-Dataset
- Status: NOT CONNECTED (Agent-Rolle) / AVAILABLE (Datensatz)

## DesignArena
- Offizielle REST-API dokumentiert (docs.designarena.ai), Bearer-Key via Antrag
- Funktionsumfang: Leaderboard/ELO-Daten, KEINE Design-Generierung
- Status: REQUIRES USER ACTION (Key-Antrag) — danach nur Datenrolle

## Git/GitHub
- remote: https://github.com/Nate8645/ai-business.git (main)
- fetch: OK · push: FAILED ("Invalid username or token") · GITHUB_TOKEN: HTTP 401 ungültig
- GitHub-MCP (opencode.jsonc): in Session nicht geladen, OAuth inkompatibel
- Status Push/MCP: REQUIRES USER ACTION

## Windows-Credential-Store
- Kein GitHub-Credential gespeichert (cmdkey-Check)
