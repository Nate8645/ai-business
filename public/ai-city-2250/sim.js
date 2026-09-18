(function () {
  'use strict';

  if (!window.ROSTER) return;

  var COLORS = ['#FFD700', '#00E5FF', '#00FF9D', '#B8FF3D', '#FF3DF5', '#FFA500', '#A23BFF', '#FF5D8F', '#4DA3FF'];

  var ROSTER = window.ROSTER;

  var PROJECTS = [
    ['Fusions-Reaktor', 9400], ['Quantum-Store', 5200], ['Holo-Marktplatz', 41000], ['Neon-Netz', 7800],
    ['Zahlungs-Gate Erde', 12400], ['DeFi-Tempel', 9800], ['Mars-SEO-Monument', 3300], ['Orbital-Reaktor', 56000],
    ['Kunden-Imperium', 6700], ['Sakura-SPA', 2400], ['Mond-Cloud', 18000], ['Flotten-AI', 3900],
    ['Kolonien-Netz', 6100], ['Krater-Holo-Tour', 2900], ['Mars-Rover', 4700], ['Einkaufs-AI', 7500],
    ['Erde-Mond-Bridge', 15000], ['KI-Healthcare', 22000], ['Crater-Farming', 5100], ['Metaverse-Bahnhof', 31000],
    ['Robotik', 4200], ['Energie-Export', 8700], ['KI-Schulsystem', 13000], ['Auto-Flotte', 6900],
    ['Trading-Rechner', 26000], ['Holo-Konzerne', 5600], ['Nanobot-Recycling', 11000], ['Orbital-Node', 76000],
    ['Lunar-Express', 6600], ['Holo-Theater', 4400], ['KI-Labor Krater', 18500], ['Sonnen-Array', 9900]
  ];

  var agents = [];
  var byName = {};
  var gid = 1;

  function pickPlanet() {
    var r = Math.random();
    if (r < 0.58) return 'moon';
    if (r < 0.76) return 'earth';
    if (r < 0.92) return 'mars';
    return 'orbit';
  }

  function mkAgent(name, team, platform, special) {
    var a = {
      id: gid++,
      name: name,
      team: team,
      teamName: ROSTER[team].name,
      platform: platform || 'CLI',
      special: special || '',
      planet: pickPlanet(),
      level: 1,
      xp: 0,
      proj: 0,
      rev: 0,
      state: 'work',
      timer: 1.5 + Math.random() * 4,
      chat: '',
      ct: 0,
      x: 260 + Math.random() * 900,
      y: 786 + Math.random() * 34,
      mx: 0,
      my: 0,
      travelT: 0,
      fromP: null,
      toP: null,
      t: 0,
      dur: 0
    };
    agents.push(a);
    byName[String(name).toLowerCase()] = a;
    return a;
  }

  for (var di = 0; di < ROSTER.length; di++) {
    var div = ROSTER[di];
    for (var mi = 0; mi < div.members.length; mi++) {
      var m = div.members[mi];
      mkAgent(m.name, di, m.platform, m.special);
    }
  }

  /* EMPTY slots: Jona-Citizens pool (shown as moon extras) */

  /* Kolonie-Gebäude */
  var blds = [];
  blds.push({ name: 'ZENTRAL-REAKTOR', team: 0, kind: 'core', x: 1120, y: 840, seed: 3, lvl: 1, prog: 0, r: 0 });
  for (var bi = 0; bi < ROSTER.length; bi++) {
    blds.push({ name: ROSTER[bi].name.split(' ')[0], team: bi, kind: 'tower', x: 340 + bi * 90, y: 840, seed: bi * 3.7, lvl: 1, prog: 0, r: 0 });
  }
  for (var ci = 0; ci < 16; ci++) {
    blds.push({ name: 'GLASKOMM', team: -1, kind: 'dome', x: 260 + Math.random() * 920, y: 840, seed: ci * 1.3 + 0.7, lvl: 1, prog: 0, r: 14 + Math.random() * 22 });
  }

  var eco = { total: 0, day: 0, inv: 0, proj: 0, lvl: 1 };
  var ships = [];
  var lines = [];

  function pad2(n) { return n < 10 ? '0' + n : '' + n; }
  function now() { return (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now(); }
  function timeStr() {
    var d = new Date();
    return pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
  }
  function addLog(a, m) {
    lines.unshift({ t: timeStr(), a: a, m: m });
    if (lines.length > 140) lines.pop();
  }
  function colCounts() {
    var c = { moon: 0, earth: 0, mars: 0, orbit: 0 };
    for (var i = 0; i < agents.length; i++) c[agents[i].planet]++;
    return c;
  }
  function popOf(p) {
    var c = 0;
    for (var i = 0; i < agents.length; i++) if (agents[i].planet === p) c++;
    return c;
  }

  function launchMission() {
    if (window.SIM && window.SIM.paused) return;
    var n = 3 + Math.floor(Math.random() * 3);
    var pool = agents.slice().sort(function () { return Math.random() - 0.5; });
    var crew = pool.slice(0, n);
    var dests = ['earth', 'mars', 'orbit'];
    var to = dests[Math.floor(Math.random() * dests.length)];
    var from = 'moon';
    for (var i = 0; i < crew.length; i++) {
      var c = crew[i];
      c.state = 'fly';
      c.fromP = from;
      c.toP = to;
      c.t = 0;
      c.dur = 5 + Math.random() * 4;
    }
    var lab = to === 'earth' ? 'ERDE' : (to === 'mars' ? 'MARS' : 'ORBIT');
    ships.push({ crew: crew, from: from, to: to, t: 0, dur: 8, label: 'FLOTTE → ' + lab });
    addLog('KOMANDEUR', '🚀 ' + lab + '-Mission: ' + n + ' Agenten an Bord');
  }

  function missionTick(dt) {
    for (var i = 0; i < ships.length; i++) {
      var s = ships[i];
      s.t += dt;
      if (s.t >= s.dur) {
        for (var j = 0; j < s.crew.length; j++) {
          var c = s.crew[j];
          c.planet = s.to;
          c.state = 'work';
          c.timer = 2 + Math.random() * 4;
          c.x = 260 + Math.random() * 900;
          c.y = 786 + Math.random() * 34;
          addLog(c.name, '🛬 gelandet: ' + (s.to === 'earth' ? 'ERDE' : s.to === 'mars' ? 'MARS' : 'ORBIT'));
        }
        s.done = true;
      }
    }
    for (var k = ships.length - 1; k >= 0; k--) {
      if (ships[k].done) ships.splice(k, 1);
    }
  }

  function newBuilding(p) {
    var kind = Math.random() < 0.65 ? 'tower' : 'dome';
    var team = Math.floor(Math.random() * ROSTER.length);
    blds.push({
      name: p[0], team: team, kind: kind,
      x: 260 + Math.random() * 920, y: 840, seed: Math.random() * 8,
      lvl: 1, prog: 3, r: 14 + Math.random() * 22
    });
  }

  function buildProject() {
    var p = PROJECTS[Math.floor(Math.random() * PROJECTS.length)];
    eco.proj++;
    eco.day += p[1];
    eco.total += p[1];
    eco.lvl = 1 + Math.floor(eco.proj / 20);
    newBuilding(p);
    addLog('ADMIN', '🏗 Kolonie-Erweiterung »' + p[0] + '« · +QD ' + p[1]);
  }

  function reset() {
    eco.total = 0; eco.day = 0; eco.inv = 0; eco.proj = 0; eco.lvl = 1;
    ships = [];
    for (var i = 0; i < agents.length; i++) {
      var a = agents[i];
      a.state = 'work'; a.timer = 2 + Math.random() * 3; a.chat = ''; a.ct = 0;
      a.t = 0; a.dur = 0; a.fromP = null; a.toP = null;
    }
    addLog('SYSTEM', 'Kolonien zurückgesetzt · Netz steht neu');
  }

  var MSGS = [
    'Fusion-Daten sync', 'Holo-Patch LIVE', 'Reaktor stabil 98%', 'Antenne frei',
    'Erde-Call OK', 'Orbit-Link 100%', 'Netz sicher', 'Store-Deploy v5', 'SEO-Rank +12',
    'Krypto-Gate offen', 'QX-Template neu', 'Kunden-Data fusioniert'
  ];

  function tick(dt) {
    if (window.SIM && window.SIM.paused) return;
    var i, a, r;
    for (i = 0; i < agents.length; i++) {
      a = agents[i];
      if (a.state === 'fly') continue;
      a.timer -= dt;
      if (a.timer > 0) continue;
      r = Math.random();

      if (r < 0.15) {
        var p = PROJECTS[Math.floor(Math.random() * PROJECTS.length)];
        a.proj++; eco.proj++;
        a.rev += p[1]; eco.day += p[1]; eco.total += p[1];
        a.xp += p[1] / 700;
        a.chat = '+QD ' + p[1]; a.ct = 45;
        a.timer = 6 + Math.random() * 7;
        if (Math.random() < 0.5) newBuilding(p);
        addLog(a.name, '▶ ' + p[0] + ' · +QD ' + p[1]);
      } else if (r < 0.34) {
        var o = agents[Math.floor(Math.random() * agents.length)];
        a.chat = '⇄'; a.ct = 28; o.timer = Math.min(o.timer, 3);
        a.timer = 3 + Math.random() * 4;
        addLog(a.name + ' ⇄ ' + o.name, MSGS[Math.floor(Math.random() * MSGS.length)]);
      } else if (r < 0.46) {
        if (a.xp > a.level * 40) {
          a.level++;
          a.chat = 'LVL ' + a.level; a.ct = 34;
          addLog(a.name, '⬆ LEVEL ' + a.level);
        }
        a.timer = 3.5;
      } else if (r < 0.56) {
        eco.inv += 200 + Math.floor(Math.random() * 1000);
        a.chat = 'INV'; a.ct = 26; a.timer = 4;
        addLog(a.name, '⚙ Investition in Infrastruktur');
      } else if (r < 0.7) {
        a.mx = 260 + Math.random() * 900;
        a.my = 786 + Math.random() * 34;
        a.state = 'travel';
        a.chat = '⇉'; a.ct = 20;
        a.timer = 6;
      } else {
        a.chat = ''; a.timer = 1.5 + Math.random() * 4;
      }
    }

    for (i = 0; i < agents.length; i++) {
      a = agents[i];
      if (a.state === 'travel' && a.planet === 'moon') {
        var dx = a.mx - a.x, dy = a.my - a.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < 4) { a.state = 'work'; a.timer = 3; }
        else { a.x += (dx / d) * 320 * dt; a.y += (dy / d) * 300 * dt; }
      }
      if (a.ct > 0) a.ct -= dt;
    }

    for (i = 0; i < blds.length; i++) {
      var b = blds[i];
      if (b.prog > 0 && b.prog < 100) {
        b.prog += Math.max(1, 6 * dt) * (0.5 + Math.random());
        if (b.prog >= 100) {
          b.prog = 0;
          b.lvl++;
          addLog('🏗 KOLONIE', 'Neubau: ' + b.name + ' · Level ' + b.lvl);
        }
      }
    }

    eco.day += 0.02 + eco.lvl * 0.01;
    eco.total += 0.02 + eco.lvl * 0.01;
    if (Math.random() < 0.01 + eco.lvl * 0.002 && eco.day > 50) {
      eco.lvl = 1 + Math.floor(eco.proj / 20);
    }
    eco.lvl = 1 + Math.floor(eco.proj / 20);
  }

  window.SIM = {
    COLORS: COLORS,
    agents: agents,
    byName: byName,
    blds: blds,
    ships: ships,
    eco: eco,
    lines: lines,
    paused: false,
    ROSTER: ROSTER,
    now: now,
    addLog: addLog,
    colCounts: colCounts,
    popOf: popOf,
    tick: tick,
    missionTick: missionTick,
    launchMission: launchMission,
    buildProject: buildProject,
    reset: reset
  };

  addLog('CEO', 'Solarenergie-Kolonie verbunden · Netz AKTIV');
  addLog('CHIEF AI', '37+ Modelle online · Kosten $0');
  addLog('OPENCODE', 'Luna City 2250 · Holo-UI v4 · Voll-Betrieb');
  addLog('WINDOWS USE', 'PowerShell-System bereit · Infra 100%');
  addLog('ERDE-HQ', 'Rapperswil-Jona bodengebunden · 24/7');
})();