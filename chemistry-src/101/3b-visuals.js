
/* =========================================================
   HERO: drifting atoms + a giant Bohr atom
   ========================================================= */
function hero() {
  const c = $('#hero-canvas'); const rnd = seeded(7);
  const cols = ['#5ce1e6', '#f4c35a', '#ff6b9a', '#a78bfa', '#6fe3a0', '#dfe9ff', '#ff5d5d'];
  const P = Array.from({ length: 64 }, (_, i) => ({ x: rnd(), y: rnd(), z: .25 + rnd() * .75, vx: (rnd() - .5) * .012, vy: (rnd() - .5) * .012, c: cols[i % cols.length], ph: rnd() * TAU }));
  let mx = -9999, my = -9999;
  const hero = $('.hero');
  hero.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
  hero.addEventListener('pointerleave', () => { mx = my = -9999; });
  animate(c, (dt, t) => {
    const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h);
    const cx = w * .5, cy = h * .47, R = Math.min(w * .46, h * .42);
    // nucleus glow
    glow(ctx, cx, cy, R * .5, '#f4c35a', .55); glow(ctx, cx, cy, R * .18, '#ffdf9a', .9);
    for (let k = 0; k < 3; k++) {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(k * Math.PI / 3 + t * .03);
      ctx.beginPath(); ctx.ellipse(0, 0, R, R * .3, 0, 0, TAU); ctx.strokeStyle = 'rgba(92,225,230,.13)'; ctx.lineWidth = 1; ctx.stroke();
      const a = (reduceMotion ? 1 : t) * (.55 + k * .18) + k * 2.1, ex = Math.cos(a) * R, ey = Math.sin(a) * R * .3;
      // trail
      for (let j = 1; j < 18; j++) { const aj = a - j * .035; ctx.fillStyle = `rgba(92,225,230,${.25 * (1 - j / 18)})`; ctx.beginPath(); ctx.arc(Math.cos(aj) * R, Math.sin(aj) * R * .3, 3 * (1 - j / 22), 0, TAU); ctx.fill(); }
      glow(ctx, ex, ey, 26, '#5ce1e6', 1); ball(ctx, '#5ce1e6', ex, ey, 5);
      ctx.restore();
    }
    // drifting atoms
    for (const p of P) {
      if (!reduceMotion) { p.x += p.vx * dt * p.z; p.y += p.vy * dt * p.z; }
      if (p.x < -.05) p.x = 1.05; if (p.x > 1.05) p.x = -.05; if (p.y < -.05) p.y = 1.05; if (p.y > 1.05) p.y = -.05;
      p.sx = p.x * w; p.sy = p.y * h + Math.sin(t * .6 + p.ph) * 6 * p.z;
      const dx = p.sx - mx, dy = p.sy - my, d2 = dx * dx + dy * dy;
      if (d2 < 22000) { const f = (1 - d2 / 22000) * 40; p.sx += dx / Math.sqrt(d2 + 1) * f; p.sy += dy / Math.sqrt(d2 + 1) * f; }
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
      const a = P[i], b = P[j], dx = a.sx - b.sx, dy = a.sy - b.sy, d = dx * dx + dy * dy;
      if (d < 13000) { ctx.strokeStyle = `rgba(200,210,255,${(1 - d / 13000) * .14 * Math.min(a.z, b.z)})`; ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke(); }
    }
    for (const p of P) { ctx.globalAlpha = .35 + p.z * .6; ball(ctx, p.c, p.sx, p.sy, 2 + p.z * 6); }
    ctx.globalAlpha = 1;
  });
}

/* =========================================================
   ZOOM: melon → nucleus
   ========================================================= */
function zoomLab() {
  const c = $('#zoom-canvas'), range = $('#zoom-range');
  const INFO = [
    ['A watermelon', '≈ 30 cm', 'Macro · Melon level', 'Sweet and cold, and 92% water. Something you can hold in two hands. Let\'s go inside.'],
    ['Its glistening flesh', '≈ 5 mm', 'Macro → Micro', 'Look closely at the flesh and you can see sparkly grains. Each grain is a single giant cell, swollen with juice.'],
    ['A single cell', '≈ 0.5 mm', 'Micro · Microscope level', 'A bag of sugary water inside a tough wall. The red specks are lycopene, the same pigment that makes tomatoes red.'],
    ['The juice', '≈ 3 nanometres', 'Micro · Molecular level', 'Zoom in a million times and the juice becomes a jostling crowd of water molecules with a few sugar rings among them, all in constant motion.'],
    ['One water molecule', '≈ 0.3 nanometres', 'Micro · Molecular level', 'One oxygen and two hydrogens: H₂O. Every drink you have ever had was made of this.'],
    ['One oxygen atom', '≈ 0.1 nanometres', 'Micro · Atomic level', 'A fuzzy cloud of 8 electrons. The atom is almost entirely empty space. That tiny speck in the middle is the nucleus.'],
    ['The nucleus', '≈ 0.000006 nanometres', 'Micro · Subatomic level', '8 protons and 8 neutrons, about 50,000 times smaller across than the atom, yet holding 99.97% of its mass.']
  ];
  const rnd = seeded(42);
  const juice = Array.from({ length: 110 }, () => ({ x: (rnd() - .5) * 6.4, y: (rnd() - .5) * 6.4, a: rnd() * TAU, ph: rnd() * TAU, sp: .5 + rnd() }));
  const sugars = [[-.9, -.6], [1.1, .5], [-.2, 1.2], [1.6, -1.3], [-1.8, 1.0]].map(([x, y], i) => ({ x, y, a: i }));
  const nuc = Array.from({ length: 16 }, (_, i) => { const r = .17 * Math.sqrt(i + .3) * 1.05, a = i * 2.39996; return { x: Math.cos(a) * r, y: Math.sin(a) * r, p: [0, 3, 5, 6, 8, 10, 13, 15].includes(i) }; });
  const cellR = seeded(9); const cellJ = Array.from({ length: 400 }, () => [cellR(), cellR(), cellR()]);
  const specks = Array.from({ length: 70 }, () => { const a = cellR() * TAU, r = Math.sqrt(cellR()) * .62; return [Math.cos(a) * r, Math.sin(a) * r, .01 + cellR() * .025]; });

  function hexPath(ctx, x, y, r) { ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + i * Math.PI / 3; ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } ctx.closePath(); }
  function bg(ctx, E, c1, c2) { const g = ctx.createRadialGradient(0, 0, 0, 0, 0, E); g.addColorStop(0, c1); g.addColorStop(1, c2); ctx.fillStyle = g; ctx.fillRect(-E, -E, 2 * E, 2 * E); }
  function water(ctx, x, y, a, s) { const d = .1 * s; ball(ctx, '#ff5d5d', x, y, .075 * s); ball(ctx, '#eef3ff', x + Math.cos(a + .91) * d, y + Math.sin(a + .91) * d, .05 * s); ball(ctx, '#eef3ff', x + Math.cos(a - .91) * d, y + Math.sin(a - .91) * d, .05 * s); }

  const SCENES = [
    (ctx, S, E, t) => { // melon
      bg(ctx, E, '#141a33', '#07080f');
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = S * .2; ctx.shadowOffsetY = S * .08;
      ctx.fillStyle = '#1f5a2a'; ctx.beginPath(); ctx.arc(0, 0, S, 0, TAU); ctx.fill(); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.arc(0, 0, S, 0, TAU); ctx.clip();
      for (let i = -8; i <= 8; i++) { ctx.strokeStyle = '#123d1b'; ctx.lineWidth = S * .06; ctx.beginPath(); for (let y = -S; y <= S; y += S * .1) ctx.lineTo(i * S * .16 + Math.sin(y / S * 9 + i) * S * .025, y); ctx.stroke(); }
      ctx.restore();
      ctx.fillStyle = '#e6f5cf'; ctx.beginPath(); ctx.arc(0, 0, S * .92, 0, TAU); ctx.fill();
      let g = ctx.createRadialGradient(-S * .2, -S * .25, S * .05, 0, 0, S * .86); g.addColorStop(0, '#ff7d93'); g.addColorStop(.6, '#f2385a'); g.addColorStop(1, '#c81d45');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, S * .86, 0, TAU); ctx.fill();
      // sparkle grain
      for (let i = 0; i < 160; i++) { const j = cellJ[i]; const a = j[0] * TAU, r = Math.sqrt(j[1]) * S * .82; ctx.fillStyle = `rgba(255,220,230,${.08 + j[2] * .15})`; ctx.beginPath(); ctx.arc(Math.cos(a) * r, Math.sin(a) * r, S * .012, 0, TAU); ctx.fill(); }
      for (const [rr, n] of [[.42, 9], [.62, 13]]) for (let i = 0; i < n; i++) {
        const a = i / n * TAU + rr * 3; ctx.save(); ctx.translate(Math.cos(a) * S * rr, Math.sin(a) * S * rr); ctx.rotate(a + Math.PI / 2);
        ctx.fillStyle = '#1a1010'; ctx.beginPath(); ctx.ellipse(0, 0, S * .022, S * .042, 0, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(-S * .006, -S * .015, S * .006, S * .012, 0, 0, TAU); ctx.fill(); ctx.restore();
      }
      ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.setLineDash([S * .03, S * .02]); ctx.lineWidth = Math.max(1, S * .008); ctx.strokeRect(-S * .12, -S * .12, S * .24, S * .24); ctx.setLineDash([]);
    },
    (ctx, S, E, t) => { // flesh: juicy cells
      bg(ctx, E, '#c8274b', '#5a0d20');
      const r = S * .24, dx = r * Math.sqrt(3), dy = r * 1.5; let k = 0;
      for (let row = -Math.ceil(E / dy) - 1; row <= Math.ceil(E / dy) + 1; row++) for (let col = -Math.ceil(E / dx) - 1; col <= Math.ceil(E / dx) + 1; col++) {
        const j = cellJ[(k++ * 7 + 400) % 400]; const x = col * dx + (row & 1) * dx / 2 + (j[0] - .5) * r * .2, y = row * dy + (j[1] - .5) * r * .2;
        const g = ctx.createRadialGradient(x - r * .3, y - r * .35, r * .05, x, y, r); g.addColorStop(0, '#ffc3cf'); g.addColorStop(.35, '#ff5a78'); g.addColorStop(1, '#b8173c');
        hexPath(ctx, x, y, r * .95); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = 'rgba(255,200,215,.55)'; ctx.lineWidth = r * .07; ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${.25 + .2 * Math.sin(t * 2 + k)})`; ctx.beginPath(); ctx.ellipse(x - r * .35, y - r * .4, r * .12, r * .06, -.6, 0, TAU); ctx.fill();
      }
    },
    (ctx, S, E, t) => { // a single cell
      bg(ctx, E, '#7a1530', '#3a0816');
      const r = S * .95, dx = r * Math.sqrt(3), dy = r * 1.5;
      for (let row = -Math.ceil(E / dy) - 1; row <= Math.ceil(E / dy) + 1; row++) for (let col = -Math.ceil(E / dx) - 1; col <= Math.ceil(E / dx) + 1; col++) {
        const x = col * dx + (row & 1) * dx / 2, y = row * dy; const centre = row === 0 && col === 0;
        hexPath(ctx, x, y, r * .97); ctx.fillStyle = centre ? 'rgba(255,170,190,.22)' : 'rgba(255,120,150,.12)'; ctx.fill();
        ctx.strokeStyle = centre ? '#ffc0cd' : 'rgba(255,170,190,.5)'; ctx.lineWidth = r * .045; ctx.stroke();
      }
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, S * .78); g.addColorStop(0, 'rgba(140,200,255,.32)'); g.addColorStop(1, 'rgba(140,200,255,.04)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, S * .74, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(190,225,255,.35)'; ctx.lineWidth = S * .008; ctx.stroke();
      for (const [x, y, rr] of specks) { ctx.fillStyle = '#ff2d55'; ctx.beginPath(); ctx.ellipse(x * S + Math.sin(t + x * 9) * S * .01, y * S, rr * S * 1.6, rr * S * .7, x * 5, 0, TAU); ctx.fill(); }
      ball(ctx, '#b07ad8', S * .55, -S * .5, S * .11);
      ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.setLineDash([S * .03, S * .02]); ctx.lineWidth = Math.max(1, S * .008); ctx.strokeRect(-S * .12, -S * .12, S * .24, S * .24); ctx.setLineDash([]);
    },
    (ctx, S, E, t) => { // juice molecules
      bg(ctx, E, '#0f2650', '#050a1c');
      const m = reduceMotion ? 0 : 1;
      for (const s of sugars) {
        const cx = s.x * S + Math.sin(t * .5 + s.a) * S * .05 * m, cy = s.y * S + Math.cos(t * .4 + s.a) * S * .05 * m, rr = S * .16, rot = t * .2 * m + s.a;
        const pts = Array.from({ length: 6 }, (_, i) => [cx + Math.cos(rot + i * TAU / 6) * rr, cy + Math.sin(rot + i * TAU / 6) * rr]);
        ctx.strokeStyle = 'rgba(220,225,240,.6)'; ctx.lineWidth = S * .022; ctx.beginPath(); pts.forEach(p => ctx.lineTo(p[0], p[1])); ctx.closePath(); ctx.stroke();
        pts.forEach((p, i) => { const ox = cx + Math.cos(rot + i * TAU / 6) * rr * 1.7, oy = cy + Math.sin(rot + i * TAU / 6) * rr * 1.7; if (i) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(ox, oy); ctx.stroke(); ball(ctx, '#ff5d5d', ox, oy, S * .05); } });
        pts.forEach((p, i) => ball(ctx, i === 0 ? '#ff5d5d' : '#9aa3b8', p[0], p[1], S * .06));
      }
      for (const q of juice) water(ctx, q.x * S + Math.sin(t * q.sp * 2 + q.ph) * S * .04 * m, q.y * S + Math.cos(t * q.sp * 1.7 + q.ph) * S * .04 * m, q.a + t * q.sp * m, S);
      ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.setLineDash([S * .03, S * .02]); ctx.lineWidth = Math.max(1, S * .008); ctx.beginPath(); ctx.arc(0, 0, S * .16, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
      water(ctx, 0, 0, -Math.PI / 2 + .3, S * 1.25);
    },
    (ctx, S, E, t) => { // one water molecule
      bg(ctx, E, '#0e1530', '#05060e');
      const ha = 52.25 * Math.PI / 180, d = S * .62;
      const h1 = [Math.sin(ha) * d, Math.cos(ha) * d], h2 = [-Math.sin(ha) * d, Math.cos(ha) * d];
      glow(ctx, 0, 0, S * 1.1, '#5ce1e6', .45); glow(ctx, h1[0], h1[1], S * .5, '#a78bfa', .4); glow(ctx, h2[0], h2[1], S * .5, '#a78bfa', .4);
      ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = S * .06; ctx.beginPath(); ctx.moveTo(h1[0], h1[1]); ctx.lineTo(0, 0); ctx.lineTo(h2[0], h2[1]); ctx.stroke();
      ball(ctx, '#eef3ff', h1[0], h1[1], S * .25); ball(ctx, '#eef3ff', h2[0], h2[1], S * .25); ball(ctx, '#ff5d5d', 0, 0, S * .4);
      ctx.fillStyle = '#fff'; ctx.font = `600 ${S * .13}px Inter, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('O', 0, 0); ctx.fillStyle = '#141625'; ctx.fillText('H', h1[0], h1[1]); ctx.fillText('H', h2[0], h2[1]);
      ctx.fillStyle = '#5ce1e6'; ctx.font = `500 ${S * .11}px "JetBrains Mono", monospace`; ctx.fillText('δ−', 0, -S * .58);
      ctx.fillStyle = '#ffb3c6'; ctx.fillText('δ+', h1[0] + S * .3, h1[1] + S * .25); ctx.fillText('δ+', h2[0] - S * .3, h2[1] + S * .25);
      ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = Math.max(1, S * .006); ctx.beginPath(); ctx.arc(0, 0, S * .62, -Math.PI / 2 - ha, -Math.PI / 2 + ha, true); ctx.stroke();
    },
    (ctx, S, E, t) => { // oxygen atom
      bg(ctx, E, '#0a1028', '#04050c');
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, S * .95); g.addColorStop(0, 'rgba(92,225,230,.35)'); g.addColorStop(.25, 'rgba(92,225,230,.16)'); g.addColorStop(.7, 'rgba(110,140,255,.1)'); g.addColorStop(1, 'rgba(110,140,255,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, S * .95, 0, TAU); ctx.fill();
      const rr = seeded(Math.floor(t * 12));
      for (let i = 0; i < 90; i++) { const a = rr() * TAU, r = (i < 20 ? .12 : .35 + rr() * .45) * S * Math.sqrt(rr() + .2); ctx.fillStyle = `rgba(160,240,255,${.15 + rr() * .4})`; ctx.beginPath(); ctx.arc(Math.cos(a) * r, Math.sin(a) * r, S * .008, 0, TAU); ctx.fill(); }
      for (let i = 0; i < 8; i++) { const inner = i < 2, a = t * (inner ? 1.6 : .7) + i * TAU / (inner ? 2 : 6), r = (inner ? .2 : .6) * S; glow(ctx, Math.cos(a) * r, Math.sin(a) * r * (inner ? 1 : .8), S * .07, '#5ce1e6', .9); ball(ctx, '#5ce1e6', Math.cos(a) * r, Math.sin(a) * r * (inner ? 1 : .8), S * .02); }
      glow(ctx, 0, 0, S * .06, '#f4c35a', 1); ball(ctx, '#ffdf9a', 0, 0, Math.max(1.2, S * .012));
      ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(S * .02, -S * .02); ctx.lineTo(S * .25, -S * .25); ctx.lineTo(S * .5, -S * .25); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.font = `500 ${Math.max(10, S * .055)}px "JetBrains Mono", monospace`; ctx.textAlign = 'left'; ctx.textBaseline = 'bottom'; ctx.fillText('nucleus', S * .27, -S * .27);
    },
    (ctx, S, E, t) => { // nucleus
      bg(ctx, E, '#1a1022', '#06040b');
      glow(ctx, 0, 0, S * 1.1, '#f4c35a', .5);
      const sorted = nuc.map((n, i) => ({ ...n, i, z: Math.sin(i * 1.7) })).sort((a, b) => a.z - b.z);
      const wob = reduceMotion ? 0 : 1;
      for (const n of sorted) ball(ctx, n.p ? '#ff5d5d' : '#a9b1c6', (n.x + Math.sin(t * 3 + n.i) * .006 * wob) * S * 1.05, (n.y + Math.cos(t * 2.6 + n.i) * .006 * wob) * S * 1.05, S * .19);
    }
  ];
  let s = 0, target = 0, tour = false, tourTimer = 0;
  const Z = 9;
  function setLabel() {
    const i = clamp(Math.round(s), 0, 6), d = INFO[i];
    $('#zoom-name').textContent = d[0]; $('#zoom-scale').textContent = d[1]; $('#zoom-lvl').textContent = d[2]; $('#zoom-text').textContent = d[3];
    $$('#zoom-ticks span').forEach((e, k) => e.classList.toggle('on', k === i));
  }
  range.addEventListener('input', () => { target = s = range.value / 100; tour = false; $('#zoom-tour').textContent = '▶ Take the tour'; setLabel(); });
  const go = d => { tour = false; $('#zoom-tour').textContent = '▶ Take the tour'; target = clamp(Math.round(target) + d, 0, 6); };
  $('#zoom-in').addEventListener('click', () => go(1)); $('#zoom-out').addEventListener('click', () => go(-1));
  c.addEventListener('click', () => go(target >= 6 ? -6 : 1));
  $$('#zoom-ticks span').forEach((e, k) => e.addEventListener('click', () => { tour = false; target = k; }));
  $('#zoom-tour').addEventListener('click', () => { tour = !tour; $('#zoom-tour').textContent = tour ? '❚❚ Pause' : '▶ Take the tour'; if (tour && target >= 6) { target = 0; s = 0; } tourTimer = 0; });
  animate(c, (dt, t) => {
    if (tour) { tourTimer += dt; if (tourTimer > 3.4) { tourTimer = 0; if (target < 6) target++; else { tour = false; $('#zoom-tour').textContent = '▶ Take the tour'; } } }
    if (Math.abs(target - s) > .0005) { s += (target - s) * Math.min(1, dt * 3.2); if (Math.abs(target - s) < .002) s = target; range.value = Math.round(s * 100); setLabel(); }
    const { ctx, w, h } = fit(c); const S = Math.min(w, h) * .4;
    const i = Math.min(5, Math.floor(s)), f = s >= 6 ? 1 : s - i;
    const half = Math.hypot(w, h) / 2;
    ctx.fillStyle = '#05060d'; ctx.fillRect(0, 0, w, h);
    const draw = (idx, k, alpha) => { if (alpha <= .001) return; ctx.save(); ctx.globalAlpha = alpha; ctx.translate(w / 2, h / 2); ctx.scale(k, k); SCENES[idx](ctx, S, half / k + S * .1, t); ctx.restore(); };
    const curK = Math.pow(Z, f);
    draw(i, curK, 1 - smooth(.82, 1, f));
    if (f > 0) {
      const nk = Math.pow(Z, f - 1); const clipR = S * .2 * Math.pow(Z, f) * (1 + 6 * smooth(.55, 1, f) * f);
      ctx.save(); ctx.beginPath(); ctx.arc(w / 2, h / 2, clipR, 0, TAU); ctx.clip();
      draw(i + 1, nk, smooth(.05, .45, f)); ctx.restore();
      if (f < .95) { ctx.strokeStyle = `rgba(255,255,255,${.5 * (1 - smooth(.6, .95, f)) * smooth(.05, .3, f)})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(w / 2, h / 2, clipR, 0, TAU); ctx.stroke(); }
    }
    const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * .35, w / 2, h / 2, half); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.55)');
    ctx.fillStyle = v; ctx.fillRect(0, 0, w, h);
  });
  setLabel();
}

/* =========================================================
   CASE 1: states of matter (2D Lennard-Jones with gravity)
   ========================================================= */
function statesLab() {
  const c = $('#states-canvas'), slider = $('#temp');
  const N = 72, BW = 18, BH = 12.5, G = .22;
  const P = []; let k = 0;
  for (let row = 0; k < N; row++) for (let col = 0; col < 12 && k < N; col++, k++) P.push({ x: 2.6 + col * 1.12 + (row & 1) * .56, y: BH - .7 - row * .97, vx: 0, vy: 0, ax: 0, ay: 0 });
  let Tt = .15;
  function forces() {
    for (const p of P) { p.ax = 0; p.ay = G; }
    for (let i = 0; i < N; i++) { const a = P[i]; for (let j = i + 1; j < N; j++) { const b = P[j]; const dx = a.x - b.x, dy = a.y - b.y; let r2 = dx * dx + dy * dy; if (r2 > 6.25) continue; r2 = Math.max(r2, .64); const i2 = 1 / r2, i6 = i2 * i2 * i2; const f = 24 * i2 * i6 * (2 * i6 - 1); a.ax += f * dx; a.ay += f * dy; b.ax -= f * dx; b.ay -= f * dy; } }
  }
  forces();
  function step(dt) {
    for (const p of P) { p.vx += p.ax * dt / 2; p.vy += p.ay * dt / 2; p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.x < .5) { p.x = .5; p.vx = Math.abs(p.vx); } if (p.x > BW - .5) { p.x = BW - .5; p.vx = -Math.abs(p.vx); }
      if (p.y < .5) { p.y = .5; p.vy = Math.abs(p.vy); } if (p.y > BH - .5) { p.y = BH - .5; p.vy = -Math.abs(p.vy); } }
    forces();
    let ke = 0; for (const p of P) { p.vx += p.ax * dt / 2; p.vy += p.ay * dt / 2; ke += p.vx * p.vx + p.vy * p.vy; }
    const T = Math.max(1e-4, ke / (2 * N)); const lam = Math.sqrt(1 + .03 * (Tt / T - 1));
    for (const p of P) { p.vx *= lam; p.vy *= lam; }
  }
  const STATES = {
    s: ['Ice', 'H₂O(s)', 'Solid', 'Too cold to escape. Each molecule vibrates in place, locked to its neighbours in a neat pattern. That is why a solid keeps its shape.'],
    l: ['Liquid water', 'H₂O(l)', 'Liquid', 'Enough energy to break free of fixed places, but not of each other. The molecules stay close yet slide and tumble past one another, so a liquid flows and takes the shape of its container.'],
    g: ['Steam (water vapour)', 'H₂O(g)', 'Gas', 'So much energy that attractions can\'t hold them. The molecules fly apart and race around the box, crashing into the walls. That pushing on the walls is gas pressure.']
  };
  let cur = '';
  function update() {
    const v = slider.value / 1000, C = Math.round(-30 + v * 180);
    $('#temp-out').textContent = `${C} °C`;
    if (C < 0) Tt = .08 + (C + 30) / 30 * .24; else if (C <= 100) Tt = .45 + C / 100 * .2; else Tt = .95 + (C - 100) / 50 * 1.6;
    const st = C < 0 ? 's' : C <= 100 ? 'l' : 'g';
    if (st !== cur) {
      cur = st; const d = STATES[st];
      $('#state-name').textContent = d[0]; $('#state-sym').textContent = d[1]; $('#state-chip').textContent = d[2]; $('#state-text').textContent = d[3];
      $('#m-ice').style.opacity = st === 's' ? 1 : 0; $('#m-water').style.opacity = st === 'l' ? 1 : 0; $('#m-steam').style.opacity = st === 'g' ? 1 : 0;
    }
  }
  slider.addEventListener('input', update); update();
  const COLS = ['#6b8cff', '#5ce1e6', '#6fe3a0', '#f4c35a', '#ff9f5a', '#ff5d5d'];
  animate(c, (dt) => {
    const sub = reduceMotion ? 4 : 10; for (let i = 0; i < sub; i++) step(.005);
    const { ctx, w, h } = fit(c); const sc = Math.min(w / BW, h / BH), ox = (w - BW * sc) / 2, oy = (h - BH * sc) / 2;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 1; ctx.strokeRect(ox + .5, oy + .5, BW * sc - 1, BH * sc - 1);
    ctx.lineWidth = Math.max(1, sc * .08);
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) { const a = P[i], b = P[j], dx = a.x - b.x, dy = a.y - b.y, r2 = dx * dx + dy * dy; if (r2 < 1.5) { ctx.strokeStyle = `rgba(150,200,255,${.35 * (1.5 - r2) / .5})`; ctx.beginPath(); ctx.moveTo(ox + a.x * sc, oy + a.y * sc); ctx.lineTo(ox + b.x * sc, oy + b.y * sc); ctx.stroke(); } }
    for (const p of P) { const v2 = p.vx * p.vx + p.vy * p.vy; ball(ctx, rampColor(COLS, Math.sqrt(v2) / 3.4), ox + p.x * sc, oy + p.y * sc, sc * .47); }
  });
}

/* =========================================================
   CASE 2a: Rutherford gold foil
   ========================================================= */
function rutherfordLab() {
  const c = $('#ruth-canvas'); let mode = 'pudding', firing = false, prediction = null;
  let A = [], flashes = [], counts = { s: 0, d: 0, b: 0 }, spawnAcc = 0, W = 800, H = 360;
  const V = 300;
  function nuclei(w, h) { const out = [], sp = 48, cols = [-1, 0, 1]; for (const ci of cols) for (let y = sp / 2 + (ci & 1 ? sp / 2 : 0) - sp; y < h + sp; y += sp) out.push({ x: w / 2 + ci * sp * .7, y }); return out; }
  let N = [];
  function reset() { A = []; flashes = []; counts = { s: 0, d: 0, b: 0 }; renderCounts(); }
  function renderCounts() { $('#r-s').textContent = counts.s; $('#r-d').textContent = counts.d; $('#r-b').textContent = counts.b; }
  $$('#ruth-mode button').forEach(b => b.addEventListener('click', () => { $$('#ruth-mode button').forEach(x => x.classList.toggle('on', x === b)); mode = b.dataset.m; reset(); message(); }));
  $$('#ruth-predict .hunch').forEach(b => b.addEventListener('click', () => { prediction = +b.dataset.p; $$('#ruth-predict .hunch').forEach(x => x.classList.toggle('picked', x === b)); message(); }));
  $('#ruth-fire').addEventListener('click', () => { firing = !firing; $('#ruth-fire').textContent = firing ? '■ Stop firing' : '● Fire alpha particles'; message(); });
  $('#ruth-reset').addEventListener('click', reset);
  function message() {
    const m = $('#ruth-msg'); const total = counts.s + counts.d + counts.b;
    if (prediction == null && !firing) { m.innerHTML = 'Choose a prediction, then fire.'; return; }
    if (mode === 'pudding') m.innerHTML = total < 40 ? 'In a pudding atom the positive charge is spread thin, too weak to stop a fast alpha particle anywhere.' : `As the pudding model predicts, everything sails straight through.${prediction === 0 ? ' <b style="color:var(--green)">Your prediction matches the pudding model.</b>' : ''} Now switch to <b>“What really happened”</b>.`;
    else m.innerHTML = total < 40 ? 'Watch closely. Most fly through… but not all.' : `Most pass straight through, because the atom is mostly empty. But a few come close to a tiny, concentrated positive <b>nucleus</b> and are flung aside or straight back. (In the real experiment about 1 in 8,000 bounced back; we've made the nuclei bigger targets so you can see it.)`;
  }
  animate(c, (dt, t) => {
    const { ctx, w, h } = fit(c);
    if (w !== W || h !== H || !N.length) { W = w; H = h; N = nuclei(w, h); }
    if (firing) { spawnAcc += dt * 26; while (spawnAcc > 1) { spawnAcc--; A.push({ x: -10, y: h * .08 + Math.random() * h * .84, vx: V, vy: 0, tr: [] }); } }
    const K = .4 * V * V, SUB = 14, sdt = dt / SUB;
    for (const a of A) {
      for (let s = 0; s < SUB; s++) {
        if (mode === 'nuclear') { for (const n of N) { const dx = a.x - n.x, dy = a.y - n.y; if (Math.abs(dx) > 90 || Math.abs(dy) > 90) continue; const r2 = dx * dx + dy * dy + .25, r = Math.sqrt(r2), f = K / r2; a.vx += f * dx / r * sdt; a.vy += f * dy / r * sdt; } }
        else if (Math.abs(a.x - w / 2) < 60) { a.vy += (Math.random() - .5) * 400 * sdt; }
        a.x += a.vx * sdt; a.y += a.vy * sdt;
      }
      a.tr.push([a.x, a.y]); if (a.tr.length > 36) a.tr.shift();
      if (a.x > w + 20 || a.x < -20 || a.y < -20 || a.y > h + 20) {
        a.dead = true; const ang = Math.abs(Math.atan2(a.vy, a.vx)) * 180 / Math.PI;
        if (ang < 10) counts.s++; else if (ang < 90) counts.d++; else counts.b++;
        flashes.push({ x: clamp(a.x, 2, w - 2), y: clamp(a.y, 2, h - 2), life: 1, back: ang >= 90 });
        renderCounts(); if ((counts.s + counts.d + counts.b) % 10 === 0) message();
      }
    }
    A = A.filter(a => !a.dead);
    ctx.clearRect(0, 0, w, h);
    // foil band
    const g = ctx.createLinearGradient(w / 2 - 60, 0, w / 2 + 60, 0); g.addColorStop(0, 'rgba(244,195,90,0)'); g.addColorStop(.5, 'rgba(244,195,90,.10)'); g.addColorStop(1, 'rgba(244,195,90,0)');
    ctx.fillStyle = g; ctx.fillRect(w / 2 - 60, 0, 120, h);
    if (mode === 'pudding') {
      for (const n of N) { const gg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 28); gg.addColorStop(0, 'rgba(255,140,170,.38)'); gg.addColorStop(1, 'rgba(255,140,170,.06)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(n.x, n.y, 26, 0, TAU); ctx.fill();
        for (let e = 0; e < 4; e++) { const a = e * 1.6 + n.y; ball(ctx, '#5ce1e6', n.x + Math.cos(a) * 13, n.y + Math.sin(a) * 13, 2.2); } }
    } else {
      for (const n of N) { ctx.strokeStyle = 'rgba(92,225,230,.12)'; ctx.setLineDash([2, 4]); ctx.beginPath(); ctx.arc(n.x, n.y, 23, 0, TAU); ctx.stroke(); ctx.setLineDash([]); glow(ctx, n.x, n.y, 12, '#f4c35a', 1); ball(ctx, '#ffdf9a', n.x, n.y, 2.2); }
    }
    ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.font = '11px "JetBrains Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('GOLD FOIL', w / 2, h - 10);
    ctx.textAlign = 'left'; ctx.fillText('α source →', 10, 18);
    for (const a of A) {
      ctx.beginPath(); a.tr.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
      ctx.strokeStyle = 'rgba(255,107,154,.45)'; ctx.lineWidth = 1.5; ctx.stroke(); glow(ctx, a.x, a.y, 10, '#ff6b9a', .9); ball(ctx, '#ff8fb2', a.x, a.y, 3);
    }
    for (const f of flashes) { f.life -= dt * 1.2; glow(ctx, f.x, f.y, (f.back ? 40 : 16) * (1.4 - f.life), f.back ? '#ff6b9a' : '#6fe3a0', Math.max(0, f.life)); }
    flashes = flashes.filter(f => f.life > 0);
  });
}

/* =========================================================
   CASE 2b: Atom builder
   ========================================================= */
const ELEMENTS20 = [null,
  ['H', 'Hydrogen', 'The lightest and most common element in the universe. Stars are mostly hydrogen.', [0, 1, 2]],
  ['He', 'Helium', 'Full shell, totally aloof. It makes balloons float and your voice squeaky.', [1, 2]],
  ['Li', 'Lithium', 'A soft metal that powers the battery in your phone.', [3, 4]],
  ['Be', 'Beryllium', 'Light and stiff. Used in space telescope mirrors.', [5]],
  ['B', 'Boron', 'Found in heat-proof glass and in the bleaching powder called borax.', [5, 6]],
  ['C', 'Carbon', 'Cass, the builder of life: diamonds, pencils, and every living cell.', [6, 7]],
  ['N', 'Nitrogen', 'Makes up 78% of the air you breathe, and does almost nothing.', [7, 8]],
  ['O', 'Oxygen', 'Ola, the electron thief. 21% of air, 65% of your body\'s mass.', [8, 9, 10]],
  ['F', 'Fluorine', 'The most electron-greedy element of all. Found in toothpaste (as fluoride).', [10]],
  ['Ne', 'Neon', 'A noble gas. Glows red-orange in signs.', [10, 11, 12]],
  ['Na', 'Sodium', 'Sid, the reckless giver. Explodes in water; half of table salt.', [12]],
  ['Mg', 'Magnesium', 'Burns with a blinding white light. At the heart of every chlorophyll molecule.', [12, 13, 14]],
  ['Al', 'Aluminium', 'Light, never rusts through. Cans, foil and aeroplanes.', [14]],
  ['Si', 'Silicon', 'Sand, glass, and the computer chip in every device you own.', [14, 15, 16]],
  ['P', 'Phosphorus', 'Glows in the dark; holds your DNA and bones together.', [16]],
  ['S', 'Sulfur', 'The smell of rotten eggs and struck matches.', [16, 17, 18, 20]],
  ['Cl', 'Chlorine', 'Clo, the grabby poison. Keeps swimming pools clean.', [18, 20]],
  ['Ar', 'Argon', 'A noble gas. About 1% of every breath you take.', [18, 20, 22]],
  ['K', 'Potassium', 'Even more reckless than sodium. Bananas are full of its ions.', [20, 22]],
  ['Ca', 'Calcium', 'Bones, teeth, chalk, and the white cliffs of Dover.', [20, 22, 23, 24, 26, 28]]
];
function builderLab() {
  const svg = $('#builder-svg'); const st = { p: 1, n: 0, e: 1 };
  const SHELLS = [2, 8, 8, 2], RADII = [62, 100, 138, 172];
  const missions = [
    { t: 'Build a neutral helium-4 atom', ok: s => s.p === 2 && s.n === 2 && s.e === 2 },
    { t: 'Build carbon-12, the backbone of life', ok: s => s.p === 6 && s.n === 6 && s.e === 6 },
    { t: 'Make a sodium ion, Na⁺ (sodium-23)', ok: s => s.p === 11 && s.n === 12 && s.e === 10 },
    { t: 'Make the chloride ion Cl⁻ (chlorine-35)', ok: s => s.p === 17 && s.n === 18 && s.e === 18 },
    { t: 'Turn hydrogen into an isotope: deuterium (¹H with one neutron)', ok: s => s.p === 1 && s.n === 1 && s.e === 1 }
  ];
  const done = new Set(store.get('missions', []));
  let groups = [];
  function draw() {
    svg.innerHTML = '';
    const defs = svgEl('defs', {}, svg);
    [['bp', '#ff5d5d'], ['bn', '#a9b1c6'], ['be', '#5ce1e6']].forEach(([id, col]) => { const g = svgEl('radialGradient', { id, cx: '35%', cy: '30%', r: '75%' }, defs); svgEl('stop', { offset: '0', 'stop-color': '#fff' }, g); svgEl('stop', { offset: '.3', 'stop-color': shade(col, .2) }, g); svgEl('stop', { offset: '1', 'stop-color': shade(col, -.5) }, g); });
    const ng = svgEl('radialGradient', { id: 'nglow' }, defs); svgEl('stop', { offset: '0', 'stop-color': '#f4c35a', 'stop-opacity': '.45' }, ng); svgEl('stop', { offset: '1', 'stop-color': '#f4c35a', 'stop-opacity': '0' }, ng);
    const eg = svgEl('radialGradient', { id: 'eglow' }, defs); svgEl('stop', { offset: '0', 'stop-color': '#5ce1e6', 'stop-opacity': '.6' }, eg); svgEl('stop', { offset: '1', 'stop-color': '#5ce1e6', 'stop-opacity': '0' }, eg);
    let left = st.e; groups = [];
    RADII.forEach((r, si) => { svgEl('circle', { cx: 0, cy: 0, r, fill: 'none', stroke: 'rgba(92,225,230,' + (left > 0 ? .25 : .07) + ')', 'stroke-dasharray': '2 5' }, svg); });
    const total = st.p + st.n; const nr = 8 + Math.sqrt(total) * 6.2;
    svgEl('circle', { cx: 0, cy: 0, r: nr * 2.2 + 10, fill: 'url(#nglow)' }, svg);
    const items = []; for (let i = 0; i < total; i++) items.push(i);
    const kinds = Array(st.p).fill('p').concat(Array(st.n).fill('n')); const kr = seeded(st.p * 31 + st.n);
    for (let i = kinds.length - 1; i > 0; i--) { const j = Math.floor(kr() * (i + 1)); [kinds[i], kinds[j]] = [kinds[j], kinds[i]]; }
    const rb = 7.2;
    items.map(i => { const r = total === 1 ? 0 : rb * 1.05 * Math.sqrt(i + .5), a = i * 2.39996; return { x: Math.cos(a) * r, y: Math.sin(a) * r, k: kinds[i], z: -r }; }).sort((a, b) => a.z - b.z).forEach(o => svgEl('circle', { cx: o.x.toFixed(1), cy: o.y.toFixed(1), r: rb, fill: o.k === 'p' ? 'url(#bp)' : 'url(#bn)' }, svg));
    SHELLS.forEach((cap, si) => {
      const n = Math.min(cap, left); left -= n; const g = svgEl('g', {}, svg); groups.push({ g, sp: (si % 2 ? -1 : 1) * (28 - si * 5) });
      for (let i = 0; i < n; i++) { const a = i / n * TAU + si; const x = Math.cos(a) * RADII[si], y = Math.sin(a) * RADII[si]; svgEl('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: 14, fill: 'url(#eglow)' }, g); svgEl('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: 5, fill: 'url(#be)' }, g); }
    });
    const E = ELEMENTS20[st.p]; const charge = st.p - st.e, A = st.p + st.n;
    if (!E) { $('#b-name').textContent = 'Nothing yet'; $('#b-meta').textContent = 'ADD A PROTON TO BEGIN'; $('#b-desc').textContent = 'With zero protons, there is no element at all. The proton count is the identity card.'; $('#b-chip').textContent = '—'; }
    else {
      const sup = charge === 0 ? '' : (Math.abs(charge) > 1 ? Math.abs(charge) : '') + (charge > 0 ? '⁺' : '⁻');
      $('#b-name').innerHTML = `${E[1]}-${A} <span style="color:var(--muted);font-size:.7em">${E[0]}${sup}</span>`;
      $('#b-meta').textContent = `ATOMIC NUMBER ${st.p} · MASS NUMBER ${A} · CHARGE ${charge > 0 ? '+' : ''}${charge}`;
      const stable = E[3].includes(st.n);
      let d = E[2];
      if (charge > 0) d += ` <b>This is a positive ion</b>: it has lost ${charge} electron${charge > 1 ? 's' : ''}.`;
      if (charge < 0) d += ` <b>This is a negative ion</b>: it has gained ${-charge} electron${charge < -1 ? 's' : ''}.`;
      d += stable ? ' <span style="color:var(--green)">This nucleus is stable.</span>' : ' <span style="color:var(--orange)">This nucleus is unstable (radioactive): wrong balance of neutrons.</span>';
      $('#b-desc').innerHTML = d; $('#b-chip').textContent = charge === 0 ? 'Neutral atom' : (charge > 0 ? 'Positive ion' : 'Negative ion');
    }
    $('#b-p').textContent = st.p; $('#b-n').textContent = st.n; $('#b-e').textContent = st.e;
    missions.forEach((m, i) => { if (m.ok(st) && !done.has(i)) { done.add(i); store.set('missions', [...done]); toast('Mission complete: ' + m.t); } });
    $('#missions').innerHTML = missions.map((m, i) => `<div class="mission ${done.has(i) ? 'done' : ''}"><i>${done.has(i) ? '✓' : ''}</i>${m.t}</div>`).join('');
  }
  $$('.stepper button').forEach(b => b.addEventListener('click', () => { const k = b.dataset.k, d = +b.dataset.d; const max = { p: 20, n: 30, e: 20 }[k]; st[k] = clamp(st[k] + d, 0, max); draw(); }));
  draw();
  animate(svg, (dt, t) => { if (reduceMotion) return; groups.forEach(o => o.g.setAttribute('transform', `rotate(${(t * o.sp) % 360})`)); });
}
