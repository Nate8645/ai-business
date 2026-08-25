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

## D-006 (2026-08-24) — Eigene Design-Route statt Fremd-MCP
Community-Paket `mcp-bench-router` abgelehnt (Supply-Chain-Risiko, fremder
Code mit Zugriff auf OPENROUTER_API_KEY). Stattdessen eigenes 40-Zeilen-
Skript tools/design-route.mjs — 100% auditierbar, live getestet ("DESIGN
ROUTE OK" über Free-Modell, Kosten 0 €).

## D-007 (2026-08-24) — Leaderboard ohne Key = keine erfundenen Rankings
design-leaderboard.json enthält topModel:null bis DESIGNARENA_API_KEY da ist.
GitHub-Workflow läuft dann wöchentlich automatisch; ohne Secret tut er nichts.

## D-008 (2026-08-24) — Issue-Bridge als offizieller Handoff-Kanal
Live getestet: Issues auf dem public Repo sind auch ohne Push-Recht
erstellbar (Issue #1 erstellt + sofort geschlossen). Aufgaben-Übergabe an
Arena/DesignArena läuft über Issues (Titel-Prefix [ARENA] / [DESIGN]).
Voller Flow (Branches/PRs/Workflow) aktiviert automatisch nach H-002.

## D-010 (2026-08-25) � Review-Zyklus ist verbindlich
Erster echte FAIL->FIX->PASS-Zyklus (Feature-Cards). Regel: Kein Commit ohne
Claude-PASS (oder dokumentierter OpenCode-Fallback-Pass bei Claude-Ausfall).
