# DECISIONS

## D-001 (2026-08-24) — Keine inoffiziellen Arena-Bridges
LMArenaCookie-Bridge-Projekte (Community-Hacks) werden nicht eingesetzt:
ToS-Risiko, instabil, Sicherheitsrisiko. Stattdessen offizielle Datensätze.

## D-002 (2026-08-24) — DesignArena = Datenrolle, nicht Designer
Die offizielle API liefert nur Leaderboard-Daten. Creative Work bleibt bei
OpenCode; die API dient später dem Modell-Router.

## D-003 (2026-08-24) — Claude-Ursache bestätigt, keine Spekulation
Tests bewiesen: Env-Key erzwingt API-Billing; OAuth-Session separat abgelaufen.
Keine Behauptung "Abo abgelaufen" — das wurde NICHT festgestellt.

## D-004 (2026-08-24) — Secrets niemals anzeigen
Env-Variablen werden nur auf Vorhandensein (bool) geprüft, Werte nie ausgelesen,
nie gedruckt, nie committet. Backup-Rename statt Löschung.

## D-005 (2026-08-24) — Fallback-Kette verbindlich
Claude aus → OpenCode architected. Arena aus → WebSearch/HF-Dataset.
Design aus → OpenCode. Projekt stoppt niemals wegen Einzelagent.
