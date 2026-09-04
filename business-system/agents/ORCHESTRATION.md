# AGENT ORCHESTRATION — Wie das Team zusammenarbeitet (2026-08-28)

## ORCHESTRATION-MODEL

```
CUSTOMER (nur Profit einsacken)
    │
    ▼
┌───────────────────────────────────────────────┐
│         MASTER ORCHESTRATOR (OpenCode)         │
│         Admin Lead: Windows Use                │
│                                                │
│  1. Nimm Task vom Board (BOARD.md)            │
│  2. Prüfe Dependencies                        │
│  3. Route zum richtigen Agent                 │
│  4. Monitor Fortschritt                       │
│  5. QA + Commit                               │
│  6. Nächster Task                             │
└───────────────┬───────────────────────────────┘
                │
    ┌───────────┼───────────┬───────────┐
    ▼           ▼           ▼           ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Claude  │ │Arena   │ │Design  │ │28 Free │
│Code    │ │AI      │ │Arena   │ │Models  │
│        │ │        │ │        │ │        │
│Archite-│ │Research│ │Creative│ │Auto    │
│ktur    │ │& Markt │ │& UI/UX │ │Routing │
└────────┘ └────────┘ └────────┘ └────────┘
```

---

## AUTOMATISCHES ROUTING PRO TASK-TYP

| Task-Typ | Bevorzugter Agent | Fallback |
|----------|-------------------|----------|
| Code schreiben | OpenCode (big-pickle) | Claude Code → qwen3:4b |
| Architecture/Design | Claude Code | OpenCode |
| Research/Analyse | Arena AI (GitHub Issue) | WebSearch → gemma-4-31b |
| UI/UX/Design | DesignArena (Bridge) | Claude Code |
| Server/Infra | Windows Use (PowerShell) | OpenCode |
| Shopify Theme | Claude Code + DesignArena | OpenCode |
| SEO-Texte | qwen3:4b (lokal) | nemotron-3-ultra-free |
| Kundensupport | nemotron-3-super-120b | llama3.2 (lokal) |
| Crypto-Analyse | nemotron-3-ultra-free | gemma-4-31b:free |
| Marketing | Arena AI + qwen3:4b | gemma-4-31b |
| Dokumentation | OpenCode | Claude Code |
| Security Review | Claude Code | OpenCode |
| Performance | Claude Code | OpenCode |

---

## HANDOFF-PROTOKOLL

### Schritt 1: Task empfangen
```
Agent liest BOARD.md → findet Task mit Status ⏳ READY
Agent markiert Status → 🔧 IN PROGRESS
```

### Schritt 2: Ausführen
```
Agent führt Task aus mit seinen Tools
Ergebnis wird lokal getestet/verifiziert
```

### Schritt 3: Übergabe
```
Agent markiert Status → 👀 REVIEW
Falls Code: OpenCode oder Claude Code prüft Diff
Falls UI: DesignArena prüft Design
Falls Infra: Windows Use validiert
```

### Schritt 4: Fertig
```
Agent commitet zu GitHub
Agent markiert Status → ✅ DONE
OpenCode aktualisiert BOARD.md
Nächster Task wird gestartet
```

---

## FREE-FIRST MODEL ROUTING (Automatisch)

Jede AI-Aufgabe nutzt zuerst GRATIS-Modelle:

```
Task kommt rein
    │
    ▼
Ollama Local? ──JA──→ qwen3:0.6b (ultra-schnell)
    │                   qwen3:1.7b (balanced)
    NEIN                qwen3:4b (starke Reasoning)
    │                   llama3.2 (general purpose)
    ▼
OpenCode Free? ──JA──→ big-pickle (VERIFIED)
    │                   hy3-free
    NEIN                mimo-v2.5-free
    │                   nemotron-3-ultra-free
    ▼
OpenRouter :free? ──JA──→ gemma-4-31b (Google)
    │                      nemotron-3-super-120b (NVIDIA)
    NEIN                   minimax-m3
    │                      laguna-s (Code)
    ▼
BLOCKED — User Genehmigung nötig (0 $ werden NICHT überschritten)
```

---

## ORCHESTRATION BEI BAUSTEIN 1 (E-COMMERCE MVP)

### Tag 1-2: Setup
```
Windows Use:
  → PowerShell: Docker installieren
  → PowerShell: Node.js + npm setup
  → PowerShell: Server hardening

Arena AI (parallel):
  → GitHub Issue: [ARENA] RESEARCH: 10 profitable Produkte
  → Ergebnis: Produkt-Liste mit Preisen, Lieferanten, Margen

OpenCode (parallel):
  → Dateien für Shopify Store vorbereiten
  → package.json mit Dependencies
```

### Tag 3-4: Store bauen
```
Claude Code:
  → Shopify Theme anpassen (via claude -p)
  → Checkout-Flow optimieren

DesignArena:
  → Store-Design via design-route.mjs
  → Logo, Banner, Hero-Bereich

OpenCode:
  → Backend-API für Orders
  → Webhook-Handler
```

### Tag 5-7: Content + Go-Live
```
qwen3:4b (lokal):
  → 10x Produktbeschreibungen
  → SEO-Meta-Tags
  → Blog-Artikel #1

nemotron-3-super-120b (OpenRouter):
  → Kundensupport-KI trainieren
  → FAQ-Datenbank

OpenCode:
  → Deploy zu GitHub Pages / Server
  → Domain + SSL konfigurieren
  → Monitoring aktivieren
```

---

## ESKALATION BEI PROBLEMEN

```
Problem aufgetreten
    │
    ▼
Agent kann es nicht lösen?
    │
    JA → Eskalation an Admin Team:
    │     Windows Use (System/Infra)
    │     Claude Code (Architektur/Security)
    │
    NEIN → Agent löst es selbst
    │
    ▼
Problem gelöst → Task weiter
Problem ungelöst → User wird informiert (nur bei kritischen Problemen)
```

---

## KONTINUITÄT

- Jeder Task wird in BOARD.md getrackt
- Jeder Commit wird mit Task-Nummer referenziert
- Das Board ist die Single Source of Truth
- Der Customer muss nichts tun außer Profit einsacken
