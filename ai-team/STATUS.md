# STATUS — getestet am 2026-08-24 (Update 2)

Nur tatsächlich getestete Ergebnisse (Zero-Fiction).

## OpenCode
- CLI v1.18.22: CONNECTED (getestet)

## Claude Code v2.1.238 — ✅ REPARATUR ERFOLGREICH
- Auth-Methode: Abo-Login (OAuth) — API-Key-Weg entfernt
  * User-Level ANTHROPIC_API_KEY entfernt, Backup: ANTHROPIC_API_KEY_BACKUP (User-Level)
  * OAuth-Session durch /login des Users erneuert
- Tests (alle live ausgeführt):
  * claude -p --model haiku   → "OK"  ✅
  * claude -p --model sonnet  → "OK"  ✅
  * claude -p (Standard=sonnet) → "OK" ✅
  * Premium-Modell (Fable 5): eigenes Limit-Fenster, Reset ~14 Min — danach nutzbar (/model)
- Status: CONNECTED — Rolle SENIOR ARCHITECT ab sofort wieder aktiv
- Konfiguration: settings.json model="sonnet", effortLevel=xhigh

## Arena AI
- Kein CLI/MCP/offizielle Agent-API (lokal + Websuche verifiziert)
- AVAILABLE als Datenquelle: offizielles HF-Leaderboard-Dataset
- Status: NOT CONNECTED (Agent-Rolle)

## DesignArena
- Offizielle REST-API dokumentiert; Key nur via Antrag (1–2 Werktage)
- API = Leaderboard/ELO-Daten, KEINE Design-Generierung
- Status: REQUIRES USER ACTION (optional, Datenrolle für Modell-Router)

## Git/GitHub
- remote: https://github.com/Nate8645/ai-business.git (main), clean
- fetch: OK · push: FAILED ("Invalid username or token") · GITHUB_TOKEN: HTTP 401
- GitHub-MCP: nicht geladen (OAuth inkompatibel) — Kandidat für Deaktivierung
- Status Push: REQUIRES USER ACTION (H-002)

## Commits (lokal, Push blockiert bis H-002)
- 3ee3f3b Initial: Website-Struktur + Audit-Report
- 1e6838f team: Rollen, Status, Handoffs, Decisions
