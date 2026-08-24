import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const prompt = args.join(" ");
const key = process.env.OPENROUTER_API_KEY;

if (!prompt) {
  console.error("Usage: node tools/design-route.mjs <prompt>");
  process.exit(1);
}
if (!key) {
  console.error("OPENROUTER_API_KEY not set");
  process.exit(1);
}

let model = process.env.DESIGN_MODEL || "";
if (!model) {
  try {
    const lb = JSON.parse(
      readFileSync(new URL("../ai-team/data/design-leaderboard.json", import.meta.url), "utf8")
    );
    model = lb.topModel || "";
  } catch {}
}

const body = {
  model: model || "nvidia/nemotron-3.5-lightning:free",
  messages: [{ role: "user", content: prompt }],
};

const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const data = await res.json();
if (!res.ok) {
  console.error(data.error?.message ?? res.statusText);
  process.exit(1);
}
console.log(data.choices[0].message.content);
