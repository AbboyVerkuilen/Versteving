const COURSE = {
  id: '106', title: 'The Energy Ledger', brand: 'The Energy <i>Ledger</i>',
  eyebrow: 'Chemistry 106 · Thermochemistry, entropy & free energy', titleHTML: 'The Energy <em>Ledger</em>',
  lede: 'A hand warmer heats up; a cold pack freezes; ice melts on its own; a peanut can boil water. A mystery about where energy goes, and why some changes happen all by themselves.',
  accent: ['#ff9f5a', '#f4c35a'],
  cast: {
    J: { name: 'James', full: 'Joule', color: '#ff9f5a', title: 'Brewer who measured heat to the hundredth of a degree', sym: 'J' },
    Hs: { name: 'Germain', full: 'Hess', color: '#6fe3a0', title: 'Proved the route doesn’t matter', sym: 'ΔH' },
    S: { name: 'Ent', full: 'Entropy', color: '#a78bfa', title: 'Everything spreads out, eventually', sym: 'S' },
    G: { name: 'Josiah', full: 'Gibbs', color: '#f4c35a', title: 'The judge of what can happen', sym: 'ΔG', orbit: true }
  },
  prologue: {
    short: 'The Hand-warmer Puzzle', kicker: 'The case begins', titleHTML: 'The Hand-warmer <em>Puzzle</em>',
    story: `<p>Snap the metal disc in a gel hand warmer and it turns hot and solid in your palm. Squeeze a sports cold pack and it becomes icy cold, with no fridge in sight. Leave an ice cube on the table and it melts, all by itself, even though melting <em>absorbs</em> energy.</p>
      <p>A single peanut, set alight, can heat a can of water by twenty degrees. A log will burn, but the ash and smoke will never spontaneously reassemble into a log. Some changes run downhill on their own; others never happen without a push.</p>
      <p>Chemistry keeps a strict ledger of energy. Every joule is accounted for: taken from bonds, given to the surroundings, stored in sugar. In five case files you’ll learn to read that ledger, and meet the quantity that decides, in the end, what can happen at all.</p>`,
    cast: [['J', 'happy'], ['Hs', 'happy'], ['S', 'sly'], ['G', 'sly'], ['C', 'happy']]
  },
  finale: {
    q: 'What decides whether a change can happen on its own?', lead: 'Heat capacity, bond energies, calories, Hess’s routes and spreading particles. The ledger has two columns, and one number combines them.',
    avatar: 'G', nameHTML: 'Free <em>energy</em>',
    html: `<p><strong>ΔG = ΔH − TΔS</strong>, Josiah Willard Gibbs’s great equation of 1876.</p>
      <p>The first column is <em>enthalpy</em> (ΔH): heat in or out, set by the bonds broken and formed, measured with thermometers and calorimeters, and the same whichever route you take. The second is <em>entropy</em> (ΔS): the universe’s tendency to spread energy and matter out, weighted by temperature. When ΔG is negative, a change can happen on its own. That is why fuels burn, hand warmers heat, and ice melts above 0 °C even though melting soaks up heat.</p>
      <p>Every engine, every battery, every living cell runs by this ledger. Case closed.</p>`
  },
  cases: [
    {
      short: 'Heat Is Not Temperature', kicker: 'Heat & specific heat capacity', titleHTML: 'Heat Is Not <em>Temperature</em>', item: 'The burning sand', ico: 'sun', teaser: 'Why not the sea?',
      clue: 'Temperature measures how fast particles move; heat is energy transferred. Water has a huge heat capacity: it takes lots of energy to warm it up.',
      mystery: { q: 'On a sunny beach, the sand burns your feet, but the sea, in the same sunshine all day, stays cool. Why?', h: ['The sea reflects all the sunlight', 'Water needs about five times more energy than sand to warm up by each degree', 'Sand is darker so it absorbs everything'], a: 1, v: 'Water has an enormous <b>specific heat capacity</b>: 4.18 J to warm 1 g by 1 °C, about five times more than sand (0.84 J). The same sunshine raises the sand’s temperature five times as much. The sea also mixes the heat down into deep water. Sand’s dark colour helps, but the main culprit is heat capacity.' },
      story: `<p>Temperature and heat sound like the same thing. They aren’t. <strong>Temperature</strong> tells you how fast particles are moving on average. <strong>Heat</strong> is energy flowing from something hotter to something cooler. A bath of lukewarm water holds far more heat energy than a red-hot sparkler, though the sparkler is much hotter.</p>
        <p>In the 1840s a Manchester brewer named <strong>James Prescott Joule</strong> spent his spare time proving that heat is a form of energy. He let falling weights spin paddles in water and measured the tiny warming, a fraction of a degree, with thermometers he could read to 1/200 of a degree. Legend has it he tried to measure the temperature difference between the top and bottom of a waterfall on his honeymoon. The unit of energy, the <strong>joule</strong>, is named after him.</p>
        <p>Different substances need different amounts of energy to warm up. This is their <strong>specific heat capacity</strong>, c: the energy to warm 1 gram by 1 °C. Water’s is unusually large, 4.18 J/g°C, because energy goes into stretching its hydrogen bonds rather than just speeding up molecules. <strong>q = m × c × ΔT</strong>.</p>`,
      lab: {
        label: 'Same energy, different results', title: 'Heat four materials equally',
        body: `<div class="stage" style="height:320px"><canvas class="c" aria-label="Four 1 kg blocks warming as energy is added"></canvas></div>
          <div class="lab-grid" style="margin-top:14px;grid-template-columns:1.4fr 1fr"><div><div class="slider-row"><label>Energy added</label><input type="range" class="e" min="0" max="100" value="40"><span class="readout"><b class="eo"></b></span></div><p class="hint" style="margin:6px 0 0">Every block has the same mass (1 kg) and starts at 20 °C. The same energy goes into each.</p></div><div class="info-card"><p class="tx" style="margin:0;font-size:14.5px;color:var(--soft)"></p></div></div>`,
        init(root) {
          const M = [['Water', 4.18, '#5ca8ff'], ['Olive oil', 1.97, '#f4d35a'], ['Sand', .84, '#e0b27a'], ['Iron', .45, '#9aa3b8']];
          let E = 40, shown = M.map(() => 20); const c = $('.c', root);
          slider($('.e', root), v => { E = v; $('.eo', root).textContent = v + ' kJ'; const dT = M.map(m => E * 1000 / (1000 * m[1]));
            $('.tx', root).innerHTML = `q = m × c × ΔT, so ΔT = q ÷ (m × c). With ${E} kJ, water warms by only <b>${dT[0].toFixed(1)} °C</b>, while iron jumps <b>${dT[3].toFixed(0)} °C</b>. Water is the great heat sponge of our planet.`; });
          animate(c, (dt, t) => { const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); const n = M.length, cw = w / n;
            M.forEach((m, i) => { const T = 20 + E / m[1]; shown[i] += (T - shown[i]) * Math.min(1, dt * 2.5); const x = cw * i + cw / 2, top = 30, bot = h - 60, f = clamp((shown[i] - 0) / 120, 0, 1);
              const bw = Math.min(70, cw * .45); ctx.fillStyle = rgba(m[2], .2); ctx.strokeStyle = rgba(m[2], .7); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x - bw / 2, bot - bw, bw, bw, 8) : ctx.rect(x - bw / 2, bot - bw, bw, bw); ctx.fill(); ctx.stroke();
              const heat = clamp((shown[i] - 20) / 100, 0, 1); glow(ctx, x, bot - bw / 2, bw * (.6 + heat), rampColor(['#5ca8ff', '#f4c35a', '#ff5d5d'], heat), .25 + heat * .6);
              const tx = x + bw / 2 + 16, th = bot - top; ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(tx - 4, top, 8, th); ctx.fillStyle = rampColor(['#5ca8ff', '#f4c35a', '#ff5d5d'], heat); ctx.fillRect(tx - 4, bot - th * f, 8, th * f); ctx.beginPath(); ctx.arc(tx, bot + 6, 8, 0, TAU); ctx.fill();
              const jig = 1 + heat * 6; for (let k = 0; k < 9; k++) ball(ctx, m[2], x - bw / 3 + (k % 3) * bw / 3 + Math.sin(t * 9 + k * 2.1) * jig, bot - bw + bw / 6 + Math.floor(k / 3) * bw / 3 + Math.cos(t * 8 + k) * jig, 5);
              label(ctx, m[0], x, h - 34, { align: 'center', size: 12, color: '#eeedf7', font: '600 13px Inter' }); label(ctx, `c = ${m[1]} J/g°C`, x, h - 18, { align: 'center', size: 10, color: '#8f8eab' }); label(ctx, shown[i].toFixed(0) + ' °C', tx, top - 8, { align: 'center', size: 11, color: '#fff' }); }); });
        }
      },
      lenses: ['Sand burns, the sea stays cool; a metal spoon in hot tea heats up fast; a hot-water bottle stays warm for hours.', 'Heat is energy flowing; temperature is average particle motion. In water, much of the energy goes into stretching hydrogen bonds, not speeding molecules up.', 'q = m × c × ΔT', 'q heat (J), m mass (g), c specific heat capacity (J/g°C), ΔT temperature change.'],
      miracle: { ico: 'fish', title: 'Oceans are the planet’s radiator', html: '<p>Because water soaks up so much energy per degree, the oceans have absorbed over 90% of the extra heat trapped by greenhouse gases in recent decades, while warming by only a fraction of a degree. That buffer has kept the air from warming far faster.</p><p>It\'s also why coastal cities have mild climates. The sea warms slowly in summer and releases heat slowly in winter, so Amsterdam\'s winters are kinder than Moscow\'s.</p>', c1: '#5ca8ff', c2: '#6fe3a0' },
      quiz: [
        { q: 'How much energy is needed to warm 100 g of water by 10 °C? (c = 4.18 J/g°C)', o: ['41.8 J', '418 J', '4,180 J', '1,000 J'], a: 2, w: 'q = mcΔT = 100 × 4.18 × 10 = 4,180 J = 4.18 kJ.' },
        { q: 'A bath of warm water and a red-hot sparkler: which contains more heat energy?', o: ['The sparkler, because it’s hotter', 'The bath, because it has vastly more particles moving', 'They are equal', 'Neither contains heat'], a: 1, w: 'Temperature is average motion; total thermal energy depends also on how much stuff there is. The bath has far more.' }
      ],
      prompt: { p: 'Explain the difference between heat and temperature, using a cup of tea and a swimming pool.', m: 'Temperature is how fast the particles are moving on average; heat is energy transferred because of a temperature difference. A cup of tea at 80 °C is much hotter than a pool at 25 °C, but the pool contains far more water molecules, so it holds far more thermal energy in total. The tea could burn you; the pool could melt far more ice.' }
    },
    {
      short: 'Bonds as Batteries', kicker: 'Bond energies & ΔH', titleHTML: 'Bonds as <em>Batteries</em>', item: 'The gas flame', ico: 'flame', teaser: 'Where does the heat come from?',
      clue: 'Breaking bonds costs energy; forming bonds releases it. If the new bonds are stronger than the old ones, the reaction gives out heat (exothermic, ΔH < 0).',
      mystery: { q: 'Breaking any chemical bond costs energy. Yet burning methane breaks bonds and releases lots of heat. How is that possible?', h: ['Fire creates new energy', 'The new bonds formed (in CO₂ and H₂O) are stronger, so forming them releases more energy than breaking the old ones cost', 'Methane stores heat from the Sun inside it'], a: 1, v: 'Burning methane breaks 4 C–H and 2 O=O bonds, which <b>costs</b> 2,648 kJ per mole. But it forms 2 C=O and 4 O–H bonds, which <b>releases</b> 3,450 kJ. The difference, 802 kJ, comes out as heat and light. Fuels are energy-rich because their products are bonded so much more strongly.' },
      story: `<p>It’s a common myth that energy is "stored in bonds" and released when they break. The truth is the opposite: <strong>breaking a bond always costs energy</strong>, like pulling two magnets apart. <strong>Forming a bond always releases energy</strong>, like letting the magnets snap together.</p>
        <p>Every reaction is a two-step ledger: pay to break the reactants’ bonds, then get paid as the products’ bonds form. The balance is the <strong>enthalpy change</strong>, ΔH. If the products’ bonds are stronger than the reactants’, more energy comes out than went in: the reaction is <strong>exothermic</strong> (ΔH negative), and the surroundings get hotter. If not, it is <strong>endothermic</strong> (ΔH positive), and it soaks up heat.</p>
        <p>Chemists have measured average <strong>bond energies</strong>: 413 kJ/mol to break a C–H bond, 498 for O=O, 799 for each C=O in carbon dioxide, 463 for O–H. With these, you can predict the heat of a reaction before you ever light a match.</p>`,
      lab: {
        label: 'Bond ledger', title: 'Break, then form',
        head: '<div class="seg rx"></div>',
        body: `<div class="lab-grid"><div class="stage" style="height:360px"><canvas class="c" aria-label="Energy diagram: bonds broken up, bonds formed down"></canvas></div><div class="side-panel"><div class="info-card"><div class="meta eq"></div><table class="tbl led" style="margin-top:8px"></table></div><div class="kv"><div><small>ΔH</small><b class="dh"></b></div><div><small>Type</small><b class="ty"></b></div></div></div></div>`,
        init(root) {
          const R = {
            ch4: ['Gas stove', 'CH₄ + 2 O₂ → CO₂ + 2 H₂O', [['4 × C–H', 4 * 413], ['2 × O=O', 2 * 498]], [['2 × C=O', 2 * 799], ['4 × O–H', 4 * 463]]],
            hcl: ['Hydrogen + chlorine', 'H₂ + Cl₂ → 2 HCl', [['H–H', 436], ['Cl–Cl', 243]], [['2 × H–Cl', 2 * 432]]],
            nh3: ['Making ammonia', 'N₂ + 3 H₂ → 2 NH₃', [['N≡N', 945], ['3 × H–H', 3 * 436]], [['6 × N–H', 6 * 391]]],
            h2o: ['Splitting water', '2 H₂O → 2 H₂ + O₂', [['4 × O–H', 4 * 463]], [['2 × H–H', 2 * 436], ['O=O', 498]]]
          };
          let cur = 'ch4', k = 0; const c = $('.c', root);
          function show(key) { cur = key; const r = R[key], br = r[2].reduce((s, x) => s + x[1], 0), fo = r[3].reduce((s, x) => s + x[1], 0), dH = br - fo;
            $('.eq', root).textContent = r[1]; $('.led', root).innerHTML = `<tr><th>Bonds broken (cost)</th><th style="text-align:right">kJ</th></tr>` + r[2].map(x => `<tr><td>${x[0]}</td><td style="text-align:right;color:var(--pink)">+${x[1]}</td></tr>`).join('') + `<tr><th>Bonds formed (released)</th><th></th></tr>` + r[3].map(x => `<tr><td>${x[0]}</td><td style="text-align:right;color:var(--green)">−${x[1]}</td></tr>`).join('');
            $('.dh', root).textContent = (dH > 0 ? '+' : '') + dH + ' kJ'; $('.dh', root).style.color = dH < 0 ? 'var(--orange)' : 'var(--cyan)'; $('.ty', root).textContent = dH < 0 ? 'Exothermic' : 'Endothermic'; k = 0; tween(reduceMotion ? 10 : 2200, q => k = q); }
          seg($('.rx', root), Object.keys(R).map(x => [x, R[x][0]]), cur, show); show(cur);
          animate(c, (dt, t) => { const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); const r = R[cur], br = r[2].reduce((s, x) => s + x[1], 0), fo = r[3].reduce((s, x) => s + x[1], 0);
            const top = 40, bot = h - 40, maxE = Math.max(br, fo) * 1.05, Y = e => bot - 40 - (e / maxE) * (bot - top - 60);
            const yR = Y(0), yA = Y(br), yP = Y(br - fo); const x0 = w * .12, x1 = w * .5, x2 = w * .88;
            const lvl = (x, y, s, col) => { ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w * .1, y); ctx.lineTo(x + w * .1, y); ctx.stroke(); label(ctx, s, x, y - 8, { align: 'center', size: 11, color: '#eeedf7' }); };
            lvl(x0, yR, 'reactants', '#c9c8dc'); lvl(x1, yA, 'separate atoms', '#a78bfa');
            const k1 = clamp(k * 2, 0, 1), k2 = clamp(k * 2 - 1, 0, 1);
            const arrow = (xa, ya, xb, yb, col, txt) => { ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xb, yb); ctx.stroke(); const an = Math.atan2(yb - ya, xb - xa); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(xb, yb); ctx.lineTo(xb - 10 * Math.cos(an - .4), yb - 10 * Math.sin(an - .4)); ctx.lineTo(xb - 10 * Math.cos(an + .4), yb - 10 * Math.sin(an + .4)); ctx.fill(); label(ctx, txt, (xa + xb) / 2 + (xb > xa ? -8 : 8), (ya + yb) / 2, { align: xb > xa ? 'right' : 'left', size: 11, color: col }); };
            if (k1 > 0) arrow(x0 + w * .05, yR, lerp(x0 + w * .05, x1 - w * .05, k1), lerp(yR, yA, k1), '#ff6b9a', 'break bonds +' + br);
            if (k2 > 0) { arrow(x1 + w * .05, yA, lerp(x1 + w * .05, x2 - w * .05, k2), lerp(yA, yP, k2), '#6fe3a0', 'form bonds −' + fo); }
            if (k2 >= 1) { lvl(x2, yP, 'products', '#f4c35a'); const dH = br - fo; ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.moveTo(x0 + w * .1, yR); ctx.lineTo(x2 + w * .1, yR); ctx.stroke(); ctx.setLineDash([]); label(ctx, `ΔH = ${dH > 0 ? '+' : ''}${dH} kJ`, x2, (yR + yP) / 2 + 4, { align: 'center', size: 13, color: dH < 0 ? '#ff9f5a' : '#5ce1e6', font: '600 13px "JetBrains Mono"' }); if (dH < 0) glow(ctx, x2, yP, 60, '#ff9f5a', .4 + .2 * Math.sin(t * 4)); }
            label(ctx, 'ENERGY ↑', 10, 18, { size: 10, color: '#8f8eab' }); });
        }
      },
      lenses: ['A gas flame heats a pan; a sports cold pack chills a sprained ankle.', 'Reactant bonds are broken (energy in), product bonds are formed (energy out). The difference flows to or from the surroundings.', 'ΔH = Σ(bonds broken) − Σ(bonds formed)', 'ΔH < 0: exothermic (gives heat). ΔH > 0: endothermic (absorbs heat).'],
      miracle: { ico: 'battery', title: 'Why fat is the body’s best fuel', html: '<p>Fat molecules are long chains packed with C–H bonds. When your cells burn them, they become CO₂ and H₂O, whose C=O and O–H bonds are much stronger. That makes fat release about <strong>37 kJ per gram</strong>, more than twice as much as sugar or protein (about 17 kJ/g).</p><p>Sugar is already partly bonded to oxygen, so less is gained by finishing the job. Migrating birds fatten up before long flights for exactly this reason.</p>', c1: '#f4c35a', c2: '#ff9f5a' },
      quiz: [
        { q: 'Breaking a chemical bond always…', o: ['releases energy', 'requires energy', 'requires no energy', 'creates mass'], a: 1, w: 'Pulling atoms apart takes energy. Forming bonds releases it.' },
        { q: 'A reaction has ΔH = −500 kJ. It is…', o: ['endothermic: it gets cold', 'exothermic: it releases heat', 'impossible', 'neither'], a: 1, w: 'Negative ΔH means energy leaves the system as heat: exothermic.' }
      ],
      prompt: { p: 'Correct this common mistake: "Energy is released when bonds break."', m: 'Breaking bonds always costs energy. Energy is released when new bonds form. In an exothermic reaction such as burning, the bonds formed in the products are stronger than those broken in the reactants, so more energy is released by forming than was spent on breaking. The surplus comes out as heat.' }
    },
    {
      short: 'Counting Calories', kicker: 'Calorimetry', titleHTML: 'Counting <em>Calories</em>', item: 'The burning peanut', ico: 'flame', teaser: 'What’s on the label?',
      clue: 'Calorimetry measures a reaction’s energy by the temperature change it causes in a known mass of water: q = mcΔT.',
      mystery: { q: 'The label on a snack says 250 Calories. What does that number actually measure?', h: ['How heavy the food is', 'The energy released if you burn the food completely, enough to heat 250 kg of water by 1 °C', 'How much fat is in it'], a: 1, v: 'A food Calorie (capital C) is a <b>kilocalorie</b>: the energy to heat 1 kg of water by 1 °C, which equals 4.18 kJ. 250 Calories is about 1,050 kJ, the energy released if the food were burned completely to CO₂ and water. Early values were measured by literally burning food inside a <b>bomb calorimeter</b>.' },
      story: `<p>How do you measure the energy in a peanut? You can’t put a meter on a molecule. But you <em>can</em> burn the peanut under a can of water and watch the thermometer. Every joule released ends up warming the water, and since you know water’s heat capacity, <strong>q = m × c × ΔT</strong> tells you how many joules there were.</p>
        <p>This is <strong>calorimetry</strong>. In the 1890s the American chemist <strong>Wilbur Atwater</strong> built a room-sized calorimeter and had volunteers live inside it for days, measuring every bite they ate and every bit of heat their bodies gave off. He showed the human body obeys the conservation of energy just like a steam engine, and his figures (4 kcal/g for carbohydrate and protein, 9 for fat) are still printed on food labels today.</p>
        <p>A simple can-and-flame calorimeter loses lots of heat to the air, so it always underestimates. Professional <strong>bomb calorimeters</strong> burn the sample in pure oxygen inside a sealed steel vessel, submerged in water, and catch almost every joule.</p>`,
      lab: {
        label: 'Can calorimeter', title: 'Burn a 1 g sample under 100 g of water',
        head: '<button class="btn primary small go">🔥 Burn it</button>',
        body: `<div class="lab-grid"><div class="stage" style="height:340px"><canvas class="c" aria-label="Food burning under a can of water with a thermometer"></canvas></div><div class="side-panel"><div class="grid-btns food"></div><div class="kv"><div><small>Water ΔT</small><b class="dt">0 °C</b></div><div><small>Measured</small><b class="me">—</b></div><div><small>Label value</small><b class="lb">—</b></div></div><div class="info-card"><p class="tx" style="margin:0;font-size:14px;color:var(--soft)">Pick a food and burn it. About 60% of the heat escapes into the air in a simple can calorimeter.</p></div></div></div>`,
        init(root) {
          const F = [['Peanut', 24.7, '#c98a5e'], ['Crisp', 22.5, '#f4d35a'], ['Marshmallow', 13.4, '#f5f0ff'], ['Bread', 11, '#e0b27a'], ['Cucumber', .6, '#6fe3a0']];
          let f = 0, burnt = 0, burning = false, T = 20; const eff = .4, c = $('.c', root);
          $('.food', root).innerHTML = F.map((x, i) => `<button data-i="${i}" class="${i ? '' : 'on'}"><b>${x[0]}</b>${x[1]} kJ/g</button>`).join('');
          $('.food', root).addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; f = +b.dataset.i; $$('.food button', root).forEach(x => x.classList.toggle('on', x === b)); burnt = 0; burning = false; T = 20; upd(); });
          $('.go', root).addEventListener('click', () => { burnt = 0; T = 20; burning = true; });
          function upd() { const dT = T - 20, meas = 100 * 4.18 * dT / 1000; $('.dt', root).textContent = dT.toFixed(1) + ' °C'; $('.me', root).textContent = burnt > 0 ? meas.toFixed(1) + ' kJ' : '—'; $('.lb', root).textContent = F[f][1] + ' kJ';
            if (burnt >= 1) $('.tx', root).innerHTML = `q = m × c × ΔT = 100 g × 4.18 × ${dT.toFixed(1)} = <b>${(meas * 1000).toFixed(0)} J</b>. That’s only ${(meas / F[f][1] * 100).toFixed(0)}% of the label value: the rest heated the air, the can and the clamp. ${F[f][1] < 2 ? 'Cucumber is 96% water, so there’s almost nothing to burn!' : ''}`; }
          upd();
          animate(c, (dt, t) => { if (burning) { burnt = Math.min(1, burnt + dt / 5); T = 20 + burnt * F[f][1] * 1000 * eff / (100 * 4.18); if (burnt >= 1) burning = false; upd(); }
            const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); const cx = w / 2, canY = h * .12, canH = h * .38, canW = Math.min(120, w * .3);
            ctx.strokeStyle = '#9aa3b8'; ctx.lineWidth = 2; ctx.strokeRect(cx - canW / 2, canY, canW, canH); const heat = clamp((T - 20) / 60, 0, 1);
            ctx.fillStyle = rgba(rampColor(['#5ca8ff', '#ff9f5a', '#ff5d5d'], heat), .6); ctx.fillRect(cx - canW / 2 + 2, canY + canH * .25, canW - 4, canH * .75 - 2);
            for (let i = 0; i < 12; i++) ball(ctx, '#ff5d5d', cx - canW / 2 + 14 + (i % 4) * (canW - 28) / 3 + Math.sin(t * (4 + heat * 14) + i) * (2 + heat * 6), canY + canH * .4 + Math.floor(i / 4) * canH * .18 + Math.cos(t * (3 + heat * 12) + i) * (2 + heat * 5), 3.5);
            const tx = cx + canW / 2 - 16; ctx.fillStyle = 'rgba(255,255,255,.15)'; ctx.fillRect(tx - 3, canY - 30, 6, canH + 10); ctx.fillStyle = '#ff5d5d'; const fh = (canH + 10) * clamp((T - 0) / 100, 0, 1); ctx.fillRect(tx - 3, canY - 20 + canH - fh, 6, fh); label(ctx, T.toFixed(1) + ' °C', tx + 10, canY - 14, { size: 12, color: '#fff' });
            const fy = h * .82, fs = 18 * (1 - burnt * .7); ctx.fillStyle = '#555c6e'; ctx.fillRect(cx - 40, fy + 12, 80, 4); ball(ctx, burnt >= 1 ? '#3a3a3a' : F[f][2], cx, fy, fs);
            if (burning) { for (let i = 0; i < 14; i++) { const ph = (t * 2.5 + i / 14) % 1, x = cx + Math.sin(i * 7 + t * 5) * 10 * (1 - ph), y = fy - fs - ph * (fy - fs - canY - canH - 6); glow(ctx, x, y, 22 * (1 - ph) + 6, ph < .5 ? '#ffd36e' : '#ff6b2a', .9 * (1 - ph)); }
              for (let i = 0; i < 8; i++) { const ph = (t * .8 + i / 8) % 1; const x = cx + (i % 2 ? 1 : -1) * (canW / 2 + 10 + ph * 50); glow(ctx, x, canY + canH - ph * canH, 10, '#ff9f5a', .5 * (1 - ph)); } label(ctx, 'heat lost to air', cx + canW / 2 + 40, canY + canH * .5, { size: 10, color: '#ff9f5a' }); } });
        }
      },
      lenses: ['A peanut flaring under a drinks can; the nutrition label on a packet of biscuits.', 'Burning breaks food molecules into CO₂ and water; the energy released flows into the water as faster-moving molecules.', '1 kcal = 1 Calorie = 4.184 kJ', 'Food labels list kcal (Calories) and kJ. A typical adult needs about 8,700 kJ per day.'],
      miracle: { ico: 'heart', title: 'You glow like a 100-watt bulb', html: '<p>At rest, your body turns food energy into heat at about <strong>80–100 watts</strong>, roughly the output of an old-fashioned light bulb. A lecture hall of 200 students is heated by about 20 kW of human warmth.</p><p>That’s why Atwater’s calorimeter worked: the heat flowing out of a resting person, measured by the warming of water pipes in the walls, matched the energy in the food they ate.</p>', c1: '#ff6b9a', c2: '#ff9f5a' },
      quiz: [
        { q: 'Burning a sample heats 200 g of water by 5 °C. How much energy did the water absorb? (c = 4.18)', o: ['209 J', '1,045 J', '4,180 J', '4.18 J'], a: 2, w: 'q = 200 × 4.18 × 5 = 4,180 J.' },
        { q: 'Why does a simple can calorimeter give a value lower than the food label?', o: ['Labels exaggerate', 'Much of the heat escapes to the air and the can instead of the water', 'Water absorbs too much', 'Food gains energy when burned'], a: 1, w: 'Heat losses mean the water receives only part of the energy. Bomb calorimeters minimise these losses.' }
      ],
      prompt: { p: 'Describe how you could measure the energy in a crisp at home, and say why your answer would be too low.', m: 'Put a known mass of water (say 100 g) in a metal can, measure its temperature, then burn a weighed crisp underneath until it’s fully burnt. Measure the temperature rise and use q = m × c × ΔT (c = 4.18 J/g°C) to find the energy, then divide by the crisp’s mass. It will be too low because much of the heat warms the air, the can and the surroundings, and some of the crisp may not burn completely.' }
    },
    {
      short: 'Hess’s Trail', kicker: 'Hess’s law', titleHTML: 'Hess’s <em>Trail</em>', item: 'The diamond’s secret', ico: 'gem', teaser: 'Measuring the impossible',
      clue: 'The total enthalpy change of a reaction is the same whatever route it takes (Hess’s law), so we can calculate energies we can’t measure directly.',
      mystery: { q: 'Diamond very slowly turns into graphite, so slowly that nobody could ever measure the heat given off. Yet we know it releases 1.9 kJ per mole. How?', h: ['Ancient diamonds were found warmer', 'By burning both forms and subtracting: energy changes add up the same whatever the route', 'By computer simulation only'], a: 1, v: 'Burn diamond and you get 395.4 kJ/mol; burn graphite and you get 393.5. Both end as the same CO₂. By <b>Hess’s law</b> the energy difference between the start points must be the difference in the burns: <b>1.9 kJ/mol</b>. Diamond really is (very slowly) turning into pencil lead. "Forever" is a long time, but not infinite.' },
      story: `<p>In 1840 <strong>Germain Hess</strong>, a Swiss-born chemist working in St Petersburg, noticed something about the heat of reactions. Whether he made a product in one step or several, the total heat given off was always the same. Energy behaves like altitude: it doesn’t matter which path you take up a mountain, the height gained from base to summit is the same.</p>
        <p>This is <strong>Hess’s law</strong>, and it’s a consequence of the conservation of energy. Its power is that it lets chemists calculate energy changes they could never measure directly, because the reaction is too slow, too dangerous, or produces a mess of side products.</p>
        <p>The trick: find a route of reactions you <em>can</em> measure (often burning things completely, which is easy) that links the same start and end points. Add the steps up, flipping the sign of any you run backwards, and the answer drops out. It’s accounting: two routes between the same bank balances must sum to the same total.</p>`,
      lab: {
        label: 'Two routes, one answer', title: 'Follow the energy trail',
        head: '<div class="seg ex"></div>',
        body: `<div class="lab-grid"><div class="stage" style="height:360px"><canvas class="c" aria-label="Energy cycle diagram with direct and indirect routes"></canvas></div><div class="side-panel"><div class="seg route"></div><div class="info-card"><div class="meta">THE ARITHMETIC</div><p class="tx" style="margin:6px 0 0;font-size:14.5px;color:var(--soft)"></p></div></div></div>`,
        init(root) {
          const X = {
            co: { start: 'C + O₂', mid: 'CO + ½ O₂', end: 'CO₂', direct: -393.5, s1: -110.5, s2: -283.0, ask: 's1', txt: 'Burning carbon partly to CO (step 1) is impossible to do cleanly: some CO₂ always forms too. But we can measure the full burn of C (−393.5) and the burn of CO (−283.0).' },
            dia: { start: 'C (diamond) + O₂', mid: 'C (graphite) + O₂', end: 'CO₂', direct: -395.4, s1: -1.9, s2: -393.5, ask: 's1', txt: 'Diamond → graphite (step 1) takes millions of years. But we can burn each form and measure the heat.' }
          };
          let ex = 'co', route = 'both', k = 0; const c = $('.c', root);
          const go = () => { k = 0; tween(reduceMotion ? 10 : 2600, q => k = q); const e = X[ex];
            $('.tx', root).innerHTML = `${e.txt}<br><br>Route A (direct): <b>${e.direct}</b> kJ<br>Route B: <b>step 1</b> + (${e.s2}) = ${e.direct}<br>So step 1 = ${e.direct} − (${e.s2}) = <b style="color:var(--gold)">${e.s1} kJ/mol</b>.`; };
          seg($('.ex', root), [['co', 'C → CO'], ['dia', 'Diamond → graphite']], ex, x => { ex = x; go(); });
          seg($('.route', root), [['both', 'Both routes'], ['a', 'Route A'], ['b', 'Route B']], route, x => { route = x; go(); });
          go();
          animate(c, (dt, t) => { const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); const e = X[ex];
            const top = 50, bot = h - 40, Y = v => top + (-v / 400) * (bot - top); const ys = Y(0), ym = Y(e.s1), ye = Y(e.direct);
            const lv = (x1, x2, y, s, col) => { ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); label(ctx, s, (x1 + x2) / 2, y - 8, { align: 'center', size: 12, color: '#eeedf7', font: '600 12px Inter' }); };
            lv(w * .06, w * .32, ys, e.start, '#c9c8dc'); lv(w * .62, w * .94, ym, e.mid, '#a78bfa'); lv(w * .34, w * .66, ye, e.end, '#f4c35a');
            const path = (pts, col, kk, txt) => { ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.setLineDash([6, 5]); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.setLineDash([]); const segs = pts.length - 1, f = kk * segs, i = Math.min(segs - 1, Math.floor(f)), r = f - i; const x = lerp(pts[i][0], pts[i + 1][0], r), y = lerp(pts[i][1], pts[i + 1][1], r); glow(ctx, x, y, 20, col, 1); ball(ctx, col, x, y, 6); if (txt) txt(); };
            if (route !== 'b') path([[w * .2, ys], [w * .45, ye]], '#ff9f5a', k, () => label(ctx, `A: ${e.direct} kJ`, w * .3, (ys + ye) / 2 + 30, { align: 'right', size: 12, color: '#ff9f5a' }));
            if (route !== 'a') path([[w * .3, ys], [w * .7, ym], [w * .58, ye]], '#6fe3a0', k, () => { label(ctx, `step 1: ${e.s1} kJ ?`, w * .52, (ys + ym) / 2 - 6, { align: 'center', size: 12, color: '#6fe3a0' }); label(ctx, `step 2: ${e.s2} kJ`, w * .66, (ym + ye) / 2 + 4, { size: 12, color: '#6fe3a0' }); });
            label(ctx, 'ENERGY ↑ (not to scale for tiny steps)', 10, 18, { size: 10, color: '#8f8eab' }); });
        }
      },
      lenses: ['A diamond ring that, in principle, is slowly becoming graphite.', 'Enthalpy depends only on the start and end states, like height on a map, not on the path between them.', 'ΔH<sub>route A</sub> = ΔH<sub>step 1</sub> + ΔH<sub>step 2</sub>', 'Reverse a reaction → flip the sign of ΔH. Double it → double ΔH.'],
      miracle: { ico: 'leaf', title: 'Your body uses the same energy as a fire', html: '<p>Burn a gram of glucose in a flame and it releases about 16 kJ in a split second. Your cells break the same gram down in more than twenty enzyme-controlled steps, harvesting energy bit by bit into ATP. Hess’s law guarantees the total is identical.</p><p>That’s why nutritionists can measure food energy by burning it: the route is different, but the bank balance at the end is the same.</p>', c1: '#6fe3a0', c2: '#f4c35a' },
      quiz: [
        { q: 'What does Hess’s law state?', o: ['Reactions are always exothermic', 'The total enthalpy change is the same regardless of the route taken', 'Heat flows from cold to hot', 'Energy is created in reactions'], a: 1, w: 'Enthalpy is a state function: only start and end matter.' },
        { q: 'A → B has ΔH = +50 kJ. What is ΔH for B → A?', o: ['+50 kJ', '−50 kJ', '0', '+100 kJ'], a: 1, w: 'Reversing a reaction reverses the sign of its enthalpy change.' }
      ],
      prompt: { p: 'Explain Hess’s law with a hiking analogy, then say why it is useful to chemists.', m: 'Whether you climb a hill straight up the steep side or zigzag along a gentle path, you gain the same height from base to summit. Enthalpy is like height: the energy change between reactants and products is the same whatever steps the reaction goes through. That lets chemists calculate energy changes for reactions they can’t measure directly, by adding up the steps of reactions they can measure.' }
    },
    {
      short: 'The Arrow of Time', kicker: 'Entropy & Gibbs free energy', titleHTML: 'The Arrow of <em>Time</em>', item: 'The melting ice', ico: 'ice', teaser: 'Why does it happen on its own?',
      clue: 'Things tend to spread out: entropy (S) increases. Whether a change happens on its own depends on both ΔH and ΔS: ΔG = ΔH − TΔS must be negative.',
      mystery: { q: 'Melting absorbs heat: it is endothermic. So why does an ice cube on a warm table melt all by itself?', h: ['The table pushes heat into it', 'Melting lets molecules spread into many more arrangements (entropy rises), and above 0 °C that wins over the energy cost', 'Ice is unstable at any temperature'], a: 1, v: 'Two forces compete. Energy (ΔH = +6 kJ/mol) favours staying frozen. But liquid water molecules can arrange themselves in vastly more ways than in rigid ice, so <b>entropy</b> rises (ΔS = +22 J/mol K). The balance is <b>ΔG = ΔH − TΔS</b>. Above 273 K the TΔS term wins and ΔG goes negative: melting is spontaneous. Below 273 K energy wins and water freezes.' },
      story: `<p>Drop a spot of ink into water and it spreads until the whole glass is evenly tinted. It never gathers itself back into a drop. Open a bottle of perfume and the scent fills the room; it never crowds back into the bottle. A hot cup of coffee cools to room temperature; it never spontaneously heats up. Time seems to have a direction.</p>
        <p>In the 1870s the Austrian physicist <strong>Ludwig Boltzmann</strong> found the reason: <strong>probability</strong>. There are astronomically more ways for particles and energy to be spread out than bunched up. Systems drift towards the spread-out arrangements simply because there are so many more of them. The measure of this spread is <strong>entropy</strong>, S. His formula, S = k log W, is carved on his tombstone in Vienna.</p>
        <p>The American <strong>Josiah Willard Gibbs</strong> combined energy and entropy into one judge: the <strong>free energy change</strong>, <strong>ΔG = ΔH − TΔS</strong>. If ΔG is negative, a change can happen on its own (it is <em>spontaneous</em>). Temperature decides how much the entropy term counts. That’s why ice melts above 0 °C and water freezes below it.</p>`,
      lab: {
        label: 'Spreading out', title: 'Lift the barrier',
        head: '<div class="controls" style="margin:0"><button class="btn primary small lift">Lift the barrier</button><button class="btn small ghost rs">Reset</button></div>',
        body: `<div class="lab-grid"><div><div class="stage" style="height:280px"><canvas class="c" aria-label="Gas particles spreading after a barrier is removed"></canvas></div><div class="kv" style="margin-top:12px"><div><small>Left</small><b class="l"></b></div><div><small>Right</small><b class="r"></b></div><div><small>Chance all go back left</small><b class="p"></b></div></div></div>
          <div class="side-panel"><div class="info-card"><div class="meta">GIBBS JUDGE · ICE ⇌ WATER</div><div class="slider-row" style="margin-top:8px"><label>T</label><input type="range" class="t" min="-30" max="30" value="10" style="--track:linear-gradient(90deg,#6b8cff,#5ce1e6,#ff9f5a)"><span class="readout"><b class="to"></b></span></div><div class="kv" style="margin-top:8px"><div><small>ΔH</small><b>+6.01 kJ</b></div><div><small>−TΔS</small><b class="ts"></b></div><div><small>ΔG</small><b class="dg"></b></div></div><p class="gt" style="margin:10px 0 0;font-size:14px;color:var(--soft)"></p></div></div></div>`,
        init(root) {
          const box = ParticleBox($('.c', root), { species: { g: { color: '#a78bfa', r: 5, m: 1 } }, counts: { g: 40 }, regions: { g: [0, .45] }, partition: true, speed: 70, collide: true,
            onTick: api => { const W = api.W, L = api.S.P.filter(p => p.x < W / 2).length, R = api.S.P.length - L; $('.l', root).textContent = L; $('.r', root).textContent = R; $('.p', root).innerHTML = api.S.partition ? '—' : `1 in ${fmt(Math.pow(2, api.S.P.length), 1)}`; } });
          $('.lift', root).addEventListener('click', () => { box.S.partition = false; });
          $('.rs', root).addEventListener('click', () => { box.S.partition = true; box.reset({ g: 40 }); });
          slider($('.t', root), v => { const T = v + 273.15, ts = -T * 22.0 / 1000, dg = 6.01 + ts; $('.to', root).textContent = v + ' °C'; $('.ts', root).textContent = ts.toFixed(2) + ' kJ'; $('.dg', root).textContent = (dg > 0 ? '+' : '') + dg.toFixed(2) + ' kJ'; $('.dg', root).style.color = dg < 0 ? 'var(--green)' : 'var(--pink)';
            $('.gt', root).innerHTML = Math.abs(dg) < .03 ? '<b>ΔG ≈ 0: equilibrium.</b> At 0 °C ice and water coexist; neither wins.' : dg < 0 ? '<b style="color:var(--green)">ΔG &lt; 0: ice melts on its own.</b> The entropy gain, multiplied by this temperature, outweighs the energy cost.' : '<b style="color:var(--pink)">ΔG &gt; 0: melting won’t happen.</b> Too cold: the energy term wins, and water would freeze instead.'; });
        }
      },
      lenses: ['Ink spreads through water; a room gets messy, never tidy, on its own; an ice cube melts on a warm table.', 'There are vastly more spread-out arrangements than ordered ones, so random motion carries systems towards disorder.', 'ΔG = ΔH − TΔS', 'Spontaneous if ΔG < 0. T in kelvin; ΔS in J/(mol K) (divide by 1000 to match kJ).'],
      miracle: { ico: 'leaf', title: 'Life is an island of order, paid for in sunlight', html: '<p>A living cell is breathtakingly ordered: proteins folded just so, DNA copied with few errors. That might seem to break the rule that entropy always increases. It doesn’t, because the rule applies to the <em>whole universe</em>.</p><p>Plants capture ordered, high-energy sunlight and release disordered heat; you eat ordered food and breathe out CO₂, water and warmth. Life keeps its own entropy low by exporting even more entropy to its surroundings. Erwin Schrödinger said that living things feed on "negative entropy".</p>', c1: '#a78bfa', c2: '#6fe3a0' },
      quiz: [
        { q: 'Which change involves an increase in entropy?', o: ['Water freezing', 'Steam condensing', 'A gas spreading into a larger container', 'Crystals forming from a solution'], a: 2, w: 'Spreading out gives particles far more possible arrangements: entropy increases.' },
        { q: 'A reaction has ΔH > 0 and ΔS > 0. When is it spontaneous?', o: ['Never', 'Always', 'Only at high temperatures, when TΔS outweighs ΔH', 'Only at low temperatures'], a: 2, w: 'ΔG = ΔH − TΔS becomes negative once T is large enough. Melting ice is the classic example.' }
      ],
      prompt: { p: 'Explain why a broken egg never un-breaks itself, using the idea of entropy.', m: 'There are vastly more ways for the egg’s molecules to be arranged in a messy, spread-out splat than in the precise order of an intact egg. Random molecular motion naturally moves systems towards the far more numerous disordered arrangements: entropy increases. Reassembling the egg would require all those molecules to find the one ordered arrangement by chance, which is so improbable it effectively never happens.' }
    }
  ],
  extra: [
    { c: 1, q: 'Which has the highest specific heat capacity?', o: ['Iron', 'Sand', 'Water', 'Air in a balloon'], a: 2, w: 'Water’s 4.18 J/g°C is unusually high, thanks to hydrogen bonding.' },
    { c: 2, q: 'In an endothermic reaction…', o: ['the surroundings get hotter', 'the surroundings get colder as heat is absorbed', 'no energy changes', 'bonds formed are stronger than bonds broken'], a: 1, w: 'Endothermic reactions take in heat, so the surroundings cool, like an instant cold pack.' },
    { c: 3, q: 'One food Calorie (kcal) equals…', o: ['1 J', '4.184 kJ', '1 kJ', '100 J'], a: 1, w: '1 kcal = 4,184 J: the energy to warm 1 kg of water by 1 °C.' },
    { c: 4, q: 'If reaction X is doubled (2X), its ΔH…', o: ['halves', 'doubles', 'stays the same', 'changes sign'], a: 1, w: 'Enthalpy changes scale with the amounts reacting.' },
    { c: 5, q: 'What is the sign of ΔG for a spontaneous change?', o: ['Positive', 'Negative', 'Zero', 'It doesn’t matter'], a: 1, w: 'Negative ΔG means the change can proceed on its own.' }
  ],
  cards: [
    [1, 'Heat vs temperature?', 'Temperature: average particle motion. Heat: energy transferred because of a temperature difference.'],
    [1, 'Specific heat capacity?', 'Energy to raise 1 g of a substance by 1 °C. Water: 4.18 J/g°C.'],
    [1, 'Heat equation?', 'q = m × c × ΔT'],
    [2, 'Breaking vs forming bonds?', 'Breaking costs energy (endothermic); forming releases energy (exothermic).'],
    [2, 'ΔH from bond energies?', 'ΔH = Σ bonds broken − Σ bonds formed.'],
    [2, 'Exothermic vs endothermic sign?', 'Exothermic: ΔH < 0. Endothermic: ΔH > 0.'],
    [2, 'Why does burning methane release energy?', 'Bonds formed in CO₂ and H₂O are stronger than the bonds broken in CH₄ and O₂.'],
    [3, 'What is calorimetry?', 'Measuring energy changes from the temperature change of a known mass of water.'],
    [3, '1 food Calorie = ?', '1 kcal = 4.184 kJ.'],
    [3, 'Why do simple calorimeters underestimate?', 'Heat is lost to the air, the container and the surroundings.'],
    [4, 'Hess’s law?', 'The total ΔH of a reaction is independent of the route taken.'],
    [4, 'Reversing a reaction does what to ΔH?', 'Changes its sign.'],
    [4, 'Why is Hess’s law useful?', 'It lets us calculate ΔH for reactions we can’t measure directly.'],
    [5, 'What is entropy?', 'A measure of how spread out (disordered) energy and matter are; the number of possible arrangements.'],
    [5, 'Gibbs free energy equation?', 'ΔG = ΔH − TΔS'],
    [5, 'When is a process spontaneous?', 'When ΔG < 0.'],
    [5, 'Why does ice melt above 0 °C despite ΔH > 0?', 'The entropy increase times temperature (TΔS) outweighs ΔH, making ΔG negative.']
  ]
};
