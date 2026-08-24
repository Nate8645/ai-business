# HANDOFFS

## H-001 ✅ RESOLVED (2026-08-24)
Claude-Abo-Weg repariert: Key → ANTHROPIC_API_KEY_BACKUP, /login erfolgreich,
Tests haiku/sonnet/Standard = "OK". Claude wieder SENIOR ARCHITECT.
Hinweis: Falls ein anderes Tool den alten Key braucht: User-Level-Umgebungs-
variable ANTHROPIC_API_KEY_BACKUP existiert.

## H-002 → USER: GitHub-Push reparieren
1. https://github.com/settings/tokens → Generate new token (classic) → Scope: repo
2. Neu setzen (Wert nie im Chat teilen). Empfehlung: git credential store/manager nutzen
   oder GITHUB_TOKEN auf User-Ebene neu setzen.
3. Test: `git push --dry-run origin main`

## H-003 → OPENCODE (aktiv)
Website-Build P1 läuft ohne Claude weiter. Nach Claude-Recovery: Review aller
OpenCode-Commits seit Ausfall (RECOVER → REVIEW → REJOIN).
