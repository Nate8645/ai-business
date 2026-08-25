# PLUGINS — Vollstaendiger Bestand (Audit 2026-08-25)

Quelle der Wahrheit: Dateisystem (~/.claude/plugins). Alte Doku war unvollstaendig.

## A) AKTIV INSTALLIERT (Stand: 2026-08-25, claude plugin list verifiziert)
### Custom (local-desktop-app-uploads)
| Plugin | Version | Status |
|---|---|---|
| ultra-enterprise-os | 2.1.0 | ENABLED |
| nate-milliarden-addon | 1.0.0 | ENABLED |
| fable-5-enterprise-os | 1.0.0 | ENABLED |
| fable-5-komplett | 1.0.0 | ENABLED |
### Offiziell (NEU INSTALLIERT 2026-08-25, alle ENABLED)
| Plugin | Zweck fuer Team |
|---|---|
| code-review | Review-Playbooks -> Claude-Reviews |
| frontend-design | UI-Qualitaetsrichtlinien -> DesignArena/OpenCode-Adaption |
| feature-dev | Feature-Workflow -> Architektur-Tasks |
| security-guidance | Security-Checklisten -> Pflicht-Review |
| pr-review-toolkit | PR-Begutachtung -> GitHub-PRs |
| skill-creator | Neue Team-Skills erstellen |

Duplikat ultra-enterprise-os@nate-marketplace 1.0.0: DISABLED (bleibt so).

Inhalt je Plugin: eigene agents/, commands/, skills/, tools/generator.py
(Details in SKILLS.md / CAPABILITIES.md).

## B) VOLLSTAENDIGER MARKETPLACE-KLON claude-plugins-official (lokal, nicht installiert)
Offizielle Plugins (39): agent-sdk-dev, clangd-lsp, claude-code-setup,
claude-md-management, claude-security, code-modernization, code-review,
code-simplifier, commit-commands, csharp-lsp, cwc-makers, example-plugin,
explanatory-output-style, feature-dev, frontend-design, gopls-lsp, hookify,
jdtls-lsp, kotlin-lsp, learning-output-style, lua-lsp, math-olympiad,
mcp-server-dev, mcp-tunnels, php-lsp, playground, plugin-dev,
pr-review-toolkit, project-artifact, pyright-lsp, ralph-loop, receipts,
ruby-lsp, rust-analyzer-lsp, security-guidance, session-report, skill-creator,
swift-lsp, typescript-lsp.
External (15): asana, context7, discord, fakechat, firebase, github, gitlab,
greptile, imessage, laravel-boost, linear, playwright, serena, telegram, terraform.
Status aller 54: NUR REFERENZ (vorhanden, installierbar bei Bedarf).

## C) nate-marketplace (GitHub Nate8645er/Nate, lokal geklont)
- ultra-enterprise-os v1.0.0 = ALTES DUPLIKAT von A) (2.1.0 aktiv)
- .claude/: 10 agents, 3 commands, 1 skill (Subset-Duplikate von A)
- javier-mobile/static: statische Web-Vorlage, ungetestet

## D) Duplikat-Register (keine zweite Installation noetig)
| Element | Kopien | Aktiv genutzte Version |
|---|---|---|
| ultra-enterprise-os | 3x (local 2.1.0, NM 1.0.0, cache 1.0.0) | 2.1.0 |
| cod/milliarden-unternehmen/unternehmen Skills | je 4x (in A-Plugins) | via aktive Plugins |
| fable-5-max Skill | 2x | fable-5-komplett + enterprise-os |
| generator.py | 4x | je Plugin |

## E) Plugin-nahe MCP-Daten (~/.claude/plugins/data)
comfy-inline, ecc-inline, everything-code-inline, mem-inline, mem0-inline (+venv),
nate-os-inline, omniroute-inline, plugins-inline, project-starter-inline,
security-guidance-inline, superpowers-inline -> Vorhanden, Funktionsfaehigkeit
ungeprueft; zugehoerige MCPs auth-pending (siehe MCP.md).

## Team-Nutzung (ehrlich)
Aktiv im Team-Einsatz: nur A) in Claude-Sessions. B)/C) installierbarer Pool.
Repo-getragene Capabilities (tools/design-route.mjs, ai-team-Protokolle) sind
die einzigen bisher TESTED shared Tools.
