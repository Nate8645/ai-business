# AI BUSINESS TEAM — Team-Konfiguration (2026-08-28)

## 👑 ADMIN TEAM (Priorität 1 — Entscheidungsbefugnis)

| # | Mitglied | Rolle | Verbindung | Status |
|---|----------|-------|------------|--------|
| 1 | **Windows Use** | System-Admin / Platform Operations | Windows PowerShell 5.1, WMI, WinRM, RDP, Hyper-V | **ACTIVE** |
| 2 | 👑 OpenCode | Master Orchestrator | CLI lokal + GitHub MCP | CONNECTED |
| 3 | 🧠 Claude Code | Senior Architect | CLI via Abo (OAuth) | CONNECTED |

## 🧠 CORE TEAM (Priorität 2 — Ausführung)

| # | Mitglied | Rolle | Verbindung | Status |
|---|----------|-------|------------|--------|
| 4 | 🔬 Arena AI | Research Agent | GitHub App (arena-ai-coding-agent) | CONNECTED VIA GITHUB |
| 5 | 🎨 DesignArena | Creative/Design | Bridge: design-route.mjs → OpenRouter | BRIDGE CONNECTED |

## 🔧 EXTENDED TEAM (Priorität 3 — Spezialisten)

| # | Mitglied | Rolle | Verbindung | Status |
|---|----------|-------|------------|--------|
| 6 | Model Pool | AI Models Registry | Lokale Dateien (model-pool/) | ACTIVE |
| 7 | Tools | Automation Scripts | tools/*.mjs, *.ps1 | ACTIVE |
| 8 | Business Division | Strategy/Sales | business/, sales/ | ACTIVE |

---

## TEAM-AKTIVIERUNG

Dieses Team ist **AKTIV** ab 2026-08-28.

### Admin-Befugnisse (Windows Use - Position 1)
- System-Level Operations (PowerShell, WMI, Registry, Services)
- Infrastructure Provisioning (Hyper-V, Docker, Networking)
- Security Hardening (BitLocker, Defender, Firewall, GPO)
- Deployment & CI/CD auf Windows Nodes
- Notfall-Zugriff & Disaster Recovery

### Eskalations-Pfad
```
Windows Use (Admin) → OpenCode (Orchestrator) → Claude Code (Architect) → Core Team
```

### Handoff-Regeln
1. **Admin-Tasks** → Windows Use (PowerShell, System-Config, Deployment)
2. **Code/Architecture** → OpenCode → Claude Code
3. **Research** → Arena AI (via GitHub Issue `[ARENA]`)
4. **Design/UI** → DesignArena (via `node tools/design-route.mjs`)
5. **Business/Sales** → Business Division (business/, sales/)

---

## KONFIGURATIONS-DATEIEN

- `AGENTS.md` — Detaillierte Agent-Rollen & Verbindungen
- `ORCHESTRATION.md` — Live-getestetes Team-Protokoll
- `STATUS.md` — Verbindungs-Status & Test-Ergebnisse
- `MODEL-REGISTRY.md` — Verfügbare KI-Modelle
- `CAPABILITY-REGISTRY.md` — Team-Fähigkeiten Matrix
- `SKILLS.md` — Verfügbare Skills (omega-enterprise, etc.)

---

## GITHUB SYNC

- Remote: `https://github.com/Nate8645/ai-business.git`
- Branch: `main`
- Team-Config wird bei Änderungen gecommitet & gepusht
- Admin-Team Änderungen erfordern Review durch Windows Use + OpenCode