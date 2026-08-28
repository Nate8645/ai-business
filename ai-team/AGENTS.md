# AGENTS — Rollen & Verbindungen (Stand: 2026-08-28, E2E-getestet)

## 👑 ADMIN TEAM — Entscheidungsbefugnis (Priorität 1)

### 🪟 Windows Use — SYSTEM ADMIN / PLATFORM OPERATIONS
- Connection: Windows PowerShell 5.1, WMI, WinRM, RDP, Hyper-V
- Auth: Lokale Admin-Rechte / Domain-Credentials (Credential Store)
- GitHub: indirekt — OpenCode pusht Ergebnisse
- Role: System-Level Operations, Infrastructure Provisioning, Security Hardening, Deployment & CI/CD auf Windows Nodes, Notfall-Zugriff & Disaster Recovery
- Handoff: PowerShell-Skripte, WMI-Queries, RDP-Sessions
- Fallback: OpenCode übernimmt Admin-Tasks bei Ausfall
- Live test: PowerShell 5.1 verified · Hyper-V available · Defender managed
- Status: **ACTIVE**

### 👑 OpenCode v1.18.22 — MASTER ORCHESTRATOR
- Connection: CLI lokal
- Auth: Session-basiert
- GitHub: fetch/push/issues voll (Credential Store, Account Nate8645)
- Role: Planung, Implementierung, Tests, Git/GitHub, QA, Integration
- Handoff: Issues + Commits + Pushes auf main
- Fallback: übernimmt ALLE Rollen bei Agent-Ausfall
- Live test: Push db0c132 · Issue #2/#4 erstellt · PR #3 kommentiert/geschlossen
- Status: **CONNECTED**

### 🧠 Claude Code v2.1.238 — SENIOR ARCHITECT
- Connection: CLI (`claude -p`)
- Auth: bestehendes Claude-Abo via OAuth (kein API-Key; Backup: ANTHROPIC_API_KEY_BACKUP)
- GitHub: indirekt — liest lokalen Workspace, OpenCode pusht Ergebnisse
- Role: komplexe Entwicklung, Refactoring, Code Review, Security Review
- Handoff: `claude -p "<task>"` im Repo-Workdir
- Fallback: OpenCode übernimmt Coding/Review
- Live test: Trust-Sektion-Review → PASS (3 Befunde, Zero-Fiction geprüft)
- Status: **CONNECTED**

## 🧠 CORE TEAM — Ausführung (Priorität 2)

### 🔬 Arena AI — RESEARCH (Agent Mode)
- Connection: GitHub App `arena-ai-coding-agent` (Identität app-verifiziert)
- Auth: App-Installation auf Nate8645/ai-business
- GitHub: eigener Branch + Commit + PR (#3, mergeable CLEAN)
- Role: Research, Marktanalyse, Ideen, Recherche, Analyse
- Handoff: Issue `[ARENA] ...` erstellen → Arena antwortet per arena/*-Branch+PR
- Fallback: OpenCode WebSearch (+ offizielles HF-Dataset)
- Live test: PR #3 (Commit 36a2667) verifiziert · Task-Issue #4 offen
- Status: **CONNECTED VIA GITHUB** (asynchron)

### 🎨 DesignArena — CREATIVE ROUTE
- Connection a) GitHub App "Design Arena Export": nicht verifizierbar, 0 Artefakte
- Connection b) Bridge tools/design-route.mjs → OpenRouter (Key vorhanden)
- Auth: OPENROUTER_API_KEY (Env, niemals angezeigt/committet)
- Role: UI/UX, Design-Varianten, Frontend-Bausteine
- Handoff: `node tools/design-route.mjs "<brief>"` → Snippet → OpenCode adaptiert
- Fallback: OpenCode eigenes UI/UX
- Live test: Hero-Snippet + Trust-Badges generiert; Badges live in index.html (db0c132)
- Status: **CONNECTED VIA BRIDGE** / App **UNBESTÄTIGT**

## GITHUB — Source of Truth
Alle Kanäle getestet: main-Push ✓ · Issue-Roundtrip ✓ · Arena-Branch ✓ ·
Actions-Workflow ACTIVE ✓. Keine Tokens in Dateien/Chat; Credential Store nur.
