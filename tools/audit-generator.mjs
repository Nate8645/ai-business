import { writeFileSync, readFileSync } from "node:fs";

const esc = s => String(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

function pdf(lines) {
  let content = "BT /F1 11 Tf 14 TL ";
  let y = 800;
  for (const [text, size, bold] of lines) {
    if (!text) { y -= 10; continue; }
    const f = bold ? "/F2" : "/F1";
    content += `${f} ${size || 11} Tf 1 0 0 1 50 ${y} Tm (${esc(text)}) Tj `;
    y -= (size || 11) * 1.6;
  }
  content += "ET";
  const objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  ];
  let out = "%PDF-1.4\n";
  const offsets = [];
  objs.forEach((o, i) => { offsets.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xref = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach(o => { out += String(o).padStart(10, "0") + " 00000 n \n"; });
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(out, "latin1");
}

function buildAudit(d) {
  const L = [];
  const add = (t, s, b) => L.push([t, s, b]);
  add("LeadPilot AI - Anfragen-Audit", 20, true);
  add(`Fuer: ${d.unternehmen} (${d.branche})`, 12);
  add(`Datum: ${new Date().toISOString().slice(0, 10)}  |  DEMO-HINWEIS: Regelbasiert generiert, SYNTHETISCHE BEISPIELDATEN`, 9);
  add(null);
  add("1. ERKANNTE PROBLEME", 14, true);
  const probs = [];
  if (!d.formular_vorhanden) probs.push("[KRITISCH] Kein Anfrage-Formular erkennbar - Anfragen verlaufen ueber unstrukturierte Wege.");
  if (d.formular_vorhanden && (d.formularfelder || 0) > 12) probs.push("[HOCH] Sehr langes Formular (" + d.formularfelder + " Felder) - Absprungrisiko steigt mit jedem Feld.");
  if (/tag|woche|spaet/i.test(d.antwortzeit_geschaetzt || "")) probs.push("[KRITISCH] Geschätzte Antwortzeit '" + d.antwortzeit_geschaetzt + "' - erste Rueckmeldung sollte in Minuten/Stunden erfolgen.");
  if (!(d.kontaktmoeglichkeiten || []).some(k => /mail/i.test(k))) probs.push("[MITTEL] Keine E-Mail-Kontaktoption erkannt.");
  if (d.impressum_check === false) probs.push("[HOCH] Impressum nicht auffindbar - rechtlich vorgeschrieben (§5 DDG) und Vertrauenssignal.");
  if (d.datenschutz_check === false) probs.push("[HOCH] Datenschutzerklaerung nicht auffindbar - Pflicht bei Formularen (DSGVO).");
  probs.push("[PRUEFEN] Double-Opt-In und AVV fuer digitale Anfragen rechtlich verankern (DSGVO).");
  probs.forEach(p => add("- " + p));
  add(null);
  add("2. LEAD-VERLUST-RISIKEN", 14, true);
  add("- Anfragen ausserhalb Ihrer Arbeitszeiten warten bis zum Folgetag.");
  add("- Unvollstaendige Angaben fuehren zu Rueckfragen und Zeitverlust auf beiden Seiten.");
  add("- Ohne Vorqualifizierung investieren Sie Zeit in Anfragen ohne Budget/Bedarf.");
  add(null);
  add("3. EMPFOHLENE AUTOMATISIERUNGEN (PRIORITAET)", 14, true);
  add("P1  Sofort-Eingangsantwort per E-Mail (Minuten statt Stunden)");
  add("P2  Formular-Feldoptimierung: nur qualifizierungsrelevante Felder");
  add("P3  Strukturierte Vorqualifizierung (Branche/Budget/Zeitraum-Branching)");
  add("P4  Wochentlicher Lead-Report zur Nachverfolgung");
  add(null);
  add("4. NAECHSTE SCHRITTE", 14, true);
  add("1) Prioritaeten P1-P3 mit Ihrem Team durchgehen (ca. 30 Min)");
  add("2) Setup-Gespraech buchen: LeadPilot richtet P1-P3 in ca. 5 Werktagen ein");
  add("3) Nach 30 Tagen: Review anhand Ihres Monatsreports");
  add(null);
  add("Diese Audit-Version wurde regelbasiert aus Ihren Angaben erzeugt.", 9);
  add("Keine automatischen Messungen Ihrer Website flossen ein. (C) LeadPilot AI", 9);
  return L;
}

const argPath = process.argv[2];
const outPath = process.argv[3] || "audit.pdf";
if (!argPath) { console.error("Usage: node tools/audit-generator.mjs <input.json> <output.pdf>"); process.exit(1); }
const data = JSON.parse(readFileSync(argPath, "utf8"));
writeFileSync(outPath, pdf(buildAudit(data)));
console.log("AUDIT_PDF_OK:", outPath);
