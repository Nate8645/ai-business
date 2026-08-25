# MCP — Status 2026-08-25

## Konfiguriert
| MCP | Ort | Ziel | Status |
|---|---|---|---|
| github (remote) | ~/.config/opencode/opencode.jsonc -> api.githubcopilot.com/mcp/ | GitHub-Tools in OpenCode | FAILED: OAuth "does not support dynamic client registration"; Tools nie geladen |

## Alternativen (geprueft)
- Offizieller github/github-mcp-server via Docker: Docker-Daemon laeuft nicht -> OPTIONAL, nicht eingerichtet.
- Claude Plugin-MCPs (~30 Stueck): alle auth-pending -> NOT CONNECTED.

## Entscheidung (D-009)
Kernworkflow braucht KEIN MCP: git CLI + GitHub REST (Credential Store) +
claude -p + design-route.mjs decken alles ab. MCP-Fix nur bei konkretem Bedarf.

## Regel
Kein MCP als CONNECTED markieren ohne geladene Tools in einer Session.
