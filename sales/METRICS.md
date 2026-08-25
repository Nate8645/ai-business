# METRICS — Was wir messen werden (NO DATA bis Tracking live)

Status: NO DATA. Keine Zahl wird erfunden. Diese Datei definiert das Messsystem.

## Funnel-Definitionen
| Stufe | Definition | Quelle |
|---|---|---|
| Visitors | eindeutige Seitenaufrufe Landingpage | Analytics (nach DSGVO-Prüfung) |
| CTA clicks | Klicks auf Audit-/Demo-CTA | Event-Tracking |
| Demo starts | Aufruf demo.html | Pageview |
| Audit requests | abgeschickte Kontaktformulare | Backend (nach SMTP) |
| Leads qualified | Score HIGH/MED im Qualifizierungsflow | demo.html Logik |
| Demos gehalten | Termine | CRM phase=DEMO |
| Offers | versendete Angebote | CRM phase=ANGEBOT |
| Customers | gewonnene Aufträge | CRM phase=GEWONNEN |
| Revenue / MRR | Rechnungsbeträge | Buchhaltung |
| Churn | gekündigte Monatspakete | CRM |

## Aktueller Zwischenstand
- Visitors/Clicks: NO DATA (Analytics folgt nach DSGVO-Entscheidung)
- Leads: 0 echte · 1 SYNTHETISCHER Demo-Datensatz in leads.csv

## Reporting-Rhythmus
Wöchentlich Montags: crm-report.mjs + (später) Analytics-Snapshot in STATUS.md.
