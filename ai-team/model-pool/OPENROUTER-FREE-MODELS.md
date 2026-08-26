# OPENROUTER FREE MODELS — Stand: 2026-08-26

Alle Modelle mit `:free` Suffix oder explizit $0 über OpenRouter.
Quelle: `opencode models` live abgefragt. 17 Free-Modelle gefunden.

⚠️ WICHTIG: OpenRouter erfordert OPENROUTER_API_KEY Umgebungvariable.
Verfügbarkeit hängt von Account-Contingent und Rate-Limits ab.
Keine Garantie für unlimitierten Zugriff.

## Free Models via OpenRouter (17)

| # | Provider | Model ID | Display Name | Pricing | Context | Coding | Reasoning | Vision | Tool Calling | Agent | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | OpenRouter | openrouter/cohere/north-mini-code:free | Cohere North Mini Code | $0 | STANDARD | ✅ AVAILABLE | ❌ NOT TESTED | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 2 | OpenRouter | openrouter/dots-studio/dots-3-note-preview:free | Dots Studio Dots 3 Note Preview | $0 | STANDARD | ✅ AVAILABLE | ✅ AVAILABLE | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 3 | OpenRouter | openrouter/google/gemma-4-26b-a4b-it:free | Gemma 4 26B Instruct | $0 | STANDARD | ✅ AVAILABLE | ✅ AVAILABLE | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 4 | OpenRouter | openrouter/google/gemma-4-31b-it:free | Gemma 4 31B Instruct | $0 | STANDARD | ✅ AVAILABLE | ✅ AVAILABLE | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 5 | OpenRouter | openrouter/liquid/lfm-2.5-2.6b:free | Liquid LFM 2.5 | $0 | SMALL | ✅ AVAILABLE | ❌ NOT TESTED | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 6 | OpenRouter | openrouter/minimax/minimax-m2.7:free | Minimax M2.7 | $0 | LARGE | ✅ AVAILABLE | ✅ AVAILABLE | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 7 | OpenRouter | openrouter/minimax/minimax-m3:free | Minimax M3 | $0 | LARGE | ✅ AVAILABLE | ✅ AVAILABLE | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 8 | OpenRouter | openrouter/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | Nemotron 3 Nano Omni Reasoning | $0 | LARGE | ✅ AVAILABLE | ✅ AVAILABLE | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 9 | OpenRouter | openrouter/nvidia/nemotron-3-super-120b-a12b:free | Nemotron 3 Super 120B | $0 | XLARGE | ✅ AVAILABLE | ✅ AVAILABLE | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 10 | OpenRouter | openrouter/nvidia/nemotron-3-ultra-550b-a55b:free | Nemotron 3 Ultra 550B | $0 | XXLARGE | ✅ AVAILABLE | ✅ AVAILABLE | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 11 | OpenRouter | openrouter/nvidia/nemotron-3.5-content-safety:free | Nemotron 3.5 Content Safety | $0 | STANDARD | ❌ NOT TESTED | ❌ NOT TESTED | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 12 | OpenRouter | openrouter/nvidia/nemotron-3.5-lightning:free | Nemotron 3.5 Lightning | $0 | STANDARD | ✅ AVAILABLE | ✅ AVAILABLE | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 13 | OpenRouter | openrouter/poolside/laguna-s-2.1:free | Laguna S 2.1 | $0 | LARGE | ✅ AVAILABLE | ✅ AVAILABLE | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 14 | OpenRouter | openrouter/poolside/laguna-xs-2.1:free | Laguna xs 2.1 | $0 | STANDARD | ✅ AVAILABLE | ✅ AVAILABLE | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 15 | OpenRouter | openrouter/thinkingmachines/inkling-small:free | Inkling Small | $0 | STANDARD | ✅ AVAILABLE | ✅ AVAILABLE | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 16 | OpenRouter | openrouter/thinkingmachines/inkling:free | Inkling | $0 | LARGE | ✅ AVAILABLE | ✅ AVAILABLE | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |
| 17 | OpenRouter | openrouter/z-ai/glm-5.2:free | GLM 5.2 | $0 | LARGE | ✅ AVAILABLE | ✅ AVAILABLE | ❌ NO | ✅ AVAILABLE | ✅ AVAILABLE | 🟡 AVAILABLE |

## OpenRouter Meta-Modelle

| Provider | Model ID | Pricing | Funktion | Status |
|---|---|---|---|---|
| OpenRouter | openrouter/openrouter/free | $0 | Meta-Routing zu allen Free-Modellen | 🟡 AVAILABLE |
| OpenRouter | openrouter/openrouter/auto | variabel | Auto-Routing (kann Paid triggern!) | 🔴 RISK: PAID |

## Limits & Rate Control

OpenRouter kostenlose Modelle unterliegen Limits:
- Rate Limits: pro Minute/Stunde je nach Account-Status
- Token Limits: variabel nach Model (meist 32K-128K Kontext)
- Daily Limits: depends on Account-Tier
- Priority: Free-Requests haben niedrigere Priority

Bei Erreichen eines Limits:
```
RATE LIMIT REACHED
↓
NEXT FREE MODEL (OpenRouter-FREE-MODELS.md)
↓
OLLAMA LOCAL (kein Limit)
↓
BLOCKED (nicht auf Paid ausweichen!)
```

## OpenRouter Free Model Recommendations

### Best for Coding
`openrouter/cohere/north-mini-code:free` oder `openrouter/minimax/minimax-m3:free`

### Best for Reasoning
`openrouter/minimax/minimax-m3:free` oder `openrouter/nvidia/nemotron-3-ultra-550b-a55b:free`

### Best Fast Model
`openrouter/google/gemma-4-26b-a4b-it:free` oder `openrouter/poolside/laguna-xs-2.1:free`

### Best Large Context
`openrouter/nvidia/nemotron-3-ultra-550b-a55b:free` (XXLARGE, wenn Kontingent vorhanden)

## Cost Control Integration

```
COST CONTROL:       ON
FREE FIRST:        YES
OpenRouter Limits: CHECK before each request
FALLBACK CHAIN:    OpenRouter Free → OLLAMA → OpenCode Free → BLOCKED
```

WICHTIG: Wenn OPENROUTER_API_KEY nicht gesetzt ist:
→ NIE OpenRouter verwenden
→ Sofort auf OLLAMA oder OpenCode Free ausweichen