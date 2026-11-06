
/* =========================================================
   CASE 3: periodic table
   ========================================================= */
const PT_SYM = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');
const PT_NAME = 'Hydrogen Helium Lithium Beryllium Boron Carbon Nitrogen Oxygen Fluorine Neon Sodium Magnesium Aluminium Silicon Phosphorus Sulfur Chlorine Argon Potassium Calcium Scandium Titanium Vanadium Chromium Manganese Iron Cobalt Nickel Copper Zinc Gallium Germanium Arsenic Selenium Bromine Krypton Rubidium Strontium Yttrium Zirconium Niobium Molybdenum Technetium Ruthenium Rhodium Palladium Silver Cadmium Indium Tin Antimony Tellurium Iodine Xenon Caesium Barium Lanthanum Cerium Praseodymium Neodymium Promethium Samarium Europium Gadolinium Terbium Dysprosium Holmium Erbium Thulium Ytterbium Lutetium Hafnium Tantalum Tungsten Rhenium Osmium Iridium Platinum Gold Mercury Thallium Lead Bismuth Polonium Astatine Radon Francium Radium Actinium Thorium Protactinium Uranium Neptunium Plutonium Americium Curium Berkelium Californium Einsteinium Fermium Mendelevium Nobelium Lawrencium Rutherfordium Dubnium Seaborgium Bohrium Hassium Meitnerium Darmstadtium Roentgenium Copernicium Nihonium Flerovium Moscovium Livermorium Tennessine Oganesson'.split(' ');
const FAM = {
  alkali: ['Alkali metals', '#ff6b6b', 'One outer electron, desperate to give it away. Soft, shiny and violently reactive: they fizz or explode in water.'],
  alkaline: ['Alkaline earth metals', '#ff9f5a', 'Two outer electrons to give. Reactive, but calmer than their alkali cousins. Calcium builds your bones.'],
  transition: ['Transition metals', '#e9c46a', 'The sturdy middle of the table: iron, copper, gold. Hard, shiny, great conductors, and often colourful in compounds.'],
  post: ['Other metals', '#7fc8a9', 'Softer metals like aluminium, tin and lead, sitting between the transition metals and the metalloids.'],
  metalloid: ['Metalloids', '#5ce1e6', 'Half metal, half not. Silicon is the most famous: the heart of every computer chip.'],
  nonmetal: ['Other non-metals', '#6fe3a0', 'The elements of life: carbon, nitrogen, oxygen, phosphorus, sulfur, plus hydrogen. They share electrons to make molecules.'],
  halogen: ['Halogens', '#c6f36b', 'Seven outer electrons, one short of full, so they grab. Very reactive. Their name means "salt-makers".'],
  noble: ['Noble gases', '#a78bfa', 'Full outer shells. The aristocrats of the table, they almost never react with anyone.'],
  lanth: ['Lanthanides', '#ff8fc8', 'The "rare earths". Hidden in the magnets of headphones, wind turbines and electric motors.'],
  act: ['Actinides', '#d77ab0', 'All radioactive. Uranium and plutonium power nuclear reactors.']
};
function famOf(z) {
  if ([3, 11, 19, 37, 55, 87].includes(z)) return 'alkali';
  if ([4, 12, 20, 38, 56, 88].includes(z)) return 'alkaline';
  if ([2, 10, 18, 36, 54, 86, 118].includes(z)) return 'noble';
  if ([9, 17, 35, 53, 85, 117].includes(z)) return 'halogen';
  if ([1, 6, 7, 8, 15, 16, 34].includes(z)) return 'nonmetal';
  if ([5, 14, 32, 33, 51, 52].includes(z)) return 'metalloid';
  if ([13, 31, 49, 50, 81, 82, 83, 84, 113, 114, 115, 116].includes(z)) return 'post';
  if (z >= 57 && z <= 71) return 'lanth';
  if (z >= 89 && z <= 103) return 'act';
  return 'transition';
}
function ptPos(z) {
  if (z === 1) return [1, 1]; if (z === 2) return [1, 18];
  if (z <= 4) return [2, z - 2]; if (z <= 10) return [2, z + 8];
  if (z <= 12) return [3, z - 10]; if (z <= 18) return [3, z];
  if (z <= 36) return [4, z - 18]; if (z <= 54) return [5, z - 36];
  if (z <= 56) return [6, z - 54]; if (z <= 71) return [9, z - 54]; if (z <= 86) return [6, z - 68];
  if (z <= 88) return [7, z - 86]; if (z <= 103) return [10, z - 86]; return [7, z - 100];
}
const PT_FACT = {
  1: 'Meet <b>Hal</b>. The fuel of every star, and two of him sit in every water molecule.', 2: 'Meet <b>Helia</b>. A full shell makes her aloof. Formed in the Big Bang, and so light she escapes Earth\'s gravity.',
  3: 'Powers the rechargeable battery in your phone.', 6: 'Meet <b>Cass</b>. Four hands to build with, which makes her the backbone of every living thing.', 7: 'Meet <b>Nate</b>. 78% of the air, but his triple bond makes him lazy and slow to react.',
  8: 'Meet <b>Ola</b>. The electron thief. She makes fire burn, iron rust, and keeps you alive.', 9: 'The greediest electron-grabber of all. As fluoride, it hardens your teeth.', 10: 'Glows red-orange when electricity passes through it: the original neon sign.',
  11: 'Meet <b>Sid</b>. One spare electron. Explodes in water; half of your table salt.', 12: 'Burns with a dazzling white light and sits at the centre of chlorophyll.', 13: 'Foil, cans and aircraft. It protects itself with an invisible oxide skin.',
  14: 'Sand and glass, and every computer chip on Earth.', 15: 'Holds your DNA together and makes match heads ignite.', 16: 'The smell of rotten eggs, struck matches and volcanoes.', 17: 'Meet <b>Clo</b>. A poisonous green gas that cleans swimming pools.',
  18: 'About 1% of the air. Used to protect hot filaments in lightbulbs.', 19: 'Even more reckless than sodium. Bananas are rich in its ions.', 20: 'Bones, teeth, chalk and seashells.',
  21: 'One of <b>Mendeleev\'s gaps</b>: he predicted "eka-boron" in 1871, and scandium was found in 1879.', 22: 'Strong and light, used in hip implants. Its oxide makes sunscreen and paint white.',
  26: 'Meet <b>Ferro</b>. Carries oxygen in your blood. Rusts when oxygen steals his electrons.', 29: 'Wires everywhere. It turned the Statue of Liberty green.', 30: 'Coats steel to stop it rusting (galvanising).',
  31: 'One of <b>Mendeleev\'s gaps</b> ("eka-aluminium"). It melts in your hand at 30 °C.', 32: 'One of <b>Mendeleev\'s gaps</b> ("eka-silicon"). His predictions of its weight and density were almost perfect.',
  47: 'Conducts electricity better than any other element. Used in mirrors and old photographic film.', 50: 'Tin cans (mostly steel with a thin coat of tin).', 53: 'Added to salt because your thyroid gland needs it.',
  74: 'The highest melting point of any metal: 3,422 °C. Old lightbulb filaments.', 78: 'The catalyst in a car\'s exhaust system.', 79: 'Meet <b>Goldie</b>. Holds her electrons so tightly that nothing can tarnish her.',
  80: 'The only metal that is liquid at room temperature.', 82: 'Romans made water pipes from it. Its Latin name, <i>plumbum</i>, gave us the word "plumber".', 86: 'A radioactive gas that seeps from some rocks.',
  92: 'Fuel for nuclear power stations.', 101: 'Named after Dmitri Mendeleev himself.', 118: 'The heaviest element ever made. Only a handful of its atoms have ever existed.'
};
function ptLab() {
  const grid = $('#ptable'); let gapsOn = false, famFilter = null, sel = 8;
  let html = '';
  for (let z = 1; z <= 118; z++) {
    const [r, cc] = ptPos(z), f = famOf(z), col = FAM[f][1];
    html += `<button class="el" data-z="${z}" data-f="${f}" style="grid-row:${r};grid-column:${cc};background:${rgba(col, .16)};border-color:${rgba(col, .35)};color:${shade(col, .35)}" aria-label="${PT_NAME[z - 1]}"><span class="z">${z}</span><span class="s">${PT_SYM[z - 1]}</span></button>`;
  }
  html += `<div class="el ph" style="grid-row:6;grid-column:3;font-size:8px">57–71</div><div class="el ph" style="grid-row:7;grid-column:3;font-size:8px">89–103</div><div style="grid-row:8;grid-column:1/-1;height:6px"></div>`;
  grid.innerHTML = html;
  $('#fam-btns').innerHTML = Object.entries(FAM).map(([k, v]) => `<button data-f="${k}"><i style="background:${v[1]}"></i>${v[0]}</button>`).join('');
  function apply() { $$('.el[data-z]', grid).forEach(e => { const z = +e.dataset.z; e.classList.toggle('dim', (famFilter && e.dataset.f !== famFilter) || (gapsOn && ![21, 31, 32].includes(z))); e.classList.toggle('gap', gapsOn && [21, 31, 32].includes(z)); e.classList.toggle('sel', z === sel); }); }
  function show(z) {
    sel = z; const f = famOf(z), col = FAM[f][1]; const [row, group] = ptPos(z);
    const castKey = Object.keys(CAST).find(k => k === PT_SYM[z - 1]);
    $('#pt-card').innerHTML = `<div class="pt-big" style="background:${rgba(col, .2)};border:1px solid ${rgba(col, .55)};color:${shade(col, .4)}"><span class="z">${z}</span><span class="s">${PT_SYM[z - 1]}</span><span class="n">${PT_NAME[z - 1]}</span></div><div><div class="meta" style="color:${col}">${FAM[f][0].toUpperCase()}${row <= 7 ? ` · PERIOD ${row}` : ''}</div><h4 style="font-size:26px;margin:2px 0 6px;display:flex;align-items:center;gap:10px">${PT_NAME[z - 1]} ${castKey ? avatarSVG(castKey, 'happy', 36) : ''}</h4><p style="margin:0 0 6px;font-size:15px;color:var(--soft)">${PT_FACT[z] || `Element number ${z}: every atom of it has exactly ${z} protons.`}</p><p style="margin:0;font-size:13.5px;color:var(--muted)">${FAM[f][2]}</p></div>`;
    apply();
  }
  grid.addEventListener('click', e => { const b = e.target.closest('.el[data-z]'); if (b) show(+b.dataset.z); });
  $('#fam-btns').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; famFilter = famFilter === b.dataset.f ? null : b.dataset.f; $$('#fam-btns button').forEach(x => x.classList.toggle('on', x.dataset.f === famFilter)); gapsOn = false; $('#gaps-btn').classList.remove('on'); apply(); });
  $('#gaps-btn').addEventListener('click', () => { gapsOn = !gapsOn; $('#gaps-btn').classList.toggle('on', gapsOn); famFilter = null; $$('#fam-btns button').forEach(x => x.classList.remove('on')); if (gapsOn) show(31); else apply(); });
  show(8);
}

/* =========================================================
   CASE 4a: ionic bond animation
   ========================================================= */
function ionicLab() {
  const svg = $('#ionic-svg'); let busy = false;
  function build() {
    svg.innerHTML = `<defs>
      <radialGradient id="naG" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#cdb4ff"/><stop offset="1" stop-color="#5b3aa0"/></radialGradient>
      <radialGradient id="clG" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#9ff0c0"/><stop offset="1" stop-color="#1f7a4a"/></radialGradient>
      <radialGradient id="elG" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="#5ce1e6"/><stop offset="1" stop-color="#1b7e88"/></radialGradient>
      <radialGradient id="elGlow"><stop offset="0" stop-color="#5ce1e6" stop-opacity=".7"/><stop offset="1" stop-color="#5ce1e6" stop-opacity="0"/></radialGradient></defs>
      <g id="na" transform="translate(190 150)">
        <circle r="70" fill="none" stroke="rgba(179,140,255,.45)" stroke-dasharray="3 5" id="na-ring"/>
        <g id="na-full" opacity="0"><circle r="50" fill="none" stroke="rgba(179,140,255,.7)"/>${Array.from({ length: 8 }, (_, i) => `<circle cx="${(Math.cos(i * TAU / 8) * 50).toFixed(1)}" cy="${(Math.sin(i * TAU / 8) * 50).toFixed(1)}" r="4" fill="url(#elG)"/>`).join('')}</g>
        <circle r="34" fill="url(#naG)"/><text y="6" text-anchor="middle" font-family="Fraunces,serif" font-size="22" fill="#1b1030" id="na-lbl">Na</text>
        <g id="na-badge" opacity="0"><circle cx="30" cy="-30" r="13" fill="#ff6b9a"/><text x="30" y="-25" text-anchor="middle" font-size="16" font-weight="700" fill="#fff">+</text></g>
      </g>
      <g id="cl" transform="translate(450 150)">
        <circle r="62" fill="none" stroke="rgba(111,227,160,.5)" stroke-dasharray="3 5"/>
        ${Array.from({ length: 8 }, (_, i) => i === 4 ? '' : `<circle cx="${(Math.cos(i * TAU / 8) * 62).toFixed(1)}" cy="${(Math.sin(i * TAU / 8) * 62).toFixed(1)}" r="5" fill="url(#elG)"/>`).join('')}
        <circle cx="-62" cy="0" r="7" fill="none" stroke="rgba(255,255,255,.5)" stroke-dasharray="2 3" id="cl-gap"/>
        <circle r="40" fill="url(#clG)"/><text y="6" text-anchor="middle" font-family="Fraunces,serif" font-size="22" fill="#0b2a18" id="cl-lbl">Cl</text>
        <g id="cl-badge" opacity="0"><circle cx="34" cy="-34" r="13" fill="#6b8cff"/><text x="34" y="-29" text-anchor="middle" font-size="18" font-weight="700" fill="#fff">−</text></g>
      </g>
      <circle id="ion-e-glow" cx="260" cy="150" r="18" fill="url(#elGlow)"/><circle id="ion-e" cx="260" cy="150" r="6" fill="url(#elG)"/>
      <text x="190" y="270" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" fill="#8f8eab" id="na-cap">sodium · 11 electrons</text>
      <text x="450" y="270" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" fill="#8f8eab" id="cl-cap">chlorine · 17 electrons</text>
      <path id="bond-line" d="M245 150 L395 150" stroke="#f4c35a" stroke-width="2" stroke-dasharray="4 6" opacity="0"/>`;
  }
  build();
  const msg = $('#ionic-msg');
  $('#ionic-reset').addEventListener('click', () => { if (busy) return; build(); msg.innerHTML = 'Sodium (2, 8, <b>1</b>) and chlorine (2, 8, <b>7</b>). Only the outer shells are drawn in full.'; });
  $('#ionic-go').addEventListener('click', () => {
    if (busy) return; build(); busy = true;
    const e = $('#ion-e'), eg = $('#ion-e-glow');
    msg.innerHTML = 'Sid\'s lonely outer electron is pulled across by chlorine\'s stronger grip…';
    tween(reduceMotion ? 10 : 1600, k => { const t = ease(k); const x = (1 - t) * (1 - t) * 260 + 2 * (1 - t) * t * 324 + t * t * 388, y = (1 - t) * (1 - t) * 150 + 2 * (1 - t) * t * 40 + t * t * 150; e.setAttribute('cx', x); e.setAttribute('cy', y); eg.setAttribute('cx', x); eg.setAttribute('cy', y); }, () => {
      $('#cl-gap').setAttribute('opacity', 0);
      tween(reduceMotion ? 10 : 800, k => { $('#na-ring').setAttribute('opacity', 1 - k); $('#na-full').setAttribute('opacity', k); $('#na-badge').setAttribute('opacity', k); $('#cl-badge').setAttribute('opacity', k); }, () => {
        $('#na-lbl').textContent = 'Na⁺'; $('#cl-lbl').textContent = 'Cl⁻'; $('#na-cap').textContent = 'sodium ion · 10 e⁻ · full shell'; $('#cl-cap').textContent = 'chloride ion · 18 e⁻ · full shell';
        msg.innerHTML = 'Both now have a full outer shell of eight. But sodium is now <b style="color:var(--pink)">positive</b> and chlorine <b style="color:var(--blue)">negative</b>, and opposite charges attract…';
        const na = $('#na'), cl = $('#cl');
        tween(reduceMotion ? 10 : 1200, k => { const t = ease(k); na.setAttribute('transform', `translate(${190 + 62 * t} 150)`); cl.setAttribute('transform', `translate(${450 - 62 * t} 150)`); e.setAttribute('cx', 388 - 62 * t); eg.setAttribute('cx', 388 - 62 * t); }, () => {
          msg.innerHTML = '<b style="color:var(--gold)">An ionic bond.</b> Na⁺ and Cl⁻ are locked together by electric attraction. Spin the “Salt crystal” in the viewer below to see billions of them stacked.'; busy = false;
        });
      });
    });
  });
}

/* =========================================================
   CASE 4b: 3D molecule viewer
   ========================================================= */
const ATOM = { H: ['#eef3ff', .31], C: ['#8d95ab', .55], N: ['#6b8cff', .52], O: ['#ff5d5d', .5], Na: ['#b38cff', .5], Cl: ['#6fe3a0', .72] };
const MOLS = (() => {
  const salt = { atoms: [], bonds: [] };
  for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) for (let z = 0; z < 3; z++) salt.atoms.push([(x + y + z) % 2 ? 'Cl' : 'Na', (x - 1) * 1.6, (y - 1) * 1.6, (z - 1) * 1.6]);
  salt.atoms.forEach((a, i) => salt.atoms.forEach((b, j) => { if (j > i && Math.abs(Math.hypot(a[1] - b[1], a[2] - b[2], a[3] - b[3]) - 1.6) < .01) salt.bonds.push([i, j, 0]); }));
  return {
    water: { name: 'Water', f: 'H₂O', d: 'Ola holds two Hals at a 104.5° angle, sharing one electron pair with each but pulling the electrons towards herself. Bent and polar, this is the most important molecule for life.', atoms: [['O', 0, 0, 0], ['H', .757, .586, 0], ['H', -.757, .586, 0]], bonds: [[0, 1, 1], [0, 2, 1]] },
    co2: { name: 'Carbon dioxide', f: 'CO₂', d: 'Cass shares two pairs (a double bond) with each oxygen. It\'s perfectly straight, so its charges cancel. You breathe out about a kilogram of it every day.', atoms: [['C', 0, 0, 0], ['O', 1.16, 0, 0], ['O', -1.16, 0, 0]], bonds: [[0, 1, 2], [0, 2, 2]] },
    methane: { name: 'Methane', f: 'CH₄', d: 'Natural gas, the fuel of the gas stove. Carbon\'s four bonds point to the corners of a tetrahedron, as far apart as they can get.', atoms: [['C', 0, 0, 0], ['H', .63, .63, .63], ['H', -.63, -.63, .63], ['H', -.63, .63, -.63], ['H', .63, -.63, -.63]], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]] },
    ammonia: { name: 'Ammonia', f: 'NH₃', d: 'Nitrogen with three hydrogens, shaped like a little pyramid. It\'s the sharp smell in some cleaning products, and the base of fertilisers that feed half the world.', atoms: [['N', 0, 0, .12], ['H', .94, 0, -.26], ['H', -.47, .81, -.26], ['H', -.47, -.81, -.26]], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]] },
    ethanol: { name: 'Ethanol', f: 'C₂H₅OH', d: 'Two carbons in a chain, with an –OH group on the end. This is the alcohol in drinks, in hand sanitiser, and in some car fuel.', atoms: [['C', -.76, 0, 0], ['C', .76, 0, 0], ['O', 1.24, 1.33, 0], ['H', 2.19, 1.3, 0], ['H', -1.12, 1.03, 0], ['H', -1.12, -.51, .89], ['H', -1.12, -.51, -.89], ['H', 1.12, -.51, .89], ['H', 1.12, -.51, -.89]], bonds: [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 4, 1], [0, 5, 1], [0, 6, 1], [1, 7, 1], [1, 8, 1]] },
    salt: { name: 'Salt crystal', f: 'NaCl', d: 'Not a molecule but a lattice. Na⁺ (violet) and Cl⁻ (green) alternate in three directions, every ion hugged by six opposite charges. This is why salt grains are tiny cubes.', ...salt }
  };
})();
function molLab() {
  const c = $('#mol-canvas'), stage = $('#mol-stage'); let cur = 'water', rx = -.35, ry = .5, vx = 0, vy = .35, drag = null, idle = 0;
  $('#mol-pick').innerHTML = Object.entries(MOLS).map(([k, m]) => `<button data-m="${k}" class="${k === cur ? 'on' : ''}">${m.f}</button>`).join('');
  function pick(k) { cur = k; const m = MOLS[k]; $$('#mol-pick button').forEach(b => b.classList.toggle('on', b.dataset.m === k)); $('#mol-name').textContent = m.name; $('#mol-formula').textContent = m.f; $('#mol-desc').textContent = m.d; const els = [...new Set(m.atoms.map(a => a[0]))]; $('#mol-legend').innerHTML = els.map(e => `<span><i style="background:${ATOM[e][0]}"></i>${PT_NAME[PT_SYM.indexOf(e)]}</span>`).join(''); }
  $('#mol-pick').addEventListener('click', e => { const b = e.target.closest('button'); if (b) pick(b.dataset.m); });
  pick(cur);
  stage.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY }; stage.setPointerCapture(e.pointerId); });
  stage.addEventListener('pointermove', e => { if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag = { x: e.clientX, y: e.clientY }; ry += dx * .01; rx += dy * .01; vy = dx * .6; vx = dy * .6; idle = 0; });
  const up = () => { drag = null; }; stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
  animate(c, (dt) => {
    idle += dt;
    if (!drag) { ry += vy * dt; rx += vx * dt; vx *= .95; vy = lerp(vy, idle > 1.5 && !reduceMotion ? .4 : vy * .95, .03); }
    const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h);
    const m = MOLS[cur]; const maxR = Math.max(...m.atoms.map(a => Math.hypot(a[1], a[2], a[3]) + ATOM[a[0]][1]));
    const sc = Math.min(w, h) * .36 / maxR, cx = w / 2, cy = h / 2;
    const cX = Math.cos(rx), sX = Math.sin(rx), cY = Math.cos(ry), sY = Math.sin(ry);
    const P = m.atoms.map(a => { let x = a[1], y = a[2], z = a[3]; const x1 = x * cY + z * sY, z1 = -x * sY + z * cY; const y1 = y * cX - z1 * sX, z2 = y * sX + z1 * cX; const p = 7 / (7 + z2); return { e: a[0], x: cx + x1 * sc * p, y: cy + y1 * sc * p, z: z2, p }; });
    const items = [];
    m.bonds.forEach(b => items.push({ t: 'b', b, z: (P[b[0]].z + P[b[1]].z) / 2 + .001 }));
    P.forEach((p, i) => items.push({ t: 'a', i, z: p.z }));
    items.sort((a, b) => b.z - a.z);
    glow(ctx, cx, cy, Math.min(w, h) * .45, '#5ce1e6', .25);
    for (const it of items) {
      if (it.t === 'b') {
        const [i, j, ord] = it.b, A = P[i], B = P[j]; const lw = Math.max(1.5, sc * .13 * A.p);
        const dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
        const offs = ord === 2 ? [-lw * .8, lw * .8] : [0];
        ctx.lineCap = 'round';
        for (const o of offs) {
          const g = ctx.createLinearGradient(A.x, A.y, B.x, B.y); g.addColorStop(0, shade(ATOM[A.e][0], -.15)); g.addColorStop(.5, '#cfd5e6'); g.addColorStop(1, shade(ATOM[B.e][0], -.15));
          ctx.strokeStyle = ord === 0 ? 'rgba(255,255,255,.18)' : g; ctx.lineWidth = ord === 0 ? 1.5 : (ord === 2 ? lw * .7 : lw);
          ctx.beginPath(); ctx.moveTo(A.x + nx * o, A.y + ny * o); ctx.lineTo(B.x + nx * o, B.y + ny * o); ctx.stroke();
        }
      } else { const p = P[it.i]; const r = ATOM[p.e][1] * sc * p.p * (cur === 'salt' ? .75 : 1); ctx.globalAlpha = clamp(.55 + (1 - p.z / 3) * .45, .5, 1); ball(ctx, ATOM[p.e][0], p.x, p.y, r); ctx.globalAlpha = 1; }
    }
  });
}

/* =========================================================
   CASE 5: liquid vs ice
   ========================================================= */
function waterLab() {
  const c = $('#water-canvas'); let mode = 'both', phase = 0, dir = 1, hold = 0;
  $$('#water-mode button').forEach(b => b.addEventListener('click', () => { mode = b.dataset.m; $$('#water-mode button').forEach(x => x.classList.toggle('on', x === b)); phase = 0; dir = 1; hold = 0; }));
  const rnd = seeded(5);
    let cache = null;
  function setup(w, h) {
    const PW = mode === 'both' ? w / 2 - 18 : w - 24, PH = h - 50, a = Math.max(20, Math.min(PW, PH) / 7.5);
    const ice = []; const dx = a * Math.sqrt(3);
    for (let row = 0; ; row++) { const y0 = a * .6 + row * a * 1.5; if (y0 + a > PH - a * .35) break; for (let x = a * .6 + (row % 2) * dx / 2; x < PW - a * .4; x += dx) { ice.push({ x, y: y0 }); ice.push({ x, y: y0 + a }); } }
    // honeycomb neighbours
    const nb = []; ice.forEach((p, i) => ice.forEach((q, j) => { if (j > i) { const d = Math.hypot(p.x - q.x, p.y - q.y); if (d < a * 1.25) nb.push([i, j]); } }));
    ice.forEach((p, i) => { p.nb = nb.filter(e => e[0] === i || e[1] === i).map(e => e[0] === i ? e[1] : e[0]); let sx = 0, sy = 0; p.nb.slice(0, 2).forEach(k => { const q = ice[k], dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy); sx += dx / d; sy += dy / d; }); p.ang = p.nb.length ? Math.atan2(sy, sx) : i; });
    const nLiq = Math.round(ice.length * 1.3);
    const liq = []; for (let i = 0; i < nLiq; i++) liq.push({ x: a * .5 + rnd() * (PW - a), y: a * .5 + rnd() * (PH - a), a: rnd() * TAU, va: (rnd() - .5) * 2, ph: rnd() * TAU });
    const squeeze = ice.map((p, i) => ({ x: a * .4 + rnd() * (PW - a * .8), y: PH * .24 + rnd() * (PH * .76 - a * .4), a: rnd() * TAU, va: (rnd() - .5) * 2, ph: rnd() * TAU }));
    cache = { w, h, mode, PW, PH, a, ice, liq, squeeze, nb };
  }
  function relax(arr, PW, PH, minD, y0 = 0) { for (let it = 0; it < 2; it++) for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) { const p = arr[i], q = arr[j]; const dx = p.x - q.x, dy = p.y - q.y, d = Math.hypot(dx, dy) || .01; if (d < minD) { const f = (minD - d) / 2 / d; p.x += dx * f; p.y += dy * f; q.x -= dx * f; q.y -= dy * f; } } arr.forEach(p => { p.x = clamp(p.x, minD * .5, PW - minD * .5); p.y = clamp(p.y, y0 + minD * .5, PH - minD * .5); }); }
  function mol(ctx, x, y, ang, a) { const d = a * .3; ball(ctx, '#ff5d5d', x, y, a * .22); ball(ctx, '#eef3ff', x + Math.cos(ang + .91) * d, y + Math.sin(ang + .91) * d, a * .14); ball(ctx, '#eef3ff', x + Math.cos(ang - .91) * d, y + Math.sin(ang - .91) * d, a * .14); }
  function panel(ctx, ox, oy, PW, PH, title, sub) {
    ctx.save(); ctx.fillStyle = 'rgba(40,110,200,.10)'; ctx.strokeStyle = 'rgba(160,200,255,.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(ox, oy, PW, PH, 12) : ctx.rect(ox, oy, PW, PH); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.fillStyle = '#eeedf7'; ctx.font = '600 13px Inter, sans-serif'; ctx.textAlign = 'left'; ctx.fillText(title, ox + 4, oy + PH + 20); ctx.fillStyle = '#8f8eab'; ctx.font = '12px "JetBrains Mono", monospace'; ctx.fillText(sub, ox + 4, oy + PH + 36);
  }
  function drawIce(ctx, ox, oy, C, t, alpha = 1, list = null) {
    const { a, ice } = C; ctx.globalAlpha = alpha;
    ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(244,195,90,.55)'; ctx.lineWidth = 1.3;
    C.nb.forEach(([i, j]) => { const p = list ? list[i] : ice[i], q = list ? list[j] : ice[j]; ctx.beginPath(); ctx.moveTo(ox + p.x, oy + p.y); ctx.lineTo(ox + q.x, oy + q.y); ctx.stroke(); });
    ctx.setLineDash([]);
    ice.forEach((p, i) => { const q = list ? list[i] : p; const j = reduceMotion ? 0 : Math.sin(t * 6 + i) * a * .02; mol(ctx, ox + q.x + j, oy + q.y, p.ang, a); });
    ctx.globalAlpha = 1;
  }
  function stepLiquid(arr, PW, PH, a, dt, y0 = 0) { if (!reduceMotion) arr.forEach(p => { p.x += (Math.random() - .5) * a * 3 * dt + Math.sin(p.ph += dt * 2) * a * .3 * dt; p.y += (Math.random() - .5) * a * 3 * dt + Math.cos(p.ph) * a * .3 * dt; p.a += p.va * dt * 3; }); relax(arr, PW, PH, a * .72, y0); }
  function hbonds(ctx, ox, oy, arr, a, alpha = 1) { ctx.setLineDash([3, 4]); ctx.lineWidth = 1; for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) { const p = arr[i], q = arr[j], d = Math.hypot(p.x - q.x, p.y - q.y); if (d < a * .95) { ctx.strokeStyle = `rgba(244,195,90,${.35 * alpha * (1 - d / (a * .95))})`; ctx.beginPath(); ctx.moveTo(ox + p.x, oy + p.y); ctx.lineTo(ox + q.x, oy + q.y); ctx.stroke(); } } ctx.setLineDash([]); }
  animate(c, (dt, t) => {
    const { ctx, w, h } = fit(c); if (!cache || cache.w !== w || cache.h !== h || cache.mode !== mode) setup(w, h);
    const C = cache; ctx.clearRect(0, 0, w, h);
    if (mode === 'both') {
      const oy = 10, oxL = 12, oxR = w / 2 + 6;
      stepLiquid(C.liq, C.PW, C.PH, C.a, dt);
      panel(ctx, oxL, oy, C.PW, C.PH, 'Liquid water', `${C.liq.length} molecules in this box`);
      panel(ctx, oxR, oy, C.PW, C.PH, 'Ice', `${C.ice.length} molecules in the same box`);
      ctx.save(); ctx.beginPath(); ctx.rect(oxL, oy, C.PW, C.PH); ctx.clip(); hbonds(ctx, oxL, oy, C.liq, C.a); C.liq.forEach(p => mol(ctx, oxL + p.x, oy + p.y, p.a, C.a)); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.rect(oxR, oy, C.PW, C.PH); ctx.clip(); drawIce(ctx, oxR, oy, C, t); ctx.restore();
    } else {
      if (hold > 0) hold -= dt; else { phase += dir * dt / 3.2; if (phase >= 1) { phase = 1; dir = -1; hold = 2.2; } if (phase <= 0) { phase = 0; dir = 1; hold = 1.6; } }
      const k = ease(phase), ox = 12, oy = 10;
      stepLiquid(C.squeeze, C.PW, C.PH, C.a, dt, C.PH * .24);
      const pos = C.ice.map((p, i) => ({ x: lerp(C.squeeze[i].x, p.x, k), y: lerp(C.squeeze[i].y, p.y, k) }));
      const temp = Math.round(lerp(6, -8, k));
      panel(ctx, ox, oy, C.PW, C.PH, phase > .5 ? (dir < 0 && hold <= 0 ? 'Melting…' : 'Frozen: ice') : (dir > 0 && hold <= 0 ? 'Freezing…' : 'Liquid water'), `${temp} °C · the same ${C.ice.length} molecules`);
      const level = lerp(C.PH * .24, C.ice.reduce((m, p) => Math.min(m, p.y), 1e9) - C.a * .5, k);
      ctx.strokeStyle = 'rgba(92,225,230,.8)'; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(ox, oy + level); ctx.lineTo(ox + C.PW, oy + level); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#5ce1e6'; ctx.font = '12px "JetBrains Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(k > .5 ? 'ice takes up more room ↑' : 'water level', ox + C.PW - 8, oy + (level < 30 ? level + 18 : level - 8));
      ctx.save(); ctx.beginPath(); ctx.rect(ox, oy, C.PW, C.PH); ctx.clip();
      if (k > .02) { ctx.globalAlpha = k; ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(244,195,90,.6)'; ctx.lineWidth = 1.3; C.nb.forEach(([i, j]) => { ctx.beginPath(); ctx.moveTo(ox + pos[i].x, oy + pos[i].y); ctx.lineTo(ox + pos[j].x, oy + pos[j].y); ctx.stroke(); }); ctx.setLineDash([]); ctx.globalAlpha = 1; }
      hbonds(ctx, ox, oy, pos, C.a, 1 - k);
      pos.forEach((p, i) => mol(ctx, ox + p.x, oy + p.y, lerp(C.squeeze[i].a, C.ice[i].ang, k), C.a));
      ctx.restore();
    }
  });
}

/* =========================================================
   CASE 6: equation balancer
   ========================================================= */
const MINI = {
  H2: [['H', -5, 0], ['H', 5, 0]], O2: [['O', -6, 0], ['O', 6, 0]], H2O: [['O', 0, -2], ['H', -8, 5], ['H', 8, 5]],
  CH4: [['C', 0, 0], ['H', -9, 0], ['H', 9, 0], ['H', 0, -9], ['H', 0, 9]], CO2: [['O', -11, 0], ['C', 0, 0], ['O', 11, 0]], Fe: [['Fe', 0, 0]],
  Fe2O3: [['O', 0, -10], ['O', 0, 10], ['O', 15, 0], ['Fe', -6, 0], ['Fe', 7, 0]],
  C6H12O6: [...Array.from({ length: 6 }, (_, i) => ['O', Math.cos(i * TAU / 6) * 15, Math.sin(i * TAU / 6) * 15]), ...Array.from({ length: 6 }, (_, i) => ['C', Math.cos(i * TAU / 6 + .5) * 8, Math.sin(i * TAU / 6 + .5) * 8])]
};
const MINI_C = { H: ['#eef3ff', 3.4], O: ['#ff5d5d', 5], C: ['#8d95ab', 5], Fe: ['#e8925a', 6.5] };
function miniSVG(f) { const m = Math.max(12, ...MINI[f].map(([e, x, y]) => Math.max(Math.abs(x), Math.abs(y)) + MINI_C[e][1] + 1)); return `<svg viewBox="${-m} ${-m} ${2 * m} ${2 * m}" width="${Math.round(m * 1.7)}" height="${Math.round(m * 1.7)}">${MINI[f].map(([e, x, y]) => `<circle cx="${x}" cy="${y}" r="${MINI_C[e][1]}" fill="${MINI_C[e][0]}" stroke="rgba(0,0,0,.35)" stroke-width=".8"/>`).join('')}</svg>`; }
const fmtF = f => f.replace(/(\d+)/g, '<sub>$1</sub>');
const PUZZLES = [
  { name: 'The rocket', story: 'Hydrogen burning in oxygen. This reaction roared out of the Space Shuttle\'s main engines.', L: [['H2', { H: 2 }], ['O2', { O: 2 }]], R: [['H2O', { H: 2, O: 1 }]] },
  { name: 'The gas stove', story: 'Methane (natural gas) burning in your kitchen.', L: [['CH4', { C: 1, H: 4 }], ['O2', { O: 2 }]], R: [['CO2', { C: 1, O: 2 }], ['H2O', { H: 2, O: 1 }]] },
  { name: 'The rusty gate', story: 'Iron slowly stealing oxygen from the air, or rather, oxygen stealing iron\'s electrons.', L: [['Fe', { Fe: 1 }], ['O2', { O: 2 }]], R: [['Fe2O3', { Fe: 2, O: 3 }]] },
  { name: 'Your breath', story: 'Respiration: how every cell in your body burns sugar. Hard mode!', L: [['C6H12O6', { C: 6, H: 12, O: 6 }], ['O2', { O: 2 }]], R: [['CO2', { C: 1, O: 2 }], ['H2O', { H: 2, O: 1 }]] }
];
function balanceLab() {
  let pi = 0, co = []; const solvedP = new Set(store.get('balanced', []));
  $('#bal-pick').innerHTML = PUZZLES.map((p, i) => `<button data-i="${i}">${p.name}</button>`).join('');
  $('#bal-pick').addEventListener('click', e => { const b = e.target.closest('button'); if (b) load(+b.dataset.i); });
  function load(i) { pi = i; const P = PUZZLES[i]; co = Array(P.L.length + P.R.length).fill(1); $$('#bal-pick button').forEach(b => b.classList.toggle('on', +b.dataset.i === i)); $('#bal-story').textContent = P.story; render(); }
  function counts() { const P = PUZZLES[pi], L = {}, R = {}; P.L.forEach(([f, a], i) => { for (const k in a) L[k] = (L[k] || 0) + a[k] * co[i]; }); P.R.forEach(([f, a], i) => { for (const k in a) R[k] = (R[k] || 0) + a[k] * co[P.L.length + i]; }); return { L, R }; }
  function render() {
    const P = PUZZLES[pi]; let html = ''; const all = [...P.L.map(x => [x, 'L']), ...P.R.map(x => [x, 'R'])];
    all.forEach(([[f], side], i) => {
      if (i > 0) html += `<span class="op">${i === P.L.length ? '→' : '+'}</span>`;
      html += `<div class="term"><div class="coef"><button data-i="${i}" data-d="-1" aria-label="fewer">−</button><b>${co[i]}</b><button data-i="${i}" data-d="1" aria-label="more">+</button></div><div class="f">${fmtF(f)}</div><div class="mols">${Array.from({ length: Math.min(co[i], 12) }, () => miniSVG(f)).join('')}</div></div>`;
    });
    $('#bal-eq').innerHTML = html;
    const { L, R } = counts(); const els = Object.keys({ ...L, ...R }); const mx = Math.max(...els.map(e => Math.max(L[e] || 0, R[e] || 0)));
    $('#bal-tally').innerHTML = `<div class="tally-row" style="color:var(--muted);font-size:11px"><span class="cnt">left</span><span></span><span class="el-n">atom</span><span></span><span class="cnt">right</span></div>` + els.map(e => { const l = L[e] || 0, r = R[e] || 0, ok = l === r, col = ok ? 'var(--green)' : 'var(--pink)'; return `<div class="tally-row"><span class="cnt" style="color:${col}">${l}</span><span class="bar l"><i style="width:${l / mx * 100}%;background:${MINI_C[e][0]}"></i></span><span class="el-n" style="color:${MINI_C[e][0]}">${e}</span><span class="bar"><i style="width:${r / mx * 100}%;background:${MINI_C[e][0]};left:0"></i></span><span class="cnt" style="color:${col}">${r}</span></div>`; }).join('');
    const ok = els.every(e => (L[e] || 0) === (R[e] || 0));
    const g = co.reduce((a, b) => { while (b) [a, b] = [b, a % b]; return a; });
    const ban = $('#bal-banner');
    if (ok) { ban.className = 'balanced-banner ok'; ban.innerHTML = g > 1 ? `Balanced! Can you find smaller numbers? (Everything divides by ${g}.)` : '✓ Balanced. Every atom accounted for. Lavoisier would approve.'; if (g === 1 && !solvedP.has(pi)) { solvedP.add(pi); store.set('balanced', [...solvedP]); toast(`Equation solved: ${PUZZLES[pi].name}`); } }
    else { ban.className = 'balanced-banner'; ban.innerHTML = '<span style="color:var(--muted)">Not balanced yet: atoms can\'t appear or vanish.</span>'; }
    $$('#bal-pick button').forEach((b, i) => b.textContent = (solvedP.has(i) ? '✓ ' : '') + PUZZLES[i].name);
  }
  $('#bal-eq').addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (!b) return; const i = +b.dataset.i; co[i] = clamp(co[i] + +b.dataset.d, 1, 12); render(); });
  load(0);
}

/* =========================================================
   CASE 7: collision chamber
   ========================================================= */
function rateLab() {
  const c = $('#rate-canvas'), chart = $('#rate-chart'); const Ts = $('#rate-T'), Cs = $('#rate-C');
  let P = [], flashes = [], hist = [], tAcc = 0, cat = false, coll = 0, hits = 0, W = 0, H = 0, sNow = 1;
  const R = 7;
  const speedScale = () => .35 + Ts.value / 100 * 1.9;
  function gauss() { return Math.sqrt(-2 * Math.log(Math.random() + 1e-9)) * Math.cos(TAU * Math.random()); }
  function vel() { const s = 55 * speedScale(); return [gauss() * s, gauss() * s]; }
  function reset() {
    const n = +Cs.value; P = []; flashes = []; hist = []; coll = 0; hits = 0; sNow = speedScale();
    for (let i = 0; i < n * 2; i++) { const [vx, vy] = vel(); P.push({ x: 20 + Math.random() * (W - 40 || 400), y: 20 + Math.random() * (H - 40 || 300), vx, vy, t: i < n ? 'A' : 'B', r: R, m: 1 }); }
    $('#rate-C-out').textContent = `${n} + ${n}`;
  }
  Ts.addEventListener('input', () => { const s = speedScale(), k = s / sNow; sNow = s; P.forEach(p => { p.vx *= k; p.vy *= k; }); const v = +Ts.value; $('#rate-T-out').textContent = v < 25 ? 'Cold' : v < 50 ? 'Cool' : v < 75 ? 'Warm' : 'Hot'; });
  Cs.addEventListener('input', reset);
  $('#rate-reset').addEventListener('click', reset);
  $('#cat-btn').addEventListener('click', () => { cat = !cat; $('#cat-btn').classList.toggle('on', cat); $('#cat-btn').textContent = cat ? 'Catalyst added ✓' : 'Add catalyst'; });
  function drawChart() {
    const { ctx, w, h } = fit(chart); ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 1; for (let i = 0; i <= 4; i++) { const y = 6 + (h - 20) * i / 4; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    const n = +Cs.value; if (!hist.length) return; const maxT = Math.max(30, hist[hist.length - 1][0]);
    const line = (idx, col) => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); hist.forEach(([t, a, ab], i) => { const v = idx ? ab : a; const x = t / maxT * w, y = 6 + (h - 20) * (1 - v / n); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); };
    line(0, '#6b8cff'); line(1, '#6fe3a0');
    ctx.fillStyle = '#8f8eab'; ctx.font = '10px "JetBrains Mono", monospace'; ctx.fillText(`${Math.round(maxT)} s`, w - 30, h - 2); ctx.fillText('0', 0, h - 2);
  }
  animate(c, (dt, t) => {
    const { ctx, w, h } = fit(c); if (w !== W || h !== H) { const first = !W; W = w; H = h; if (first) reset(); }
    const vth = (cat ? 95 : 165);
    for (const p of P) { p.x += p.vx * dt; p.y += p.vy * dt; if (p.x < p.r) { p.x = p.r; p.vx = Math.abs(p.vx); } if (p.x > w - p.r) { p.x = w - p.r; p.vx = -Math.abs(p.vx); } if (p.y < p.r) { p.y = p.r; p.vy = Math.abs(p.vy); } if (p.y > h - p.r) { p.y = h - p.r; p.vy = -Math.abs(p.vy); } }
    for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
      const a = P[i], b = P[j]; if (a.dead || b.dead) continue; const dx = b.x - a.x, dy = b.y - a.y, rr = a.r + b.r, d2 = dx * dx + dy * dy; if (d2 >= rr * rr) continue;
      const d = Math.sqrt(d2) || .01, nx = dx / d, ny = dy / d, vrel = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
      if (vrel <= 0) continue;
      const pair = (a.t === 'A' && b.t === 'B') || (a.t === 'B' && b.t === 'A');
      if (pair) coll++;
      if (pair && vrel > vth) {
        hits++; a.dead = b.dead = true; const [vx, vy] = vel();
        P.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, vx: vx * .7, vy: vy * .7, t: 'AB', r: R * 1.35, m: 2, ang: Math.random() * TAU });
        flashes.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, life: 1, ok: true });
      } else {
        const m1 = a.m, m2 = b.m, jimp = 2 * vrel / (m1 + m2);
        a.vx -= jimp * m2 * nx; a.vy -= jimp * m2 * ny; b.vx += jimp * m1 * nx; b.vy += jimp * m1 * ny;
        const ov = (rr - d) / 2; a.x -= nx * ov; a.y -= ny * ov; b.x += nx * ov; b.y += ny * ov;
        if (pair) flashes.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, life: .6, ok: false });
      }
    }
    P = P.filter(p => !p.dead);
    tAcc += dt; if (tAcc > .25) { tAcc = 0; const nA = P.filter(p => p.t === 'A').length, nAB = P.filter(p => p.t === 'AB').length; const last = hist.length ? hist[hist.length - 1][0] : 0; hist.push([last + .25, nA, nAB]); if (hist.length > 480) hist.shift(); drawChart();
      $('#rate-text').innerHTML = `A–B collisions so far: <b>${coll}</b>. Hard enough to react: <b style="color:var(--green)">${hits}</b> (${coll ? Math.round(hits / coll * 100) : 0}%).<br>${cat ? 'The catalyst lowers the energy hill, so far more collisions succeed at the same temperature.' : Ts.value < 50 ? 'Most collisions just bounce: they aren\'t hard enough to climb the activation-energy hill. Heat things up.' : 'Faster particles hit harder, so more collisions beat the activation energy.'}`; }
    ctx.clearRect(0, 0, w, h);
    for (const f of flashes) { f.life -= dt * 1.6; if (f.ok) { glow(ctx, f.x, f.y, 46 * (1.2 - f.life), '#6fe3a0', Math.max(0, f.life)); } else { ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, f.life) * .35})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(f.x, f.y, 14 * (1.3 - f.life), 0, TAU); ctx.stroke(); } }
    flashes = flashes.filter(f => f.life > 0);
    for (const p of P) {
      if (p.t === 'AB') { p.ang += dt * 2; const ox = Math.cos(p.ang) * 5, oy = Math.sin(p.ang) * 5; glow(ctx, p.x, p.y, 18, '#6fe3a0', .35); ball(ctx, '#6b8cff', p.x - ox, p.y - oy, R); ball(ctx, '#ff9f5a', p.x + ox, p.y + oy, R); ctx.strokeStyle = 'rgba(111,227,160,.9)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(p.x, p.y, R * 1.9, 0, TAU); ctx.stroke(); }
      else ball(ctx, p.t === 'A' ? '#6b8cff' : '#ff9f5a', p.x, p.y, p.r);
    }
  });
}

/* =========================================================
   CASE 8: pH
   ========================================================= */
function phLab() {
  const r = $('#ph-range'), cv = $('#ph-canvas');
  const ITEMS = [[0, 'Battery acid'], [1.5, 'Stomach acid'], [2, 'Lemon juice'], [2.9, 'Vinegar'], [3.7, 'Orange juice'], [5, 'Black coffee'], [6.6, 'Milk'], [7, 'Pure water'], [7.4, 'Blood'], [8.3, 'Baking soda'], [10, 'Soap'], [11.5, 'Ammonia'], [12.6, 'Bleach'], [14, 'Drain cleaner']];
  const STOPS = [[0, '#e0193f'], [2.8, '#ee3f73'], [5.3, '#b54ec0'], [7, '#7d55d8'], [8.4, '#3f7be0'], [10, '#2fb7a4'], [11.8, '#56c95a'], [14, '#e8d838']];
  const colAt = p => { for (let i = 0; i < STOPS.length - 1; i++) if (p <= STOPS[i + 1][0]) return mix(STOPS[i][1], STOPS[i + 1][1], (p - STOPS[i][0]) / (STOPS[i + 1][0] - STOPS[i][0])); return STOPS[STOPS.length - 1][1]; };
  $('#ph-items').innerHTML = ITEMS.map(([p, n], i) => `<button class="ph-item ${i % 2 ? 'low' : ''} ${({ 2: 'k-top', 7: 'k-top', 12.6: 'k-top', 5: 'k-low', 10: 'k-low' })[p] || ''}" data-p="${p}" style="left:${p / 14 * 100}%">${n}<b class="mono" style="font-size:10px;color:var(--muted)">${p}</b></button>`).join('');
  $('#ph-items').addEventListener('click', e => { const b = e.target.closest('.ph-item'); if (!b) return; target = +b.dataset.p; });
  let ph = 7, target = 7;
  r.addEventListener('input', () => { ph = target = r.value / 10; update(); });
  const fmtN = x => x >= 1e6 ? (x / 1e6).toLocaleString('en', { maximumFractionDigits: 1 }) + ' million' : x >= 100 ? Math.round(x).toLocaleString('en') : x.toLocaleString('en', { maximumSignificantDigits: 2 });
  function update() {
    const col = colAt(ph); $('#bk-liquid').setAttribute('fill', col); $('#ph-num').textContent = ph.toFixed(1); $('#ph-num').style.color = shade(col, .3);
    const near = ITEMS.reduce((a, b) => Math.abs(b[0] - ph) < Math.abs(a[0] - ph) ? b : a); $('#ph-name').textContent = Math.abs(near[0] - ph) < .35 ? near[1] : (ph < 7 ? 'Acidic' : ph > 7 ? 'Basic (alkaline)' : 'Neutral');
    $$('.ph-item').forEach(b => b.classList.toggle('on', Math.abs(+b.dataset.p - ph) < .05));
    const d = 7 - ph; $('#ph-chip').textContent = Math.abs(d) < .05 ? 'Neutral' : d > 0 ? 'Acidic' : 'Basic';
    $('#ph-text').innerHTML = Math.abs(d) < .05 ? 'Equal numbers of H⁺ and OH⁻. Perfectly balanced: neutral.' : d > 0 ? `<b style="color:var(--pink)">${fmtN(Math.pow(10, d))}×</b> more H⁺ ions than pure water. Acidic, and it tastes sour.` : `<b style="color:var(--cyan)">${fmtN(Math.pow(10, -d))}×</b> fewer H⁺ ions than pure water, with OH⁻ ions taking over. Basic: bitter and slippery.`;
    r.value = Math.round(ph * 10);
  }
  update();
  const rnd = seeded(3); const ions = Array.from({ length: 44 }, () => ({ x: rnd(), y: rnd(), vx: (rnd() - .5) * .08, vy: (rnd() - .5) * .08 }));
  const bub = $('#bk-bubbles'); const bubbles = Array.from({ length: 10 }, () => ({ x: 55 + Math.random() * 90, y: 210 + Math.random() * 130, r: 1.5 + Math.random() * 3, s: 10 + Math.random() * 20 }));
  bub.innerHTML = bubbles.map(() => '<circle fill="rgba(255,255,255,.35)"/>').join('');
  animate(cv, (dt, t) => {
    if (Math.abs(target - ph) > .0001) { ph += (target - ph) * Math.min(1, dt * 5); if (Math.abs(target - ph) < .01) ph = target; update(); }
    const { ctx, w, h } = fit(cv); ctx.clearRect(0, 0, w, h);
    const nH = Math.round(ions.length / (1 + Math.pow(10, (ph - 7) / 2.4)));
    ions.forEach((p, i) => {
      if (!reduceMotion) { p.x += p.vx * dt; p.y += p.vy * dt; if (p.x < .03 || p.x > .97) p.vx *= -1; if (p.y < .08 || p.y > .92) p.vy *= -1; }
      const x = p.x * w, y = p.y * h, isH = i < nH;
      if (isH) { glow(ctx, x, y, 14, '#ff6b9a', .6); ball(ctx, '#ff6b9a', x, y, 6); } else { glow(ctx, x, y, 14, '#5ce1e6', .5); ball(ctx, '#ff5d5d', x - 2, y, 6); ball(ctx, '#eef3ff', x + 5, y - 3, 3.6); }
      ctx.fillStyle = '#fff'; ctx.font = '700 9px Inter,sans-serif'; ctx.textAlign = 'center'; ctx.fillText(isH ? '+' : '−', x + (isH ? 0 : -2), y + 3);
    });
    ctx.fillStyle = '#ff9fbd'; ctx.font = '11px "JetBrains Mono", monospace'; ctx.textAlign = 'left'; ctx.fillText(`H⁺ ${nH}`, 8, 14); ctx.fillStyle = '#9fefff'; ctx.textAlign = 'right'; ctx.fillText(`OH⁻ ${ions.length - nH}`, w - 8, 14);
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.textAlign = 'center'; ctx.fillText('schematic: real numbers change 10× per pH step', w / 2, h - 6);
    const kids = bub.children; bubbles.forEach((b, i) => { b.y -= b.s * dt; if (b.y < 85) { b.y = 210; b.x = 55 + Math.random() * 90; } kids[i].setAttribute('cx', b.x + Math.sin(t * 2 + i) * 2); kids[i].setAttribute('cy', b.y); kids[i].setAttribute('r', b.r); });
  });
}
