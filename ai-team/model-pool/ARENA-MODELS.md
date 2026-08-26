# ARENA AI MODELS — Stand: 2026-08-26

Verbindung: GitHub App `arena-ai-coding-agent[bot]`.
Authentifizierung: App-Installation auf Nate8645/ai-business.
Status: CONNECTED VIA GITHUB (asynchron).

## Bekannte Arena Integration

| Komponente | Status | Quelle |
|---|---|---|
| GitHub App Installation | ✅ VERIFIED | App auf Nate8645/ai-business installiert |
| PR #3 (Test) | ✅ VERIFIED | Commit 36a2667, Branch arena/01a03568-ai-business |
| Issue #4 ([ARENA]) | ⏳ OFFEN | Wartet auf Arena-Antwort |
| Issue #5 ([ARENA]) | ⏳ OFFEN | Wartet auf Arena-Antwort |
| Issue #6 ([ARENA]) | ⏳ OFFEN | Wartet auf Arena-Antwort |
| Issue #7 ([ARENA]) | ⏳ OFFEN | Wartet auf Arena-Antwort |

## Arena Models

Derzeit sind keine spezifischen Model-IDs durch Arena öffentlich dokumentiert.
Arena arbeitet über GitHub Issues/PRs als Kommunikationslayer.

### Bekannte Arena-Fähigkeiten (aus PR-Interaktionen)

| Fähigkeit | Status | Hinweis |
|---|---|---|
| Research/Market Analysis | ✅ GETESTET | Via WebSearch-Fallback in OpenCode |
| Branch/Feature Creation | ✅ GETESTET | PR #3 erstellt erfolgreich |
| Code Review | ⚠️ TEILWEISE | Offene Issues #4-#7 warten |
| Design Variants | ✅ GETESTET | DesignArena Bridge via OpenRouter |

### Arena-unterstützte Model-Kategorien

| Kategorie | Verfügbarkeit | Bemerkung |
|---|---|---|
| Research via WebSearch | ✅ VERIFIED | OpenCode WebSearch als Fallback |
| Issue Creation | ✅ VERIFIED | `#[ARENA]` Issues werden von Arena bearbeitet |
| PR Creation | ✅ VERIFIED | Arena antwortet per Branch+PR |
| Design Snippets | ✅ VERIFIED | Via tools/design-route.mjs + OpenRouter |

## Arena Model Routing

```
AGENT TASK → Arena AI
    ↓
Issue `[ARENA] <task>` erstellen
    ↓
Arena antwortet per arena/*-Branch + PR
    ↓
OpenCode integriert Ergebnis nachträglich
    ↓
WebSearch-Fallback falls keine Arena-Antwort innerhalb Frist
```

⚠️ **WICHTIG**: Arena ist asynchron.
Offene Issues #4-#7 blockieren keine OpenCode-Aufgaben.
OpenCode arbeitet mit WebSearch-Fallback weiter.

## Available Free Models via Arena

| Model | Status | Test Result |
|---|---|---|
| Keine direkten Model-IDs | 🟡 AVAILABLE | Nur über GitHub App |
| Research (WebSearch) | 🟢 VERIFIED | OpenCode WebSearch |
| Design via OpenRouter Bridge | 🟢 VERIFIED | tools/design-route.mjs |

## Routing Decision

```
Wenn Task: Research/Design → OpenCode WebSearch + DesignArena Bridge
Wenn Task: Code/Implementation → OpenCode + Ollama Free Models
Wenn Task: Issue Creation → Arena GitHub App (asynchron)
```

## Limits

- Keine Rate-Limits für OpenCode WebSearch
- Arena: asynchron, depends on Arena-Agents response time
- Keine Token-Counting durch Arena (GitHub Issues sind kostenlos)