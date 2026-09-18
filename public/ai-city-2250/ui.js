/* ============================================================ */
/*   LUNA CITY 2250 - HOLOGRAPHIC UI ENGINE                      */
/*   Self-contained canvas HUD. No DOM dashboard, no modules.     */
/*   ASCII-safe source. Drawn on top of the game canvas.          */
/* ============================================================ */
(function () {
  'use strict';

  /* ---- public surface (filled below) ---- */
  var UI = {};

  /* ---- runtime refs ---- */
  var canvas = null;
  var ctx = null;
  var W = 1;
  var H = 1;

  /* ---- layout constants ---- */
  var TOPH = 64;       /* top bar height            */
  var MARG = 14;       /* generic margin            */
  var BOT_PAD = 30;    /* bottom clearance          */
  var BTN_H = 60;      /* bottom bar button height  */

  /* ---- palette ---- */
  var CYAN = '#46e0ff';
  var CYAN_D = '#1f8fb0';
  var SLATE = '#8ab8cc';
  var WHITE = '#eaf6ff';
  var GOLD = '#ffd27a';
  var PURPLE = '#b06bff';
  var GREEN = '#5dffa0';
  var RED = '#ff5c5c';
  var PANEL_FILL = 'rgba(8,20,36,0.74)';
  var PANEL_FILL2 = 'rgba(12,30,50,0.82)';

  /* ---- internal state ---- */
  var state = {
    tab: 'team',          /* 'team' | 'net'            */
    expanded: {},         /* division idx -> bool      */
    scroll: 0,            /* team list scroll offset   */
    hover: null,          /* last hit result (glow)    */
    down: null,           /* pressed button id         */
    active: null,         /* selected agent            */
    toasts: [],           /* [{msg,dur,born}]          */
    menu: null            /* floating menu (future)    */
  };

  /* ---- measured rectangles (recomputed in layout) ---- */
  var R = {
    title: { x: 0, y: 0 },
    chips: [],                      /* top bar chips      */
    panel: { x: 0, y: 0, w: 360, h: 0 },
    tabs: { team: { x: 0, y: 0, w: 0, h: 36 }, net: { x: 0, y: 0, w: 0, h: 36 } },
    list: { x: 0, y: 0, w: 0, h: 0 },   /* scroll viewport  */
    buttons: [],                    /* bottom bar buttons */
    card: null,                     /* detail card rect   */
    close: { x: 0, y: 0, w: 0, h: 0 },
    toastY: 0
  };

  /* ---- cached gradients, rebuilt in layout ---- */
  var grads = {};

  /* ---- fonts ---- */
  var FONT_UI = 'Segoe UI';
  var FONT_MONO = 'Consolas';
  function F(s, wgt) { return (wgt || '400') + ' ' + (s || 12) + 'px ' + FONT_UI; }
  function FM(s) { return (s || 11) + 'px ' + FONT_MONO; }

  /* ============================================================ */
  /*  small helpers                                               */
  /* ============================================================ */

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function isNum(n) { return typeof n === 'number' && isFinite(n); }
  function num(v) { return isNum(v) ? v : 0; }
  function sim() { return window.SIM || {}; }
  function roster() { return window.ROSTER || []; }

  function ns(n) { return n.toLocaleString('de-DE'); }

  function pad(n, l) { n = String(n); while (n.length < l) n = '0' + n; return n; }

  /* hex -> rgba() string (accepts #rrggbb or array rgb) */
  function rgba(hex, a) {
    var r = 0, g = 0, b = 0;
    if (typeof hex === 'string' && hex.charAt(0) === '#') {
      var n = parseInt(hex.slice(1), 16);
      r = (n >> 16) & 255; g = (n >> 8) & 255; b = n & 255;
    } else if (Object.prototype.toString.call(hex) === '[object Array]' && hex.length >= 3) {
      r = hex[0]; g = hex[1]; b = hex[2];
    }
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  /* rounded rect path */
  function rrect(x, y, w, h, r) {
    if (w <= 0 || h <= 0) { ctx.beginPath(); ctx.rect(x, y, 0, 0); return; }
    r = Math.max(0, Math.min(r, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function cacheGrad(key, make) {
    var g = grads[key];
    if (!g) { g = make(); grads[key] = g; }
    return g;
  }

  /* letter-spaced text. anchor: l/c/r. returns width. */
  function charW(c) { return ctx.measureText(c).width; }
  function spacedW(str, gap) {
    var w = 0;
    for (var i = 0; i < str.length; i++) w += charW(str.charAt(i)) + (gap || 0);
    return w;
  }
  function drawSpaced(str, x, anchor, y, gap, color, font) {
    var w = spacedW(str, gap || 0);
    var sx = x - (anchor === 'c' ? w / 2 : (anchor === 'r' ? w : 0));
    if (color) ctx.fillStyle = color;
    if (font) ctx.font = font;
    for (var i = 0; i < str.length; i++) {
      var ch = str.charAt(i);
      ctx.fillText(ch, sx, y);
      sx += charW(ch) + (gap || 0);
    }
    return w;
  }

  /* crop a string to fit a max pixel width (ellipsis) */
  function fitText(str, maxW) {
    if (ctx.measureText(str).width <= maxW) return str;
    var out = '';
    for (var i = 0; i < str.length; i++) {
      var t = out + str.charAt(i);
      if (ctx.measureText(t + '...').width > maxW) break;
      out = t;
    }
    return out + '...';
  }

  /* ---------- data lookups ---------- */

  function buildByName() {
    var m = {};
    var ag = sim().agents;
    if (ag) {
      for (var i = 0; i < ag.length; i++) {
        var a = ag[i];
        if (a && a.name) m[String(a.name).toLowerCase()] = a;
      }
    }
    return m;
  }

  function agentColor(a, fb) {
    if (!a) return fb || CYAN;
    var s = sim();
    if (isNum(a.team) && s.COLORS && s.COLORS[a.team]) return s.COLORS[a.team];
    if (typeof a.color === 'string' && a.color) return a.color;
    if (typeof a.col === 'string' && a.col) return a.col;
    return fb || CYAN;
  }

  var PLANETS = [
    { id: 'mond',  tag: 'MO', color: '#9aa8bd' },
    { id: 'erde',  tag: 'ER', color: '#4fa8ff' },
    { id: 'mars',  tag: 'MA', color: '#ff6b4a' },
    { id: 'orbit', tag: 'OR', color: '#ffb84e' }
  ];

  function normP(p) { return p ? String(p).toLowerCase().replace(/['"\s_]/g, '') : ''; }
  function planetKey(p) {
    var n = normP(p); if (!n) return '';
    if (n.indexOf('mond') >= 0 || n.indexOf('moon') >= 0) return 'mond';
    if (n.indexOf('erde') >= 0 || n.indexOf('earth') >= 0) return 'erde';
    if (n.indexOf('mars') >= 0) return 'mars';
    if (n.indexOf('orbit') >= 0 || n.indexOf('umlauf') >= 0 || n.indexOf('station') >= 0 || n.indexOf('shuttle') >= 0) return 'orbit';
    return '';
  }
  function planetInfo(p) {
    var k = planetKey(p);
    for (var i = 0; i < PLANETS.length; i++) if (PLANETS[i].id === k) return PLANETS[i];
    return null;
  }
  function planetTag(p) {
    var pi = planetInfo(p);
    return pi ? pi.tag : '--';
  }
  function planetColor(p) {
    var pi = planetInfo(p);
    return pi ? pi.color : SLATE;
  }

  function planetPop(key) {
    var c = 0;
    var ag = sim().agents;
    if (ag) {
      for (var i = 0; i < ag.length; i++) {
        if (ag[i] && planetKey(ag[i].planet) === key) c++;
      }
    }
    return c;
  }

  /* population: prefer agent counts (contract has no pop fields) */
  function chipValues() {
    var e = sim().eco || {};
    return {
      eroes: num(e.total),
      proj: num(e.proj),
      lvl: num(e.lvl),
      mond: planetPop('mond'),
      erde: planetPop('erde'),
      mars: planetPop('mars'),
      orbit: planetPop('orbit')
    };
  }

  function stateColor(st, fb) {
    if (!st) return fb || SLATE;
    var s = String(st).toLowerCase();
    if (s.indexOf('work') >= 0 || s.indexOf('build') >= 0 || s.indexOf('research') >= 0 || s.indexOf('active') >= 0 || s.indexOf('train') >= 0) return GREEN;
    if (s.indexOf('idle') >= 0 || s.indexOf('standby') >= 0 || s.indexOf('wait') >= 0 || s.indexOf('ready') >= 0) return SLATE;
    if (s.indexOf('fault') >= 0 || s.indexOf('error') >= 0 || s.indexOf('critical') >= 0 || s.indexOf('down') >= 0) return RED;
    if (s.indexOf('move') >= 0 || s.indexOf('travel') >= 0 || s.indexOf('launch') >= 0) return GOLD;
    return fb || CYAN;
  }

  /* ============================================================ */
  /*  layout                                                      */
  /* ============================================================ */

  function layout() {
    W = (canvas && canvas.width)  || window.innerWidth  || 800;
    H = (canvas && canvas.height) || window.innerHeight || 600;
    if (W < 2) W = 2;
    if (H < 2) H = 2;

    grads = {};

    var cy = TOPH / 2;

    R.title.x = 70;
    R.title.y = cy;

    /* ---- right panel ---- */
    R.panel.w = Math.round(Math.min(360, Math.max(200, W * 0.36)));
    R.panel.x = W - R.panel.w - MARG;
    R.panel.y = TOPH + MARG;
    var bottomRes = BTN_H + BOT_PAD + MARG;
    R.panel.h = Math.max(120, H - R.panel.y - bottomRes);
    R.panel.h = Math.min(R.panel.h, H - R.panel.y - 24);

    /* tabs */
    var tw = (R.panel.w - 20) / 2;
    var ty = R.panel.y + 12;
    R.tabs.team = { x: R.panel.x + 10, y: ty, w: tw, h: 32 };
    R.tabs.net = { x: R.panel.x + 10 + tw, y: ty, w: tw, h: 32 };

    /* scroll viewport (inside panel, under tabs) */
    R.list = {
      x: R.panel.x + 10,
      y: R.panel.y + 12 + 32 + 10,
      w: R.panel.w - 20,
      h: R.panel.h - (12 + 32 + 10) - 12
    };
    if (R.list.h < 10) R.list.h = 10;

    /* ---- top bar chips ---- */
    var startX = R.title.x + Math.min(235, Math.max(120, W * 0.24)) + 10;
    var endX = R.panel.x - 10;
    var span = endX - startX;
    var nChips = 7;
    R.chips = [];
    if (span >= 90) {
      var chipH2 = 42;
      var gap2 = 6;
      var chipW2 = Math.floor((span - gap2 * (nChips - 1)) / nChips);
      if (chipW2 < 48) {
        chipW2 = Math.max(34, chipW2);
        gap2 = 3;
      }
      var chipY = cy - chipH2 / 2;
      var chipDefs = [
        { id: 'eroes', label: 'Eroes', gold: true },
        { id: 'proj',  label: 'Projekte' },
        { id: 'lvl',   label: 'Level' },
        { id: 'mond',  label: 'Monde' },
        { id: 'erde',  label: 'Erde' },
        { id: 'mars',  label: 'Mars' },
        { id: 'orbit', label: 'Orbit' }
      ];
      var x2 = startX;
      var small = chipW2 < 56;
      for (var i = 0; i < nChips; i++) {
        R.chips.push({
          id: chipDefs[i].id,
          label: chipDefs[i].label,
          gold: !!chipDefs[i].gold,
          x: x2, y: chipY, w: chipW2, h: chipH2,
          small: small
        });
        x2 += chipW2 + gap2;
      }
    }

    /* ---- bottom bar buttons (4) ---- */
    var ids = ['pause', 'mission', 'ausbau', 'reset'];
    var nB = ids.length;
    var bGap = 14;
    var bw = Math.min(150, Math.max(96, Math.round((W - bGap * (nB - 1) - 48) / nB)));
    var totalW = bw * nB + bGap * (nB - 1);
    var bx0 = Math.round(W / 2 - totalW / 2);
    var by0 = H - BOT_PAD - BTN_H;
    R.buttons = [];
    for (var j = 0; j < nB; j++) {
      R.buttons.push({ id: ids[j], x: bx0 + (bw + bGap) * j, y: by0, w: bw, h: BTN_H });
    }

    /* ---- detail card (if active) ---- */
    R.close = { x: 0, y: 0, w: 0, h: 0 };
    if (state.active) {
      var cw = 264;
      var topRow = 40;
      var rowH = 23;
      var nRows = 7;
      var ch2 = 20 + topRow + nRows * rowH + 8;
      R.card = { x: 16, y: TOPH + MARG, w: cw, h: ch2 };
      R.close = { x: R.card.x + R.card.w - 26, y: R.card.y + 6, w: 20, h: 20 };
    } else {
      R.card = null;
    }

    /* non-layout derived numbers */
    R.toastY = H - BOT_PAD - BTN_H - 34;
  }

  /* ============================================================ */
  /*  draw: primitives                                            */
  /* ============================================================ */

  function drawPanelPlate(x, y, w, h, flicker) {
    var fl = 0.9 + 0.1 * flicker;
    var g = cacheGrad('panel:' + w + 'x' + h, function () {
      var gg = ctx.createLinearGradient(0, y, 0, y + h);
      gg.addColorStop(0, 'rgba(14,34,56,0.82)');
      gg.addColorStop(1, 'rgba(6,16,30,0.80)');
      return gg;
    });
    ctx.globalAlpha = fl;
    rrect(x, y, w, h, 10);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.globalAlpha = 0.55 * fl;
    ctx.strokeStyle = CYAN;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function drawCornerBrackets(x, y, w, h, len, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha == null ? 0.8 : alpha;
    ctx.strokeStyle = color || CYAN;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    /* TL */
    ctx.moveTo(x, y + len); ctx.lineTo(x, y); ctx.lineTo(x + len, y);
    /* TR */
    ctx.moveTo(x + w - len, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + len);
    /* BL */
    ctx.moveTo(x, y + h - len); ctx.lineTo(x, y + h); ctx.lineTo(x + len, y + h);
    /* BR */
    ctx.moveTo(x + w - len, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y + h - len);
    ctx.stroke();
    ctx.restore();
  }

  function drawScanlineBorder(p) {
    /* animated bright line along inner left edge */
    var t = p;
    var py = R.panel.y + ((t * 0.03) % R.panel.h);
    ctx.save();
    rrect(R.panel.x, R.panel.y, R.panel.w, R.panel.h, 10);
    ctx.clip();
    ctx.fillStyle = 'rgba(70,224,255,0.25)';
    ctx.fillRect(R.panel.x + 2, py, R.panel.w - 4, 2);
    /* soft vertical sheen at left */
    var g = cacheGrad('sheen', function () {
      var gg = ctx.createLinearGradient(R.panel.x, 0, R.panel.x + 30, 0);
      gg.addColorStop(0, 'rgba(70,224,255,0.10)');
      gg.addColorStop(1, 'rgba(0,0,0,0)');
      return gg;
    });
    ctx.fillStyle = g;
    ctx.fillRect(R.panel.x, R.panel.y, 30, R.panel.h);
    ctx.restore();
  }

  /* tiny planet glyph: colored dot + optional ring */
  function drawPlanetGlyph(x, y, r, color, ring) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    if (ring) {
      ctx.save();
      ctx.strokeStyle = rgba(color, 0.8);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(x, y, r + 3, r * 0.6, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  /* ============================================================ */
  /*  draw: top bar                                               */
  /* ============================================================ */

  function drawTopBar(vals) {
    var cy = TOPH / 2;

    /* base plate */
    var g = cacheGrad('topbar', function () {
      var gg = ctx.createLinearGradient(0, 0, 0, TOPH);
      gg.addColorStop(0, 'rgba(8,22,40,0.90)');
      gg.addColorStop(0.5, 'rgba(10,26,46,0.78)');
      gg.addColorStop(1, 'rgba(6,16,30,0.92)');
      return gg;
    });
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, TOPH);
    ctx.fillStyle = 'rgba(70,224,255,0.14)';
    ctx.fillRect(0, TOPH - 1, W, 1);

    /* emblem */
    var ex = 40, er = 21;
    ctx.save();
    ctx.fillStyle = 'rgba(10,24,42,0.9)';
    ctx.beginPath(); ctx.arc(ex, cy, er, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = CYAN; ctx.lineWidth = 1.5; ctx.stroke();
    /* inner orbit ring + earth dot */
    ctx.strokeStyle = 'rgba(70,224,255,0.55)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(ex, cy, er - 3, er - 8, -0.5, 0, Math.PI * 2); ctx.stroke();
    drawPlanetGlyph(ex - 4, cy + 2, 5, '#4fa8ff', true);
    drawPlanetGlyph(ex + 6, cy - 4, 2.4, '#9aa8bd', false);
    ctx.restore();

    /* title + subtitle */
    var tg = cacheGrad('titleG', function () {
      var gg = ctx.createLinearGradient(R.title.x, 0, R.title.x + 220, 0);
      gg.addColorStop(0, '#5fe8ff');
      gg.addColorStop(0.5, '#eefcff');
      gg.addColorStop(1, '#5fe8ff');
      return gg;
    });
    ctx.font = F(20, '700');
    ctx.fillStyle = tg;
    ctx.textBaseline = 'middle';
    ctx.fillText('LUNA CITY 2250', R.title.x, cy - 9);

    ctx.font = F(9.5, '400');
    ctx.fillStyle = 'rgba(138,184,204,0.9)';
    drawSpaced('RAAPPERSWIL-JONA - SOLARSYSTEM', R.title.x, 'l', cy + 14, 1.2);

    /* chips */
    var v = vals;
    for (var i = 0; i < R.chips.length; i++) {
      var cp = R.chips[i];
      var val = v[cp.id];
      cp.val = val;

      rrect(cp.x, cp.y, cp.w, cp.h, 7);
      ctx.fillStyle = 'rgba(10,26,46,0.94)';
      ctx.fill();
      if (state.hover && state.hover.t === 'chip' && state.hover.id === cp.id) {
        ctx.strokeStyle = CYAN; ctx.lineWidth = 1.4;
      } else {
        ctx.strokeStyle = 'rgba(70,224,255,0.45)'; ctx.lineWidth = 1;
      }
      ctx.stroke();

      /* inner top glow line */
      ctx.fillStyle = 'rgba(70,224,255,0.18)';
      ctx.fillRect(cp.x + 3, cp.y + 1, cp.w - 6, 1);

      /* label */
      var ls = cp.small ? 5 : 8;
      if (cp.w > 44) {
        ctx.textBaseline = 'alphabetic';
        var labelFont = cp.small ? 7.5 : 9;
        ctx.font = F(labelFont, '700');
        ctx.fillStyle = 'rgba(138,184,204,0.92)';
        drawSpaced(cp.label.toUpperCase(), cp.x + cp.w / 2, 'c', cp.y + 15, 0.8);
      }

      /* value */
      ctx.textBaseline = 'middle';
      var vf = cp.small ? Math.max(10, cp.w / 4.6) : 17;
      ctx.font = F(vf + 2, '700', 'Consolas');
      ctx.fillStyle = cp.gold ? GOLD : WHITE;
      ctx.textAlign = 'center';
      var vtxt = ns(cp.val);
      var vx = cp.x + cp.w / 2;
      var vy = cp.y + cp.h - (cp.small ? 12 : 13);
      if (ctx.measureText(vtxt).width > cp.w - 6) {
        vtxt = fitText(vtxt, cp.w - 8);
      }
      if (cp.gold) {
        ctx.save();
        ctx.shadowColor = 'rgba(255,210,122,0.7)';
        ctx.shadowBlur = 8;
        ctx.fillText(vtxt, vx, vy);
        ctx.restore();
      } else {
        ctx.fillText(vtxt, vx, vy);
      }
      ctx.textAlign = 'left';
    }
  }

  /* ============================================================ */
  /*  draw: right panel (team / net)                              */
  /* ============================================================ */

  function headerPlate() {
    drawPanelPlate(R.panel.x, R.panel.y, R.panel.w, R.panel.h, panelFlicker());
    drawCornerBrackets(R.panel.x + 3, R.panel.y + 3, R.panel.w - 6, R.panel.h - 6, 8, CYAN, 0.55);
    drawScanlineBorder(perf());
  }

  function panelFlicker() {
    return 0.5 + 0.5 * Math.sin(perf() * 0.0035);
  }

  function perf() {
    return (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  }

  function drawTabs() {
    var active = state.tab;
    var tabs = [{ id: 'team', label: 'TEAM' }, { id: 'net', label: 'NET' }];
    for (var i = 0; i < tabs.length; i++) {
      var tb = R.tabs[tabs[i].id];
      var on = active === tabs[i].id;
      var hv = state.hover && state.hover.t === 'tab' && state.hover.id === tabs[i].id;
      rrect(tb.x, tb.y, tb.w, tb.h, 6);
      ctx.fillStyle = on ? 'rgba(70,224,255,0.16)' : 'rgba(8,20,38,0.55)';
      ctx.fill();
      ctx.strokeStyle = on ? rgba(CYAN, 0.8) : 'rgba(70,224,255,0.28)';
      ctx.lineWidth = on ? 1.2 : 1;
      ctx.stroke();
      if (on) {
        ctx.fillStyle = 'rgba(70,224,255,0.25)';
        ctx.fillRect(tb.x + 3, tb.y + tb.h - 2, tb.w - 6, 2);
      }
      if (hv) {
        ctx.fillStyle = 'rgba(70,224,255,0.10)';
        rrect(tb.x, tb.y, tb.w, tb.h, 6); ctx.fill();
      }
      ctx.font = F(11, '700');
      ctx.textBaseline = 'middle';
      ctx.fillStyle = on ? '#eafcff' : 'rgba(138,184,204,0.85)';
      drawSpaced(tabs[i].label, tb.x + tb.w / 2, 'c', tb.y + tb.h / 2, 1.4);
    }
  }

  /* build the scrollable team rows (document coords, pre-scroll) */
  function buildRows() {
    var divs = roster();
    var list = [];
    var r = R.list;
    var y = r.y;
    for (var di = 0; di < divs.length; di++) {
      var d = divs[di];
      var hh = 28;
      list.push({ type: 'div', di: di, y: y, h: hh });
      y += hh;
      if (state.expanded[di]) {
        var mem = d && d.members ? d.members : [];
        for (var mi = 0; mi < mem.length; mi++) {
          var rh = 25;
          list.push({ type: 'row', di: di, mi: mi, agent: findAgent(mem[mi].name), y: y, h: rh });
          y += rh;
        }
      }
    }
    return { entries: list, total: y - r.y };
  }

  function findAgent(name) {
    var m = state.byName || {};
    var a = name ? m[String(name).toLowerCase()] : null;
    return a || null;
  }

  function ensureMap() {
    var ag = sim().agents;
    var l = ag ? ag.length : -1;
    if (!state.mapAgents || state.mapAgents !== ag || state.mapLen !== l) {
      state.byName = buildByName();
      state.mapAgents = ag;
      state.mapLen = l;
    }
  }

  function drawTeam() {
    ensureMap();
    var r = R.list;
    var br = buildRows();

    /* clamp scroll */
    var max = br.total - r.h;
    if (max < 0) max = 0;
    state.scroll = clamp(state.scroll, 0, max);
    state.scrollMax = max;

    ctx.save();
    rrect(r.x, r.y, r.w, r.h, 6);
    ctx.clip();

    var off = state.scroll;
    ctx.textBaseline = 'middle';
    for (var i = 0; i < br.entries.length; i++) {
      var e = br.entries[i];
      var sy = e.y - off;
      if (sy + e.h < r.y) continue;
      if (sy > r.y + r.h) break;
      if (e.type === 'div') {
        drawDivHeader(e, sy);
      } else {
        drawMemberRow(e, sy);
      }
    }

    /* scrollbar */
    if (max > 0) {
      var tb = r.h / br.total;
      var tY = (state.scroll / max) * (r.h - tb * r.h) + r.y;
      ctx.fillStyle = 'rgba(70,224,255,0.35)';
      rrect(r.x + r.w - 3, tY, 2, Math.max(18, tb * r.h - 4), 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawDivHeader(e, sy) {
    var d = roster()[e.di];
    var col = (d && d.color) || SLATE;
    var isOpen = !!state.expanded[e.di];
    var hv = state.hover && state.hover.t === 'div' && state.hover.di === e.di;
    var x = R.list.x, y = sy, w = R.list.w, h = e.h;

    rrect(x, y, w, h, 5);
    ctx.fillStyle = hv ? 'rgba(70,224,255,0.12)' : 'rgba(70,224,255,0.055)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(70,224,255,0.22)';
    ctx.lineWidth = 1;
    ctx.stroke();

    /* color tab */
    ctx.fillStyle = col;
    ctx.fillRect(x + 6, y + 5, 3, h - 10);

    ctx.font = F(11, '700');
    ctx.fillStyle = WHITE;
    var name = d ? d.name : '';
    name = fitText(name, w - 60);
    ctx.fillText(name, x + 16, y + h / 2 + 0.5);

    /* membership count */
    var cnt = (d && d.members) ? d.members.length : 0;
    ctx.font = FM(9);
    ctx.fillStyle = 'rgba(138,184,204,0.9)';
    ctx.textAlign = 'right';
    ctx.fillText(String(cnt), x + w - 30, y + h / 2);
    ctx.textAlign = 'left';

    /* caret */
    var cxp = x + w - 16;
    var cyp = y + h / 2;
    ctx.fillStyle = 'rgba(138,184,204,0.95)';
    ctx.beginPath();
    if (isOpen) {
      ctx.moveTo(cxp - 4, cyp - 2);
      ctx.lineTo(cxp + 4, cyp - 2);
      ctx.lineTo(cxp, cyp + 3);
    } else {
      ctx.moveTo(cxp - 2, cyp - 4);
      ctx.lineTo(cxp - 2, cyp + 4);
      ctx.lineTo(cxp + 3, cyp);
    }
    ctx.closePath();
    ctx.fill();
  }

  function drawMemberRow(e, sy) {
    var d = roster()[e.di];
    var mem = (d && d.members) ? d.members[e.mi] : null;
    if (!mem) return;
    var a = e.agent;
    var x = R.list.x, y = sy, w = R.list.w, h = e.h;
    var hv = state.hover && state.hover.t === 'row' && state.hover.di === e.di && state.hover.mi === e.mi;

    rrect(x, y, w, h, 4);
    ctx.fillStyle = hv ? 'rgba(70,224,255,0.14)' : 'rgba(255,255,255,0.02)';
    ctx.fill();

    /* status dot (agent state color, else division color) */
    var dotCol = stateColor(a && a.state, (d && d.color) || SLATE);
    drawPlanetGlyph(x + 10, y + h / 2, 2.6, dotCol, false);

    /* name */
    ctx.font = F(10.5, a ? '600' : '400');
    ctx.fillStyle = a ? 'rgba(234,246,255,0.98)' : 'rgba(234,246,255,0.55)';
    var nm = mem.name;
    nm = fitText(nm, w * 0.38);
    ctx.fillText(nm, x + 20, y + h / 2 + 0.5);

    /* platform short */
    var pl = (mem.platform || 'AI').split(/\s+/)[0];
    pl = pl.replace(/[^A-Za-z0-9]/g, '');
    if (pl.length > 3) pl = pl.slice(0, 3);
    pl = pl.toUpperCase();
    ctx.font = FM(8.5);
    ctx.fillStyle = 'rgba(138,184,204,0.75)';
    ctx.fillText(pl, x + 20 + w * 0.40, y + h / 2);

    /* planet glyph + tag */
    var aP = a ? a.planet : (mem.planet || '');
    drawPlanetGlyph(x + w - 48, y + h / 2, 3.2, planetColor(aP), planetKey(aP) === 'orbit');
    ctx.fillStyle = 'rgba(138,184,204,0.9)';
    ctx.textAlign = 'left';
    ctx.fillText(planetTag(aP), x + w - 41, y + h / 2);

    /* level */
    var lvl = a && isNum(a.level) ? a.level : '--';
    ctx.font = FM(9);
    ctx.fillStyle = a ? 'rgba(255,210,122,0.95)' : 'rgba(138,184,204,0.55)';
    ctx.textAlign = 'right';
    ctx.fillText(String(lvl), x + w - 6, y + h / 2);
    ctx.textAlign = 'left';
  }

  function drawNet() {
    ensureMap();
    var lines = sim().lines || [];
    var shown = lines.slice(Math.max(0, lines.length - 16));
    var x = R.list.x + 4;
    var y = R.list.y + 4;
    ctx.save();
    rrect(R.list.x, R.list.y, R.list.w, R.list.h, 6);
    ctx.clip();
    ctx.font = FM(10.5);
    ctx.textBaseline = 'middle';
    var iy = y;
    for (var i = shown.length - 1; i >= 0; i--) {
      if (iy > R.list.y + R.list.h - 4) break;
      var l = shown[i];
      if (!l) { iy += 18; continue; }
      var aName = l.a ? String(l.a) : 'SYS';
      var agA = state.byName[aName.toLowerCase()];
      var col = agA ? agentColor(agA, CYAN)
               : (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(aName)) ? aName
               : (aName === 'SYS') ? CYAN : SLATE;
      /* colored prefix */
      ctx.fillStyle = col;
      ctx.font = FM(10.5);
      var px = x;
      ctx.fillText(aName, px, iy);
      px += ctx.measureText(aName).width + 6;
      /* message */
      var m = fitText(l.m || '', R.list.w - (px - x) - 8);
      ctx.fillStyle = 'rgba(234,246,255,0.86)';
      ctx.fillText(m, px, iy);
      iy += 18;
    }
    ctx.restore();
  }

  function drawPanel() {
    headerPlate();
    drawTabs();
    if (state.tab === 'team') drawTeam();
    else drawNet();
  }

  /* ============================================================ */
  /*  draw: detail card (selected agent)                          */
  /* ============================================================ */

  function drawCard() {
    var a = state.active;
    if (!a || !R.card) return;
    var c = R.card;
    var fl = panelFlicker();
    ctx.save();
    ctx.globalAlpha = 0.94 + 0.06 * fl;
    rrect(c.x, c.y, c.w, c.h, 9);
    ctx.fillStyle = PANEL_FILL;
    ctx.fill();
    ctx.strokeStyle = rgba(CYAN, 0.85);
    ctx.lineWidth = 1.4;
    ctx.stroke();
    /* glow border pass */
    ctx.save();
    ctx.shadowColor = rgba(CYAN, 0.6);
    ctx.shadowBlur = 14;
    ctx.strokeStyle = rgba(CYAN, 0.35);
    ctx.lineWidth = 1;
    rrect(c.x + 0.5, c.y + 0.5, c.w - 1, c.h - 1, 9);
    ctx.stroke();
    ctx.restore();

    drawCornerBrackets(c.x + 4, c.y + 4, c.w - 8, c.h - 8, 10, CYAN, 0.9);

    /* name */
    var nx = c.x + 16;
    var ny = c.y + 24;
    ctx.font = F(17, '700');
    ctx.fillStyle = '#67e6ff';
    ctx.textBaseline = 'middle';
    ctx.fillText(fitText(a.name || 'AGENT', c.w - 70), nx, ny);

    /* close x */
    var cl = R.close;
    var cx2 = cl.x + cl.w / 2, cy2 = cl.y + cl.h / 2;
    var hvc = state.hover && state.hover.t === 'close';
    rrect(cl.x, cl.y, cl.w, cl.h, 4);
    ctx.fillStyle = hvc ? 'rgba(255,92,92,0.22)' : 'rgba(8,20,38,0.6)';
    ctx.fill();
    ctx.strokeStyle = hvc ? rgba(RED, 0.9) : 'rgba(70,224,255,0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.strokeStyle = hvc ? RED : CYAN;
    ctx.beginPath();
    ctx.moveTo(cx2 - 4, cy2 - 4); ctx.lineTo(cx2 + 4, cy2 + 4);
    ctx.moveTo(cx2 + 4, cy2 - 4); ctx.lineTo(cx2 - 4, cy2 + 4);
    ctx.stroke();

    /* rows */
    var rows = [
      ['TEAM', a.teamName || String(a.team != null ? a.team : '')],
      ['PLATFORM', a.platform || ''],
      ['PLANET', a.planet || ''],
      ['LEVEL', isNum(a.level) ? String(a.level) : '--'],
      ['PROJEKTE', isNum(a.proj) ? ns(a.proj) : (a.proj || '--')],
      ['EROES QD', isNum(a.rev) ? ns(a.rev) : (a.rev || '0')],
      ['STATUS', a.state || 'ACTIV']
    ];
    var ry = c.y + 24 + 22;
    for (var i = 0; i < rows.length; i++) {
      var k = rows[i][0];
      var val = rows[i][1];
      var yy = ry + i * 22 + 8;
      ctx.font = F(9, '700');
      ctx.fillStyle = 'rgba(138,184,204,0.85)';
      drawSpaced(k, c.x + 16, 'l', yy, 0.8);
      ctx.font = F(11.5, '600');
      ctx.fillStyle = (k === 'EROES QD') ? GOLD : 'rgba(234,246,255,0.96)';
      ctx.fillText(fitText(String(val), c.w - 40 - 90), c.x + 16 + 96, yy);
      /* row guide */
      ctx.strokeStyle = 'rgba(70,224,255,0.10)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(c.x + 14, yy + 9);
      ctx.lineTo(c.x + c.w - 14, yy + 9);
      ctx.stroke();
    }
    ctx.restore();
  }

  /* ============================================================ */
  /*  draw: bottom bar buttons + status lines + toasts + FX       */
  /* ============================================================ */

  function drawPillBTN(b, t) {
    var hover = state.hover && state.hover.t === 'btn' && state.hover.id === b.id;
    var down = state.down === b.id;
    var x = b.x, y = b.y, w = b.w, h = b.h;
    if (down) { y += 2; h -= 2; }

    var base = CYAN;
    var glow = CYAN;
    var accent = false;
    if (b.id === 'mission') { base = PURPLE; glow = PURPLE; accent = true; }
    if (b.id === 'ausbau') { base = '#35d0ff'; }
    if (b.id === 'reset') { base = '#ff8a62'; }

    var g = cacheGrad('btn:' + base + ':' + w + ':' + h, function () {
      var gg = ctx.createLinearGradient(0, y, 0, y + h);
      gg.addColorStop(0, rgba(base, 0.30));
      gg.addColorStop(0.45, rgba(base, 0.10));
      gg.addColorStop(1, rgba(base, 0.04));
      return gg;
    });
    ctx.save();
    ctx.globalAlpha = hover ? 1 : 0.92;
    rrect(x, y, w, h, h / 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = hover ? base : rgba(base, 0.75);
    ctx.lineWidth = hover ? 1.6 : 1.2;
    if (accent) {
      ctx.shadowColor = rgba(PURPLE, hover ? 0.9 : 0.55);
      ctx.shadowBlur = hover ? 22 : 12;
    } else if (hover) {
      ctx.shadowColor = rgba(base, 0.85);
      ctx.shadowBlur = 14;
    }
    ctx.stroke();
    if (hover) {
      ctx.shadowColor = 'rgba(0,0,0,0)';
      ctx.shadowBlur = 0;
      ctx.fillStyle = rgba(base, 0.10);
      rrect(x + 3, y + 3, w - 6, h - 6, (h - 6) / 2);
      ctx.fill();
    }
    ctx.restore();

    /* icon */
    drawIcon(b.id, x + w / 2, y + h / 2 - 8, hover ? base : 'rgba(234,246,255,0.9)');

    /* emissive label */
    ctx.save();
    if (hover) { ctx.shadowColor = rgba(base, 0.9); ctx.shadowBlur = 10; }
    ctx.font = F(10, '700');
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#eaf6ff';
    drawSpaced(b.label, x + w / 2, 'c', y + h - 14, 1.2);
    ctx.restore();
  }

  function drawIcon(id, cx, cy, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (id === 'pause') {
      if (sim().paused) {
        /* play */
        ctx.beginPath();
        ctx.moveTo(cx - 4, cy - 8);
        ctx.lineTo(cx + 7, cy);
        ctx.lineTo(cx - 4, cy + 8);
        ctx.closePath();
        ctx.fill();
      } else {
        /* two bars */
        rrect(cx - 7, cy - 8, 4.5, 16, 1); ctx.fill();
        rrect(cx + 2, cy - 8, 4.5, 16, 1); ctx.fill();
      }
    } else if (id === 'mission') {
      /* target reticle */
      ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, 1.6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx, cy - 12.5); ctx.lineTo(cx, cy - 10.5);
      ctx.moveTo(cx, cy + 10.5); ctx.lineTo(cx, cy + 12.5);
      ctx.moveTo(cx - 12.5, cy); ctx.lineTo(cx - 10.5, cy);
      ctx.moveTo(cx + 10.5, cy); ctx.lineTo(cx + 12.5, cy);
      ctx.stroke();
    } else if (id === 'ausbau') {
      /* build: ascending blocks + up arrow */
      ctx.lineWidth = 1.6;
      rrect(cx - 9, cy + 3, 5, 7, 1); ctx.fill();
      rrect(cx - 2, cy - 2, 5, 12, 1); ctx.fill();
      rrect(cx + 5, cy - 8, 5, 18, 1); ctx.fill();
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 10); ctx.lineTo(cx, cy - 2);
      ctx.moveTo(cx - 3.5, cy - 6); ctx.lineTo(cx, cy - 10); ctx.lineTo(cx + 3.5, cy - 6);
      ctx.stroke();
    } else if (id === 'reset') {
      /* circular arrow */
      ctx.beginPath();
      ctx.arc(cx, cy, 8, -Math.PI * 0.25, Math.PI * 1.45);
      ctx.stroke();
      ctx.lineWidth = 1.4;
      var ax = cx - 8, ay = cy - 8;
      ctx.beginPath();
      ctx.moveTo(ax - 3.5, ay - 3);
      ctx.lineTo(ax + 2, ay - 1);
      ctx.lineTo(ax - 0.5, ay + 4);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawBottom() {
    var labels = { pause: 'PAUSE', mission: 'MISSION', ausbau: 'AUSBAU', reset: 'RESET' };
    if (sim().paused) labels.pause = 'START';
    for (var i = 0; i < R.buttons.length; i++) {
      var b = R.buttons[i];
      b.label = labels[b.id];
      drawPillBTN(b, perf());
    }

    /* bottom-left status */
    ctx.textBaseline = 'middle';
    ctx.font = FM(10);
    var netTxt = 'NETZ AKTIV - AI-KOSTEN $0';
    var blink = 0.35 + 0.65 * Math.abs(Math.sin(perf() * 0.004));
    ctx.fillStyle = rgba(GREEN, blink);
    ctx.fillText(netTxt, 16, H - BOT_PAD / 2 + 2);
    var pxp = 16 + ctx.measureText(netTxt).width + 10;
    drawPlanetGlyph(pxp, H - BOT_PAD / 2 + 2, 2.6, rgba(GREEN, blink), false);

    /* bottom-right version */
    ctx.font = FM(10);
    ctx.fillStyle = 'rgba(138,184,204,0.8)';
    ctx.textAlign = 'right';
    ctx.fillText('v4 - HOLO-UI', W - 16, H - BOT_PAD / 2 + 2);
    ctx.textAlign = 'left';

    drawToasts();
  }

  function drawToasts() {
    var now = perf();
    var T = state.toasts;
    var y = R.toastY;
    for (var i = 0; i < T.length; i++) {
      var t = T[i];
      var age = now - t.born;
      if (age > t.dur) { T.splice(i, 1); i--; continue; }
      var alpha = 1;
      var tail = 500;
      if (age > t.dur - tail) alpha = (t.dur - age) / tail;
      var slide = 1 - Math.min(1, age / 250);
      ctx.save();
      ctx.globalAlpha = alpha * 0.96;
      ctx.font = F(11, '500');
      var tw = clamp(ctx.measureText(t.msg).width + 34, 60, W * 0.7);
      var tx = W / 2 - tw / 2;
      var ty = y - slide * 8;
      rrect(tx, ty, tw, 28, 14);
      ctx.fillStyle = 'rgba(8,22,40,0.90)';
      ctx.fill();
      ctx.strokeStyle = rgba(CYAN, 0.7);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = '#eaf6ff';
      ctx.textBaseline = 'middle';
      ctx.fillText(t.msg, tx + 17, ty + 14);
      ctx.restore();
      y -= 36;
      if (y < 40) break;
    }
  }

  /* ============================================================ */
  /*  full-screen FX (last, in identity transform)                */
  /* ============================================================ */

  function drawFX(t) {
    /* scanlines */
    ctx.fillStyle = 'rgba(0,0,0,0.035)';
    var step = 3;
    for (var y = 0; y < H; y += step) ctx.fillRect(0, y, W, 1);

    /* moving bright band */
    var bandY = ((t * 0.05) % (H + 120)) - 60;
    var bg2 = ctx.createLinearGradient(0, bandY - 40, 0, bandY + 40);
    bg2.addColorStop(0, 'rgba(70,224,255,0)');
    bg2.addColorStop(0.5, 'rgba(70,224,255,0.035)');
    bg2.addColorStop(1, 'rgba(70,224,255,0)');
    ctx.fillStyle = bg2;
    ctx.fillRect(0, bandY - 40, W, 80);

    /* vignette */
    var vg = cacheGrad('vig', function () {
      var gg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.32, W / 2, H / 2, Math.max(W, H) * 0.75);
      gg.addColorStop(0, 'rgba(0,0,0,0)');
      gg.addColorStop(1, 'rgba(0,4,12,0.52)');
      return gg;
    });
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);
  }

  /* ============================================================ */
  /*  hit testing                                                 */
  /* ============================================================ */

  function ptIn(x, y, r) { return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h; }

  function hitTest(ex, ey) {
    if (ex < 0 || ey < 0 || ex >= W || ey >= H) { state.hover = null; return null; }

    var hit = null;

    /* 1. top bar chips (topmost row) */
    for (var i = 0; i < R.chips.length; i++) {
      if (ptIn(ex, ey, R.chips[i])) { hit = { t: 'chip', id: R.chips[i].id }; break; }
    }

    /* 2. panel tabs */
    if (!hit) {
      for (var tk in R.tabs) {
        if (ptIn(ex, ey, R.tabs[tk])) { hit = { t: 'tab', id: tk }; break; }
      }
    }

    /* 3. right panel content: team rows then division headers */
    if (!hit && state.tab === 'team') {
      ensureMap();
      var r = R.list;
      if (ptIn(ex, ey, r)) {
        var br = buildRows();
        for (var k = 0; k < br.entries.length; k++) {
          var e = br.entries[k];
          var sy = e.y - state.scroll;
          if (sy + e.h < r.y) continue;
          if (sy > r.y + r.h) break;
          if (ey >= sy && ey <= sy + e.h) {
            if (e.type === 'div') hit = { t: 'div', di: e.di };
            else hit = { t: 'row', di: e.di, mi: e.mi, agent: e.agent };
            break;
          }
        }
        /* empty panel space -> nothing (clamp click to page? no) */
      }
    }

    /* 4. bottom bar buttons */
    if (!hit) {
      for (var b = 0; b < R.buttons.length; b++) {
        if (ptIn(ex, ey, R.buttons[b])) { hit = { t: 'btn', id: R.buttons[b].id }; break; }
      }
    }

    /* 5. detail card close, then card body */
    if (!hit && state.active && R.card) {
      if (R.close && ptIn(ex, ey, R.close)) hit = { t: 'close' };
      else if (ptIn(ex, ey, R.card)) hit = { t: 'card' };
    }

    /* 6. fallback: empty space closes detail */
    if (!hit) hit = { t: 'clear' };

    state.hover = hit;
    return hit;
  }

  function wheel(ex, ey, dy) {
    if (ptIn(ex, ey, R.panel)) {
      if (state.tab === 'team' && state.scrollMax > 0) {
        var s = (Math.abs(dy) >= 1) ? dy : (dy > 0 ? 1 : -1);
        state.scroll = clamp(state.scroll + s, 0, state.scrollMax);
      }
      return true;
    }
    return false;
  }

  /* ============================================================ */
  /*  pointer plumbing (hover/press feel)                         */
  /* ============================================================ */

  function toCanvasXY(ev) {
    var re = canvas.getBoundingClientRect();
    var x = (ev.clientX - re.left) * (canvas.width / re.width);
    var y = (ev.clientY - re.top) * (canvas.height / re.height);
    return { x: x, y: y };
  }

  function onMove(ev) {
    if (!canvas) return;
    var p = toCanvasXY(ev);
    hitTest(p.x, p.y);
  }
  function onDown(ev) {
    if (!canvas) return;
    var p = toCanvasXY(ev);
    var h = hitTest(p.x, p.y);
    if (h && h.t === 'btn') state.down = h.id;
  }
  function onUp() { state.down = null; }
  function onLeave() { state.hover = null; state.down = null; }

  /* ============================================================ */
  /*  public API                                                  */
  /* ============================================================ */

  UI.canvas = canvas;

  UI.init = function (c) {
    canvas = c || null;
    if (!canvas) return UI;
    ctx = canvas.getContext('2d');
    UI.canvas = canvas;
    layout();
    if (window.addEventListener) {
      window.addEventListener('resize', function () { layout(); }, false);
      canvas.addEventListener('pointermove', onMove, false);
      canvas.addEventListener('pointerdown', onDown, false);
      canvas.addEventListener('pointerup', onUp, false);
      canvas.addEventListener('pointerleave', onLeave, false);
    }
    return UI;
  };

  UI.layout = function () { layout(); return UI; };

  UI.render = function (t) {
    if (!ctx) return UI;
    var now = isNum(t) ? t : perf();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    var vals = chipValues();
    drawTopBar(vals);
    drawPanel();
    if (state.active) drawCard();
    drawBottom();
    drawFX(now);
    return UI;
  };

  UI.hitTest = hitTest;
  UI.pointIn = ptIn;

  UI.wheel = function (ex, ey, dy) {
    if (!isNum(dy) || Math.abs(dy) < 0.0001) return false;
    return !!wheel(ex, ey, dy);
  };

  UI.selectAgent = function (agent) {
    state.active = agent || null;
    layout();
    return UI;
  };

  UI.toast = function (msg, dur) {
    if (!msg) return UI;
    state.toasts.push({ msg: String(msg), born: perf(), dur: isNum(dur) ? dur : 3800 });
    if (state.toasts.length > 4) state.toasts.shift();
    return UI;
  };

  UI.closeDetail = function () { state.active = null; layout(); return UI; };

  /* active agent is exposed for the app */
  Object.defineProperty(UI, 'active', {
    get: function () { return state.active; },
    set: function (a) { state.active = a || null; layout(); }
  });

  /* convenience getters used by the app */
  Object.defineProperty(UI, 'tab', {
    get: function () { return state.tab; },
    set: function (v) { if (v === 'team' || v === 'net') state.tab = v; }
  });

  /* expose toggles so the app can drive tabs if desired */
  UI.setTab = function (t) {
    if (t === 'team' || t === 'net') { state.tab = t; if (t === 'net') state.scroll = 0; }
    return UI;
  };

  UI.toggleDivision = function (di) {
    var divs = roster();
    if (di == null || di < 0 || di >= divs.length) return UI;
    state.expanded[di] = !state.expanded[di];
    state.scroll = clamp(state.scroll, 0, state.scrollMax || 0);
    return UI;
  };

  window.UI = UI;
})();