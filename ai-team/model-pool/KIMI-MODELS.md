# KIMI MODELS — Stand: 2026-08-26

Verfügbarkeit nicht bestätigt. Kein nachweisbarer API-Zugang oder Account.
Alle Model-IDs stammen aus OpenRouter-Liste, aber ohne bestätigten Account.

⚠️ **WICHTIG**: Keine Behauptung, diese seien "free", ohne Verifizierung.
Markiert als `REQUIRES AUTH` bis auf weiteres.

## Kimi Models in OpenRouter (gelistet, nicht verifiziert)

| # | Model ID | Display Name | Pricing | Context | Coding | Reasoning | Vision | Tool Calling | Agent | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | openrouter/moonshotai/kimi-k2 | Kimi K2 | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 2 | openrouter/moonshotai/kimi-k2-0905 | Kimi K2 (0905) | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 3 | openrouter/moonshotai/kimi-k2-thinking | Kimi K2 Thinking | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 4 | openrouter/moonshotai/kimi-k2.5 | Kimi K2.5 | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 5 | openrouter/moonshotai/kimi-k3 | Kimi K3 | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 6 | openrouter/moonshotai/kimi-k3.6-plus | Kimi K3.6 Plus | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 7 | openrouter/moonshotai/kimi-k3.7-flash | Kimi K3.7 Flash | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 8 | openrouter/moonshotai/kimi-k3.8-2.4t-a95b | Kimi K3.8 2.4t A95B | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |
| 9 | openrouter/moonshotai/kimi-k3.8-max | Kimi K3.8 Max | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | unbekannt | 🟡 REQUIRES AUTH |

## Authentifizierungs-Status

| Check | Ergebnis |
|---|---|
| OPENROUTER_API_KEY gesetzt | ✅ YES (OpenRouter generell) |
| Kimi-spezifischer API-Key | ❌ NICHT gefunden |
| Kimi Account im OpenRouter | ❌ NICHT bestätigt |
| Testzugang vorhanden | ❌ NICHT getestet |

## Kimi Model Capabilities (unverifiziert)

| Model | Coding (behauptet) | Reasoning (behauptet) | Vision (behauptet) | Agent (behauptet) |
|---|---|---|---|---|
| Kimi K2 | unbekannt | unbekannt | unbekannt | unbekannt |
| Kimi K3 | unbekannt | unbekannt | unbekannt | unbekannt |

⚠️ **RULE**: NIE behaupten, ein Model sei "free" oder "available", ohne
dokumentierte API-Zugangsdaten und erfolgreiche Tests.

## Integration Status

| Integration | Status | Hinweis |
|---|---|---|
| OpenRouter Kimi-Modelle | 🟡 GELISTET | In OpenRouter-Marktplatz |
| Eigener Kimi Account | 🟠 NICHT BESTÄTIGT | Muss konfiguriert werden |
| Test via `opencode run -m kimi/...` | ❌ FEHLER | Model nicht gefunden |
| Empfohlene Nutzung | 🚫 VERMEIDEN | Bis auf weiteres |

## Empfehlung

```
Kimi Modelle NICHT in den sofortigen Routing-Ketten verwenden.
Nur wenn:
1. Eigener Kimi API-Key konfiguriert ist
2. Oder explizite Erlaubnis für Kimi-Zugriff vorliegt
3. Oder Kimi als Fallback nach allen anderen Optionen

Standard-Fallback-Kette:
OpenCode Free → Ollama VERIFIED → OpenRouter Free → (später: Kimi falls konfiguriert)
```