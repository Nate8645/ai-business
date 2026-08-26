# MODEL REGISTRY — Combined Free Model Pool

Stand: 2026-08-26. Alle $0 Modelle ueber OpenCode + Ollama + OpenRouter.
Single Source of Truth fuer Model-Verfuegbarkeit und Routing.

## GESAMTUEBERSICHT

```
                 AI TEAM
                    │
              MODEL ROUTER
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
   OPENCODE      OLLAMA        ARENA
   FREE POOL    LOCAL POOL    FRONTIER
   (23 Modelle) (5 Modelle)  (Research)
       │            │            │
       └────────────┼────────────┘
                    ▼
               BEST MODEL
                    │
                    ▼
                 TASK
```

## MODELLE NACH PROVIDER

### OpenCode Free (6)
| Model | Status | Coding | Reasoning | Agent | Vision | Empfehlung |
|---|---|---|---|---|---|---|
| opencode/big-pickle | 🟢 VERIFIED | ✅ | ✅ | ✅ | ❌ | Default Model |
| opencode/hy3-free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Alternative |
| opencode/mimo-v2.5-free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Alternative |
| opencode/muse-spark-1.2-contributor-free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Alternative |
| opencode/nemotron-3-ultra-free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Coding |
| opencode/nemotron-3.5-lightning-free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Fast |

### Ollama Local (5)
| Model | Status | Coding | Reasoning | Agent | Vision | Empfehlung |
|---|---|---|---|---|---|---|
| qwen3:0.6b | 🟢 VERIFIED | ✅ | ✅ | ✅ | ❌ | Minimal, schnell |
| qwen3:1.7b | 🟢 VERIFIED | ✅ | ✅ | ✅ | ❌ | Guter Balance |
| qwen3:4b | 🟢 VERIFIED | ✅ | ✅ | ✅ | ❌ | Stark, gute Balance |
| llama3.2 | 🟢 VERIFIED | ✅ | ✅ | ✅ | ❌ | Fallback |
| qwen3:8b | 🔴 NOT VERIFIED | ⚠️ | ⚠️ | ⚠️ | ❌ | OOM (Hardware limitiert) |

### OpenRouter Free (17)
| Model | Status | Coding | Reasoning | Agent | Vision | Empfehlung |
|---|---|---|---|---|---|---|
| cohere/north-mini-code:free | 🟡 AVAILABLE | ✅ | ❌ | ✅ | ❌ | Coding |
| dots-studio/dots-3-note-preview:free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Preview |
| google/gemma-4-26b-a4b-it:free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Google |
| google/gemma-4-31b-it:free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Google |
| liquid/lfm-2.5-2.6b:free | 🟡 AVAILABLE | ✅ | ❌ | ✅ | ❌ | Klein |
| minimax/minimax-m2.7:free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Stark |
| minimax/minimax-m3:free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Stark |
| nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Reasoning |
| nvidia/nemotron-3-super-120b-a12b:free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Gross |
| nvidia/nemotron-3-ultra-550b-a55b:free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Max |
| nvidia/nemotron-3.5-content-safety:free | 🟡 AVAILABLE | ❌ | ❌ | ✅ | ❌ | Safety |
| nvidia/nemotron-3.5-lightning:free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Fast |
| poolside/laguna-s-2.1:free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Coding |
| poolside/laguna-xs-2.1:free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Coding |
| thinkingmachines/inkling-small:free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Klein |
| thinkingmachines/inkling:free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | Standard |
| z-ai/glm-5.2:free | 🟡 AVAILABLE | ✅ | ✅ | ✅ | ❌ | GLM |

### OpenRouter Meta-Modelle
| Model | Status | Funktion |
|---|---|---|
| openrouter/openrouter/free | 🟡 AVAILABLE | Meta-Routing |
| openrouter/openrouter/auto | 🔴 RISK | Auto-Routing (kann paid triggern) |

### Claude (vereinfacht)
| Model | Status | Hinweis |
|---|---|---|
| claude-sonnet-4 | 🟡 REQUIRES AUTH | Suboktion notwendig |
| claude-haiku-3.5 | 🟡 REQUIRES AUTH | günstigste Option |
| claude-opus-4.1 | 🔴 PAID | teuerste Option |

### Kimi (unverifiziert)
| Model | Status | Hinweis |
|---|---|---|
| kimi-k2 bis kimi-k3.8-max | 🟡 REQUIRES AUTH | API Key nötig |

### GPT (unverifiziert)
| Model | Status | Hinweis |
|---|---|---|
| gpt-4o, gpt-4o-mini, gpt-3.5-turbo | 🟡 REQUIRES AUTH | OpenAI Key nötig |

## BESTE MODELLE NACH TASK

### Best Free Coding Model
`opencode/big-pickle` (verifiziert) → `qwen3:4b` (Ollama, VERIFIED) → `openrouter/minimax/minimax-m3:free`

### Best Free Reasoning Model
`opencode/big-pickle` (verifiziert) → `openrouter/minimax/minimax-m3:free` → `qwen3:4b`

### Best Free Agent Model
`opencode/big-pickle` (verifiziert) → `qwen3:4b` (Ollama, VERIFIED) → `openrouter/minimax/minimax-m3:free`

### Best Free Fast Model
`qwen3:0.6b` (Ollama, VERIFIED) → `qwen3:1.7b` (Ollama, VERIFIED) → `opencode/nemotron-3.5-lightning-free`

### Best Free Large-Context Model
`openrouter/nvidia/nemotron-3-ultra-550b-a55b:free` → `openrouter/nvidia/nemotron-3-super-120b-a12b:free`

### NOT RECOMMENDED
`qwen3:8b` (Ollama) → OOM Fehler, nicht bei verfügbarem RAM < 8 GB starten

## GESAMTSTATISTIK

```
TOTAL FREE MODELS:     28 (6 OpenCode + 5 Ollama + 17 OpenRouter)
TOTAL VERIFIED:        1 + 4 = 5 (opencode/big-pickle + 4 Ollama models)
TOTAL INSTALLED:       5 (Ollama, alle lokal)
TOTAL AVAILABLE:       22 (OpenCode 6 + OpenRouter 17, keine Verification)
TOTAL NOT VERIFIED:    1 (qwen3:8b, Hardware-Limit)
TOTAL PAID BLOCKED:    0
COST:                  $0 (aktiv Cost Control)
RATE LIMITS:           OpenRouter ja (Provider), Ollama nein (lokal)
PRIVACY:               Ollama 100% lokal, OpenRouter Daten an Provider
```

## COST PROTECTION

```
COST CONTROL:         ON
FREE FIRST:           YES
PAID AUTO-ROUTE:      DISABLED
FALLBACK CHAIN:       OpenCode Free → Ollama Local → OpenRouter Free → BLOCKED
```

WICHTIG: Wenn ein Modell OOM verursacht (wie qwen3:8b):
→ Sofort als NOT VERIFIED markieren
→ NIE automatisch auf Paid Model ausweichen
→ Naechstes verfügbares Free Model nehmen

## DOCUMENTATION

| Datei | Inhalt |
|---|---|
| OPENCODE-FREE-MODELS.md | Alle OpenCode Free Modelle im Detail |
| OLLAMA-MODELS.md | Alle Ollama Lokalmodelle im Detail |
| MODEL-ROUTING.md | Routing-Regeln und Prioritaeten |
| OPENROUTER-FREE-MODELS.md | Alle OpenRouter :free Modelle |
| ARENA-MODELS.md | Arena AI Integration und Models |
| CLAUDE-MODELS.md | Claude Models und Auth-Status |
| KIMI-MODELS.md | Kimi Models (unverifiziert) |
| GPT-MODELS.md | GPT/ChatGPT Models (unverifiziert) |

## VERIFICATION TIMELINE

| Datum | Aktion | Ergebnis |
|---|---|---|
| 25.08.2026 | OpenCode v1.18.23 installiert | ✅ |
| 25.08.2026 | Ollama v0.32.15 installiert | ✅ |
| 25.08.2026 | `ollama list` - 5 Modelle gefunden | ✅ |
| 25.08.2026 | qwen3:0.6b getestet → MODEL_TEST_OK | ✅ VERIFIED |
| 25.08.2026 | qwen3:1.7b getestet → MODEL_TEST_OK | ✅ VERIFIED |
| 25.08.2026 | qwen3:4b getestet → MODEL_TEST_OK | ✅ VERIFIED |
| 25.08.2026 | llama3.2 getestet → MODEL_TEST_OK | ✅ VERIFIED |
| 25.08.2026 | qwen3:8b getestet → OOM Fehler | 🔴 NOT VERIFIED (HW) |
| 25.08.2026 | OpenCode Free Models entdeckt | 6 Modelle |
| 25.08.2026 | OpenRouter :free Models entdeckt | 17 Modelle |
| 25.08.2026 | Arena GitHub App Integration geprüft | ✅ CONNECTED |
| 25.08.2026 | Claude Code Auth repariert und getestet | ✅ OK |
| 25.08.2026 | Kimi Models investigation | 🟡 REQUIRES AUTH |
| 25.08.2026 | GPT Models investigation | 🟡 REQUIRES AUTH |

## VERIFIED FREE MODEL COUNT

```
opencode/big-pickle: 1 VERIFIED
qwen3:0.6b: 1 VERIFIED
qwen3:1.7b: 1 VERIFIED
qwen3:4b: 1 VERIFIED
llama3.2: 1 VERIFIED
-----------------------
TOTAL: 5 VERIFIED FREE MODELS
```

## AVAILABLE (NOT YET VERIFIED) FREE MODEL COUNT

```
OpenCode: 5 remaining (hy3-free, mimo-v2.5-free, muse-spark-1.2-contributor-free, nemotron-3-ultra-free, nemotron-3.5-lightning-free)
OpenRouter: 17 models (all :free, AVAILABLE but NOT TESTED)
-----------------------
TOTAL: 22 AVAILABLE FREE MODELS
```

## PAID MODELS BLOCKED

```
Status: DISABLED
Regel: NIEMALS auto-route zu Paid Models
Ausnahme: NUR bei expliziter Benutzer-Erlaubnis
```

## TOTAL AVAILABLE MODELS

```
VERIFIED:      5 (1 OpenCode + 4 Ollama)
AVAILABLE:    22 (5 OpenCode + 17 OpenRouter, nicht getestet)
NOT VERIFIED:  1 (qwen3:8b, Hardware-Limit)
TOTAL:        28
```