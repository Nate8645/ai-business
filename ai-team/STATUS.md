# STATUS — getestet am 2026-08-24 (Update 3)

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
- Retest Update 3: weiterhin KEINE Bot-Aktivität im Remote-Repo
  (0 Issues/PRs, kein [bot]-Autor unter allen Commits)
- Status: NOT CONNECTED (Agent-Rolle) — Übergabe via Issue-Bridge vorbereitet

## DesignArena
- Offizielle REST-API dokumentiert; Key nur via Antrag (1–2 Werktage)
- API = Leaderboard/ELO-Daten, KEINE Design-Generierung
- Retest Update 3: GitHub-App-Zugriff von dieser Maschine technisch NICHT
  prüfbar (/user/installations → HTTP 403), keine Bot-Aktivität im Remote-Repo
- Status: REQUIRES USER ACTION (optional) — Creative-Fallback: design-route.mjs

## Git/GitHub (Update 3 — alle Tests frisch ausgeführt)
- remote: https://github.com/Nate8645/ai-business.git (main) · Repo PUBLIC
- fetch: OK · push: WEITERHIN BLOCKIERT, Ursache jetzt präzisiert:
  Gespeichertes Credential gehört zu Account "bert-devfasdf" (Token gültig,
  Scopes gist/read:org/repo), aber Rechte auf Nate8645/ai-business:
  push=False admin=False → git push --dry-run = HTTP 403 (live getestet)
- NEU GETESTET: Issues gehen OHNE Schreibrecht (public repo):
  Issue #1 erstellt + geschlossen → OpenCode→GitHub-Bridge FUNKTIONIERT
- Remote-Stand: main @ 09e1f84 · Templates/Workflow nur lokal
  (in den 4 unpushed Commits) · 0 Workflows auf Remote
- GitHub-MCP: konfiguriert, in Session nicht geladen (OAuth inkompatibel)
- Status Push: REQUIRES USER ACTION (H-002, Details in HANDOFFS)

## Commits (lokal, Push blockiert bis H-002)
- 3ee3f3b Initial: Website-Struktur + Audit-Report
- 1e6838f team: Rollen, Status, Handoffs, Decisions
