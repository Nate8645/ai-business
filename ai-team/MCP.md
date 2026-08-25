# MCP — Voll-Kategorisierung (42 inventarisiert, 2026-08-25)

| Kategorie | Anzahl | Details |
|---|---|---|
| 🟢 ACTIVE | 0 | kein MCP laeuft in aktuellen Sessions |
| 🟡 AVAILABLE (Rohmaterial) | 11 | plugins/data/*-inline (mem0+venv, superpowers, nate-os, omniroute, comfy, ecc, everything-code, mem, project-starter, security-guidance) — Daten/env vorhanden, KEINE Server-Configs -> ungetestet |
| 🟠 AUTH_REQUIRED | ~30 | Plugin-MCPs laut mcp-needs-auth-cache.json (discord, slack, canva, figma, notion, linear, github-ext, firebase, serena, terraform, apollo, clay, ...); Auth nur per User-Login, nie umgehen |
| 🔴 FAILED | 1 | github remote MCP (opencode.jsonc): laedt nicht |
| ⚪ INCOMPATIBLE | 1 | Copilot-MCP-Endpoint: "does not support dynamic client registration" |

## Fazit (unveraendert gueltig)
Kernworkflow braucht kein MCP. Aktivierung von 🟠-Eintraegen nur auf
expliziten User-Wunsch (jede Auth = Account-Zugriff durch den User selbst).
