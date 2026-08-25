# STATUS — getestet am 2026-08-25 (Update 4)

Nur tatsächlich getestete Ergebnisse (Zero-Fiction). Update 4 fasst die
Parallelsession-Ergebnisse (Update 3, Account bert-devfasdf) und frische
Tests dieser Session zusammen.

## OpenCode
- CLI v1.18.22: CONNECTED (getestet)
- MCPs: github-MCP konfiguriert, in Session nicht geladen (OAuth-Inkompatibilität)

## Claude Code v2.1.238 — CONNECTED
- Abo-Login aktiv; Test 25.08.: Standard-Modell → "OK"

## Git/GitHub
- Remote main = Local main = 7629cef — alle Team-Commits inkl. Templates/
  Workflow sind LIVE auf GitHub (Push erfolgte zwischen Update 3 und jetzt,
  vermutlich durch User/Parallelsession nach Rechtekorrektur)
- Workflow "Design Leaderboard Snapshot": auf Remote registriert & ACTIVE
  (API-Check 25.08), noch 0 Runs (Schedule: Mo 04:00 UTC)
- Issue #1 "[BRIDGE-TEST]": erstellt+geschlossen von bert-devfasdf (21:07),
  von Nate8645 per Commit referenziert (22:29) → Issue-Bridge FUNKTIONIERT
- ECHTER PUSH-TEST mit diesem Commit: Ergebnis wird unmittelbar bestätigt

## Arena AI → GitHub
- Keine offizielle Integration existierbar (mehrfach recherchiert)
- Keine Arena-Artefakte im Repo (keine Issues/PRs/Commits von Arena)
- Status: NOT CONNECTED als Agent · AVAILABLE: HF-Dataset + WebSearch

## DesignArena → GitHub
- App "Design Arena Export": öffentlich nicht verifizierbar, keine Artefakte
  im Repo. Installationsliste nur für User sichtbar (Repo Settings → GitHub Apps)
- Funktionierende Brücke: tools/design-route.mjs via OpenRouter → getestet
  ("DESIGN ROUTE OK", Free-Modell, 0 €)
- Status: BRIDGE CONNECTED / offizielle App UNBESTÄTIGT

## Offene Punkte
1. User: Ist bert-devfasdf dein Account? Falls NEIN: Collaborators/Apps prüfen
   (Settings → Collaborators & GitHub Apps)
2. Push-Rechte: bestätigt sich mit diesem Commit-Push (ja/nein)
3. Optional: DESIGNARENA_API_KEY beantragen → Workflow aktiviert Auto-Ranking
