# HANDOFFS

## H-001 ✅ RESOLVED (2026-08-24)
Claude-Abo-Weg repariert: Key → ANTHROPIC_API_KEY_BACKUP, /login erfolgreich,
Tests haiku/sonnet/Standard = "OK". Claude wieder SENIOR ARCHITECT.
Hinweis: Falls ein anderes Tool den alten Key braucht: User-Level-Umgebungs-
variable ANTHROPIC_API_KEY_BACKUP existiert.

## H-002 → USER: GitHub-Push reparieren (URSACHE BEKANNT, 2026-08-24)
Diagnose (live getestet): Im Windows Credential Manager ist ein Token des
Accounts "bert-devfasdf" gespeichert. Er ist gültig, hat aber KEINE Rechte auf
Nate8645/ai-business (push=False) → HTTP 403 beim Push.

Lösung Option A (empfohlen):
1. Als Nate8645 einloggen → https://github.com/settings/tokens
   → Generate new token (classic) → Scope: repo
2. Windows Credential Manager → Windows-Anmeldeinformationen
   → Eintrag für git:https://github.com löschen; beim nächsten Push fragt Git
   neu ab → neuen Token eintragen (Wert nie im Chat teilen).
Lösung Option B:
   bert-devfasdf als Collaborator auf Nate8645/ai-business einladen
   (Repo Settings → Collaborators) und Einladung annehmen.

Danach: `git push --dry-run origin main` → bei Erfolg pusht OpenCode die
wartenden Commits (inkl. ai-team/, Templates, Workflow).

## H-003 → OPENCODE (aktiv)
Website-Build P1 läuft ohne Claude weiter. Nach Claude-Recovery: Review aller
OpenCode-Commits seit Ausfall (RECOVER → REVIEW → REJOIN).
