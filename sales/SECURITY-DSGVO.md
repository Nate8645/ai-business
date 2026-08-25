# SECURITY & DSGVO-CHECKLISTE (Betrieb LeadPilot AI)

## Vor jedem Kundengo-Live
- [ ] AVV (Auftragsverarbeitungsvertrag) mit Kunde unterschrieben
- [ ] Double-Opt-In bei allen dauerhaften E-Mail-Kontakten
- [ ] Datenschutzerklärung des KUNDEN erwähnt LeadPilot als Verarbeiter
- [ ] Datenminimierung: nur Felder erheben, die die Qualifizierung braucht
- [ ] Löschkonzept: Leads nach X Monaten inaktiv löschen (mit Kunde vereinbaren)
- [ ] Keine Sonderkategorien personenbezogener Daten (Gesundheit etc.) erheben

## Technische Hygiene
- [ ] Zugangsdaten nie per E-Mail im Klartext; geteilte Credentials vermeiden
      (Passwort-Manager / einmalige Tokens)
- [ ] HTTPS überall; SMTP mit TLS
- [ ] SPF + DKIM + DMARC der Versanddomain eingerichtet (Deliverability+Spoofing-Schutz)
- [ ] Logs enthalten keine personenbezogenen Inhalte im Klartext

## Dieses Repository
- [x] Secret-Scan vor jedem Commit (Workflow etabliert, manuell ausgeführt)
- [x] Keine .env/Keys im Repo (geprüft 2026-08-25)
- [x] Demo-Daten synthetisch + gekennzeichnet (.invalid-Domains)
- [ ] Analytics erst NACH DSGVO-Prüfung einbauen (kein Tracking bisher = datenschutzfreundlicher Start)

## Offene Punkte (BLOCKED bis USER ACTION)
- Impressums-/Anbieteridentität (Name/Adresse) für eigene Rechtsseiten
- Hosting-Wahl (dann: HSTS, Security-Header)
