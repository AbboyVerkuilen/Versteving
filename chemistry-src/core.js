/* =========================================================
   THE INVISIBLE WORLD · shared series engine
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const PFX = 'iw' + COURSE.id + ':';
const store = {
  get(k, d) { try { const v = localStorage.getItem(PFX + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(PFX + k, JSON.stringify(v)); } catch (e) {} }
};
function seeded(seed) { let s = (seed * 2654435761) >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function gauss() { return Math.sqrt(-2 * Math.log(Math.random() + 1e-9)) * Math.cos(TAU * Math.random()); }
function hexRgb(h) { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function rgbHex(r, g, b) { return '#' + [r, g, b].map(v => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join(''); }
function shade(h, amt) { const [r, g, b] = hexRgb(h); return amt < 0 ? rgbHex(r * (1 + amt), g * (1 + amt), b * (1 + amt)) : rgbHex(r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt); }
function mix(a, b, t) { const A = hexRgb(a), B = hexRgb(b); return rgbHex(lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)); }
function rgba(h, a) { const [r, g, b] = hexRgb(h); return `rgba(${r},${g},${b},${a})`; }
function rampColor(stops, t) { t = clamp(t, 0, 1) * (stops.length - 1); const i = Math.min(stops.length - 2, Math.floor(t)); return mix(stops[i], stops[i + 1], t - i); }
const sub = s => String(s).replace(/(\d+)/g, '<sub>$1</sub>');
const fmt = (x, d = 2) => { if (!isFinite(x)) return '–'; const a = Math.abs(x); if (a !== 0 && (a >= 1e5 || a < 1e-3)) { const e = Math.floor(Math.log10(a)); return `${(x / Math.pow(10, e)).toFixed(d)} × 10<sup>${e}</sup>`; } return a !== 0 && a < 1 ? x.toLocaleString('en', { maximumSignificantDigits: d + 1 }) : x.toLocaleString('en', { maximumFractionDigits: d }); };

const spriteCache = new Map();
function sprite(color, r) {
  r = Math.max(2, Math.round(r)); const key = color + '|' + r; let s = spriteCache.get(key); if (s) return s;
  const d = 2, size = r * 2 * d + 2; s = document.createElement('canvas'); s.width = s.height = size;
  const g = s.getContext('2d'), c = size / 2, R = r * d;
  const gr = g.createRadialGradient(c - R * .35, c - R * .4, R * .05, c, c, R);
  gr.addColorStop(0, '#ffffff'); gr.addColorStop(.2, shade(color, .35)); gr.addColorStop(.62, color); gr.addColorStop(1, shade(color, -.62));
  g.fillStyle = gr; g.beginPath(); g.arc(c, c, R, 0, TAU); g.fill(); spriteCache.set(key, s); return s;
}
function ball(ctx, color, x, y, r) { if (r <= 0) return; ctx.drawImage(sprite(color, r), x - r, y - r, r * 2, r * 2); }
function glow(ctx, x, y, r, color, a = 1) { if (r <= 0) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(color, .55 * a)); g.addColorStop(.4, rgba(color, .18 * a)); g.addColorStop(1, rgba(color, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }
function fit(c) {
  const r = c.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.max(1, Math.round(r.width * d)), h = Math.max(1, Math.round(r.height * d));
  if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
  const ctx = c.getContext('2d'); ctx.setTransform(d, 0, 0, d, 0, 0); return { ctx, w: r.width, h: r.height };
}
function label(ctx, text, x, y, o = {}) { ctx.fillStyle = o.color || 'rgba(255,255,255,.75)'; ctx.font = o.font || `${o.size || 11}px "JetBrains Mono", monospace`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'alphabetic'; ctx.fillText(text, x, y); }

const animators = [];
const visIO = new IntersectionObserver(es => es.forEach(e => animators.forEach(a => { if (a.el === e.target) a.vis = e.isIntersecting; })), { rootMargin: '120px' });
function animate(el, fn) { const a = { el, fn, vis: false }; animators.push(a); visIO.observe(el); return a; }
let lastT = performance.now();
(function frame(t) { const dt = Math.min(.05, (t - lastT) / 1000); lastT = t; for (const a of animators) if (a.vis) { try { a.fn(dt, t / 1000); } catch (err) { console.error(err); a.vis = false; } } requestAnimationFrame(frame); })(lastT);
function tween(dur, fn, done) { const t0 = performance.now(); (function step(t) { const k = clamp((t - t0) / dur, 0, 1); fn(k); if (k < 1) requestAnimationFrame(step); else if (done) done(); })(t0); }
const ease = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
function toast(html) { const t = $('#toast'); t.innerHTML = html; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 3800); }
const SVGNS = 'http://www.w3.org/2000/svg';
function svgEl(tag, attrs = {}, parent) { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
function seg(el, items, cur, onPick) { el.innerHTML = items.map(([k, t]) => `<button data-k="${k}" class="${k === cur ? 'on' : ''}">${t}</button>`).join(''); el.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('button', el).forEach(x => x.classList.toggle('on', x === b)); onPick(b.dataset.k); }); }
function slider(el, fn) { el.addEventListener('input', () => fn(+el.value)); fn(+el.value); }

/* ---------- cast ---------- */
const CAST = Object.assign({
  H: { name: 'Hal', full: 'Hydrogen', color: '#dfe9ff', title: 'The Smallest Wanderer' },
  He: { name: 'Helia', full: 'Helium', color: '#ffd36e', title: 'The Aloof Aristocrat' },
  C: { name: 'Cass', full: 'Carbon', color: '#9aa3b8', title: 'The Builder of Life' },
  N: { name: 'Nate', full: 'Nitrogen', color: '#6b8cff', title: 'The Sleepy Giant of the Air' },
  O: { name: 'Ola', full: 'Oxygen', color: '#ff5d5d', title: 'The Electron Thief' },
  Na: { name: 'Sid', full: 'Sodium', color: '#b38cff', title: 'The Reckless Giver' },
  Cl: { name: 'Clo', full: 'Chlorine', color: '#6fe3a0', title: 'The Grabby Poison' },
  Fe: { name: 'Ferro', full: 'Iron', color: '#e8925a', title: 'The Rusting Knight' },
  Au: { name: 'Goldie', full: 'Gold', color: '#f4c35a', title: 'The Unbothered' },
  e: { name: 'The Ghost', full: 'Electron', color: '#5ce1e6', title: 'The culprit of Chemistry 101', sym: 'e⁻' },
  p: { name: 'Proton', full: 'Proton', color: '#ff5d5d', title: 'H⁺, the hot potato', sym: 'p⁺' },
  n: { name: 'Neutron', full: 'Neutron', color: '#9aa3b8', title: '', sym: 'n⁰' }
}, COURSE.cast || {});
let avId = 0;
function avatarSVG(el, mood = 'happy', size = 56) {
  const c = CAST[el] || { color: '#999' }, id = 'av' + (avId++), sym = c.sym || el, ink = '#141625';
  let face;
  if (mood === 'happy') face = `<ellipse cx="25" cy="36" rx="2.6" ry="3.2" fill="${ink}"/><ellipse cx="39" cy="36" rx="2.6" ry="3.2" fill="${ink}"/><path d="M26 43 Q32 48.5 38 43" stroke="${ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  else if (mood === 'sly') face = `<path d="M21.5 36 q3.5 -2.6 7 0" stroke="${ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M35.5 36 q3.5 -2.6 7 0" stroke="${ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M27 44 Q34 47 39 42" stroke="${ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  else if (mood === 'shocked') face = `<circle cx="25" cy="36" r="3.4" fill="${ink}"/><circle cx="39" cy="36" r="3.4" fill="${ink}"/><ellipse cx="32" cy="45" rx="3" ry="3.6" fill="${ink}"/>`;
  else face = `<path d="M22 37 h6 M36 37 h6" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/><path d="M28 44 h8" stroke="${ink}" stroke-width="2.2" stroke-linecap="round"/>`;
  const orbit = c.orbit ? `<ellipse cx="32" cy="32" rx="31" ry="9" fill="none" stroke="${c.color}" stroke-opacity=".5" stroke-width="1.2" transform="rotate(-20 32 32)"/>` : '';
  return `<svg viewBox="-2 -2 68 68" width="${size}" height="${size}" aria-hidden="true"><defs><radialGradient id="${id}" cx="36%" cy="30%" r="78%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".22" stop-color="${shade(c.color, .25)}"/><stop offset=".7" stop-color="${c.color}"/><stop offset="1" stop-color="${shade(c.color, -.55)}"/></radialGradient></defs>${orbit}<circle cx="32" cy="32" r="27" fill="url(#${id})"/><text x="32" y="25" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="${sym.length > 2 ? 10 : 13}" fill="${ink}" fill-opacity=".8">${sym}</text><circle cx="20" cy="42" r="3" fill="#ff7aa8" opacity=".35"/><circle cx="44" cy="42" r="3" fill="#ff7aa8" opacity=".35"/>${face}</svg>`;
}
function renderAvatars(root = document) { $$('.avatar[data-el]', root).forEach(a => { if (a.dataset.done) return; a.innerHTML = avatarSVG(a.dataset.el, a.dataset.mood, +(a.dataset.size || 56)); a.dataset.done = 1; }); }
const av = (el, mood = 'happy', size = 48) => `<span class="avatar" data-el="${el}" data-mood="${mood}" data-size="${size}"></span>`;

/* ---------- icons (24px line set) ---------- */
const P = {
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  atom: '<circle cx="12" cy="12" r="1.8" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
  pen: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/>',
  flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>',
  scale: '<path d="M12 3v18M5 21h14M4 7h16"/><path d="M4 7l-3 7a3 3 0 0 0 6 0zM20 7l-3 7a3 3 0 0 0 6 0z"/>',
  bread: '<path d="M4 11a4 4 0 0 1 2-7h12a4 4 0 0 1 2 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>',
  balloon: '<ellipse cx="12" cy="9" rx="6" ry="7"/><path d="M12 16l-1 2h2zM12 18c0 2-2 2-2 4"/>',
  cup: '<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h2a2 2 0 0 1 0 4h-2M8 2c0 2 2 2 2 4M12 2c0 2 2 2 2 4"/>',
  star: '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  prism: '<path d="M12 4l8 15H4z"/><path d="M2 11l6 1M14 11l8-3M14 12l8 0M14 13l8 3"/>',
  rad: '<circle cx="12" cy="12" r="2"/><path d="M12 10L8 3a10 10 0 0 0-5 8.5h7M12 10l4-7a10 10 0 0 1 5 8.5h-7M10.5 13.5L7 20a10 10 0 0 0 10 0l-3.5-6.5"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  magnet: '<path d="M6 3v9a6 6 0 0 0 12 0V3h-4v9a2 2 0 0 1-4 0V3z"/><path d="M6 7h4M14 7h4"/>',
  drop: '<path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12z"/>',
  snow: '<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 4l3 2 3-2M9 20l3-2 3 2"/>',
  mountain: '<path d="M2 20l7-12 4 6 3-4 6 10z"/><path d="M8 10l1 1 1-1"/>',
  flame: '<path d="M12 22c-4 0-7-2.7-7-6.5C5 10 12 8 10.5 2c4 2.5 8.5 6.5 8.5 13 0 4-3 7-7 7z"/>',
  battery: '<rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 10v4M6 10v4M10 10v4"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  leaf: '<path d="M5 19c0-9 6-15 15-15 0 9-6 15-15 15z"/><path d="M5 19l9-9"/>',
  dna: '<path d="M7 2c0 6 10 6 10 12s-10 6-10 8M17 2c0 6-10 6-10 12s10 6 10 8"/><path d="M8 6h8M8 18h8M9.5 10h5"/>',
  bottle: '<path d="M10 2h4v4l2 3v12a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9l2-3z"/><path d="M8 13h8"/>',
  lemon: '<circle cx="12" cy="12" r="9"/><path d="M12 5v14M5 12h14M7 7l10 10M17 7L7 17"/>',
  wave: '<path d="M2 12c2.5-5 5-5 7.5 0s5 5 7.5 0 5-5 5 0"/>',
  heart: '<path d="M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z"/>',
  fish: '<path d="M3 12c4-6 11-6 15 0-4 6-11 6-15 0z"/><path d="M18 12l4-4v8z"/><circle cx="8" cy="11" r=".8" fill="currentColor"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
  car: '<path d="M3 16v-4l2-5h14l2 5v4z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  gem: '<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M9 3l3 18 3-18"/>',
  chain: '<rect x="2" y="9" width="10" height="6" rx="3"/><rect x="12" y="9" width="10" height="6" rx="3"/>',
  thermo: '<path d="M10 4a2 2 0 0 1 4 0v10a4 4 0 1 1-4 0z"/><path d="M12 9v7"/>',
  gauge: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-6"/>',
  shell: '<path d="M12 20c-5 0-9-3-9-8 4 0 6 3 9 8zM12 20c5 0 9-3 9-8-4 0-6 3-9 8zM12 20V4M8 6l4-2 4 2"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
  key: '<circle cx="8" cy="12" r="4"/><path d="M12 12h9v3M18 12v3"/>',
  ice: '<path d="M7 6h18l-2 22H9z" transform="scale(.75) translate(-1 -2)"/><path d="M6 10h12"/>',
  candy: '<circle cx="12" cy="12" r="5"/><path d="M7 12l-5-3v6zM17 12l5-3v6z"/>',
  flower: '<circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="5.5" r="3"/><circle cx="12" cy="18.5" r="3"/><circle cx="5.5" cy="12" r="3"/><circle cx="18.5" cy="12" r="3"/>',
  wind: '<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h6"/>'
};
const ico = (k, size = 24, color = 'currentColor', sw = 1.8) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${P[k] || P.atom}</svg>`;
const KEY = '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19" fill="#f4c35a" fill-opacity=".15" stroke="#f4c35a"/><path d="M14 20a4 4 0 1 1 8 0 4 4 0 0 1-8 0zM22 20h8v3M27 20v3" stroke="#f4c35a" stroke-width="2" stroke-linecap="round"/></svg>';
function artSVG(k, c1 = '#6fe3a0', c2 = '#5ce1e6') {
  const id = 'ag' + (avId++);
  return `<svg viewBox="0 0 140 140"><defs><radialGradient id="${id}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="${c1}" stop-opacity=".45"/><stop offset="1" stop-color="${c2}" stop-opacity=".05"/></radialGradient></defs><circle cx="70" cy="70" r="62" fill="url(#${id})" stroke="${rgba(c1, .4)}"/>${[0, 1, 2].map(i => `<circle cx="70" cy="70" r="${66 + i * 0}" fill="none" stroke="${rgba(c2, .25)}" stroke-dasharray="2 ${6 + i * 4}" transform="rotate(${i * 40} 70 70)"/>`).join('')}<g transform="translate(34 34) scale(3)" fill="none" stroke="${shade(c1, .5)}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${P[k] || P.atom}</g></svg>`;
}

/* =========================================================
   PAGE BUILDER
   ========================================================= */
const SERIES = [
  ['101', 'The Invisible World', 'Atoms, bonds & reactions'], ['102', 'The Counting Problem', 'The mole & quantities'], ['103', 'Ghost Light', 'Light, orbitals & the nucleus'],
  ['104', 'The Shape of Things', 'Bonding, shape & forces'], ['105', 'Under Pressure', 'Gases, phases & solutions'], ['106', 'The Energy Ledger', 'Thermochemistry & entropy'],
  ['107', 'The Balance', 'Kinetics & equilibrium'], ['108', 'Proton Wars', 'Acids, bases & buffers'], ['109', 'The Electron Market', 'Redox & electrochemistry'], ['110', 'The Carbon Code', 'Organic & biochemistry']
];
const CASES = COURSE.cases; const NC = CASES.length; const pad = n => String(n).padStart(2, '0');
function buildPage() {
  const C = COURSE, i = SERIES.findIndex(s => s[0] === C.id), next = SERIES[i + 1];
  const menu = SERIES.map(s => `<a href="../chemistry-${s[0]}/index.html" class="${s[0] === C.id ? 'cur' : ''}"><b>${s[0]}</b><span>${s[1]}<small>${s[2]}</small></span></a>`).join('');
  let h = `<div class="progress" id="progress"></div>
  <header class="topbar"><a class="brand" href="#top"><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="6" fill="#f4c35a"/><g fill="none" stroke="#5ce1e6" stroke-width="2.5"><ellipse cx="32" cy="32" rx="28" ry="10"/><ellipse cx="32" cy="32" rx="28" ry="10" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="28" ry="10" transform="rotate(120 32 32)"/></g></svg><span>${C.brand}</span></a><div class="spacer"></div>
  <details class="courses"><summary class="tb-btn">Chem ${C.id} <span class="tb-hide">· courses</span> ▾</summary><nav class="menu" aria-label="All courses">${menu}</nav></details>
  <a class="evidence-pill" href="#prologue" title="Clues collected"><span class="dots" id="ev-dots"></span><span><b id="ev-count">0</b>/${NC} <span class="tb-hide">clues</span></span></a>
  <a class="tb-btn" href="#training">${ico('bread', 15)}<span class="tb-hide">Flashcards</span><span class="badge" id="due-badge">0</span></a></header>
  <nav class="rail" id="rail" aria-label="Case files"><a href="#prologue" data-sec="prologue"><b>★</b><span>${C.prologue.short}</span></a>${CASES.map((c, k) => `<a href="#case${k + 1}" data-sec="case${k + 1}"><b>${k + 1}</b><span>${c.short}</span></a>`).join('')}<a href="#finale" data-sec="finale"><b>!</b><span>The Reveal</span></a><a href="#training" data-sec="training"><b>✎</b><span>Training Room</span></a></nav>
  <section class="hero" id="top"><canvas id="hero-canvas" aria-hidden="true"></canvas><div class="hero-inner"><div class="eyebrow">${C.eyebrow}</div><h1>${C.titleHTML}</h1><p class="lede">${C.lede}</p><div class="cta-row"><a class="btn primary" href="#prologue">Open the first file ↓</a><a class="btn" href="#case1">Skip to case 1</a></div></div><div class="scroll-hint">SCROLL<i></i></div></section><main>
  <section class="chapter" id="prologue"><div class="wrap"><header class="case-head reveal"><div class="case-num"><span>Prologue</span><b>00</b></div><div><p class="kicker">${C.prologue.kicker}</p><h2>${C.prologue.titleHTML}</h2></div></header>
  <div class="story reveal">${C.prologue.story}</div><div class="board reveal" id="board"></div><p class="hint reveal" style="text-align:center">Each clue unlocks when you pass the <b>“Check your deductions”</b> questions in its case file. Progress is saved in this browser.</p>
  <div class="cast reveal"><div style="width:100%;font-family:var(--mono);font-size:11px;letter-spacing:.24em;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Persons of interest</div>${C.prologue.cast.map(([k, m]) => `<div class="cast-card">${av(k, m)}<div><b>${CAST[k].name} · ${CAST[k].full.toLowerCase()}</b><small>${CAST[k].title}</small></div></div>`).join('')}</div></div></section>`;
  CASES.forEach((c, k) => {
    const n = k + 1;
    h += `<section class="chapter case" id="case${n}" data-case="${n}"><div class="wrap">
    <header class="case-head reveal"><div class="case-num"><span>Case File</span><b>${pad(n)}</b></div><div><p class="kicker">${c.kicker}</p><h2>${c.titleHTML}</h2></div></header>
    ${n > 1 ? `<div class="coldcase reveal" data-from="${n - 1}"></div>` : ''}<div class="mystery reveal" data-mystery="${n}"></div>
    <div class="story reveal">${c.story}</div>
    ${c.cast ? `<div class="cast reveal">${c.cast.map(([e, m, t, s]) => `<div class="cast-card">${av(e, m)}<div><b>${t}</b><small>${s}</small></div></div>`).join('')}</div>` : ''}
    <div class="lab reveal" id="lab${n}"><div class="lab-head"><div><span class="label">Lab ${n} · ${c.lab.label}</span><h3>${c.lab.title}</h3></div>${c.lab.head || ''}</div><div class="lab-body">${c.lab.body}</div></div>
    ${c.dialogue ? `<div class="dialogue reveal">${c.dialogue.map(([e, m, who, t], j) => `<div class="line ${j % 2 ? 'right' : ''}">${av(e, m, 56)}<div class="bubble"><b>${who}</b>${t}</div></div>`).join('')}</div>` : ''}
    ${c.story2 ? `<div class="story reveal">${c.story2}</div>` : ''}
    <div class="lenses reveal"><div class="lens macro"><div class="lt">${ico('eye')}Macro</div><p>${c.lenses[0]}</p></div><div class="lens micro"><div class="lt">${ico('atom')}Micro</div><p>${c.lenses[1]}</p></div><div class="lens symbol"><div class="lt">${ico('pen')}Symbolic</div><span class="formula">${c.lenses[2]}</span><p>${c.lenses[3]}</p></div></div>
    <aside class="miracle reveal"><div class="art">${artSVG(c.miracle.ico, c.miracle.c1, c.miracle.c2)}</div><div><span class="tag">Everyday miracle</span><h3>${c.miracle.title}</h3>${c.miracle.html}</div></aside>
    <div class="practice"><div class="block feynman" data-case="${n}"></div><div class="block quiz" data-case="${n}"></div></div><div class="verdict" data-case="${n}"></div></div></section>`;
  });
  h += `<section class="finale" id="finale"><canvas id="finale-canvas" style="position:absolute;inset:0;width:100%;height:100%;opacity:.7" aria-hidden="true"></canvas><div class="wrap narrow" style="position:relative"><div class="eyebrow">The reveal</div><h2 style="margin-top:18px">${C.finale.q}</h2><p class="story" style="margin:24px auto 0;text-align:center">${C.finale.lead}</p><div class="clue-chain" id="clue-chain"></div><button class="btn primary" id="reveal-btn">Name the culprit</button>
  <div class="culprit" id="culprit"><div class="big">${av(C.finale.avatar, 'sly', 150)}</div><div class="eyebrow">The culprit is</div><h3>${C.finale.nameHTML}</h3><div class="story" style="margin:0 auto;text-align:left">${C.finale.html}</div>${next ? `<a class="btn primary next-course" href="../chemistry-${next[0]}/index.html">Next: Chemistry ${next[0]} · ${next[1]} →</a>` : `<p class="hint" style="margin-top:30px">That's the end of the series. You started unable to see atoms; now you can read the code of life.</p>`}</div></div></section>
  <section class="chapter training" id="training"><div class="wrap"><header class="case-head reveal"><div class="case-num"><span>Training room</span><b>✎</b></div><div><p class="kicker">Make it stick</p><h2>The Detective's <em>Training</em> Room</h2></div></header>
  <div class="story reveal"><p>Reading feels like learning, but most of it fades within days. What makes knowledge stay is <strong>pulling it back out of memory</strong>, again and again, with gaps in between. These cards come back sooner when you struggle and later when you know them.</p></div>
  <div class="lab reveal"><div class="lab-head"><div><span class="label">Spaced repetition · Leitner boxes</span><h3>Flashcards</h3></div><span class="readout" id="fc-status"></span></div><div class="lab-body fc-wrap"><div><div class="fc" id="fc" tabindex="0" role="button" aria-label="Flashcard: press to flip"><div class="fc-inner"><div class="fc-face fc-front"><span class="tag" id="fc-tag"></span><span class="box" id="fc-box"></span><div class="txt" id="fc-q"></div><span class="flip-hint">click or press space to flip</span></div><div class="fc-face fc-back"><span class="tag">Answer</span><div class="txt" id="fc-a"></div></div></div></div>
  <div class="fc-rate" id="fc-rate"><button class="btn small r1" data-r="1">✗ Didn't know <span class="mono" style="opacity:.5">1</span></button><button class="btn small r2" data-r="2">~ Shaky <span class="mono" style="opacity:.5">2</span></button><button class="btn small r3" data-r="3">✓ Knew it <span class="mono" style="opacity:.5">3</span></button></div></div>
  <div class="side-panel"><div class="info-card"><div class="meta">DECK</div><select id="fc-filter" aria-label="Choose which case file to practise" style="margin-top:8px"></select><div class="meta" style="margin-top:16px">YOUR BOXES</div><div class="boxes" id="fc-boxes"></div><p class="hint" style="margin:6px 0 0;font-size:12.5px">Box 1 cards come back today. Box 5 cards come back in about a month.</p></div><button class="btn small ghost" id="fc-cram">Practise all now (cram mode)</button><button class="btn small ghost" id="fc-resetdeck" style="opacity:.7">Reset deck</button></div></div></div>
  <div class="lab reveal"><div class="lab-head"><div><span class="label">Interleaved practice · confidence check</span><h3>The Final Interrogation</h3></div><button class="btn small" id="fi-start">New interrogation</button></div><div class="lab-body"><div class="final-q" id="fi"></div></div></div>
  <h3 class="reveal" style="font-size:26px;margin-top:60px">How this page teaches you</h3><div class="strategies reveal">
  <div><b>Retrieval practice</b><small>Every case ends with questions. Recalling an answer strengthens memory far more than re-reading.</small></div><div><b>Spaced repetition</b><small>Flashcards return just as you are about to forget them.</small></div><div><b>Interleaving</b><small>The Final Interrogation mixes topics, so you practise choosing which idea to use.</small></div><div><b>Pre-testing</b><small>Each mystery asks for your hunch first. Guessing before learning primes memory.</small></div>
  <div><b>Dual coding</b><small>Every idea comes as words and a live picture.</small></div><div><b>Elaboration</b><small>“Explain it to a friend” prompts: the Feynman technique.</small></div><div><b>Concrete examples</b><small>Each abstract idea is tied to something you meet every day.</small></div><div><b>Metacognition</b><small>Rating your confidence shows whether you know it, or only think you do.</small></div></div></div></section></main>
  <footer><div class="wrap">The Invisible World · Chemistry ${C.id}: ${C.title} · A single page, every visual drawn live in your browser.<br>Your progress, notes and flashcard boxes are stored only on this device.${next ? ` · <a href="../chemistry-${next[0]}/index.html">Next course →</a>` : ''}</div></footer><div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  document.body.innerHTML = h;
  document.addEventListener('click', e => { const d = $('.courses'); if (d && d.open && !d.contains(e.target)) d.open = false; });
}

/* =========================================================
   PRACTICE: evidence, mysteries, quizzes, prompts, verdicts
   ========================================================= */
let solved = new Set(store.get('solved', []));
function markSolved(n) { if (solved.has(n)) return; solved.add(n); store.set('solved', [...solved]); updateEvidence(); toast(`${KEY.replace('<svg', '<svg width="26" height="26"')}<span>Clue ${n} of ${NC} acquired: <b>${CASES[n - 1].item}</b></span>`); const v = $(`.verdict[data-case="${n}"]`); if (v) refreshVerdict(v); }
function updateEvidence() {
  $('#ev-count').textContent = solved.size;
  $('#ev-dots').innerHTML = CASES.map((_, i) => `<span class="${solved.has(i + 1) ? 'on' : ''}"></span>`).join('');
  $$('.ev').forEach(e => { const n = +e.dataset.n; e.classList.toggle('solved', solved.has(n)); e.querySelector('small').innerHTML = solved.has(n) ? CASES[n - 1].clue : CASES[n - 1].teaser + ' <span style="color:var(--gold)">Unsolved</span>'; });
  $$('#rail a').forEach(a => { const m = /^case(\d+)$/.exec(a.dataset.sec || ''); if (m) a.classList.toggle('solved', solved.has(+m[1])); });
  const el = $('#clue-chain'); if (el) el.innerHTML = CASES.map((c, i) => `<div class="${solved.has(i + 1) ? '' : 'missing'}"><b>${pad(i + 1)}</b><span>${solved.has(i + 1) ? c.clue : '<i>Clue not yet collected. Solve case file ' + (i + 1) + '.</i>'}</span></div>`).join('');
}
function buildBoard() { $('#board').innerHTML = CASES.map((c, i) => `<a class="ev" href="#case${i + 1}" data-n="${i + 1}"><span class="ico" style="color:var(--gold)">${ico(c.ico, 28)}</span><span><b>${c.item}</b><small></small></span><span class="n">CLUE ${pad(i + 1)}</span></a>`).join(''); }
let hunches = store.get('hunches', {});
function buildMysteries() {
  $$('[data-mystery]').forEach(m => {
    const n = m.dataset.mystery, d = CASES[n - 1].mystery;
    m.innerHTML = `<div class="tag">The mystery · Clue ${n}: ${CASES[n - 1].item}</div><h3>${d.q}</h3><div class="hunches">${d.h.map((h, i) => `<button class="hunch" data-i="${i}">${h}</button>`).join('')}</div><div class="hunch-note"></div>`;
    const note = m.querySelector('.hunch-note');
    const set = i => { $$('.hunch', m).forEach(b => b.classList.toggle('picked', +b.dataset.i === i)); note.innerHTML = 'Hunch logged. Read on and let the evidence decide. The answer is revealed when you <b>close the case</b> at the end of this file.'; };
    if (hunches[n] != null) set(hunches[n]);
    $$('.hunch', m).forEach(b => b.addEventListener('click', () => { hunches[n] = +b.dataset.i; store.set('hunches', hunches); set(+b.dataset.i); const v = $(`.verdict[data-case="${n}"]`); if (v) refreshVerdict(v); }));
  });
}
const quizHTML = (q, idx) => `<div class="q" data-idx="${idx}"><p class="qt">${q.q}</p><div class="opts">${q.o.map((o, i) => `<button class="opt" data-i="${i}">${o}</button>`).join('')}</div><div class="fb"></div></div>`;
function wireQuestion(qel, q, onRight) {
  const fb = qel.querySelector('.fb'); let wrongOnce = false;
  $$('.opt', qel).forEach(b => b.addEventListener('click', () => {
    if (+b.dataset.i === q.a) { $$('.opt', qel).forEach(x => x.disabled = true); b.classList.add('right'); fb.className = 'fb show good'; fb.innerHTML = `<b>${wrongOnce ? 'Got it now.' : 'Correct.'}</b> ${q.w}`; onRight && onRight(!wrongOnce); }
    else { wrongOnce = true; b.classList.add('wrong'); b.disabled = true; fb.className = 'fb show bad'; fb.innerHTML = '<b>Not quite.</b> Think again and pick another answer. Mistakes you correct are some of the best learning there is.'; }
  }));
}
function buildQuizzes() {
  $$('.quiz[data-case]').forEach(box => {
    const n = +box.dataset.case, qs = CASES[n - 1].quiz;
    box.innerHTML = `<div class="tag">${ico('pen', 14)} Retrieval practice</div><h4>Check your deductions</h4><p class="why">Answer from memory first. Answer all correctly to collect the clue.</p>` + qs.map(quizHTML).join('');
    let right = 0; $$('.q', box).forEach((qel, i) => wireQuestion(qel, qs[i], () => { right++; if (right === qs.length) markSolved(n); }));
    if (solved.has(n)) box.insertAdjacentHTML('beforeend', '<p class="hint" style="margin-top:14px"><span class="stamp">CLUE COLLECTED</span> &nbsp;Answering again is still great practice.</p>');
  });
}
let notes = store.get('notes', {});
function buildFeynman() {
  $$('.feynman[data-case]').forEach(box => {
    const n = box.dataset.case, Pp = CASES[n - 1].prompt;
    box.innerHTML = `<div class="tag">${ico('pen', 14)} Elaboration · Feynman technique</div><h4>Explain it to a friend</h4><p class="why">${Pp.p}</p><textarea placeholder="Write it in your own words. Rough is fine; the effort is what counts." aria-label="Your explanation"></textarea><div class="controls" style="margin-top:10px"><button class="btn small">Compare with the detective's notes</button><span class="saved"></span></div><div class="model"><b style="color:var(--violet)">Detective's notes:</b> ${Pp.m}<br><span class="hint" style="font-size:12.5px">Anything you missed is exactly what to remember.</span></div>`;
    const ta = box.querySelector('textarea'), saved = box.querySelector('.saved'), model = box.querySelector('.model');
    ta.value = notes[n] || ''; if (ta.value) saved.textContent = 'saved on this device';
    let t; ta.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { notes[n] = ta.value; store.set('notes', notes); saved.textContent = 'saved on this device'; }, 400); });
    box.querySelector('.btn').addEventListener('click', () => { if (!ta.value.trim()) { saved.textContent = 'Write something first. Even one sentence helps.'; ta.focus(); return; } model.classList.add('show'); });
  });
}
function refreshVerdict(v) {
  const n = +v.dataset.case, d = CASES[n - 1].mystery, h = hunches[n];
  v.querySelector('.hunch-res').innerHTML = h == null ? 'You didn\'t log a hunch for this one. Guessing first, even wrongly, makes the answer stick.' : (h === d.a ? `Your hunch, <b>“${d.h[h]}”</b>, was <b style="color:var(--green)">right</b>. Sharp detective work.` : `Your hunch was <b>“${d.h[h]}”</b>. Not quite, but having guessed first means this answer will stick far better.`);
  v.querySelector('.clue-slot').innerHTML = solved.has(n) ? `<div class="clue">${KEY}<div><b>Clue ${n} collected</b><span>${CASES[n - 1].clue}</span></div></div>` : `<div class="clue" style="opacity:.55;filter:grayscale(1)">${KEY}<div><b>Clue ${n} locked</b><span>Answer the “Check your deductions” questions to collect it.</span></div></div>`;
}
function buildVerdicts() {
  $$('.verdict[data-case]').forEach(v => {
    const n = +v.dataset.case, d = CASES[n - 1].mystery;
    v.innerHTML = `<div class="verdict-top"><div class="t"><small>Case file ${pad(n)}</small>Close the case</div><button class="btn primary small">Reveal the answer</button></div><div class="verdict-body"><p style="color:var(--muted);font-size:14px;margin-bottom:6px">${d.q}</p><p style="font-size:17px">${d.v}</p><p class="hint hunch-res"></p><div class="clue-slot"></div></div>`;
    const btn = v.querySelector('.btn'); btn.addEventListener('click', () => { const open = v.classList.toggle('open'); btn.textContent = open ? 'Hide' : 'Reveal the answer'; refreshVerdict(v); });
    refreshVerdict(v);
  });
}
function bank() { const b = []; CASES.forEach((c, i) => c.quiz.forEach(q => b.push({ ...q, c: i + 1 }))); (COURSE.extra || []).forEach(q => b.push(q)); return b; }
function buildColdCases() {
  $$('.coldcase[data-from]').forEach(cc => {
    const upto = +cc.dataset.from, pool = bank().filter(q => q.c <= upto), pick = pool[Math.floor(Math.random() * pool.length)];
    cc.innerHTML = `<span class="tag">↺ Cold case review · from file ${pad(pick.c)}</span><p class="hint" style="margin:0 0 10px">A quick look back before the new case. Spacing out recall makes memories last.</p>` + quizHTML(pick, 0);
    wireQuestion(cc.querySelector('.q'), pick);
  });
}

/* =========================================================
   FLASHCARDS & INTERROGATION
   ========================================================= */
function flashcards() {
  const CARDS = COURSE.cards, DAY = 864e5, INT = [0, 0, 1, 3, 7, 30];
  let deck = store.get('deck', {}); const card = $('#fc'), rate = $('#fc-rate'), sel = $('#fc-filter');
  let queue = [], curr = null, filter = 'all', cram = false;
  sel.innerHTML = `<option value="all">All case files (${CARDS.length} cards)</option>` + CASES.map((c, i) => `<option value="${i + 1}">File ${i + 1}: ${c.short} (${CARDS.filter(x => x[0] === i + 1).length})</option>`).join('');
  const st = i => deck[i] || { box: 1, due: 0 }, inF = i => filter === 'all' || CARDS[i][0] == filter;
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function build() { queue = shuffle(CARDS.map((_, i) => i).filter(i => inF(i) && (cram || st(i).due <= Date.now()))); next(); }
  function boxes() {
    const counts = [0, 0, 0, 0, 0]; CARDS.forEach((_, i) => { if (inF(i)) counts[st(i).box - 1]++; }); const mx = Math.max(1, ...counts);
    $('#fc-boxes').innerHTML = counts.map((c, i) => `<div><span>${c}</span><i style="height:${c / mx * 80 + 2}%"></i><span>Box ${i + 1}</span></div>`).join('');
    const due = CARDS.filter((_, i) => st(i).due <= Date.now()).length; $('#due-badge').textContent = due; $('#due-badge').style.display = due ? '' : 'none';
  }
  function next() {
    card.classList.remove('flipped'); rate.classList.remove('show'); boxes();
    if (!queue.length) { curr = null; $('#fc-tag').textContent = 'All caught up'; $('#fc-box').textContent = ''; $('#fc-q').innerHTML = cram ? 'Cram session complete. Nicely done.' : 'No cards due right now. Come back tomorrow: the gap is what makes it stick.'; $('#fc-a').innerHTML = 'Spacing beats cramming.'; $('#fc-status').textContent = 'Nothing due'; return; }
    curr = queue[0]; const C = CARDS[curr];
    $('#fc-tag').textContent = `File ${C[0]} · ${CASES[C[0] - 1].short}`; $('#fc-box').textContent = `BOX ${st(curr).box}`;
    setTimeout(() => { $('#fc-q').innerHTML = C[1]; $('#fc-a').innerHTML = C[2]; }, card.dataset.was ? 250 : 0); card.dataset.was = 1;
    $('#fc-status').textContent = `${queue.length} card${queue.length > 1 ? 's' : ''} left in this session`;
  }
  function flip() { if (curr == null) return; card.classList.toggle('flipped'); if (card.classList.contains('flipped')) rate.classList.add('show'); }
  function grade(g) {
    if (curr == null || !card.classList.contains('flipped')) return;
    let box = st(curr).box, due;
    if (g === 1) { box = 1; due = Date.now(); } else if (g === 2) due = Date.now() + Math.max(6e5, INT[box] * DAY / 2); else { box = Math.min(5, box + 1); due = Date.now() + INT[box] * DAY; }
    deck[curr] = { box, due }; store.set('deck', deck); queue.shift(); if (g === 1) queue.splice(Math.min(queue.length, 3), 0, curr); next();
  }
  card.addEventListener('click', flip); card.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } });
  document.addEventListener('keydown', e => { const a = document.activeElement; if (a !== card && !rate.contains(a)) return; if (['1', '2', '3'].includes(e.key)) grade(+e.key); });
  rate.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { grade(+b.dataset.r); card.focus({ preventScroll: true }); } });
  sel.addEventListener('change', () => { filter = sel.value; cram = false; build(); });
  $('#fc-cram').addEventListener('click', () => { cram = true; build(); });
  $('#fc-resetdeck').addEventListener('click', () => { if (!confirm('Reset all flashcard progress for this course?')) return; deck = {}; store.set('deck', deck); cram = false; build(); });
  build();
}
function interrogation() {
  const box = $('#fi'), B = bank(); let qs = [], i = 0, log = [];
  function start() { const by = {}; B.forEach(q => (by[q.c] = by[q.c] || []).push(q)); qs = Object.values(by).map(a => a[Math.floor(Math.random() * a.length)]); qs = qs.concat(B.filter(q => !qs.includes(q)).sort(() => Math.random() - .5).slice(0, 10 - qs.length)).sort(() => Math.random() - .5); i = 0; log = []; show(); }
  function show() {
    if (i >= qs.length) return summary(); const q = qs[i]; let picked = null;
    box.innerHTML = `<div class="meta" style="margin-bottom:10px">QUESTION ${i + 1} OF ${qs.length} · FROM CASE FILE ${pad(q.c)}</div><div style="height:4px;border-radius:4px;background:rgba(255,255,255,.06);margin-bottom:18px;overflow:hidden"><div style="height:100%;width:${i / qs.length * 100}%;background:linear-gradient(90deg,var(--violet),var(--gold))"></div></div><p class="qt" style="font-size:19px;font-family:var(--display);margin-bottom:14px">${q.q}</p><div class="opts">${q.o.map((o, k) => `<button class="opt" data-i="${k}">${o}</button>`).join('')}</div><div class="conf"><span>How sure are you?</span><button class="btn small" data-c="0">Just guessing</button><button class="btn small" data-c="1">Fairly sure</button><button class="btn small" data-c="2">Certain</button></div><div class="fb"></div><div class="controls" style="display:none" id="fi-next"><button class="btn primary small">${i === qs.length - 1 ? 'See my report' : 'Next question →'}</button></div>`;
    const conf = box.querySelector('.conf');
    $$('.opt', box).forEach(b => b.addEventListener('click', () => { if (conf.dataset.locked) return; picked = +b.dataset.i; $$('.opt', box).forEach(x => x.style.borderColor = x === b ? 'var(--violet)' : ''); conf.classList.add('show'); }));
    $$('.conf .btn', box).forEach(b => b.addEventListener('click', () => {
      if (conf.dataset.locked) return; conf.dataset.locked = 1; const ok = picked === q.a; log.push({ ok, conf: +b.dataset.c });
      $$('.conf .btn', box).forEach(x => x.classList.toggle('on', x === b));
      $$('.opt', box).forEach(x => { x.disabled = true; x.style.borderColor = ''; const k = +x.dataset.i; if (k === q.a) x.classList.add('right'); else if (k === picked) x.classList.add('wrong'); });
      const fb = box.querySelector('.fb'); fb.className = 'fb show ' + (ok ? 'good' : 'bad'); fb.innerHTML = `<b>${ok ? 'Correct.' : 'Not this time.'}</b> ${q.w}`;
      const nx = $('#fi-next'); nx.style.display = 'flex'; nx.querySelector('button').addEventListener('click', () => { i++; show(); });
    }));
  }
  function summary() {
    const right = log.filter(l => l.ok).length, sure = log.filter(l => l.conf === 2), sr = sure.filter(l => l.ok).length, gs = log.filter(l => l.conf === 0), gr = gs.filter(l => l.ok).length;
    const calib = sure.length && sr / sure.length < .75 ? 'When you felt <b>certain</b>, you were wrong more often than you expected. Those are exactly the ideas to revisit.' : gs.length && gr / gs.length > .6 ? 'Many of your <b>guesses</b> were right. You know more than you think!' : 'Your confidence matched your accuracy well. That\'s good self-knowledge, known as metacognition.';
    box.innerHTML = `<h4 style="font-size:28px">Interrogation report</h4><div class="result-grid"><div><b>${right}/${log.length}</b><small>correct</small></div><div><b>${sure.length ? Math.round(sr / sure.length * 100) + '%' : '–'}</b><small>right when “certain”</small></div><div><b>${gs.length ? Math.round(gr / gs.length * 100) + '%' : '–'}</b><small>right when “guessing”</small></div></div><p style="color:var(--soft)">${calib}</p><p class="hint">Questions were shuffled across topics (interleaving). It feels harder than practising one topic at a time, which is exactly why it works.</p><button class="btn primary small" id="fi-again">Interrogate me again</button>`;
    $('#fi-again').addEventListener('click', start);
  }
  $('#fi-start').addEventListener('click', start); start();
}

/* =========================================================
   HERO & FINALE
   ========================================================= */
function hero() {
  const c = $('#hero-canvas'), rnd = seeded(+COURSE.id), A = COURSE.accent || ['#5ce1e6', '#f4c35a'];
  const cols = [A[0], A[1], '#ff6b9a', '#a78bfa', '#6fe3a0', '#dfe9ff'];
  const Pt = Array.from({ length: 64 }, (_, i) => ({ x: rnd(), y: rnd(), z: .25 + rnd() * .75, vx: (rnd() - .5) * .012, vy: (rnd() - .5) * .012, c: cols[i % cols.length], ph: rnd() * TAU }));
  let mx = -9999, my = -9999; const hs = $('.hero');
  hs.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
  hs.addEventListener('pointerleave', () => { mx = my = -9999; });
  animate(c, (dt, t) => {
    const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h);
    const cx = w * .5, cy = h * .47, R = Math.min(w * .46, h * .42);
    glow(ctx, cx, cy, R * .5, A[1], .55); glow(ctx, cx, cy, R * .18, shade(A[1], .4), .9);
    for (let k = 0; k < 3; k++) {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(k * Math.PI / 3 + t * .03); ctx.beginPath(); ctx.ellipse(0, 0, R, R * .3, 0, 0, TAU); ctx.strokeStyle = rgba(A[0], .13); ctx.lineWidth = 1; ctx.stroke();
      const a = (reduceMotion ? 1 : t) * (.55 + k * .18) + k * 2.1, ex = Math.cos(a) * R, ey = Math.sin(a) * R * .3;
      for (let j = 1; j < 18; j++) { const aj = a - j * .035; ctx.fillStyle = rgba(A[0], .25 * (1 - j / 18)); ctx.beginPath(); ctx.arc(Math.cos(aj) * R, Math.sin(aj) * R * .3, 3 * (1 - j / 22), 0, TAU); ctx.fill(); }
      glow(ctx, ex, ey, 26, A[0], 1); ball(ctx, A[0], ex, ey, 5); ctx.restore();
    }
    for (const p of Pt) {
      if (!reduceMotion) { p.x += p.vx * dt * p.z; p.y += p.vy * dt * p.z; }
      if (p.x < -.05) p.x = 1.05; if (p.x > 1.05) p.x = -.05; if (p.y < -.05) p.y = 1.05; if (p.y > 1.05) p.y = -.05;
      p.sx = p.x * w; p.sy = p.y * h + Math.sin(t * .6 + p.ph) * 6 * p.z; const dx = p.sx - mx, dy = p.sy - my, d2 = dx * dx + dy * dy;
      if (d2 < 22000) { const f = (1 - d2 / 22000) * 40; p.sx += dx / Math.sqrt(d2 + 1) * f; p.sy += dy / Math.sqrt(d2 + 1) * f; }
    }
    for (let i = 0; i < Pt.length; i++) for (let j = i + 1; j < Pt.length; j++) { const a = Pt[i], b = Pt[j], dx = a.sx - b.sx, dy = a.sy - b.sy, d = dx * dx + dy * dy; if (d < 13000) { ctx.strokeStyle = `rgba(200,210,255,${(1 - d / 13000) * .14 * Math.min(a.z, b.z)})`; ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke(); } }
    for (const p of Pt) { ctx.globalAlpha = .35 + p.z * .6; ball(ctx, p.c, p.sx, p.sy, 2 + p.z * 6); } ctx.globalAlpha = 1;
  });
}
function finale() {
  const c = $('#finale-canvas'), rnd = seeded(77), A = COURSE.accent || ['#5ce1e6'];
  const E = Array.from({ length: 90 }, () => ({ a: rnd() * TAU, r: .15 + rnd() * .85, s: (.05 + rnd() * .2) * (rnd() < .5 ? -1 : 1), tilt: rnd() * Math.PI }));
  let boost = 0;
  animate(c, (dt) => { const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); boost = Math.max(0, boost - dt * .3); const cx = w / 2, cy = h * .35, R = Math.max(w, h) * .55;
    for (const e of E) { if (!reduceMotion) e.a += e.s * dt * (1 + boost * 6); const x = cx + Math.cos(e.a) * e.r * R, y = cy + Math.sin(e.a) * e.r * R * .45 * Math.cos(e.tilt) + Math.sin(e.a) * e.r * R * .2 * Math.sin(e.tilt); ctx.globalAlpha = .25 + .5 * (1 - e.r); glow(ctx, x, y, 10 + boost * 10, A[0], 1); ball(ctx, A[0], x, y, 2); } ctx.globalAlpha = 1; });
  $('#reveal-btn').addEventListener('click', () => { const cu = $('#culprit'); cu.classList.add('show'); boost = 1; $('#reveal-btn').style.display = 'none'; if (solved.size < NC) cu.insertAdjacentHTML('afterbegin', `<p class="hint">You named the culprit with ${solved.size} of ${NC} clues. Collect the rest to complete the chain of evidence.</p>`); setTimeout(() => cu.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }), 60); });
}
function nav() {
  const prog = $('#progress'); const onScroll = () => { const h = document.documentElement; prog.style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + '%'; };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) $$('#rail a').forEach(a => a.classList.toggle('active', a.dataset.sec === e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  $$('#rail a').map(a => document.getElementById(a.dataset.sec)).filter(Boolean).forEach(s => io.observe(s));
  const rio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach(el => rio.observe(el));
}

/* =========================================================
   ENGINES: particle box, plotter, 3D molecule viewer
   ========================================================= */
function ParticleBox(canvas, o) {
  const S = { P: [], T: o.T || 1, wall: 1, partition: !!o.partition, imp: 0, pressure: 0, t: 0, hits: 0, events: 0, paused: false };
  const sp = o.species;
  function vel(k) { const s = (o.speed || 60) * Math.sqrt(S.T / (sp[k].m || 1)); return [gauss() * s, gauss() * s]; }
  let W = 0, H = 0;
  function add(k, n, region) { for (let i = 0; i < n; i++) { const [vx, vy] = vel(k), r = sp[k].r || 6; const x0 = region ? region[0] : 0, x1 = region ? region[1] : 1; S.P.push({ k, x: r + (x0 + Math.random() * (x1 - x0)) * Math.max(10, (W || 400) * S.wall - 2 * r), y: r + Math.random() * Math.max(10, (H || 300) - 2 * r), vx, vy, r }); } }
  function reset(counts) { S.P = []; S.t = 0; S.events = 0; for (const k in counts) add(k, counts[k], o.regions && o.regions[k]); }
  function setT(T) { const f = Math.sqrt(T / S.T); S.T = T; S.P.forEach(p => { p.vx *= f; p.vy *= f; }); }
  function count(k) { return S.P.filter(p => p.k === k).length; }
  function remove(k, n) { for (let i = S.P.length - 1; i >= 0 && n > 0; i--) if (S.P[i].k === k) { S.P.splice(i, 1); n--; } }
  function spawn(list, x, y) { list.forEach((k, j) => { const [vx, vy] = vel(k); S.P.push({ k, x: x + (j - (list.length - 1) / 2) * 6, y, vx, vy, r: sp[k].r || 6 }); }); }
  const flashes = [];
  function step(dt) {
    const xmax = W * S.wall, mid = W * S.wall / 2;
    for (const p of S.P) {
      if (o.gravity) p.vy += o.gravity * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; const m = sp[p.k].m || 1;
      if (p.x < p.r) { p.x = p.r; S.imp += 2 * m * Math.abs(p.vx); p.vx = Math.abs(p.vx); }
      if (p.x > xmax - p.r) { p.x = xmax - p.r; S.imp += 2 * m * Math.abs(p.vx); p.vx = -Math.abs(p.vx); }
      if (p.y < p.r) { p.y = p.r; S.imp += 2 * m * Math.abs(p.vy); p.vy = Math.abs(p.vy); }
      if (p.y > H - p.r) { p.y = H - p.r; S.imp += 2 * m * Math.abs(p.vy); p.vy = -Math.abs(p.vy); }
      if (S.partition) { if (p.x < mid && p.x > mid - p.r - 2 && p.vx > 0) { p.x = mid - p.r - 2; p.vx = -p.vx; } else if (p.x > mid && p.x < mid + p.r + 2 && p.vx < 0) { p.x = mid + p.r + 2; p.vx = -p.vx; } }
    }
    if (o.uni) for (let i = S.P.length - 1; i >= 0; i--) { const p = S.P[i], u = o.uni.find(r => r.a === p.k); if (u && Math.random() < u.k() * dt) { S.P.splice(i, 1); spawn(u.products, p.x, p.y); S.events++; if (u.flash) flashes.push({ x: p.x, y: p.y, life: 1, c: u.flash }); } }
    if (o.collide !== false) {
      const N = S.P.length;
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const a = S.P[i], b = S.P[j]; if (a.dead || b.dead) continue; const dx = b.x - a.x, dy = b.y - a.y, rr = a.r + b.r, d2 = dx * dx + dy * dy; if (d2 >= rr * rr) continue;
        const d = Math.sqrt(d2) || .01, nx = dx / d, ny = dy / d, vr = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny; if (vr <= 0) continue;
        S.hits++;
        const rx = o.reactions && o.reactions.find(r => (r.a === a.k && r.b === b.k) || (r.a === b.k && r.b === a.k));
        if (rx && vr > (typeof rx.Ea === 'function' ? rx.Ea() : (rx.Ea || 0)) && Math.random() < (rx.p == null ? 1 : (typeof rx.p === 'function' ? rx.p() : rx.p))) { a.dead = b.dead = true; spawn(rx.products, (a.x + b.x) / 2, (a.y + b.y) / 2); S.events++; if (rx.flash) flashes.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, life: 1, c: rx.flash }); continue; }
        const m1 = sp[a.k].m || 1, m2 = sp[b.k].m || 1, J = 2 * vr / (m1 + m2);
        a.vx -= J * m2 * nx; a.vy -= J * m2 * ny; b.vx += J * m1 * nx; b.vy += J * m1 * ny; const ov = (rr - d) / 2; a.x -= nx * ov; a.y -= ny * ov; b.x += nx * ov; b.y += ny * ov;
      }
      S.P = S.P.filter(p => !p.dead);
    }
    S.t += dt;
  }
  let pAcc = 0, pT = 0;
  const api = { S, reset, setT, count, add, remove, flashes, get W() { return W; }, get H() { return H; } };
  animate(canvas, (dt, t) => {
    const { ctx, w, h } = fit(canvas); const first = !W; W = w; H = h; if (first) { reset(o.counts || {}); o.onInit && o.onInit(api); }
    if (!S.paused) { const n = o.substeps || 2; for (let i = 0; i < n; i++) step(dt / n); }
    pAcc += S.imp; S.imp = 0; pT += dt; if (pT > .5) { const per = 2 * (W * S.wall + H); S.pressure = lerp(S.pressure || pAcc / pT / per, pAcc / pT / per, .5); pAcc = 0; pT = 0; }
    ctx.clearRect(0, 0, w, h);
    if (o.bg) o.bg(ctx, w, h, api);
    if (S.wall < 1) { ctx.fillStyle = 'rgba(255,255,255,.04)'; ctx.fillRect(W * S.wall, 0, W, H); ctx.fillStyle = 'rgba(200,210,255,.55)'; ctx.fillRect(W * S.wall, 0, 4, H); }
    if (S.partition) { ctx.fillStyle = 'rgba(244,195,90,.7)'; ctx.fillRect(W * S.wall / 2 - 2, 0, 4, H); }
    for (const f of flashes) { f.life -= dt * 1.5; glow(ctx, f.x, f.y, 40 * (1.2 - f.life), f.c, Math.max(0, f.life)); }
    for (let i = flashes.length - 1; i >= 0; i--) if (flashes[i].life <= 0) flashes.splice(i, 1);
    for (const p of S.P) { const s = sp[p.k]; if (s.draw) s.draw(ctx, p, t); else { if (s.glow) glow(ctx, p.x, p.y, p.r * 2.6, s.color, .5); ball(ctx, s.color, p.x, p.y, p.r); if (s.label) label(ctx, s.label, p.x, p.y + 3, { align: 'center', color: '#0b0d19', font: `700 ${Math.round(p.r)}px Inter,sans-serif` }); } }
    if (o.after) o.after(ctx, w, h, api, dt);
    o.onTick && o.onTick(api, dt);
  });
  return api;
}
function plot(c, o) {
  const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h);
  const L = o.padL || 46, R = 14, T = 12, Bm = o.padB || 34, pw = w - L - R, ph = h - T - Bm;
  const X = x => L + (o.xlog ? (Math.log10(x) - Math.log10(o.x[0])) / (Math.log10(o.x[1]) - Math.log10(o.x[0])) : (x - o.x[0]) / (o.x[1] - o.x[0])) * pw;
  const Y = y => T + (1 - (y - o.y[0]) / (o.y[1] - o.y[0])) * ph;
  ctx.strokeStyle = 'rgba(255,255,255,.07)'; ctx.lineWidth = 1;
  (o.yt || []).forEach(v => { ctx.beginPath(); ctx.moveTo(L, Y(v)); ctx.lineTo(L + pw, Y(v)); ctx.stroke(); label(ctx, o.yf ? o.yf(v) : v, L - 6, Y(v) + 3, { align: 'right', size: 10, color: '#8f8eab' }); });
  (o.xt || []).forEach(v => { ctx.beginPath(); ctx.moveTo(X(v), T); ctx.lineTo(X(v), T + ph); ctx.stroke(); label(ctx, o.xf ? o.xf(v) : v, X(v), T + ph + 14, { align: 'center', size: 10, color: '#8f8eab' }); });
  ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, T + ph); ctx.lineTo(L + pw, T + ph); ctx.stroke();
  if (o.xl) label(ctx, o.xl, L + pw / 2, h - 4, { align: 'center', size: 10.5, color: '#c9c8dc' });
  if (o.yl) { ctx.save(); ctx.translate(11, T + ph / 2); ctx.rotate(-Math.PI / 2); label(ctx, o.yl, 0, 0, { align: 'center', size: 10.5, color: '#c9c8dc' }); ctx.restore(); }
  ctx.save(); ctx.beginPath(); ctx.rect(L, T - 2, pw, ph + 4); ctx.clip();
  (o.areas || []).forEach(a => { ctx.fillStyle = a.color; ctx.beginPath(); ctx.moveTo(X(a.pts[0][0]), Y(a.base || o.y[0])); a.pts.forEach(p => ctx.lineTo(X(p[0]), Y(p[1]))); ctx.lineTo(X(a.pts[a.pts.length - 1][0]), Y(a.base || o.y[0])); ctx.fill(); });
  (o.series || []).forEach(s => { if (!s.pts.length) return; ctx.strokeStyle = s.color; ctx.lineWidth = s.width || 2.2; ctx.setLineDash(s.dash || []); ctx.beginPath(); s.pts.forEach((p, i) => i ? ctx.lineTo(X(p[0]), Y(p[1])) : ctx.moveTo(X(p[0]), Y(p[1]))); ctx.stroke(); ctx.setLineDash([]); if (s.dots) s.pts.forEach(p => ball(ctx, s.color, X(p[0]), Y(p[1]), 4)); });
  ctx.restore();
  (o.vlines || []).forEach(v => { ctx.strokeStyle = v.color || '#f4c35a'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(v.x), T); ctx.lineTo(X(v.x), T + ph); ctx.stroke(); ctx.setLineDash([]); if (v.label) label(ctx, v.label, X(v.x) + 4, T + 12, { color: v.color || '#f4c35a', size: 10 }); });
  (o.hlines || []).forEach(v => { ctx.strokeStyle = v.color || '#f4c35a'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(L, Y(v.y)); ctx.lineTo(L + pw, Y(v.y)); ctx.stroke(); ctx.setLineDash([]); if (v.label) label(ctx, v.label, L + pw - 4, Y(v.y) - 5, { color: v.color || '#f4c35a', size: 10, align: 'right' }); });
  (o.marks || []).forEach(m => { glow(ctx, X(m.x), Y(m.y), 16, m.color || '#f4c35a', 1); ball(ctx, m.color || '#f4c35a', X(m.x), Y(m.y), m.r || 5); if (m.label) label(ctx, m.label, X(m.x) + 9, Y(m.y) - 8, { color: '#fff', size: 11 }); });
  return { X, Y, L, T, pw, ph, ctx, w, h };
}
const ATOMC = { H: ['#eef3ff', .31], C: ['#8d95ab', .55], N: ['#6b8cff', .52], O: ['#ff5d5d', .5], F: ['#c6f36b', .45], Cl: ['#6fe3a0', .7], Br: ['#c46a3a', .78], S: ['#f4d35a', .7], P: ['#ff9f5a', .7], Na: ['#b38cff', .5], X: ['#a78bfa', .55], B: ['#ffb38a', .55], Cu: ['#e08a5a', .6], Fe: ['#e8925a', .6], Li: ['#ff8fc8', .5] };
function molViewer(canvas, stage, getMol, o = {}) {
  let rx = o.spinX ? .3 : -.35, ry = o.spinX ? .18 : .5, vx = o.spinX ? .35 : 0, vy = o.spinX ? 0 : .35, drag = null, idle = 0;
  stage.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY }; stage.setPointerCapture(e.pointerId); });
  stage.addEventListener('pointermove', e => { if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag = { x: e.clientX, y: e.clientY }; ry += dx * .01; rx += dy * .01; vy = dx * .6; vx = dy * .6; idle = 0; });
  const up = () => { drag = null; }; stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
  animate(canvas, (dt, t) => {
    idle += dt; if (!drag) { ry += vy * dt; rx += vx * dt; if (o.spinX) { vy *= .95; vx = lerp(vx, idle > 1.5 && !reduceMotion ? .4 : vx * .95, .03); } else { vx *= .95; vy = lerp(vy, idle > 1.5 && !reduceMotion ? .4 : vy * .95, .03); } }
    const { ctx, w, h } = fit(canvas); ctx.clearRect(0, 0, w, h); const m = getMol(); if (!m) return;
    const rad = a => (ATOMC[a[0]] || ATOMC.X)[1] * (m.scaleAtoms || 1);
    const maxR = Math.max(...m.atoms.map(a => Math.hypot(a[1], a[2], a[3]) + rad(a)), ...(m.lobes || []).map(l => Math.hypot(l[0], l[1], l[2]) + .4));
    const sc = Math.min(w, h) * (o.zoom || .38) / maxR, cx = w / 2, cy = h / 2;
    const cX = Math.cos(rx), sX = Math.sin(rx), cY = Math.cos(ry), sY = Math.sin(ry);
    const proj = (x, y, z) => { const x1 = x * cY + z * sY, z1 = -x * sY + z * cY, y1 = y * cX - z1 * sX, z2 = y * sX + z1 * cX, p = 9 / (9 + z2); return { x: cx + x1 * sc * p, y: cy + y1 * sc * p, z: z2, p }; };
    const Pp = m.atoms.map(a => ({ e: a[0], ...proj(a[1], a[2], a[3]), r: rad(a), hl: a[4] }));
    const items = [];
    (m.bonds || []).forEach(b => items.push({ t: 'b', b, z: (Pp[b[0]].z + Pp[b[1]].z) / 2 + .001 }));
    Pp.forEach((p, i) => items.push({ t: 'a', i, z: p.z }));
    (m.lobes || []).forEach(l => { const q = proj(l[0], l[1], l[2]); items.push({ t: 'l', q, z: q.z, from: Pp[l[3] || 0] }); });
    items.sort((a, b) => b.z - a.z);
    glow(ctx, cx, cy, Math.min(w, h) * .45, o.glow || '#5ce1e6', .22);
    for (const it of items) {
      if (it.t === 'b') {
        const [i, j, ord] = it.b, A = Pp[i], B = Pp[j], lw = Math.max(1.5, sc * .12 * A.p), dx = B.x - A.x, dy = B.y - A.y, Ln = Math.hypot(dx, dy) || 1, nx = -dy / Ln, ny = dx / Ln;
        const offs = ord === 2 ? [-lw * .8, lw * .8] : ord === 3 ? [-lw * 1.3, 0, lw * 1.3] : [0]; ctx.lineCap = 'round';
        for (const of of offs) { const g = ctx.createLinearGradient(A.x, A.y, B.x, B.y); g.addColorStop(0, shade((ATOMC[A.e] || ATOMC.X)[0], -.15)); g.addColorStop(.5, '#cfd5e6'); g.addColorStop(1, shade((ATOMC[B.e] || ATOMC.X)[0], -.15)); ctx.strokeStyle = ord === 0 ? 'rgba(255,255,255,.2)' : ord === 4 ? 'rgba(244,195,90,.6)' : g; ctx.setLineDash(ord === 4 ? [4, 4] : []); ctx.lineWidth = ord === 0 || ord === 4 ? 1.5 : (ord > 1 ? lw * .6 : lw); ctx.beginPath(); ctx.moveTo(A.x + nx * of, A.y + ny * of); ctx.lineTo(B.x + nx * of, B.y + ny * of); ctx.stroke(); ctx.setLineDash([]); }
      } else if (it.t === 'l') { const q = it.q, f = it.from; const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, sc * .45 * q.p); g.addColorStop(0, 'rgba(255,214,110,.55)'); g.addColorStop(1, 'rgba(255,214,110,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(q.x, q.y, sc * .42 * q.p, sc * .42 * q.p, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#ffd36e'; ctx.beginPath(); ctx.arc(q.x - 4, q.y, 2.4, 0, TAU); ctx.arc(q.x + 4, q.y, 2.4, 0, TAU); ctx.fill(); }
      else { const p = Pp[it.i]; ctx.globalAlpha = clamp(.6 + (1 - p.z / 3) * .4, .5, 1); if (p.hl) glow(ctx, p.x, p.y, p.r * sc * 2.2, '#f4c35a', 1); ball(ctx, (ATOMC[p.e] || ATOMC.X)[0], p.x, p.y, p.r * sc * p.p); ctx.globalAlpha = 1; if (m.labels) label(ctx, p.e, p.x, p.y + 4, { align: 'center', color: '#0b0d19', font: `700 ${Math.max(9, p.r * sc * p.p * .7)}px Inter,sans-serif` }); }
    }
    o.after && o.after(ctx, w, h, t);
  });
}
function legendFor(m) { const els = [...new Set(m.atoms.map(a => a[0]))]; const N = { H: 'Hydrogen', C: 'Carbon', N: 'Nitrogen', O: 'Oxygen', F: 'Fluorine', Cl: 'Chlorine', Br: 'Bromine', S: 'Sulfur', P: 'Phosphorus', Na: 'Sodium', X: 'Atom', B: 'Boron', Cu: 'Copper', Fe: 'Iron', Li: 'Lithium' }; return els.map(e => `<span><i style="background:${(ATOMC[e] || ATOMC.X)[0]}"></i>${N[e] || e}</span>`).join(''); }

/* =========================================================
   INIT
   ========================================================= */
function init() {
  buildPage(); buildBoard(); buildMysteries(); buildQuizzes(); buildFeynman(); buildVerdicts(); buildColdCases(); renderAvatars(); updateEvidence(); nav();
  [hero, finale, flashcards, interrogation].forEach(fn => { try { fn(); } catch (err) { console.error(fn.name, err); } });
  CASES.forEach((c, i) => { try { c.lab.init($('#lab' + (i + 1))); } catch (err) { console.error('lab' + (i + 1), err); } });
  renderAvatars();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
