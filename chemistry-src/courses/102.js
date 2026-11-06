const COURSE = {
  id: '102', title: 'The Counting Problem', brand: 'The <i>Counting</i> Problem',
  eyebrow: 'Chemistry 102 · The mole & chemical quantities', titleHTML: 'The <em>Counting</em> Problem',
  lede: 'Atoms are too small to see and too many to count. So how does a chemist follow a recipe? A mystery about weighing, counting and the biggest number in your kitchen.',
  accent: ['#6fe3a0', '#f4c35a'],
  cast: {
    mol: { name: 'Mo', full: 'The Mole', color: '#c49a6c', title: 'Chemistry\'s dozen: 6.022 × 10²³', sym: 'mol' },
    Av: { name: 'Amedeo', full: 'Avogadro', color: '#a78bfa', title: 'The count who counted the uncountable', sym: 'Av' }
  },
  prologue: {
    short: 'The Baker\'s Ledger', kicker: 'The case begins', titleHTML: 'The Baker\'s <em>Ledger</em>',
    story: `<p>A baker can count eggs. A pharmacist can count pills. But a chemist’s recipe reads <strong>2 H₂ + O₂ → 2 H₂O</strong>: two molecules of hydrogen for every one of oxygen. Nobody has ever picked up a single molecule. A drop of water holds more of them than there are stars in our galaxy, multiplied by ten billion.</p>
      <p>And yet chemists do follow recipes, to the milligram. Medicines are dosed exactly. Factories turn out millions of tonnes of fertiliser without wasting a gram. Airbags inflate to exactly the right size in thirty thousandths of a second.</p>
      <p>Somewhere there must be a trick: a way to <strong>count by weighing</strong>. Five case files, five clues. Find the trick, and you’ll have found the bridge between the invisible world of atoms and the kitchen scales on your counter.</p>`,
    cast: [['H', 'happy'], ['O', 'sly'], ['C', 'happy'], ['mol', 'happy'], ['Av', 'sly']]
  },
  finale: {
    q: 'How do you count the uncountable?', lead: 'Five clues. One idea runs through all of them: every one is a way of turning grams you can weigh into particles you cannot see.',
    avatar: 'mol', nameHTML: 'The <em>mole</em>',
    html: `<p>Chemistry’s dozen: <strong>6.022 × 10²³ particles</strong>, chosen so that a mole of any substance weighs its formula mass in grams.</p>
      <p>The mole is how you count by weighing: 18 g of water is one mole of molecules. Add up the atoms in a formula and you have its molar mass. Equations become recipes counted in moles, and the scarcest ingredient decides how much you make. Concentration is just moles per litre. And a mole of <em>any</em> gas fills the same 24 litres, as Avogadro guessed in 1811.</p>
      <p>The mole is the bridge between the micro and the macro. Every time a nurse measures a dose, a brewer adds yeast, or a factory makes fertiliser, someone is counting particles in moles. Case closed.</p>`
  },
  cases: [
    {
      short: 'Counting by Weighing', kicker: 'Avogadro\'s number', titleHTML: 'Counting by <em>Weighing</em>', item: 'The sip and the sugar bag', ico: 'scale', teaser: 'Same number of molecules?',
      clue: 'A mole is 6.022 × 10²³ particles. Weighing a sample tells you how many moles, and so how many particles, it contains.',
      mystery: { q: 'A sip of water (18 g) and a big bag of sugar (342 g) contain exactly the same number of molecules. How can that be?', h: ['Sugar molecules are full of air', 'Each sugar molecule is 19 times heavier than a water molecule', 'It\'s a trick: they don\'t'], a: 1, v: 'Both are exactly <b>one mole</b>: 6.022 × 10²³ molecules. A sugar molecule (C₁₂H₂₂O₁₁) has 45 atoms and weighs 342 units; a water molecule weighs 18. Since each sugar molecule is 19 times heavier, the same number of them weighs 19 times as much.' },
      story: `<p>Banks don’t count coins one by one. They <strong>weigh</strong> them. If one coin weighs 7.5 g, then 7.5 kg of identical coins must be exactly 1,000 coins. Counting by weighing works for anything, as long as you know what one item weighs.</p>
        <p>Atoms are the ultimate tiny coins. Chemists needed a "dozen" big enough to be weighed on a kitchen scale. They chose a number so that one dozen-of-atoms weighs, in grams, the same as one atom weighs in atomic units. That number is <strong>6.022 × 10²³</strong>, and the dozen is called a <strong>mole</strong>.</p>
        <p>The idea goes back to an Italian count, <strong>Amedeo Avogadro</strong>, who in 1811 suggested that equal volumes of gases hold equal numbers of particles. Almost nobody listened for fifty years, until his student-of-a-student Stanislao Cannizzaro handed out pamphlets at a congress in Karlsruhe in 1860 and changed chemistry overnight. In 1909, the French physicist <strong>Jean Perrin</strong> measured the number by watching pollen jiggle, named it after Avogadro, and later won a Nobel Prize. Since 2019 it has been fixed exactly: <strong>6.02214076 × 10²³</strong>.</p>`,
      lab: {
        label: 'The Mole-o-meter', title: 'Weigh it, count it',
        body: `<div class="lab-grid"><div><div class="stage" style="height:340px"><canvas class="c" aria-label="A heap of the chosen substance and a logarithmic counting ruler"></canvas></div>
          <div class="slider-row" style="margin-top:14px"><label>Mass</label><input type="range" class="m" min="0" max="1000" value="575" aria-label="Mass in grams" style="--track:linear-gradient(90deg,#3a3f66,var(--green))"><span class="readout"><b class="mo"></b></span></div></div>
          <div class="side-panel"><div class="grid-btns subs"></div><div class="kv"><div><small>Moles</small><b class="n"></b></div><div><small>Particles</small><b class="N"></b></div></div><div class="info-card"><p class="cmp" style="margin:0;font-size:14.5px;color:var(--soft)"></p></div></div></div>`,
        init(root) {
          const S = [['Water', 'H2O', 18.02, '#5ca8ff', 'molecules'], ['Table salt', 'NaCl', 58.44, '#e8ecf5', 'formula units'], ['Sugar', 'C12H22O11', 342.3, '#ffd9a8', 'molecules'], ['Gold', 'Au', 196.97, '#f4c35a', 'atoms'], ['Iron', 'Fe', 55.85, '#c98a5e', 'atoms'], ['Helium', 'He', 4.003, '#ffd36e', 'atoms']];
          let cur = 0, mass = 18;
          const subs = $('.subs', root); subs.innerHTML = S.map((s, i) => `<button data-i="${i}" class="${i ? '' : 'on'}"><b>${sub(s[1])}</b>${s[0]} · ${s[2]} g/mol</button>`).join('');
          subs.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; cur = +b.dataset.i; $$('button', subs).forEach(x => x.classList.toggle('on', x === b)); upd(); });
          const LM = [[8e9, 'people on Earth'], [1e11, 'stars in the Milky Way'], [3e13, 'cells in your body'], [7.5e18, 'sand grains on all beaches'], [1e22, 'stars in the observable universe']];
          let N = 0;
          function upd() { const s = S[cur], n = mass / s[2]; N = n * 6.02214076e23; $('.mo', root).textContent = mass < 1 ? mass.toFixed(2) + ' g' : mass < 100 ? mass.toFixed(1) + ' g' : Math.round(mass) + ' g'; $('.n', root).innerHTML = fmt(n, 3) + ' mol'; $('.N', root).innerHTML = fmt(N, 2);
            const yrs = N / 3.15e7; const near = LM.reduce((a, b) => Math.abs(Math.log10(b[0] / N)) < Math.abs(Math.log10(a[0] / N)) ? b : a); const r = N / near[0];
            $('.cmp', root).innerHTML = `That’s ${fmt(N, 2)} ${s[4]}, about <b>${r >= 1 ? fmt(r, 0) + '×' : '1/' + fmt(1 / r, 0) + ' of'}</b> the number of ${near[1]}. Counting one per second, non-stop, would take <b>${fmt(yrs, 1)} years</b>; the universe is only 1.38 × 10<sup>10</sup> years old.`; }
          slider($('.m', root), v => { mass = Math.pow(10, -1 + v / 1000 * 4); upd(); });
          const c = $('.c', root);
          animate(c, (dt, t) => {
            const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); const s = S[cur];
            const k = clamp(Math.round(6 * Math.cbrt(mass)), 3, 140), br = Math.max(5, 15 - Math.log10(k) * 3), cx = w / 2, base = h * .56; let i = 0;
            glow(ctx, cx, base - 40, 150, s[3], .35);
            ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.beginPath(); ctx.ellipse(cx, base + 8, 150, 16, 0, 0, TAU); ctx.fill();
            for (let row = 0; i < k; row++) { const per = Math.max(1, Math.min(12, Math.ceil(Math.sqrt(k * 2))) - row); for (let j = 0; j < per && i < k; j++, i++) ball(ctx, s[3], cx + (j - (per - 1) / 2) * br * 1.9 + Math.sin(i * 7) * 1.5, base - row * br * 1.65, br); }
            const L = 30, R = w - 30, y = h - 46, X = e => L + (e / 26) * (R - L);
            ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.moveTo(L, y); ctx.lineTo(R, y); ctx.stroke();
            for (let e = 0; e <= 26; e += 2) { ctx.beginPath(); ctx.moveTo(X(e), y - 4); ctx.lineTo(X(e), y + 4); ctx.stroke(); label(ctx, '10' + (e < 10 ? '' : '') + e, X(e), y + 18, { align: 'center', size: 9, color: '#8f8eab' }); }
            LM.forEach(([v, n], j) => { const x = X(Math.log10(v)); ctx.fillStyle = '#a78bfa'; ctx.beginPath(); ctx.arc(x, y, 3, 0, TAU); ctx.fill(); label(ctx, n, x, y - 12 - (j % 3) * 12, { align: 'center', size: 9.5, color: '#c9c8dc' }); });
            const xm = X(clamp(Math.log10(N), 0, 26)); glow(ctx, xm, y, 24, '#6fe3a0', 1); ball(ctx, '#6fe3a0', xm, y, 6); label(ctx, 'your sample', xm, y - 40, { align: 'center', size: 11, color: '#6fe3a0' });
            label(ctx, 'COUNT (powers of ten)', L, 18, { size: 10, color: '#8f8eab' });
          });
        }
      },
      dialogue: [['Av', 'sly', 'AMEDEO · Avogadro', '“They laughed at me for fifty years. Equal volumes, equal numbers, I said. Now my name is on the most important number in chemistry.”'], ['mol', 'happy', 'MO · the mole', '“I’m just a dozen with ambition. Twelve eggs, six hundred thousand billion billion atoms; it’s the same idea.”']],
      lenses: ['A tablespoon of water: 18 grams. You can see it, pour it and weigh it.', 'Inside: 6.022 × 10²³ H₂O molecules, about a hundred thousand times more than there are stars in our galaxy... times ten billion.', '1 mol = 6.022 × 10²³', 'Avogadro\'s constant, N<sub>A</sub>. A mole of anything is that many of it.'],
      miracle: { ico: 'bread', title: 'A mole of rice would drown the continents', html: '<p>Each grain of rice is about 25 cubic millimetres. A mole of rice grains would cover all of Earth\'s land about <strong>100 metres deep</strong>.</p><p>Yet a mole of water molecules fits in a tablespoon. That is how small molecules are, and why counting them one by one was never an option.</p>', c1: '#ffd9a8', c2: '#f4c35a' },
      quiz: [
        { q: 'How many atoms are there in 1 mole of iron?', o: ['55.85', '6.022 × 10²³', '1', 'It depends on the temperature'], a: 1, w: 'One mole of anything (atoms, molecules, eggs) is 6.022 × 10²³ of them. 55.85 g is the <i>mass</i> of a mole of iron.' },
        { q: 'Why do chemists count particles by weighing them?', o: ['Scales are cheaper than microscopes', 'Particles are far too small and numerous to count, but each type has a fixed mass', 'Weighing changes the number of particles', 'Only gases can be counted'], a: 1, w: 'If you know what one particle weighs, the mass of a sample tells you how many there are, just like weighing coins.' }
      ],
      prompt: { p: 'Explain why a mole of gold weighs much more than a mole of helium, yet contains the same number of atoms.', m: 'A mole is a fixed number: 6.022 × 10²³ atoms, whatever the element. But each gold atom weighs about 49 times more than a helium atom (197 vs 4 units). So a mole of gold weighs 197 g and a mole of helium only 4 g. Same count, different mass per item.' }
    },
    {
      short: 'The Weight of a Name', kicker: 'Molar mass & formulas', titleHTML: 'The Weight of a <em>Name</em>', item: 'The tonne of iron ore', ico: 'gem', teaser: 'Why so little iron?',
      clue: 'A formula tells you which atoms are in a substance. Add up their masses and you get the molar mass, the grams per mole.',
      mystery: { q: 'A steelworks smelts one tonne of pure iron ore (Fe₂O₃) and gets only 700 kg of iron. Where did the other 300 kg go?', h: ['The ore was wet', 'That mass was oxygen atoms bonded to the iron', 'Some iron evaporated in the furnace'], a: 1, v: 'Rust-coloured ore is iron(III) oxide, <b>Fe₂O₃</b>. Its molar mass is 2 × 55.85 + 3 × 16.00 = 159.7 g/mol, of which 111.7 g is iron: <b>70%</b>. The other 30% is oxygen, which leaves the furnace as carbon dioxide when coke (carbon) pulls it away.' },
      story: `<p>In 1808 the English schoolteacher <strong>John Dalton</strong> published the first table of atomic weights. Many were wrong: he assumed water was HO, so oxygen came out weighing 7 instead of 16. It took half a century of detective work to fix it, and Avogadro’s forgotten idea was the key.</p>
        <p>Today every element has a <strong>relative atomic mass</strong>, printed on the periodic table: hydrogen 1.008, carbon 12.011, oxygen 15.999. These numbers do double duty. One atom of carbon weighs 12.011 atomic mass units, and one <strong>mole</strong> of carbon weighs 12.011 <strong>grams</strong>. That’s the whole point of choosing Avogadro’s number.</p>
        <p>A chemical formula is a parts list. Water, H₂O, is two hydrogens and one oxygen, so its <strong>molar mass</strong> is 2 × 1.008 + 16.00 = 18.02 g/mol. Glucose, C₆H₁₂O₆, weighs 180 g/mol. Read the formula, add the parts, and you know how many grams make a mole.</p>`,
      lab: {
        label: 'Formula workbench', title: 'Build a molecule, weigh a mole',
        head: '<span class="chip pre-chip">Water</span>',
        body: `<div class="lab-grid"><div><div class="stage" style="height:300px"><canvas class="c" aria-label="Atoms in the formula you built"></canvas></div><div style="margin-top:14px"><div class="meta">MASS SHARE BY ELEMENT</div><div class="bar" style="display:flex;height:22px;border-radius:8px;overflow:hidden;margin-top:8px;border:1px solid var(--line)"></div><div class="legend lg"></div></div></div>
          <div class="side-panel"><div class="info-card" style="text-align:center"><div class="big-read f"></div><div class="meta" style="margin-top:6px">MOLAR MASS</div><div class="big-read mm" style="color:var(--green)"></div><p class="hint calc" style="margin:6px 0 0;font-size:12.5px"></p></div>
          <div class="grid-btns els" style="grid-template-columns:repeat(3,1fr)"></div><div class="meta">PRESETS</div><div class="pill-row pres"></div></div></div>`,
        init(root) {
          const E = { Ca: [40.078, '#e8ecf5'], Fe: [55.845, '#e8925a'], Na: [22.99, '#b38cff'], C: [12.011, '#8d95ab'], H: [1.008, '#eef3ff'], N: [14.007, '#6b8cff'], O: [15.999, '#ff5d5d'], S: [32.06, '#f4d35a'], Cl: [35.45, '#6fe3a0'] };
          const ORD = Object.keys(E);
          const PRE = [['Water', { H: 2, O: 1 }], ['Carbon dioxide', { C: 1, O: 2 }], ['Table salt', { Na: 1, Cl: 1 }], ['Glucose', { C: 6, H: 12, O: 6 }], ['Caffeine', { C: 8, H: 10, N: 4, O: 2 }], ['Chalk', { Ca: 1, C: 1, O: 3 }], ['Rust (iron ore)', { Fe: 2, O: 3 }], ['Aspirin', { C: 9, H: 8, O: 4 }]];
          let f = { H: 2, O: 1 }, pos = [];
          $('.els', root).innerHTML = ORD.map(e => `<div class="stepper" style="padding:6px"><div class="nm"><i style="background:${E[e][1]}"></i>${e}</div><div class="bt" style="margin-top:4px"><button data-e="${e}" data-d="-1" aria-label="remove ${e}">−</button><button data-e="${e}" data-d="1" aria-label="add ${e}">+</button></div></div>`).join('');
          $('.pres', root).innerHTML = PRE.map((p, i) => `<button class="btn small" data-i="${i}">${p[0]}</button>`).join('');
          $('.els', root).addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const k = b.dataset.e; f[k] = clamp((f[k] || 0) + +b.dataset.d, 0, 24); if (!f[k]) delete f[k]; $('.pre-chip', root).textContent = 'Custom'; upd(); });
          $('.pres', root).addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; f = { ...PRE[+b.dataset.i][1] }; $('.pre-chip', root).textContent = PRE[+b.dataset.i][0]; upd(); });
          function upd() {
            const ks = ORD.filter(k => f[k]); const M = ks.reduce((s, k) => s + E[k][0] * f[k], 0);
            $('.f', root).innerHTML = ks.length ? ks.map(k => k + (f[k] > 1 ? `<sub>${f[k]}</sub>` : '')).join('') : '—';
            $('.mm', root).textContent = M ? M.toFixed(2) + ' g/mol' : '0';
            $('.calc', root).innerHTML = ks.map(k => `${f[k]} × ${E[k][0]}`).join(' + ');
            $('.bar', root).innerHTML = ks.map(k => `<span title="${k}" style="width:${E[k][0] * f[k] / M * 100}%;background:${E[k][1]}"></span>`).join('');
            $('.lg', root).innerHTML = ks.map(k => `<span><i style="background:${E[k][1]}"></i>${k} ${(E[k][0] * f[k] / M * 100).toFixed(1)}%</span>`).join('');
            pos = []; const rnd = seeded(ks.length * 7 + M); ks.forEach(k => { for (let i = 0; i < f[k]; i++) pos.push({ k, x: (rnd() - .5) * 60, y: (rnd() - .5) * 60, r: 7 + Math.cbrt(E[k][0]) * 3.2 }); });
            for (let it = 0; it < 120; it++) { for (const p of pos) { p.x *= .97; p.y *= .97; } for (let i = 0; i < pos.length; i++) for (let j = i + 1; j < pos.length; j++) { const a = pos[i], b = pos[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || .1, m = a.r + b.r - 2; if (d < m) { const s = (m - d) / 2 / d; a.x -= dx * s; a.y -= dy * s; b.x += dx * s; b.y += dy * s; } } }
          }
          upd();
          const c = $('.c', root);
          animate(c, (dt, t) => { const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); glow(ctx, w / 2, h / 2, Math.min(w, h) * .45, '#6fe3a0', .2);
            const ext = Math.max(60, ...pos.map(p => Math.max(Math.abs(p.x), Math.abs(p.y)) + p.r)), s = Math.min(1.6, Math.min(w, h) * .44 / ext);
            pos.slice().sort((a, b) => a.y - b.y).forEach((p, i) => { const x = w / 2 + p.x * s + Math.sin(t * 2 + i) * 1.2, y = h / 2 + p.y * s; ball(ctx, E[p.k][1], x, y, p.r * s); label(ctx, p.k, x, y + 4, { align: 'center', color: '#141625', font: `700 ${Math.max(8, p.r * s * .8)}px Inter,sans-serif` }); }); });
        }
      },
      lenses: ['180 grams of glucose: about a cup of fine white powder.', 'One mole of glucose molecules, each built from 6 carbons, 12 hydrogens and 6 oxygens.', 'C₆H₁₂O₆ = 6(12.01) + 12(1.008) + 6(16.00) = 180.2 g/mol', 'Subscripts count atoms in one molecule. The molar mass is their sum in grams.'],
      miracle: { ico: 'drop', title: 'You are two-thirds oxygen', html: '<p>About 65% of your body mass is <strong>oxygen</strong>. That isn\'t gas, but oxygen atoms locked inside water and other molecules. A water molecule is 89% oxygen by mass, because one oxygen atom outweighs both hydrogens eight times over.</p><p>By number of atoms, though, you are mostly hydrogen: about 62% of your atoms. The formula tells the count; molar mass tells the weight.</p>', c1: '#ff5d5d', c2: '#5ca8ff' },
      quiz: [
        { q: 'What is the molar mass of carbon dioxide, CO₂? (C = 12, O = 16)', o: ['28 g/mol', '44 g/mol', '32 g/mol', '12 g/mol'], a: 1, w: '12 + 2 × 16 = 44 g/mol.' },
        { q: 'Roughly what percentage of a water molecule\'s mass is oxygen? (H = 1, O = 16)', o: ['33%', '50%', '89%', '67%'], a: 2, w: '16 out of 18 is about 89%. Oxygen is one of three atoms, but most of the weight.' }
      ],
      prompt: { p: 'Explain how to find the mass of 2 moles of glucose, starting from its formula C₆H₁₂O₆.', m: 'Add up the atomic masses in the formula: 6 carbons (6 × 12) + 12 hydrogens (12 × 1) + 6 oxygens (6 × 16) = 180 g per mole. Two moles is twice that: 360 g.' }
    },
    {
      short: 'The Recipe', kicker: 'Stoichiometry & limiting reagents', titleHTML: 'The <em>Recipe</em>', item: 'The airbag', ico: 'car', teaser: 'How much powder?',
      clue: 'A balanced equation is a recipe in moles. Whichever ingredient runs out first, the limiting reagent, decides how much product you get.',
      mystery: { q: 'A car airbag inflates in 30 milliseconds from a few spoonfuls of powder. How do engineers know exactly how much powder to pack?', h: ['Trial-and-error crash tests', 'They calculate it from the balanced equation, mole by mole', 'They fill it until it looks right'], a: 1, v: 'Classic airbags used sodium azide: <b>2 NaN₃ → 2 Na + 3 N₂</b>. Every 2 moles of powder (130 g) make 3 moles of nitrogen gas, about <b>72 litres</b>. Engineers work backwards from the bag\'s volume to the grams of powder. It is pure stoichiometry, with lives depending on the arithmetic.' },
      story: `<p>A sandwich recipe says: <strong>2 slices of bread + 1 slice of cheese → 1 sandwich</strong>. With 10 slices of bread and 3 slices of cheese, you make 3 sandwiches, and 4 slices of bread are left over. The cheese ran out first. It was the <strong>limiting ingredient</strong>.</p>
        <p>A balanced chemical equation is exactly this kind of recipe, but counted in moles. <strong>2 H₂ + O₂ → 2 H₂O</strong> means: two moles of hydrogen react with one mole of oxygen to give two moles of water. Since moles convert to grams, chemists can predict exactly how many grams of product they’ll get. This is called <strong>stoichiometry</strong>, from the Greek for "measuring elements".</p>
        <p>Real reactions rarely have perfect amounts. One reactant runs out first, the <strong>limiting reagent</strong>, and the others are left <em>in excess</em>. Rocket engineers, bakers and your own lungs all live by this rule.</p>`,
      lab: {
        label: 'Reaction chamber', title: 'Hydrogen + oxygen: who runs out first?',
        head: '<button class="btn primary small go">Run reaction</button>',
        body: `<div class="stage" style="height:330px"><canvas class="c" aria-label="Hydrogen and oxygen molecules reacting to form water"></canvas></div>
          <div class="lab-grid" style="margin-top:14px;grid-template-columns:1fr 1fr"><div><div class="slider-row"><label>H₂</label><input type="range" class="h" min="1" max="16" value="10" style="--track:linear-gradient(90deg,#3a3f66,#eef3ff)"><span class="readout"><b class="ho"></b></span></div>
          <div class="slider-row"><label>O₂</label><input type="range" class="o" min="1" max="10" value="3" style="--track:linear-gradient(90deg,#3a3f66,#ff5d5d)"><span class="readout"><b class="oo"></b></span></div></div>
          <div class="info-card"><p class="msg" style="margin:0;font-size:14.5px;color:var(--soft)">Set the amounts, then run the reaction. Recipe: <b>2 H₂ + O₂ → 2 H₂O</b>.</p></div></div>`,
        init(root) {
          const c = $('.c', root); let h = 10, o = 3, atoms = [], k = 0, ran = false;
          function layout() {
            const { w, hh } = { w: c.clientWidth || 600, hh: c.clientHeight || 330 }; atoms = []; ran = false; k = 0;
            const ext = Math.min(Math.floor(h / 2), o), wat = 2 * ext;
            const cols = 4, gx = (w * .42) / cols, gy = 46;
            const slot = (i, x0) => [x0 + 30 + (i % cols) * gx, 40 + Math.floor(i / cols) * gy];
            const wslot = i => [w * .58 + 30 + (i % 4) * (w * .38 / 4), 40 + Math.floor(i / 4) * gy * 1.1];
            for (let i = 0; i < h; i++) { const [x, y] = slot(i, 0); const used = i < wat; [-7, 7].forEach(d => { const a = { e: 'H', x0: x + d, y0: y, used }; if (used) { const [tx, ty] = wslot(i); a.x1 = tx + d * 1.6; a.y1 = ty + 9; } atoms.push(a); }); }
            for (let j = 0; j < o; j++) { const [x, y] = slot(j + h, 0); const used = j < ext; [-8, 8].forEach((d, q) => { const a = { e: 'O', x0: x + d, y0: y, used }; if (used) { const [tx, ty] = wslot(2 * j + q); a.x1 = tx; a.y1 = ty; } atoms.push(a); }); }
            $('.ho', root).textContent = h + ' molecules'; $('.oo', root).textContent = o + ' molecules';
            $('.msg', root).innerHTML = 'Recipe: <b>2 H₂ + O₂ → 2 H₂O</b>. Predict which will run out, then press <b>Run reaction</b>.';
          }
          function result() { const ext = Math.min(Math.floor(h / 2), o), lh = h - 2 * ext, lo = o - ext; $('.msg', root).innerHTML = `Made <b style="color:var(--cyan)">${2 * ext} H₂O</b>. ${lh && lo ? `Left over: ${lh} H₂ and ${lo} O₂.` : lh ? `<b style="color:var(--pink)">Oxygen was limiting</b>: ${lh} H₂ left in excess.` : lo ? `<b style="color:var(--pink)">Hydrogen was limiting</b>: ${lo} O₂ left in excess.` : '<b style="color:var(--green)">Perfect ratio!</b> Nothing left over.'} Count the atoms: every one that went in came out.`; }
          slider($('.h', root), v => { h = v; layout(); }); slider($('.o', root), v => { o = v; layout(); });
          $('.go', root).addEventListener('click', () => { if (ran) layout(); ran = true; tween(reduceMotion ? 10 : 1800, q => { k = ease(q); }, result); });
          animate(c, (dt, t) => { const { ctx, w, h: H } = fit(c); ctx.clearRect(0, 0, w, H);
            ctx.fillStyle = 'rgba(255,255,255,.03)'; ctx.fillRect(w * .56, 10, w * .42, H - 20); label(ctx, 'REACTANTS', 14, H - 12, { size: 10, color: '#8f8eab' }); label(ctx, 'PRODUCTS', w * .58, H - 12, { size: 10, color: '#8f8eab' }); label(ctx, '→', w * .5, H / 2, { size: 26, color: '#8f8eab', align: 'center', font: '26px Fraunces,serif' });
            for (const a of atoms) { const x = a.used ? lerp(a.x0, a.x1, k) : a.x0, y = a.used ? lerp(a.y0, a.y1, k) + Math.sin(k * Math.PI) * -30 : a.y0 + Math.sin(t * 2 + a.x0) * 1.5;
              if (!a.used && ran && k > .99) { ctx.strokeStyle = 'rgba(255,107,154,.8)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, a.e === 'O' ? 12 : 9, 0, TAU); ctx.stroke(); }
              ball(ctx, a.e === 'O' ? '#ff5d5d' : '#eef3ff', x, y, a.e === 'O' ? 9 : 6.5); } });
          new ResizeObserver(() => layout()).observe(c);
        }
      },
      lenses: ['4 g of hydrogen burns with 32 g of oxygen to make 36 g of water, with a bang.', 'Two H₂ molecules meet one O₂ molecule; their atoms swap partners to become two H₂O molecules.', '2 H₂ + O₂ → 2 H₂O &nbsp;(2 : 1 : 2)', 'The coefficients give the mole ratio, which is the recipe.'],
      miracle: { ico: 'heart', title: 'Your lungs follow a recipe', html: '<p>Every glucose molecule your cells burn needs exactly <strong>six</strong> oxygen molecules: C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O. When you sprint, oxygen becomes the limiting reagent, which is why you gasp for air.</p><p>When oxygen can\'t keep up, muscles switch to a backup reaction that makes lactate, part of the "burn" you feel in a hard workout.</p>', c1: '#ff6b9a', c2: '#ff5d5d' },
      quiz: [
        { q: 'A sandwich needs 2 slices of bread + 1 slice of cheese. You have 10 bread and 3 cheese. What limits you?', o: ['Bread: 5 sandwiches', 'Cheese: 3 sandwiches', 'Neither: 10 sandwiches', 'Bread: 3 sandwiches'], a: 1, w: 'Cheese runs out after 3 sandwiches (using 6 bread). 4 bread are left in excess. Cheese is the limiting reagent.' },
        { q: 'Using 2 H₂ + O₂ → 2 H₂O, how many moles of water form from 4 moles of H₂ with plenty of O₂?', o: ['2 mol', '4 mol', '8 mol', '1 mol'], a: 1, w: 'H₂ and H₂O are in a 2 : 2 (= 1 : 1) ratio, so 4 mol H₂ gives 4 mol H₂O.' }
      ],
      prompt: { p: 'What is a limiting reagent? Explain using a cooking example and a chemistry example.', m: 'It is the ingredient that runs out first and so decides how much product you can make. If a cake needs 2 eggs per cake and you have 6 eggs but flour for only 2 cakes, flour is limiting. In 2 H₂ + O₂ → 2 H₂O, if you have 10 H₂ but only 3 O₂, oxygen runs out after making 6 water molecules, and 4 H₂ are left over.' }
    },
    {
      short: 'Crowded Waters', kicker: 'Concentration & dilution', titleHTML: 'Crowded <em>Waters</em>', item: 'The espresso and the mug', ico: 'cup', teaser: 'Sweeter in the small cup?',
      clue: 'Concentration is how crowded the particles are: moles per litre. Adding water spreads the same particles out (c₁V₁ = c₂V₂).',
      mystery: { q: 'Why does one spoon of sugar taste much sweeter in an espresso than in a big mug of coffee?', h: ['Espresso is hotter', 'The same sugar molecules are crowded into less water', 'Espresso beans contain extra sugar'], a: 1, v: 'Your tongue senses <b>concentration</b>: how many sugar molecules hit your taste receptors per sip. One spoon in 30 mL of espresso is about ten times more concentrated than the same spoon in 300 mL. Same number of molecules, much more crowded.' },
      story: `<p>Knowing <em>how much</em> of something you have isn’t always enough. A teaspoon of salt is harmless in a pan of soup and deadly in a glass of water you drink all at once. What matters is <strong>how crowded</strong> the particles are.</p>
        <p>Chemists measure crowding as <strong>concentration</strong>: moles of solute per litre of solution, written mol/L or "M" (molar). One mole of sugar dissolved to make one litre of solution is 1 M. Squeeze the same sugar into half a litre and it’s 2 M.</p>
        <p>To <strong>dilute</strong> a solution, you add water. The number of moles doesn’t change, so the concentration falls in proportion: <strong>c₁V₁ = c₂V₂</strong>. Doubling the volume halves the concentration. This one equation runs every hospital pharmacy, every bar, and every orange-squash bottle in the world.</p>`,
      lab: {
        label: 'Concentration tank', title: 'Crowd the molecules',
        head: '<button class="btn small dil">Dilute ×2</button>',
        body: `<div class="lab-grid"><div><div class="stage" style="height:320px"><canvas class="c" aria-label="Sugar molecules in a tank of adjustable volume"></canvas></div>
          <div class="slider-row" style="margin-top:14px"><label>Sugar</label><input type="range" class="s" min="2" max="60" value="20" style="--track:linear-gradient(90deg,#3a3f66,#ffb3c6)"><span class="readout"><b class="so"></b></span></div>
          <div class="slider-row"><label>Volume</label><input type="range" class="v" min="20" max="100" value="100" style="--track:linear-gradient(90deg,#3a3f66,#5ca8ff)"><span class="readout"><b class="vo"></b></span></div></div>
          <div class="side-panel"><div class="kv"><div><small>Moles</small><b class="n"></b></div><div><small>Concentration</small><b class="cc" style="color:var(--pink)"></b></div></div><div class="info-card"><p class="t" style="margin:0;font-size:14.5px;color:var(--soft)"></p></div><p class="hint" style="font-size:12.5px">Each dot stands for 0.01 mol of sugar. The full tank holds 1 litre.</p></div></div>`,
        init(root) {
          let n = 20, V = 1;
          const box = ParticleBox($('.c', root), { species: { s: { color: '#ffb3c6', r: 6, m: 1 } }, counts: { s: 20 }, speed: 45, collide: true,
            bg: (ctx, w, h, api) => { const conc = n * .01 / V; ctx.fillStyle = `rgba(92,168,255,${.08 + Math.min(.35, conc * .4)})`; ctx.fillRect(0, 0, w * api.S.wall, h); } });
          function upd() { const conc = n * .01 / V; $('.so', root).textContent = n; $('.vo', root).textContent = (V * 1000).toFixed(0) + ' mL'; $('.n', root).textContent = (n * .01).toFixed(2) + ' mol'; $('.cc', root).textContent = conc.toFixed(2) + ' M';
            $('.t', root).innerHTML = `c = n / V = ${(n * .01).toFixed(2)} mol ÷ ${V.toFixed(2)} L = <b>${conc.toFixed(2)} mol/L</b>. ${conc < .3 ? 'Barely sweet.' : conc < .7 ? 'Pleasantly sweet, like a soft drink (about 0.3–0.4 M).' : conc < 1.2 ? 'Very sweet.' : 'Syrupy! Crowded molecules everywhere.'}`; }
          slider($('.s', root), v => { const d = v - n; n = v; if (box.S.P.length) { if (d > 0) box.add('s', d, [0, 1]); else box.remove('s', -d); } upd(); });
          slider($('.v', root), v => { V = v / 100; box.S.wall = V; upd(); });
          $('.dil', root).addEventListener('click', () => { if (V > .5) { toast('The tank is already more than half full. Shrink the volume first, then dilute.'); return; } V = Math.min(1, V * 2); $('.v', root).value = V * 100; box.S.wall = V; upd(); });
        }
      },
      lenses: ['Pale weak squash versus dark, sickly-sweet syrup: the same flavour, different crowding.', 'In concentrated solutions solute particles are packed close together; dilution spreads the same particles through more water.', 'c = n / V &nbsp;·&nbsp; c₁V₁ = c₂V₂', 'Concentration in mol/L (M). In dilution the moles stay constant.'],
      miracle: { ico: 'heart', title: 'All the sugar in your blood fits on a teaspoon', html: '<p>Healthy blood holds glucose at about <strong>5 millimoles per litre</strong>. With about 5 litres of blood, that\'s 25 millimoles, just <strong>4.5 grams</strong>, roughly one level teaspoon of sugar in your entire bloodstream.</p><p>Hormones like insulin keep that concentration steady all day, through every meal and every run. Too little and your brain falters; too much, for years, damages blood vessels.</p>', c1: '#ffb3c6', c2: '#ff5d5d' },
      quiz: [
        { q: '0.5 mol of salt is dissolved to make 250 mL of solution. What is the concentration?', o: ['0.125 M', '2 M', '0.5 M', '125 M'], a: 1, w: 'c = n / V = 0.5 mol ÷ 0.250 L = 2 mol/L.' },
        { q: '100 mL of 2 M juice concentrate is diluted to 400 mL. The new concentration is…', o: ['8 M', '0.5 M', '2 M', '1 M'], a: 1, w: 'c₁V₁ = c₂V₂: 2 × 100 = c₂ × 400, so c₂ = 0.5 M. Four times the volume, a quarter of the concentration.' }
      ],
      prompt: { p: 'Explain what happens to the number of solute particles, and to the concentration, when you dilute a drink.', m: 'The number of particles (moles) stays exactly the same; you only add water. But they are spread through more volume, so each litre contains fewer of them: the concentration goes down. Double the volume and you halve the concentration (c₁V₁ = c₂V₂).' }
    },
    {
      short: 'The Gas Volume Secret', kicker: 'Molar volume of gases', titleHTML: 'The Gas Volume <em>Secret</em>', item: 'The two balloons', ico: 'balloon', teaser: 'Same size, different fate?',
      clue: 'Equal volumes of gases (at the same temperature and pressure) hold equal numbers of particles. One mole of any gas fills about 24 litres at room conditions.',
      mystery: { q: 'A helium balloon floats; a carbon-dioxide balloon of the same size sinks to the floor. Do they contain the same number of gas particles?', h: ['No: the helium balloon has far more', 'Yes: the same number, but each CO₂ particle is 11 times heavier', 'No: the CO₂ balloon has more'], a: 1, v: 'Yes. At the same temperature and pressure, <b>equal volumes of gas contain equal numbers of particles</b>, whatever the gas. That was Avogadro\'s great guess. But a CO₂ molecule (44 g/mol) is 11 times heavier than a helium atom (4 g/mol), so the CO₂ balloon is denser than air and sinks while the helium balloon floats.' },
      story: `<p>In 1808, the French chemist <strong>Joseph Gay-Lussac</strong> noticed something uncanny: gases react in simple whole-number volumes. Two litres of hydrogen plus one litre of oxygen make exactly two litres of steam. Why should volumes behave so neatly?</p>
        <p>Avogadro’s answer, in 1811: a gas is mostly empty space, with tiny particles flying around far apart. The size of each particle hardly matters, only <strong>how many</strong> there are. So <strong>equal volumes of any gas, at the same temperature and pressure, contain equal numbers of particles</strong>.</p>
        <p>That gives the mole a beautiful shortcut. At room temperature and normal pressure, one mole of <em>any</em> gas fills about <strong>24 litres</strong>, roughly the size of a beach ball. Hydrogen, oxygen, carbon dioxide: the same 24 litres, but very different weights.</p>`,
      lab: {
        label: 'Balloon lab', title: 'Same moles, same size… different fate',
        body: `<div class="lab-grid"><div class="stage" style="height:360px"><svg class="svg-stage" viewBox="0 0 600 360" aria-label="Two balloons of equal moles: your gas and air"></svg></div>
          <div class="side-panel"><div class="grid-btns gas"></div><div class="slider-row"><label>Moles</label><input type="range" class="n" min="10" max="200" value="100" style="--track:linear-gradient(90deg,#3a3f66,var(--violet))"><span class="readout"><b class="no"></b></span></div><div class="kv"><div><small>Volume</small><b class="vv"></b></div><div><small>Gas mass</small><b class="mm"></b></div></div><div class="info-card"><p class="t" style="margin:0;font-size:14.5px;color:var(--soft)"></p></div></div></div>`,
        init(root) {
          const G = [['Hydrogen', 'H2', 2.02, '#eef3ff'], ['Helium', 'He', 4.0, '#ffd36e'], ['Nitrogen', 'N2', 28.0, '#6b8cff'], ['Air (mix)', 'air', 29.0, '#9fd6ff'], ['Carbon dioxide', 'CO2', 44.0, '#9aa3b8'], ['Xenon', 'Xe', 131.3, '#a78bfa']];
          let g = 1, n = 1, yb = 200, va = 0;
          $('.gas', root).innerHTML = G.map((x, i) => `<button data-i="${i}" class="${i === 1 ? 'on' : ''}"><b>${sub(x[1])}</b>${x[0]} · ${x[2]} g/mol</button>`).join('');
          $('.gas', root).addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; g = +b.dataset.i; $$('.gas button', root).forEach(x => x.classList.toggle('on', x === b)); upd(); });
          const svg = $('svg', root);
          svg.innerHTML = `<defs><radialGradient id="bl1" cx="35%" cy="30%"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".3" stop-color="#ffd36e" class="s1"/><stop offset="1" stop-color="#7a5a10" class="s2"/></radialGradient><radialGradient id="bl2" cx="35%" cy="30%"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".3" stop-color="#9fd6ff"/><stop offset="1" stop-color="#24507a"/></radialGradient></defs>
            <rect x="0" y="330" width="600" height="30" fill="rgba(255,255,255,.05)"/><line x1="0" y1="330" x2="600" y2="330" stroke="rgba(255,255,255,.2)"/>
            <g class="b1"><path class="str1" stroke="#c9c8dc" stroke-width="1.2" fill="none"/><ellipse class="e1" fill="url(#bl1)"/><g class="dots1"></g><text class="t1" text-anchor="middle" font-family="JetBrains Mono" font-size="12" fill="#eeedf7"></text></g>
            <g class="b2"><path class="str2" stroke="#c9c8dc" stroke-width="1.2" fill="none"/><ellipse class="e2" fill="url(#bl2)"/><g class="dots2"></g><text class="t2" text-anchor="middle" font-family="JetBrains Mono" font-size="12" fill="#eeedf7"></text></g>`;
          function upd() { const x = G[g], V = 24 * n, m = x[2] * n, dens = x[2] / 24; $('.no', root).textContent = n.toFixed(1) + ' mol'; $('.vv', root).textContent = V.toFixed(0) + ' L'; $('.mm', root).textContent = m.toFixed(1) + ' g';
            $('.s1', root).setAttribute('stop-color', x[3]); $('.s2', root).setAttribute('stop-color', shade(x[3], -.6));
            $('.t', root).innerHTML = `${n.toFixed(1)} mol of ${x[0].toLowerCase()} fills <b>${V.toFixed(0)} L</b>, the same as ${n.toFixed(1)} mol of anything else. Its density is ${dens.toFixed(2)} g/L versus air’s 1.2 g/L, so it <b style="color:${dens < 1.2 ? 'var(--green)' : dens > 1.25 ? 'var(--pink)' : 'var(--gold)'}">${dens < 1.15 ? 'floats' : dens > 1.25 ? 'sinks' : 'just hovers'}</b>. (We’re ignoring the rubber’s weight.)`;
            const k = Math.round(10 + n * 12), rnd = seeded(k); const dots = Array.from({ length: k }, () => [rnd() * 2 - 1, rnd() * 2 - 1]).filter(([a, b]) => a * a + b * b < .8);
            ['.dots1', '.dots2'].forEach((s, j) => $(s, root).innerHTML = dots.map(([a, b]) => `<circle cx="${a}" cy="${b}" r="${j ? .035 : .035}" fill="${j ? '#24507a' : shade(x[3], -.5)}"/>`).join('')); }
          slider($('.n', root), v => { n = v / 100; upd(); }); upd();
          let y1 = 200;
          animate(svg, (dt, t) => { const x = G[g], dens = x[2] / 24, R = 34 * Math.cbrt(n * 2), ground = 330 - R * 1.25 - 40, top = R * 1.25 + 10;
            const target = dens < 1.15 ? top + Math.sin(t * 1.3) * 6 : dens > 1.25 ? ground + 40 - 6 : (top + ground) / 2 + Math.sin(t) * 10; y1 += (target - y1) * Math.min(1, dt * (dens < 1.2 ? 1.2 : 2));
            const y2 = (top + ground) / 2 + Math.sin(t * .9) * 10; const place = (i, cx, cy) => { $(`.e${i}`, root).setAttribute('cx', cx); $(`.e${i}`, root).setAttribute('cy', cy); $(`.e${i}`, root).setAttribute('rx', R); $(`.e${i}`, root).setAttribute('ry', R * 1.15); $(`.str${i}`, root).setAttribute('d', `M${cx} ${cy + R * 1.15} q 8 20 0 40 q -8 20 0 ${Math.max(0, 330 - cy - R * 1.15 - 40)}`); $(`.dots${i}`, root).setAttribute('transform', `translate(${cx} ${cy}) scale(${R} ${R * 1.15})`); $(`.t${i}`, root).setAttribute('x', cx); $(`.t${i}`, root).setAttribute('y', Math.min(352, cy + R * 1.15 + 18)); };
            place(1, 180, y1); place(2, 430, y2); $('.t1', root).textContent = G[g][0]; $('.t2', root).textContent = 'air (same moles)'; });
        }
      },
      lenses: ['A party balloon of helium drifts to the ceiling; one blown up with your breath (rich in CO₂ and water) slowly sinks.', 'In a gas, particles are far apart, so their own size hardly matters. Volume depends only on how many there are.', 'V = n × 24 L/mol', 'At room temperature (20–25 °C) and normal pressure. At 0 °C it is 22.4 L/mol.'],
      miracle: { ico: 'wind', title: 'Why dry-ice fog pours like water', html: '<p>Dry ice is frozen carbon dioxide. As it turns to gas, the cold CO₂ (44 g/mol) is much denser than air (29 g/mol on average), so it flows over the edge of a bowl and pours across the floor like a ghostly liquid, carrying tiny water droplets that make it visible.</p><p>The same physics keeps helium balloons aloft: each helium atom weighs only a seventh as much as an average "air particle", while the balloon holds the same number of them.</p>', c1: '#9fd6ff', c2: '#a78bfa' },
      quiz: [
        { q: 'At room temperature and pressure, what volume do 2 moles of nitrogen gas occupy?', o: ['24 L', '48 L', '12 L', '56 L'], a: 1, w: 'One mole of any gas fills about 24 L at room conditions, so 2 mol fills about 48 L.' },
        { q: 'Three identical balloons hold equal moles of He, N₂ and CO₂. Which is heaviest?', o: ['He', 'N₂', 'CO₂', 'They weigh the same'], a: 2, w: 'Same number of particles, but each CO₂ (44 g/mol) is heavier than N₂ (28) or He (4).' }
      ],
      prompt: { p: 'Explain why a balloon of helium and a balloon of carbon dioxide can be the same size yet weigh different amounts.', m: 'In a gas the particles are far apart, so the volume depends on how many particles there are, not what they are. Two equal balloons at the same temperature and pressure hold the same number of particles. But each CO₂ molecule weighs 11 times more than each helium atom, so the CO₂ balloon weighs 11 times as much gas.' }
    }
  ],
  extra: [
    { c: 1, q: 'Which contains the most atoms?', o: ['1 mol of helium', '1 mol of gold', '1 mol of iron', 'They all contain the same number'], a: 3, w: 'One mole is always 6.022 × 10²³ particles, whatever the element.' },
    { c: 2, q: 'How many moles are in 88 g of CO₂ (44 g/mol)?', o: ['0.5 mol', '2 mol', '44 mol', '88 mol'], a: 1, w: 'n = mass ÷ molar mass = 88 ÷ 44 = 2 mol.' },
    { c: 3, q: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O. How many moles of O₂ are needed to burn 3 mol of methane?', o: ['3 mol', '6 mol', '1.5 mol', '2 mol'], a: 1, w: 'The ratio is 1 : 2, so 3 mol CH₄ needs 6 mol O₂.' },
    { c: 4, q: 'Which solution is most concentrated?', o: ['1 mol in 1 L', '1 mol in 2 L', '0.5 mol in 0.25 L', '2 mol in 4 L'], a: 2, w: '0.5 ÷ 0.25 = 2 M; the others are 1, 0.5 and 0.5 M.' },
    { c: 5, q: 'Why does it matter that the gas is "at the same temperature and pressure" when comparing volumes?', o: ['It doesn\'t matter', 'Heating or squeezing a gas changes its volume without changing the number of particles', 'Pressure changes the type of gas', 'Cold gases have more particles'], a: 1, w: 'Volume also depends on temperature and pressure (the gas laws). Only under equal conditions does equal volume mean equal number.' }
  ],
  cards: [
    [1, 'What is a mole?', '6.022 × 10²³ particles of something: chemistry\'s "dozen".'],
    [1, 'What is Avogadro\'s constant?', 'N<sub>A</sub> = 6.02214076 × 10²³ per mole (exact since 2019).'],
    [1, 'Why count particles by weighing?', 'They are too small and numerous to count, but each type has a fixed mass, so mass tells you number.'],
    [1, 'Moles from mass?', 'n = m ÷ M (mass in grams ÷ molar mass in g/mol).'],
    [2, 'What is molar mass?', 'The mass of one mole of a substance in grams. It equals the sum of the atomic masses in its formula.'],
    [2, 'Molar mass of water?', '2 × 1.008 + 16.00 = 18.02 g/mol.'],
    [2, 'How do you find the percentage of an element in a compound?', '(mass of that element in one mole ÷ molar mass) × 100%.'],
    [2, 'What is the reference for atomic masses?', 'Carbon-12, defined as exactly 12 atomic mass units.'],
    [3, 'What does a balanced equation tell you?', 'The mole ratio in which substances react and form: a recipe counted in moles.'],
    [3, 'What is the limiting reagent?', 'The reactant that runs out first. It decides how much product forms.'],
    [3, 'What does "in excess" mean?', 'A reactant that is left over when the reaction stops.'],
    [3, 'What does "stoichiometry" mean?', 'Calculating amounts of reactants and products from balanced equations ("measuring elements").'],
    [4, 'Define concentration (molarity).', 'Moles of solute per litre of solution: c = n ÷ V, in mol/L (M).'],
    [4, 'Dilution equation?', 'c₁V₁ = c₂V₂. The moles stay the same; only the volume changes.'],
    [4, 'If you double the volume by adding water, the concentration…', 'Halves.'],
    [5, 'Avogadro\'s law?', 'Equal volumes of gases at the same temperature and pressure contain equal numbers of particles.'],
    [5, 'Molar volume of a gas at room conditions?', 'About 24 L/mol (22.4 L/mol at 0 °C and 1 atm).'],
    [5, 'Why does a helium balloon float?', 'Same number of particles as the air it displaces, but each helium atom is much lighter, so the balloon is less dense than air.'],
    [5, 'Gay-Lussac\'s discovery?', 'Gases react in simple whole-number volume ratios, e.g. 2 L H₂ + 1 L O₂ → 2 L steam.']
  ]
};
