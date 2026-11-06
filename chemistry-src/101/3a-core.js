<script>
(function(){
'use strict';
/* =========================================================
   CORE UTILITIES
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = {
  get(k, d) { try { const v = localStorage.getItem('iw:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('iw:' + k, JSON.stringify(v)); } catch (e) {} }
};
function seeded(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function hexRgb(h) { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function rgbHex(r, g, b) { return '#' + [r, g, b].map(v => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join(''); }
function shade(h, amt) { const [r, g, b] = hexRgb(h); return amt < 0 ? rgbHex(r * (1 + amt), g * (1 + amt), b * (1 + amt)) : rgbHex(r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt); }
function mix(a, b, t) { const A = hexRgb(a), B = hexRgb(b); return rgbHex(lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)); }
function rgba(h, a) { const [r, g, b] = hexRgb(h); return `rgba(${r},${g},${b},${a})`; }
function rampColor(stops, t) { t = clamp(t, 0, 1) * (stops.length - 1); const i = Math.min(stops.length - 2, Math.floor(t)); return mix(stops[i], stops[i + 1], t - i); }

/* Shaded sphere sprites (cached) */
const spriteCache = new Map();
function sprite(color, r) {
  r = Math.max(2, Math.round(r));
  const key = color + '|' + r;
  let s = spriteCache.get(key);
  if (s) return s;
  const d = 2, size = r * 2 * d + 2;
  s = document.createElement('canvas'); s.width = s.height = size;
  const g = s.getContext('2d'), c = size / 2, R = r * d;
  const gr = g.createRadialGradient(c - R * .35, c - R * .4, R * .05, c, c, R);
  gr.addColorStop(0, '#ffffff'); gr.addColorStop(.2, shade(color, .35)); gr.addColorStop(.62, color); gr.addColorStop(1, shade(color, -.62));
  g.fillStyle = gr; g.beginPath(); g.arc(c, c, R, 0, TAU); g.fill();
  spriteCache.set(key, s); return s;
}
function ball(ctx, color, x, y, r) { if (r <= 0) return; const s = sprite(color, r); ctx.drawImage(s, x - r, y - r, r * 2, r * 2); }
function glow(ctx, x, y, r, color, a = 1) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(color, .55 * a)); g.addColorStop(.4, rgba(color, .18 * a)); g.addColorStop(1, rgba(color, 0));
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
}
function fit(c) {
  const r = c.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.max(1, Math.round(r.width * d)), h = Math.max(1, Math.round(r.height * d));
  if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
  const ctx = c.getContext('2d'); ctx.setTransform(d, 0, 0, d, 0, 0);
  return { ctx, w: r.width, h: r.height };
}

/* Animation scheduler: only runs things that are on screen */
const animators = [];
const visIO = new IntersectionObserver(es => es.forEach(e => { animators.forEach(a => { if (a.el === e.target) a.vis = e.isIntersecting; }); }), { rootMargin: '120px' });
function animate(el, fn) { const a = { el, fn, vis: false }; animators.push(a); visIO.observe(el); return a; }
let lastT = performance.now();
function frame(t) {
  const dt = Math.min(.05, (t - lastT) / 1000); lastT = t;
  for (const a of animators) if (a.vis) { try { a.fn(dt, t / 1000); } catch (err) { console.error(err); a.vis = false; } }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
function tween(dur, fn, done) { const t0 = performance.now(); (function step(t) { const k = clamp((t - t0) / dur, 0, 1); fn(k); if (k < 1) requestAnimationFrame(step); else if (done) done(); })(t0); }
const ease = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;

function toast(html) { const t = $('#toast'); t.innerHTML = html; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 3800); }
const SVGNS = 'http://www.w3.org/2000/svg';
function svgEl(tag, attrs = {}, parent) { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }

/* =========================================================
   CAST & AVATARS
   ========================================================= */
const CAST = {
  H:  { name: 'Hal',    full: 'Hydrogen', color: '#dfe9ff', title: 'The Smallest Wanderer' },
  He: { name: 'Helia',  full: 'Helium',   color: '#ffd36e', title: 'The Aloof Aristocrat' },
  C:  { name: 'Cass',   full: 'Carbon',   color: '#9aa3b8', title: 'The Builder of Life' },
  N:  { name: 'Nate',   full: 'Nitrogen', color: '#6b8cff', title: 'The Sleepy Giant of the Air' },
  O:  { name: 'Ola',    full: 'Oxygen',   color: '#ff5d5d', title: 'The Electron Thief' },
  Na: { name: 'Sid',    full: 'Sodium',   color: '#b38cff', title: 'The Reckless Giver' },
  Cl: { name: 'Clo',    full: 'Chlorine', color: '#6fe3a0', title: 'The Grabby Poison' },
  Fe: { name: 'Ferro',  full: 'Iron',     color: '#e8925a', title: 'The Rusting Knight' },
  Au: { name: 'Goldie', full: 'Gold',     color: '#f4c35a', title: 'The Unbothered' },
  e:  { name: 'The Ghost', full: 'Electron', color: '#5ce1e6', title: 'Present at every scene' },
  p:  { name: 'Proton', full: 'Proton', color: '#ff5d5d', title: '' },
  n:  { name: 'Neutron', full: 'Neutron', color: '#9aa3b8', title: '' }
};
let avId = 0;
function avatarSVG(el, mood = 'happy', size = 56) {
  const c = CAST[el] || { color: '#999' }; const id = 'av' + (avId++);
  const sym = el === 'e' ? 'e⁻' : el === 'p' ? 'p⁺' : el === 'n' ? 'n⁰' : el;
  const ink = '#141625';
  let face = '';
  if (mood === 'happy') face = `<ellipse cx="25" cy="36" rx="2.6" ry="3.2" fill="${ink}"/><ellipse cx="39" cy="36" rx="2.6" ry="3.2" fill="${ink}"/><path d="M26 43 Q32 48.5 38 43" stroke="${ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  else if (mood === 'sly') face = `<path d="M21.5 36 q3.5 -2.6 7 0" stroke="${ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M35.5 36 q3.5 -2.6 7 0" stroke="${ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M27 44 Q34 47 39 42" stroke="${ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  else if (mood === 'shocked') face = `<circle cx="25" cy="36" r="3.4" fill="${ink}"/><circle cx="39" cy="36" r="3.4" fill="${ink}"/><ellipse cx="32" cy="45" rx="3" ry="3.6" fill="${ink}"/>`;
  else face = `<path d="M22 37 h6 M36 37 h6" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/><path d="M28 44 h8" stroke="${ink}" stroke-width="2.2" stroke-linecap="round"/>`;
  const orbit = el === 'e' ? `<ellipse cx="32" cy="32" rx="31" ry="9" fill="none" stroke="${c.color}" stroke-opacity=".5" stroke-width="1.2" transform="rotate(-20 32 32)"/>` : '';
  const cheeks = `<circle cx="20" cy="42" r="3" fill="#ff7aa8" opacity=".35"/><circle cx="44" cy="42" r="3" fill="#ff7aa8" opacity=".35"/>`;
  return `<svg viewBox="-2 -2 68 68" width="${size}" height="${size}" aria-hidden="true"><defs><radialGradient id="${id}" cx="36%" cy="30%" r="78%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".22" stop-color="${shade(c.color, .25)}"/><stop offset=".7" stop-color="${c.color}"/><stop offset="1" stop-color="${shade(c.color, -.55)}"/></radialGradient></defs>${orbit}<circle cx="32" cy="32" r="27" fill="url(#${id})"/><text x="32" y="25" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="${sym.length > 2 ? 11 : 13}" fill="${ink}" fill-opacity=".8">${sym}</text>${cheeks}${face}</svg>`;
}
function renderAvatars(root = document) { $$('.avatar[data-el]', root).forEach(a => { if (a.dataset.done) return; a.innerHTML = avatarSVG(a.dataset.el, a.dataset.mood, +(a.dataset.size || 56)); a.dataset.done = 1; }); }

/* Icons */
const ICO = {
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  atom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="1.8" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>',
  pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/></svg>',
  kettle: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M8 26h16l-1.5-11a6.5 6.5 0 0 0-13 0z"/><path d="M22.5 17l4-3"/><path d="M12 8c0-2 2-2 2-4M17 8c0-2 2-2 2-4"/></svg>',
  hand: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17V8a2 2 0 0 1 4 0v7M14 14V6a2 2 0 0 1 4 0v8M18 14V8a2 2 0 0 1 4 0v9c0 5-3 9-8 9-3 0-5-2-7-5l-2-4a2 2 0 0 1 3.5-2l1.5 2"/><path d="M4 29h24"/></svg>',
  ring: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="16" cy="19" r="8"/><path d="M12 9l4-5 4 5z"/></svg>',
  salt: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M10 12h12l-1 16H11z"/><path d="M11 12c0-5 2-8 5-8s5 3 5 8"/><circle cx="14" cy="8" r=".6" fill="currentColor"/><circle cx="18" cy="8" r=".6" fill="currentColor"/></svg>',
  ice: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M7 6h18l-2 22H9z"/><path d="M8 13h16"/><rect x="11" y="9" width="7" height="6" rx="1" transform="rotate(-12 14 12)"/></svg>',
  flame: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M16 28c-5 0-8-3-8-7.5C8 14 16 12 14 4c5 3 10 8 10 15 0 5-3 9-8 9z"/><path d="M16 28c-2 0-3.5-1.5-3.5-3.5 0-3 3.5-4 3.5-7 2 1.5 3.5 4 3.5 6.5 0 2.4-1.5 4-3.5 4z"/></svg>',
  milk: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M11 4h10v4l3 5v15H8V13l3-5z"/><path d="M8 13h16"/><path d="M12 19h8"/></svg>',
  lemon: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="7.5"/><path d="M16 8.5v15M8.5 16h15M10.7 10.7l10.6 10.6M21.3 10.7L10.7 21.3"/></svg>',
  breath: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 12h14a4 4 0 1 0-4-4"/><path d="M4 18h20a4 4 0 1 1-4 4"/><path d="M4 24h8"/></svg>',
  key: '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19" fill="#f4c35a" fill-opacity=".15" stroke="#f4c35a"/><path d="M14 20a4 4 0 1 1 8 0 4 4 0 0 1-8 0zM22 20h8v3M27 20v3" stroke="#f4c35a" stroke-width="2" stroke-linecap="round"/></svg>'
};
function renderLensIcons() { $$('.lt[data-ico]').forEach(l => l.insertAdjacentHTML('afterbegin', ICO[l.dataset.ico])); }

/* =========================================================
   CONTENT DATA: mysteries, clues, quizzes, prompts, flashcards
   ========================================================= */
const CASES = {
  1: { title: 'The Restless Crowd', item: 'The kettle\'s steam', ico: 'kettle', teaser: 'Where does boiling water go?',
       clue: 'Everything is made of tiny particles in constant motion. Temperature is how fast they move.',
       mystery: { q: 'A puddle disappears on a cool day, without ever boiling. Where does the water go, and how?',
         h: ['It soaks into the ground', 'It turns into air', 'Its tiny pieces escape into the air one at a time'], a: 2,
         v: 'A puddle is a crowd of trillions of water molecules, all jostling. At the surface, the few that happen to be moving fastest break free of their neighbours and fly off into the air. That is <b>evaporation</b>. No boiling is needed; it happens one escaped molecule at a time. The water is still water, just spread out as invisible vapour.' } },
  2: { title: 'The Empty Room', item: 'Your hand on the table', ico: 'hand', teaser: 'Why can\'t you push through it?',
       clue: 'Atoms are almost entirely empty: a tiny positive nucleus surrounded by a cloud of negative electrons. The number of protons decides which element it is.',
       mystery: { q: 'If atoms are almost entirely empty space, why can\'t you push your hand through a table?',
         h: ['Atoms are actually solid balls', 'The electrons in your hand and the table repel each other', 'Gravity holds the table together'], a: 1,
         v: 'Your hand never truly touches the table. The negative electron clouds of your atoms and the table\'s atoms <b>repel</b> each other long before the nuclei come anywhere close. What you feel as "solid" is electric repulsion.' } },
  3: { title: 'The Family Album', item: 'The gold ring and the rusty gate', ico: 'ring', teaser: 'Why does one last forever?',
       clue: 'Atoms in the same column of the periodic table have the same number of outer electrons, and so they behave alike.',
       mystery: { q: 'A gold mask from 3,300 years ago still gleams. An iron gate rusts in a single wet winter. Why are some elements so lazy and others so eager?',
         h: ['Gold is simply harder than iron', 'It depends on how each atom\'s outer electrons are arranged', 'Iron is a much older metal'], a: 1,
         v: 'Reactivity is all about <b>outer electrons</b>. Iron gives up its outer electrons to oxygen fairly easily, and that is rusting. Gold holds on to its electrons so tightly that oxygen and water can\'t take them, so Tutankhamun\'s mask shines as brightly as the day it was made.' } },
  4: { title: 'The Deal', item: 'The salt in the pan', ico: 'salt', teaser: 'Made from an explosive and a poison?',
       clue: 'Atoms bond by giving away or sharing electrons, trying to reach a full outer shell.',
       mystery: { q: 'Sodium explodes in water. Chlorine is a poison gas. Put them together and you get something you eat every day. How?',
         h: ['They cancel each other\'s danger out', 'Sodium hands one electron to chlorine, and both become stable', 'Table salt isn\'t really made of them'], a: 1,
         v: 'Sodium gives its single outer electron to chlorine. Both now have full outer shells, which makes them stable and calm. They become ions, <b>Na⁺</b> and <b>Cl⁻</b>, and opposite charges hold them together in salt crystals. New bonds mean completely new properties.' } },
  5: { title: 'The Bent One', item: 'The floating ice cube', ico: 'ice', teaser: 'Why doesn\'t it sink?',
       clue: 'Water is bent and polar. Its slightly charged ends attract each other, which makes water sticky and ice lighter than liquid water.',
       mystery: { q: 'Almost every substance is denser as a solid than as a liquid. Solid wax sinks in melted wax. So why does ice float?',
         h: ['Ice has air bubbles trapped inside', 'Freezing water molecules lock into an open honeycomb', 'Cold things are always lighter'], a: 1,
         v: 'When water freezes, <b>hydrogen bonds</b> lock each molecule to four neighbours in an open, six-sided pattern. The pattern has more empty space than the jumbled liquid, about 9% more. The same mass in more space means lower density, so ice floats.' } },
  6: { title: 'The Great Rearrangement', item: 'The gas flame', ico: 'flame', teaser: 'Where does the gas go?',
       clue: 'In a chemical reaction, atoms are rearranged. They are never created and never destroyed.',
       mystery: { q: 'A 20 kg log burns down to a small pile of ash. Where did the rest of it go?',
         h: ['It was destroyed by the fire', 'It was turned into pure energy', 'It flew away as invisible gases: carbon dioxide and water vapour'], a: 2,
         v: 'Not a single atom was destroyed. The carbon and hydrogen in the wood joined with oxygen from the air and flew away as <b>carbon dioxide</b> and <b>water vapour</b>. If you caught and weighed all the gases, they would weigh <i>more</i> than the log, because of all the oxygen they picked up.' } },
  7: { title: 'The Race Against Time', item: 'The milk in the fridge', ico: 'milk', teaser: 'Why does cold keep it fresh?',
       clue: 'Particles only react when they collide hard enough. Heat, crowding, surface area and catalysts make reactions faster.',
       mystery: { q: 'Milk lasts a week in the fridge but spoils in a day on a warm counter. What is the fridge actually doing?',
         h: ['Killing the bacteria', 'Slowing the particles down, so fewer collisions are hard enough to react', 'Keeping the air out'], a: 1,
         v: 'Spoiling is chemistry: bacteria use enzyme-driven reactions to digest the milk. In the cold, molecules move more slowly, so far fewer collisions have enough energy to react. The bacteria aren\'t dead. Their chemistry is just running in slow motion.' } },
  8: { title: 'Sour & Slippery', item: 'The orange juice and the soap', ico: 'lemon', teaser: 'What is sourness?',
       clue: 'Acids give away H⁺ (bare protons) and bases take them. pH counts H⁺ in powers of ten.',
       mystery: { q: 'Lemon juice tastes sour. Soap feels slippery. Vinegar fizzes wildly on baking soda. What is the hidden link?',
         h: ['Temperature', 'A bare proton (H⁺) being passed from one molecule to another', 'Tiny air bubbles'], a: 1,
         v: 'Sourness is the taste of <b>H⁺ ions</b>. Acids such as lemon juice and vinegar give them away. Bases such as soap and baking soda grab them. The fizz is the hand-off happening billions of times a second and releasing carbon dioxide gas.' } },
  9: { title: 'The Carbon Odyssey', item: 'The fog of your breath', ico: 'breath', teaser: 'What are you breathing out?',
       clue: 'Life rearranges carbon atoms. Plants store sunlight\'s energy in sugar, and you release it by breathing.',
       mystery: { q: 'When you lose weight, where does the fat physically go?',
         h: ['It turns into energy and heat', 'It leaves mainly in sweat and in the toilet', 'You breathe most of it out'], a: 2,
         v: 'You <b>exhale</b> it. When your cells "burn" fat, its carbon atoms leave as carbon dioxide through your lungs. That is about 84% of the mass. The rest leaves as water. The energy is released, but the atoms all remain. They just leave your body by air.' } }
};

const QUIZ = {
  1: [
    { q: 'What is the difference between a solid, a liquid and a gas of the same substance?', o: ['They are made of different molecules', 'How the same particles are arranged and how fast they move', 'Gases have no mass', 'Solids have no moving particles at all'], a: 1, w: 'Ice, water and steam are all H₂O. Only the arrangement and the motion of the molecules differ. Even in a solid, particles vibrate in place.' },
    { q: 'What does temperature really measure?', o: ['How much substance there is', 'How fast the particles are moving, on average', 'How heavy the particles are', 'How many bonds the particles have'], a: 1, w: 'Temperature is a measure of the average motion (kinetic energy) of the particles. Hotter means faster.' }
  ],
  2: [
    { q: 'In Rutherford\'s experiment, a few alpha particles bounced back from the gold foil. What did this reveal?', o: ['Gold is very hard', 'Atoms have a tiny, dense, positive nucleus', 'Atoms are solid all the way through', 'Electrons are positive'], a: 1, w: 'Only a tiny, heavy, positive core could repel the fast positive alpha particles straight back, and most of them missed it because it is so small.' },
    { q: 'An atom has 6 protons, 7 neutrons and 6 electrons. Which element is it?', o: ['Nitrogen, because 7 neutrons', 'Carbon, because 6 protons', 'It depends on the electrons', 'Neon, because 6+7=13 particles'], a: 1, w: 'The number of protons (the atomic number) alone decides the element. 6 protons is always carbon. This one is carbon-13.' }
  ],
  3: [
    { q: 'Why do sodium (Na) and potassium (K) behave so similarly?', o: ['They have the same mass', 'They each have one electron in their outer shell', 'They were discovered by the same person', 'They both contain neutrons'], a: 1, w: 'Elements in the same column (group) have the same number of outer electrons, and outer electrons decide behaviour.' },
    { q: 'Why are noble gases like helium and neon so unreactive?', o: ['They are too light to react', 'Their outer shells are already full', 'They are always too cold', 'They have no electrons'], a: 1, w: 'A full outer shell is a stable, low-energy arrangement. Noble gases have nothing to gain by giving, taking or sharing.' }
  ],
  4: [
    { q: 'In table salt, sodium gives one electron to chlorine. What charges do they end up with?', o: ['Na⁻ and Cl⁺', 'Na⁺ and Cl⁻', 'Both neutral', 'Both positive'], a: 1, w: 'Losing a negative electron leaves sodium positive (Na⁺). Gaining one makes chlorine negative (Cl⁻). The opposite charges attract: an ionic bond.' },
    { q: 'What is a covalent bond?', o: ['A pair of electrons shared between two atoms', 'An electron handed from one atom to another', 'Two nuclei touching', 'A magnet inside a molecule'], a: 0, w: 'Covalent bonds form when atoms that both want electrons share a pair between them, as in H₂, water and every molecule of DNA.' }
  ],
  5: [
    { q: 'Why is the oxygen end of a water molecule slightly negative?', o: ['Oxygen pulls the shared electrons closer to itself', 'Oxygen has extra protons from hydrogen', 'Water molecules are charged ions', 'Because water is cold'], a: 0, w: 'Oxygen\'s 8-proton nucleus attracts the shared electrons more strongly than hydrogen\'s 1-proton nucleus, so the electrons spend more time near oxygen.' },
    { q: 'Ice floats because…', o: ['it contains trapped air', 'hydrogen bonds hold molecules in an open lattice, so ice is less dense', 'it is colder than water', 'ice molecules are lighter than water molecules'], a: 1, w: 'The molecules are identical. In ice, hydrogen bonds force them into a roomy hexagonal pattern, so the same mass takes up more space.' }
  ],
  6: [
    { q: 'Which of these may you change when balancing a chemical equation?', o: ['The small numbers inside formulas (H₂O → H₂O₂)', 'The big numbers in front of formulas (2 H₂O)', 'Both', 'Neither'], a: 1, w: 'Only the coefficients in front. Changing the subscripts changes the substance itself: H₂O is water, but H₂O₂ is hydrogen peroxide (bleach!).' },
    { q: 'You burn a candle in a sealed jar on a scale. What happens to the total mass?', o: ['It decreases, because the wax disappears', 'It increases, because of the flame', 'It stays exactly the same', 'It becomes zero'], a: 2, w: 'Lavoisier\'s law: in a closed system, atoms are rearranged, never created or destroyed, so the mass is conserved.' }
  ],
  7: [
    { q: 'According to collision theory, why does heating speed up a reaction?', o: ['Particles get bigger', 'Particles move faster, collide more often and harder, so more collisions beat the activation energy', 'Heat is a reactant', 'Heat removes the catalyst'], a: 1, w: 'Faster particles collide more often, and, more importantly, more of the collisions have enough energy to get over the activation-energy hill.' },
    { q: 'What does a catalyst do?', o: ['It is used up to make extra product', 'It lowers the activation energy and comes out unchanged', 'It makes particles heavier', 'It cools the reaction down'], a: 1, w: 'A catalyst offers an easier pathway with a lower energy hill. It isn\'t consumed. Enzymes in your body are catalysts.' }
  ],
  8: [
    { q: 'What makes a substance an acid?', o: ['It is a liquid', 'It gives away H⁺ ions (protons)', 'It takes H⁺ ions', 'It contains oxygen'], a: 1, w: 'Acids are proton donors. Bases are proton acceptors.' },
    { q: 'Black coffee is about pH 5. Lemon juice is about pH 2. How much more H⁺ does lemon juice have?', o: ['3 times more', '30 times more', '1,000 times more', 'The same amount'], a: 2, w: 'Each pH step is a factor of 10. Three steps: 10 × 10 × 10 = 1,000 times more H⁺.' }
  ],
  9: [
    { q: 'Photosynthesis stores the energy of sunlight in…', o: ['oxygen', 'the chemical bonds of sugar (glucose)', 'carbon dioxide', 'water'], a: 1, w: 'Plants use light energy to build glucose from CO₂ and water. That energy is released when the sugar is broken down in respiration.' },
    { q: 'A reaction gives out heat to its surroundings. It is…', o: ['endothermic', 'exothermic', 'a physical change', 'impossible'], a: 1, w: 'Exothermic means energy goes out (exo = out). Burning, and respiration in your cells, are exothermic.' }
  ]
};
const EXTRA_Q = [
  { c: 1, q: 'You leave a bottle of perfume open in one corner. Soon the whole room smells. Why?', o: ['The air is sticky', 'Perfume molecules move randomly and spread out among the air molecules', 'Perfume is heavier than air', 'Light carries the smell'], a: 1, w: 'This is diffusion. Particles are always moving, so they gradually spread from where they are crowded to where they are not.' },
  { c: 2, q: 'Which particle has almost no mass but a negative charge?', o: ['Proton', 'Neutron', 'Electron', 'Nucleus'], a: 2, w: 'Electrons are about 1/1836 the mass of a proton, and carry a charge of −1.' },
  { c: 3, q: 'Chlorine has 7 outer electrons. Which element below is most similar to it?', o: ['Sodium (1 outer electron)', 'Fluorine (7 outer electrons)', 'Argon (8 outer electrons)', 'Sulfur (6 outer electrons)'], a: 1, w: 'Same column, same number of outer electrons, same family: the halogens.' },
  { c: 4, q: 'Diamond and graphite are both pure carbon. Why are they so different?', o: ['Diamond contains extra metal', 'Their carbon atoms are bonded in different arrangements', 'Graphite is wet', 'Diamond has heavier carbon atoms'], a: 1, w: 'In diamond every carbon bonds to four others in a rigid 3D network. In graphite, carbons form flat sheets that slide over each other.' },
  { c: 5, q: 'Salt dissolves in water because…', o: ['water melts the salt', 'polar water molecules surround and pull apart the Na⁺ and Cl⁻ ions', 'salt evaporates', 'salt reacts and disappears'], a: 1, w: 'The δ− oxygen ends cluster around Na⁺, and the δ+ hydrogen ends around Cl⁻, tugging the ions out of the crystal one by one.' },
  { c: 6, q: 'Balance it: _ H₂ + _ O₂ → _ H₂O', o: ['1, 1, 1', '2, 1, 2', '1, 2, 1', '2, 2, 2'], a: 1, w: '2 H₂ + O₂ → 2 H₂O. Four H and two O on each side.' },
  { c: 7, q: 'Why does flour dust in the air explode, when a bag of flour only burns slowly?', o: ['Dust is a different chemical', 'Fine dust has a huge surface area, so far more particles can react at once', 'Air is a catalyst', 'Dust is hotter'], a: 1, w: 'Grinding something up exposes vastly more surface to oxygen, so the reaction can happen everywhere at once.' },
  { c: 8, q: 'You mix an acid and a base in the right amounts. What forms?', o: ['A stronger acid', 'Water (and a salt): neutralisation', 'Pure hydrogen gas', 'Nothing happens'], a: 1, w: 'H⁺ + OH⁻ → H₂O. The acid\'s and base\'s powers cancel each other out.' },
  { c: 9, q: 'Most of the mass of a tree came from…', o: ['the soil', 'carbon dioxide from the air (plus water)', 'sunlight itself', 'fertiliser'], a: 1, w: 'Van Helmont\'s willow and modern measurements agree: plants build themselves mainly from CO₂ and water, using sunlight as the energy source.' }
];
const PROMPTS = {
  1: { p: 'Explain to a friend why a puddle can dry up on a cold day, using the word "particles".', m: 'Water is made of particles (molecules) that are always moving at different speeds. At the surface, the fastest ones have enough energy to break away from their neighbours and escape into the air as vapour. Bit by bit, the whole puddle escapes. You don\'t need boiling, just time.' },
  2: { p: 'Describe what is inside an atom as if you were giving a tour of a football stadium.', m: 'In the centre of the pitch sits a pea: the nucleus, holding all the positive protons and neutral neutrons, and nearly all the mass. Far out in the stands, like a buzzing cloud of gnats, are the negative electrons. Everything in between is empty. The number of protons in the pea decides which element the stadium is.' },
  3: { p: 'Why does the periodic table "repeat"? Explain it without using the word "group".', m: 'As atoms get bigger, electrons fill shells one by one. Each time a new shell starts, the outer shell holds 1 electron again, then 2, and so on. Because behaviour depends on the outer electrons, the same personalities show up again every row, so atoms in the same column act alike.' },
  4: { p: 'Tell the story of how sodium and chlorine become salt, in three sentences.', m: 'Sodium has one spare outer electron and chlorine is one short of a full shell. Sodium hands its electron over, becoming Na⁺, while chlorine becomes Cl⁻. The opposite charges attract and lock into a cubic crystal: salt.' },
  5: { p: 'Explain to a 10-year-old why ice cubes float in their drink.', m: 'Water molecules are like tiny magnets with a negative end and two positive ends. When water freezes, they hold hands in a neat honeycomb pattern that leaves lots of empty space. So ice takes up more room than the same amount of water, and things that are less tightly packed float.' },
  6: { p: 'Where does the mass of a burning candle go? Explain using the idea of atoms.', m: 'The wax is made of carbon and hydrogen atoms. When it burns, they combine with oxygen from the air to make carbon dioxide and water vapour, which drift away invisibly. No atoms disappear; they are just rearranged into gases that leave the candle.' },
  7: { p: 'Give two everyday examples of controlling reaction speed, and explain each using collisions.', m: 'Fridges keep food fresh: cold particles move more slowly, so fewer collisions have enough energy to react. Chopping wood into kindling helps a fire start: more surface area means more wood particles can collide with oxygen at once.' },
  8: { p: 'Why does "one pH step" matter so much more than it sounds?', m: 'pH is a power-of-ten scale. Each step down means ten times more H⁺ ions. So pH 4 is ten times more acidic than pH 5, and a hundred times more acidic than pH 6. Small number changes are huge chemical changes.' },
  9: { p: 'Trace a carbon atom from the air, into your body, and back out again.', m: 'A carbon atom in CO₂ in the air enters a leaf. Using sunlight, the plant builds it into glucose (sugar). You eat the plant, and your cells break the sugar down with oxygen to release its energy. The carbon leaves your body as CO₂ in your breath, ready for another plant.' }
};
const CARDS = [
  [1, 'What is an atom?', 'The smallest unit of an element that still has that element\'s identity. The word comes from Greek <i>atomos</i>, "uncuttable."'],
  [1, 'What is a molecule?', 'Two or more atoms bonded together, like H₂O (water) or O₂ (the oxygen you breathe).'],
  [1, 'What decides whether a substance is solid, liquid or gas?', 'A tug-of-war: the motion of particles (temperature) against the attraction between them.'],
  [1, 'What is evaporation, at the particle level?', 'The fastest particles at a liquid\'s surface escaping into the air, even below the boiling point.'],
  [1, 'What did Brownian motion prove?', 'That invisible molecules really exist. Their constant bumping makes pollen grains jiggle.'],
  [2, 'Name the three particles in an atom and their charges.', 'Protons (+1, in the nucleus), neutrons (0, in the nucleus), electrons (−1, around the nucleus).'],
  [2, 'What is the atomic number?', 'The number of protons. It alone decides which element an atom is.'],
  [2, 'What is the mass number?', 'Protons + neutrons. Carbon-12 has 6 + 6 = 12.'],
  [2, 'What is an isotope?', 'Atoms of the same element (same protons) with different numbers of neutrons, like carbon-12 and carbon-14.'],
  [2, 'What is an ion?', 'An atom that has lost or gained electrons, so it has a charge. Lose electrons → positive. Gain electrons → negative.'],
  [2, 'What did Rutherford\'s gold-foil experiment show?', 'Atoms are mostly empty space, with a tiny, dense, positive nucleus at the centre.'],
  [3, 'Why do elements in the same column behave alike?', 'They have the same number of outer (valence) electrons.'],
  [3, 'What are the noble gases, and why are they unreactive?', 'Group 18: helium, neon, argon and others. Their outer shells are full.'],
  [3, 'What was Mendeleev\'s boldest move?', 'Leaving gaps in his table for elements nobody had found yet, and predicting their properties. Gallium and germanium later filled them.'],
  [3, 'Alkali metals: how many outer electrons, and how reactive?', 'One outer electron, which they give away very easily. They are extremely reactive (sodium, potassium).'],
  [4, 'What is the octet rule?', 'Atoms tend to bond so that they have eight electrons in their outer shell, like a noble gas (two for H and He).'],
  [4, 'Ionic vs. covalent bond?', 'Ionic: electrons are <b>transferred</b> and the resulting + and − ions attract. Covalent: electrons are <b>shared</b> in pairs.'],
  [4, 'Why can carbon build so many molecules?', 'It has four outer electrons, so it can form four bonds at once: chains, rings and branches.'],
  [5, 'What makes water polar?', 'Oxygen pulls shared electrons closer (making it δ−, the H atoms δ+), and the molecule is bent at about 104.5°.'],
  [5, 'What is a hydrogen bond?', 'A weak attraction between a δ+ hydrogen on one molecule and a δ− atom (like O) on another.'],
  [5, 'Why does ice float?', 'Hydrogen bonds hold ice in an open hexagonal lattice that is about 9% less dense than liquid water.'],
  [6, 'What is the law of conservation of mass?', 'In a chemical reaction atoms are rearranged, never created or destroyed, so total mass stays the same (Lavoisier).'],
  [6, 'Reactants vs. products?', 'Reactants are what you start with (left of the arrow). Products are what you make (right of the arrow).'],
  [6, 'Balance: CH₄ + _O₂ → CO₂ + _H₂O', 'CH₄ + <b>2</b> O₂ → CO₂ + <b>2</b> H₂O'],
  [6, 'Physical vs. chemical change?', 'Physical: same substance, new form (ice melting). Chemical: new substances form (wood burning).'],
  [7, 'What is activation energy?', 'The minimum collision energy needed to start a reaction: the "hill" to get over.'],
  [7, 'Name four ways to speed up a reaction.', 'Raise the temperature, raise the concentration, increase the surface area, add a catalyst.'],
  [7, 'What is an enzyme?', 'A biological catalyst (a protein) that speeds up a specific reaction in living things.'],
  [8, 'Acid vs. base (proton definition)?', 'An acid donates H⁺ (protons). A base accepts H⁺.'],
  [8, 'What pH is neutral, and what does each step mean?', 'pH 7 is neutral. Each step is a factor of 10 in H⁺ concentration.'],
  [8, 'What is neutralisation?', 'Acid + base → salt + water. At its core: H⁺ + OH⁻ → H₂O.'],
  [9, 'Exothermic vs. endothermic?', 'Exothermic releases energy to the surroundings (fire). Endothermic absorbs energy (photosynthesis, cold packs).'],
  [9, 'Write the equation for photosynthesis.', '6 CO₂ + 6 H₂O + light → C₆H₁₂O₆ + 6 O₂'],
  [9, 'How does most fat leave your body?', 'As carbon dioxide that you breathe out (about 84%). The rest leaves as water.'],
  [9, 'Where did the carbon in your body originally come from?', 'It was forged inside stars by nuclear fusion, billions of years ago.']
];

/* =========================================================
   PROGRESS / EVIDENCE
   ========================================================= */
let solved = new Set(store.get('solved', []));
function markSolved(n) {
  if (solved.has(n)) return;
  solved.add(n); store.set('solved', [...solved]);
  updateEvidence();
  toast(`${ICO.key.replace('<svg', '<svg width="26" height="26"')}<span>Clue ${n} of 9 acquired: <b>${CASES[n].item}</b></span>`);
  const v = $(`.verdict[data-case="${n}"]`); if (v) refreshVerdict(v);
}
function updateEvidence() {
  $('#ev-count').textContent = solved.size;
  $('#ev-dots').innerHTML = Array.from({ length: 9 }, (_, i) => `<span class="${solved.has(i + 1) ? 'on' : ''}"></span>`).join('');
  $$('.ev').forEach(e => { const n = +e.dataset.n; e.classList.toggle('solved', solved.has(n)); e.querySelector('small').innerHTML = solved.has(n) ? CASES[n].clue : CASES[n].teaser + ' <span style="color:var(--gold)">Unsolved</span>'; });
  $$('#rail a').forEach(a => { const m = /^case(\d)$/.exec(a.dataset.sec || ''); if (m) a.classList.toggle('solved', solved.has(+m[1])); });
  renderClueChain();
}
function buildBoard() {
  $('#board').innerHTML = Object.keys(CASES).map(n => { const c = CASES[n]; return `<a class="ev" href="#case${n}" data-n="${n}"><span class="ico" style="color:var(--gold)">${ICO[c.ico]}</span><span><b>${c.item}</b><small></small></span><span class="n">CLUE ${String(n).padStart(2, '0')}</span></a>`; }).join('');
  const intro = ['H', 'O', 'C', 'Na', 'Cl', 'e'];
  const moods = { H: 'happy', O: 'sly', C: 'happy', Na: 'shocked', Cl: 'sly', e: 'sly' };
  $('#cast-intro').innerHTML = '<div style="width:100%;font-family:var(--mono);font-size:11px;letter-spacing:.24em;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Persons of interest</div>' +
    intro.map(k => `<div class="cast-card"><span class="avatar" data-el="${k}" data-mood="${moods[k]}" data-size="48"></span><div><b>${CAST[k].name} · ${CAST[k].full.toLowerCase()}</b><small>${CAST[k].title}</small></div></div>`).join('');
}
function renderClueChain() {
  const el = $('#clue-chain'); if (!el) return;
  el.innerHTML = Object.keys(CASES).map(n => `<div class="${solved.has(+n) ? '' : 'missing'}"><b>${String(n).padStart(2, '0')}</b><span>${solved.has(+n) ? CASES[n].clue : '<i>Clue not yet collected. Solve case file ' + n + '.</i>'}</span></div>`).join('');
}

/* =========================================================
   MYSTERY, QUIZ, FEYNMAN, VERDICT, COLD CASE
   ========================================================= */
let hunches = store.get('hunches', {});
function buildMysteries() {
  $$('[data-mystery]').forEach(m => {
    const n = m.dataset.mystery, d = CASES[n].mystery;
    m.innerHTML = `<div class="tag">The mystery · Clue ${n}: ${CASES[n].item}</div><h3>${d.q}</h3><div class="hunches">${d.h.map((h, i) => `<button class="hunch" data-i="${i}">${h}</button>`).join('')}</div><div class="hunch-note"></div>`;
    const note = m.querySelector('.hunch-note');
    const set = i => { $$('.hunch', m).forEach(b => b.classList.toggle('picked', +b.dataset.i === i)); note.innerHTML = 'Hunch logged. Don\'t look it up; read on and let the evidence decide. The answer is revealed when you <b>close the case</b> at the end of this file.'; };
    if (hunches[n] != null) set(hunches[n]);
    $$('.hunch', m).forEach(b => b.addEventListener('click', () => { hunches[n] = +b.dataset.i; store.set('hunches', hunches); set(+b.dataset.i); const v = $(`.verdict[data-case="${n}"]`); if (v) refreshVerdict(v); }));
  });
}
function quizHTML(q, idx) {
  return `<div class="q" data-idx="${idx}"><p class="qt">${q.q}</p><div class="opts">${q.o.map((o, i) => `<button class="opt" data-i="${i}">${o}</button>`).join('')}</div><div class="fb"></div></div>`;
}
function wireQuestion(qel, q, onRight) {
  const fb = qel.querySelector('.fb'); let wrongOnce = false;
  $$('.opt', qel).forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.i;
    if (i === q.a) {
      $$('.opt', qel).forEach(x => x.disabled = true); b.classList.add('right');
      fb.className = 'fb show good'; fb.innerHTML = `<b>${wrongOnce ? 'Got it now.' : 'Correct.'}</b> ${q.w}`;
      onRight && onRight(!wrongOnce);
    } else {
      wrongOnce = true; b.classList.add('wrong'); b.disabled = true;
      fb.className = 'fb show bad'; fb.innerHTML = '<b>Not quite.</b> Think about it again, then pick another answer. Wrong guesses that you correct are some of the best learning there is.';
    }
  }));
}
function buildQuizzes() {
  $$('.quiz[data-case]').forEach(box => {
    const n = +box.dataset.case, qs = QUIZ[n];
    box.innerHTML = `<div class="tag">${ICO.pen.replace('<svg', '<svg width="14" height="14"')} Retrieval practice</div><h4>Check your deductions</h4><p class="why">Answer from memory first; no scrolling up! Answer both correctly to collect the clue.</p>` + qs.map(quizHTML).join('');
    let right = 0;
    $$('.q', box).forEach((qel, i) => wireQuestion(qel, qs[i], () => { right++; if (right === qs.length) markSolved(n); }));
    if (solved.has(n)) { const s = document.createElement('p'); s.className = 'hint'; s.style.marginTop = '14px'; s.innerHTML = '<span class="stamp">CLUE COLLECTED</span> &nbsp;Already solved. Answering again is still great practice.'; box.appendChild(s); }
  });
}
let notes = store.get('notes', {});
function buildFeynman() {
  $$('.feynman[data-case]').forEach(box => {
    const n = box.dataset.case, P = PROMPTS[n];
    box.innerHTML = `<div class="tag">${ICO.pen.replace('<svg', '<svg width="14" height="14"')} Elaboration · Feynman technique</div><h4>Explain it to a friend</h4><p class="why">${P.p}</p><textarea placeholder="Write it in your own words. Rough is fine; the effort is what counts." aria-label="Your explanation"></textarea><div class="controls" style="margin-top:10px"><button class="btn small">Compare with the detective's notes</button><span class="saved"></span></div><div class="model"><b style="color:var(--violet)">Detective's notes:</b> ${P.m}<br><span class="hint" style="font-size:12.5px">Did you mention the key ideas? Anything you missed is exactly what to remember.</span></div>`;
    const ta = box.querySelector('textarea'), saved = box.querySelector('.saved'), model = box.querySelector('.model');
    ta.value = notes[n] || ''; if (ta.value) saved.textContent = 'saved on this device';
    let t; ta.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { notes[n] = ta.value; store.set('notes', notes); saved.textContent = 'saved on this device'; }, 400); });
    box.querySelector('.btn').addEventListener('click', () => { if (!ta.value.trim()) { saved.textContent = 'Try writing something first. Even one sentence helps.'; ta.focus(); return; } model.classList.add('show'); });
  });
}
function refreshVerdict(v) {
  const n = +v.dataset.case, d = CASES[n].mystery, h = hunches[n];
  const hEl = v.querySelector('.hunch-res');
  if (hEl) hEl.innerHTML = h == null ? 'You didn\'t log a hunch for this one. Try it next time: guessing first, even wrongly, makes the answer stick.' : (h === d.a ? `Your hunch, <b>“${d.h[h]}”</b>, was <b style="color:var(--green)">right</b>. Sharp detective work.` : `Your hunch was <b>“${d.h[h]}”</b>. Not quite, but having guessed first means this answer will stick far better.`);
  const cl = v.querySelector('.clue-slot');
  if (cl) cl.innerHTML = solved.has(n) ? `<div class="clue">${ICO.key}<div><b>Clue ${n} collected</b><span>${CASES[n].clue}</span></div></div>` : `<div class="clue" style="opacity:.55;filter:grayscale(1)">${ICO.key}<div><b>Clue ${n} locked</b><span>Answer the “Check your deductions” questions to collect it.</span></div></div>`;
}
function buildVerdicts() {
  $$('.verdict[data-case]').forEach(v => {
    const n = +v.dataset.case, d = CASES[n].mystery;
    v.innerHTML = `<div class="verdict-top"><div class="t"><small>Case file ${String(n).padStart(2, '0')}</small>Close the case</div><button class="btn primary small">Reveal the answer</button></div><div class="verdict-body"><p style="color:var(--muted);font-size:14px;margin-bottom:6px">${d.q}</p><p style="font-size:17px">${d.v}</p><p class="hint hunch-res"></p><div class="clue-slot"></div></div>`;
    const btn = v.querySelector('.btn');
    btn.addEventListener('click', () => { const open = v.classList.toggle('open'); btn.textContent = open ? 'Hide' : 'Reveal the answer'; refreshVerdict(v); });
    refreshVerdict(v);
  });
}
function buildColdCases() {
  $$('.coldcase[data-from]').forEach(cc => {
    const upto = +cc.dataset.from;
    const pool = [];
    for (let i = 1; i <= upto; i++) QUIZ[i].forEach(q => pool.push([i, q]));
    EXTRA_Q.filter(q => q.c <= upto).forEach(q => pool.push([q.c, q]));
    const pick = pool[Math.floor(Math.random() * pool.length)];
    cc.innerHTML = `<span class="tag">↺ Cold case review · from file ${String(pick[0]).padStart(2, '0')}</span><p class="hint" style="margin:0 0 10px">Before the new case, a quick look back. Spacing out your recall makes memories last.</p>` + quizHTML(pick[1], 0);
    wireQuestion(cc.querySelector('.q'), pick[1]);
  });
}
