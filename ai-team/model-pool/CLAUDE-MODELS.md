# CLAUDE MODELS — Stand: 2026-08-26

Verbindung: Claude Code v2.1.238 via OAuth (Auth repariert 25.08.).
Kein API-Key im User-Env (entfernt). Backup: ANTHROPIC_API_KEY_BACKUP.

## Auth Status

| Status | Wert |
|---|---|
| Claude Code Version | v2.1.238 |
| Authentifizierung | OAuth (erfolgreich neu geloggt) |
| ANTHROPIC_API_KEY | ❌ NICHT im User-Env |
| ANTHROPIC_API_KEY_BACKUP | 📋 existiert als Backup |
| Test `claude -p` | ✅ "OK" (Sonnet default) |
| Enabled Plugins | 10 (4 Custom + 6 Official) |

## Verfügbare Claude Modelle (über Claude Code Abonnement)

| # | Modell | Display Name | Coding | Reasoning | Tool Calling | Agent | Status |
|---|---|---|---|---|---|---|---|
| 1 | claude-sonnet-4 (default) | Claude Sonnet 4 | ✅ | ✅ | ✅ | ✅ | 🟢 VERIFIED (getestet) |
| 2 | claude-sonnet-3.7 | Claude Sonnet 3.7 | ✅ | ✅ | ✅ | ✅ | 🟡 AVAILABLE |
| 3 | claude-opus-4.1 | Claude Opus 4.1 | ✅✅ | ✅✅ | ✅✅ | ✅✅ | 🔴 PAID (teuerste) |
| 4 | claude-haiku-3.5 | Claude Haiku 3.5 | ✅ | ✅ | ✅ | ✅ | 🟡 AVAILABLE (günstigste) |
| 5 | claude-fable-5 | Claude Fable 5 (Custom) | ❓ | ❓ | ❓ | ❓ | 🟡 NACHWEISBAR nicht ohne Plugin-Check |

## Plugin-Enabled Models

| Plugin | Modell | Status |
|---|---|---|
| code-review | Claude Sonnet | ✅ ENABLED |
| frontend-design | Claude Sonnet | ✅ ENABLED |
| feature-dev | Claude Sonnet | ✅ ENABLED |
| security-guidance | Claude Sonnet | ✅ ENABLED |
| pr-review-toolkit | Claude Sonnet | ✅ ENABLED |
| skill-creator | Claude Sonnet | ✅ ENABLED |
| ultra-enterprise-os | Custom | ✅ ENABLED (4 Custom Plugins) |
| nate-milliarden-addon | Custom | ✅ ENABLED |
| fable-5-enterprise-os | Custom | ✅ ENABLED |
| fable-5-komplett | Custom | ✅ ENABLED |

## Claude Model Routing

```
ARCHITECTURAL / COMPLEX CODING
    ↓
claude-sonnet-4 (DEFAULT, VERIFIED)
    ↓
claude-haiku-3.5 (kostengünstig, falls verfügbar)
    ↓
BLOCKED wenn kein Claude-Abo

HOCHAUFWANDIGE CODE-REVIEW
    ↓
claude-sonnet-4 (bestes Ergebnis)
    ↓
OpenCode own Review (falls Claude nicht verfügbar)
    ↓
BLOCKED wenn kein Claude-Abo

KREATIVE TASKS
    ↓
claude-opus-4.1 (beste Qualität, aber 🔴 PAID)
    ↓
claude-sonnet-4 (gut, $0 zusätzlich)
    ↓
OpenCode Free Models → Ollama
```

## Cost Control

```
CLAUDE COST: 🔴 PAID (je nach Abonnement-Tier)
AUTO-ROUTE: ❌ DISABLED (ohne explizite Erlaubnis)
FALLBACK: OpenCode Free → Ollama → OpenRouter Free
```

⚠️ **RULE**: Nur nutzen wenn explizite Genehmigung vorliegt.
Wenn kein Claude-Abo aktiv:
→ NIE Claude verwenden
→ Sofort auf OpenCode Free oder Ollama ausweichen

## Verified Capabilities (from last test 25.08.)

| Capability | Status |
|---|---|
| Code Review (HTML/CSS/Zero-Fiction) | ✅ PASS |
| Content Analysis | ✅ 3 Findings |
| Zero-Fiction Check | ✅ PASS (keine Fake-Claims) |
| HTML/CSS Validation | ✅ 5/5 sections, 18/18 divs |

## Integration mit OpenCode

```
Claude Code wird verwendet für:
- Komplexe Code-Reviews
- Architektur-Entscheidungen
- Security Reviews
- UI/UX Design Reviews

OpenCode wird verwendet für:
- Git Operations
- Projekt-Setup
- Model Pool Management
- Testing & Verification
```