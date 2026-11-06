const COURSE = {
  id: '104', title: 'The Shape of Things', brand: 'The <i>Shape</i> of Things',
  eyebrow: 'Chemistry 104 · Bonding, shape & intermolecular forces', titleHTML: 'The <em>Shape</em> of Things',
  lede: 'Water and methane are almost the same size, yet one boils at 100 °C and the other at −162 °C. A mystery about where electrons sit, the shapes molecules take, and the forces that make them stick.',
  accent: ['#ff6b9a', '#5ce1e6'],
  cast: {
    Lw: { name: 'Gilbert', full: 'Lewis', color: '#ff9f5a', title: 'The man who drew electrons as dots', sym: 'G·N' },
    F: { name: 'Fifi', full: 'Fluorine', color: '#c6f36b', title: 'The greediest atom of all' },
    vdW: { name: 'Vandy', full: 'Van der Waals', color: '#5ce1e6', title: 'The faintest force, in its billions', sym: 'vdW' },
    sh: { name: 'Shape', full: 'Molecular shape', color: '#ff6b9a', title: 'Where the electrons sit decides everything', sym: '∠', orbit: true }
  },
  prologue: {
    short: 'The Boiling Riddle', kicker: 'The case begins', titleHTML: 'The Boiling <em>Riddle</em>',
    story: `<p>Two molecules, almost twins. <strong>Methane</strong>, CH₄: one carbon, four hydrogens, 16 g/mol. <strong>Water</strong>, H₂O: one oxygen, two hydrogens, 18 g/mol. Nearly the same size, nearly the same weight.</p>
      <p>Yet methane boils at <strong>−162 °C</strong>, so it is a gas on even the coldest day on Earth. Water boils at <strong>100 °C</strong>. If water behaved like its twin, the oceans would have boiled into the sky, and there would be no rain, no rivers, and no you.</p>
      <p>Something about the way these molecules are built makes water cling to itself with astonishing strength. To find it, you’ll draw electrons as dots, see molecules in 3D, watch atoms fight over electrons, and meet the faintest force in chemistry, the one that lets a gecko walk on a ceiling.</p>`,
    cast: [['Lw', 'happy'], ['O', 'sly'], ['F', 'sly'], ['vdW', 'happy'], ['sh', 'sly']]
  },
  finale: {
    q: 'Why does water boil 262 degrees hotter than methane?', lead: 'Dots, shapes, tug-of-war, sticky forces and giant lattices. Each clue is about where the electrons sit, and what shape that makes.',
    avatar: 'sh', nameHTML: 'The <em>shape</em> of molecules',
    html: `<p>More precisely: <strong>where the electrons sit, and the shape that creates</strong>.</p>
      <p>Lewis dots show how atoms share electrons to fill their shells. Electron pairs push each other as far apart as possible, so water’s two lone pairs bend it into a V while methane is a perfect, symmetrical tetrahedron. Oxygen pulls the shared electrons hard, so bent water is <em>polar</em>, a tiny magnet, while symmetrical methane is not. Polar water molecules grip each other with hydrogen bonds; methane has only the faint flicker of dispersion forces. That is the 262 °C difference, and the reason Earth has oceans.</p>
      <p>The same logic, scaled up, explains why metals bend, why salt shatters and why diamond is hard. Case closed.</p>`
  },
  cases: [
    {
      short: 'Dot Diaries', kicker: 'Lewis structures', titleHTML: 'Dot <em>Diaries</em>', item: 'The lazy nitrogen', ico: 'wind', teaser: 'Why won’t it react?',
      clue: 'Lewis structures show valence electrons as dots: shared pairs are bonds, unshared pairs are lone pairs, and most atoms end up with eight.',
      mystery: { q: 'Nitrogen gas makes up 78% of the air you breathe, and every living thing needs nitrogen. So why can’t plants or animals simply use the nitrogen in air?', h: ['It is too cold', 'Its two atoms are held by a triple bond, one of the strongest bonds in chemistry', 'It is poisonous to cells'], a: 1, v: 'Each nitrogen atom needs three more electrons for an octet, so the two atoms share <b>three pairs</b>: N≡N. That triple bond takes 945 kJ/mol to break, so N₂ hardly reacts at all. Only a few bacteria (and lightning, and the Haber process) can crack it open. Every protein in your body depends on them.' },
      story: `<p>In 1902 an American chemist, <strong>Gilbert N. Lewis</strong>, was teaching a class when he sketched atoms as cubes with an electron at each corner. Atoms, he suggested, are happiest when their outer cube is complete: <strong>eight</strong> electrons. In 1916 he published the idea that a chemical bond is a <strong>shared pair of electrons</strong>.</p>
        <p>His drawings, now called <strong>Lewis structures</strong>, are the simplest way to see a molecule’s wiring. Write each atom’s symbol, surround it with its outer (<em>valence</em>) electrons as dots, then pair them up. A pair shared between two atoms is a bond, drawn as a line. A pair that belongs to one atom only is a <strong>lone pair</strong>.</p>
        <p>Sometimes one shared pair isn’t enough to give everyone an octet. Then atoms share two pairs (a <strong>double bond</strong>, as in O=O and CO₂) or even three (a <strong>triple bond</strong>, N≡N). More shared pairs mean a shorter, stronger bond. Lewis was nominated for the Nobel Prize 41 times and never won.</p>`,
      lab: {
        label: 'Lewis workshop', title: 'Pair the dots, step by step',
        head: '<div class="controls" style="margin:0"><button class="btn small ghost prev">← Step</button><button class="btn primary small nxt">Next step →</button></div>',
        body: `<div class="pill-row mols" style="margin-bottom:12px"></div><div class="lab-grid"><div class="stage" style="height:330px"><svg class="svg-stage" viewBox="-200 -150 400 300" aria-label="Lewis structure drawing"></svg></div><div class="side-panel"><div class="info-card"><div class="meta stp"></div><h4 class="nm"></h4><p class="d" style="margin:0;font-size:14.5px;color:var(--soft)"></p></div><div class="info-card"><table class="tbl ledger"></table></div></div></div>`,
        init(root) {
          const V = { H: 1, C: 4, N: 5, O: 6, F: 7, Cl: 7 }, COL = { H: '#eef3ff', C: '#9aa3b8', N: '#6b8cff', O: '#ff5d5d', F: '#c6f36b', Cl: '#6fe3a0' };
          const M = {
            'H₂': { a: [['H', -40, 0, []], ['H', 40, 0, []]], b: [[0, 1, 1]], d: 'The simplest bond: two hydrogens share their single electrons. Each now has 2, a full shell like helium.' },
            'H₂O': { a: [['O', 0, -10, [-50, 230]], ['H', -70, 45, []], ['H', 70, 45, []]], b: [[0, 1, 1], [0, 2, 1]], d: 'Oxygen shares one pair with each hydrogen and keeps two lone pairs. Those lone pairs will matter enormously in the next case.' },
            'NH₃': { a: [['N', 0, -10, [270]], ['H', -75, 30, []], ['H', 75, 30, []], ['H', 0, 75, []]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], d: 'Nitrogen shares three pairs and keeps one lone pair: the pair that makes ammonia a base.' },
            'CH₄': { a: [['C', 0, 0, []], ['H', -80, 0, []], ['H', 80, 0, []], ['H', 0, -80, []], ['H', 0, 80, []]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], d: 'Carbon’s four valence electrons pair with four hydrogens. No lone pairs at all, which makes it perfectly symmetrical.' },
            'CO₂': { a: [['O', -90, 0, [135, 225]], ['C', 0, 0, []], ['O', 90, 0, [45, 315]]], b: [[0, 1, 2], [1, 2, 2]], d: 'Single bonds would leave carbon with only 6. So each oxygen shares two pairs: two double bonds, O=C=O.' },
            'N₂': { a: [['N', -45, 0, [180]], ['N', 45, 0, [0]]], b: [[0, 1, 3]], d: 'Each nitrogen needs three more electrons. They share three pairs at once, a triple bond, among the strongest in chemistry.' },
            'HCN': { a: [['H', -120, 0, []], ['C', -30, 0, []], ['N', 60, 0, [0]]], b: [[0, 1, 1], [1, 2, 3]], d: 'Hydrogen cyanide: a single bond to H, a triple bond to N. Count them: carbon 8, nitrogen 8, hydrogen 2.' }
          };
          let cur = 'H₂O', step = 0; const svg = $('svg', root);
          $('.mols', root).innerHTML = Object.keys(M).map(k => `<button class="btn small" data-k="${k}">${k}</button>`).join('');
          $('.mols', root).addEventListener('click', e => { const b = e.target.closest('button'); if (b) { cur = b.dataset.k; step = 0; draw(); } });
          $('.nxt', root).addEventListener('click', () => { step = Math.min(2, step + 1); draw(); }); $('.prev', root).addEventListener('click', () => { step = Math.max(0, step - 1); draw(); });
          const dot = (x, y) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#5ce1e6"/>`;
          function draw() {
            const m = M[cur]; $$('.mols button', root).forEach(b => b.classList.toggle('on', b.dataset.k === cur));
            let s = ''; const tot = m.a.reduce((t, a) => t + V[a[0]], 0);
            if (step === 0) {
              m.a.forEach(([e, x, y], i) => { const X = x * 1.5, Y = y * 1.5, n = V[e]; s += `<circle cx="${X}" cy="${Y}" r="22" fill="${rgba(COL[e], .15)}"/><text x="${X}" y="${Y + 9}" text-anchor="middle" font-family="Fraunces,serif" font-size="28" fill="${COL[e]}">${e}</text>`;
                const slots = [[0, -30], [30, 0], [0, 30], [-30, 0]]; slots.forEach(([dx, dy], k) => { if (k >= n) return; const two = k < n - 4; [two ? -7 : 0, ...(two ? [7] : [])].forEach(off => { s += dot(X + dx + (dy ? off : 0), Y + dy + (dx ? off : 0)); }); }); });
            } else {
              m.b.forEach(([i, j, o]) => { const [, x1, y1] = m.a[i], [, x2, y2] = m.a[j], L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L, ux = (x2 - x1) / L, uy = (y2 - y1) / L;
                for (let k = 0; k < o; k++) { const off = (k - (o - 1) / 2) * 9; s += `<line x1="${x1 + ux * 24 + nx * off}" y1="${y1 + uy * 24 + ny * off}" x2="${x2 - ux * 24 + nx * off}" y2="${y2 - uy * 24 + ny * off}" stroke="#eeedf7" stroke-width="3" stroke-linecap="round"/>`; } });
              m.a.forEach(([e, x, y, lp]) => { s += `<circle cx="${x}" cy="${y}" r="22" fill="${rgba(COL[e], .15)}"/><text x="${x}" y="${y + 9}" text-anchor="middle" font-family="Fraunces,serif" font-size="28" fill="${COL[e]}">${e}</text>`;
                lp.forEach(a => { const r = a * Math.PI / 180, cx = x + Math.cos(r) * 33, cy = y + Math.sin(r) * 33, px = -Math.sin(r) * 6, py = Math.cos(r) * 6; s += dot(cx + px, cy + py) + dot(cx - px, cy - py); }); });
              if (step === 2) m.a.forEach(([e, x, y, lp], i) => { const sh = m.b.filter(b => b[0] === i || b[1] === i).reduce((t, b) => t + 2 * b[2], 0) + 2 * lp.length, ok = sh === (e === 'H' ? 2 : 8); s += `<circle cx="${x}" cy="${y}" r="46" fill="none" stroke="${ok ? '#6fe3a0' : '#ff6b9a'}" stroke-dasharray="4 4" opacity=".8"/><text x="${x}" y="${y - 52}" text-anchor="middle" font-family="JetBrains Mono" font-size="12" fill="${ok ? '#6fe3a0' : '#ff6b9a'}">${sh} ${ok ? '✓' : ''}</text>`; });
            }
            svg.innerHTML = s;
            const bp = m.b.reduce((t, b) => t + b[2], 0), lp = m.a.reduce((t, a) => t + a[3].length, 0);
            $('.stp', root).textContent = ['STEP 1 · COUNT VALENCE ELECTRONS', 'STEP 2 · SHARE PAIRS, PLACE LONE PAIRS', 'STEP 3 · CHECK EVERY OCTET'][step];
            $('.nm', root).textContent = cur; $('.d', root).textContent = step === 0 ? `Each atom brings its outer electrons. Total: ${tot}. That’s ${tot / 2} pairs to place.` : m.d;
            $('.ledger', root).innerHTML = `<tr><th>Atom</th><th>Valence e⁻</th></tr>` + m.a.map(a => `<tr><td>${a[0]}</td><td>${V[a[0]]}</td></tr>`).join('') + `<tr><td><b>Total</b></td><td><b>${tot}</b> = ${bp} bonding pair${bp > 1 ? 's' : ''} + ${lp} lone pair${lp === 1 ? '' : 's'}</td></tr>`;
          }
          draw();
        }
      },
      lenses: ['Air, mostly nitrogen, flows around you and through your lungs without reacting with anything.', 'N₂ molecules: two nitrogen atoms locked together by three shared pairs of electrons.', ':N≡N:', 'Lines are shared pairs (bonds); dots are lone pairs. Each N has 3 × 2 + 2 = 8.'],
      miracle: { ico: 'bolt', title: 'Lightning fertilises the planet', html: '<p>A lightning bolt heats the air to about 30,000 °C, hot enough to rip N≡N triple bonds apart. The freed nitrogen atoms grab oxygen, and rain washes the resulting nitrates into the soil, where plants drink them up.</p><p>Lightning and soil bacteria were Earth’s only nitrogen-fixers until 1909, when Fritz Haber found a way to do it in a factory (you’ll meet him in Chemistry 107).</p>', c1: '#ffd36e', c2: '#6b8cff' },
      quiz: [
        { q: 'In a Lewis structure, what does a line between two atoms represent?', o: ['A single electron', 'A shared pair of electrons (a covalent bond)', 'A proton', 'A lone pair'], a: 1, w: 'Each line is one shared pair. A double bond is two lines (two pairs) and a triple bond is three.' },
        { q: 'How many lone pairs does the oxygen in water have?', o: ['0', '1', '2', '4'], a: 2, w: 'Oxygen has 6 valence electrons: 2 are used in two bonds (shared with H) and 4 remain as two lone pairs.' }
      ],
      prompt: { p: 'Explain why carbon dioxide needs double bonds, using the idea of the octet.', m: 'Carbon has 4 valence electrons and each oxygen has 6, a total of 16. If carbon made only single bonds to each oxygen, it would have just 4 electrons around it and each oxygen 6+1… the octets don’t work out. Sharing two pairs with each oxygen (O=C=O) gives carbon 8 (four shared pairs) and each oxygen 8 (two shared pairs + two lone pairs).' }
    },
    {
      short: 'Personal Space', kicker: 'VSEPR & molecular shape', titleHTML: 'Personal <em>Space</em>', item: 'The bent molecule', ico: 'drop', teaser: 'Why not straight?',
      clue: 'Electron pairs around a central atom repel each other and spread as far apart as possible. Lone pairs push hardest, bending molecules like water.',
      mystery: { q: 'Carbon dioxide (O=C=O) is a straight line. Water (H–O–H) is bent at 104.5°. Both have a central atom with two others attached. Why the difference?', h: ['Hydrogen is lighter, so it droops', 'Oxygen’s two invisible lone pairs push the hydrogens down into a V', 'Water is bent by its hydrogen bonds'], a: 1, v: 'Count the electron groups around the central atom. Carbon in CO₂ has two (two double bonds), so they sit opposite each other: <b>linear</b>. Oxygen in water has <b>four</b>: two bonds plus two lone pairs. They point to the corners of a tetrahedron, and the lone pairs (invisible but bulky) squeeze the H–O–H angle to 104.5°.' },
      story: `<p>Lewis dots tell you who is bonded to whom, but they are flat. Real molecules are three-dimensional, and their shape matters as much as their formula. Shape decides how a molecule smells, whether a drug fits its target, and whether a substance dissolves in water.</p>
        <p>The rule that predicts shape is wonderfully simple: <strong>electron pairs repel each other</strong>. Every bond and every lone pair around a central atom is a cloud of negative charge, and those clouds push apart until they are as far from each other as possible. Chemists call this <strong>VSEPR</strong>: Valence Shell Electron Pair Repulsion.</p>
        <p>Two groups point opposite each other (linear, 180°). Three spread into a flat triangle (120°). Four reach for the corners of a <strong>tetrahedron</strong> (109.5°). <strong>Lone pairs</strong> count as groups too, and push even harder than bonds, but they are invisible in the final shape. So ammonia is a pyramid and water is bent.</p>`,
      lab: {
        label: '3D shape viewer', title: 'Drag to spin; yellow clouds are lone pairs',
        head: '<div class="seg pick"></div>',
        body: `<div class="lab-grid"><div class="stage mol-stage"><canvas class="c" aria-label="3D model of the molecular shape"></canvas></div><div class="side-panel"><div class="info-card"><div class="meta f"></div><h4 class="nm"></h4><p class="d" style="margin:0;font-size:14.5px;color:var(--soft)"></p></div><div class="kv"><div><small>Electron groups</small><b class="g"></b></div><div><small>Lone pairs</small><b class="lp"></b></div><div><small>Bond angle</small><b class="an"></b></div></div><div class="legend lg"></div></div></div>`,
        init(root) {
          const t = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]].map(v => v.map(x => x / Math.sqrt(3)));
          const S = {
            lin: ['Linear', 'CO₂', 2, 0, '180°', 'Two electron groups get as far apart as possible: opposite sides. Carbon dioxide and the CO₂ you breathe out.', { atoms: [['C', 0, 0, 0], ['O', 1.16, 0, 0], ['O', -1.16, 0, 0]], bonds: [[0, 1, 2], [0, 2, 2]] }],
            tri: ['Trigonal planar', 'BF₃', 3, 0, '120°', 'Three groups spread into a flat triangle, like a peace sign. Boron trifluoride.', { atoms: [['B', 0, 0, 0], ...[90, 210, 330].map(a => ['F', 1.3 * Math.cos(a * Math.PI / 180), 1.3 * Math.sin(a * Math.PI / 180), 0])], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]] }],
            tet: ['Tetrahedral', 'CH₄', 4, 0, '109.5°', 'Four groups reach for the corners of a tetrahedron, a three-sided pyramid. The shape of methane, and of every carbon in a diamond.', { atoms: [['C', 0, 0, 0], ...t.map(v => ['H', ...v.map(x => x * 1.09)])], bonds: [1, 2, 3, 4].map(i => [0, i, 1]) }],
            pyr: ['Trigonal pyramidal', 'NH₃', 4, 1, '107°', 'Still four groups, but one is a lone pair. You see only the three hydrogens: a squat pyramid with nitrogen at the top.', { atoms: [['N', 0, 0, 0], ...t.slice(0, 3).map(v => ['H', ...v.map(x => x * 1.01)])], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], lobes: [[...t[3].map(x => x * .8), 0]] }],
            bent: ['Bent', 'H₂O', 4, 2, '104.5°', 'Four groups, two of them lone pairs. The two bulky lone pairs squeeze the hydrogens together into a V.', { atoms: [['O', 0, 0, 0], ...t.slice(0, 2).map(v => ['H', ...v.map(x => x * .96)])], bonds: [[0, 1, 1], [0, 2, 1]], lobes: t.slice(2).map(v => [...v.map(x => x * .8), 0]) }],
            tbp: ['Trigonal bipyramidal', 'PCl₅', 5, 0, '90° & 120°', 'Five groups: three around the equator, two at the poles. Phosphorus can hold more than eight because it has spare d orbitals.', { atoms: [['P', 0, 0, 0], ['Cl', 0, 2.1, 0], ['Cl', 0, -2.1, 0], ...[0, 120, 240].map(a => ['Cl', 2.0 * Math.cos(a * Math.PI / 180), 0, 2.0 * Math.sin(a * Math.PI / 180)])], bonds: [1, 2, 3, 4, 5].map(i => [0, i, 1]) }],
            oct: ['Octahedral', 'SF₆', 6, 0, '90°', 'Six groups, one along each axis: an octahedron. Sulfur hexafluoride is so heavy that it makes your voice deep.', { atoms: [['S', 0, 0, 0], ...[[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]].map(v => ['F', ...v.map(x => x * 1.56)])], bonds: [1, 2, 3, 4, 5, 6].map(i => [0, i, 1]) }]
          };
          let cur = 'bent';
          const show = k => { cur = k; const s = S[k]; $('.nm', root).textContent = s[0]; $('.f', root).textContent = s[1]; $('.g', root).textContent = s[2]; $('.lp', root).textContent = s[3]; $('.an', root).textContent = s[4]; $('.d', root).textContent = s[5]; $('.lg', root).innerHTML = legendFor(s[6]) + (s[6].lobes ? '<span><i style="background:#ffd36e"></i>Lone pair</span>' : ''); };
          seg($('.pick', root), Object.keys(S).map(k => [k, S[k][1]]), cur, show); show(cur);
          molViewer($('.c', root), $('.mol-stage', root), () => S[cur][6]);
        }
      },
      lenses: ['You can’t see molecular shapes, but you can smell them: your nose identifies many molecules by how their shape fits a receptor.', 'Bonding pairs and lone pairs around the central atom spread into the shape that keeps them farthest apart.', 'AX₂E₂ → bent', 'VSEPR shorthand: A = central atom, X = bonded atoms, E = lone pairs.'],
      miracle: { ico: 'heart', title: 'Medicines are shaped like keys', html: '<p>Most drugs work because their shape fits a pocket in a protein, like a key in a lock. Change a single bond angle and the key no longer turns. Chemists design new medicines on computers by testing which shapes fit.</p><p>Your sense of smell works the same way: around 400 different receptor shapes in your nose combine to recognise thousands of odours.</p>', c1: '#ff6b9a', c2: '#a78bfa' },
      quiz: [
        { q: 'What is the shape of methane (CH₄), with four bonds and no lone pairs on carbon?', o: ['Square planar', 'Tetrahedral', 'Linear', 'Bent'], a: 1, w: 'Four groups point to the corners of a tetrahedron, 109.5° apart.' },
        { q: 'Ammonia (NH₃) has four electron groups around N but is described as "trigonal pyramidal". Why?', o: ['One group is a lone pair, which is invisible in the shape', 'Nitrogen has only three electrons', 'Hydrogen bonds pull it flat', 'It is actually tetrahedral'], a: 0, w: 'The electron groups are tetrahedral, but we describe the shape by the atoms only: three H plus N on top makes a pyramid.' }
      ],
      prompt: { p: 'Explain why water is bent but carbon dioxide is straight.', m: 'Electron groups around a central atom repel and spread out as far as possible. Carbon in CO₂ has only two groups (two double bonds), so they point in opposite directions: a straight line. Oxygen in water has four groups (two bonds and two lone pairs), arranged roughly as a tetrahedron. The lone pairs aren’t seen as atoms, so the visible shape is a V with an angle of 104.5°.' }
    },
    {
      short: 'Tug of War', kicker: 'Electronegativity & polarity', titleHTML: 'Tug of <em>War</em>', item: 'The oil and water', ico: 'drop', teaser: 'Why won’t they mix?',
      clue: 'When atoms share electrons unequally, the bond is polar. A molecule with polar bonds and an unsymmetrical shape is polar overall, like a tiny magnet.',
      mystery: { q: 'Shake oil and water together as hard as you like: within minutes they separate. Why won’t they mix?', h: ['Oil is lighter than water', 'Polar water molecules cling to each other and squeeze out the non-polar oil molecules', 'Oil molecules repel water molecules'], a: 1, v: 'Water molecules are <b>polar</b>: bent, with a negative oxygen end and positive hydrogen ends. They attract each other strongly. Oil molecules are long, <b>non-polar</b> hydrocarbon chains with no charged ends to offer. Water sticks to water so much better than to oil that it squeezes the oil out into its own layer. "Like dissolves like."' },
      story: `<p>A covalent bond is a shared pair of electrons, but sharing isn’t always fair. Each element pulls on shared electrons with a different strength, called its <strong>electronegativity</strong>. In 1932 <strong>Linus Pauling</strong> put numbers on it: fluorine 4.0 at the top, oxygen 3.4, carbon 2.6, hydrogen 2.2, sodium 0.9.</p>
        <p>When two atoms with similar electronegativity bond (C–H, or two identical atoms), the electrons sit in the middle: a <strong>non-polar</strong> bond. When one pulls much harder, the electrons drift towards it, giving it a slight negative charge (δ−) and leaving its partner slightly positive (δ+): a <strong>polar</strong> bond. If the difference is huge, the electron is simply taken, and the bond becomes <strong>ionic</strong>.</p>
        <p>Whether a whole molecule is polar depends on its <strong>shape</strong>, too. CO₂ has two polar bonds, but they point in opposite directions and cancel. Water’s bent shape means its polar bonds add up, making the whole molecule a dipole.</p>`,
      lab: {
        label: 'Electron tug-of-war', title: 'Pick two atoms and let them pull',
        body: `<div class="stage" style="height:280px"><canvas class="c" aria-label="Two atoms sharing electrons unequally"></canvas></div>
          <div class="lab-grid" style="margin-top:14px;grid-template-columns:1fr 1fr"><div><div class="meta">LEFT ATOM</div><div class="pill-row la" style="margin-top:6px"></div><div class="meta" style="margin-top:12px">RIGHT ATOM</div><div class="pill-row ra" style="margin-top:6px"></div></div>
          <div class="info-card"><div class="meta">ELECTRONEGATIVITY DIFFERENCE</div><div class="big-read dd"></div><div style="position:relative;height:14px;border-radius:7px;margin:10px 0 4px;background:linear-gradient(90deg,#6fe3a0 0 12%,#f4c35a 12% 55%,#ff6b9a 55%)"><i class="mk" style="position:absolute;top:-4px;width:4px;height:22px;background:#fff;border-radius:2px"></i></div><div class="legend" style="justify-content:space-between;margin:0"><span>non-polar</span><span>polar covalent</span><span>ionic</span></div><p class="t" style="margin:10px 0 0;font-size:14.5px;color:var(--soft)"></p></div></div>`,
        init(root) {
          const E = { H: [2.2, '#eef3ff'], C: [2.55, '#9aa3b8'], N: [3.04, '#6b8cff'], O: [3.44, '#ff5d5d'], F: [3.98, '#c6f36b'], Cl: [3.16, '#6fe3a0'], Na: [.93, '#b38cff'], K: [.82, '#ff9f5a'], Li: [.98, '#ff8fc8'] };
          let L = 'H', R = 'O';
          const mk = (sel, cur, set) => { const el = $(sel, root); el.innerHTML = Object.keys(E).map(k => `<button class="btn small" data-k="${k}">${k} <span style="opacity:.5">${E[k][0]}</span></button>`).join(''); el.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { set(b.dataset.k); upd(); } }); };
          mk('.la', L, k => L = k); mk('.ra', R, k => R = k);
          let shift = 0, tgt = 0;
          function upd() { $$('.la button', root).forEach(b => b.classList.toggle('on', b.dataset.k === L)); $$('.ra button', root).forEach(b => b.classList.toggle('on', b.dataset.k === R));
            const d = E[R][0] - E[L][0], ad = Math.abs(d); tgt = clamp(d / 2.2, -1, 1); $('.dd', root).textContent = ad.toFixed(2); $('.mk', root).style.left = `calc(${clamp(ad / 3.3, 0, 1) * 100}% - 2px)`;
            const kind = ad < .4 ? 'non' : ad < 1.8 ? 'polar' : 'ionic'; const hi = d > 0 ? R : L, lo = d > 0 ? L : R;
            $('.t', root).innerHTML = L === R ? `Identical atoms pull equally: a perfectly <b>non-polar</b> bond, as in ${L}₂.` : kind === 'non' ? `A tiny difference: the electrons stay nearly centred. A <b>non-polar</b> bond, like the C–H bonds in oil and wax.` : kind === 'polar' ? `<b>${hi}</b> pulls harder. The shared electrons spend more time near it, so ${hi} becomes δ− and ${lo} δ+. A <b>polar covalent</b> bond.` : `The difference is so large that <b>${hi}</b> simply takes the electron. The result is ions, ${lo}⁺ and ${hi}⁻: an <b>ionic</b> bond.`; }
          upd();
          const c = $('.c', root);
          animate(c, (dt, t) => { shift += (tgt - shift) * Math.min(1, dt * 4); const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); const cx = w / 2, cy = h / 2, sep = Math.min(220, w * .3), lx = cx - sep / 2, rx = cx + sep / 2, ion = Math.abs(shift) > .78;
            const ex = cx + shift * sep * .55; const g = ctx.createRadialGradient(ex, cy, 0, ex, cy, sep * .9); g.addColorStop(0, 'rgba(92,225,230,.45)'); g.addColorStop(1, 'rgba(92,225,230,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(ex, cy, sep * (ion ? .55 : .9), 70, 0, 0, TAU); ctx.fill();
            if (!ion) { ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(lx, cy); ctx.lineTo(rx, cy); ctx.stroke(); }
            const rL = 26 + (3.5 - E[L][0]) * 6, rR = 26 + (3.5 - E[R][0]) * 6; glow(ctx, lx, cy, rL * 2, E[L][1], .4); ball(ctx, E[L][1], lx - (ion && shift > 0 ? 10 : 0), cy, rL); glow(ctx, rx, cy, rR * 2, E[R][1], .4); ball(ctx, E[R][1], rx + (ion && shift < 0 ? 10 : 0), cy, rR);
            label(ctx, L, lx, cy + 7, { align: 'center', font: '700 20px Inter,sans-serif', color: '#141625' }); label(ctx, R, rx, cy + 7, { align: 'center', font: '700 20px Inter,sans-serif', color: '#141625' });
            for (let i = 0; i < 2; i++) { const a = t * 5 + i * Math.PI; const px = ex + Math.cos(a) * 14, py = cy + Math.sin(a * 1.3) * 10 - 34; glow(ctx, px, py, 14, '#5ce1e6', 1); ball(ctx, '#5ce1e6', px, py, 5); }
            const dl = Math.abs(shift) < .12 ? ['', ''] : shift > 0 ? (ion ? ['+', '−'] : ['δ+', 'δ−']) : (ion ? ['−', '+'] : ['δ−', 'δ+']);
            label(ctx, dl[0], lx, cy - rL - 16, { align: 'center', font: '600 18px "JetBrains Mono"', color: dl[0].includes('−') ? '#5ce1e6' : '#ff9fbd' }); label(ctx, dl[1], rx, cy - rR - 16, { align: 'center', font: '600 18px "JetBrains Mono"', color: dl[1].includes('−') ? '#5ce1e6' : '#ff9fbd' });
            label(ctx, 'shared electron pair', ex, cy + 70, { align: 'center', size: 10, color: '#8f8eab' }); });
        }
      },
      lenses: ['Vinegar and oil salad dressing separates into layers; soap lets them mix.', 'Polar water molecules stick to each other by their charged ends; non-polar oil molecules have nothing to offer them.', 'δ+H–Oδ− &nbsp; vs &nbsp; C–H', 'ΔEN of O–H is 1.24 (polar); C–H is only 0.35 (non-polar).'],
      miracle: { ico: 'drop', title: 'How soap works', html: '<p>A soap molecule is a double agent: one end is charged and loves water; the long tail is non-polar and loves grease. In dishwater, the tails burrow into grease droplets while the charged heads face outward, wrapping the grease in tiny balls called <strong>micelles</strong> that water can rinse away.</p><p>The same trick lets bile in your gut break up the fat from your dinner so enzymes can digest it.</p>', c1: '#5ce1e6', c2: '#ff6b9a' },
      quiz: [
        { q: 'Which bond is most polar?', o: ['C–H', 'H–F', 'Cl–Cl', 'C–C'], a: 1, w: 'Fluorine (4.0) vs hydrogen (2.2): a difference of 1.8, the largest here. Identical atoms (Cl–Cl, C–C) have zero.' },
        { q: 'CO₂ has two polar C=O bonds, yet the molecule is non-polar. Why?', o: ['The bonds are actually non-polar', 'It is linear, so the two bond dipoles point in opposite directions and cancel', 'Carbon has no electrons', 'It is a gas'], a: 1, w: 'Polarity of a molecule depends on bond polarity AND shape. Symmetrical shapes cancel the dipoles out.' }
      ],
      prompt: { p: 'Explain the phrase "like dissolves like" using water, oil and salt.', m: 'Polar substances mix with polar ones and non-polar with non-polar. Water is polar, so it can surround and pull apart charged ions in salt, and salt dissolves. Oil is non-polar: water molecules attract each other much more than they attract oil, so they squeeze the oil out and the two separate. Oil would mix with another non-polar liquid such as petrol.' }
    },
    {
      short: 'The Sticky Forces', kicker: 'Intermolecular forces', titleHTML: 'The Sticky <em>Forces</em>', item: 'The gecko on the ceiling', ico: 'mountain', teaser: 'How does it hold on?',
      clue: 'Molecules attract each other through intermolecular forces: dispersion (all molecules, grows with size), dipole–dipole, and the strongest, hydrogen bonds.',
      mystery: { q: 'A gecko can run upside down across a glass ceiling with no glue, suction or claws. What holds it there?', h: ['Tiny suction cups on its toes', 'Billions of tiny hairs touching the glass, each adding a whisper of van der Waals attraction', 'Static electricity from its skin'], a: 1, v: 'A gecko’s toes carry about two million hairs, each splitting into hundreds of even tinier tips. Each tip gets so close to the surface that fleeting electron fluctuations attract it: a <b>van der Waals (dispersion) force</b>. Each one is almost nothing, but billions of them add up to enough to hold the gecko’s weight many times over.' },
      story: `<p>Bonds hold atoms together <em>inside</em> molecules. But something must also hold molecules to <em>each other</em>, or every liquid and solid would fly apart into gas. These attractions are the <strong>intermolecular forces</strong>, roughly a hundred times weaker than real bonds, and they decide boiling points, surface tension and whether things stick.</p>
        <p>Every molecule feels <strong>London dispersion forces</strong>. Electrons are always sloshing around, so for an instant one side of a molecule is slightly negative, which nudges the electrons in its neighbour, and the two briefly attract. The bigger the molecule (more electrons), the stronger the effect. Polar molecules add <strong>dipole–dipole</strong> attraction between their δ+ and δ− ends.</p>
        <p>Strongest of all is the <strong>hydrogen bond</strong>: a hydrogen attached to N, O or F is so stripped of electrons that it acts almost like a bare proton, and it latches onto a lone pair on a neighbouring molecule. Water has two such hydrogens and two lone pairs per molecule, the perfect recipe for a sticky web.</p>`,
      lab: {
        label: 'Boiling-point detective', title: 'Spot the molecules that cheat',
        body: `<div class="lab-grid"><div class="stage" style="height:380px;padding:6px"><canvas class="c" aria-label="Boiling points of hydrides and noble gases by period"></canvas></div><div class="side-panel"><div class="pill-row ser"></div><div class="info-card"><div class="meta mm">CLICK A POINT</div><h4 class="nm">Find the outliers</h4><p class="d" style="margin:0;font-size:14.5px;color:var(--soft)">Along each line, boiling point rises as molecules get bigger, thanks to stronger dispersion forces. But three molecules break the pattern completely. Click them.</p></div></div></div>`,
        init(root) {
          const S = [
            ['Group 14', '#9aa3b8', ['CH₄', 'SiH₄', 'GeH₄', 'SnH₄'], [-162, -112, -88, -52], 'dispersion only'],
            ['Group 15', '#6b8cff', ['NH₃', 'PH₃', 'AsH₃', 'SbH₃'], [-33, -88, -62, -17], 'dipole–dipole + dispersion'],
            ['Group 16', '#ff5d5d', ['H₂O', 'H₂S', 'H₂Se', 'H₂Te'], [100, -60, -41, -2], 'dipole–dipole + dispersion'],
            ['Group 17', '#6fe3a0', ['HF', 'HCl', 'HBr', 'HI'], [20, -85, -67, -35], 'dipole–dipole + dispersion'],
            ['Noble gases', '#a78bfa', ['Ne', 'Ar', 'Kr', 'Xe'], [-246, -186, -153, -108], 'dispersion only']
          ];
          const HB = { 'NH₃': 1, 'H₂O': 1, 'HF': 1 }; let on = S.map(() => true), sel = null, P = null;
          $('.ser', root).innerHTML = S.map((s, i) => `<button class="btn small on" data-i="${i}" style="border-color:${s[1]}">${s[0]}</button>`).join('');
          $('.ser', root).addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const i = +b.dataset.i; on[i] = !on[i]; b.classList.toggle('on', on[i]); draw(); });
          const c = $('.c', root);
          function draw() { P = plot(c, { x: [1.7, 5.3], y: [-260, 120], xt: [2, 3, 4, 5], xf: v => 'period ' + v, yt: [-250, -200, -150, -100, -50, 0, 50, 100], yf: v => v + '°', xl: 'size of molecule →', yl: 'boiling point (°C)', series: S.filter((_, i) => on[i]).map(s => ({ pts: s[3].map((v, k) => [k + 2, v]), color: s[1], dots: true })), hlines: [{ y: 20, color: 'rgba(255,255,255,.3)', label: 'room temperature' }], marks: sel ? [{ x: sel[0], y: sel[1], color: '#fff', label: sel[2] }] : [] }); }
          draw(); new ResizeObserver(draw).observe(c);
          c.addEventListener('click', e => { const r = c.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top; let best = null, bd = 900;
            S.forEach((s, i) => { if (!on[i]) return; s[3].forEach((v, k) => { const d = (P.X(k + 2) - mx) ** 2 + (P.Y(v) - my) ** 2; if (d < bd) { bd = d; best = [k + 2, v, s[2][k], s]; } }); });
            if (!best) return; sel = best; draw(); const nm = best[2];
            $('.mm', root).textContent = `${best[3][0].toUpperCase()} · BOILS AT ${best[1]} °C`; $('.nm', root).textContent = nm;
            $('.d', root).innerHTML = HB[nm] ? `<b style="color:var(--gold)">An outlier, thanks to hydrogen bonding!</b> ${nm} has H attached directly to ${nm === 'HF' ? 'F' : nm === 'NH₃' ? 'N' : 'O'}, so its molecules grip each other with hydrogen bonds. Without them, ${nm} would boil far below 0 °C.${nm === 'H₂O' ? ' Water would boil at about −80 °C, and there would be no liquid oceans.' : ''}` : `Forces: <b>${best[3][4]}</b>. ${best[0] > 2 ? 'Bigger molecules have more electrons, so their dispersion forces are stronger and the boiling point is higher.' : 'Small molecule, few electrons, weak dispersion forces, low boiling point.'}`; });
        }
      },
      lenses: ['Water beads up on a leaf; a paper clip can float on water; insects walk on a pond.', 'Water molecules at the surface are pulled inward by hydrogen bonds to their neighbours, creating a stretchy "skin": surface tension.', 'O–H ··· :O', 'The dotted line is a hydrogen bond: an H on one molecule attracted to a lone pair on another.'],
      miracle: { ico: 'dna', title: 'Hydrogen bonds zip up your DNA', html: '<p>The two strands of your DNA are held together by <strong>hydrogen bonds</strong> between bases: two between A and T, three between G and C. They are strong enough to keep your genetic code stable for a lifetime, yet weak enough to be unzipped by enzymes every time a cell divides or reads a gene.</p><p>If those links were real covalent bonds, life couldn’t copy itself. If they were mere dispersion forces, the code would fall apart at body temperature.</p>', c1: '#a78bfa', c2: '#5ce1e6' },
      quiz: [
        { q: 'Why does water have a much higher boiling point than H₂S, even though H₂S is a bigger molecule?', o: ['Water is heavier', 'Water molecules form hydrogen bonds; H₂S molecules barely do', 'H₂S is more polar', 'Water has stronger covalent bonds'], a: 1, w: 'O–H hydrogens latch onto oxygen lone pairs on neighbouring molecules. Sulfur is too large and not electronegative enough for strong hydrogen bonds.' },
        { q: 'Going down the noble gases from neon to xenon, boiling points rise. Why?', o: ['They become polar', 'Bigger atoms have more electrons, so stronger dispersion forces', 'They form hydrogen bonds', 'They become metals'], a: 1, w: 'Dispersion forces grow with the number of electrons: more electrons, bigger fluctuating dipoles, stronger attraction.' }
      ],
      prompt: { p: 'Explain what actually happens to the molecules when water boils, and why it takes so much energy.', m: 'Boiling separates whole water molecules from each other; it doesn’t break the O–H bonds inside them. To escape into the gas, each molecule has to break free of the hydrogen bonds holding it to its neighbours. Water has many strong hydrogen bonds per molecule, so a lot of energy is needed, which is why water boils at 100 °C while similar-sized methane boils at −162 °C.' }
    },
    {
      short: 'Giant Structures', kicker: 'Metallic, ionic & covalent lattices', titleHTML: 'Giant <em>Structures</em>', item: 'The spoon and the salt', ico: 'gem', teaser: 'Bend or shatter?',
      clue: 'Some substances are one giant lattice. Metals are ions in a sea of free electrons (they bend and conduct); ionic crystals shatter when like charges are pushed together.',
      mystery: { q: 'Hit a metal spoon with a hammer and it bends. Hit a large salt crystal and it shatters. Why?', h: ['Metal is just stronger', 'In metal, ions can slide through a sea of shared electrons; in salt, shifting a layer pushes like charges together and they repel', 'Salt contains water that freezes and cracks'], a: 1, v: 'In a metal, positive ions sit in a <b>sea of free electrons</b> that glues them in any position, so layers can slide without breaking. In salt, + and − ions alternate. Shift one layer by a single ion and suddenly + sits next to + and − next to −. They <b>repel</b>, and the crystal splits along a clean plane.' },
      story: `<p>Not every substance is made of separate molecules. Some are <strong>giant structures</strong>: one continuous lattice of atoms or ions, billions of billions strong, held together in every direction.</p>
        <p>In a <strong>metal</strong>, atoms give up their outer electrons to a shared <strong>“sea”</strong> that flows freely among the positive ions. That sea explains almost everything about metals: they conduct electricity (the electrons can move), they shine (the electrons reflect light), and they bend instead of breaking (the ions can slide while the sea holds them).</p>
        <p><strong>Ionic</strong> crystals like salt are lattices of alternating + and − ions: hard, with high melting points, but brittle. And in <strong>covalent networks</strong>, every atom is bonded to its neighbours by real covalent bonds. Diamond is a single molecule the size of the gem, each carbon locked to four others, which makes it the hardest natural material. Graphite is the same carbon arranged in flat sheets that slide over each other, which is why pencils write.</p>`,
      lab: {
        label: 'Hammer test', title: 'Strike the lattice',
        head: '<div class="controls" style="margin:0"><div class="seg md"></div><button class="btn primary small hit">🔨 Strike</button><button class="btn small volt">Apply voltage</button></div>',
        body: `<div class="stage" style="height:340px"><canvas class="c" aria-label="Lattice of ions being struck by a hammer"></canvas></div><p class="readout msg" style="margin-top:12px"></p>`,
        init(root) {
          let mode = 'metal', shift = 0, split = 0, volt = false, struck = false; const c = $('.c', root); let es = [];
          const msg = () => { $('.msg', root).innerHTML = mode === 'metal' ? (struck ? '<b style="color:var(--green)">It bends.</b> The top layers slid along by one ion, and the electron sea still holds everything together. Metals are malleable.' : 'Positive metal ions (gold) in a sea of free electrons (cyan). Try <b>Apply voltage</b>: the sea flows, which is an electric current.') : (struck ? (split > .1 ? '<b style="color:var(--pink)">It shatters!</b> Shifting one layer put + next to + and − next to −. The repulsion splits the crystal cleanly.' : 'Layers shifting…') : 'Alternating Na⁺ (violet) and Cl⁻ (green). No free electrons, so no current flows even with a voltage applied.'); };
          seg($('.md', root), [['metal', 'Metal'], ['ionic', 'Salt']], mode, k => { mode = k; shift = 0; split = 0; struck = false; msg(); });
          $('.hit', root).addEventListener('click', () => { shift = 0; split = 0; struck = true; msg(); tween(reduceMotion ? 10 : 900, k => { shift = ease(k); }, () => { if (mode === 'ionic') tween(reduceMotion ? 10 : 900, k => { split = ease(k); msg(); }); msg(); }); });
          $('.volt', root).addEventListener('click', () => { volt = !volt; $('.volt', root).classList.toggle('on', volt); });
          msg();
          animate(c, (dt, t) => { const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); const cols = 12, rows = 6, s = Math.min((w - 40) / cols, (h - 40) / rows), ox = (w - s * (cols - 1)) / 2, oy = (h - s * (rows - 1)) / 2;
            if (es.length !== 70) es = Array.from({ length: 70 }, () => ({ x: Math.random() * w, y: oy - s / 2 + Math.random() * s * rows, vx: (Math.random() - .5) * 120, vy: (Math.random() - .5) * 120 }));
            const top = rows / 2;
            for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) { const up = r < top, x = ox + q * s + (up ? shift * s : 0), y = oy + r * s - (up ? split * 60 : 0) + Math.sin(t * 8 + q + r * 3) * 1.2;
              if (mode === 'metal') { glow(ctx, x, y, s * .6, '#f4c35a', .35); ball(ctx, '#f4c35a', x, y, s * .3); label(ctx, '+', x, y + 4, { align: 'center', font: '700 12px Inter', color: '#3a2a00' }); }
              else { const plus = ((q + r) % 2 === 0); ball(ctx, plus ? '#b38cff' : '#6fe3a0', x, y, plus ? s * .26 : s * .36); label(ctx, plus ? '+' : '−', x, y + 4, { align: 'center', font: '700 12px Inter', color: '#141625' }); } }
            if (mode === 'ionic' && shift > .6 && split < .05) { for (let q = 0; q < cols; q++) { const x = ox + q * s + s * .5; glow(ctx, x, oy + (top - .5) * s, 18, '#ff6b9a', Math.min(1, (shift - .6) * 2.5)); } }
            if (mode === 'metal') for (const e of es) { e.x += (e.vx + (volt ? 140 : 0)) * dt; e.y += e.vy * dt; if (e.y < oy - s / 2 || e.y > oy + s * (rows - .5)) e.vy *= -1; if (e.x > w) e.x -= w; if (e.x < 0) e.x += w; if (Math.random() < dt * 2) { e.vx = (Math.random() - .5) * 160; e.vy = (Math.random() - .5) * 160; } glow(ctx, e.x, e.y, 8, '#5ce1e6', .9); ball(ctx, '#5ce1e6', e.x, e.y, 2.5); }
            if (volt) { label(ctx, mode === 'metal' ? 'current flows →' : 'no free charges: no current', w - 14, 20, { align: 'right', size: 11, color: mode === 'metal' ? '#5ce1e6' : '#ff9fbd' }); } });
        }
      },
      lenses: ['A copper wire bends and carries current; a diamond scratches glass; a salt crystal cracks into smaller cubes.', 'Metals: ions in an electron sea. Salt: alternating ions. Diamond: every carbon covalently bonded to four others in 3D.', 'Na⁺Cl⁻ (lattice) &nbsp;·&nbsp; C (diamond)', 'Giant structures have no fixed molecule size: the formula gives only the ratio of atoms.'],
      miracle: { ico: 'gem', title: 'Pencil lead and diamonds are the same element', html: '<p>Both are pure carbon. In <strong>diamond</strong>, every atom is bonded to four others in a rigid 3D network: the hardest natural material known. In <strong>graphite</strong>, carbons form flat hexagonal sheets held to each other only by weak dispersion forces, so the sheets slide off onto your paper as you write.</p><p>Peel off a single sheet and you have <strong>graphene</strong>: one atom thick, stronger than steel, and a superb conductor. Its discoverers first isolated it in 2004 using sticky tape, and won a Nobel Prize for it six years later.</p>', c1: '#c4cbe0', c2: '#5ce1e6' },
      quiz: [
        { q: 'Why do metals conduct electricity?', o: ['Their ions move freely', 'They have a sea of delocalised electrons that can flow', 'They contain water', 'They are magnetic'], a: 1, w: 'The outer electrons belong to the whole lattice and drift when a voltage is applied, which is a current.' },
        { q: 'Diamond and graphite are both pure carbon. Graphite is soft and slippery because…', o: ['its carbon atoms are lighter', 'it has flat layers held together by weak forces, which slide', 'it contains metal', 'it is a liquid'], a: 1, w: 'Within each sheet the bonds are strong, but the sheets are held together only by weak dispersion forces.' }
      ],
      prompt: { p: 'Explain why salt dissolves in water and conducts electricity when molten, but not when solid.', m: 'Salt is a lattice of Na⁺ and Cl⁻ ions. In the solid the ions are locked in place, so no charges can move and it doesn’t conduct. When it melts or dissolves, the ions are freed and can move towards the electrodes, carrying current. Water dissolves it because its polar molecules surround and pull the ions out of the lattice.' }
    }
  ],
  extra: [
    { c: 1, q: 'How many valence electrons does a carbon atom have?', o: ['2', '4', '6', '8'], a: 1, w: 'Carbon is in group 14: four outer electrons, so it forms four bonds.' },
    { c: 2, q: 'What bond angle do you find in a tetrahedral molecule like methane?', o: ['90°', '109.5°', '120°', '180°'], a: 1, w: 'The four corners of a tetrahedron are 109.5° apart.' },
    { c: 3, q: 'Which molecule is polar?', o: ['CO₂', 'CH₄', 'H₂O', 'O₂'], a: 2, w: 'Water has polar bonds and a bent shape, so its dipoles add up. The others are symmetrical or have non-polar bonds.' },
    { c: 4, q: 'Which intermolecular force is present between ALL molecules?', o: ['Hydrogen bonds', 'Dipole–dipole forces', 'London dispersion forces', 'Ionic bonds'], a: 2, w: 'Every molecule has electrons that can fluctuate, so dispersion forces are universal.' },
    { c: 5, q: 'Why is diamond so hard?', o: ['It is a metal', 'Every carbon is covalently bonded to four others in a 3D network', 'It has hydrogen bonds', 'It is ionic'], a: 1, w: 'Breaking diamond means breaking many strong covalent bonds at once.' }
  ],
  cards: [
    [1, 'What is a valence electron?', 'An electron in the outermost shell; these take part in bonding.'],
    [1, 'Bonding pair vs lone pair?', 'A bonding pair is shared between two atoms (a bond); a lone pair belongs to one atom only.'],
    [1, 'Single, double, triple bond?', 'One, two or three shared pairs. More pairs: shorter, stronger bond.'],
    [1, 'Why is N₂ so unreactive?', 'Its two atoms are joined by a very strong triple bond (945 kJ/mol).'],
    [2, 'What does VSEPR stand for?', 'Valence Shell Electron Pair Repulsion: electron groups spread as far apart as possible.'],
    [2, 'Shapes for 2, 3, 4 electron groups?', 'Linear (180°), trigonal planar (120°), tetrahedral (109.5°).'],
    [2, 'Shape of water and why?', 'Bent (104.5°): four groups, two of which are lone pairs.'],
    [2, 'Shape of ammonia?', 'Trigonal pyramidal: three bonds plus one lone pair.'],
    [3, 'What is electronegativity?', 'How strongly an atom attracts shared electrons in a bond.'],
    [3, 'Non-polar, polar, ionic: ΔEN ranges?', 'Roughly: < 0.4 non-polar; 0.4–1.8 polar covalent; > 1.8 ionic.'],
    [3, 'What makes a molecule polar overall?', 'Polar bonds AND an unsymmetrical shape, so the dipoles don’t cancel.'],
    [3, '"Like dissolves like" means…', 'Polar dissolves polar; non-polar dissolves non-polar.'],
    [4, 'Three intermolecular forces, weakest to strongest?', 'London dispersion < dipole–dipole < hydrogen bonding.'],
    [4, 'When can hydrogen bonds form?', 'When H is bonded to N, O or F and is attracted to a lone pair on N, O or F of another molecule.'],
    [4, 'Why do dispersion forces increase with size?', 'More electrons, so larger temporary dipoles.'],
    [4, 'Does boiling break covalent bonds?', 'No. It overcomes intermolecular forces between molecules.'],
    [5, 'Metallic bonding?', 'Positive ions in a sea of delocalised electrons.'],
    [5, 'Why are ionic crystals brittle?', 'Shifting a layer brings like charges together, which repel and split the crystal.'],
    [5, 'Diamond vs graphite?', 'Diamond: 3D network, each C bonded to 4. Graphite: layers, each C bonded to 3, with weak forces between layers.']
  ]
};
