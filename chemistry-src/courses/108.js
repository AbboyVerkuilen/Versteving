function phColor(p) { const S = [[0, '#e0193f'], [2.8, '#ee3f73'], [5.3, '#b54ec0'], [7, '#7d55d8'], [8.4, '#3f7be0'], [10, '#2fb7a4'], [11.8, '#56c95a'], [14, '#e8d838']]; for (let i = 0; i < S.length - 1; i++) if (p <= S[i + 1][0]) return mix(S[i][1], S[i + 1][1], (p - S[i][0]) / (S[i + 1][0] - S[i][0])); return S[S.length - 1][1]; }
function drawBeaker(ctx, x, y, w, h, fill, col, t) {
  ctx.save(); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h - 10); ctx.quadraticCurveTo(x, y + h, x + 10, y + h); ctx.lineTo(x + w - 10, y + h); ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - 10); ctx.lineTo(x + w, y); ctx.strokeStyle = 'rgba(223,231,255,.6)'; ctx.lineWidth = 2.5; ctx.stroke(); ctx.clip();
  const ly = y + h * (1 - fill); const g = ctx.createLinearGradient(0, ly, 0, y + h); g.addColorStop(0, rgba(col, .85)); g.addColorStop(1, rgba(shade(col, -.3), .95)); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, ly);
  for (let i = 0; i <= 20; i++) ctx.lineTo(x + w * i / 20, ly + Math.sin(t * 2 + i * .8) * 1.5); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(x + 6, y, 8, h); ctx.restore();
}
const COURSE = {
  id: '108', title: 'Proton Wars', brand: 'Proton <i>Wars</i>',
  eyebrow: 'Chemistry 108 · Acids, bases, titrations & buffers', titleHTML: 'Proton <em>Wars</em>',
  lede: 'You sprinkle vinegar on your chips, yet the acid in a car battery would burn through your skin. Your blood never turns sour, and the oceans are slowly becoming more acidic. A mystery about the tiniest particle in chemistry, fought over everywhere.',
  accent: ['#ff6b9a', '#6fe3a0'],
  cast: {
    Ar: { name: 'Svante', full: 'Arrhenius', color: '#f4c35a', title: 'Nearly failed his PhD; won the Nobel Prize', sym: 'Ar' },
    So: { name: 'Søren', full: 'Sørensen', color: '#ff6b9a', title: 'Invented pH in a beer laboratory', sym: 'pH' },
    buf: { name: 'Buffy', full: 'Buffer', color: '#6fe3a0', title: 'Soaks up acid and base alike', sym: '⇄' }
  },
  prologue: {
    short: 'The Sour Riddle', kicker: 'The case begins', titleHTML: 'The Sour <em>Riddle</em>',
    story: `<p>A bottle of vinegar and a bottle of hydrochloric acid can contain exactly the same number of acid molecules per litre. One goes on your chips; the other eats through metal. Why?</p>
      <p>Your stomach holds acid strong enough to dissolve a zinc nail. Your blood, a few centimetres away, must stay between pH 7.35 and 7.45, and even a sprint flooding it with acid barely moves the needle. Meanwhile the oceans, vast as they are, have measurably soured since the Industrial Revolution.</p>
      <p>In Chemistry 101 you learned that acids give away <strong>H⁺</strong>, a bare proton, and bases take it. Now it’s time to go deeper: how strongly, how many, how to count them, and how nature keeps the peace in a world of proton thieves.</p>`,
    cast: [['p', 'sly'], ['H', 'shocked'], ['Ar', 'happy'], ['So', 'happy'], ['buf', 'happy']]
  },
  finale: {
    q: 'Who rules the world of acids and bases?', lead: 'Strong and weak acids, a logarithmic scale, the drip of a burette, buffers and the souring sea. Every clue turns on one tiny particle passed from hand to hand.',
    avatar: 'p', nameHTML: 'The <em>proton</em>, and who holds it',
    html: `<p>Acidity isn’t about how many acid molecules there are, but how many <strong>protons (H⁺) are actually let go</strong>.</p>
      <p>Strong acids release all their protons; weak acids cling to most of theirs, which is why vinegar is gentle. pH counts free protons in powers of ten, so dilution moves it one step per tenfold, and never past neutral. A titration counts protons exactly by neutralising them one for one. Buffers hold a reserve of both a weak acid and its partner, soaking up protons or releasing them to keep pH steady, in your blood and in the sea. But even the ocean’s buffer has limits, and the CO₂ we add is testing them.</p>
      <p>A war over the smallest particle in chemistry, fought in every cell, every lake and every kitchen. Case closed.</p>`
  },
  cases: [
    {
      short: 'Strong & Weak', kicker: 'Acid strength & Ka', titleHTML: 'Strong & <em>Weak</em>', item: 'Vinegar on chips', ico: 'lemon', teaser: 'Why is it safe?',
      clue: 'A strong acid releases all its protons in water; a weak acid releases only a small fraction (described by Ka). Strength is not the same as concentration.',
      mystery: { q: 'Vinegar and hydrochloric acid, both at 0.1 mol/L, contain the same number of acid molecules. Yet the hydrochloric acid is about 100 times more acidic. Why?', h: ['Vinegar is diluted with water', 'HCl lets go of all its protons; acetic acid in vinegar lets go of only about 1 in 75', 'Vinegar contains a base'], a: 1, v: 'Hydrochloric acid is a <b>strong acid</b>: every HCl molecule gives its proton to water. Acetic acid is a <b>weak acid</b>: most molecules keep hold of their proton, and only about 1.3% let go at any moment. Fewer free H⁺ ions means a much higher pH: 2.9 for 0.1 M vinegar, 1.0 for 0.1 M HCl.' },
      story: `<p>Danish chemist <strong>Johannes Brønsted</strong> and English chemist <strong>Thomas Lowry</strong> independently gave the modern definition in 1923: an <strong>acid</strong> is a proton donor and a <strong>base</strong> is a proton acceptor. In water, an acid hands its proton to a water molecule, making H₃O⁺ (hydronium, which we usually just write as H⁺).</p>
        <p>But acids differ hugely in how <em>willing</em> they are to let go. A <strong>strong acid</strong> such as hydrochloric (HCl), sulfuric or nitric acid donates essentially every proton. A <strong>weak acid</strong> such as acetic acid (vinegar), citric acid (lemons) or carbonic acid (fizzy drinks) holds on to most of them: only a small fraction is split at any moment, in a dynamic equilibrium.</p>
        <p>That fraction is captured by the <strong>acid dissociation constant</strong>, K<sub>a</sub>. For acetic acid it’s 1.8 × 10⁻⁵, a small number meaning mostly undissociated. Don’t confuse <em>strong</em> with <em>concentrated</em>: a dilute strong acid can be gentler than a concentrated weak one.</p>`,
      lab: {
        label: 'Dissociation viewer', title: '0.1 mol/L of acid in water: who lets go?',
        head: '<div class="seg ac"></div>',
        body: `<div class="lab-grid"><div class="stage" style="height:320px"><canvas class="c" aria-label="Acid molecules releasing protons in water"></canvas></div><div class="side-panel"><div class="kv"><div><small>pH</small><b class="ph"></b></div><div><small>Molecules split</small><b class="al"></b></div><div><small>Ka</small><b class="ka"></b></div></div><div class="info-card"><p class="tx" style="margin:0;font-size:14.5px;color:var(--soft)"></p></div><div class="legend"><span><i style="background:#eef3ff"></i>H (still attached)</span><span><i style="background:#ff6b9a"></i>H⁺ free proton</span><span><i style="background:#a78bfa"></i>A⁻ leftover ion</span></div></div></div>`,
        init(root) {
          const A = { hcl: ['Hydrochloric', 'HCl', 1e7, 'Strong acid: stomach acid, and in industry. Every molecule gives up its proton.'], cit: ['Citric (lemon)', 'C₆H₈O₇', 7.4e-4, 'Weak acid: the sourness of lemons and limes. About 1 in 12 lets go.'], ace: ['Acetic (vinegar)', 'CH₃COOH', 1.8e-5, 'Weak acid: about 1 molecule in 75 lets go. Gentle enough for your chips.'], car: ['Carbonic (soda)', 'H₂CO₃', 4.3e-7, 'Very weak: formed when CO₂ dissolves in water. Only about 1 in 500 splits.'] };
          let cur = 'ace', M = []; const c = $('.c', root);
          function show(k) { cur = k; const [nm, f, Ka] = A[k], C = .1; const h = Ka > 1 ? C : (-Ka + Math.sqrt(Ka * Ka + 4 * Ka * C)) / 2, al = h / C;
            $('.ph', root).textContent = (-Math.log10(h)).toFixed(1); $('.al', root).textContent = al > .99 ? '100%' : (al * 100).toFixed(al < .01 ? 2 : 1) + '%'; $('.ka', root).innerHTML = Ka > 1 ? 'huge' : fmt(Ka, 1); $('.tx', root).innerHTML = `<b>${nm}</b> (${f}). ${A[k][3]}`;
            M.forEach((m, i) => { m.split = i < Math.max(Ka > 1 ? M.length : 1, Math.round(al * M.length)); }); }
          seg($('.ac', root), Object.keys(A).map(k => [k, A[k][0]]), cur, show);
          animate(c, (dt, t) => { const { ctx, w, h } = fit(c); if (!M.length) { for (let i = 0; i < 36; i++) M.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * 50, vy: (Math.random() - .5) * 50, hx: 0, hy: 0, hvx: (Math.random() - .5) * 90, hvy: (Math.random() - .5) * 90, split: false, a: Math.random() * TAU }); show(cur); }
            ctx.clearRect(0, 0, w, h);
            if (A[cur][2] < 1 && Math.random() < dt * 2) { const sp = M.filter(m => m.split), un = M.filter(m => !m.split); if (sp.length && un.length) { const a = sp[Math.floor(Math.random() * sp.length)], b = un[Math.floor(Math.random() * un.length)]; a.split = false; b.split = true; b.hx = 0; b.hy = 0; } }
            for (const m of M) { m.x += m.vx * dt; m.y += m.vy * dt; if (m.x < 10 || m.x > w - 10) m.vx *= -1; if (m.y < 10 || m.y > h - 10) m.vy *= -1; m.a += dt;
              if (m.split) { m.hx += m.hvx * dt; m.hy += m.hvy * dt; const px = m.x + m.hx, py = m.y + m.hy; if (px < 4 || px > w - 4) m.hvx *= -1; if (py < 4 || py > h - 4) m.hvy *= -1; ball(ctx, '#a78bfa', m.x, m.y, 7); label(ctx, '−', m.x, m.y + 4, { align: 'center', font: '700 11px Inter', color: '#141625' }); glow(ctx, px, py, 14, '#ff6b9a', .8); ball(ctx, '#ff6b9a', px, py, 4); }
              else { ball(ctx, '#a78bfa', m.x, m.y, 7); ball(ctx, '#eef3ff', m.x + Math.cos(m.a) * 9, m.y + Math.sin(m.a) * 9, 4); } } });
        }
      },
      lenses: ['Vinegar tingles; hydrochloric acid burns. Same concentration, very different strength.', 'Strong acid molecules all split into H⁺ and A⁻. Weak acid molecules mostly stay whole, with only a few splitting at any moment.', 'HA ⇌ H⁺ + A⁻ &nbsp; Ka = [H⁺][A⁻] / [HA]', 'A large Ka means a strong acid. pKa = −log Ka; a smaller pKa means a stronger acid.'],
      miracle: { ico: 'lemon', title: 'Ants fire acid', html: '<p>Formic acid, the simplest carboxylic acid, was first isolated in 1671 by distilling crushed ants. Its name comes from the Latin <i>formica</i>, ant. Wood ants spray it at attackers, and some birds deliberately rub ants on their feathers ("anting"), possibly to use the acid against parasites.</p><p>Formic acid is weak, but it is also what makes nettle stings and some ant bites smart.</p>', c1: '#ff9f5a', c2: '#ff6b9a' },
      quiz: [
        { q: 'What is the difference between a strong acid and a weak acid?', o: ['Strong acids are more concentrated', 'Strong acids dissociate completely in water; weak acids only partially', 'Weak acids have no protons', 'Strong acids are always hot'], a: 1, w: 'Strength is about how completely the acid releases its protons, not how much acid there is.' },
        { q: 'Which acid has the largest Ka?', o: ['Carbonic acid', 'Acetic acid', 'Hydrochloric acid', 'Water'], a: 2, w: 'Hydrochloric acid is strong, with an enormous Ka.' }
      ],
      prompt: { p: 'Explain the difference between "strong" and "concentrated" for acids, with an example of each.', m: 'Concentration is how much acid is dissolved per litre; strength is what fraction of the acid molecules actually release their protons. Hydrochloric acid is strong: all molecules split, even when it is dilute. Acetic acid is weak: only about 1% split, even in concentrated vinegar. So a dilute strong acid and a concentrated weak acid can end up with similar pH.' }
    },
    {
      short: 'The Power of Ten', kicker: 'pH & dilution', titleHTML: 'The Power of <em>Ten</em>', item: 'The watered-down acid', ico: 'drop', teaser: 'Can water neutralise it?',
      clue: 'pH = −log[H⁺]. Diluting an acid tenfold raises the pH by one unit, but water alone can never push it past 7.',
      mystery: { q: 'If you keep diluting an acid with more and more water, will it eventually become basic (above pH 7)?', h: ['Yes, with enough water', 'No: it approaches pH 7 but never passes it, because water itself provides H⁺ and OH⁻ equally', 'No: acids can never be diluted'], a: 1, v: 'Each tenfold dilution raises the pH by about one unit: 1, 2, 3… But water itself always contains a tiny equal amount of H⁺ and OH⁻ (10⁻⁷ mol/L each). As the acid’s own H⁺ becomes negligible, the pH <b>levels off at 7</b>. Only adding a base can take it beyond.' },
      story: `<p>In 1909, at the Carlsberg brewery laboratory in Copenhagen, the Danish chemist <strong>Søren Sørensen</strong> was studying how acidity affects enzymes in brewing. The concentrations of H⁺ he dealt with were awkward numbers like 0.0000001 mol/L. He proposed a shortcut: the <strong>pH</strong>, the negative power of ten. 10⁻⁷ became simply pH 7.</p>
        <p>So <strong>pH = −log₁₀[H⁺]</strong>. Lower pH means more H⁺. Each step of one is a factor of ten, so pH 3 has ten times more H⁺ than pH 4, and a thousand times more than pH 6.</p>
        <p>Pure water isn’t just H₂O: a tiny fraction of molecules swap protons, making equal amounts of H⁺ and OH⁻: 10⁻⁷ mol/L each at 25 °C. Their product is always <strong>K<sub>w</sub> = [H⁺][OH⁻] = 10⁻¹⁴</strong>. That is why pH + pOH = 14, and why neutral is pH 7.</p>`,
      lab: {
        label: 'Dilution ladder', title: 'Keep adding water',
        head: '<div class="controls" style="margin:0"><button class="btn primary small dil">Dilute ×10</button><button class="btn small ghost rs">Reset</button></div>',
        body: `<div class="lab-grid"><div class="stage" style="height:330px"><canvas class="c" aria-label="Beaker of acid being diluted tenfold each step"></canvas></div><div class="side-panel"><div class="info-card"><canvas class="g" style="width:100%;height:200px" aria-label="pH after each dilution"></canvas></div><div class="kv"><div><small>[H⁺]</small><b class="h"></b></div><div><small>pH</small><b class="p"></b></div><div><small>Total volume</small><b class="v"></b></div></div></div></div>`,
        init(root) {
          let n = 0, shown = 1; const c = $('.c', root);
          const ph = n => { const C = .1 / Math.pow(10, n), h = C / 2 + Math.sqrt(C * C / 4 + 1e-14); return -Math.log10(h); };
          const vol = n => { const v = .01 * Math.pow(10, n); return v < 1 ? (v * 1000).toFixed(0) + ' mL' : v < 1000 ? fmt(v, 0) + ' L' : v < 1e6 ? fmt(v / 1000, 0) + ' m³ (' + ['a bathtub', 'a swimming pool', 'a lake'][Math.min(2, Math.floor(Math.log10(v) - 3))] + ')' : fmt(v / 1000, 0) + ' m³'; };
          function upd() { const p = ph(n); $('.p', root).textContent = p.toFixed(2); $('.h', root).innerHTML = fmt(Math.pow(10, -p), 1) + ' M'; $('.v', root).textContent = vol(n);
            const pts = []; for (let i = 0; i <= n; i++) pts.push([i, ph(i)]); plot($('.g', root), { x: [0, 10], y: [0, 8], xt: [0, 2, 4, 6, 8, 10], yt: [0, 1, 2, 3, 4, 5, 6, 7, 8], xl: 'number of ×10 dilutions', yl: 'pH', series: [{ pts, color: '#ff6b9a', dots: true }], hlines: [{ y: 7, color: '#6fe3a0', label: 'neutral' }] }); }
          $('.dil', root).addEventListener('click', () => { if (n < 10) n++; if (n >= 7) toast('The pH creeps towards 7 but never crosses it.'); upd(); });
          $('.rs', root).addEventListener('click', () => { n = 0; upd(); }); upd(); new ResizeObserver(upd).observe($('.g', root));
          animate(c, (dt, t) => { const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); shown += (ph(n) - shown) * Math.min(1, dt * 3); const col = phColor(shown), bw = Math.min(200, w * .45), bh = h * .7;
            drawBeaker(ctx, w / 2 - bw / 2, h * .12, bw, bh, .55 + Math.min(.4, n * .04), col, t); label(ctx, 'pH ' + shown.toFixed(1), w / 2, h * .12 + bh + 30, { align: 'center', font: '500 26px Fraunces,serif', color: shade(col, .3) });
            const k = Math.max(0, 22 - Math.round(n * 3)); for (let i = 0; i < k; i++) { const x = w / 2 - bw / 2 + 20 + ((i * 37) % (bw - 40)), y = h * .12 + bh * .5 + ((i * 53) % (bh * .45)); glow(ctx, x + Math.sin(t + i) * 4, y, 10, '#ff6b9a', .8); ball(ctx, '#ff6b9a', x + Math.sin(t + i) * 4, y, 3); }
            label(ctx, n === 0 ? '0.1 M hydrochloric acid' : `diluted ${n === 1 ? '10' : '10' + String(n).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]).join('')} times`, w / 2, 20, { align: 'center', size: 11, color: '#c9c8dc' }); });
        }
      },
      lenses: ['Squash concentrate is sour; diluted squash is pleasant; but no amount of water makes it bitter like soap.', 'Each tenfold dilution leaves one tenth as many H⁺ per litre. Water’s own H⁺ and OH⁻ eventually dominate.', 'pH = −log[H⁺] &nbsp; [H⁺][OH⁻] = 10⁻¹⁴', 'At 25 °C, pH + pOH = 14. Neutral: [H⁺] = [OH⁻] = 10⁻⁷ M.'],
      miracle: { ico: 'flower', title: 'Hydrangeas are pH meters', html: '<p>The same hydrangea bush can grow blue flowers in acidic soil and pink ones in alkaline soil. The colour comes from a pigment that binds aluminium ions, and aluminium only dissolves in the soil water when it is acidic.</p><p>Gardeners change the colour on purpose, adding sulfur or aluminium sulfate for blue and lime for pink. It\'s a living, blooming indicator.</p>', c1: '#6b8cff', c2: '#ff6b9a' },
      quiz: [
        { q: 'A solution has pH 3. Its [H⁺] is…', o: ['3 mol/L', '0.001 mol/L', '0.3 mol/L', '1000 mol/L'], a: 1, w: 'pH = −log[H⁺], so [H⁺] = 10⁻³ = 0.001 M.' },
        { q: 'You dilute an acid at pH 2 by a factor of 100. The new pH is about…', o: ['2', '3', '4', '200'], a: 2, w: 'Each ×10 dilution adds 1 to the pH. ×100 is two steps: pH 4.' }
      ],
      prompt: { p: 'Explain why pure water has a pH of exactly 7 at 25 °C.', m: 'A tiny fraction of water molecules pass a proton to each other, forming equal amounts of H⁺ and OH⁻. At 25 °C their product is always 10⁻¹⁴, and since they are equal, each is 10⁻⁷ mol/L. pH = −log(10⁻⁷) = 7. It’s neutral because the H⁺ and OH⁻ balance exactly.' }
    },
    {
      short: 'The Titration', kicker: 'Neutralisation & titration curves', titleHTML: 'The <em>Titration</em>', item: 'The drink tester', ico: 'flask', teaser: 'How much acid?',
      clue: 'In a titration, a base of known concentration is added drop by drop until it exactly neutralises the acid (the equivalence point). The volume used reveals how much acid there was.',
      mystery: { q: 'Food inspectors need to know exactly how much acid is in a bottle of vinegar or juice. How do they measure it precisely?', h: ['They taste it against a sour scale', 'They add a base of known strength drop by drop until it is exactly neutralised, and measure how much was needed', 'They weigh the bottle'], a: 1, v: 'In a <b>titration</b>, a base of known concentration drips from a burette into the sample. Each OH⁻ neutralises one H⁺. At the <b>equivalence point</b>, the pH leaps and an indicator changes colour. From the volume of base used, a simple mole calculation gives the amount of acid, to within a fraction of a percent.' },
      story: `<p>When an acid meets a base, protons meet hydroxide ions and they cancel: <strong>H⁺ + OH⁻ → H₂O</strong>. This <strong>neutralisation</strong> is the basis of one of chemistry’s most precise measurements.</p>
        <p>In a <strong>titration</strong>, you put a measured volume of acid in a flask with a few drops of <strong>indicator</strong>, a dye that changes colour at a certain pH. A <strong>burette</strong>, a long glass tube with a tap and fine markings, delivers a base of known concentration drop by drop. At first the pH barely changes. Then, near the end, a single drop swings it dramatically: you’ve hit the <strong>equivalence point</strong>, where moles of base equal moles of acid.</p>
        <p>The shape of the pH curve tells a story. Strong acid with strong base gives a sharp, symmetrical jump centred on pH 7. A weak acid gives a gentle slope first (a natural buffer forms), then a jump that ends <em>above</em> 7, because the leftover partner ion is itself slightly basic.</p>`,
      lab: {
        label: 'Virtual burette', title: '25 mL of 0.1 M acid + 0.1 M NaOH',
        head: '<div class="controls" style="margin:0"><button class="btn primary small run">▶ Titrate</button><button class="btn small ghost rs">Reset</button></div>',
        body: `<div class="pill-row" style="margin-bottom:12px"><div class="seg ac"></div><div class="seg ind"></div></div><div class="lab-grid"><div class="stage" style="height:360px"><canvas class="c" aria-label="Burette dripping base into a flask of acid with indicator"></canvas></div><div class="side-panel"><div class="info-card"><canvas class="g" style="width:100%;height:220px" aria-label="Titration curve: pH against volume of base"></canvas></div><div class="kv"><div><small>Base added</small><b class="v">0.0 mL</b></div><div><small>pH</small><b class="p"></b></div></div><p class="hint tx" style="font-size:13px"></p></div></div>`,
        init(root) {
          let acid = 'strong', ind = 'php', V = 0, run = false, pts = []; const Ka = 1.8e-5, Kw = 1e-14, c = $('.c', root);
          function pH(V) { const nA = 2.5e-3, nB = .1 * V / 1000, Vt = (25 + V) / 1000;
            if (acid === 'strong') { if (Math.abs(nB - nA) < 1e-9) return 7; return nB < nA ? -Math.log10((nA - nB) / Vt) : 14 + Math.log10((nB - nA) / Vt); }
            if (nB === 0) return -Math.log10(Math.sqrt(Ka * .1)); if (nB < nA - 1e-9) return -Math.log10(Ka) + Math.log10(nB / (nA - nB)); if (Math.abs(nB - nA) < 1e-9) return 14 + Math.log10(Math.sqrt(Kw / Ka * nA / Vt)); return 14 + Math.log10((nB - nA) / Vt); }
          const IND = { php: ['Phenolphthalein', p => p < 8.2 ? 'rgba(255,255,255,.12)' : mix('#f6d7f0', '#e0189a', clamp((p - 8.2) / 1.8, 0, 1)), '8.2–10'], mo: ['Methyl orange', p => p < 3.1 ? '#e8303a' : p > 4.4 ? '#f4c35a' : mix('#e8303a', '#f4c35a', (p - 3.1) / 1.3), '3.1–4.4'] };
          const reset = () => { V = 0; pts = [[0, pH(0)]]; run = false; $('.run', root).textContent = '▶ Titrate'; };
          seg($('.ac', root), [['strong', 'HCl (strong)'], ['weak', 'Vinegar (weak)']], acid, k => { acid = k; reset(); });
          seg($('.ind', root), [['php', 'Phenolphthalein'], ['mo', 'Methyl orange']], ind, k => { ind = k; });
          $('.run', root).addEventListener('click', () => { if (V >= 50) reset(); run = !run; $('.run', root).textContent = run ? '❚❚ Pause' : '▶ Titrate'; });
          $('.rs', root).addEventListener('click', reset); reset();
          const drops = [];
          animate(c, (dt, t) => { if (run) { const near = Math.abs(V - 25) < 2.5; V = Math.min(50, V + dt * (near ? 1.2 : 5)); pts.push([V, pH(V)]); if (Math.random() < dt * (near ? 3 : 8)) drops.push({ y: 0 }); if (V >= 50) { run = false; $('.run', root).textContent = '↻ Again'; } }
            const p = pH(V); $('.v', root).textContent = V.toFixed(1) + ' mL'; $('.p', root).textContent = p.toFixed(2);
            $('.tx', root).innerHTML = V < 24 ? 'Each drop of OH⁻ neutralises some H⁺. Watch how little the pH moves at first.' : V < 26 ? `<b>Equivalence point!</b> At 25.0 mL, moles of base = moles of acid. ${acid === 'weak' ? 'For a weak acid the pH here is about 8.7, not 7, because the acetate ion left behind is slightly basic.' : 'The pH leaps through 7.'}` : `Excess base now. Indicator ${IND[ind][0].toLowerCase()} changes over pH ${IND[ind][2]}. ${ind === 'mo' && acid === 'weak' ? 'Methyl orange changes far too early for a weak acid. Choosing the right indicator matters!' : ''}`;
            const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); const bx = w / 2, by = 14, bh = h * .42;
            ctx.strokeStyle = 'rgba(223,231,255,.6)'; ctx.lineWidth = 2; ctx.strokeRect(bx - 9, by, 18, bh); const lev = (1 - V / 50) * (bh - 6); ctx.fillStyle = 'rgba(160,200,255,.45)'; ctx.fillRect(bx - 7, by + bh - 3 - lev, 14, lev);
            for (let i = 0; i <= 10; i++) { ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(bx + 9, by + 3 + i * (bh - 6) / 10, i % 5 ? 4 : 8, 1); } label(ctx, '0', bx + 22, by + 8, { size: 9, color: '#8f8eab' }); label(ctx, '50 mL', bx + 22, by + bh, { size: 9, color: '#8f8eab' });
            ctx.fillStyle = 'rgba(223,231,255,.5)'; ctx.fillRect(bx - 2, by + bh, 4, 22); ctx.fillRect(bx - 12, by + bh + 6, 24, 5);
            const fy = by + bh + 34, fw = Math.min(170, w * .4), fh = h - fy - 12; for (const d of drops) { d.y += dt * 220; glow(ctx, bx, fy + d.y - 6, 6, '#a0c8ff', .8); } for (let i = drops.length - 1; i >= 0; i--) if (drops[i].y > fh * .4) drops.splice(i, 1);
            const col = IND[ind][1](p); ctx.save(); ctx.beginPath(); ctx.moveTo(bx - 14, fy); ctx.lineTo(bx - 14, fy + fh * .3); ctx.lineTo(bx - fw / 2, fy + fh); ctx.lineTo(bx + fw / 2, fy + fh); ctx.lineTo(bx + 14, fy + fh * .3); ctx.lineTo(bx + 14, fy); ctx.strokeStyle = 'rgba(223,231,255,.6)'; ctx.lineWidth = 2; ctx.stroke(); ctx.clip(); ctx.fillStyle = col; ctx.fillRect(0, fy + fh * .5, w, h); ctx.restore();
            const eqx = acid === 'strong' ? 7 : 8.72; plot($('.g', root), { x: [0, 50], y: [0, 14], xt: [0, 10, 20, 25, 30, 40, 50], yt: [0, 2, 4, 6, 7, 8, 10, 12, 14], xl: 'NaOH added (mL)', yl: 'pH', series: [{ pts, color: '#ff6b9a' }], vlines: [{ x: 25, color: 'rgba(244,195,90,.6)', label: 'equivalence' }], marks: V > 26 ? [{ x: 25, y: eqx, color: '#f4c35a', r: 4 }] : [] }); });
        }
      },
      lenses: ['A flask that turns from clear to pink with a single drop; the label "acidity 5%" on a vinegar bottle.', 'OH⁻ ions from the burette mop up H⁺ ions in the flask one for one. When they run out, OH⁻ builds up and pH soars.', 'n<sub>acid</sub> = n<sub>base</sub> at equivalence &nbsp; (c × V)', 'For a 1:1 acid and base: c<sub>a</sub>V<sub>a</sub> = c<sub>b</sub>V<sub>b</sub>.'],
      miracle: { ico: 'cup', title: 'Wine-makers titrate every batch', html: '<p>The tartness, stability and taste of wine depend on its "titratable acidity", measured exactly the way you just did it: a sample, an indicator (or pH meter), and a burette of sodium hydroxide. Too little acid and the wine tastes flat and spoils; too much and it is harsh.</p><p>Labs around the world run millions of titrations a year, on drinking water, medicines, blood and fuels. It is one of the oldest and most trusted measurements in chemistry.</p>', c1: '#b54ec0', c2: '#ff6b9a' },
      quiz: [
        { q: '25 mL of 0.1 M HCl is exactly neutralised by NaOH. How many mL of 0.1 M NaOH are needed?', o: ['12.5 mL', '25 mL', '50 mL', '0.1 mL'], a: 1, w: 'Same concentration, 1:1 ratio: equal volumes. 2.5 mmol acid needs 2.5 mmol base.' },
        { q: 'Why is the pH at the equivalence point above 7 for vinegar titrated with NaOH?', o: ['Too much base was added', 'The acetate ion left behind is a weak base', 'Vinegar contains sugar', 'The indicator changes the pH'], a: 1, w: 'Acetate (CH₃COO⁻) takes protons from water, producing a little OH⁻: pH about 8.7.' }
      ],
      prompt: { p: 'Explain why a titration curve is flat at first and then suddenly jumps.', m: 'At first there is a large excess of acid. Each drop of base neutralises a tiny portion of it, so [H⁺] barely changes, and on the logarithmic pH scale it moves very little. Near the equivalence point, almost all the H⁺ is gone, so one drop of base changes [H⁺] by a huge factor, many powers of ten, and the pH leaps.' }
    },
    {
      short: 'The Buffer', kicker: 'Buffers', titleHTML: 'The <em>Buffer</em>', item: 'The sprinter’s blood', ico: 'heart', teaser: 'Why doesn’t it sour?',
      clue: 'A buffer contains a weak acid and its partner base. It absorbs added H⁺ or OH⁻, keeping pH almost constant, as in blood (carbonic acid / bicarbonate).',
      mystery: { q: 'A sprinter’s muscles pour acid into their blood, yet blood pH stays between 7.35 and 7.45. How?', h: ['The heart filters acid out', 'Blood contains a buffer pair, carbonic acid and bicarbonate, that soaks up the extra H⁺', 'Sweat removes the acid'], a: 1, v: 'Blood is <b>buffered</b>. Bicarbonate ions (HCO₃⁻) grab extra H⁺ to become carbonic acid, which breaks down into CO₂ and water. You breathe the CO₂ out, which is part of why you pant after a sprint. Your lungs and kidneys fine-tune the buffer so pH barely moves.' },
      story: `<p>Add a single drop of strong acid to a litre of pure water and the pH crashes from 7 to below 5. Add the same drop to a litre of blood and nothing measurable happens. The difference is a <strong>buffer</strong>.</p>
        <p>A buffer is a mixture of a <strong>weak acid</strong> and its <strong>conjugate base</strong> (the ion left when it loses its proton), in similar amounts. Add H⁺, and the base mops it up: A⁻ + H⁺ → HA. Add OH⁻, and the acid neutralises it: HA + OH⁻ → A⁻ + H₂O. Either way, the free H⁺ concentration hardly changes.</p>
        <p>In 1908 the American physician <strong>Lawrence Henderson</strong>, studying blood, wrote down the equation later refined by Karl Hasselbalch: <strong>pH = pKa + log([A⁻]/[HA])</strong>. A buffer works best when the two partners are equal, so that pH = pKa, and it fails only when one partner is used up.</p>`,
      lab: {
        label: 'Buffer duel', title: 'Pure water vs buffer: add acid or base',
        head: '<div class="controls" style="margin:0"><button class="btn small acid">+ 1 mL acid</button><button class="btn small base">+ 1 mL base</button><button class="btn small ghost rs">Reset</button></div>',
        body: `<div class="lab-grid"><div class="stage" style="height:300px"><canvas class="c" aria-label="Two beakers: pure water and a buffer"></canvas></div><div class="side-panel"><div class="info-card"><canvas class="g" style="width:100%;height:200px" aria-label="pH history for water and buffer"></canvas><div class="legend"><span><i style="background:#9fd6ff"></i>pure water</span><span><i style="background:#6fe3a0"></i>buffer</span></div></div><p class="hint tx" style="font-size:13px">Each click adds 1 mL of 1 M strong acid (HCl) or base (NaOH) to 100 mL of each liquid. The buffer holds 0.1 M acetic acid + 0.1 M acetate.</p></div></div>`,
        init(root) {
          let net = 0, hist = []; const pKa = 4.74;
          const phW = n => { const Vt = (100 + Math.abs(n)) / 1000; if (n === 0) return 7; const c = Math.abs(n) * 1e-3 / Vt; return n > 0 ? -Math.log10(c / 2 + Math.sqrt(c * c / 4 + 1e-14)) : 14 + Math.log10(c / 2 + Math.sqrt(c * c / 4 + 1e-14)); };
          const phB = n => { const HA = 10 + n, A = 10 - n; if (A <= 0) return phW(n - 10) ; if (HA <= 0) return phW(n + 10); return pKa + Math.log10(A / HA); };
          const rec = () => { hist.push([hist.length, phW(net), phB(net)]); draw(); };
          $('.acid', root).addEventListener('click', () => { net++; rec(); }); $('.base', root).addEventListener('click', () => { net--; rec(); }); $('.rs', root).addEventListener('click', () => { net = 0; hist = [[0, 7, pKa]]; draw(); });
          hist = [[0, 7, pKa]];
          function draw() { plot($('.g', root), { x: [0, Math.max(10, hist.length)], y: [0, 14], xt: [0, 5, 10, 15, 20], yt: [0, 2, 4, 6, 7, 8, 10, 12, 14], xl: 'mL added', yl: 'pH', series: [{ pts: hist.map(q => [q[0], q[1]]), color: '#9fd6ff', dots: true }, { pts: hist.map(q => [q[0], q[2]]), color: '#6fe3a0', dots: true }] }); }
          draw(); new ResizeObserver(draw).observe($('.g', root));
          const c = $('.c', root); let s1 = 7, s2 = pKa;
          animate(c, (dt, t) => { const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); s1 += (phW(net) - s1) * Math.min(1, dt * 4); s2 += (phB(net) - s2) * Math.min(1, dt * 4); const bw = Math.min(150, w * .3), bh = h * .62;
            [[w * .27, s1, 'Pure water'], [w * .73, s2, 'Buffer']].forEach(([x, p, nm]) => { drawBeaker(ctx, x - bw / 2, h * .1, bw, bh, .7, phColor(p), t); label(ctx, nm, x, h * .1 + bh + 22, { align: 'center', size: 12, color: '#eeedf7', font: '600 12px Inter' }); label(ctx, 'pH ' + p.toFixed(2), x, h * .1 + bh + 44, { align: 'center', font: '500 20px Fraunces,serif', color: shade(phColor(p), .35) }); });
            label(ctx, net === 0 ? 'nothing added yet' : `${Math.abs(net)} mL of 1 M ${net > 0 ? 'acid' : 'base'} added`, w / 2, 18, { align: 'center', size: 11, color: '#c9c8dc' });
            if (Math.abs(net) >= 10) label(ctx, 'buffer capacity used up!', w * .73, h * .1 + bh / 2, { align: 'center', size: 12, color: '#ff6b9a', font: '600 12px Inter' }); });
        }
      },
      dialogue: [['buf', 'happy', 'BUFFY · buffer', '“Throw protons at me and my bases catch them. Pull protons away and my acids hand over spares. Either way, I keep things steady.”'], ['p', 'sly', 'PROTON · H⁺', '“Annoying. But everyone has limits, Buffy. Run out of partners and I’ll get through.”']],
      lenses: ['Blood stays at pH 7.4; antacid tablets settle a sour stomach; swimming pools are dosed with buffer to keep water stable.', 'The weak acid neutralises added base; the conjugate base neutralises added acid. Free H⁺ stays nearly constant.', 'pH = pKa + log([A⁻] / [HA])', 'The Henderson–Hasselbalch equation. Best buffering when [A⁻] = [HA], so pH = pKa.'],
      miracle: { ico: 'heart', title: 'You breathe to control your pH', html: '<p>Your blood buffer is CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻. When acid builds up, the equilibrium shifts left and more CO₂ forms; sensors in your brainstem detect the change and make you breathe faster to blow it off. Hold your breath and CO₂ accumulates, nudging your blood slightly acidic.</p><p>It is a buffer connected to a pair of lungs, adjusting breath by breath, every moment of your life.</p>', c1: '#ff5d5d', c2: '#6fe3a0' },
      quiz: [
        { q: 'What does a buffer contain?', o: ['A strong acid and a strong base', 'A weak acid and its conjugate base', 'Only water', 'Only salt'], a: 1, w: 'Both partners are needed: one to catch added H⁺, one to neutralise added OH⁻.' },
        { q: 'When is a buffer no longer effective?', o: ['When it gets warm', 'When one of its partners (acid or conjugate base) is used up', 'Never', 'After one drop of acid'], a: 1, w: 'This limit is the buffer capacity: once a partner is used up, pH changes rapidly.' }
      ],
      prompt: { p: 'Explain how the bicarbonate buffer protects your blood when acid is added.', m: 'Blood contains bicarbonate ions (HCO₃⁻) and carbonic acid (H₂CO₃). If extra H⁺ enters, bicarbonate grabs it: HCO₃⁻ + H⁺ → H₂CO₃. So the free H⁺ hardly increases and pH stays near 7.4. The carbonic acid breaks into CO₂ and water, and the lungs breathe out the extra CO₂, restoring the balance.' }
    },
    {
      short: 'The Souring Sea', kicker: 'Ocean acidification', titleHTML: 'The Souring <em>Sea</em>', item: 'The fading shells', ico: 'shell', teaser: 'Why are shells at risk?',
      clue: 'CO₂ dissolving in seawater forms carbonic acid, lowering pH and using up the carbonate ions that shell-building creatures need.',
      mystery: { q: 'Seawater is slightly basic (pH about 8.1). So why do scientists warn that rising CO₂ threatens the shells of sea creatures?', h: ['CO₂ makes the sea too warm for shells', 'Dissolved CO₂ forms carbonic acid, lowering pH and using up the carbonate ions needed to build shells', 'Plastic pollution dissolves shells'], a: 1, v: 'Since 1750 the ocean has absorbed about a quarter of our CO₂ emissions. CO₂ + H₂O makes <b>carbonic acid</b>, releasing H⁺. Surface pH has fallen from about 8.2 to 8.05, roughly <b>30% more H⁺</b>. Those extra protons react with carbonate (CO₃²⁻), turning it into bicarbonate, leaving less carbonate for corals, oysters and tiny snails to build their calcium carbonate shells.' },
      story: `<p>The ocean is the planet’s biggest buffer. It holds about fifty times more carbon than the atmosphere, mostly as bicarbonate and carbonate ions. Its slightly basic pH, around 8.1, has stayed remarkably steady for millions of years.</p>
        <p>But since the Industrial Revolution, humans have pumped hundreds of billions of tonnes of CO₂ into the air, and the sea has soaked up about a quarter of it. Each dissolved molecule makes carbonic acid: <strong>CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻</strong>. A drop of 0.1 pH units sounds tiny, but on a logarithmic scale it means about <strong>30% more hydrogen ions</strong>.</p>
        <p>The ocean’s buffer responds the way any buffer does: carbonate ions (CO₃²⁻) catch the extra protons. But those same carbonate ions are the building blocks of shells and coral skeletons (CaCO₃). As carbonate becomes scarcer, building a shell costs more energy, and in the coldest waters, unprotected shells can begin to dissolve.</p>`,
      lab: {
        label: 'Ocean chemistry simulator', title: 'Turn up the CO₂',
        body: `<div class="lab-grid"><div><div class="stage" style="height:320px"><canvas class="c" aria-label="Ocean surface absorbing CO2 and a sea snail shell dissolving"></canvas></div><div class="slider-row" style="margin-top:14px"><label>Atmospheric CO₂</label><input type="range" class="co" min="280" max="1000" value="420" style="--track:linear-gradient(90deg,#6fe3a0,#f4c35a,#ff5d5d)"><span class="readout"><b class="cv"></b></span></div><div class="pill-row yrs" style="margin-top:6px"></div></div>
          <div class="side-panel"><div class="kv"><div><small>Surface pH</small><b class="p"></b></div><div><small>Extra H⁺</small><b class="hp" style="color:var(--pink)"></b></div><div><small>Carbonate left</small><b class="cb" style="color:var(--green)"></b></div></div><div class="info-card"><p class="tx" style="margin:0;font-size:14.5px;color:var(--soft)"></p></div></div></div>`,
        init(root) {
          let ppm = 420, shown = 8.05; const c = $('.c', root);
          const pHf = p => 8.18 - .2 * Math.log2(p / 280), om = p => 3.5 * Math.pow(10, 1.6 * (pHf(p) - 8.18));
          const Y = [['1750', 280], ['Today', 420], ['2100 low', 550], ['2100 high', 900]];
          $('.yrs', root).innerHTML = Y.map(y => `<button class="btn small" data-v="${y[1]}">${y[0]}</button>`).join('');
          $('.yrs', root).addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $('.co', root).value = b.dataset.v; $('.co', root).dispatchEvent(new Event('input')); });
          slider($('.co', root), v => { ppm = v; const p = pHf(v), o = om(v); $('.cv', root).textContent = v + ' ppm'; $('.p', root).textContent = p.toFixed(2); $('.hp', root).textContent = '+' + Math.round((Math.pow(10, 8.18 - p) - 1) * 100) + '%'; $('.cb', root).textContent = Math.round(o / 3.5 * 100) + '%';
            $('.tx', root).innerHTML = v <= 300 ? 'Pre-industrial ocean: plenty of carbonate, shells form easily.' : o > 2 ? 'The pH has dropped and carbonate is scarcer. Shells can still form, but building them costs creatures more energy.' : o > 1 ? 'Carbonate is getting scarce. Corals and pteropods (sea butterflies) struggle; reefs grow more slowly than they erode.' : '<b style="color:var(--pink)">Corrosive water.</b> In cold polar seas, unprotected aragonite shells begin to dissolve.'; });
          const rnd = seeded(4); const ions = Array.from({ length: 40 }, () => ({ x: rnd(), y: .35 + rnd() * .6, vx: (rnd() - .5) * .05, vy: (rnd() - .5) * .05 })); const co2 = Array.from({ length: 30 }, () => ({ x: rnd(), y: rnd() * .3, v: .03 + rnd() * .05 }));
          animate(c, (dt, t) => { const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); shown += (pHf(ppm) - shown) * Math.min(1, dt * 2); const sea = h * .32;
            const g = ctx.createLinearGradient(0, sea, 0, h); g.addColorStop(0, rgba(mix('#2a7fd6', '#4a6a8a', (8.18 - shown) / .45), .8)); g.addColorStop(1, '#071a3a'); ctx.fillStyle = g; ctx.fillRect(0, sea, w, h - sea);
            ctx.strokeStyle = 'rgba(160,210,255,.6)'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x <= w; x += 6) ctx.lineTo(x, sea + Math.sin(x * .03 + t * 1.5) * 3); ctx.stroke();
            const nC = Math.round((ppm - 200) / 800 * co2.length); co2.slice(0, nC).forEach(m => { m.y += m.v * dt; if (m.y > .36) { m.y = 0; m.x = Math.random(); } const x = m.x * w, y = m.y * h; ball(ctx, '#ff5d5d', x - 6, y, 3); ball(ctx, '#9aa3b8', x, y, 3.5); ball(ctx, '#ff5d5d', x + 6, y, 3); });
            label(ctx, 'CO₂ in air: ' + ppm + ' ppm', 10, 18, { size: 11, color: '#c9c8dc' });
            const nCarb = Math.round(om(ppm) / 3.5 * ions.length), nH = Math.round((Math.pow(10, 8.18 - shown) - 1) * 12) + 2;
            ions.forEach((p, i) => { p.x += p.vx * dt; p.y += p.vy * dt; if (p.x < 0 || p.x > 1) p.vx *= -1; if (p.y < .36 || p.y > .98) p.vy *= -1; const x = p.x * w, y = p.y * h;
              if (i < nCarb) { ball(ctx, '#9aa3b8', x, y, 3.5); [0, 2.1, 4.2].forEach(a => ball(ctx, '#ff5d5d', x + Math.cos(a + t) * 6, y + Math.sin(a + t) * 6, 2.8)); } else if (i < nCarb + nH) { glow(ctx, x, y, 10, '#ff6b9a', .7); ball(ctx, '#ff6b9a', x, y, 3); } });
            const sx = w * .8, sy = h * .78, er = clamp((2.2 - om(ppm)) / 1.6, 0, 1), sc = 1 - er * .35;
            ctx.save(); ctx.translate(sx, sy); ctx.scale(sc, sc); ctx.globalAlpha = 1 - er * .6; ctx.strokeStyle = '#f5ead8'; ctx.fillStyle = 'rgba(245,234,216,.25)'; ctx.lineWidth = 3; ctx.beginPath(); for (let a = 0; a < TAU * 2.6; a += .1) { const r = 2 + a * 3; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r * .8); } ctx.stroke(); ctx.fill();
            if (er > .2) { ctx.setLineDash([2, 4]); ctx.strokeStyle = 'rgba(255,107,154,.8)'; ctx.beginPath(); ctx.arc(0, 0, 40, 0, TAU); ctx.stroke(); } ctx.restore();
            label(ctx, 'pteropod shell', sx, sy + 58, { align: 'center', size: 10, color: '#c9c8dc' }); label(ctx, 'grey+red trios: CO₃²⁻ · pink: H⁺', 10, h - 10, { size: 10, color: '#8f8eab' }); });
        }
      },
      lenses: ['Coral reefs bleaching and eroding; oyster farms struggling to raise young oysters in corrosive water.', 'Extra H⁺ from carbonic acid combines with carbonate ions, leaving fewer CO₃²⁻ for building calcium carbonate.', 'CO₂ + H₂O + CO₃²⁻ → 2 HCO₃⁻', 'Each dissolved CO₂ effectively removes one carbonate ion from the water.'],
      miracle: { ico: 'fish', title: 'Chalk cliffs are ancient shells', html: '<p>The White Cliffs of Dover are made almost entirely of the microscopic calcium carbonate plates of coccolithophores, tiny algae that lived in warm seas 70–100 million years ago. Each cubic centimetre of chalk holds millions of them.</p><p>Those algae locked CO₂ away as rock. It is a reminder that the ocean’s carbonate chemistry shapes not just today’s reefs, but the landscape itself, over millions of years.</p>', c1: '#e8ecf5', c2: '#5ca8ff' },
      quiz: [
        { q: 'Ocean pH falls from 8.2 to 8.1. Roughly how much has [H⁺] increased?', o: ['By 1%', 'By about 26%', 'By 10 times', 'Not at all'], a: 1, w: '10<sup>0.1</sup> ≈ 1.26, so about 26% more H⁺. On a log scale, small pH changes are big chemical changes.' },
        { q: 'Why does more dissolved CO₂ make it harder for creatures to build shells?', o: ['CO₂ is poisonous to them', 'The extra H⁺ converts carbonate ions into bicarbonate, leaving less carbonate for CaCO₃', 'CO₂ makes the water warmer', 'Shells are made of CO₂'], a: 1, w: 'Shells need carbonate. Extra protons use it up.' }
      ],
      prompt: { p: 'Explain ocean acidification to a friend in four sentences, starting from car exhaust.', m: 'Burning fuel releases CO₂, and about a quarter of it dissolves in the ocean. There, CO₂ reacts with water to make carbonic acid, which releases H⁺ and lowers the pH. The extra H⁺ grabs carbonate ions, turning them into bicarbonate. With less carbonate around, corals, shellfish and plankton struggle to build their calcium carbonate shells and skeletons.' }
    }
  ],
  extra: [
    { c: 1, q: 'In the Brønsted–Lowry definition, a base is…', o: ['a proton donor', 'a proton acceptor', 'an electron donor', 'any salt'], a: 1, w: 'Acids donate H⁺; bases accept H⁺.' },
    { c: 2, q: 'Which solution has the highest [H⁺]?', o: ['pH 1', 'pH 5', 'pH 7', 'pH 13'], a: 0, w: 'Lowest pH means most H⁺. pH 1 has 10,000 times more than pH 5.' },
    { c: 3, q: 'At the equivalence point of a strong acid / strong base titration, the pH is…', o: ['1', '7', '10', '14'], a: 1, w: 'Only water and a neutral salt (like NaCl) remain.' },
    { c: 4, q: 'A buffer has [A⁻] = [HA]. Its pH equals…', o: ['7', 'pKa', '14', '0'], a: 1, w: 'log(1) = 0, so pH = pKa.' },
    { c: 5, q: 'What fraction of human CO₂ emissions has the ocean absorbed?', o: ['None', 'About a quarter', 'All of it', 'About 1%'], a: 1, w: 'Roughly 25–30%, which slows climate change but acidifies the sea.' }
  ],
  cards: [
    [1, 'Brønsted–Lowry acid and base?', 'Acid: proton (H⁺) donor. Base: proton acceptor.'],
    [1, 'Strong vs weak acid?', 'Strong: dissociates completely. Weak: dissociates only partially, in equilibrium.'],
    [1, 'What does Ka tell you?', 'The acid dissociation constant: larger Ka means a stronger acid.'],
    [1, 'Strong vs concentrated?', 'Strength: fraction dissociated. Concentration: amount per litre.'],
    [2, 'Definition of pH?', 'pH = −log₁₀[H⁺].'],
    [2, 'Ionic product of water?', 'Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25 °C.'],
    [2, 'pH + pOH = ?', '14 (at 25 °C).'],
    [2, 'What happens to pH when an acid is diluted 10×?', 'It rises by about 1, but never past 7.'],
    [3, 'What is a titration?', 'Adding a solution of known concentration until a reaction is exactly complete, to find an unknown amount.'],
    [3, 'Equivalence point?', 'The point where moles of added base equal moles of acid.'],
    [3, 'What is an indicator?', 'A dye that changes colour over a particular pH range.'],
    [3, 'pH at equivalence for weak acid + strong base?', 'Above 7, because the conjugate base is slightly basic.'],
    [4, 'What is a buffer?', 'A solution of a weak acid and its conjugate base that resists changes in pH.'],
    [4, 'Henderson–Hasselbalch equation?', 'pH = pKa + log([A⁻]/[HA]).'],
    [4, 'Main blood buffer?', 'Carbonic acid / bicarbonate (H₂CO₃ / HCO₃⁻).'],
    [5, 'Ocean acidification chemistry?', 'CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻; extra H⁺ converts CO₃²⁻ to HCO₃⁻.'],
    [5, 'Change in ocean surface pH since 1750?', 'About 8.2 → 8.05, roughly 30% more H⁺.']
  ]
};
