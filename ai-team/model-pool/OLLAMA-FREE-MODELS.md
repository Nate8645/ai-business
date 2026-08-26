# OLLAMA FREE MODEL POOL — Live Verified 2026-08-26

Ollama v0.32.15 — 5 installed models, 4 VERIFIED, 1 HARDWARE LIMITIERT.

## Installed Ollama Models (5)

| # | Model Name | Model ID | Size | Context | Coding | Reasoning | Agent | Tool Calling | Vision | Status | Test Result |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | qwen3:0.6b | qwen3:0.6b | 522 MB | STANDARD | ✅ VERIFIED | ✅ VERIFIED | ✅ VERIFIED | ✅ VERIFIED | ❌ NO | 🟢 VERIFIED | ✅ MODEL_TEST_OK |
| 2 | qwen3:1.7b | qwen3:1.7b | 1.4 GB | STANDARD | ✅ VERIFIED | ✅ VERIFIED | ✅ VERIFIED | ✅ VERIFIED | ❌ NO | 🟢 VERIFIED | ✅ MODEL_TEST_OK |
| 3 | qwen3:4b | qwen3:4b | 2.5 GB | STANDARD | ✅ VERIFIED | ✅ VERIFIED | ✅ VERIFIED | ✅ VERIFIED | ❌ NO | 🟢 VERIFIED | ✅ MODEL_TEST_OK |
| 4 | llama3.2:latest | llama3.2:latest | 2.0 GB | STANDARD | ✅ VERIFIED | ✅ VERIFIED | ✅ VERIFIED | ✅ VERIFIED | ❌ NO | 🟢 VERIFIED | ✅ MODEL_TEST_OK |
| 5 | qwen3:8b | qwen3:8b | 5.2 GB | LARGE | ❌ HARDWARE LIMITIERT | ⚠️ HARDWARE LIMITIERT | ⚠️ HARDWARE LIMITIERT | ⚠️ HARDWARE LIMITIERT | ❌ NO | 🔴 HARDWARE LIMITIERT | ❌ OOM (Out of Memory) |

## Ollama Free Model Capabilities

| Model | Coding Quality | Reasoning Quality | Agent Suitability | Speed | RAM Required |
|---|---|---|---|---|---|
| qwen3:0.6b | ✅✅ (excellent for size) | ✅✅ (excellent for size) | ✅✅ (good) | sehr schnell | 1 GB empfohlen |
| qwen3:1.7b | ✅✅ (good) | ✅✅ (good) | ✅✅ (good) | schnell | 2 GB empfohlen |
| qwen3:4b | ✅✅ (good) | ✅✅ (good) | ✅✅ (good) | gut | 4 GB empfohlen |
| llama3.2 | ✅✅ (good) | ✅✅ (good) | ✅✅ (good) | gut | 3 GB empfohlen |
| qwen3:8b | ⚠️ würde stark sein | ⚠️ würde stark sein | ⚠️ würde stark sein | unbekannt | 8+ GB benötigt (nicht verfügbar) |

## Free-First Routing via Ollama

```
TASK → OLLAMA Local Models → IF AVAILABLE & FITS HARDWARE → USE (cost $0, local, no rate-limit)
      ↓ (if not suitable or too large)
      ↓
    OPENCODE Free Models → IF AVAILABLE → USE (cost $0)
      ↓
    OPENROUTER :free Models → IF AVAILABLE → USE (cost $0, cloud, rate limits apply)
      ↓
    BLOCKED — PAID MODEL REQUIRED (USER APPROVAL)
```

## Hardware Constraint Note

**qwen3:8b (5.2 GB):**
- ✅ Modell ist installiert (in `ollama list` gelistet)
- ❌ Wird NICHT für Tasks verwendet (OOM beim Start)
- ⚠️ Als `HARDWARE LIMITIERT` markiert, gelöscht wurde es nicht
- ✅ Wenn User RAM aufrüstet: könntest du nutzen
- ✅ Aktuell: Nicht im Routing-Kette verwenden

**Alle anderen Modelle starten problemlos** auf der vorhandenen Hardware.

## Ollama Free Model Summary

```
TOTAL OLLAMA INSTALLED: 5
TOTAL VERIFIED: 4 (qwen3:0.6b, qwen3:1.7b, qwen3:4b, llama3.2)
TOTAL HARDWARE LIMITIERT: 1 (qwen3:8b — OOM, nicht gelöscht)
TOTAL AVAILABLE FOR USE: 4
TOTAL PAID/BLOCKED: 0 (Cost Control ON, auto-route disabled)
COST: $0 per request (lokal, kein Rate-Limit)

**Routing Priority:** qwen3:0.6b (schnellste) → qwen3:1.7b (balanciert) → qwen3:4b (stark) → llama3.2 (Fallback)
```

## ZERO-FICTION RULE

✅ Only 5 models installed, exactly as `ollama list` shows
✅ qwen3:8b honestl marked HARDWARE LIMITIERT + OOM (not deleted, not faked as VERIFIED)
✅ No models claimed free without verification
✅ No models invented or downloaden ohne Hardware-Check
✅ Test-Ergebnisse (MODEL_TEST_OK) nur für tatsächlich getestete Modelle
✅ Hardware Limits werden dokumentiert, nicht verschleiert