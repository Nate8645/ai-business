# MODEL ROUTING — Free-First Strategy

Kostenlose Modelle haben IMMER Vorrang.
Kostenpflichtige Modelle NUR mit expliziter Genehmigung.

## Prioritaetskette (VERIFIED ONLY)

```
1. VERIFIED FREE OpenCode Model (opencode/big-pickle VERIFIED)
2. VERIFIED LOCAL Ollama Model (qwen3:0.6b, qwen3:1.7b, qwen3:4b, llama3.2 VERIFIED)
3. VERIFIED FREE OpenRouter Model (*:free, verfügbar aber nicht einzeln getestet)
4. OTHER NO-COST Provider
5. BLOCKED — PAID MODEL WOULD BE REQUIRED
```

WICHTIG: qwen3:8b ist NICHT in der Priority-Kette, da OOM (Hardware-Limit).

## Routen nach Aufgabentyp

### CODING
```
CODING TASK
    ↓
opencode/big-pickle (VERIFIED, Coding getestet)
    ↓ (fallback)
qwen3:4b (Ollama, VERIFIED)
    ↓
qwen3:1.7b (Ollama, VERIFIED, schnell)
    ↓
qwen3:0.6b (Ollama, VERIFIED, minimal)
    ↓
llama3.2 (Ollama, VERIFIED, Fallback)
    ↓
BLOCKED IF ALL FAIL
```

### REASONING
```
REASONING TASK
    ↓
opencode/big-pickle (VERIFIED, Reasoning getestet)
    ↓
qwen3:4b (Ollama, VERIFIED)
    ↓
qwen3:1.7b (Ollama, VERIFIED)
    ↓
qwen3:0.6b (Ollama, VERIFIED, minimal)
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
qwen3:1.7b (Ollama, VERIFIED, Agent)
    ↓
qwen3:0.6b (Ollama, VERIFIED, einfacher Agent)
    ↓
BLOCKED IF ALL FAIL
```

### SIMPLE / FAST
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
opencode/big-pickle (falls RAM > 4 GB)
    ↓
qwen3:4b (Ollama, 2.5 GB, empfohlen)
    ↓
qwen3:1.7b (Ollama, 1.4 GB)
    ↓
qwen3:0.6b (Ollama, 522 MB)
    ↓
BLOCKED IF ALL FAIL (qwen3:8b NICHT nutzen wegen OOM)
```

### VISION
Nur getestete Vision-Modelle nutzen:
```
VISION
    ↓
KEINE lokalen Modelle getestet (keine Vision Support in Tests)
    ↓
OpenRouter Free Modelle pruefen (falls Vision-Support)
    ↓
BLOCKED
```

## Kostenkontrolle

```
COST CONTROL:    ON
FREE FIRST:      YES
PAID AUTO-ROUTE: DISABLED
```

Vor jedem kostenpflichtigen Request:
```
PAID MODEL REQUIRED → DO NOT EXECUTE → FREE FALLBACK SUCHE
```

## Rate-Limit-Handling

Wenn Free-Model Rate-Limited:
```
RATE LIMITED → NEXT FREE MODEL → OLLAMA (kein Limit) → REtry
```

NIE:
```
→ PAID MODEL (verboten)
```

## Duplikat-Vermeidung

Vor jedem Model-Add:
```
SEARCH existing registries → EXISTS? → REUSE | ADD NEW
```

## Testing-Status (final)

| Model | Coding | Reasoning | Agent | Vision | Overall Status |
|---|---|---|---|---|---|
| opencode/big-pickle | ✅ VERIFIED | ✅ VERIFIED | ✅ VERIFIED | ❌ NO | 🟢 VERIFIED |
| opencode/nemotron-3.5-lightning-free | ⚠️ TIMEOUT | ⚠️ TIMEOUT | ⚠️ TIMEOUT | ❌ NO | 🟡 AVAILABLE |
| qwen3:8b | ❌ OOM | ❌ OOM | ❌ OOM | ❌ NO | 🔴 FAILED (HW) |
| qwen3:4b | ✅ VERIFIED | ✅ VERIFIED | ✅ VERIFIED | ❌ NO | 🟢 VERIFIED |
| qwen3:1.7b | ✅ VERIFIED | ✅ VERIFIED | ✅ VERIFIED | ❌ NO | 🟢 VERIFIED |
| qwen3:0.6b | ✅ VERIFIED | ✅ VERIFIED | ✅ VERIFIED | ❌ NO | 🟢 VERIFIED |
| llama3.2 | ✅ VERIFIED | ✅ VERIFIED | ✅ VERIFIED | ❌ NO | 🟢 VERIFIED |
| OpenRouter Free (17) | ⚠️ AVAILABLE | ⚠️ AVAILABLE | ⚠️ AVAILABLE | ⚠️ AVAILABLE | 🟡 AVAILABLE |