(function () {
  'use strict';

  var WO = 1400, HO = 900, MON_HOR = 600, MON_BASE = 840;
  var TAU = Math.PI * 2;

  var canvas = null, ctx = null, W = 0, H = 0;
  var camera = { x: 700, y: 700, z: 1 };

  var P = {
    earth: { x: 210, y: 150, r: 150 },
    mars: { x: 1180, y: 120, r: 62 },
    jupiter: { x: 1270, y: 340, r: 112 },
    saturn: { x: 150, y: 330, r: 78 },
    orbit: { x: 1060, y: 72, r: 34 }
  };
  var MOON_LAND = { x: 700, y: MON_BASE - 40 };

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function lerp(a, b, x) { return a + (b - a) * x; }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function rndi(a, b) { return Math.floor(rnd(a, b + 1)); }
  function hashStr(s) {
    var h = 0, i;
    for (i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; }
    return Math.abs(h);
  }
  function teamColor(i) {
    return (window.SIM && SIM.COLORS && SIM.COLORS[i]) ? SIM.COLORS[i] : '#7aa2ff';
  }
  function buildFactor(b) {
    return (b.prog > 0 && b.prog < 100) ? (b.prog / 100) : 1;
  }
  function objPos(planet) {
    if (planet === 'moon') return { x: MOON_LAND.x, y: MOON_LAND.y };
    if (planet === 'earth') return { x: P.earth.x, y: P.earth.y };
    if (planet === 'mars') return { x: P.mars.x, y: P.mars.y };
    if (planet === 'orbit') return { x: P.orbit.x, y: P.orbit.y };
    return { x: MOON_LAND.x, y: MOON_LAND.y };
  }
  function fontOf(s) { return '600 ' + (s || 10) + 'px "Segoe UI", Arial, sans-serif'; }

  var stars = [], speck = [], craters = [], ridge = [];
  var earthBlobs = [], earthClouds = [], earthLights = [], marsMarks = [];
  var jupBands = [], satBands = [];

  function precompute() {
    var i;
    for (i = 0; i < 260; i++) {
      stars.push({ x: rnd(0, WO), y: rnd(0, MON_HOR), r: rnd(0.4, 1.6), ph: rnd(0, TAU), sp: rnd(0.0002, 0.0012), a: rnd(0.25, 0.9) });
    }
    for (i = 0; i < 220; i++) {
      speck.push({ x: rnd(0, WO), y: rnd(MON_HOR, HO), r: rnd(0.4, 1.4), a: rnd(0.05, 0.22), d: Math.random() < 0.5 });
    }
    for (i = 0; i < 9; i++) {
      craters.push({ x: rnd(50, WO - 50), y: rnd(MON_HOR + 14, HO - 46), rx: rnd(14, 52), ry: rnd(4, 12), rot: rnd(0, TAU) });
    }
    var n = 72;
    for (i = 0; i <= n; i++) {
      var xx = (i / n) * WO;
      var baseY = MON_HOR - rnd(8, 22);
      var peak = 0;
      if (i > 0 && i < n && Math.random() < 0.5) peak = rnd(8, 62);
      ridge.push({ x: xx, y: baseY - peak });
    }
    for (i = 0; i < 14; i++) earthBlobs.push({ a: rnd(0, TAU), r: rnd(0.25, 0.78) * P.earth.r, s: rnd(12, 34), ph: rnd(0, TAU), v: rnd(0.14, 0.28) });
    for (i = 0; i < 6; i++) earthClouds.push({ a: rnd(0, TAU), r: rnd(0.22, 0.85) * P.earth.r, w: rnd(30, 72), v: rnd(0.10, 0.22) });
    for (i = 0; i < 38; i++) earthLights.push({ a: rnd(0, TAU), r: rnd(0.3, 0.95) * P.earth.r, ph: rnd(0, TAU), sp: rnd(0.001, 0.003) });
    for (i = 0; i < 8; i++) marsMarks.push({ a: rnd(0, TAU), r: rnd(0.14, 0.7) * P.mars.r, s: rnd(6, 16), ph: rnd(0, TAU) });
    var bandCols = ['rgba(150,110,70,0.34)', 'rgba(60,35,20,0.34)', 'rgba(205,175,125,0.28)', 'rgba(120,80,50,0.30)'];
    var by = -P.jupiter.r;
    for (i = 0; by < P.jupiter.r; i++) {
      var bh = rnd(14, 30);
      jupBands.push({ y: by, h: bh, c: bandCols[i % 4], i: i });
      by += bh + rnd(4, 12);
    }
    var satCols = ['rgba(210,180,130,0.26)', 'rgba(150,110,70,0.26)', 'rgba(120,85,60,0.22)'];
    var bs = -P.saturn.r;
    for (i = 0; bs < P.saturn.r; i++) {
      var bh2 = rnd(12, 24);
      satBands.push({ y: bs, h: bh2, c: satCols[i % 3], i: i });
      bs += bh2 + rnd(6, 16);
    }
  }
  precompute();

  function label(txt, x, y, s, col) {
    ctx.save();
    ctx.font = fontOf(s);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = col || 'rgba(210,228,255,0.85)';
    ctx.shadowColor = 'rgba(140,190,255,0.55)';
    ctx.shadowBlur = 7;
    ctx.fillText(txt, x, y);
    ctx.restore();
  }

  function smallLabel(txt, x, y, col) {
    ctx.save();
    ctx.font = '9px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(220,235,255,0.9)';
    ctx.shadowColor = col || '#000000';
    ctx.shadowBlur = 4;
    ctx.fillText(txt, x, y);
    ctx.restore();
  }

  function roundRect(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function blobShape(cx, cy, r, ph, pts, squash) {
    ctx.beginPath();
    for (var i = 0; i < pts; i++) {
      var an = (i / pts) * TAU;
      var rr = r * (0.62 + 0.38 * Math.sin(an * 2.3 + ph) + 0.12 * Math.sin(an * 5.1 + ph * 1.7));
      var x = cx + Math.cos(an) * rr;
      var y = cy + Math.sin(an) * rr * (squash || 0.8);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function nebula(x, y, r, c1, c2) {
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, c1);
    g.addColorStop(1, c2);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
  }

  function rimLight(x, y, r, strength) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.clip();
    ctx.strokeStyle = 'rgba(190,228,255,' + (strength || 0.5) + ')';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(170,220,255,0.8)';
    ctx.shadowBlur = 13;
    ctx.beginPath();
    ctx.arc(x, y, r * 0.99, Math.PI, Math.PI * 1.5);
    ctx.stroke();
    ctx.restore();
  }

  function drawSpace(t) {
    var g = ctx.createLinearGradient(0, 0, 0, MON_HOR);
    g.addColorStop(0, '#040214');
    g.addColorStop(0.55, '#0b0d2c');
    g.addColorStop(1, '#1b1440');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, WO, MON_HOR);

    ctx.save();
    ctx.globalAlpha = 0.55;
    nebula(330, 230, 330, 'rgba(96,22,140,0.30)', 'rgba(30,10,80,0)');
    nebula(1030, 300, 380, 'rgba(26,62,138,0.30)', 'rgba(10,20,60,0)');
    ctx.restore();

    ctx.save();
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var a = s.a * (0.55 + 0.45 * Math.sin(t * s.sp + s.ph));
      if (a <= 0.03) continue;
      ctx.globalAlpha = a;
      ctx.fillStyle = '#ffffff';
      var sr = s.r + (s.r > 1 ? 0.5 : 0);
      ctx.beginPath();
      ctx.arc(s.x, s.y, sr, 0, TAU);
      ctx.fill();
    }
    ctx.restore();

    var cycle = 11000;
    var p = (t % cycle) / cycle;
    var win = 0.13;
    if (p < win) {
      var q = p / win;
      var a2 = Math.sin(q * Math.PI);
      var sx = 120 + q * 620;
      var sy = 50 + q * 200;
      var dx = 0.82, dy = 0.44, len = 95;
      var ex = sx + dx * len, ey = sy + dy * len;
      var sg = ctx.createLinearGradient(sx, sy, ex, ey);
      sg.addColorStop(0, 'rgba(255,255,255,0)');
      sg.addColorStop(1, 'rgba(255,255,255,' + (0.75 * a2).toFixed(3) + ')');
      ctx.save();
      ctx.strokeStyle = sg;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      ctx.restore();
    }
  }

  function drawEarth(t) {
    var cx = P.earth.x, cy = P.earth.y, R = P.earth.r;
    var rot = t * 0.00006;
    var halo = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.45);
    halo.addColorStop(0, 'rgba(70,150,255,0.28)');
    halo.addColorStop(1, 'rgba(70,150,255,0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.45, 0, TAU);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, TAU);
    ctx.clip();

    var body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
    body.addColorStop(0, '#8ed0f8');
    body.addColorStop(0.5, '#1d55c8');
    body.addColorStop(1, '#081653');
    ctx.fillStyle = body;
    ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

    ctx.fillStyle = 'rgba(70,172,122,0.72)';
    for (var i = 0; i < earthBlobs.length; i++) {
      var b = earthBlobs[i];
      var bx = cx + Math.cos(b.a + rot * b.v) * b.r;
      var byy = cy + Math.sin(b.a + rot * b.v) * b.r * 0.8;
      blobShape(bx, byy, b.s, b.ph, 6);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(130,222,150,0.35)';
    for (i = 0; i < earthBlobs.length; i++) {
      var b2 = earthBlobs[i];
      var bx2 = cx + Math.cos(b2.a + rot * b2.v) * b2.r;
      var by2 = cy + Math.sin(b2.a + rot * b2.v) * b2.r * 0.8;
      blobShape(bx2, by2, b2.s * 0.55, b2.ph + 1.2, 6);
      ctx.fill();
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.30)';
    ctx.lineCap = 'round';
    for (i = 0; i < earthClouds.length; i++) {
      var c = earthClouds[i];
      var ca = c.a + rot * c.v * 1.4;
      ctx.lineWidth = c.w * 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, c.r, ca - 0.8, ca + 0.8);
      ctx.stroke();
    }

    var term = ctx.createLinearGradient(cx - R * 0.3, 0, cx + R * 1.1, 0);
    term.addColorStop(0, 'rgba(8,12,40,0)');
    term.addColorStop(1, 'rgba(5,7,28,0.93)');
    ctx.fillStyle = term;
    ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

    for (i = 0; i < earthLights.length; i++) {
      var l = earthLights[i];
      var la = l.a + rot;
      var lx = cx + Math.cos(la) * l.r;
      var ly = cy + Math.sin(la) * l.r * 0.82;
      if (lx <= cx + R * 0.10) continue;
      var fa = Math.max(0, Math.sin(t * l.sp + l.ph));
      ctx.fillStyle = (i % 5 === 0) ? '#9fe9ff' : '#ffd98a';
      ctx.globalAlpha = 0.28 + 0.6 * fa;
      ctx.fillRect(lx - 0.8, ly - 0.8, 1.6, 1.6);
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    rimLight(cx, cy, R, 0.5);
    label('ERDE', cx, cy + R + 20, 12);
  }

  function drawMars(t) {
    var cx = P.mars.x, cy = P.mars.y, R = P.mars.r;
    var rot = t * 0.00005;
    var halo = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.35);
    halo.addColorStop(0, 'rgba(240,120,60,0.22)');
    halo.addColorStop(1, 'rgba(240,120,60,0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.35, 0, TAU);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, TAU);
    ctx.clip();
    var body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
    body.addColorStop(0, '#f2a06a');
    body.addColorStop(0.55, '#c1441f');
    body.addColorStop(1, '#5e1208');
    ctx.fillStyle = body;
    ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

    ctx.fillStyle = 'rgba(60,12,6,0.35)';
    for (var i = 0; i < marsMarks.length; i++) {
      var m = marsMarks[i];
      var mx = cx + Math.cos(m.a + rot) * m.r;
      var my = cy + Math.sin(m.a + rot) * m.r * 0.8;
      blobShape(mx, my, m.s, m.ph, 5);
      ctx.fill();
    }
    ctx.strokeStyle = 'rgba(50,10,4,0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - R * 0.5, cy - R * 0.05);
    ctx.quadraticCurveTo(cx - R * 0.1, cy + R * 0.25, cx + R * 0.5, cy + R * 0.15);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,246,235,0.85)';
    ctx.beginPath();
    ctx.ellipse(cx - R * 0.08, cy - R * 0.86, R * 0.34, R * 0.12, 0, 0, TAU);
    ctx.fill();
    ctx.restore();

    rimLight(cx, cy, R, 0.45);
    label('MARS', cx, cy + R + 18, 11);
  }

  function drawBandedSphere(x, y, R, bands, rot, spot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rot || 0) + (spot === 'jupi' ? Math.sin(rot * 0.5) * 0.04 : 0));
    for (var i = 0; i < bands.length; i++) {
      var b = bands[i];
      var oy = b.y + Math.sin(rot * 0.0003 * (b.i + 1)) * 1.5;
      ctx.fillStyle = b.c;
      roundRect(-R - 10, oy - b.h / 2, (R + 10) * 2, b.h, b.h / 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawJupiter(t) {
    var cx = P.jupiter.x, cy = P.jupiter.y, R = P.jupiter.r;
    var halo = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.4);
    halo.addColorStop(0, 'rgba(215,175,120,0.2)');
    halo.addColorStop(1, 'rgba(215,175,120,0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.4, 0, TAU);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, TAU);
    ctx.clip();
    var body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
    body.addColorStop(0, '#f7e3c0');
    body.addColorStop(0.55, '#caa06a');
    body.addColorStop(1, '#7d512d');
    ctx.fillStyle = body;
    ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    drawBandedSphere(cx, cy, R, jupBands, t * 0.00002, 'jupi');
    var gsr = ctx.createRadialGradient(cx + R * 0.18, cy + R * 0.08, 2, cx + R * 0.26, cy + R * 0.14, R * 0.24);
    gsr.addColorStop(0, 'rgba(235,140,90,0.95)');
    gsr.addColorStop(1, 'rgba(150,60,40,0.75)');
    ctx.fillStyle = gsr;
    ctx.beginPath();
    ctx.ellipse(cx + R * 0.26, cy + R * 0.14, R * 0.22, R * 0.13, -0.2, 0, TAU);
    ctx.fill();
    ctx.restore();

    rimLight(cx, cy, R, 0.4);
    label('JUPITER', cx, cy + R + 18, 11);
  }

  function drawSaturnRing(cx, cy, tilt) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(tilt);
    ctx.scale(1, 0.3);
    var inner = P.saturn.r * 1.12, outer = P.saturn.r * 1.82;
    for (var i = 0; i < 4; i++) {
      var rr = inner + (outer - inner) * (i + 0.5) / 4;
      ctx.strokeStyle = 'rgba(214,185,140,' + (0.55 - i * 0.1).toFixed(2) + ')';
      ctx.lineWidth = (outer - inner) / 4 * 0.95;
      ctx.beginPath();
      ctx.arc(0, 0, rr, 0, TAU);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawSaturn(t) {
    var cx = P.saturn.x, cy = P.saturn.y, R = P.saturn.r;
    var tilt = -0.5;
    drawSaturnRing(cx, cy, tilt);

    var halo = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, R * 1.3);
    halo.addColorStop(0, 'rgba(230,195,130,0.2)');
    halo.addColorStop(1, 'rgba(230,195,130,0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.3, 0, TAU);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, TAU);
    ctx.clip();
    var body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
    body.addColorStop(0, '#f4dfae');
    body.addColorStop(0.55, '#d9b87f');
    body.addColorStop(1, '#96703f');
    ctx.fillStyle = body;
    ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    drawBandedSphere(cx, cy, R, satBands, t * 0.00003, null);
    ctx.fillStyle = 'rgba(60,35,20,0.18)';
    ctx.strokeStyle = 'rgba(60,35,20,0.25)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - R * 0.8, cy + R * 0.05);
    ctx.quadraticCurveTo(cx, cy + R * 0.35, cx + R * 0.8, cy + R * 0.05);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.rect(cx - R * 2, cy, R * 4, R * 2);
    ctx.clip();
    drawSaturnRing(cx, cy, tilt);
    ctx.restore();

    rimLight(cx, cy, R, 0.42);
    label('SATURN', cx, cy + R * 1.9 + 14, 11);
  }

  function drawOrbit(t) {
    var cx = P.orbit.x, cy = P.orbit.y, R = P.orbit.r;
    ctx.save();
    ctx.fillStyle = 'rgba(80,200,255,0.14)';
    ctx.beginPath();
    ctx.arc(cx, cy, R * 2.0, 0, TAU);
    ctx.fill();

    ctx.fillStyle = 'rgba(120,190,240,0.32)';
    ctx.strokeStyle = 'rgba(180,230,255,0.55)';
    ctx.lineWidth = 1;
    ctx.fillRect(cx - R * 1.8, cy - R * 0.72, R * 0.8, R * 1.44);
    ctx.strokeRect(cx - R * 1.8, cy - R * 0.72, R * 0.8, R * 1.44);
    ctx.fillRect(cx + R, cy - R * 0.72, R * 0.8, R * 1.44);
    ctx.strokeRect(cx + R, cy - R * 0.72, R * 0.8, R * 1.44);
    ctx.strokeStyle = 'rgba(140,220,255,0.5)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - R * 0.9, cy);
    ctx.lineTo(cx + R * 0.9, cy);
    ctx.stroke();

    var body = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 2, cx, cy, R);
    body.addColorStop(0, '#cbf4ff');
    body.addColorStop(0.6, '#3fb8ff');
    body.addColorStop(1, '#0a4a8a');
    ctx.fillStyle = body;
    ctx.shadowColor = '#4fd0ff';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.6, 0, TAU);
    ctx.fill();
    ctx.shadowBlur = 0;

    var rot = t * 0.0022;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.scale(1, 0.28);
    ctx.strokeStyle = 'rgba(125,222,255,0.85)';
    ctx.lineWidth = 2.4;
    ctx.shadowColor = '#4fd0ff';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, 0, R * 1.35, 0, TAU);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-rot * 0.7);
    ctx.scale(1, 0.28);
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0, 0, R * 1.05, 0, TAU);
    ctx.stroke();
    ctx.restore();

    var blink = (Math.sin(t * 0.007) + 1) / 2;
    ctx.fillStyle = '#ff4b4b';
    ctx.shadowColor = '#ff4b4b';
    ctx.shadowBlur = 8 + 16 * blink;
    ctx.beginPath();
    ctx.arc(cx, cy - R * 0.55, 2.4 + 0.8 * blink, 0, TAU);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    label('ORBIT', cx, cy + R + 18, 10, 'rgba(170,235,255,0.95)');
  }

  function ridgePath(dy) {
    ctx.beginPath();
    ctx.moveTo(-10, MON_HOR);
    for (var i = 0; i < ridge.length; i++) {
      ctx.lineTo(ridge[i].x, ridge[i].y + dy);
    }
    ctx.lineTo(WO + 10, MON_HOR);
    ctx.closePath();
    ctx.fill();
  }

  function pad(x, t) {
    var pulse = 0.5 + 0.5 * Math.sin(t * 0.004 + x * 0.01);
    ctx.save();
    ctx.globalAlpha = 0.3 + 0.25 * pulse;
    ctx.fillStyle = '#7fd8ff';
    ctx.shadowColor = '#7fd8ff';
    ctx.shadowBlur = 16 + 14 * pulse;
    ctx.beginPath();
    ctx.ellipse(x, MON_BASE + 16, 26, 7, 0, 0, TAU);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.5 + 0.4 * pulse;
    ctx.strokeStyle = '#d6f4ff';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(x, MON_BASE + 16, 17, 4.6, 0, 0, TAU);
    ctx.stroke();
    ctx.restore();
  }

  function drawMoonSurface(t) {
    var hg = ctx.createLinearGradient(0, MON_HOR - 90, 0, MON_HOR);
    hg.addColorStop(0, 'rgba(90,150,255,0)');
    hg.addColorStop(1, 'rgba(150,195,255,0.5)');
    ctx.fillStyle = hg;
    ctx.fillRect(0, MON_HOR - 90, WO, 90);
    ctx.fillStyle = 'rgba(190,220,255,0.35)';
    ctx.fillRect(0, MON_HOR - 1, WO, 1);

    var sg = ctx.createLinearGradient(0, MON_HOR, 0, HO);
    sg.addColorStop(0, '#2d3a5c');
    sg.addColorStop(0.45, '#1e2842');
    sg.addColorStop(1, '#121726');
    ctx.fillStyle = sg;
    ctx.fillRect(0, MON_HOR, WO, HO - MON_HOR);

    ctx.fillStyle = '#1a2240';
    ridgePath(-7);
    ctx.fillStyle = '#0d1428';
    ridgePath(0);
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(0, MON_HOR - 1, WO, 2);

    ctx.save();
    for (var i = 0; i < speck.length; i++) {
      var s = speck[i];
      ctx.globalAlpha = s.a;
      ctx.fillStyle = s.d ? '#3a4a74' : '#0a0f1f';
      ctx.fillRect(s.x, s.y, s.r, s.r);
    }
    ctx.restore();

    for (i = 0; i < craters.length; i++) {
      var c = craters[i];
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rot);
      ctx.strokeStyle = 'rgba(10,16,34,0.5)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.ellipse(0, 0, c.rx, c.ry, 0, 0, TAU);
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.beginPath();
      ctx.ellipse(c.rx * 0.4, 0, c.rx * 0.38, c.ry * 0.5, 0, 0, TAU);
      ctx.fill();
      ctx.restore();
    }

    pad(560, t);
    pad(760, t);
    pad(960, t);
  }

  function towerPath(cx, baseY, top, hw, tw) {
    ctx.moveTo(cx - hw, baseY);
    ctx.lineTo(cx - tw, top);
    ctx.lineTo(cx + tw, top);
    ctx.lineTo(cx + hw, baseY);
    ctx.closePath();
  }

  function drawWindows(cx, top, bottom, w, color, hsh, t) {
    var cols = 3, pad = 3;
    var colW = (w - pad * 2) / cols;
    var rowH = 5, gap = 6;
    var y = top + 6;
    var idx = 0;
    ctx.save();
    while (y < bottom - 10 && idx < 40) {
      for (var c2 = 0; c2 < cols; c2++) {
        var wx = cx - (w / 2 - pad) + c2 * colW + colW / 2;
        var flick = (Math.sin(t * 0.004 + (hsh + idx * 7 + c2 * 13)) + 1) * 0.5;
        var on = (((hsh + idx * 11 + c2 * 17) % 10) < 8) ? flick : 0.12;
        ctx.globalAlpha = 0.15 + 0.75 * on;
        ctx.fillStyle = (idx % 3 === 0) ? '#d9f4ff' : '#ffd98a';
        ctx.fillRect(wx, y, colW - 1.2, rowH);
      }
      idx++;
      y += rowH + gap;
    }
    ctx.restore();
  }

  function baseShadow(cx, baseY, rx) {
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.ellipse(cx, baseY + 3, rx, 4, 0, 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  function progressBar(cx, baseY, prog, bw) {
    ctx.save();
    ctx.fillStyle = 'rgba(255,148,52,0.25)';
    ctx.fillRect(cx - bw / 2, baseY - 11, bw, 3.5);
    ctx.fillStyle = '#ffb165';
    ctx.fillRect(cx - bw / 2, baseY - 11, bw * (prog / 100), 3.5);
    ctx.font = '9px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffc98f';
    ctx.fillText(Math.round(prog) + '%', cx, baseY - 19);
    ctx.restore();
  }

  function drawTower(b, t) {
    var color = teamColor(b.team);
    var hsh = hashStr(String(b.name || 't') + (b.seed || 0));
    var baseY = MON_BASE;
    var h = Math.min(250, Math.max(70, 42 * b.lvl * (0.75 + buildFactor(b))));
    var w = 26 + (hsh % 5);
    var cx = b.x;
    var top = baseY - h;
    var hw = w / 2, tw = w * 0.38;

    if (b.prog > 0 && b.prog < 100) {
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = '#ff9434';
      ctx.shadowColor = '#ff9434';
      ctx.shadowBlur = 10;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      towerPath(cx, baseY, top, hw, tw);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 0.07 + 0.05 * Math.sin(t * 0.005 + hsh);
      ctx.fillStyle = '#ff9434';
      ctx.fill();
      ctx.restore();
      progressBar(cx, baseY, b.prog, w * 2.4);
    }

    baseShadow(cx, baseY, w * 0.75);

    var g = ctx.createLinearGradient(cx - hw, 0, cx + hw, 0);
    g.addColorStop(0, '#0b0e1c');
    g.addColorStop(0.5, color);
    g.addColorStop(1, '#0b0e1c');
    ctx.save();
    ctx.fillStyle = g;
    ctx.shadowColor = color;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    towerPath(cx, baseY, top, hw, tw);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(200,232,255,0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    drawWindows(cx, top, baseY, w, color, hsh, t);

    var tip = 0.6 + 0.4 * Math.sin(t * 0.004 + hsh);
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = color;
    ctx.shadowBlur = 5 + 13 * tip;
    ctx.beginPath();
    ctx.arc(cx, top - 2, 2.4, 0, TAU);
    ctx.fill();
    ctx.restore();

    smallLabel(b.name, cx, baseY + 11, color);
  }

  function drawDome(b, t) {
    var color = '#5fd8ff';
    var hsh = hashStr(String(b.name || 'd') + (b.seed || 0));
    var cx = b.x, baseY = MON_BASE;
    var R = 24 + (hsh % 3) * 8;

    if (b.prog > 0 && b.prog < 100) {
      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = '#ff9434';
      ctx.shadowColor = '#ff9434';
      ctx.shadowBlur = 10;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(cx - R, baseY);
      ctx.arc(cx, baseY, R, Math.PI, 0, false);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
      progressBar(cx, baseY, b.prog, R * 1.9);
    }

    baseShadow(cx, baseY, R * 1.2);

    ctx.save();
    var glass = ctx.createRadialGradient(cx, baseY - R * 0.6, 2, cx, baseY, R * 1.1);
    glass.addColorStop(0, 'rgba(180,244,255,0.34)');
    glass.addColorStop(0.55, 'rgba(90,214,255,0.16)');
    glass.addColorStop(1, 'rgba(40,140,255,0.06)');
    ctx.fillStyle = glass;
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(cx - R, baseY);
    ctx.arc(cx, baseY, R, Math.PI, 0, false);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = 'rgba(150,235,255,0.75)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(cx - R, baseY);
    ctx.arc(cx, baseY, R, Math.PI, 0, false);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(150,235,255,0.45)';
    ctx.beginPath();
    ctx.moveTo(cx - R * 0.6, baseY);
    ctx.arc(cx, baseY, R * 0.6, Math.PI * 1.05, -Math.PI * 0.05, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - R * 0.28, baseY);
    ctx.arc(cx, baseY, R * 0.28, Math.PI * 1.1, -Math.PI * 0.1, false);
    ctx.stroke();

    ctx.fillStyle = 'rgba(150,235,255,0.6)';
    for (var i = 0; i < 5; i++) {
      var aa = Math.PI * (0.5 + (i - 2) * 0.19);
      var sx = cx + Math.cos(aa) * R * 1.0;
      var sy = baseY + Math.sin(aa) * R * 1.0;
      ctx.beginPath();
      ctx.moveTo(cx, baseY - R * 1.02);
      ctx.quadraticCurveTo(sx * 0.4 + cx * 0.6, sy * 0.3 + baseY * 0.7, sx, sy);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(175,240,255,0.8)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.ellipse(cx, baseY, R * 1.02, R * 0.16, 0, 0, TAU);
    ctx.stroke();
    ctx.restore();

    smallLabel(b.name, cx, baseY + 11, color);
  }

  function drawCore(b, t) {
    var color = '#ffd270';
    var hsh = hashStr(String(b.name || 'c') + (b.seed || 0));
    var baseY = MON_BASE;
    var h = Math.min(320, Math.max(120, 60 * b.lvl * (0.75 + buildFactor(b))));
    var cx = b.x;
    var top = baseY - h;
    var hw = 18, tw = 11;
    var pulse = 0.5 + 0.5 * Math.sin(t * 0.003 + hsh);

    if (b.prog > 0 && b.prog < 100) {
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = '#ff9434';
      ctx.shadowColor = '#ff9434';
      ctx.shadowBlur = 12;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      towerPath(cx, baseY, top, hw, tw);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
      progressBar(cx, baseY, b.prog, 46);
    }

    baseShadow(cx, baseY, 34);

    var g = ctx.createLinearGradient(cx - hw, 0, cx + hw, 0);
    g.addColorStop(0, '#3a2a08');
    g.addColorStop(0.5, color);
    g.addColorStop(1, '#3a2a08');
    ctx.save();
    ctx.fillStyle = g;
    ctx.shadowColor = '#ffcf6a';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    towerPath(cx, baseY, top, hw, tw);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,240,200,0.65)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    for (var k = 0; k < 3; k++) {
      var colPulse = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * 0.005 + hsh + k * 1.3));
      ctx.globalAlpha = colPulse;
      ctx.strokeStyle = (k % 2 === 0) ? '#ffe9b0' : '#fff8e0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx - 7 + k * 7, baseY - 6 - (h - 14) * 0.3, 4, -Math.PI * 0.9, -Math.PI * 0.1);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx - 7 + k * 7, baseY - 6 - (h - 14) * 0.7, 4, -Math.PI * 0.9, -Math.PI * 0.1);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    for (var oi = 0; oi < 3; oi++) {
      var ox = cx - 12 + oi * 12;
      var oy = top - 4 - Math.sin(t * 0.004 + hsh + oi * 1.1) * 3;
      ctx.save();
      ctx.fillStyle = oi === 1 ? '#ffffff' : '#ffd270';
      ctx.shadowColor = '#ffcf6a';
      ctx.shadowBlur = 12 + 14 * Math.sin(t * 0.005 + oi * 1.4 + hsh * 0.5);
      ctx.beginPath();
      ctx.arc(ox, oy, 3.2 + 1.6 * pulse, 0, TAU);
      ctx.fill();
      ctx.restore();
    }

    ctx.save();
    ctx.strokeStyle = 'rgba(255,200,90,' + (0.35 + 0.5 * pulse).toFixed(2) + ')';
    ctx.lineWidth = 2.4;
    ctx.shadowColor = '#ffcf6a';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.ellipse(cx, baseY + 4, 42 + 10 * pulse, 11 + 2 * pulse, 0, 0, TAU);
    ctx.stroke();
    ctx.restore();

    label('ZENTRAL-REAKTOR', cx, baseY + 18, 10, 'rgba(255,232,170,0.95)');
  }

  function drawColony(t) {
    if (!window.SIM) return;
    var blds = SIM.blds || [];
    if (!blds.length) return;
    var sorted = blds.slice().sort(function (p, q) { return p.x - q.x; });
    for (var i = 0; i < sorted.length; i++) {
      var b = sorted[i];
      if (b.kind === 'tower') drawTower(b, t);
      else if (b.kind === 'dome') drawDome(b, t);
      else if (b.kind === 'core') drawCore(b, t);
    }
  }

  function glowingDot(x, y, r, col, a, pulse) {
    ctx.save();
    ctx.globalAlpha = a * (0.7 + 0.3 * pulse);
    ctx.shadowColor = col;
    ctx.shadowBlur = 12 + 10 * pulse;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(x, y, r * (0.7 + 0.3 * pulse), 0, TAU);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = a * (0.45 + 0.55 * pulse);
    ctx.beginPath();
    ctx.arc(x, y, r * 0.42, 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  function planetAgentPos(a, cp, tt) {
    var h = hashStr(String(a.id));
    var ang = ((h % 360) * Math.PI) / 180 + tt * 0.0006 * (((h >> 3) % 2) ? 1 : -1);
    var rad = cp.r * (0.34 + ((h >> 5) % 42) / 100);
    return {
      x: cp.x + Math.cos(ang) * rad,
      y: cp.y + Math.sin(ang) * rad * 0.85 + Math.sin(tt * 0.0025 + h) * 2
    };
  }

  function drawPlanetAgent(a, col, t) {
    var cp = P[a.planet] || P.earth;
    var p = planetAgentPos(a, cp, t);
    var h = hashStr(String(a.id));
    var pulse = 0.5 + 0.5 * Math.sin(t * 0.005 + h);
    glowingDot(p.x, p.y, 4.5, col, 1, pulse);
  }

  function drawMoonAgent(a, col, t) {
    var px = a.x, py = a.y;
    var h = hashStr(String(a.id));
    var pulse = 0.5 + 0.5 * Math.sin(t * 0.006 + h);

    if (a.state === 'travel' && a.mx != null && a.my != null) {
      ctx.save();
      ctx.strokeStyle = col;
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 1.3;
      ctx.setLineDash([2, 5]);
      ctx.shadowColor = col;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(a.mx, a.my);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 0.45 + 0.3 * pulse;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(a.mx, a.my, 5 + 2.5 * pulse, 0, TAU);
      ctx.stroke();
      ctx.restore();
    }

    glowingDot(px, py, 6.5, col, 0.95, pulse);

    if (a.ct > 0 && a.chat) {
      var txt = String(a.chat);
      ctx.save();
      ctx.font = '11px "Segoe UI", Arial, sans-serif';
      var tw = Math.min(ctx.measureText(txt).width, 140);
      var bw = tw + 22, bh = 20;
      var bx = px - bw / 2, byy = py - 16 - bh - 7;
      roundRect(bx, byy, bw, bh, 6);
      ctx.fillStyle = 'rgba(8,12,26,0.82)';
      ctx.fill();
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.4;
      ctx.shadowColor = col;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(px - 4, byy + bh);
      ctx.lineTo(px + 4, byy + bh);
      ctx.lineTo(px, byy + bh + 5);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(txt, px, byy + bh / 2 - 1, 150);
      ctx.restore();
    }
  }

  function drawAgents(t) {
    if (!window.SIM || !SIM.agents) return;
    var i, a;
    for (i = 0; i < SIM.agents.length; i++) {
      a = SIM.agents[i];
      if (a.state === 'fly') continue;
      if (a.planet === 'earth' || a.planet === 'mars' || a.planet === 'orbit') {
        drawPlanetAgent(a, teamColor(a.team), t);
      }
    }
    for (i = 0; i < SIM.agents.length; i++) {
      a = SIM.agents[i];
      if (a.state === 'fly') continue;
      if (a.planet === 'moon') {
        drawMoonAgent(a, teamColor(a.team), t);
      }
    }
  }

  function drawShips(t) {
    if (!window.SIM || !SIM.ships) return;
    for (var i = 0; i < SIM.ships.length; i++) {
      var s = SIM.ships[i];
      var st = objPos(s.from), en = objPos(s.to);
      var av = s.dur > 0 ? s.t / s.dur : 1;
      av = Math.max(0, Math.min(1, av));
      var px = st.x + (en.x - st.x) * av;
      var py = st.y + (en.y - st.y) * av;
      var dx = en.x - st.x, dy = en.y - st.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.001) { dx = 1; dy = 0; dist = 1; }
      var ang = Math.atan2(dy, dx);
      var tl = Math.min(dist * av * 1.2 + 50, dist * 0.5 + 120);
      var hx = px - (dx / dist) * tl, hy = py - (dy / dist) * tl;

      ctx.save();
      var g = ctx.createLinearGradient(hx, hy, px, py);
      g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(0.6, 'rgba(120,200,255,0)');
      g.addColorStop(0.85, 'rgba(160,220,255,0.25)');
      g.addColorStop(1, 'rgba(225,242,255,0.85)');
      ctx.strokeStyle = g;
      ctx.lineCap = 'round';
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(hx, hy);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 9;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(ang);
      var f = 7 + 5 * Math.sin(t * 0.05 + s.t * 0.1);
      var flame = ctx.createLinearGradient(-3, 0, -3 - f, 0);
      flame.addColorStop(0, 'rgba(255,220,140,1)');
      flame.addColorStop(1, 'rgba(255,120,40,0)');
      ctx.fillStyle = flame;
      ctx.beginPath();
      ctx.moveTo(-2, -3.5);
      ctx.lineTo(-3 - f, 0);
      ctx.lineTo(-2, 3.5);
      ctx.closePath();
      ctx.fill();

      var hull = ctx.createLinearGradient(0, -6, 0, 6);
      hull.addColorStop(0, '#eaf6ff');
      hull.addColorStop(0.5, '#7fb8e8');
      hull.addColorStop(1, '#2a4a78');
      ctx.fillStyle = hull;
      ctx.shadowColor = 'rgba(140,210,255,0.9)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(-7, 6.5);
      ctx.lineTo(-3.5, 0);
      ctx.lineTo(-7, -6.5);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.fillRect(-4, -1.1, 10, 2.2);
      ctx.restore();

      if (s.label) {
        ctx.save();
        ctx.font = 'bold 10px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.shadowColor = 'rgba(120,190,255,0.9)';
        ctx.shadowBlur = 6;
        ctx.fillText(s.label, px, py - 18);
        ctx.restore();
      }
    }
  }

  function renderAll(t) {
    if (!ctx) return;
    if (!W || !H) {
      W = canvas.width;
      H = canvas.height;
    }
    ctx.setTransform(camera.z, 0, 0, camera.z, W / 2 - camera.x * camera.z, H / 2 - camera.y * camera.z);

    ctx.fillStyle = '#040214';
    ctx.fillRect(0, 0, WO, HO);

    drawSpace(t);
    drawEarth(t);
    drawMars(t);
    drawJupiter(t);
    drawSaturn(t);
    drawOrbit(t);
    drawMoonSurface(t);
    drawColony(t);
    drawAgents(t);
    drawShips(t);

    ctx.globalAlpha = 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  window.WORLD = {
    canvas: canvas,

    init: function (c) {
      canvas = c;
      this.canvas = c;
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      window.addEventListener('resize', this.resize.bind(this));
      this.resize();
      this.resetCam();
    },

    resize: function () {
      if (!canvas) return;
      canvas.width = canvas.clientWidth || canvas.offsetWidth || WO;
      canvas.height = canvas.clientHeight || canvas.offsetHeight || HO;
      W = canvas.width;
      H = canvas.height;
    },

    resetCam: function () {
      if (!W || !H) { W = WO; H = HO; }
      camera.z = Math.min(W / WO, H / HO) * 1.18;
      camera.x = 700;
      camera.y = 700;
    },

    panBy: function (sx, sy) {
      camera.x += sx;
      camera.y += sy;
      if (camera.x < -700) camera.x = -700;
      if (camera.x > WO + 700) camera.x = WO + 700;
      if (camera.y < -700) camera.y = -700;
      if (camera.y > HO + 700) camera.y = HO + 700;
    },

    zoomAt: function (ex, ey, f) {
      var w0 = this.screenToWorld(ex, ey);
      camera.z = clamp(camera.z * (f || 1), 0.25, 6);
      camera.x = w0.x - (ex - W / 2) / camera.z;
      camera.y = w0.y - (ey - H / 2) / camera.z;
    },

    zoomFactor: function () { return camera.z; },

    render: function (t) {
      renderAll(t);
    },

    screenToWorld: function (ex, ey) {
      return {
        x: camera.x + (ex - W / 2) / camera.z,
        y: camera.y + (ey - H / 2) / camera.z
      };
    },

    hitAgent: function (ex, ey) {
      if (!window.SIM) return null;
      var candidates = [], i;
      var now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : 0;
      if (SIM.agents) {
        for (i = 0; i < SIM.agents.length; i++) {
          var a = SIM.agents[i];
          if (!a || a.state === 'fly') continue;
          var p = null;
          if (a.planet === 'moon') p = { x: a.x, y: a.y };
          else if (P[a.planet]) p = planetAgentPos(a, P[a.planet], now);
          if (p) candidates.push({ a: a, pos: p });
        }
      }
      if (SIM.ships) {
        for (i = 0; i < SIM.ships.length; i++) {
          var s = SIM.ships[i];
          var st = objPos(s.from), en = objPos(s.to);
          var av = s.dur > 0 ? s.t / s.dur : 1;
          av = Math.max(0, Math.min(1, av));
          var px = st.x + (en.x - st.x) * av;
          var py = st.y + (en.y - st.y) * av;
          if (s.crew) {
            for (var j = 0; j < s.crew.length; j++) {
              candidates.push({ a: s.crew[j], pos: { x: px, y: py } });
            }
          }
        }
      }
      var best = null, bd = 1e9;
      for (i = 0; i < candidates.length; i++) {
        var c = candidates[i];
        var sx = c.pos.x * camera.z + (W / 2 - camera.x * camera.z);
        var sy = c.pos.y * camera.z + (H / 2 - camera.y * camera.z);
        var d = Math.sqrt((sx - ex) * (sx - ex) + (sy - ey) * (sy - ey));
        if (d < bd) { bd = d; best = c; }
      }
      return (best && bd <= 52) ? best.a : null;
    }
  };
})();