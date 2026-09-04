# HANDOFF — Task-Übergabe zwischen Agents (2026-08-28)

## HANDOFF-FORMATE

### Format: GitHub Issue
```markdown
Title: [TEAM-HANDOFF] Task #X: <Beschreibung>
Labels: handoff, agent-<von>, agent-<an>
Body:
- Von: <Agent-Name>
- An: <Agent-Name>
- Task: <BOARD.md Task-Nummer>
- Status: <was wurde gemacht, was muss weitergemacht werden>
- Files: <betroffene Dateien>
- Commit: <letzter Commit>
- Next: <konkreter nächster Schritt>
```

### Format: Datei-Übergabe
```
Handoff-Datei: construction-site/handoffs/TASK-X.md
Inhalt: Task-Beschreibung, Status, Ergebnis, Next Steps
```

## HANDOFF-REGELN

1. Jeder Handoff muss eine Task-Nummer aus BOARD.md haben
2. Der empfangende Agent muss den Handoff bestätigen
3. Unklare Handoffs werden an Admin Team (Windows Use) eskaliert
4. Alle Handoffs werden in GitHub dokumentiert
5. Nach jedem Handoff: BOARD.md aktualisieren

## HANDOFF-CHAIN (Beispiel)

```
Task: "Shopify Store erstellen"
├── Arena AI → Research (Produkte, Wettbewerb)
│   └── Handoff zu OpenCode: Produktliste
├── OpenCode → Backend-API
│   └── Handoff zu Claude Code: Theme
├── Claude Code → Shopify Theme
│   └── Handoff zu DesignArena: UI/UX
├── DesignArena → Design-Snippets
│   └── Handoff zu OpenCode: Integration
├── OpenCode → Integration + Deploy
│   └── Handoff zu Windows Use: Server
└── Windows Use → Go-Live
    └── BOARD.md: Task ✅ DONE
```

## ESCALATION

```
Handoff fehlgeschlagen?
    │
    ├── Agent antwortet nicht → Nächster Handoff an Admin Team
    ├── Ergebnis unklar → User wird gefragt (nur bei kritischen Tasks)
    └── Task blocked → BOARD.md: Status ❌ BLOCKED
```
