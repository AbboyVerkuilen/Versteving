function nmRGB(l) {
  let r = 0, g = 0, b = 0;
  if (l >= 380 && l < 440) { r = -(l - 440) / 60; b = 1; } else if (l < 490) { g = (l - 440) / 50; b = 1; } else if (l < 510) { g = 1; b = -(l - 510) / 20; } else if (l < 580) { r = (l - 510) / 70; g = 1; } else if (l < 645) { r = 1; g = -(l - 645) / 65; } else if (l <= 750) { r = 1; }
  let f = l < 380 || l > 750 ? 0 : l < 420 ? .3 + .7 * (l - 380) / 40 : l > 700 ? .3 + .7 * (750 - l) / 50 : 1;
  if (l < 380) return '#8a7bd8'; if (l > 750) return '#8a3a3a';
  return rgbHex(255 * Math.pow(r * f, .8), 255 * Math.pow(g * f, .8), 255 * Math.pow(b * f, .8));
}
const COURSE = {
  id: '103', title: 'Ghost Light', brand: '<i>Ghost</i> Light',
  eyebrow: 'Chemistry 103 · Light, orbitals & the nucleus', titleHTML: '<em>Ghost</em> Light',
  lede: 'Why does every element glow its own colour? Why does sunlight burn but lamplight doesn’t? A mystery about light, the strange rules inside atoms, and a nucleus that can fall apart.',
  accent: ['#a78bfa', '#ffd36e'],
  cast: {
    ph: { name: 'Lux', full: 'Photon', color: '#ffd36e', title: 'A packet of light, all or nothing', sym: 'hν' },
    Bo: { name: 'Niels', full: 'Bohr', color: '#6b8cff', title: 'The man who put electrons on a staircase', sym: 'Bo' },
    Ra: { name: 'Radia', full: 'Radium', color: '#6fe3a0', title: 'Glows in the dark, at a terrible price', sym: 'Ra' },
    q: { name: 'Quanta', full: 'The quantum', color: '#a78bfa', title: 'Energy only comes in steps', sym: 'ΔE', orbit: true }
  },
  prologue: {
    short: 'The Coloured Flames', kicker: 'The case begins', titleHTML: 'The Coloured <em>Flames</em>',
    story: `<p>Sprinkle table salt into a gas flame and it flares <strong>yellow-orange</strong>. Copper wire burns <strong>blue-green</strong>. Strontium, used in fireworks, burns <strong>crimson</strong>. Every element has its own colour, as personal as a fingerprint, and nineteenth-century chemists had no idea why.</p>
      <p>Stranger still: the light from the Sun, spread out by a prism, has <strong>dark lines</strong> slashed through it at exactly the colours that elements glow. In 1868 astronomers found a line that matched no element on Earth. They named the mystery element after the Sun, <em>helios</em>: helium. It wasn’t found on Earth for another 27 years.</p>
      <p>Explaining those colours tore classical physics apart and gave birth to <strong>quantum mechanics</strong>. In this file you’ll follow light into the atom, find the electron living on a staircase, watch it dissolve into a cloud, and finally look into the nucleus, which sometimes simply falls apart.</p>`,
    cast: [['ph', 'happy'], ['e', 'sly'], ['Bo', 'happy'], ['Ra', 'sly'], ['q', 'sly']]
  },
  finale: {
    q: 'What rule hides inside every atom?', lead: 'Light in packets, colours like barcodes, electrons as clouds, shells that set personality, and a nucleus that decays at random. One strange rule ties them together.',
    avatar: 'q', nameHTML: 'The <em>quantum</em>',
    html: `<p>At the scale of atoms, <strong>energy comes in steps</strong>, not smooth slopes, and nature plays by probabilities, not certainties.</p>
      <p>Light arrives in packets (photons) whose energy depends on colour. Electrons can only sit on certain energy levels, so atoms emit and absorb only certain colours: their barcode. An electron doesn’t follow a path; it has a probability cloud. The way those levels fill up into shells gives every element its size and personality. And a radioactive nucleus decays at a random moment, yet a crowd of them keeps perfect time.</p>
      <p>Every glowing screen, every laser, every MRI scan and every carbon date rests on these rules. Case closed.</p>`
  },
  cases: [
    {
      short: 'Packets of Light', kicker: 'Light: waves & photons', titleHTML: 'Packets of <em>Light</em>', item: 'The sunburn', ico: 'sun', teaser: 'Why UV and not red?',
      clue: 'Light comes in packets called photons. Shorter wavelength means more energy per photon: E = hc/λ.',
      mystery: { q: 'A bright red lamp can shine on you all day without burning your skin, but a little ultraviolet from the Sun gives you sunburn. Why?', h: ['UV light is hotter', 'Each UV photon carries enough energy to damage a molecule; red photons don’t, however many there are', 'Skin reflects all red light'], a: 1, v: 'Light is delivered in <b>packets</b> (photons), and each one’s energy depends on its wavelength. A UV photon carries enough energy to break bonds in DNA in one hit. A red photon carries about half as much, and a billion weak packets can’t add up to one strong one. Damage is all-or-nothing, photon by photon.' },
      story: `<p>In 1666 a young Isaac Newton darkened his room, let a single beam of sunlight through a hole in the shutter, and split it with a prism into a rainbow. White light, he realised, is a mixture of colours.</p>
        <p>In 1801 Thomas Young showed that light behaves like a <strong>wave</strong>, with ripples that overlap and interfere like water waves. The distance between crests, the <strong>wavelength</strong>, sets the colour: about 700 nanometres for red, 400 for violet. Beyond violet lies invisible ultraviolet; beyond red, infrared.</p>
        <p>Then, in 1900, Max Planck found he could only explain the glow of hot objects by assuming energy is handed out in tiny lumps: <strong>quanta</strong>. In 1905 Albert Einstein went further. Light itself travels in packets, later called <strong>photons</strong>, each carrying energy <strong>E = hc/λ</strong>. The shorter the wavelength, the bigger the packet. That idea, not relativity, won him his Nobel Prize.</p>`,
      lab: {
        label: 'Spectrum explorer', title: 'Tune the wavelength',
        body: `<div class="lab-grid"><div><div class="stage" style="height:320px"><canvas class="c" aria-label="A light wave of adjustable wavelength and the electromagnetic spectrum"></canvas></div>
          <div class="slider-row" style="margin-top:14px"><label>Wavelength</label><input type="range" class="l" min="150" max="1000" value="650" aria-label="Wavelength in nanometres" style="--track:linear-gradient(90deg,#8a7bd8,#7a3cff 26%,#3f7be0 33%,#2fd06a 42%,#f4e04d 50%,#ff7b2a 57%,#e0193f 66%,#8a3a3a)"><span class="readout"><b class="lo"></b></span></div></div>
          <div class="side-panel"><div class="kv"><div><small>Region</small><b class="rg"></b></div><div><small>Frequency</small><b class="fq"></b></div><div><small>Photon energy</small><b class="en"></b></div><div><small>Per mole of photons</small><b class="km"></b></div></div><div class="info-card"><p class="t" style="margin:0;font-size:14.5px;color:var(--soft)"></p></div></div></div>`,
        init(root) {
          let l = 650; const c = $('.c', root);
          slider($('.l', root), v => { l = v; const E = 1240 / l, kj = 119627 / l, f = 3e8 / (l * 1e-9);
            const rg = l < 280 ? 'UV-C' : l < 315 ? 'UV-B' : l < 380 ? 'UV-A' : l <= 750 ? 'Visible' : 'Infrared';
            $('.lo', root).textContent = l + ' nm'; $('.rg', root).textContent = rg; $('.fq', root).innerHTML = fmt(f, 2) + ' Hz'; $('.en', root).textContent = E.toFixed(2) + ' eV'; $('.km', root).textContent = Math.round(kj) + ' kJ';
            $('.t', root).innerHTML = kj > 348 ? `<b style="color:var(--pink)">Bond-breaker.</b> A mole of these photons carries ${Math.round(kj)} kJ, more than the 348 kJ needed to snap a mole of carbon–carbon bonds. One photon can break one bond in your DNA. This is why UV burns.` : `<b style="color:var(--green)">Harmless packets.</b> ${Math.round(kj)} kJ per mole of photons is less than the 348 kJ/mol needed to break a C–C bond. Turning up the brightness sends <i>more</i> packets, not <i>bigger</i> ones. ${l > 750 ? 'Infrared mostly just jiggles molecules, so you feel it as warmth.' : 'Your eyes can detect these.'}`; });
          animate(c, (dt, t) => { const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); const col = nmRGB(l), y0 = h * .38, A = h * .2, lam = l * .28;
            glow(ctx, w / 2, y0, w * .5, col, .25);
            ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.shadowColor = col; ctx.shadowBlur = 12; ctx.beginPath(); for (let x = 0; x <= w; x += 2) { const y = y0 + Math.sin((x / lam - t * 1.2) * TAU) * A; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.shadowBlur = 0;
            const x0 = 40, ph = ((t * 1.2) % 1); ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1; ctx.beginPath(); const cx = x0 + (ph * lam) % lam; ctx.moveTo(cx + lam * .25, y0 - A - 14); ctx.lineTo(cx + lam * 1.25, y0 - A - 14); ctx.stroke(); label(ctx, 'λ = ' + l + ' nm', cx + lam * .75, y0 - A - 20, { align: 'center', size: 11 });
            for (let i = 0; i < 6; i++) { const px = ((t * 160 + i * w / 6) % w); glow(ctx, px, y0 + Math.sin((px / lam - t * 1.2) * TAU) * A, 10 + 140 / l * 6, col, .9); }
            const L = 20, R = w - 20, sy = h - 46, X = v => L + (v - 150) / 850 * (R - L);
            for (let v = 150; v < 1000; v += 2) { ctx.fillStyle = v < 380 ? 'rgba(138,123,216,.35)' : v > 750 ? 'rgba(138,58,58,.45)' : nmRGB(v); ctx.fillRect(X(v), sy, X(v + 2) - X(v) + .5, 14); }
            [[265, 'UV'], [565, 'visible'], [875, 'infrared']].forEach(([v, s]) => label(ctx, s, X(v), sy + 30, { align: 'center', size: 10, color: '#c9c8dc' }));
            const xm = X(l); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(xm, sy - 2); ctx.lineTo(xm - 6, sy - 12); ctx.lineTo(xm + 6, sy - 12); ctx.fill(); label(ctx, '← more energy per photon', L, sy - 18, { size: 10, color: '#8f8eab' }); });
        }
      },
      dialogue: [['ph', 'happy', 'LUX · photon', '“I travel at 300,000 km per second and I never come in halves. Every one of me is a single parcel. Blue parcels are heavier-hitting than red ones.”'], ['e', 'sly', 'THE GHOST · electron', '“And when one of your parcels is exactly the right size, I swallow it whole. Remember that. It explains everything in this file.”']],
      lenses: ['A rainbow; the warmth of a heat lamp; a sunburn after a cloudy beach day.', 'Streams of photons, each a packet of energy. Ultraviolet packets are big enough to break chemical bonds; infrared ones only make molecules jiggle.', 'E = hc / λ', 'h = Planck’s constant (6.63 × 10⁻³⁴ J s); c = speed of light; λ = wavelength.'],
      miracle: { ico: 'eye', title: 'Your eyes can count single photons', html: '<p>The rod cells in your retina are so sensitive that one can respond to a <strong>single photon</strong>. A pigment molecule called rhodopsin absorbs the packet, flips its shape in a few trillionths of a second, and sets off a chain reaction that becomes a signal to your brain.</p><p>Experiments have shown people sitting in total darkness can sometimes report a flash that was a single photon. You are a quantum detector.</p>', c1: '#ffd36e', c2: '#a78bfa' },
      quiz: [
        { q: 'Which photon carries more energy?', o: ['A red photon (700 nm)', 'A blue photon (450 nm)', 'They carry the same', 'It depends on brightness'], a: 1, w: 'E = hc/λ: shorter wavelength means more energy per photon. Brightness changes how many photons arrive, not each one’s energy.' },
        { q: 'Turning up the brightness of a red lamp…', o: ['makes each photon more energetic', 'sends more photons, each with the same energy', 'changes its colour to blue', 'turns it into UV'], a: 1, w: 'More brightness means more packets per second. The size of each packet depends only on colour.' }
      ],
      prompt: { p: 'Explain why sunscreen focuses on blocking UV and not visible or infrared light.', m: 'Light comes in photons whose energy depends on wavelength. UV photons are energetic enough that a single one can break a chemical bond in skin molecules and DNA, causing burns and mutations. Visible and infrared photons each carry too little energy to break bonds; extra brightness only means more weak packets, which can warm you but not snap bonds.' }
    },
    {
      short: 'Fingerprints of Light', kicker: 'Spectra & the Bohr model', titleHTML: 'Fingerprints of <em>Light</em>', item: 'The starlight barcode', ico: 'star', teaser: 'How do we know?',
      clue: 'Electrons can only occupy fixed energy levels. When they drop between levels, they emit photons of exact colours: a unique barcode for each element.',
      mystery: { q: 'Nobody has ever visited a star. How do we know what stars are made of?', h: ['From meteorites that fall to Earth', 'Each element emits and absorbs its own unique set of colours, a barcode in the light', 'From the colour of the star as a whole'], a: 1, v: 'Spread starlight into a spectrum and you find dark lines at exact wavelengths: places where atoms in the star’s outer layers absorbed photons. Each element has a <b>unique set of lines</b>, because its electrons can only jump between its own fixed energy levels. Match the barcode and you know the element. Helium was found in the Sun this way, 27 years before it was found on Earth.' },
      story: `<p>In 1859 two friends in Heidelberg, chemist <strong>Robert Bunsen</strong> (of the burner) and physicist <strong>Gustav Kirchhoff</strong>, put elements into a clean flame and looked at the light through a prism. Each element gave a few sharp, bright <strong>lines</strong> of colour, never a smooth rainbow. Within two years they had used this trick to discover two new metals: <em>caesium</em>, named for its sky-blue lines, and <em>rubidium</em>, for its red ones.</p>
        <p>But why lines? In 1913 a young Dane, <strong>Niels Bohr</strong>, made a daring proposal. An electron in an atom can only sit on certain <strong>energy levels</strong>, like the steps of a staircase, never between them. To jump up it must swallow a photon of exactly the right energy. When it falls back down, it spits out a photon whose energy matches the drop exactly.</p>
        <p>Since each element has its own staircase, each emits its own set of colours. For hydrogen, Bohr’s steps are E = −13.6 eV ÷ n², and the drops onto step 2 give exactly the red, cyan, blue and violet lines that had puzzled scientists for decades.</p>`,
      lab: {
        label: 'The hydrogen staircase', title: 'Excite an electron, catch its light',
        head: '<div class="controls" style="margin:0"><button class="btn primary small zap">⚡ Excite</button><button class="btn small auto">Auto</button><button class="btn small ghost clr">Clear</button></div>',
        body: `<div class="stage" style="height:380px"><canvas class="c" aria-label="Hydrogen energy levels, an atom, and the spectrum of emitted lines"></canvas></div><p class="readout msg" style="margin-top:12px">Press <b>Excite</b>: the electron absorbs energy and jumps up, then falls back step by step, emitting photons.</p>`,
        init(root) {
          const c = $('.c', root), En = n => -13.6 / (n * n);
          let n = 1, target = 1, anim = 0, auto = false, wait = 0; const lines = {}; const photons = [];
          const zap = () => { if (n === 1 && anim === 0) { target = 2 + Math.floor(Math.random() * 5); anim = 1; wait = .5; } };
          $('.zap', root).addEventListener('click', zap);
          $('.auto', root).addEventListener('click', () => { auto = !auto; $('.auto', root).classList.toggle('on', auto); });
          $('.clr', root).addEventListener('click', () => { for (const k in lines) delete lines[k]; });
          animate(c, (dt, t) => {
            const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h);
            if (anim === 1) { n = target; anim = 2; wait = .7; } else if (anim === 2) { wait -= dt; if (wait <= 0) { if (n > 1) { const m = 1 + Math.floor(Math.random() * (n - 1)); const dE = En(n) - En(m), lam = 1240 / dE; const key = `${n}→${m}`; lines[key] = { lam, c: (lines[key] ? lines[key].c : 0) + 1 }; photons.push({ x: 0, y: 0, a: Math.random() * TAU, lam, life: 1.4 }); $('.msg', root).innerHTML = `n = ${n} → n = ${m}: ΔE = ${dE.toFixed(2)} eV → photon of <b style="color:${nmRGB(lam)}">${lam.toFixed(0)} nm</b> (${lam < 380 ? 'ultraviolet: Lyman series' : lam <= 750 ? 'visible: Balmer series' : 'infrared'}).`; n = m; wait = .55; } else { anim = 0; } } }
            if (auto && anim === 0) zap();
            const lw = Math.min(260, w * .3), ly0 = 30, ly1 = h - 110, Y = E => ly1 - Math.pow(1 + E / 13.6, 1.8) * (ly1 - ly0);
            for (let k = 1; k <= 6; k++) { const y = Y(En(k)); ctx.strokeStyle = k === n ? '#ffd36e' : 'rgba(255,255,255,.3)'; ctx.lineWidth = k === n ? 2.5 : 1; ctx.beginPath(); ctx.moveTo(30, y); ctx.lineTo(lw, y); ctx.stroke(); if (k <= 4) label(ctx, `n=${k}  ${En(k).toFixed(2)} eV`, 34, y - 5, { size: 10, color: k === n ? '#ffd36e' : '#8f8eab' }); }
            label(ctx, 'ENERGY LEVELS (spacing compressed)', 30, 16, { size: 10, color: '#8f8eab' });
            const ey = Y(En(n)); glow(ctx, lw - 30, ey, 18, '#5ce1e6', 1); ball(ctx, '#5ce1e6', lw - 30, ey, 6);
            const ax = lw + (w - lw) / 2, ay = (h - 90) / 2 + 6, sc = Math.min(w - lw, h - 100) / 2 / 38;
            for (let k = 1; k <= 6; k++) { ctx.strokeStyle = 'rgba(167,139,250,.35)'; ctx.setLineDash([2, 5]); ctx.beginPath(); ctx.arc(ax, ay, k * k * sc + 6, 0, TAU); ctx.stroke(); } ctx.setLineDash([]);
            glow(ctx, ax, ay, 22, '#ff5d5d', 1); ball(ctx, '#ff5d5d', ax, ay, 6);
            const ang = t * 3 / n; glow(ctx, ax + Math.cos(ang) * (n * n * sc + 6), ay + Math.sin(ang) * (n * n * sc + 6), 16, '#5ce1e6', 1); ball(ctx, '#5ce1e6', ax + Math.cos(ang) * (n * n * sc + 6), ay + Math.sin(ang) * (n * n * sc + 6), 4.5);
            for (const p of photons) { p.life -= dt; const d = (1.4 - p.life) * 220; const col = nmRGB(p.lam); glow(ctx, ax + Math.cos(p.a) * d, ay + Math.sin(p.a) * d, 22, col, Math.max(0, p.life)); }
            for (let i = photons.length - 1; i >= 0; i--) if (photons[i].life <= 0) photons.splice(i, 1);
            const L = 20, R = w - 20, sy = h - 50, X = v => L + (Math.log(v) - Math.log(90)) / (Math.log(2000) - Math.log(90)) * (R - L);
            ctx.fillStyle = '#05060d'; ctx.fillRect(L, sy, R - L, 26); ctx.strokeStyle = 'rgba(255,255,255,.15)'; ctx.strokeRect(L, sy, R - L, 26);
            for (const k in lines) { const { lam, c: cnt } = lines[k], x = X(lam), col = nmRGB(lam); ctx.globalAlpha = Math.min(1, .35 + cnt * .15); ctx.fillStyle = col; ctx.fillRect(x - 1.5, sy, 3, 26); glow(ctx, x, sy + 13, 14, col, .7); ctx.globalAlpha = 1; label(ctx, lam.toFixed(0), x, sy + 40, { align: 'center', size: 9, color: '#8f8eab' }); }
            [[90, 380, 'UV · Lyman'], [380, 750, 'visible · Balmer'], [750, 2000, 'IR · Paschen…']].forEach(([a, b, s]) => label(ctx, s, (X(a) + X(b)) / 2, sy - 6, { align: 'center', size: 9.5, color: '#c9c8dc' }));
          });
        }
      },
      lenses: ['Old orange street lamps; a neon sign; the colour of salt sprinkled in a gas flame.', 'Electrons pushed up to higher energy levels fall back down, each drop releasing a photon whose energy exactly matches the gap.', 'ΔE = E<sub>high</sub> − E<sub>low</sub> = hc/λ', 'For hydrogen: E<sub>n</sub> = −13.6 eV / n². The drop from n=3 to n=2 gives 656 nm, a red line.'],
      miracle: { ico: 'bulb', title: 'Reading the air of other worlds', html: '<p>When a distant planet passes in front of its star, a little starlight shines through its atmosphere. The molecules there absorb their own barcode of wavelengths. In 2023 the James Webb Space Telescope read carbon dioxide and methane in the air of a planet 120 light-years away this way.</p><p>Same trick, closer to home: the sodium street lamps of the last century glowed at 589 nm, sodium’s brightest line, which is why they bathed whole cities in orange.</p>', c1: '#ffd36e', c2: '#ff9f5a' },
      quiz: [
        { q: 'Why does each element produce only certain colours of light (lines), not a full rainbow?', o: ['Elements filter out other colours', 'Its electrons can only drop between fixed energy levels, so only certain photon energies are possible', 'The flame is not hot enough', 'Prisms are imperfect'], a: 1, w: 'Fixed levels mean fixed energy gaps, and each gap corresponds to one wavelength of light.' },
        { q: 'An electron falls from a high level to a low level. What happens?', o: ['It absorbs a photon', 'It emits a photon whose energy equals the gap', 'The atom becomes an ion', 'Nothing: electrons never fall'], a: 1, w: 'Falling releases energy as a photon. Absorbing a photon of exactly the right energy pushes it back up.' }
      ],
      prompt: { p: 'Explain how an astronomer can tell there is sodium in a star, using the words "energy level" and "photon".', m: 'Sodium atoms have their own set of electron energy levels. When starlight passes through sodium atoms, electrons absorb photons whose energy exactly matches the gap between two levels (589 nm, yellow). That wavelength goes missing, leaving a dark line in the star’s spectrum. Since only sodium has gaps of exactly those sizes, the line pattern identifies it.' }
    },
    {
      short: 'Clouds, Not Orbits', kicker: 'Quantum orbitals', titleHTML: 'Clouds, Not <em>Orbits</em>', item: 'The electron’s address', ico: 'atom', teaser: 'Where is it, exactly?',
      clue: 'An electron doesn’t follow a path. It has an orbital: a cloud of probabilities showing where it is likely to be found (s spheres, p dumbbells, d clovers).',
      mystery: { q: 'Where exactly is the electron in a hydrogen atom, right now?', h: ['Circling the nucleus like a tiny planet', 'Nowhere definite: it only has probabilities of being found in different places', 'Resting on the surface of the nucleus'], a: 1, v: 'Quantum mechanics says the electron has <b>no definite position</b> until you measure it. Its whereabouts are described by an <b>orbital</b>: a cloud of probability. Measure many times and the dots build up the cloud’s shape. Bohr’s neat orbits were a brilliant stepping stone, but they were wrong in detail.' },
      story: `<p>Bohr’s staircase worked beautifully for hydrogen and failed for almost everything else. In 1924 a French prince studying physics, <strong>Louis de Broglie</strong>, suggested something outrageous: if light waves can act like particles, perhaps particles like electrons can act like <strong>waves</strong>. Experiments soon proved him right: electrons make interference patterns too.</p>
        <p>In 1926 <strong>Erwin Schrödinger</strong> wrote the equation for an electron-wave inside an atom. Its solutions, called <strong>orbitals</strong>, are not paths but <em>clouds of probability</em>. A year later <strong>Werner Heisenberg</strong> showed that you cannot know an electron’s exact position and exact speed at the same time. The fuzziness isn’t a weakness of our instruments; it is how nature is built.</p>
        <p>Orbitals come in shapes with letter names: <strong>s</strong> (spheres), <strong>p</strong> (dumbbells), <strong>d</strong> (four-leaf clovers). Some have <strong>nodes</strong>: surfaces where the electron is <em>never</em> found, even though it is found on both sides. Each orbital can hold at most two electrons.</p>`,
      lab: {
        label: 'Quantum camera', title: 'Measure the electron, again and again',
        head: '<div class="seg orb"></div>',
        body: `<div class="lab-grid"><div class="stage" style="height:400px"><canvas class="c" aria-label="Probability cloud of an electron orbital built from repeated measurements"></canvas></div><div class="side-panel"><div class="info-card"><div class="meta nm"></div><h4 class="tt"></h4><p class="d" style="margin:0;font-size:14.5px;color:var(--soft)"></p></div><div class="kv"><div><small>Measurements</small><b class="cnt">0</b></div><div><small>Nodes</small><b class="nd"></b></div></div><button class="btn small ghost rs">Clear & measure again</button></div></div>`,
        init(root) {
          const O = {
            '1s': [r => Math.exp(-2 * r), (x, y) => Math.exp(-Math.hypot(x, y)), 5, 0, 'A sphere, densest at the centre. The electron of hydrogen in its ground state lives here.'],
            '2s': [0, (x, y) => { const r = Math.hypot(x, y); return (2 - r) * Math.exp(-r / 2); }, 13, 1, 'A bigger sphere with a hollow shell inside it: a spherical node at r = 2 where the electron is never found.'],
            '2p': [0, (x, y) => { const r = Math.hypot(x, y); return x * Math.exp(-r / 2); }, 13, 1, 'A dumbbell with two lobes. Between them is a flat node through the nucleus. There are three 2p orbitals, along x, y and z.'],
            '3p': [0, (x, y) => { const r = Math.hypot(x, y); return x * (6 - r) * Math.exp(-r / 3); }, 24, 2, 'A dumbbell with extra inner lobes: one flat node plus one spherical node.'],
            '3d': [0, (x, y) => { const r = Math.hypot(x, y); return x * y * Math.exp(-r / 3); }, 24, 2, 'A four-leaf clover. d orbitals give transition metals like copper and iron their colours and magnetism.']
          };
          let cur = '1s', cnt = 0, max = 1; const c = $('.c', root), off = document.createElement('canvas'); let ow = 0, oh = 0;
          function setO(k) { cur = k; cnt = 0; const f = O[k][1], E = O[k][2]; max = 0; for (let i = 0; i < 120; i++) for (let j = 0; j < 120; j++) { const v = f(-E + 2 * E * i / 119, -E + 2 * E * j / 119); max = Math.max(max, v * v); } if (ow) off.getContext('2d').clearRect(0, 0, ow, oh);
            $('.nm', root).textContent = `ORBITAL ${k}`; $('.tt', root).textContent = { s: 's orbital', p: 'p orbital', d: 'd orbital' }[k[1]]; $('.d', root).textContent = O[k][4]; $('.nd', root).textContent = O[k][3]; }
          seg($('.orb', root), Object.keys(O).map(k => [k, k]), cur, setO); setO('1s');
          $('.rs', root).addEventListener('click', () => setO(cur));
          animate(c, (dt, t) => { const { ctx, w, h } = fit(c); if (w !== ow || h !== oh) { ow = w; oh = h; off.width = w; off.height = h; cnt = 0; } const oc = off.getContext('2d');
            const f = O[cur][1], E = O[cur][2], S = Math.min(w, h) / 2 / E * .95;
            if (cnt < 26000) for (let i = 0; i < 1600; i++) { const x = (Math.random() * 2 - 1) * E, y = (Math.random() * 2 - 1) * E, v = f(x, y); if (Math.random() * max < v * v) { cnt++; oc.fillStyle = v >= 0 ? 'rgba(92,225,230,.55)' : 'rgba(255,107,154,.55)'; oc.fillRect(w / 2 + x * S, h / 2 + y * S, 1.4, 1.4); } }
            ctx.clearRect(0, 0, w, h); ctx.drawImage(off, 0, 0, w, h); glow(ctx, w / 2, h / 2, 12, '#f4c35a', 1); ball(ctx, '#ffdf9a', w / 2, h / 2, 2.5);
            label(ctx, 'each dot = one measurement of the electron’s position', 12, h - 12, { size: 10, color: '#8f8eab' }); if (cur !== '1s' && cur !== '2s') { label(ctx, 'cyan / pink = opposite wave phases', 12, 18, { size: 10, color: '#8f8eab' }); }
            $('.cnt', root).textContent = cnt.toLocaleString('en'); });
        }
      },
      lenses: ['Nothing to see directly, but orbital shapes decide the shapes of molecules, and so whether water is bent and DNA twists.', 'Electrons spread as probability clouds around the nucleus, filling orbitals two at a time: 1s, 2s, 2p…', '1s² 2s² 2p⁴', 'Oxygen’s electron configuration: shell number, orbital letter, number of electrons as a superscript.'],
      miracle: { ico: 'leaf', title: 'Why carrots are orange', html: '<p>Beta-carotene, the pigment in carrots, is a long molecule whose electrons are spread along a chain of alternating bonds. That makes its orbital energy gap just the right size to absorb <strong>blue</strong> photons. Your eye sees what\'s left: orange.</p><p>Almost all colour in nature (leaves, blood, flowers, dyes) comes from electrons jumping between orbitals, absorbing some photons and letting the rest bounce back to you.</p>', c1: '#ff9f5a', c2: '#ffd36e' },
      quiz: [
        { q: 'What does an orbital represent?', o: ['The exact path an electron follows', 'A region where an electron is likely to be found: a probability cloud', 'The orbit of the nucleus', 'A type of photon'], a: 1, w: 'Orbitals are probability clouds. An electron has no definite path.' },
        { q: 'What is the shape of a p orbital?', o: ['A sphere', 'A dumbbell with two lobes', 'A ring', 'A cube'], a: 1, w: 's orbitals are spherical; p orbitals are dumbbells; d orbitals are mostly four-leaf clovers.' }
      ],
      prompt: { p: 'Explain the difference between Bohr’s picture of the atom and the orbital picture.', m: 'Bohr imagined electrons moving on neat circular orbits at fixed distances, like planets. The orbital picture says an electron has no definite path or position; instead an orbital is a cloud showing where it is likely to be found. Both agree that energies come in fixed levels, but orbitals also explain shapes (s, p, d) and work for atoms bigger than hydrogen.' }
    },
    {
      short: 'The Electron Address', kicker: 'Configurations & periodic trends', titleHTML: 'The Electron <em>Address</em>', item: 'The exploding caesium', ico: 'bolt', teaser: 'Wilder than sodium?',
      clue: 'Electrons fill orbitals in order of energy. Shielding and distance make atoms bigger down a group and smaller across a period, setting their reactivity.',
      mystery: { q: 'Caesium explodes on touching water, far more violently than sodium. Both have just one outer electron. Why is caesium so much wilder?', h: ['Caesium is heavier, so it hits the water harder', 'Its outer electron is far from the nucleus and shielded by many inner shells, so it is lost very easily', 'Caesium is radioactive'], a: 1, v: 'Caesium’s lone outer electron sits in the 6th shell, far from the nucleus and <b>shielded</b> by 54 inner electrons. The pull on it is weak, so its <b>ionisation energy</b> is the lowest of any stable element (376 kJ/mol versus sodium’s 496). It gives the electron away almost instantly, and the reaction with water is explosive.' },
      story: `<p>Electrons fill orbitals in a strict order, lowest energy first, like guests filling the cheapest seats in a theatre: 1s, 2s, 2p, 3s, 3p, 4s, 3d… Each orbital takes two electrons with opposite “spins” (the <em>Pauli principle</em>), and electrons spread out singly across equal orbitals before pairing up (<em>Hund’s rule</em>). The result is an atom’s <strong>electron configuration</strong>: its address.</p>
        <p>Two forces shape every atom. The <strong>nuclear charge</strong> pulls electrons inwards, and <strong>shielding</strong> by inner electrons weakens that pull for the outer ones. Across a row, protons are added but shielding barely changes, so atoms <strong>shrink</strong> and hold their electrons more tightly. Down a column, whole new shells are added, so atoms <strong>grow</strong> and their outer electrons slip away more easily.</p>
        <p>From this come the great <strong>periodic trends</strong>: atomic radius, <em>ionisation energy</em> (the energy to remove an electron), and <em>electronegativity</em> (how hard an atom pulls on shared electrons). They are the patterns behind every family personality you met in Chemistry 101.</p>`,
      lab: {
        label: 'Trend map', title: 'Colour the table by a property',
        head: '<div class="seg prop"></div>',
        body: `<div class="ptable trend" style="grid-template-columns:repeat(18,minmax(0,1fr))"></div><div class="lab-grid" style="margin-top:16px;grid-template-columns:1fr 1.3fr"><div class="info-card" style="display:flex;gap:16px;align-items:center"><svg class="sz" viewBox="-110 -110 220 220" width="120" height="120"></svg><div><div class="meta zz"></div><h4 class="en" style="font-size:26px"></h4><div class="mono cfg" style="color:var(--cyan);font-size:14px"></div><div class="vv" style="margin-top:6px;color:var(--soft);font-size:14px"></div></div></div><div class="info-card"><p class="tx" style="margin:0;font-size:14.5px;color:var(--soft)"></p><div class="legend sc" style="margin-top:10px"></div></div></div>`,
        init(root) {
          const SY = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr'.split(' ');
          const NM = 'Hydrogen Helium Lithium Beryllium Boron Carbon Nitrogen Oxygen Fluorine Neon Sodium Magnesium Aluminium Silicon Phosphorus Sulfur Chlorine Argon Potassium Calcium Scandium Titanium Vanadium Chromium Manganese Iron Cobalt Nickel Copper Zinc Gallium Germanium Arsenic Selenium Bromine Krypton'.split(' ');
          const RAD = [31, 28, 128, 96, 84, 76, 71, 66, 57, 58, 166, 141, 121, 111, 107, 105, 102, 106, 203, 176, 170, 160, 153, 139, 139, 132, 126, 124, 132, 122, 122, 120, 119, 120, 120, 116];
          const IE = [1312, 2372, 520, 900, 801, 1086, 1402, 1314, 1681, 2081, 496, 738, 578, 787, 1012, 1000, 1251, 1521, 419, 590, 633, 659, 651, 653, 717, 762, 760, 737, 746, 906, 579, 762, 947, 941, 1140, 1351];
          const EN = [2.2, null, .98, 1.57, 2.04, 2.55, 3.04, 3.44, 3.98, null, .93, 1.31, 1.61, 1.9, 2.19, 2.58, 3.16, null, .82, 1, 1.36, 1.54, 1.63, 1.66, 1.55, 1.83, 1.88, 1.91, 1.9, 1.65, 1.81, 2.01, 2.18, 2.55, 2.96, 3];
          const PR = { rad: ['Atomic radius', RAD, 'pm', 'Atoms <b>grow down</b> a group (more shells) and <b>shrink across</b> a period (more protons pulling the same shell inward). The biggest here is potassium; the smallest, helium.'], ie: ['Ionisation energy', IE, 'kJ/mol', 'The energy to tear off one electron. <b>Highest top-right</b> (noble gases, fluorine), <b>lowest bottom-left</b> (alkali metals). Low ionisation energy means a metal that reacts eagerly.'], en: ['Electronegativity', EN, '(Pauling)', 'How hard an atom pulls on shared electrons. Fluorine is the champion (3.98); alkali metals barely pull at all. Noble gases rarely bond, so they get no value.'] };
          const pos = z => z === 1 ? [1, 1] : z === 2 ? [1, 18] : z <= 4 ? [2, z - 2] : z <= 10 ? [2, z + 8] : z <= 12 ? [3, z - 10] : z <= 18 ? [3, z] : [4, z - 18];
          const ORD = [['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 6], ['4s', 2], ['3d', 10], ['4p', 6]];
          function config(z) { const parts = []; let left = z; for (const [o, cap] of ORD) { if (!left) break; const k = Math.min(cap, left); parts.push([o, k]); left -= k; }
            if (z === 24) parts.splice(5, 2, ['4s', 1], ['3d', 5]); if (z === 29) parts.splice(5, 2, ['4s', 1], ['3d', 10]);
            const ng = z > 18 ? 18 : z > 10 ? 10 : z > 2 ? 2 : 0, nsym = { 2: '[He]', 10: '[Ne]', 18: '[Ar]' }; let skip = ng, out = []; for (const [o, k] of parts) { if (skip >= k) { skip -= k; continue; } out.push(o + '<sup>' + k + '</sup>'); } return (ng ? nsym[ng] + ' ' : '') + out.join(' '); }
          let prop = 'rad', sel = 11; const grid = $('.trend', root);
          grid.innerHTML = SY.map((s, i) => { const [r, c2] = pos(i + 1); return `<button class="el" data-z="${i + 1}" style="grid-row:${r};grid-column:${c2}"><span class="z">${i + 1}</span><span class="s">${s}</span></button>`; }).join('');
          seg($('.prop', root), Object.keys(PR).map(k => [k, PR[k][0]]), prop, k => { prop = k; paint(); });
          grid.addEventListener('click', e => { const b = e.target.closest('.el'); if (b) { sel = +b.dataset.z; paint(); } });
          const RAMP = ['#2a2f6b', '#3f7be0', '#2fb7a4', '#f4c35a', '#ff6b6b'];
          function paint() { const [nm, data, unit, tx] = PR[prop]; const vals = data.filter(v => v != null), lo = Math.min(...vals), hi = Math.max(...vals);
            $$('.el', grid).forEach(b => { const z = +b.dataset.z, v = data[z - 1]; const col = v == null ? '#333' : rampColor(RAMP, (v - lo) / (hi - lo)); b.style.background = rgba(col, .55); b.style.borderColor = rgba(col, .9); b.style.color = '#fff'; b.classList.toggle('sel', z === sel); });
            const v = data[sel - 1]; $('.zz', root).textContent = `ATOMIC NUMBER ${sel}`; $('.en', root).textContent = NM[sel - 1]; $('.cfg', root).innerHTML = config(sel); $('.vv', root).innerHTML = `${nm}: <b>${v == null ? 'n/a' : v + ' ' + unit}</b>`;
            $('.tx', root).innerHTML = tx; $('.sc', root).innerHTML = `<span>${lo} ${unit}</span><span style="flex:1;height:8px;border-radius:4px;background:linear-gradient(90deg,${RAMP.join(',')})"></span><span>${hi}</span>`;
            const R = RAD[sel - 1] / 203 * 100; $('.sz', root).innerHTML = `<circle r="${R}" fill="rgba(92,225,230,.15)" stroke="#5ce1e6" stroke-dasharray="3 4"/><circle r="5" fill="#ff5d5d"/><text y="${R + 4 > 96 ? 96 : R + 14}" text-anchor="middle" font-size="12" fill="#8f8eab" font-family="JetBrains Mono">${RAD[sel - 1]} pm</text>`; }
          paint();
        }
      },
      lenses: ['Lithium, sodium, potassium, rubidium, caesium: each fizzes in water more violently than the one before.', 'Each step down a group adds a shell. The outer electron is farther away and more shielded, so it is held more loosely.', 'Na: [Ne] 3s¹ &nbsp;&nbsp; Cs: [Xe] 6s¹', 'Noble-gas shorthand: the core in brackets, then the outer electrons.'],
      miracle: { ico: 'phone', title: 'Why your phone runs on lithium', html: '<p>Lithium is the lightest metal and gives up its outer electron easily, so it can store a lot of energy in very little weight. Those trends at the top-left of the table are why there are lithium-ion batteries in your phone, laptop and electric car.</p><p>Fluorine, at the opposite corner, pulls electrons hardest of all. That is why it forms the slippery, unreactive coating of non-stick pans: its bonds to carbon are almost impossible to break.</p>', c1: '#ff8fc8', c2: '#5ce1e6' },
      quiz: [
        { q: 'Going down a group in the periodic table, atomic radius…', o: ['decreases, because there are more protons', 'increases, because extra shells are added', 'stays the same', 'drops to zero'], a: 1, w: 'Each new period adds a shell of electrons further from the nucleus, so atoms get bigger down a group.' },
        { q: 'Which element has the highest electronegativity?', o: ['Caesium', 'Oxygen', 'Fluorine', 'Neon'], a: 2, w: 'Fluorine (3.98) pulls hardest on shared electrons: small atom, high nuclear charge, little shielding.' }
      ],
      prompt: { p: 'Explain why atoms get smaller as you go across a period from sodium to chlorine.', m: 'Across a period, each element adds one proton and one electron, but the electrons go into the same outer shell. The extra protons pull harder on that shell, while the inner shells shielding it stay the same. So the outer electrons are pulled in closer and the atom shrinks, from 166 pm for sodium to 102 pm for chlorine.' }
    },
    {
      short: 'The Unstable Heart', kicker: 'Radioactivity & half-life', titleHTML: 'The Unstable <em>Heart</em>', item: 'The Iceman’s age', ico: 'rad', teaser: 'How old is he?',
      clue: 'Unstable nuclei decay at random, but a large group halves in a fixed time, the half-life. Measuring what is left tells us how much time has passed.',
      mystery: { q: 'In 1991, hikers found a frozen man in the Alps, nicknamed Ötzi. Scientists said he died about 5,300 years ago. How could they know?', h: ['By counting the rings in his wooden bow', 'By measuring how much radioactive carbon-14 in his body had decayed', 'By studying the style of his clothes'], a: 1, v: 'While alive, Ötzi absorbed carbon-14 from food at the same level as the air. After death, it decayed with a <b>half-life of 5,730 years</b> and was not replaced. His remains held about 53% of the original carbon-14, a little under one half-life: about 5,300 years. This is <b>radiocarbon dating</b>, invented by Willard Libby in 1949.' },
      story: `<p>In 1896 <strong>Henri Becquerel</strong> left uranium salts in a drawer on top of a wrapped photographic plate. When he developed it, the plate was fogged: the uranium was giving off invisible rays all by itself. A young Polish-French physicist, <strong>Marie Curie</strong>, named the effect <strong>radioactivity</strong>, and with her husband Pierre ground through tonnes of ore to discover two new elements, <strong>polonium</strong> and <strong>radium</strong>. She is still the only person to win Nobel Prizes in two different sciences. Her notebooks are so radioactive that they are kept in lead-lined boxes to this day.</p>
        <p>Some nuclei have an unstable mix of protons and neutrons. Eventually each one <strong>decays</strong>, spitting out an alpha particle (2 protons + 2 neutrons), a beta particle (a fast electron, made when a neutron turns into a proton), or a gamma ray (a high-energy photon), and often becoming a different element.</p>
        <p>When any single nucleus will decay is pure chance: quantum randomness at its most stark. Yet in a large crowd, exactly half decay in a fixed time called the <strong>half-life</strong>. Carbon-14’s is 5,730 years; iodine-131’s is 8 days; uranium-238’s is 4.5 billion years, about the age of the Earth.</p>`,
      lab: {
        label: 'Decay chamber', title: 'Watch a crowd of nuclei decay',
        head: '<div class="controls" style="margin:0"><button class="btn primary small go">▶ Start</button><button class="btn small ghost rs">Reset</button></div>',
        body: `<div class="lab-grid"><div class="stage" style="height:340px"><canvas class="c" aria-label="400 radioactive nuclei decaying at random"></canvas></div><div class="side-panel"><div class="seg iso"></div><div class="info-card"><canvas class="g" style="width:100%;height:160px" aria-label="Graph of nuclei remaining over time"></canvas></div><div class="kv"><div><small>Remaining</small><b class="rem">100%</b></div><div><small>Time passed</small><b class="age">0</b></div></div></div></div><p class="hint tx" style="margin-top:12px">Each square is a nucleus. Nobody can predict which one will decay next, but watch the total.</p>`,
        init(root) {
          const ISO = { C14: ['Carbon-14', 5730, 'years'], I131: ['Iodine-131', 8.02, 'days'], U238: ['Uranium-238', 4.47e9, 'years'] };
          let iso = 'C14', N = 400, alive = [], t = 0, run = false, hist = []; const HL = 3;
          const reset = () => { alive = Array(N).fill(true).map(() => ({ a: true, f: 0 })); t = 0; hist = [[0, 1]]; run = false; $('.go', root).textContent = '▶ Start'; };
          reset();
          seg($('.iso', root), Object.keys(ISO).map(k => [k, ISO[k][0]]), iso, k => { iso = k; reset(); });
          $('.go', root).addEventListener('click', () => { run = !run; $('.go', root).textContent = run ? '❚❚ Pause' : '▶ Start'; });
          $('.rs', root).addEventListener('click', reset);
          const c = $('.c', root), g = $('.g', root); let gt = 0;
          animate(c, (dt, tt) => {
            if (run) { t += dt; const p = 1 - Math.pow(2, -dt / HL); alive.forEach(n => { if (n.a && Math.random() < p) { n.a = false; n.f = 1; } }); }
            const left = alive.filter(n => n.a).length / N; gt += dt; if (run && gt > .2) { gt = 0; hist.push([t, left]); }
            const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); const cols = 20, s = Math.min(w, h) / (cols + 1), ox = (w - s * cols) / 2, oy = (h - s * cols) / 2;
            alive.forEach((n, i) => { const x = ox + (i % cols) * s + s / 2, y = oy + Math.floor(i / cols) * s + s / 2; if (n.f > 0) { n.f -= dt * 2; glow(ctx, x, y, s * 2, '#ffd36e', n.f); } ctx.fillStyle = n.a ? '#6fe3a0' : 'rgba(255,255,255,.08)'; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x - s * .38, y - s * .38, s * .76, s * .76, 3) : ctx.rect(x - s * .38, y - s * .38, s * .76, s * .76); ctx.fill(); });
            const [nm, hl, u] = ISO[iso], yrs = t / HL * hl;
            $('.rem', root).textContent = Math.round(left * 100) + '%'; $('.age', root).innerHTML = `${fmt(yrs, yrs < 100 ? 1 : 0)} ${u}`;
            const curve = []; for (let x = 0; x <= 4.2; x += .05) curve.push([x, Math.pow(2, -x)]);
            plot(g, { x: [0, 4.2], y: [0, 1], xt: [0, 1, 2, 3, 4], yt: [0, .25, .5, 1], yf: v => Math.round(v * 100) + '%', xf: v => v + ' t½', series: [{ pts: curve, color: 'rgba(255,255,255,.3)', dash: [4, 4], width: 1.5 }, { pts: hist.map(([a, b]) => [a / HL, b]), color: '#6fe3a0' }], xl: 'half-lives', padB: 30 });
            $('.tx', root).innerHTML = left > .98 ? 'Each square is a nucleus. Nobody can predict which one will decay next, but watch the total.' : `Every ${fmt(hl, 0)} ${u} (one half-life of ${nm.toLowerCase()}), about half of the remaining nuclei decay. With ${Math.round(left * 100)}% left, an archaeologist would read the age as about <b>${fmt(Math.log2(1 / Math.max(left, .002)) * hl, 0)} ${u}</b>.`;
          });
        }
      },
      lenses: ['A smoke detector, a hospital scan, a museum label reading “c. 3300 BCE”.', 'Unstable nuclei emit alpha particles, beta particles or gamma rays at random moments, changing into other nuclei.', '¹⁴₆C → ¹⁴₇N + e⁻', 'Beta decay: a neutron becomes a proton, so carbon-14 becomes nitrogen-14 and an electron is ejected.'],
      miracle: { ico: 'rad', title: 'The banana in your fruit bowl is radioactive', html: '<p>Bananas are rich in potassium, and about 0.012% of all potassium is radioactive potassium-40. Every banana emits roughly 15 beta particles every second. So do you: your body hosts about 4,000 potassium-40 decays per second.</p><p>It\'s harmless at that level. Meanwhile, the smoke detector on your ceiling uses a tiny speck of americium-241, whose alpha particles keep a current flowing until smoke blocks them and trips the alarm.</p>', c1: '#6fe3a0', c2: '#ffd36e' },
      quiz: [
        { q: 'A sample has a half-life of 10 days. What fraction remains after 30 days?', o: ['1/3', '1/8', '1/4', '0'], a: 1, w: 'Three half-lives: ½ × ½ × ½ = 1/8.' },
        { q: 'Why can’t we predict when one particular nucleus will decay?', o: ['Our detectors are too weak', 'Decay is fundamentally random; only the average rate of a crowd is predictable', 'Nuclei decay on a timetable we haven’t found yet', 'Because of temperature'], a: 1, w: 'Radioactive decay is a quantum process. Each nucleus has a fixed probability per second, but no schedule.' }
      ],
      prompt: { p: 'Explain how carbon-14 dating works to someone who has never heard of it.', m: 'Living things constantly take in carbon from air and food, including a tiny, steady fraction of radioactive carbon-14. When they die, the intake stops and the carbon-14 decays, halving every 5,730 years. By measuring how much carbon-14 is left compared with a living thing, scientists can work out how many half-lives have passed, and so the age.' }
    }
  ],
  extra: [
    { c: 1, q: 'Which kind of light has the longest wavelength?', o: ['Ultraviolet', 'Blue', 'Red', 'Infrared'], a: 3, w: 'Infrared lies beyond red, with longer wavelengths and less energy per photon.' },
    { c: 2, q: 'An electron in a hydrogen atom drops from n=3 to n=2. The light emitted is…', o: ['Red, 656 nm', 'Ultraviolet', 'Infrared', 'Not emitted'], a: 0, w: 'This drop gives the famous red hydrogen line at 656 nm, the first of the visible Balmer series.' },
    { c: 3, q: 'How many electrons can one orbital hold?', o: ['1', '2', '8', 'Unlimited'], a: 1, w: 'Pauli: at most two, with opposite spins.' },
    { c: 4, q: 'What is the electron configuration of sodium (11 electrons)?', o: ['1s² 2s² 2p⁷', '1s² 2s² 2p⁶ 3s¹', '1s² 2s⁸ 3s¹', '2, 9'], a: 1, w: '2 + 2 + 6 + 1 = 11, filling 1s, 2s, 2p then 3s.' },
    { c: 5, q: 'An alpha particle is…', o: ['an electron', 'a high-energy photon', '2 protons + 2 neutrons (a helium nucleus)', 'a neutron'], a: 2, w: 'Alpha particles are helium nuclei: heavy, slow, and stopped by a sheet of paper.' }
  ],
  cards: [
    [1, 'How are wavelength and photon energy related?', 'E = hc/λ: shorter wavelength means more energy per photon.'],
    [1, 'What is a photon?', 'A packet (quantum) of light energy.'],
    [1, 'Why can UV light break bonds but red light can’t?', 'Each UV photon has more energy than a bond needs; a red photon has less. Energy arrives one packet at a time.'],
    [1, 'Order these by energy: infrared, visible, ultraviolet.', 'Infrared < visible < ultraviolet.'],
    [2, 'Why do atoms emit line spectra?', 'Electrons only occupy fixed energy levels, so only certain energy drops, and so certain wavelengths, are possible.'],
    [2, 'Emission vs absorption?', 'Emission: the electron falls and releases a photon. Absorption: the electron absorbs a photon of exactly the gap energy and jumps up.'],
    [2, 'Energy levels of hydrogen?', 'E<sub>n</sub> = −13.6 eV / n²'],
    [2, 'Which element was discovered in the Sun first?', 'Helium (1868), from its spectral lines; found on Earth in 1895.'],
    [3, 'What is an orbital?', 'A region of probability where an electron is likely to be found.'],
    [3, 'Shapes of s, p and d orbitals?', 's: sphere. p: dumbbell. d: mostly four-leaf clover.'],
    [3, 'Heisenberg’s uncertainty principle?', 'You cannot know both the exact position and the exact momentum of a particle at once.'],
    [3, 'What is a node?', 'A region in an orbital where the probability of finding the electron is zero.'],
    [4, 'Order of filling orbitals?', '1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p… (lowest energy first).'],
    [4, 'Pauli exclusion principle?', 'An orbital holds at most two electrons, with opposite spins.'],
    [4, 'Trend in ionisation energy?', 'Increases across a period and decreases down a group.'],
    [4, 'What is shielding?', 'Inner electrons reduce the pull of the nucleus on outer electrons.'],
    [4, 'Most electronegative element?', 'Fluorine (3.98 on the Pauling scale).'],
    [5, 'What is a half-life?', 'The time for half of the radioactive nuclei in a sample to decay.'],
    [5, 'Alpha, beta, gamma?', 'Alpha: helium nucleus. Beta: fast electron. Gamma: high-energy photon.'],
    [5, 'Half-life of carbon-14?', '5,730 years.'],
    [5, 'Who discovered radium and polonium?', 'Marie and Pierre Curie (1898).']
  ]
};
