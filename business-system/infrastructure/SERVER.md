# INFRASTRUCTURE — Server & Deployment (2026-08-28)

## SERVER-ARCHITEKTUR

```
┌──────────────────────────────────────────────┐
│         WINDOWS SERVER (Admin: Windows Use)   │
│                                               │
│  ┌────────────┐  ┌────────────────────────┐  │
│  │ Docker     │  │ Node.js / npm          │  │
│  │ Desktop    │  │ v20 LTS                │  │
│  │ v24.x      │  │                        │  │
│  └────────────┘  └────────────────────────┘  │
│                                               │
│  ┌────────────┐  ┌────────────────────────┐  │
│  │ Ollama     │  │ GitHub Actions         │  │
│  │ v0.32.x    │  │ (CI/CD)                │  │
│  │ 4 Models   │  │                        │  │
│  └────────────┘  └────────────────────────┘  │
│                                               │
│  ┌────────────┐  ┌────────────────────────┐  │
│  │ Monitoring │  │ Security               │  │
│  │ Prometheus │  │ Defender + Firewall    │  │
│  │ Grafana    │  │ + BitLocker            │  │
│  └────────────┘  └────────────────────────┘  │
└──────────────────────────────────────────────┘
```

## DOCKER SERVICES

| Service | Port | Beschreibung | Status |
|---------|------|--------------|--------|
| shopify-proxy | 3000 | Shopify Webhook Proxy | ⏳ SETUP |
| api-backend | 3001 | Business Logic API | ⏳ SETUP |
| crypto-bot | 3002 | Trading Bot Service | ⏳ PHASE-2 |
| monitoring | 3003 | Prometheus + Grafana | ⏳ SETUP |
| ai-gateway | 3004 | Free Model Router | ⏳ SETUP |

## DEPLOYMENT PIPELINE

```
Code Push → GitHub Actions → Build → Test → Deploy → Monitor
     │                                            │
     └── Commit mit Task-Nummer                   └── Auto-Rollback bei Fehler
```

## SERVER-SETUP (Windows Use — PowerShell)

```powershell
# 1. Docker installieren
Install-PackageName -Name "Docker Desktop" -Source "winget"

# 2. Node.js installieren
Install-PackageName -Name "Node.js LTS" -Source "winget"

# 3. Ollama installieren + Modelle
ollama pull qwen3:0.6b
ollama pull qwen3:1.7b
ollama pull qwen3:4b
ollama pull llama3.2

# 4. Docker Services starten
docker-compose -f business-system/infrastructure/docker-compose.yml up -d

# 5. Monitoring aktivieren
docker-compose -f business-system/infrastructure/docker-compose.monitoring.yml up -d
```

## SICHERHEIT

- BitLocker: Volume-Verschlüsselung aktiv
- Windows Defender: Echtzeit-Schutz aktiv
- Firewall: Nur benötigte Ports offen
- SSH: Nur über VPN oder Key-Auth
- Updates: Automatisch (außer bei CRITICAL)
- Backups: Täglich automatisch (VSS + Cloud)
