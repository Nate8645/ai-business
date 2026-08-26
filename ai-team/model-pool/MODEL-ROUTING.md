# MODEL ROUTING — Free-First Strategy 2026-08-26

Kostenlose Modelle haben IMMER Vorrang.
Kostenpflichtige Modelle NUR mit expliziter Genehmigung.

## Free-First Routing Chain

```
TASK → 1. OLLAMA Local Verified → IF FITS HARDWARE → USE $0
      ↓ (nicht verfügbar oder zu groß)
      ↓
    2. OPENCODE Free Models → IF AVAILABLE/VERIFIED → USE $0
      ↓ (nicht geeignet)
      ↓
    3. OPENROUTER :free Models → IF AVAILABLE & RATE LIMIT OK → USE $0 (cloud)
      ↓ (Rate Limit erreicht oder unavailable)
      ↓
    4. ARENA via OpenRouter Bridge → IF FREE Models available → USE $0
      ↓ (nicht verfügbar)
      ↓
    5. BLOCKED — PAID MODEL REQUIRES USER APPROVAL
```

## Routing by Task Type

### CODING
```
CODING TASK
    ↓
opencode/big-pickle (VERIFIED, Coding getestet)
    ↓ (fallback)
qwen3:4b (Ollama, VERIFIED, Coding getestet)
    ↓
openrouter/minimax/minimax-m3:free (FREE, Coding fähig)
    ↓
qwen3:1.7b (Ollama, VERIFIED, schnell)
    ↓
BLOCKED IF ALL FAIL (PAID MODEL REQUIRED User Approval)
```

### REASONING
```
REASONING TASK
    ↓
opencode/big-pickle (VERIFIED, Reasoning getestet)
    ↓
openrouter/minimax/minimax-m3:free (FREE, Reasoning fähig)
    ↓
qwen3:4b (Ollama, VERIFIED)
    ↓
BLOCKED IF ALL FAIL
```

### AGENT / TOOL CALLING
```
AGENT TASK
    ↓
opencode/big-pickle (VERIFIED, Tool Calling getestet)
    ↓
qwen3:4b (Ollama, VERIFIED, Tool Calling)
    ↓
openrouter/cohere/north-mini-code:free (FREE, Tool Calling)
    ↓
BLOCKED IF ALL FAIL
```

### SIMPLE / FAST TASK
```
SIMPLE TASK
    ↓
qwen3:0.6b (Ollama, VERIFIED, schnellste)
    ↓
qwen3:1.7b (Ollama, VERIFIED, schnell)
    ↓
opencode/nemotron-3.5-lightning-free (OpenCode, FREE)
    ↓
BLOCKED IF ALL FAIL
```

### LARGE CONTEXT (Hardware vorausgesetzt)
```
LARGE TASK
    ↓
qwen3:4b (Ollama, 2.5 GB, empfohlen)
    ↓
llama3.2 (Ollama, 2.0 GB, Fallback)
    ↓
openrouter/nvidia/nemotron-3-ultra-550b-a55b:free (XXLARGE, wenn Kontingent)
    ↓
BLOCKED IF ALL FAIL (qwen3:8b NICHT nutzen wegen OOM)
```

### RESEARCH / MARKETING
```
RESEARCH TASK
    ↓
OpenCode WebSearch ✅ (kostenlos)
    ↓
Arena AI Issues ✅ (asynchron, GitHub App)
    ↓
openrouter/google/gemma-4-31b-it:free (FREE)
    ↓
BLOCKED wenn keine Research-Quelle verfügbar
```

### DEBUGGING
```
DEBUGGING TASK
    ↓
opencode/big-pickle (VERIFIED, Code + Reasoning)
    ↓
qwen3:4b (Ollama, VERIFIED)
    ↓
openrouter/cohere/north-mini-code:free (FREE, Coding)
    ↓
BLOCKED IF ALL FAIL
```

## Free-First Rules

### RULE 1: FREE FIRST
```
Jede Task beginnt mit der Prüfung auf kostenlose Modelle.
NIEMALS direkt zu Paid Models wechseln.
```

### RULE 2: HARDWARE CONSTRAINTS
```
qwen3:8b NICHT verwenden (OOM, Hardware limitiert).
Alle anderen Ollama-Modelle nutzen, die auf verfügbarem RAM passen.
```

### RULE 3: RATE LIMIT HANDLING (OpenRouter)
```
Wenn OpenRouter :free Model Rate Limit erreicht:
1. NÄCHSTES OpenRouter :free Model (OpenRouter-FREE-MODELS.md)
2. OLLAMA Local (kein Rate-Limit)
3. OPENCODE Free (kein API-Call)
4. BLOCKED wenn nichts geht
```

### RULE 4: NEVER AUTO-PAID
```
Wenn nur Paid Model geeignet:
→ STOP
→ "PAID MODEL REQUIRED — USER APPROVAL REQUIRED"
→ Request nicht ausführen
→ User um explizite Erlaubnis bitten
```

### RULE 4: ARENA PRIORITÄT
```
Arena AI hat Priorität bei Frontier-Aufgaben,
aber NUR wenn Modelle tatsächlich FREE sind (via OpenRouter Bridge).
Claude/GPT/Kimi/Gemini/Grok sind NICHT free (erfordern Auth).
```

## Routing Priority Table

| Priority | Category | Model | Cost | Status |
|---|---|---|---|---|
| 1 | Coding | opencode/big-pickle | $0 | 🟢 VERIFIED |
| 2 | Coding | qwen3:4b (Ollama) | $0 | 🟢 VERIFIED |
| 3 | Coding | openrouter/minimax/m3:free | $0 | 🟢 AVAILABLE |
| 4 | Coding | qwen3:1.7b (Ollama) | $0 | 🟢 VERIFIED |
| 5 | Reasoning | opencode/big-pickle | $0 | 🟢 VERIFIED |
| 6 | Reasoning | openrouter/minimax/m3:free | $0 | 🟢 AVAILABLE |
| 7 | Reasoning | qwen3:4b (Ollama) | $0 | 🟢 VERIFIED |
| 8 | Agent | opencode/big-pickle | $0 | 🟢 VERIFIED |
| 9 | Agent | qwen3:4b (Ollama) | $0 | 🟢 VERIFIED |
| 10 | Agent | openrouter/cohere/north-mini-code:free | $0 | 🟢 AVAILABLE |
| 11 | Fast | qwen3:0.6b (Ollama) | $0 | 🟢 VERIFIED |
| 12 | Fast | qwen3:1.7b (Ollama) | $0 | 🟢 VERIFIED |
| 13 | Large Context | qwen3:4b (Ollama) | $0 | 🟢 VERIFIED |
| 14 | Large Context | llama3.2 (Ollama) | $0 | 🟢 VERIFIED |
| 15 | Research | OpenCode WebSearch | $0 | ✅ FREE |
| 16 | Research | Arena Bridge (OpenRouter :free) | $0 | 🟡 AVAILABLE |

## ZERO-FICTION in Routing

✅ **Niemals** qwen3:8b im Routing verwenden (HARDWARE LIMITIERT/OOM)  
✅ **Niemals** automatisch auf Paid Model wechseln  
✅ **Immer** Free-First Kette befolgen  
✅ **Hardware Limits** ehrlich in Routing berücksichtigen  
✅ **Rate Limits** via Fallback-Kette handhaben  
✅ **Arena** nur für FREE Models (via OpenRouter Bridge), nicht für PAID Models  

## FREE-First Summary

```
KOSTENFREIE ROUTING-KETTE AKTIVIERT:
├── 1. OLLAMA Local (4 VERIFIERT + 1 HARDWARE LIMITIERT)
├── 2. OPENCODE Free (1 VERIFIERT + 5 AVAILABLE)
├── 3. OPENROUTER :free (17 alle FREE)
├── 4. ARENA Bridge (via OpenRouter, gleiche 17 FREE)
└── 5. BLOCKED (PAID nur bei expliziter Genehmigung)

KOSTEN: $0 pro Request (sofern Free-First Kette genutzt)
AUTO-PAID: DEAKTIVIERT
ZEROFIKTION: EINGEHALTEN
```