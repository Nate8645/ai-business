# ROUTING — Aufgabe zu Agent

| Aufgabentyp | Primaer | Kanal/Befehl | Fallback | Sync |
|---|---|---|---|---|
| Architektur / komplexes Coding | Claude Code | `claude -p "<task>"` | OpenCode | ja |
| Code-/Security-Review | Claude Code | `claude -p "Review git diff"` | OpenCode | ja |
| UI/UX Snippet / Design-Variante | DesignArena | `node tools/design-route.mjs` | OpenCode | ja |
| Markt-/Wettbewerbsrecherche | Arena AI | Issue `[ARENA] <task>` | OpenCode WebSearch | nein (async) |
| Strategie / Ideen | Arena AI | wie oben | OpenCode | nein (async) |
| Integration / Testing / Git / QA | OpenCode | direkt | - | ja |

## Regeln

0. Capability-Check VOR jeder Aufgabe: ai-team/SKILLS.md, PLUGINS.md,
   CAPABILITIES.md durchsehen -> bestes verfuegbares Werkzeug waehlen;
   nicht relevante Agenten explizit NOT RELEVANT melden.
1. Multi-Domain-Aufgabe splitten und parallel verteilen.
2. Arena ist asynchron: Issue bleibt offen bis Antwort per arena/*-Branch+PR;
   OpenCode arbeitet mit WebSearch-Fallback weiter und integriert Arena-Ergebnis nachtraeglich.
3. Jede Aenderung: diff pruefen -> Claude-Review -> Test -> Commit -> Push.
4. Kein Agent blockiert das Projekt: Fallback-Pfad immer zuerst definieren.
5. Status-Wahrheit: nur ai-team/STATUS.md, nach jedem Test aktualisieren.
