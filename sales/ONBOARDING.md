# ONBOARDING & DELIVERY-PLAYBOOK

Prozess nach Zahlungseingang. Ziel: wiederholbare, qualitätsgeprüfte Lieferung.

## A) Audit-Lieferung (189 € Produkt)
1. Eingang bestätigen (< 24 h), Rechnung stellen
2. Kunden-Website/Formular manuell durchsehen (Checkliste unten)
3. `tools/audit-generator.mjs` mit ausgefülltem Input-JSON laufen lassen
4. PDF manuell gegenchecken: stimmt jede Aussage? Keine Spekulation?
5. PDF + 10-Min-Erklär-Nachricht liefern (innerhalb 48 h)
6. Nach 3 Tagen: Follow-up mit Setup-Angebot (Upsell-Pfad)

## B) Setup+Betrieb-Lieferung (990 € + 299 €/Monat)
Tag 1-2: Kickoff (30 Min) -> Zugangsdaten Klären (sicher! nie per E-Mail im Klartext erfragen, geteilte Passwörter vermeiden)
Tag 2-3: Formular-Anbindung + Qualifizierungslogik konfigurieren (Felder aus demo.html-Logik)
Tag 3-4: Antwortvorlagen mit Kundenwortlaut abstimmen + Double-Opt-In testen
Tag 5: Testlauf mit SYNTHETISCHEN Anfragen -> Kunde bestätigt -> Live-Schaltung
Tag 5+: Monatsreport automatisieren (crm-report + audit-Zahlen)

## C) Qualitäts-Gates vor jeder Lieferung
- [ ] Claude-Review des Outputs (Texte korrekt, keine erfundenen Daten)
- [ ] DSGVO-Checkliste (siehe SECURITY-DSGVO.md) abgearbeitet
- [ ] Demo-Kennzeichnung entfernt NUR wenn echte Kundendaten fließen und AVV unterschrieben ist

## D) Retention & Upsell
Monatlich: Report + 1 Optimierungsvorschlag.
Quartalsweise: Expansion-Gespräch (weitere Kanäle/CRM), nur bei messbarem Nutzen.
