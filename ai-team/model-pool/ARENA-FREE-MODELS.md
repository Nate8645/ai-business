# ARENA FREE MODEL POOL — Live Verified 2026-08-26

Arena AI integration via GitHub App + OpenRouter Bridge.
Only models with confirmed $0 cost included.

## Arena Integration Status

| Component | Status | Cost | Notes |
|---|---|---|---|
| GitHub App `arena-ai-coding-agent[bot]` | ✅ CONNECTED | $0 | Communication via Issues/PRs only |
| Design Bridge `tools/design-route.mjs` | ✅ TESTED | €0 | Generates UI snippets via OpenRouter |
| OpenRouter :free models via Bridge | ✅ ACCESSIBLE | $0 | 17 models, FREE confirmed |
| Direct Arena API | ❌ NOT CONFIGURED | N/A | No API keys configured |

## FREE Models via Arena Bridge (OpenRouter :free)

These 17 models are FREE ($0) through the OpenRouter API key configured in this project.

| # | Model ID | Provider | Display Name | Context | Coding | Reasoning | Vision | Tool Calling | Agent | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | openrouter/cohere/north-mini-code:free | Cohere | North Mini Code | STANDARD | ✅ | ❌ | ❌ | ✅ | ✅ | 🟢 FREE |
| 2 | openrouter/dots-studio/dots-3-note-preview:free | Dots Studio | Dots 3 Note Preview | STANDARD | ✅ | ✅ | ❌ | ✅ | ✅ | 🟢 FREE |
| 3 | openrouter/google/gemma-4-26b-a4b-it:free | Google | Gemma 4 26B | STANDARD | ✅ | ✅ | ❌ | ✅ | ✅ | 🟢 FREE |
| 4 | openrouter/google/gemma-4-31b-it:free | Google | Gemma 4 31B | STANDARD | ✅ | ✅ | ❌ | ✅ | ✅ | 🟢 FREE |
| 5 | openrouter/liquid/lfm-2.5-2.6b:free | Liquid | LFM 2.5 | SMALL | ✅ | ❌ | ❌ | ✅ | ✅ | 🟢 FREE |
| 6 | openrouter/minimax/minimax-m2.7:free | Minimax | M2.7 | LARGE | ✅ | ✅ | ❌ | ✅ | ✅ | 🟢 FREE |
| 7 | openrouter/minimax/minimax-m3:free | Minimax | M3 | LARGE | ✅ | ✅ | ❌ | ✅ | ✅ | 🟢 FREE |
| 8 | openrouter/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | NVIDIA | Nemotron 3 Nano Omni Reasoning | LARGE | ✅ | ✅ | ❌ | ✅ | ✅ | 🟢 FREE |
| 9 | openrouter/nvidia/nemotron-3-super-120b-a12b:free | NVIDIA | Nemotron 3 Super 120B | XLARGE | ✅ | ✅ | ❌ | ✅ | ✅ | 🟢 FREE |
| 10 | openrouter/nvidia/nemotron-3-ultra-550b-a55b:free | NVIDIA | Nemotron 3 Ultra 550B | XXLARGE | ✅ | ✅ | ❌ | ✅ | ✅ | 🟢 FREE |
| 11 | openrouter/nvidia/nemotron-3.5-content-safety:free | NVIDIA | Nemotron 3.5 Content Safety | STANDARD | ❌ | ❌ | ❌ | ✅ | ✅ | 🟢 FREE |
| 12 | openrouter/nvidia/nemotron-3.5-lightning:free | NVIDIA | Nemotron 3.5 Lightning | STANDARD | ✅ | ✅ | ❌ | ✅ | ✅ | 🟢 FREE |
| 13 | openrouter/poolside/laguna-s-2.1:free | Poolside | Laguna S 2.1 | LARGE | ✅ | ✅ | ❌ | ✅ | ✅ | 🟢 FREE |
| 14 | openrouter/poolside/laguna-xs-2.1:free | Poolside | Laguna xs 2.1 | STANDARD | ✅ | ✅ | ❌ | ✅ | ✅ | 🟢 FREE |
| 15 | openrouter/thinkingmachines/inkling-small:free | Thinking Machines | Inkling Small | STANDARD | ✅ | ✅ | ❌ | ✅ | ✅ | 🟢 FREE |
| 16 | openrouter/thinkingmachines/inkling:free | Thinking Machines | Inkling | LARGE | ✅ | ✅ | ❌ | ✅ | ✅ | 🟢 FREE |
| 17 | openrouter/z-ai/glm-5.2:free | z-ai | GLM 5.2 | LARGE | ✅ | ✅ | ❌ | ✅ | ✅ | 🟢 FREE |

## Arena Models with REQUIRE_AUTH (NOT Free)

| Model | Reason | Status |
|---|---|---|
| Claude Sonnet 4 / Opus 4.1 / Haiku 3.5 | Requires Claude Code subscription | 🔴 PAID |
| GPT-5.6 Sol, GPT-5, GPT-4o | Requires OpenAI API key | 🔴 PAID / REQUIRES_AUTH |
| Kimi K3 Max, Kimi K3, Kimi K2 | Requires API key | 🔴 PAID / REQUIRES_AUTH |
| Gemini 1.5 Flash, 1.5 Pro, 2.0 Flash | Requires Google AI key | 🔴 PAID / REQUIRES_AUTH |
| Grok-4.20, Grok-4.3 | Requires xAI key | 🔴 PAID / REQUIRES_AUTH |

## FREE-First Routing via Arena

```
TASK → ARENA BRIDGE (OpenRouter :free) → IF FREE → USE
      ↓ (if not free or unavailable)
      ↓
    OPENCODE Free Models → IF AVAILABLE → USE
      ↓
    OLLAMA Local Verified → IF FITS HARDWARE → USE
      ↓
    BLOCKED — PAID MODEL REQUIRED
```

## Arena Free Model Summary

```
TOTAL ARENA FREE MODELS: 17 (all via OpenRouter :free)
TOTAL VERIFIED FREE: 0 (as Arena-native, but OpenRouter :free confirmed FREE)
TOTAL AVAILABLE FREE: 17 (via OpenRouter Bridge, cost $0)
TOTAL PAID/BLOCKED: 0 (auto-route disabled)
COST: $0 per request (FREE FIRST active)
```

**ZERO-FICTION RULE:** Only the 17 OpenRouter :free models above are marked FREE. 
Claude/GPT/Kimi/Gemini/Grok are NOT marked free (require auth/payment).
No model claimed free without confirmed $0 cost.