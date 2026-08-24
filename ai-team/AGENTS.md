# AGENTS — Rollen & Verbindungen (Stand: 2026-08-24)

## 👑 OpenCode v1.18.22 — MASTER BOSS
CONNECTED. Orchestrierung, Coding, Git, QA, Security, Fallback für alle Rollen.

## 🧠 Claude Code v2.1.238 — SENIOR ARCHITECT
CONNECTED (2026-08-24 getestet: haiku/sonnet/Standard → "OK").
Abo-Login aktiv; API-Key als Backup unter ANTHROPIC_API_KEY_BACKUP.
Premium-Modell-Fenster resettet stündlich/5h — Standard ist sonnet.
Aufgaben: Architektur, Coding, Refactoring, Code Review, Security Review.

## 🔬 Arena AI — RESEARCH DIRECTOR
NOT CONNECTED als Agent (keine offizielle API/MCP/CLI).
AVAILABLE als Datenquelle: offizielles HF-Leaderboard-Dataset + WebSearch-Fallback.

## 🎨 DesignArena — CREATIVE ADVISOR (Daten)
REQUIRES USER ACTION: API-Key via designarena.ai/developers/apply (1–2 Werktage).
API = Leaderboard/ELO-Daten (models/builders/agents), KEINE Generierung →
nur Modell-Router-Empfehlungen, keine Creative-Umsetzung.
Creative-Fallback: OpenCode.

## GITHUB — Source of Truth
Fetch CONNECTED · Push REQUIRES USER ACTION (neuer PAT, Scope repo).
Keine Tokens in Dateien, Env oder Chat. ai-team/ ist secret-frei.
