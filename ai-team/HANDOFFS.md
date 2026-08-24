# HANDOFFS

## H-001 → USER: Claude-Abo-Weg wiederherstellen
Kontext: Claude lief über ungültigen API-Key statt Abo; OAuth-Session zusätzlich abgelaufen.
Schritte (neues PowerShell-Fenster):
1. Key SICHER umbenennen statt löschen (Wert wird nie angezeigt):
   $v=[Environment]::GetEnvironmentVariable('ANTHROPIC_API_KEY','User')
   [Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY_BACKUP',$v,'User')
   [Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY',$null,'User')
2. Neues Terminal: `claude` starten → `/login` → Browser-Anmeldung mit Abo-Account.
3. Test: `claude -p "Reply with exactly: OK"`
Hinweis: Falls andere Tools den Key brauchen, liegt er unter ANTHROPIC_API_KEY_BACKUP.
Rückgabe: Ergebnis des Tests an OpenCode → Status-Update in STATUS.md.

## H-002 → USER: GitHub-Push reparieren
1. https://github.com/settings/tokens → Generate new token (classic) → Scope: repo
2. Neu setzen (Wert nie im Chat teilen). Empfehlung: git credential store/manager nutzen
   oder GITHUB_TOKEN auf User-Ebene neu setzen.
3. Test: `git push --dry-run origin main`

## H-003 → OPENCODE (aktiv)
Website-Build P1 läuft ohne Claude weiter. Nach Claude-Recovery: Review aller
OpenCode-Commits seit Ausfall (RECOVER → REVIEW → REJOIN).
