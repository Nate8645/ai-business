'use strict';
/* ============================================================
   AI CITY · realtime brut
   Server für die echte AI-Stadt:
   - scannt das Repo => Gebäude (Dateien) und Stadtteile (Ordner)
   - liest die echte opencode-Telemetrie (log) => UFO-Agenten
   - dispatch: startet echte opencode run-Agenten
   - SSE-Push an die Browser-Stadt
   ============================================================ */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = process.env.PORT || 4777;
const LOG = path.join(process.env.USERPROFILE || process.env.HOME || '.', '.local', 'share', 'opencode', 'log', 'opencode.log');
const OPENCODE_BIN = process.env.OPENCODE_BIN || path.join(process.env.APPDATA || '', 'npm', 'node_modules', 'opencode-ai', 'bin', 'opencode.exe');

/* ---------- Repo-Scan: echte Gebäude ---------- */
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.nuxt', '.turbo', '.cache', '.venv', 'snapshot']);
const SKIP_FILES = new Set(['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'bun.lockb', '.DS_Store']);
const EXT_WEIGHT = { '.js': 1, '.jsx': 1, '.ts': 1, '.tsx': 1, '.html': 2, '.css': 3, '.ps1': 1, '.md': 3, '.json': 2, '.jsonc': 2, '.png': 8, '.jpg': 6, '.py': 1 };

function scanBuildings() {
  const out = [];
  const dists = [];
  const seenDist = new Set();
  function walk(dir, rel) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
    for (const ent of entries) {
      if (SKIP_DIRS.has(ent.name) || ent.name.startsWith('.')) continue;
      if (ent.isDirectory()) walk(path.join(dir, ent.name), rel ? rel + '/' + ent.name : ent.name);
      else {
        if (SKIP_FILES.has(ent.name)) continue;
        const abs = path.join(dir, ent.name);
        let size = 0; try { size = fs.statSync(abs).size; } catch (e) {}
        const ext = path.extname(ent.name).toLowerCase();
        const weight = EXT_WEIGHT[ext] || 4;
        const relPath = (rel ? rel + '/' : '') + ent.name;
        const dist = rel || '.';
        out.push({ rel: relPath, dist: dist, ext: ext || '.', size: size, weight: weight });
        if (!seenDist.has(dist)) { seenDist.add(dist); dists.push(dist); }
      }
    }
  }
  walk(ROOT, '');
  const coll = {};
  out.forEach(b => { b.used = coll[b.rel] || false; });
  return { buildings: out, dists: dists };
}

/* ---------- opencode-Telemetrie ---------- */
const agents = new Map();   // runId -> agent
let listeners = new Set();
let tailOffset = 0;
let lastScan = { buildings: [], dists: [] };
let dispatched = [];        // {ts, prompt}
let bootTime = Date.now();

function emit(ev) {
  const line = 'data: ' + JSON.stringify(ev) + '\n\n';
  listeners.forEach(res => { try { res.write(line); } catch (e) {} });
}

function agentKey(run) { return agents.get(run); }

function parseLine(raw) {
  const m = raw.match(/^timestamp=([\d\-T:.Z]+) level=(\w+) run=([0-9a-f]+) message=(.*)$/);
  if (!m) return;
  const ts = Date.parse(m[1]) || Date.now();
  const run = m[3];
  const body = m[4];

  let ag = agents.get(run);
  if (!ag) {
    if (ts < bootTime - 4000) return; // nur frische(n) Leben
    ag = { run: run, session: null, model: '?', provider: null, steps: 0, tools: 0, state: 'idle', file: null, remote: null, since: ts, lastSeen: ts, errors: 0, label: null, prompt: null };
    agents.set(run, ag);
    emit({ type: 'agent_seen', agent: ag });
  }
  ag.lastSeen = ts;

  const b = body.match(/^"?llm runtime selected"?[ ]+llm\.runtime=(\S+) llm\.provider=(\S+) llm\.model=(\S+)/);
  if (b) {
    ag.model = b[3]; ag.provider = b[2];
    const label = ag.label || null;
    const hooked = dispatched.find(d => !d.bound && ts - d.ts < 60000);
    if (hooked) { hooked.bound = true; ag.prompt = hooked.prompt; ag.label = hooked.label; }
    emit({ type: 'agent_model', agent: ag });
    return;
  }
  const sess = body.match(/session\.id=(ses_\w+)/);
  if (sess) ag.session = sess[1];

  const body2 = body.replace(/^"llm runtime selected"[\s\S]*/, ''); // bereits oben behandelt
  if (body.indexOf('loop ') >= 0 || body === 'loop') {
    const step = (body.match(/step=(\d+)/) || [])[1];
    if (+step >= 0) { ag.steps = Math.max(ag.steps, +step + 1); ag.state = 'working'; }
    emit({ type: 'agent_step', agent: ag });
    return;
  }
  if (body.indexOf('"touching file"') >= 0) {
    const f = (body.match(/file="((?:[^"\\]|\\.)*)"/) || [])[1];
    if (f) {
      let rel = f;
      try {
        const abs = f.replace(/\\\\/g, '\\');
        rel = path.relative(ROOT, abs).replace(/\\/g, '/');
      } catch (e) {}
      if (rel && !rel.startsWith('..')) { ag.file = rel; ag.state = 'working'; }
    }
    emit({ type: 'agent_touch', agent: ag });
    return;
  }
  if (body.indexOf('process') >= 0 && body.indexOf('processTelemetry') < 0 && /^process[ ]/.test(body.concat(' '))) {
    ag.tools++;
    ag.state = 'tools';
    emit({ type: 'agent_process', agent: ag });
    return;
  }
  if (body.indexOf('stream') >= 0 && body.slice(0, 20).indexOf('stream') >= 0) {
    ag.state = 'thinking';
    emit({ type: 'agent_stream', agent: ag });
    return;
  }
  if (body.indexOf('"exiting loop"') >= 0 || body.indexOf('exiting') >= 0) {
    ag.state = 'done';
    emit({ type: 'agent_done', agent: ag });
    return;
  }
  if (/level=ERROR/.test(raw) && /Streaming response failed|Error from provider/.test(raw)) {
    ag.errors++;
    emit({ type: 'agent_error', agent: ag, msg: raw.slice(0, 180) });
    return;
  }
  if (body.indexOf('creating instance') >= 0 || body.indexOf('bootstrapping') >= 0) {
    if (!ag.state || ag.state === 'idle') { ag.state = 'spawning'; emit({ type: 'agent_spawn', agent: ag }); }
    return;
  }
}

function pumpLog() {
  if (!fs.existsSync(LOG)) return;
  let st; try { st = fs.statSync(LOG); } catch (e) { return; }
  if (st.size < tailOffset) tailOffset = 0; // log rotated
  if (st.size === tailOffset) return;
  const fd = fs.openSync(LOG, 'r');
  const buf = Buffer.alloc(st.size - tailOffset);
  fs.readSync(fd, buf, 0, buf.length, tailOffset);
  fs.closeSync(fd);
  tailOffset = st.size;
  const text = buf.toString('utf8');
  const lines = text.split('\n');
  for (const l of lines) { if (l.trim()) parseLine(l); }
}

/* ---------- HTTP + SSE ---------- */
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };

const server = http.createServer((req, res) => {
  const urlPath = (req.url || '/').split('?')[0];

  if (req.method === 'POST' && urlPath === '/api/dispatch') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const job = JSON.parse(body || '{}');
        const prompt = String(job.prompt || '').trim();
        if (!prompt) { res.writeHead(400, { 'content-type': 'application/json' }); res.end('{"ok":false,"err":"empty"}'); return; }
        const agent = String(job.agent || 'build').trim();
        spawnAgent(prompt, agent);
        dispatched.push({ ts: Date.now(), prompt: prompt, bound: false, label: agent });
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ ok: true, prompt: prompt, agent: agent }));
      } catch (e) {
        res.writeHead(500, { 'content-type': 'application/json' }); res.end(JSON.stringify({ ok: false, err: String(e) }));
      }
    });
    return;
  }

  if (urlPath === '/api/state') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const active = [];
    agents.forEach(a => active.push(a));
    lastScan = scanBuildings();
    res.end(JSON.stringify({
      root: 'ai-business',
      ts: Date.now(),
      dists: lastScan.dists,
      buildings: lastScan.buildings,
      agents: active,
      uptime: Math.round((Date.now() - bootTime) / 1000)
    }));
    return;
  }

  if (urlPath === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    });
    res.write('retry: 1000\n\n');
    listeners.add(res);
    const id = setInterval(() => { try { res.write(': ping\n\n'); } catch (e) { clearInterval(id); listeners.delete(res); } }, 15000);
    req.on('close', () => { clearInterval(id); listeners.delete(res); });
    return;
  }

  /* static files (nur /city/*) */
  let rel = urlPath === '/' ? 'index.html' : urlPath.slice(1);
  const file = path.resolve(__dirname, rel);
  if (!file.startsWith(__dirname)) { res.writeHead(403); res.end(); return; }
  const ext = path.extname(file).toLowerCase();
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

/* ---------- echter Agent starten ---------- */
const DEFAULT_MODEL = 'opencode/big-pickle';

function spawnAgent(prompt, agentName) {
  const esc = (s) => '"' + s.replace(/"/g, '\\"') + '"';
  const cmd = esc(OPENCODE_BIN) + ' run ' + esc(prompt) + ' --model ' + DEFAULT_MODEL;
  const opts = {
    cwd: ROOT,
    shell: true,
    windowsHide: true,
    env: Object.assign({}, process.env, { OPENCODE_LOG_LEVEL: 'INFO' })
  };
  let child;
  try {
    child = spawn(cmd, [], opts);
  } catch (e) { emit({ type: 'dispatch_failed', msg: String(e) }); return; }
  try { child.stdin && child.stdin.end(); } catch (e) {}
  child.on('error', (e) => emit({ type: 'dispatch_failed', msg: String(e) }));
  child.stdout && child.stdout.on('data', () => {});
  child.stderr && child.stderr.on('data', () => {});
  emit({ type: 'dispatch_start', agent: agentName, prompt: prompt });
}

/* ---------- boot ---------- */
bootTime = Date.now();
pumpLog();
try { if (fs.existsSync(LOG)) tailOffset = fs.statSync(LOG).size; } catch (e) {}

let t;
try { t = fs.watch(LOG, () => { try { pumpLog(); } catch (e) {} }); } catch (e) { t = null; }
if (!t) setInterval(pumpLog, 1200);
else fs.watch(path.dirname(LOG), () => pumpLog).close(); // no-op guard

setInterval(() => {
  pumpLog();
  /* alter Kram raus nach 90s Inaktivität */
  agents.forEach((a, run) => {
    if (Date.now() - a.lastSeen > 90000 && a.state !== 'done') {
      if (a.state === 'idle') return; // einmal pro Zustand melden
      a.state = 'idle'; emit({ type: 'agent_idle', agent: a });
    }
  });
}, 5000);

server.listen(PORT, () => {
  console.log('AI CITY realtime brut läuft auf http://localhost:' + PORT);
  console.log('  Log: ' + LOG);
  console.log('  Bin: ' + OPENCODE_BIN);
});