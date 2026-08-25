# CAPABILITY-REGISTRY — konsolidiert 2026-08-25

Single Source of Truth fuer alle Team-Capabilities. Konsolidiert SKILLS.md,
PLUGINS.md, MCP.md, REPOSITORIES.md, CAPABILITIES.md. Bei Widerspruch gilt
diese Registry; Detaildateien bleiben Nachschlagewerk.

Status-Legende: VERIFIED | AVAILABLE | AUTH REQUIRED | FAILED | CLAUDE ONLY |
ADAPTER REQUIRED | REFERENCE ONLY | NOT FOUND

## Export-/Integrationsdateien
| Datei | Status |
|---|---|
| EXPORT-MANIFEST.md | NOT FOUND |
| OPENCODE-INTEGRATION.md | NOT FOUND |
| ai-team/SKILLS.md etc. | VORHANDEN (eigene Doku) |

## AGENTS / SUBAGENTS
| Name | Typ | Quelle | Funktion | Status |
|---|---|---|---|---|
| OpenCode CLI | Agent | lokal | Master/Orchestration/Coding/Git | VERIFIED |
| fable5-max, nate | Subagent | user-level | Arbeitsmodi | CLAUDE ONLY (ungetestet als Subagent) |
| ultra-* (22 Stk: ceo/architect/security/qa/research/design/...) | Subagent | Custom-Plugins | Rollen-Routing in Claude-Sessions | CLAUDE ONLY |
| arena-ai-coding-agent[bot] | GitHub App | remote | Research/Branches/PRs | VERIFIED VIA GITHUB |

## SKILLS (13)
| Skill | Quelle | Nutzung | Status |
|---|---|---|---|
| fable5-mode, nate, ultimate-performance-mode | user-level | SHARED VIA FILE-READ | VERIFIED (OpenCode liest+befolgt) |
| learned | user-level | leer | BLOCKED |
| cod, milliarden-unternehmen, unternehmen, ultra-enterprise-os, fable-5* (5) | Plugins | nur Claude-Sessions | CLAUDE ONLY |

## PLUGINS
| Plugin | Status |
|---|---|
| 4 Custom (ultra-enterprise-os 2.1.0, nate-milliarden-addon, fable-5-enterprise-os, fable-5-komplett) | ENABLED, CLAUDE ONLY |
| code-review, frontend-design, feature-dev, security-guidance, pr-review-toolkit, skill-creator | ENABLED (neu installiert), CLAUDE ONLY |
| 48 weitere Marketplace-Plugins | REFERENCE ONLY (installierbar bei Bedarf) |
| Design Arena Export (GitHub App) | FAILED/NICHT NACHWEISBAR (0 Artefakte) |

## COMMANDS (13 unique)
milliarden, firma, instanziiere, blin-morning, ultra*, fable5* -> CLAUDE ONLY.

## MCPs (42)
| Kategorie | Anzahl | Status |
|---|---|---|
| Aktiv | 0 | - |
| Rohmaterial (plugins/data/*-inline inkl. mem0-venv, omniroute, superpowers) | 11 | ADAPTER REQUIRED (keine Server-Configs) |
| Auth-pending | ~30 | AUTH REQUIRED (nur User kann Login) |
| github remote MCP | 1 | FAILED (OAuth dynamic registration inkompatibel) |

## TOOLS
| Tool | Pfad | Funktion | Status |
|---|---|---|---|
| design-route.mjs | tools/ | Design-Tasks via OpenRouter | VERIFIED SHARED (4 Live-Outputs) |
| audit-generator.mjs | tools/ | regelbasierte Audit-PDF | VERIFIED (Live-PDF 3147B) |
| crm-report.mjs | tools/ | Pipeline/Overdue-Report | VERIFIED (Bugfix live getestet) |
| generator.py | 4x in Plugins | Zweck ungeprueft | AVAILABLE/NOT TESTED |
| jarvis-listen.ps1 | ~/.claude/jarvis | ungeprueft | AVAILABLE/NOT TESTED |
| rat.py, curbcut, n8n, omniroute-CLI | - | - | NOT FOUND |
| Docker | lokal | Daemon aus -> MCP-Option blockiert | FAILED (environment) |

## GITHUB
| Kanal | Status |
|---|---|
| Push/Fetch main (Nate8645 Credential Store) | VERIFIED |
| Issues als Handoff (#2,#4,#5,#6,#7) | VERIFIED |
| Pages-Deployment (public/, Workflow) | VERIFIED LIVE (HTTP 200 alle Assets) |
| Actions design-leaderboard | ACTIVE, wartet auf Secret/Schedule |
| Webhooks | NOT APPLICABLE ohne externen Server + Admin |

## EXTERNE KEYS
OPENROUTER_API_KEY: VERIFIED (417 Modelle, Free-Completion OK)
DESIGNARENA_API_KEY: AUTH REQUIRED (User-Antrag)
GITHUB_TOKEN(env): FAILED/obsolet (Credential Store nutzt Nate8645)

## Routing-Kurzform (Details: ROUTING.md)
Research->Arena-Issue(+WebSearch-Fallback) · Architektur/Coding/Review->Claude
CLI · UI-Snippets->design-route · Integration/Test/Git/Pages->OpenCode.
Nicht relevanter Agent meldet NOT RELEVANT.
