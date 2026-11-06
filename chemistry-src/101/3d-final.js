
/* =========================================================
   CASE 9: Cass's journey
   ========================================================= */
function journeyLab() {
  const svg = $('#journey-svg');
  const STOPS = [
    { x: 95, y: 70, n: 'In a star', eq: 'He + He + He → C   (nuclear fusion)', t: 'Born in a dying star', d: 'More than 4.6 billion years ago, in the core of a giant star, three helium nuclei slammed together under unimaginable heat and pressure, and Cass was born. When the star exploded, she was flung into space and drifted into the cloud of gas and dust that became our Sun and Earth.' },
    { x: 290, y: 95, n: 'In the air', eq: 'C + O₂ → CO₂', t: 'Drifting in the air', d: 'For ages Cass wandered the sky as part of a carbon dioxide molecule, one CO₂ among roughly every 2,400 air molecules. Volcanoes, oceans and forests passed her back and forth.' },
    { x: 470, y: 175, n: 'In a leaf', eq: '6 CO₂ + 6 H₂O + light → C₆H₁₂O₆ + 6 O₂', t: 'Caught by a leaf: photosynthesis', d: 'A leaf breathed her in. Powered by sunlight, green chlorophyll pulled her molecule apart and rebuilt Cass into glucose (sugar), storing the Sun\'s energy in its new bonds. The leftover oxygen was released into the air: the very oxygen you breathe. This reaction is endothermic; it absorbs energy.' },
    { x: 560, y: 262, n: 'In an apple', eq: 'C₆H₁₂O₆ (stored as sugars)', t: 'Locked in an apple', d: 'The sugar flowed through the tree into a ripening apple. The sweetness you taste is molecules just like the one Cass sits in, packed with stored sunlight.' },
    { x: 712, y: 236, n: 'In you', eq: 'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + energy', t: 'Inside you: respiration', d: 'You ate the apple. In your cells, the sugar reacted with oxygen in a slow, controlled burn called respiration. It is the same reaction as photosynthesis, run backwards and exothermic. The released energy powers your heartbeat, your muscles and your thoughts.' },
    { x: 830, y: 105, n: 'Breathed out', eq: 'CO₂ → back to the air', t: 'Breathed out, and around again', d: 'Cass left your lungs as CO₂, part of the fog on the window this morning, ready for the next leaf. The cycle has turned for billions of years. The carbon in your body has been part of countless living things before you, and was once inside a star.' }
  ];
  const pts = STOPS.map(s => [s.x, s.y]);
  function catmull(p) { let d = `M${p[0][0]} ${p[0][1]}`; for (let i = 0; i < p.length - 1; i++) { const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2; const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]; d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`; } return d; }
  svg.innerHTML = `<defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1030"/><stop offset=".7" stop-color="#16244d"/><stop offset="1" stop-color="#1e3a4a"/></linearGradient>
    <radialGradient id="starG"><stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="#ffd27a"/><stop offset=".5" stop-color="#ff7b4a" stop-opacity=".5"/><stop offset="1" stop-color="#ff7b4a" stop-opacity="0"/></radialGradient>
    <radialGradient id="cassG" cx="35%" cy="30%"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#c4cbe0"/><stop offset="1" stop-color="#4a5168"/></radialGradient>
    <radialGradient id="cassGlow"><stop offset="0" stop-color="#6fe3a0" stop-opacity=".8"/><stop offset="1" stop-color="#6fe3a0" stop-opacity="0"/></radialGradient>
    <radialGradient id="leafG" cx="40%" cy="35%"><stop offset="0" stop-color="#8ef0a0"/><stop offset="1" stop-color="#1f6b3a"/></radialGradient>
    <radialGradient id="appleG" cx="35%" cy="30%"><stop offset="0" stop-color="#ffb3b3"/><stop offset=".4" stop-color="#ff4d5e"/><stop offset="1" stop-color="#9a1020"/></radialGradient></defs>
    <rect width="900" height="380" fill="url(#sky)"/>
    ${(() => { const r = seeded(11); return Array.from({ length: 70 }, () =>  `<circle cx="${(r() * 900).toFixed(0)}" cy="${(r() * 200).toFixed(0)}" r="${(r() * 1.3 + .3).toFixed(1)}" fill="#fff" opacity="${(r() * .6 + .2).toFixed(2)}"/>`).join(''); })()}
    <circle cx="95" cy="70" r="70" fill="url(#starG)"><animate attributeName="r" values="62;74;62" dur="4s" repeatCount="indefinite"/></circle>
    <path d="M0 300 Q200 260 420 290 T900 280 L900 380 L0 380 Z" fill="#12302a"/>
    <path d="M0 330 Q260 300 520 325 T900 320 L900 380 L0 380 Z" fill="#0d2420"/>
    <rect x="497" y="190" width="16" height="110" rx="5" fill="#5b3b25"/>
    <circle cx="470" cy="170" r="52" fill="url(#leafG)"/><circle cx="530" cy="160" r="46" fill="url(#leafG)"/><circle cx="505" cy="125" r="44" fill="url(#leafG)"/><circle cx="555" cy="205" r="34" fill="url(#leafG)"/>
    <circle cx="560" cy="262" r="15" fill="url(#appleG)"/><path d="M560 248 q2 -8 7 -10" stroke="#5b3b25" stroke-width="2.5" fill="none"/>
    <g transform="translate(712 236)" fill="#d9c8ff" opacity=".9"><circle cx="0" cy="-28" r="16"/><rect x="-20" y="-8" width="40" height="70" rx="18"/></g>
    <g fill="none" stroke="#dfe8f5" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"><path d="M732 210 q30 -6 40 -30 q10 -24 40 -30"/><path d="M736 220 q36 -2 52 -26"/></g>
    ${[[260, 60], [330, 120], [240, 130], [350, 70]].map(([x, y]) => `<g transform="translate(${x} ${y})" opacity=".75"><circle cx="-9" cy="0" r="4.5" fill="#ff5d5d"/><circle r="4.5" fill="#9aa3b8"/><circle cx="9" cy="0" r="4.5" fill="#ff5d5d"/></g>`).join('')}
    <path id="j-path" d="${catmull(pts)}" fill="none" stroke="rgba(111,227,160,.35)" stroke-width="2" stroke-dasharray="4 7"/>
    <path id="j-done" d="${catmull(pts)}" fill="none" stroke="#6fe3a0" stroke-width="2.5" stroke-linecap="round"/>
    ${STOPS.map((s, i) => `<g class="j-stop" data-i="${i}" style="cursor:pointer"><circle cx="${s.x}" cy="${s.y}" r="9" fill="#0b1030" stroke="#6fe3a0" stroke-width="2"/><text x="${s.x}" y="${s.y + (i === 3 ? 34 : i === 4 ? 82 : 28)}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" fill="#cfe9dd">${s.n}</text></g>`).join('')}
    <circle id="cass-glow" r="30" fill="url(#cassGlow)"/><g id="cass"><circle r="13" fill="url(#cassG)"/><text y="4.5" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="12" fill="#141625">C</text></g>`;
  const path = $('#j-path'), done = $('#j-done'), L = path.getTotalLength();
  const lens = STOPS.map(s => { let best = 0, bd = 1e9; for (let l = 0; l <= L; l += 2) { const p = path.getPointAtLength(l), d = (p.x - s.x) ** 2 + (p.y - s.y) ** 2; if (d < bd) { bd = d; best = l; } } return best; });
  done.setAttribute('stroke-dasharray', `${L} ${L}`);
  let cur = 0, pos = 0;
  $('#j-steps').innerHTML = STOPS.map((s, i) => `<button data-i="${i}"><b>STOP ${i + 1}</b>${s.n}</button>`).join('');
  function place(l) { const p = path.getPointAtLength(l); $('#cass').setAttribute('transform', `translate(${p.x} ${p.y})`); $('#cass-glow').setAttribute('cx', p.x); $('#cass-glow').setAttribute('cy', p.y); done.setAttribute('stroke-dashoffset', L - l); }
  function go(i) {
    i = clamp(i, 0, STOPS.length - 1); const from = pos, to = lens[i]; cur = i; const s = STOPS[i];
    $('#j-title').textContent = s.t; $('#j-eq').textContent = s.eq; $('#j-text').textContent = s.d;
    $$('#j-steps button').forEach((b, k) => b.classList.toggle('on', k === i));
    $('#j-prev').disabled = i === 0; $('#j-next').textContent = i === STOPS.length - 1 ? '↺ Start again' : 'Next stop →';
    tween(reduceMotion ? 10 : 1200, k => { pos = lerp(from, to, ease(k)); place(pos); });
  }
  $('#j-next').addEventListener('click', () => go(cur === STOPS.length - 1 ? 0 : cur + 1));
  $('#j-prev').addEventListener('click', () => go(cur - 1));
  $('#j-steps').addEventListener('click', e => { const b = e.target.closest('button'); if (b) go(+b.dataset.i); });
  svg.addEventListener('click', e => { const g = e.target.closest('.j-stop'); if (g) go(+g.dataset.i); });
  place(0); go(0);
}

/* =========================================================
   FINALE
   ========================================================= */
function finale() {
  const c = $('#finale-canvas'); const rnd = seeded(77);
  const E = Array.from({ length: 90 }, () => ({ a: rnd() * TAU, r: .15 + rnd() * .85, s: (.05 + rnd() * .2) * (rnd() < .5 ? -1 : 1), tilt: rnd() * Math.PI }));
  let boost = 0;
  animate(c, (dt, t) => {
    const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); boost = Math.max(0, boost - dt * .3);
    const cx = w / 2, cy = h * .35, R = Math.max(w, h) * .55;
    for (const e of E) { if (!reduceMotion) e.a += e.s * dt * (1 + boost * 6); const x = cx + Math.cos(e.a) * e.r * R, y = cy + Math.sin(e.a) * e.r * R * .45 * Math.cos(e.tilt) + Math.sin(e.a) * e.r * R * .2 * Math.sin(e.tilt); ctx.globalAlpha = .25 + .5 * (1 - e.r); glow(ctx, x, y, 10 + boost * 10, '#5ce1e6', 1); ball(ctx, '#5ce1e6', x, y, 2); }
    ctx.globalAlpha = 1;
  });
  $('#reveal-btn').addEventListener('click', () => {
    const cu = $('#culprit'); cu.classList.add('show'); boost = 1;
    $('#reveal-btn').style.display = 'none';
    if (solved.size < 9) cu.insertAdjacentHTML('afterbegin', `<p class="hint">You named the culprit with ${solved.size} of 9 clues. Go back and collect the rest to see the whole chain of evidence.</p>`);
    setTimeout(() => cu.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }), 60);
  });
}

/* =========================================================
   MIRACLE ART
   ========================================================= */
const ART = {
  sweat: `<svg viewBox="0 0 140 140"><defs><radialGradient id="sk" cx="40%" cy="35%"><stop offset="0" stop-color="#ffd9b8"/><stop offset="1" stop-color="#c98a5e"/></radialGradient></defs><circle cx="70" cy="80" r="44" fill="url(#sk)"/><path d="M58 72a4 4 0 0 1 0 0" /><g fill="#9fe6ff"><path d="M48 70 q4 -9 8 0 a4 4 0 0 1 -8 0z"/><path d="M84 92 q4 -9 8 0 a4 4 0 0 1 -8 0z"/><path d="M70 100 q3 -7 6 0 a3 3 0 0 1 -6 0z"/></g><g fill="none" stroke="#5ce1e6" stroke-width="2" stroke-linecap="round" opacity=".8"><path d="M52 56 q-6 -10 0 -18"/><path d="M88 80 q6 -12 0 -26 q-5 -10 2 -20"/><path d="M72 88 q-5 -12 0 -24"/></g><g fill="#5ce1e6"><circle cx="52" cy="30" r="3"/><circle cx="92" cy="22" r="3"/><circle cx="70" cy="50" r="2.5"/></g></svg>`,
  hand: `<svg viewBox="0 0 140 140"><rect x="10" y="96" width="120" height="14" rx="4" fill="#6b4a32"/><g fill="#5ce1e6" opacity=".5">${Array.from({ length: 12 }, (_, i) => `<circle cx="${16 + i * 10}" cy="92" r="3"/>`).join('')}</g><g fill="#ff9fbd" opacity=".6">${Array.from({ length: 10 }, (_, i) => `<circle cx="${26 + i * 10}" cy="80" r="3"/>`).join('')}</g><path d="M30 76 q0 -30 10 -40 q6 -4 8 4 l2 18 l4 -34 q4 -8 9 0 l2 30 l4 -34 q5 -7 9 0 l1 34 l5 -26 q5 -6 8 2 l-2 46 z" fill="#ffd2b0"/><g stroke="#f4c35a" stroke-width="1.5" stroke-dasharray="2 3"><path d="M20 86h100"/></g><text x="70" y="128" text-anchor="middle" font-family="JetBrains Mono" font-size="9" fill="#f4c35a">repulsion gap</text></svg>`,
  neon: `<svg viewBox="0 0 140 140"><g stroke-width="3" fill="none" stroke-linecap="round">${[['#ff5d5d', 40, 50], ['#f4c35a', 90, 40], ['#6fe3a0', 60, 90], ['#5ce1e6', 100, 95], ['#a78bfa', 30, 100]].map(([c, x, y]) => `<g stroke="${c}" style="filter:drop-shadow(0 0 4px ${c})">${Array.from({ length: 10 }, (_, i) => { const a = i / 10 * TAU; return `<path d="M${x} ${y} l${(Math.cos(a) * 22).toFixed(1)} ${(Math.sin(a) * 22).toFixed(1)}"/>`; }).join('')}</g>`).join('')}</g></svg>`,
  salt: `<svg viewBox="0 0 140 140"><g transform="translate(70 72)">${(() => { let s = ''; for (let z = 2; z >= 0; z--) for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) { const px = (x - 1) * 22 + (z - 1) * 11, py = (y - 1) * 22 - (z - 1) * 11; const na = (x + y + z) % 2; s += `<circle cx="${px}" cy="${py}" r="${na ? 7 : 10}" fill="${na ? '#b38cff' : '#6fe3a0'}" stroke="rgba(0,0,0,.4)"/>`; } return s; })()}</g></svg>`,
  lake: `<svg viewBox="0 0 140 140"><defs><linearGradient id="lk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d6fb3"/><stop offset="1" stop-color="#0b2a55"/></linearGradient></defs><path d="M6 44 h128 v80 q-64 14 -128 0z" fill="url(#lk)"/><rect x="6" y="36" width="128" height="14" rx="3" fill="#dff5ff" opacity=".9"/><text x="70" y="47" text-anchor="middle" font-family="JetBrains Mono" font-size="9" fill="#2d6fb3">ICE 0 °C</text><text x="70" y="118" text-anchor="middle" font-family="JetBrains Mono" font-size="9" fill="#9fe6ff">4 °C</text><g fill="#f4c35a"><path d="M50 84 q10 -8 20 0 q-10 8 -20 0z M70 84 l8 -6 v12z"/><path d="M84 100 q7 -5 14 0 q-7 5 -14 0z M98 100 l5 -4 v8z" opacity=".7"/></g><g fill="#fff" opacity=".6"><circle cx="40" cy="70" r="2"/><circle cx="44" cy="62" r="1.5"/></g></svg>`,
  tree: `<svg viewBox="0 0 140 140"><rect x="64" y="70" width="12" height="54" rx="4" fill="#6b4a32"/><circle cx="70" cy="56" r="34" fill="#2f8a4f"/><circle cx="50" cy="66" r="22" fill="#3aa35e"/><circle cx="92" cy="64" r="22" fill="#3aa35e"/>${[[20, 24], [112, 18], [30, 98], [116, 96]].map(([x, y]) => `<g transform="translate(${x} ${y})"><circle cx="-6" r="3.5" fill="#ff5d5d"/><circle r="3.5" fill="#9aa3b8"/><circle cx="6" r="3.5" fill="#ff5d5d"/></g>`).join('')}<g stroke="#6fe3a0" stroke-width="1.5" fill="none" stroke-dasharray="2 3" opacity=".7"><path d="M26 28 q14 8 22 22"/><path d="M106 24 q-10 10 -16 22"/></g></svg>`,
  enzyme: `<svg viewBox="0 0 140 140"><path d="M20 90 q0 -50 50 -50 q50 0 50 50 l-30 0 l-8 -16 l-24 0 l-8 16 z" fill="#a78bfa" opacity=".85"/><path d="M58 74 h24 l8 16 h-40z" fill="#f4c35a"/><circle cx="64" cy="110" r="9" fill="#5ce1e6"/><circle cx="82" cy="112" r="7" fill="#ff9f5a"/><path d="M92 120 q14 -4 18 -18" stroke="#6fe3a0" stroke-width="2" fill="none"/><text x="70" y="62" text-anchor="middle" font-family="JetBrains Mono" font-size="9" fill="#1b1040">ENZYME</text></svg>`,
  stomach: `<svg viewBox="0 0 140 140"><path d="M56 16 q4 24 -8 40 q-26 30 6 58 q30 24 58 0 q20 -20 6 -48 q-10 -20 -34 -14 q-12 4 -16 -10 q-4 -14 -2 -26z" fill="#ff8fa8" opacity=".9"/><path d="M60 70 q20 -14 44 -4 q10 20 -4 34 q-22 16 -40 -4 q-8 -14 0 -26z" fill="#e0193f" opacity=".75"/><text x="80" y="90" text-anchor="middle" font-family="JetBrains Mono" font-size="11" fill="#fff" font-weight="600">pH 1.5</text></svg>`,
  breath: `<svg viewBox="0 0 140 140"><rect x="72" y="14" width="56" height="112" rx="6" fill="#16244d" stroke="#5a6aa0"/><ellipse cx="96" cy="70" rx="22" ry="16" fill="#dfe8f5" opacity=".35"/><g fill="#dfe8f5" opacity=".5"><circle cx="88" cy="66" r="6"/><circle cx="102" cy="74" r="7"/><circle cx="98" cy="62" r="5"/></g><circle cx="34" cy="72" r="20" fill="#ffd2b0"/><path d="M52 74 q10 -2 18 -4" stroke="#dfe8f5" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/><g transform="translate(60 104)"><circle cx="-6" r="3.5" fill="#ff5d5d"/><circle r="3.5" fill="#9aa3b8"/><circle cx="6" r="3.5" fill="#ff5d5d"/></g><g transform="translate(60 40)"><circle cx="-5" cy="3" r="2.5" fill="#eef3ff"/><circle r="3.5" fill="#ff5d5d"/><circle cx="5" cy="3" r="2.5" fill="#eef3ff"/></g></svg>`
};
function renderArt() { $$('.art[data-art]').forEach(a => { a.innerHTML = ART[a.dataset.art] || ''; }); }

/* =========================================================
   FLASHCARDS: Leitner spaced repetition
   ========================================================= */
function flashcards() {
  const DAY = 864e5, INT = [0, 0, 1, 3, 7, 30];
  let deck = store.get('deck', {});
  const card = $('#fc'), rate = $('#fc-rate');
  let queue = [], curr = null, filter = 'all', cram = false;
  const sel = $('#fc-filter');
  sel.innerHTML = `<option value="all">All case files (${CARDS.length} cards)</option>` + Object.keys(CASES).map(n => `<option value="${n}">File ${n}: ${CASES[n].title} (${CARDS.filter(c => c[0] == n).length})</option>`).join('');
  const st = i => deck[i] || { box: 1, due: 0 };
  const inFilter = i => filter === 'all' || CARDS[i][0] == filter;
  const dueList = () => CARDS.map((_, i) => i).filter(i => inFilter(i) && st(i).due <= Date.now());
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function build() { queue = shuffle(cram ? CARDS.map((_, i) => i).filter(inFilter) : dueList()); next(); }
  function boxes() {
    const counts = [0, 0, 0, 0, 0]; CARDS.forEach((_, i) => { if (inFilter(i)) counts[st(i).box - 1]++; }); const mx = Math.max(1, ...counts);
    $('#fc-boxes').innerHTML = counts.map((c, i) => `<div><span>${c}</span><i style="height:${c / mx * 80 + 2}%"></i><span>Box ${i + 1}</span></div>`).join('');
    const due = CARDS.filter((_, i) => st(i).due <= Date.now()).length; $('#due-badge').textContent = due; $('#due-badge').style.display = due ? '' : 'none';
  }
  function next() {
    card.classList.remove('flipped'); rate.classList.remove('show');
    boxes();
    if (!queue.length) {
      curr = null; $('#fc-tag').textContent = 'All caught up'; $('#fc-box').textContent = '';
      $('#fc-q').innerHTML = cram ? 'Cram session complete. Nicely done.' : 'No cards due right now. Come back tomorrow: the gap is what makes it stick.';
      $('#fc-a').innerHTML = 'Spacing beats cramming. Each successful recall after a gap strengthens the memory more than the last.';
      $('#fc-status').textContent = 'Nothing due'; return;
    }
    curr = queue[0]; const C = CARDS[curr];
    $('#fc-tag').textContent = `File ${C[0]} · ${CASES[C[0]].title}`; $('#fc-box').textContent = `BOX ${st(curr).box}`;
    // swap text after flip-back completes so the answer never flashes
    setTimeout(() => { $('#fc-q').innerHTML = C[1]; $('#fc-a').innerHTML = C[2]; }, card.dataset.was ? 250 : 0); card.dataset.was = 1;
    $('#fc-status').textContent = `${queue.length} card${queue.length > 1 ? 's' : ''} left in this session`;
  }
  function flip() { if (curr == null) return; card.classList.toggle('flipped'); if (card.classList.contains('flipped')) rate.classList.add('show'); }
  function grade(g) {
    if (curr == null || !card.classList.contains('flipped')) return;
    const s = st(curr); let box = s.box, due;
    if (g === 1) { box = 1; due = Date.now(); }
    else if (g === 2) { due = Date.now() + Math.max(6e5, INT[box] * DAY / 2); }
    else { box = Math.min(5, box + 1); due = Date.now() + INT[box] * DAY; }
    deck[curr] = { box, due };
    store.set('deck', deck);
    queue.shift(); if (g === 1) queue.splice(Math.min(queue.length, 3), 0, curr);
    next();
  }
  card.addEventListener('click', flip);
  card.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } });
  document.addEventListener('keydown', e => { const a = document.activeElement; if (a !== card && !rate.contains(a)) return; if (['1', '2', '3'].includes(e.key)) grade(+e.key); });
  rate.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { grade(+b.dataset.r); card.focus({ preventScroll: true }); } });
  sel.addEventListener('change', () => { filter = sel.value; cram = false; build(); });
  $('#fc-cram').addEventListener('click', () => { cram = true; build(); });
  $('#fc-resetdeck').addEventListener('click', () => { if (!confirm('Reset all flashcard progress?')) return; deck = {}; store.set('deck', deck); cram = false; build(); });
  build();
}

/* =========================================================
   FINAL INTERROGATION: interleaved + confidence
   ========================================================= */
function interrogation() {
  const box = $('#fi');
  const bank = []; Object.keys(QUIZ).forEach(n => QUIZ[n].forEach(q => bank.push({ ...q, c: +n }))); EXTRA_Q.forEach(q => bank.push(q));
  let qs = [], i = 0, log = [];
  function start() {
    // interleave: one from each case where possible, shuffled
    const byCase = {}; bank.forEach(q => (byCase[q.c] = byCase[q.c] || []).push(q));
    qs = Object.values(byCase).map(a => a[Math.floor(Math.random() * a.length)]);
    const rest = bank.filter(q => !qs.includes(q)).sort(() => Math.random() - .5).slice(0, 3);
    qs = qs.concat(rest).sort(() => Math.random() - .5); i = 0; log = []; show();
  }
  function show() {
    if (i >= qs.length) return summary();
    const q = qs[i]; let picked = null;
    box.innerHTML = `<div class="meta" style="margin-bottom:10px">QUESTION ${i + 1} OF ${qs.length} · FROM CASE FILE ${String(q.c).padStart(2, '0')}</div><div style="height:4px;border-radius:4px;background:rgba(255,255,255,.06);margin-bottom:18px;overflow:hidden"><div style="height:100%;width:${i / qs.length * 100}%;background:linear-gradient(90deg,var(--violet),var(--gold))"></div></div>
      <p class="qt" style="font-size:19px;font-family:var(--display);margin-bottom:14px">${q.q}</p><div class="opts">${q.o.map((o, k) => `<button class="opt" data-i="${k}">${o}</button>`).join('')}</div>
      <div class="conf"><span>How sure are you?</span><button class="btn small" data-c="0">Just guessing</button><button class="btn small" data-c="1">Fairly sure</button><button class="btn small" data-c="2">Certain</button></div><div class="fb"></div><div class="controls" style="display:none" id="fi-next"><button class="btn primary small">${i === qs.length - 1 ? 'See my report' : 'Next question →'}</button></div>`;
    $$('.opt', box).forEach(b => b.addEventListener('click', () => { if (picked !== null && box.querySelector('.conf').dataset.locked) return; picked = +b.dataset.i; $$('.opt', box).forEach(x => x.classList.toggle('on', x === b)); $$('.opt', box).forEach(x => x.style.borderColor = x === b ? 'var(--violet)' : ''); box.querySelector('.conf').classList.add('show'); }));
    $$('.conf .btn', box).forEach(b => b.addEventListener('click', () => {
      const conf = box.querySelector('.conf'); if (conf.dataset.locked) return; conf.dataset.locked = 1;
      const ok = picked === q.a; log.push({ ok, conf: +b.dataset.c });
      $$('.conf .btn', box).forEach(x => x.classList.toggle('on', x === b));
      $$('.opt', box).forEach(x => { x.disabled = true; x.style.borderColor = ''; const k = +x.dataset.i; if (k === q.a) x.classList.add('right'); else if (k === picked) x.classList.add('wrong'); });
      const fb = box.querySelector('.fb'); fb.className = 'fb show ' + (ok ? 'good' : 'bad'); fb.innerHTML = `<b>${ok ? 'Correct.' : 'Not this time.'}</b> ${q.w}`;
      const nx = $('#fi-next'); nx.style.display = 'flex'; nx.querySelector('button').addEventListener('click', () => { i++; show(); });
    }));
  }
  function summary() {
    const right = log.filter(l => l.ok).length; const sure = log.filter(l => l.conf === 2), sureRight = sure.filter(l => l.ok).length; const guess = log.filter(l => l.conf === 0), guessRight = guess.filter(l => l.ok).length;
    let calib = '';
    if (sure.length && sureRight / sure.length < .75) calib = 'When you felt <b>certain</b>, you were wrong more often than you expected. That\'s the most valuable thing to discover: those are the ideas to revisit.';
    else if (guess.length && guessRight / guess.length > .6) calib = 'You got many of your <b>guesses</b> right. You know more than you think! Trust your reasoning a little more.';
    else calib = 'Your confidence matched your accuracy well. That\'s good self-knowledge, known as metacognition.';
    box.innerHTML = `<h4 style="font-size:28px">Interrogation report</h4><div class="result-grid"><div><b>${right}/${log.length}</b><small>correct</small></div><div><b>${sure.length ? Math.round(sureRight / sure.length * 100) + '%' : '–'}</b><small>right when “certain”</small></div><div><b>${guess.length ? Math.round(guessRight / guess.length * 100) + '%' : '–'}</b><small>right when “guessing”</small></div></div><p style="color:var(--soft)">${calib}</p><p class="hint">Questions were deliberately shuffled across topics (interleaving). It feels harder than practising one topic at a time, and that's exactly why it works better.</p><button class="btn primary small" id="fi-again">Interrogate me again</button>`;
    $('#fi-again').addEventListener('click', start);
  }
  $('#fi-start').addEventListener('click', start);
  start();
}

/* =========================================================
   NAVIGATION, REVEALS, INIT
   ========================================================= */
document.addEventListener('click', e => { const d = document.querySelector('.courses'); if (d && d.open && !d.contains(e.target)) d.open = false; });
function nav() {
  const prog = $('#progress');
  const onScroll = () => { const h = document.documentElement; prog.style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + '%'; };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const secs = $$('#rail a').map(a => document.getElementById(a.dataset.sec)).filter(Boolean);
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) $$('#rail a').forEach(a => a.classList.toggle('active', a.dataset.sec === e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach(s => io.observe(s));
  const rio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach(el => rio.observe(el));
}
function init() {
  renderLensIcons(); buildBoard(); renderArt(); buildMysteries(); buildQuizzes(); buildFeynman(); buildVerdicts(); buildColdCases();
  renderAvatars(); updateEvidence(); nav();
  const labs = [hero, zoomLab, statesLab, rutherfordLab, builderLab, ptLab, ionicLab, molLab, waterLab, balanceLab, rateLab, phLab, journeyLab, finale, flashcards, interrogation];
  labs.forEach(fn => { try { fn(); } catch (err) { console.error(fn.name, err); } });
  renderAvatars();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
</script>
</body>
</html>
