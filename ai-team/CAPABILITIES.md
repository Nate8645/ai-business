# CAPABILITIES — Capability-Audit 2026-08-25

## 👑 OpenCode (Master Orchestrator)
- Status: VERIFIED
- Modelle: x-preview-f-free via opencode-router (Session)
- Skills/Plugins/MCPs: keine eigenen (siehe SKILLS/PLUGINS/MCP.md)
- GitHub: fetch+push+issues+PR-Kommentare (Credential Store, Nate8645) — live
- Repos: ai-business (rw)
- Tools: PowerShell, git, node, WebSearch/WebFetch, Invoke-RestMethod
- Staerken: Orchestrierung, Integration, Tests, Git, QA, Fallback fuer alles
- Einschraenkungen: kein Browser-Rendering (visuelle Checks indirekt)
- Getestet: Pushes bis 14faba9, Issue #2/#4/#5, PR#3 close, HTML-Checks
- Letzter Test: 2026-08-25

## 🧠 Claude Code (Senior Architect)
- Status: VERIFIED
- Modelle: Abo (sonnet Standard, haiku, fable-5 limit-gefenstert)
- Skills: 13 unique; 3 user-skills SHARED VIA FILE-READ (OpenCode-getestet),
  9 Plugin-Skills CLAUDE_ONLY; learned BLOCKED (leerer Ordner)
- Plugins: 10 ENABLED (4 custom + 6 offiziell neu); Pool 48 verfuegbar;
  Duplikat disabled
- Subagents: 24 unique (2 user + 22 plugin) CLAUDE_ONLY
- MCPs: 42 kategorisiert (0 active / 11 raw / ~30 auth / 1 failed / 1 incompat.)
- GitHub: indirekt (lokaler Workspace; OpenCode pusht)
- Tools: claude -p CLI, Dateizugriff, git diff lesen
- Staerken: Architektur, Reviews mit echten FAIL-Befunden, Security
- Einschraenkungen: async-Limit-Fenster je Modell; kein direkter Push
- Getestet: Formular-Analyse, Trust-Review PASS, Feature-Review FAIL->PASS-Zyklus
- Letzter Test: 2026-08-25

## 🔬 Arena AI (Research, Agent Mode)
- Status: VERIFIED VIA GITHUB
- Auth: GitHub App arena-ai-coding-agent (App-Identitaet im PR verifiziert)
- Skills/Plugins/MCPs: n/a (geschlossenes System)
- GitHub: Branch arena/*, Commit, PR (#3 mergeable CLEAN), Issues lesend?
- Role: Research, Marktanalyse, zweite Analyse; Coding wenn sinnvoll
- Handoff: Issue [ARENA] -> Antwort per arena/* PR
- Einschraenkungen: asynchron (Antwortdauer unklar); bisher nur Test-PR
- Getestet: PR #3 Artefakt · Tasks #4/#5 offen (Antwort steht aus)
- Letzter Test: 2026-08-25 (Kanal; Inhaltsqualitaet noch nicht bewertet)

## 🎨 DesignArena (Creative Route)
- Status: PARTIAL (Bridge VERIFIED / Export-App NOT AVAILABLE)
- Bridge: tools/design-route.mjs -> OpenRouter API (Key Env) — 3 Live-Outputs
- Modelle: Leaderboard-basierte Auswahl geplant (design-leaderboard.json,
  Auto-Update via Action sobald DESIGNARENA_API_KEY gesetzt); aktuell Free-Modell-Fallback
- GitHub: keine eigene Verbindung der Export-App nachweisbar (0 Artefakte)
- Tools: node, OpenRouter REST
- Staerken: schnelle UI-Snippets, variantenreich
- Einschraenkungen: Tailwind-Output muss an eigenes CSS adaptiert werden;
  kein Rendering-Test moeglich
- Getestet: Hero, Trust-Badges, Feature-Card — alle integriert
- Letzter Test: 2026-08-25

## Matrix
AGENT | CONNECTED | SKILLS | PLUGINS | REPOS | MCP | GITHUB | TEST
OpenCode | 🟢 VERIFIED | Protokoll | - | rw main | 🔴 | 🟢 full | ✅
Claude | 🟢 VERIFIED | 🟢 4 | 🟢 4 | indirekt | 🔴 | 🟡 read-local | ✅
Arena | 🟢 VIA GITHUB | - | - | branch+pr | - | 🟢 app-scope | ✅ Kanal / ⏳ Inhalt
DesignArena | 🟡 PARTIAL | - | - | - | - | 🔴 App unbestaetigt | ✅ Bridge

Legende: 🟢 VERIFIED · 🟡 PARTIAL · 🔴 NOT AVAILABLE
