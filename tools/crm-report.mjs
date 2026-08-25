import { readFileSync } from "node:fs";

const file = process.argv[2] || "sales/leads.csv";
const rows = readFileSync(file, "utf8").split(/\r?\n/).filter(Boolean);
const header = rows.shift().split(";");
const today = new Date().toISOString().slice(0, 10);

const leads = rows.map(r => {
  const c = r.split(";");
  return Object.fromEntries(header.map((h, i) => [h.trim(), (c[i] || "").trim()]));
});

const phases = ["LEAD", "KONTAKTIERT", "ANTWORT", "DEMO", "ANGEBOT", "VERHANDLUNG", "GEWONNEN", "VERLOREN"];
const byPhase = {};
for (const p of phases) byPhase[p] = leads.filter(l => l.phase.toUpperCase() === p);

console.log("=== LeadPilot Pipeline-Report ===", today);
console.log(`Leads gesamt: ${leads.length}`);
for (const p of phases) if (byPhase[p].length) console.log(`  ${p}: ${byPhase[p].length}`);

const scores = { high: 0, med: 0, low: 0 };
for (const l of leads) if (Object.hasOwn(scores, l.score)) scores[l.score]++;
console.log(`Scores: HIGH=${scores.high} MED=${scores.med} LOW=${scores.low}`);

const overdue = leads.filter(l =>
  l.next_action_date && l.next_action_date < today &&
  !["GEWONNEN", "VERLOREN"].includes(l.phase.toUpperCase())
);
if (overdue.length) {
  console.log("\nUEBERFAELLIGE ACTIONS:");
  overdue.forEach(l => console.log(`  [${l.id}] ${l.firma} - ${l.naechster_schritt} (faellig ${l.next_action_date})`));
} else {
  console.log("\nKeine ueberfaelligen Actions.");
}
