# ROUTING — Free-First Model Selection (2026-08-28)

## AUTOMATISCHES MODELL-ROUTING

Für jede AI-Aufgabe wird automatisch das COST-GÜNSTIGSTE Modell gewählt:

### Prioritätskette

```
P1: OLLAMA LOCAL (0.6b, 1.7b, 4b, llama3.2)
    Kosten: $0 | Latenz: <1s | Rate-Limit: Keiner
    → Nutzen für: Lokale Tasks, schnelle Analysen, Agent-Workflows

P2: OPENCODE FREE (big-pickle, hy3-free, mimo-v2.5, muse-spark, nemotron-3-ultra, nemotron-3.5-lightning)
    Kosten: $0 | Latenz: 1-3s | Rate-Limit: Keiner (in Session)
    → Nutzen für: Coding, Reasoning, Multi-Tool Tasks

P3: OPENROUTER :free (17 Modelle)
    Kosten: $0 | Latenz: 2-5s | Rate-Limit: Ja (pro Modell)
    → Nutzen für: Backup, spezialisierte Tasks

P4: ARENA BRIDGE (gleiche 17 OpenRouter Modelle)
    Kosten: $0 | Latenz: 3-10s | Rate-Limit: Ja
    → Nutzen für: Research, Design-Snippets

P5: BLOCKED — PAID MODEL
    Kosten: >$0 | NICHT AUTOMATISCH
    → Nur nach User-Genehmigung
```

## TASK-TO-MODELL-ZUWEISUNG

| Task-Typ | P1 (Ollama) | P2 (OpenCode) | P3 (OpenRouter) |
|----------|-------------|---------------|-----------------|
| Coding | qwen3:4b | big-pickle, mimo-v2.5 | laguna-s, north-mini |
| Reasoning | qwen3:4b | big-pickle | gemma-4-31b |
| Speed | qwen3:0.6b | nemotron-3.5-lightning | minimax-m3 |
| Creative | llama3.2 | muse-spark | inkling, glm-5.2 |
| Agent | qwen3:1.7b | big-pickle | nemotron-3-nano |
| Safety | — | — | nemotron-3.5-content-safety |
| Code-Only | — | big-pickle | poolside-laguna |
| Research | — | — | gemma-4-31b, inkling |
| Large-Context | — | — | nemotron-3-super-120b |
| Maximum | — | — | nemotron-3-ultra-550b |

## RATE-LIMIT-HANDLING

```
Modell nicht verfügbar (Rate Limit)?
    │
    ▼
Nächstes Modell in Prioritätskette
    │
    ▼
Alle :free Modelle blocked?
    │
    ▼
BLOCKED — Kein $0 Modell verfügbar
    → User wird informiert
    → Erst nach Genehmigung: PAID Model nutzen
```

## KOSTEN-NACHVERFOLGUNG

```
Jede AI-Nutzung wird protokolliert:
- Welches Modell wurde genutzt
- Welcher Task wurde ausgeführt
- Wie viele Tokens wurden verbraucht
- Kosten: $0 (dokumentiert)
```
