# ORCHESTRATION — Live-getestetes Team-Protokoll (2026-08-25)

## Rollen

| Agent | Rolle | Kanal | Beweis |
|---|---|---|---|
| 👑 OpenCode | Master/Orchestrator/Integration | CLI + Git | Push dbe40a5, Issue #2 |
| 🧠 Claude Code | Architect/Coding/Review | CLI via Abo | Repo-Analyse-Task korrekt beantwortet |
| 🔬 Arena AI | Research (Fallback) | WebSearch+HF-Dataset | keine Integration existierbar |
| 🎨 DesignArena | Design/UI/UX | design-route.mjs→OpenRouter | echtes HTML-Snippet generiert |

## Workflow (jeder Schritt live getestet)

```text
OpenCode: Aufgabe analysieren
   ├─ Research nötig? → WebSearch/HF-Dataset → HANDOFFS.md-Eintrag
   ├─ Code nötig?     → claude -p "<task>"    → Output prüfen
   └─ Design nötig?   → node tools/design-route.mjs "<brief>" → Snippet integrieren
   ↓
GitHub Issue (Handoff-Queue): POST /issues → Label agent-task
   ↓
Implementierung → Branch feat/* bei größeren Änderungen
   ↓
Review: claude -p "Review diff von <file>" (Security+Qualität)
   ↓
Commit + Push (real getestet) → Actions laufen remote
   ↓
Issue schließen → nächste Aufgabe
```

## Delegationsbefehle (exakt)

- Claude Task:  `claude -p "<aufgabe>"` (workdir=repo, Abo-Auth)
- Claude Review:`claude -p "Pruefe <datei> auf Security/Qualitaet, liste Befunde"`
- Design Task:  `node tools/design-route.mjs "<design-brief>"`
- Handoff-Issue: POST /repos/Nate8645/ai-business/issues (Credential Store,
  Account Nate8645 — Token niemals anzeigen/committen)
- Fallback: fällt ein Agent aus, übernimmt OpenCode dessen Schritt vollständig.

## Grenzen (ehrlich)

- Arena AI: KEINE offizielle API/MCP/App → nur Fallback-Kanal aktiv.
- DesignArena-GitHub-App "Design Arena Export": nicht verifizierbar, 0 Artefakte;
  solange kein Artefakt erscheint, gilt: NOT CONNECTED (App) / CONNECTED (Bridge).
- Webhooks: ohne externen Server + Admin-Rechte nicht anwendbar.
- Offizieller GitHub-MCP (docker): Docker-Daemon läuft nicht → optional, später.
