# GPT / CHATGPT MODELS — Stand: 2026-08-26

Verfügbarkeit nicht bestätigt. Kein nachweisbarer OpenAI API Account.
Alle Model-IDs stammen aus OpenRouter-Liste, aber ohne bestätigten OpenAI-Zugang.

⚠️ **WICHTIG**: Keine Behauptung, diese seien "free", ohne Verifizierung.
Markiert als `REQUIRES AUTH` bis auf weiteres.

## GPT Models in OpenRouter (gelistet, nicht verifiziert)

| # | Model ID | Display Name | Pricing | Context | Coding | Reasoning | Vision | Tool Calling | Agent | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | openrouter/openai/gpt-4o | GPT-4o | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 2 | openrouter/openai/gpt-4o-mini | GPT-4o Mini | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 3 | openrouter/openai/gpt-4-turbo | GPT-4 Turbo | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 4 | openrouter/openai/gpt-4 | GPT-4 | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 5 | openrouter/openai/gpt-3.5-turbo | GPT-3.5 Turbo | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 6 | openrouter/openai/gpt-3.5-turbo-0613 | GPT-3.5 Turbo (0613) | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 7 | openrouter/openai/gpt-4o-mini-2024-07-18 | GPT-4o Mini (0718) | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 8 | openrouter/openai/gpt-5 | GPT-5 | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 9 | openrouter/openai/gpt-4.5 | GPT-4.5 | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 10 | openrouter/openai/gpt-4audio | GPT-4 Audio | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |

## Authentifizierungs-Status

| Check | Ergebnis |
|---|---|
| OPENROUTER_API_KEY gesetzt | ✅ YES (OpenRouter generell) |
| OpenAI API Key | ❌ NICHT gefunden in Env |
| OpenAI Account | ❌ NICHT bestätigt |
| Testzugang vorhanden | ❌ NICHT getestet |

## GPT Model Capabilities (unverifiziert)

| Model | Coding (behauptet) | Reasoning (behauptet) | Vision (behauptet) | Tool Calling (behauptet) |
|---|---|---|---|---|
| GPT-4o | ✅ Behauptet sehr gut | ✅ Behauptet sehr gut | ✅ Behauptet Vision | ✅ Behauptet Tool Calling |
| GPT-4o-mini | ✅ Behauptet gut | ✅ Behauptet gut | ❌ Kein Vision | ✅ Behauptet Tool Calling |
| GPT-3.5-turbo | ⚠️ Behauptet basic | ⚠️ Behauptet basic | ❌ Kein Vision | ✅ Behauptet Tool Calling |

⚠️ **RULE**: NIE behaupten, ein Model sei "free" oder "available", ohne
dokumentierte API-Zugangsdaten und erfolgreiche Tests.

## Integration Status

| Integration | Status | Hinweis |
|---|---|---|
| OpenRouter GPT-Modelle | 🟡 GELISTET | In OpenRouter-Marktplatz |
| Eigenes OpenAI Konto | 🟠 NICHT BESTÄTIGT | Muss konfiguriert werden |
| Test via `opencode run -m openai/gpt-4o` | ❌ FEHLER | Model nicht ohne Key verfügbar |
| Empfohlene Nutzung | 🚫 VERMEIDEN | Bis auf weiteres |

## Cost Control Integration

```
GPT KOSTEN: 🔴 PAID (pro Token, OpenAI Preise)
AUTO-ROUTE: ❌ DISABLED (ohne explizite Erlaubnis)
FALLBACK: OpenCode Free → Ollama VERIFIED → OpenRouter Free
```

## Empfehlung

```
GPT Modelle NICHT in den sofortigen Routing-Ketten verwenden.
Standard-Fallback-Kette:
1. OpenCode Free Models (VERIFIED)
2. Ollama Local Models (VERIFIED: qwen3:0.6b, 1.7b, 4b, llama3.2)
3. OpenRouter Free Models (*:free)
4. GPT ONLY nach expliziter Genehmigung und Key-Konfiguration
```