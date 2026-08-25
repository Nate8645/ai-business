# CRM-STRUKTUR (Start: eine CSV, kein Tool-Zwang)

Pipeline: LEAD -> KONTAKTIERT -> ANTWORT -> DEMO -> ANGEBOT -> VERHANDLUNG -> GEWONNEN/VERLOREN

## Felder (sales/leads.csv)
id; datum; firma; ansprechpartner; email; telefon; branche;
quelle; score(low/med/high); phase; naechster_schritt; next_action_date;
notizen; verloren_grund

## Regeln
- Jeder Lead hat IMMER ein next_action_date (kein Lead vergisst man).
- Phase wechselt erst nach dokumentiertem Kundenkontakt.
- Verloren immer mit Grund (lernbar für Targeting).
- Wöchentliches Review: Montags 15 Min (OpenCode kann Report generieren).

## Automatisierung später
- Import von Audit-PDF-Anfragen direkt als Lead (P3-Anschluss)
- Erinnerungen via Kalender-Eintrag Export
