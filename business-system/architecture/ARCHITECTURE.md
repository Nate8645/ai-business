# AI BUSINESS SYSTEM — Master-Architektur (2026-08-28)

## Vision

Ein komplett automatisiertes E-Commerce + Krypto-Unternehmen, das:
1. Für den Kunden arbeitet — er steuert via Dashboard, alles andere läuft autonom
2. AI Agents übernehmen Marketing, Verkauf, Krypto-Trading, Customer Service
3. Profit wird maximiert durch 24/7-Automatisierung mit 0 $ API-Kosten
4. Jeder Baustein ist ein Testbaustein — perfekt für iterative Entwicklung

---

## SYSTEM-ARCHITEKTUR (Überblick)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CUSTOMER DASHBOARD (Web UI)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ Revenue  │  │ Crypto   │  │ E-Com    │  │ Profit Tracker   │   │
│  │ Monitor  │  │ Portfolio│  │ Store    │  │ (Live Updates)   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘   │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                    ORCHESTRATION LAYER                               │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  OpenCode (Master Orchestrator) ← Admin Team (Windows Use)  │   │
│  │  ├── Claude Code (Architect)                                │   │
│  │  ├── Arena AI (Research)                                    │   │
│  │  └── 28 Free AI Models (Auto-Routing)                       │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                    BUSINESS ENGINES                                  │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐      │
│  │ E-COMMERCE   │  │ CRYPTO       │  │ PROFIT ENGINE        │      │
│  │ ENGINE       │  │ ENGINE       │  │ (Zusammenführung)    │      │
│  │              │  │              │  │                      │      │
│  │ • Shopify    │  │ • Trading    │  │ • Revenue Streams    │      │
│  │ • Products   │  │ • DeFi       │  │ • Cost Optimization  │      │
│  │ • Orders     │  │ • Staking    │  │ • Profit Analytics   │      │
│  │ • Fulfill    │  │ • Portfolio  │  │ • Payouts            │      │
│  └──────────────┘  └──────────────┘  └──────────────────────┘      │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐      │
│  │ MARKETING    │  │ CUSTOMER     │  │ LEGAL & COMPLIANCE   │      │
│  │ ENGINE       │  │ SERVICE      │  │                      │      │
│  │              │  │              │  │ • DSGVO               │      │
│  │ • SEO        │  │ • AI Chat    │  │ • Impressum           │      │
│  │ • Ads        │  │ • Ticketing  │  │ • AGB                 │      │
│  │ • Social     │  │ • FAQ Auto   │  │ • Crypto-Compliance   │      │
│  │ • Email      │  │ • Refunds    │  │ • KYC/AML             │      │
│  └──────────────┘  └──────────────┘  └──────────────────────┘      │
└─────────────────────────────────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                    INFRASTRUCTURE                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ Windows  │  │ Docker   │  │ GitHub   │  │ Monitoring       │   │
│  │ Server   │  │ Services │  │ Actions  │  │ (Prometheus/Graf)│   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3 PHASEN — CONSTRUCTION SITE APPROACH

### Phase 1: BAUSTEIN 1 — E-Commerce MVP (Woche 1-2)
- Shopify Store Setup (DesignArena + OpenCode)
- 5-10 Produkte Listing (Arena AI Research → OpenCode Implementation)
- Checkout Flow optimiert (CRO by DesignArena)
- Automated Order Processing (OpenCode + Claude Code)
- **Revenue: Produkte verkaufen, Profit tracken**

### Phase 2: BAUSTEIN 2 — Crypto Integration (Woche 3-4)
- Crypto-Payment Gateway (Stripe Crypto / Coinbase Commerce)
- DeFi Yield Aggregation (Automatisiert via Agents)
- Portfolio Dashboard (Live-Preise, Allocation)
- Auto-Rebalancing (AI-gesteuert)
- **Revenue: Crypto-Staking + Trading Profits**

### Phase 3: BAUSTEIN 3 — Full Autopilot (Woche 5-6)
- AI Marketing Engine (SEO + Ads + Social automatisiert)
- AI Customer Service (Chatbot + Ticketing)
- Profit Maximizer (Revenue Streams optimieren)
- Customer Dashboard (Alles auf einen Blick)
- **Revenue: Vollautomatisiert, Customer sammelt Profit**

---

## AGENT-VERTEILUNG PRO BAUSTEIN

### Baustein 1 — E-Commerce MVP
| Agent | Aufgabe | Tools |
|-------|---------|-------|
| Windows Use | Server Setup, Docker, Shopify App | PowerShell, Docker |
| OpenCode | Backend-API, Order-Processing | CLI, GitHub |
| Claude Code | Shopify Theme, Checkout CRO | `claude -p` |
| Arena AI | Produktrecherche, Wettbewerb | GitHub Issue `[ARENA]` |
| DesignArena | Store Design, UI/UX | `design-route.mjs` |
| qwen3:4b | Produktbeschreibungen, SEO-Texte | Lokal |
| nemotron-3-ultra-free | Kundensupport-KI | API |
| gemma-4-31b:free | Marktforschung | OpenRouter |

### Baustein 2 — Crypto Integration
| Agent | Aufgabe | Tools |
|-------|---------|-------|
| Windows Use | Crypto-Node Setup, Wallet-Sicherung | PowerShell |
| OpenCode | Trading-Bot, Portfolio-API | CLI, GitHub |
| Claude Code | Smart Contract Review, Security | `claude -p` |
| Arena AI | Crypto-Marktanalyse, Sentiment | GitHub Issue |
| llama3.2:local | Schnelle Preis-Updates | Ollama |
| nemotron-3-super-120b:free | DeFi-Analyse, Yield-Strategie | OpenRouter |
| inkling:free | Risikobewertung | OpenRouter |

### Baustein 3 — Full Autopilot
| Agent | Aufgabe | Tools |
|-------|---------|-------|
| Windows Use | Monitoring, Auto-Scaling | PowerShell |
| OpenCode | Automatisierungs-Engine | CLI |
| Claude Code | AI Chatbot, NLP | `claude -p` |
| Arena AI | Marketing-Automation | GitHub Issue |
| DesignArena | Customer Dashboard UI | `design-route.mjs` |
| big-pickle | Multi-Task Agent (Routing) | OpenCode |
| All Models | Load-Balanced AI Services | Auto-Routing |

---

## PROJEKT-STRUCTURE

```
business-system/
├── architecture/          # Diese Datei + System-Design
│   └── ARCHITECTURE.md
├── construction-site/     # Aktuelle Baustelle + Task-Board
│   ├── BOARD.md           # Offene Tasks (Jeder Task = ein Baustein)
│   ├── PHASE-1.md         # E-Commerce MVP Tracker
│   ├── PHASE-2.md         # Crypto Integration Tracker
│   └── PHASE-3.md         # Full Autopilot Tracker
├── infrastructure/        # Server, Docker, Deployment
│   ├── SERVER.md          # Windows Server Config
│   ├── DOCKER.md          # Container-Services
│   └── DEPLOY.md          # CI/CD Pipeline
├── agents/                # Agent-Orchestrierung
│   ├── ORCHESTRATION.md   # Wie Agents zusammenarbeiten
│   ├── ROUTING.md         # Free-First Model Routing
│   └── HANDOFF.md         # Task-Übergabe zwischen Agents
├── profit-engine/         # Revenue-Streams
│   ├── STREAMS.md         # Alle Revenue-Quellen
│   ├── E-COMMERCE.md      # Shopify/Product Revenue
│   ├── CRYPTO.md          # Trading/Staking/DeFi Revenue
│   └── OPTIMIZER.md       # Profit-Maximierung
├── monitoring/            # Live-Monitoring
│   ├── DASHBOARD.md       # Customer Dashboard Spec
│   └── ALERTS.md          # Automatische Benachrichtigungen
└── legal/                 # Rechtliches
    ├── DSGVO.md           # Datenschutz
    ├── IMPRESSUM.md       # Impressum-Daten
    └── COMPLIANCE.md      # Crypto-Compliance
```

---

## ERFOLGS-METRICS

| Metrik | Phase 1 | Phase 2 | Phase 3 |
|--------|---------|---------|---------|
| Revenue/Monat | 500-2000 EUR | 2000-10000 EUR | 10000+ EUR |
| AI-Kosten | $0 | $0 | $0 |
| Manueller Aufwand | 5h/Woche | 2h/Woche | 0.5h/Woche |
| Customer Profit | 300-1500 EUR/Mon | 1500-8000 EUR/Mon | 8000+ EUR/Mon |
| Automatisierungsgrad | 60% | 80% | 95% |

---

## NEXT STEP — AKTUELLE BAUSTELLE

Die aktuelle Baustelle ist in `construction-site/BOARD.md` dokumentiert.
Jeder Task dort wird von einem spezifischen Agent bearbeitet.
Das Board wird nach jedem abgeschlossenen Task aktualisiert.
