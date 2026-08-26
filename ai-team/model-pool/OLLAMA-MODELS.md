# OLLAMA LOCAL MODELS — Stand: 2026-08-26

Quelle: `ollama list` live abgefragt.
Alle Modelle lokal, Kostenstruktur prüfen: Modell-Größe vs. verfügbarer RAM.

## Installierte Modelle (5)

| # | Name | ID | Groesse | Modifiziert | Status | Coding | Reasoning | Agent | Test Result | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | qwen3:0.6b | 7df6b6e09427 | 522 MB | 26.08.2026 | 🟢 VERIFIED OK | ✅ | ✅ | ✅ | MODEL_TEST_OK | Minimalmodell, schnell |
| 2 | qwen3:1.7b | 8f68893c685c | 1.4 GB | 26.08.2026 | 🟢 VERIFIED OK | ✅ | ✅ | ✅ | MODEL_TEST_OK | Guter Balance |
| 3 | qwen3:4b | 359d7dd4bcda | 2.5 GB | 26.08.2026 | 🟢 VERIFIED OK | ✅ | ✅ | ✅ | MODEL_TEST_OK | Stark, gute Balance |
| 4 | llama3.2:latest | a80c4f17acd5 | 2.0 GB | 15.07.2026 | 🟢 VERIFIED OK | ✅ | ✅ | ✅ | MODEL_TEST_OK | Meta-Referenz, gut |
| 5 | qwen3:8b | 500a1f067a9f | 5.2 GB | 26.08.2026 | 🔴 NOT VERIFIED | ⚠️ | ⚠️ | ⚠️ | OOM Fehler | 5 GB RAM benötigt, nicht verfügbar |

## Model Performance Summary

### qwen3:0.6b (522 MB)
- **Ollama: MINIMAL**
- Coding: Sehr einfach (522 MB Params)
- Reasoning: Sehr eingeschränkt
- Tool Calling: Ja (begrenzt)
- Agent: Ja (einfach)
- RAM: 1 GB empfohlen
- Empfehlung: Einfache Routine-Tasks, Health-Checks
- Status: 🟢 VERIFIED

### qwen3:1.7b (1.4 GB)
- **Ollama: KLEINER ALLROUNDER**
- Coding: Akzeptabel
- Reasoning: Gut für Größe
- Tool Calling: Ja
- Agent: Ja
- RAM: 2 GB empfohlen
- Empfehlung: Schnelle Agent-Tasks, einfache Code-Reviews
- Status: 🟢 VERIFIED

### qwen3:4b (2.5 GB)
- **Ollama: STARKER ALLROUNDER**
- Coding: Gut
- Reasoning: Gut
- Tool Calling: Ja
- Agent: Ja
- RAM: 4 GB empfohlen
- Empfehlung: Hauptmodell wenn qwen3:8b nicht passt
- Status: 🟢 VERIFIED

### llama3.2:latest (2.0 GB)
- **Ollama: META-STANDARD**
- Coding: Gut
- Reasoning: Gut
- Tool Calling: Ja
- Agent: Ja
- RAM: 3 GB empfohlen
- Empfehlung: Fallback wenn Qwen-Modelle nicht starten
- Status: 🟢 VERIFIED

### qwen3:8b (5.2 GB)
- **Ollama: NICHT VERFÜGBAREN GROSSEN MODELL**
- Coding: Wäre stark (8B Parameter)
- Reasoning: Wäre stark
- Tool Calling: Ja (vermutlich)
- Agent: Ja (vermutlich)
- RAM: 8+ GB benötigt
- Fehler: Out of Memory beim Start (5 GB Buffer angefordert)
- Empfehlung: Nur wenn RAM > 8 GB verfügbar ist
- Status: 🔴 NOT VERIFIED / HARDWARE LIMITED

## Hardware-Anforderungen

| Modell | Empfohlener RAM | Minimaler RAM | Disk Space |
|---|---|---|---|
| qwen3:0.6b | 1 GB | 512 MB | 1 GB |
| qwen3:1.7b | 2 GB | 1 GB | 2 GB |
| qwen3:4b | 4 GB | 2 GB | 3 GB |
| llama3.2 | 3 GB | 2 GB | 3 GB |
| qwen3:8b | 8+ GB | 6 GB | 6 GB |

## Ollama Routing Summary

```
FREE LOCAL POOL AKTIV
┌─────────────────────────────────────┐
│ BEST CODING:   qwen3:4b (VERIFIED) │
│ BEST FAST:     qwen3:1.7b (VERIFIED)│
│ BEST MINIMAL:  qwen3:0.6b (VERIFIED)│
│ BEST FALLBACK: llama3.2 (VERIFIED) │
│ NOT RECOMMENDED: qwen3:8b (OOM)     │
└─────────────────────────────────────┘
```

## LIMITS

Hardware-limitiert (RAM):
- qwen3:8b: OOM (Out of Memory) → nicht starten
- Alle anderen: starten bei vorhandenem RAM

Rate-Limit:
- Ollama: KEIN Rate-Limit (lokal)
- Internet: Nicht nötig