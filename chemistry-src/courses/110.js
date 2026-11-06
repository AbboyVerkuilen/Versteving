/* ---------- helper: complete a skeleton with hydrogens ---------- */
function withH(atoms, bonds) {
  const A = atoms.map(a => a.slice()), B = bonds.map(b => b.slice()), VAL = { C: 4, O: 2, N: 3 };
  const v = (a, b) => [b[1] - a[1], b[2] - a[2], b[3] - a[3]], nrm = x => { const l = Math.hypot(...x) || 1; return x.map(q => q / l); }, add = (a, b, k = 1) => a.map((q, i) => q + b[i] * k), cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const heavy = A.length;
  for (let i = 0; i < heavy; i++) {
    const at = A[i], val = VAL[at[0]]; if (!val) continue;
    const nb = B.filter(b => b[0] === i || b[1] === i), used = nb.reduce((s, b) => s + b[2], 0), need = val - used; if (need <= 0) continue;
    const dirs = nb.map(b => nrm(v(at, A[b[0] === i ? b[1] : b[0]]))); let out = [];
    if (dirs.length === 0) out = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]].map(nrm);
    else if (dirs.length === 1) { const n = dirs[0]; let u = nrm(cross(n, Math.abs(n[0]) < .9 ? [1, 0, 0] : [0, 1, 0])); const w = cross(n, u); out = [0, 1, 2].map(k => { const t = k * TAU / 3 + .5; return nrm(add(n.map(q => -q * .334), add(u.map(q => q * Math.cos(t) * .943), w.map(q => q * Math.sin(t) * .943)))); }); }
    else if (dirs.length === 2) { const b = nrm(add(dirs[0], dirs[1]).map(q => -q)), p = nrm(cross(dirs[0], dirs[1])); out = need === 1 ? [b] : [nrm(add(b.map(q => q * .577), p.map(q => q * .816))), nrm(add(b.map(q => q * .577), p.map(q => -q * .816)))]; }
    else out = [nrm(add(add(dirs[0], dirs[1]), dirs[2]).map(q => -q))];
    out.slice(0, need).forEach(d => { const hlen = at[0] === 'C' ? 1.09 : 1.0; A.push(['H', at[1] + d[0] * hlen, at[2] + d[1] * hlen, at[3] + d[2] * hlen, at[4]]); B.push([i, A.length - 1, 1]); });
  }
  const cx = A.reduce((s, a) => s + a[1], 0) / A.length, cy = A.reduce((s, a) => s + a[2], 0) / A.length, cz = A.reduce((s, a) => s + a[3], 0) / A.length;
  return { atoms: A.map(a => [a[0], a[1] - cx, a[2] - cy, a[3] - cz, a[4]]), bonds: B };
}
function chain(n) { const at = [], bd = []; for (let i = 0; i < n; i++) { at.push(['C', i * 1.27, (i % 2) * .85, 0]); if (i) bd.push([i - 1, i, 1]); } return withH(at, bd); }
const COURSE = {
  id: '110', title: 'The Carbon Code', brand: 'The <i>Carbon</i> Code',
  eyebrow: 'Chemistry 110 · Organic chemistry, polymers & the molecules of life', titleHTML: 'The <em>Carbon</em> Code',
  lede: 'One element builds diamonds, petrol, plastic, perfume and the DNA that wrote you. A mystery about the most versatile atom in the universe, and the language it writes in.',
  accent: ['#6fe3a0', '#a78bfa'],
  cast: {
    Wo: { name: 'Friedrich', full: 'Wöhler', color: '#ff9f5a', title: 'Made a molecule of life from minerals', sym: 'Wö' },
    Ke: { name: 'August', full: 'Kekulé', color: '#a78bfa', title: 'Dreamt of a snake biting its own tail', sym: 'Ke' },
    RF: { name: 'Rosalind', full: 'Franklin', color: '#6fe3a0', title: 'Photographed the shape of life', sym: 'RF' }
  },
  prologue: {
    short: 'The Living Element', kicker: 'The case begins', titleHTML: 'The Living <em>Element</em>',
    story: `<p>Chemists have catalogued well over a hundred million different compounds. The overwhelming majority contain one element: <strong>carbon</strong>. Hardly any other element can do what it does: link to itself in chains thousands long, in rings, in branches and cages, and hold onto hydrogen, oxygen, nitrogen and more along the way.</p>
      <p>For centuries people believed the molecules of living things (sugars, fats, urea) carried a mysterious <em>vital force</em> and could never be made from lifeless minerals. In 1828 a young German chemist, <strong>Friedrich Wöhler</strong>, heated a simple mineral salt, ammonium cyanate, and made urea, a compound of urine. He wrote excitedly to his mentor that he could make urea "without needing kidneys". The wall between living and non-living chemistry had a crack in it.</p>
      <p>This final series of case files follows Cass, the carbon atom you met in Chemistry 101, into the world she builds: fuels, perfumes, plastics, and the molecule that carries your genetic code.</p>`,
    cast: [['C', 'happy'], ['Wo', 'happy'], ['Ke', 'sly'], ['RF', 'happy'], ['H', 'happy']]
  },
  finale: {
    q: 'How can one element build a candle, a perfume, a plastic bottle and you?', lead: 'Chains, mirror twins, personality groups, giant polymers and the double helix. All of it is written in the same alphabet.',
    avatar: 'C', nameHTML: 'Carbon’s <em>four hands</em>',
    html: `<p>Carbon has <strong>four outer electrons</strong>, so it forms four strong bonds, to other carbons as readily as to anything else. That simple fact allows chains, rings and branches of almost any length and shape.</p>
      <p>Chain length sets whether a hydrocarbon is a gas, a liquid fuel or a wax. Carbon’s tetrahedral bonds create isomers and mirror-image twins your nose can tell apart. A few atoms of oxygen or nitrogen, the functional groups, give molecules their personality: sour, fruity, fishy. Link thousands of small units and you get polymers: plastics and proteins. And string four kinds of base along a sugar-phosphate backbone and you can store the instructions for a human being.</p>
      <p>From the electron (101) to the code of life (110): every case file in this series has been the same story, told at a different scale. Case closed. The mystery of chemistry continues, and now you can read it.</p>`
  },
  cases: [
    {
      short: 'Chains of Carbon', kicker: 'Hydrocarbons & alkanes', titleHTML: 'Chains of <em>Carbon</em>', item: 'Gas, petrol and candle wax', ico: 'flame', teaser: 'Same atoms, three states?',
      clue: 'Alkanes are chains of carbon with hydrogens (CₙH₂ₙ₊₂). Longer chains have more surface for dispersion forces, so boiling points rise: from gas to liquid to wax.',
      mystery: { q: 'The gas in a camping stove, the petrol in a car and the wax of a candle are all made only of carbon and hydrogen. Why is one a gas, one a liquid and one a solid?', h: ['They contain different isotopes', 'Longer carbon chains have more contact, so stronger dispersion forces hold them together', 'Wax is cooled petrol'], a: 1, v: 'They are all <b>alkanes</b>, but of different lengths. Butane in the stove has 4 carbons; petrol is mostly 5–10; candle wax is 20–40. Longer chains touch their neighbours along more of their length, so the <b>dispersion forces</b> add up, and much more energy is needed to pull them apart.' },
      story: `<p>The simplest organic molecules are <strong>hydrocarbons</strong>: only carbon and hydrogen. The simplest family of these are the <strong>alkanes</strong>, chains of carbon atoms joined by single bonds, with hydrogens filling every remaining hand. Their formula is <strong>CₙH₂ₙ₊₂</strong>.</p>
        <p>Their names follow a code: <em>meth-</em> (1 carbon), <em>eth-</em> (2), <em>prop-</em> (3), <em>but-</em> (4), then Greek numbers: <em>pent-</em>, <em>hex-</em>, <em>hept-</em>, <em>oct-</em>… plus the ending <em>-ane</em>. Crude oil is a jumble of thousands of them, separated in refineries by <strong>fractional distillation</strong>: heated, they boil off in order of chain length, gases at the top of the column and tars at the bottom.</p>
        <p>Because each carbon’s four bonds point to the corners of a tetrahedron, real chains aren’t straight. They <strong>zigzag</strong>, and can twist and fold like a necklace.</p>`,
      lab: {
        label: 'Chain builder', title: 'Add carbons one at a time',
        body: `<div class="lab-grid"><div><div class="stage mol-stage" style="height:330px"><canvas class="c" aria-label="3D model of an alkane chain"></canvas></div><div class="slider-row" style="margin-top:14px"><label>Carbons</label><input type="range" class="n" min="1" max="12" value="4" style="--track:linear-gradient(90deg,#3a3f66,#9aa3b8)"><span class="readout"><b class="no"></b></span></div></div>
          <div class="side-panel"><div class="info-card"><div class="meta f"></div><h4 class="nm"></h4><p class="d" style="margin:0;font-size:14px;color:var(--soft)"></p></div><div class="info-card"><canvas class="g" style="width:100%;height:170px" aria-label="Boiling point against chain length"></canvas></div></div></div>`,
        init(root) {
          const NM = ['Methane', 'Ethane', 'Propane', 'Butane', 'Pentane', 'Hexane', 'Heptane', 'Octane', 'Nonane', 'Decane', 'Undecane', 'Dodecane'];
          const BP = [-162, -89, -42, -1, 36, 69, 98, 126, 151, 174, 196, 216];
          const USE = ['Natural gas: the blue flame of a gas stove.', 'Part of natural gas; turned into the plastic polyethylene.', 'Bottled gas for barbecues and campervans.', 'Camping-stove and lighter fuel.', 'A volatile liquid, part of petrol.', 'A solvent for extracting cooking oils.', 'Part of petrol; the zero point of the octane rating.', 'The heart of petrol: "octane" ratings measure resistance to knocking.', 'Part of kerosene (jet fuel).', 'Part of kerosene and diesel.', 'In diesel fuel.', 'Jet fuel and diesel; still liquid, but getting oily.'];
          let n = 4, mol = chain(4);
          slider($('.n', root), v => { n = v; mol = chain(v); $('.no', root).textContent = v; $('.f', root).innerHTML = sub(`C${v}H${2 * v + 2}`).replace('C<sub>1</sub>', 'C'); $('.nm', root).textContent = NM[v - 1];
            const st = BP[v - 1] < 20 ? 'a gas' : 'a liquid'; $('.d', root).innerHTML = `Boils at <b>${BP[v - 1]} °C</b>: at room temperature it is ${st}. ${USE[v - 1]}`;
            plot($('.g', root), { x: [0, 13], y: [-180, 240], xt: [1, 4, 8, 12], yt: [-150, -100, -50, 0, 50, 100, 150, 200], yf: v => v + '°', xl: 'carbons in chain', yl: 'boiling point', series: [{ pts: BP.map((b, i) => [i + 1, b]), color: '#9aa3b8', dots: true }], hlines: [{ y: 20, color: 'rgba(255,255,255,.3)', label: 'room temp' }], marks: [{ x: v, y: BP[v - 1], color: '#6fe3a0' }] }); });
          molViewer($('.c', root), $('.mol-stage', root), () => mol, { zoom: .42, spinX: true });
        }
      },
      lenses: ['A blue gas flame, a can of petrol, a candle. Wax is so long-chained it is solid at room temperature.', 'Long zigzag chains lying side by side, held together by dispersion forces that grow with every extra carbon.', 'CₙH₂ₙ₊₂ &nbsp; e.g. C₈H₁₈', 'The alkane formula. Every carbon has four single bonds.'],
      miracle: { ico: 'flame', title: 'Crude oil is ancient sunlight', html: '<p>Crude oil formed from microscopic marine plankton that died in ancient seas, mostly between about 10 and 160 million years ago. Buried under sediment, heat and pressure broke their molecules into a soup of hydrocarbon chains.</p><p>Burning those chains releases sunlight that plankton captured by photosynthesis, along with carbon that had been locked away for millions of years. That’s why fossil-fuel CO₂ adds to the atmosphere rather than recycling it.</p>', c1: '#f4c35a', c2: '#ff9f5a' },
      quiz: [
        { q: 'What is the formula of the alkane with 5 carbons (pentane)?', o: ['C₅H₁₀', 'C₅H₁₂', 'C₅H₅', 'C₅H₈'], a: 1, w: 'CₙH₂ₙ₊₂: 2 × 5 + 2 = 12.' },
        { q: 'Why does decane (10 C) boil at a higher temperature than butane (4 C)?', o: ['It has more hydrogen bonds', 'Longer chains have stronger dispersion forces between molecules', 'It contains oxygen', 'Its covalent bonds are stronger'], a: 1, w: 'More surface contact and more electrons mean stronger intermolecular attractions.' }
      ],
      prompt: { p: 'Explain how a refinery separates crude oil into fuels, using the idea of chain length.', m: 'Crude oil is a mixture of hydrocarbons of different chain lengths. In fractional distillation it is heated and the vapour rises up a column that is hot at the bottom and cool at the top. Short chains have weak intermolecular forces and low boiling points, so they rise high before condensing (gases, petrol). Long chains have stronger forces and condense lower down (diesel, lubricating oil, wax).' }
    },
    {
      short: 'Twins & Mirrors', kicker: 'Isomers & chirality', titleHTML: 'Twins & <em>Mirrors</em>', item: 'Spearmint and caraway', ico: 'leaf', teaser: 'Same formula, different smell?',
      clue: 'Isomers have the same formula but different arrangements. Some are mirror images (chiral) and can smell or act completely differently.',
      mystery: { q: 'Spearmint leaves and caraway seeds smell completely different. Yet their main scent molecule, carvone, has exactly the same atoms bonded in exactly the same order. How?', h: ['One is contaminated', 'They are mirror images of each other, like left and right hands, and your nose can tell them apart', 'The difference is temperature'], a: 1, v: 'Carvone comes in two forms that are <b>mirror images</b> of each other, like your left and right hands: same atoms, same bonds, but they can’t be superimposed. Smell receptors are themselves made of chiral molecules, so they fit one hand better than the other. One form smells of <b>spearmint</b>, its mirror twin of <b>caraway</b>.' },
      story: `<p>In the 1850s chemists found something baffling: substances with the <em>same</em> formula but different properties. They are called <strong>isomers</strong>. Butane and methylpropane are both C₄H₁₀, but one is a straight chain and the other branched, so they boil at different temperatures. Ethanol (an alcohol) and dimethyl ether are both C₂H₆O, yet one is in drinks and the other is a gas used in aerosols.</p>
        <p>In 1874 a 22-year-old Dutch student, <strong>Jacobus van ’t Hoff</strong>, made a bold proposal: carbon’s four bonds point to the corners of a tetrahedron. A consequence: if a carbon carries four <em>different</em> groups, there are two ways to arrange them, mirror images of each other that can’t be overlapped, like your hands. Such molecules are called <strong>chiral</strong> (from the Greek for hand). Van ’t Hoff later won the very first Nobel Prize in Chemistry, in 1901.</p>
        <p>Chirality matters enormously, because the molecules of life are chiral too. In the 1950s the drug thalidomide was sold as a mixture of both mirror forms; one helped with morning sickness, but the drug caused terrible birth defects. Today, drug regulators require each mirror form to be tested.</p>`,
      lab: {
        label: 'Isomer viewer', title: 'Compare the twins',
        head: '<div class="seg pair"></div>',
        body: `<div class="lab-grid" style="grid-template-columns:1fr 1fr"><div><div class="stage mol-stage s1" style="height:300px"><canvas class="c1" aria-label="First isomer"></canvas></div><div class="info-card" style="margin-top:10px"><h4 class="n1" style="font-size:20px"></h4><p class="d1" style="margin:0;font-size:14px;color:var(--soft)"></p></div></div><div><div class="stage mol-stage s2" style="height:300px"><canvas class="c2" aria-label="Second isomer"></canvas></div><div class="info-card" style="margin-top:10px"><h4 class="n2" style="font-size:20px"></h4><p class="d2" style="margin:0;font-size:14px;color:var(--soft)"></p></div></div></div><p class="hint tx" style="margin-top:12px"></p>`,
        init(root) {
          const but = withH([['C', 0, 0, 0], ['C', 1.27, .85, 0], ['C', 2.54, 0, 0], ['C', 3.81, .85, 0]], [[0, 1, 1], [1, 2, 1], [2, 3, 1]]);
          const iso = withH([['C', 0, 0, 0], ['C', 1.5, 0, 0], ['C', -.5, 1.42, 0], ['C', -.5, -.71, 1.23]], [[0, 1, 1], [0, 2, 1], [0, 3, 1]]);
          const eth = withH([['C', 0, 0, 0], ['C', 1.52, 0, 0], ['O', 2.0, 1.33, 0]], [[0, 1, 1], [1, 2, 1]]);
          const dme = withH([['C', 0, 0, 0], ['O', 1.2, .8, 0], ['C', 2.4, 0, 0]], [[0, 1, 1], [1, 2, 1]]);
          const tet = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]].map(v => v.map(q => q / Math.sqrt(3)));
          const chi = (sw) => { const g = ['H', 'F', 'Cl', 'Br'], L = { H: 1.09, F: 1.35, Cl: 1.77, Br: 1.94 }; const order = sw ? [0, 1, 3, 2] : [0, 1, 2, 3]; return { atoms: [['C', 0, 0, 0, 1], ...order.map((gi, k) => [g[gi], ...tet[k].map(q => q * L[g[gi]])])], bonds: [1, 2, 3, 4].map(i => [0, i, 1]) }; };
          const PAIRS = {
            chain: ['Butane', 'Boils at −1 °C. A straight (zigzag) chain: camping-stove fuel.', but, 'Methylpropane', 'Boils at −12 °C. Branched and more compact, so less contact between molecules.', iso, 'Same formula, C₄H₁₀, different skeletons: <b>structural isomers</b>.'],
            group: ['Ethanol', 'Boils at 78 °C. An alcohol with an O–H group, so it hydrogen-bonds. In drinks and hand gel.', eth, 'Dimethyl ether', 'Boils at −24 °C. The oxygen sits between two carbons: no O–H, no hydrogen bonds. An aerosol propellant.', dme, 'Both are C₂H₆O. Same atoms, different connections, completely different substances.'],
            mirror: ['"Left hand"', 'A carbon (highlighted) with four different atoms: H, F, Cl, Br.', chi(false), '"Right hand"', 'The mirror image: chlorine and bromine have swapped places. Try rotating one to match the other: you can’t.', chi(true), 'Mirror-image isomers (<b>enantiomers</b>): identical in every way except their handedness. Carvone’s two forms smell of spearmint and caraway.']
          };
          let cur = 'chain';
          const show = k => { cur = k; const p = PAIRS[k]; $('.n1', root).textContent = p[0]; $('.d1', root).textContent = p[1]; $('.n2', root).textContent = p[3]; $('.d2', root).textContent = p[4]; $('.tx', root).innerHTML = p[6]; };
          seg($('.pair', root), [['chain', 'Chain vs branch'], ['group', 'Alcohol vs ether'], ['mirror', 'Mirror twins']], cur, show); show(cur);
          molViewer($('.c1', root), $('.s1', root), () => PAIRS[cur][2], { zoom: .4, spinX: true }); molViewer($('.c2', root), $('.s2', root), () => PAIRS[cur][5], { zoom: .4, glow: '#a78bfa', spinX: true });
        }
      },
      lenses: ['Spearmint gum versus rye bread with caraway; your left and right hands, which don’t fit the same glove.', 'Same atoms, different 3D arrangement. Receptors in your nose and body are chiral, so they fit one form better than its mirror image.', 'C₄H₁₀: butane / methylpropane', 'Isomers share a molecular formula but differ in structure.'],
      miracle: { ico: 'dna', title: 'Life is left-handed', html: '<p>Almost all the amino acids in your proteins are the "left-handed" (L) form, and the sugars in your DNA are "right-handed" (D). Mirror-image versions occur in nature, but life on Earth chose one hand of each and stuck with it.</p><p>Nobody knows exactly why. Some scientists suspect a small bias delivered by polarised light in space, or by meteorites, amplified over billions of years. A mirror-image bacterium couldn\'t digest our food, and we couldn\'t digest it.</p>', c1: '#6fe3a0', c2: '#a78bfa' },
      quiz: [
        { q: 'What are isomers?', o: ['Atoms of the same element with different neutrons', 'Compounds with the same formula but different structures', 'Molecules with the same smell', 'Different elements in the same group'], a: 1, w: 'Same molecular formula, different arrangement of atoms. (Atoms with different neutrons are isotopes.)' },
        { q: 'When is a carbon atom chiral (a "handed" centre)?', o: ['When it has a double bond', 'When it is bonded to four different groups', 'When it is in a ring', 'Always'], a: 1, w: 'Four different groups allow two non-superimposable mirror-image arrangements.' }
      ],
      prompt: { p: 'Explain why your hands are a good model for chiral molecules.', m: 'Your left and right hands are mirror images: they have the same parts in the same order, yet you can’t place one exactly on top of the other; a left glove won’t fit a right hand. A carbon with four different groups is the same: its two mirror forms have identical atoms and bonds but can’t be superimposed. Like gloves, the receptors in your body fit only one hand properly, so the two forms can smell or act differently.' }
    },
    {
      short: 'Personalities', kicker: 'Functional groups', titleHTML: 'Molecular <em>Personalities</em>', item: 'The pear-drop smell', ico: 'flower', teaser: 'Vinegar + alcohol = fruit?',
      clue: 'Functional groups (–OH, –COOH, –COO–, –NH₂, C=O) give organic molecules their characteristic reactions, smells and uses.',
      mystery: { q: 'Warm vinegar (acetic acid) with ethanol and a drop of acid, and the sharp smell turns into the sweet scent of pear drops. What happened?', h: ['The mixture boiled away', 'The acid group and the alcohol group joined to form an ester, a new molecule with a fruity smell', 'The vinegar went off'], a: 1, v: 'The <b>carboxylic acid</b> group (–COOH) of acetic acid reacted with the <b>alcohol</b> group (–OH) of ethanol. They joined, releasing a molecule of water, to make <b>ethyl ethanoate</b>, an <b>ester</b>. Esters give fruits much of their scent: bananas, pineapples and pears all owe their aroma to esters.' },
      story: `<p>A long carbon chain on its own is fairly dull: it burns, and not much else. What gives organic molecules their <em>personality</em> is a small cluster of other atoms attached somewhere along the chain: a <strong>functional group</strong>.</p>
        <p>Add an <strong>–OH</strong> and you have an <strong>alcohol</strong>: water-friendly, from the ethanol in drinks to the menthol in mint. Add <strong>–COOH</strong> and you have a <strong>carboxylic acid</strong>: sour, like vinegar or the sting of an ant. Put an oxygen double-bonded to carbon in the middle of a chain and you have a <strong>ketone</strong>, like acetone in nail-polish remover. Nitrogen as <strong>–NH₂</strong> gives an <strong>amine</strong>: the fishy smell of fish and the building blocks of proteins.</p>
        <p>Functional groups react in predictable ways, whatever chain they’re attached to. Chemists learn the groups, not the millions of molecules. Join an acid and an alcohol and you get an <strong>ester</strong>, the chemistry of fruit flavours and perfumes.</p>`,
      lab: {
        label: 'Functional group gallery', title: 'Pick a personality',
        head: '<div class="seg fg"></div>',
        body: `<div class="lab-grid"><div class="stage mol-stage" style="height:340px"><canvas class="c" aria-label="3D model with the functional group highlighted"></canvas></div><div class="side-panel"><div class="info-card"><div class="meta f"></div><h4 class="nm"></h4><div class="mono grp" style="color:var(--gold);margin:4px 0 8px"></div><p class="d" style="margin:0;font-size:14.5px;color:var(--soft)"></p></div><p class="hint" style="font-size:12.5px">The glowing atoms are the functional group. Drag to rotate.</p><div class="legend lg"></div></div></div>`,
        init(root) {
          const G = {
            alc: ['Alcohol', 'Ethanol · C₂H₅OH', '–OH', 'Hydroxyl group: makes molecules water-friendly and able to hydrogen-bond. Found in drinks, hand sanitiser and sugars.', withH([['C', 0, 0, 0], ['C', 1.52, 0, 0], ['O', 2.0, 1.33, 0, 1]], [[0, 1, 1], [1, 2, 1]])],
            acid: ['Carboxylic acid', 'Ethanoic (acetic) acid · CH₃COOH', '–COOH', 'Sour and able to donate H⁺. Vinegar, citrus, the sting of ants, and the "acid" in amino acids.', withH([['C', 0, 0, 0], ['C', 1.5, 0, 0, 1], ['O', 2.15, 1.05, 0, 1], ['O', 2.2, -1.1, 0, 1]], [[0, 1, 1], [1, 2, 2], [1, 3, 1]])],
            ester: ['Ester', 'Ethyl ethanoate · CH₃COOC₂H₅', '–COO–', 'Formed from an acid and an alcohol. Sweet, fruity smells: pear drops, nail varnish, banana and pineapple flavours.', withH([['C', 0, 0, 0], ['C', 1.5, 0, 0, 1], ['O', 2.15, 1.05, 0, 1], ['O', 2.2, -1.1, 0, 1], ['C', 3.6, -1.1, 0], ['C', 4.3, .15, 0]], [[0, 1, 1], [1, 2, 2], [1, 3, 1], [3, 4, 1], [4, 5, 1]])],
            ket: ['Ketone', 'Propanone (acetone) · CH₃COCH₃', 'C=O', 'A carbonyl group in the middle of the chain. Acetone dissolves nail polish and is made by your body when it burns fat.', withH([['C', 0, 0, 0], ['C', 1.5, 0, 0, 1], ['C', 2.25, -1.3, 0], ['O', 2.15, 1.05, 0, 1]], [[0, 1, 1], [1, 2, 1], [1, 3, 2]])],
            ald: ['Aldehyde', 'Ethanal · CH₃CHO', '–CHO', 'A carbonyl at the end of the chain. Aldehydes give us the scents of cinnamon (cinnamaldehyde) and vanilla (vanillin).', withH([['C', 0, 0, 0], ['C', 1.5, 0, 0, 1], ['O', 2.15, 1.05, 0, 1]], [[0, 1, 1], [1, 2, 2]])],
            amine: ['Amine', 'Methylamine · CH₃NH₂', '–NH₂', 'Contains nitrogen and acts as a base. Responsible for the smell of fish; the "amino" in amino acids.', withH([['C', 0, 0, 0], ['N', 1.47, 0, 0, 1]], [[0, 1, 1]])]
          };
          let cur = 'ester';
          const show = k => { cur = k; const g = G[k]; $('.nm', root).textContent = g[0]; $('.f', root).textContent = g[1]; $('.grp', root).textContent = 'Functional group: ' + g[2]; $('.d', root).textContent = g[3]; $('.lg', root).innerHTML = legendFor(g[4]); };
          seg($('.fg', root), Object.keys(G).map(k => [k, G[k][0]]), cur, show); show(cur);
          molViewer($('.c', root), $('.mol-stage', root), () => G[cur][4], { zoom: .4, spinX: true });
        }
      },
      lenses: ['The tang of vinegar, the fruity smell of pear drops, the sharp smell of nail-polish remover, the whiff of fish.', 'Small groups of O and N atoms change how molecules attract each other and react, whatever chain they hang from.', 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O', 'Esterification: acid + alcohol ⇌ ester + water (acid catalyst).'],
      miracle: { ico: 'flower', title: 'A banana’s scent is one ester', html: '<p>The characteristic smell of banana comes largely from a single ester, isoamyl acetate. It’s also the alarm pheromone of honeybees: when a bee stings, it releases isoamyl acetate to summon its sisters. Beekeepers are advised not to eat bananas before visiting the hive.</p><p>Fruit flavourings in sweets are mostly cheap synthetic esters, which is why "banana" sweets taste like a cartoon of a banana.</p>', c1: '#f4d35a', c2: '#6fe3a0' },
      quiz: [
        { q: 'Which functional group makes a molecule an alcohol?', o: ['–COOH', '–OH', '–NH₂', 'C=C'], a: 1, w: 'The hydroxyl group, –OH, defines alcohols.' },
        { q: 'An acid reacts with an alcohol. What forms?', o: ['A ketone and hydrogen', 'An ester and water', 'An amine', 'Carbon dioxide'], a: 1, w: 'Esterification: acid + alcohol ⇌ ester + water.' }
      ],
      prompt: { p: 'Why do chemists learn functional groups instead of memorising millions of molecules?', m: 'Functional groups behave in much the same way whatever carbon chain they’re attached to. Every alcohol has an –OH that can hydrogen-bond and react in similar ways; every carboxylic acid is sour and donates H⁺; every acid plus alcohol makes an ester. Learn a few dozen groups and you can predict how millions of molecules will smell, dissolve and react.' }
    },
    {
      short: 'Chains of Chains', kicker: 'Polymers', titleHTML: 'Chains of <em>Chains</em>', item: 'The everlasting bottle', ico: 'bottle', teaser: 'Why won’t it rot?',
      clue: 'Polymers are giant molecules made by linking thousands of small monomers. Their long, tangled chains make them strong and flexible, and very hard to break down.',
      mystery: { q: 'A banana peel rots in a few weeks. A plastic bottle can last for centuries. Both are made of carbon chains. Why won’t the plastic rot?', h: ['Plastic is poisonous to everything', 'Its chains are long, unreactive C–C backbones that almost no microbe has enzymes to cut', 'Plastic is protected by its colour'], a: 1, v: 'Plastics like polyethylene and PET are <b>polymers</b>: chains of thousands of repeating units with tough carbon backbones. Living things evolved enzymes to break down natural polymers such as cellulose, but plastics have existed for only about a century, and almost no organism has enzymes that fit them. Sunlight slowly breaks them into microplastics rather than making them disappear.' },
      story: `<p>In the 1920s the German chemist <strong>Hermann Staudinger</strong> made a claim his colleagues ridiculed: rubber, cellulose and silk were not loose clumps of small molecules, but <strong>macromolecules</strong>: single molecules made of thousands of atoms linked in long chains. He was right, and won the Nobel Prize in 1953.</p>
        <p>A <strong>polymer</strong> (Greek: "many parts") is made by linking small molecules called <strong>monomers</strong>. Ethene, CH₂=CH₂, can open its double bond and join hands with the next ethene, again and again, until a chain of tens of thousands forms: <strong>poly(ethene)</strong>, polyethylene, the most common plastic on Earth. It was discovered by accident in 1933 at ICI in England, when a high-pressure experiment produced a strange white waxy solid.</p>
        <p>Polymers are everywhere in nature too. Starch and cellulose are chains of glucose; proteins are chains of amino acids; DNA is a chain of nucleotides. Chain length and how chains pack together decide whether a polymer is soft wax, a stretchy bag or a bulletproof fibre.</p>`,
      lab: {
        label: 'Polymer reactor', title: 'Link the monomers',
        head: '<div class="controls" style="margin:0"><button class="btn primary small go">Polymerise</button><button class="btn small ghost rs">Reset</button></div>',
        body: `<div class="stage" style="height:330px"><canvas class="c" aria-label="Ethene monomers linking into a polyethylene chain"></canvas></div><div class="lab-grid" style="margin-top:14px;grid-template-columns:1fr 1fr"><div class="slider-row"><label>Chain length</label><input type="range" class="n" min="1" max="5" value="5" style="--track:linear-gradient(90deg,#3a3f66,#6fe3a0)"><span class="readout"><b class="no"></b></span></div><div class="info-card"><p class="tx" style="margin:0;font-size:14px;color:var(--soft)"></p></div></div>`,
        init(root) {
          const LV = [[10, 'Gas / oily liquid', 'Short chains slide past each other easily, like a few strands of spaghetti.'], [50, 'Soft wax', 'Like paraffin candle wax: chains tangle a little but still slip.'], [500, 'Soft plastic', 'Low-density polyethylene: carrier bags and cling film. Chains tangle well, and the material stretches.'], [5000, 'Tough plastic', 'High-density polyethylene: milk bottles and crates. Long chains pack and tangle strongly.'], [100000, 'Ultra-strong fibre', 'Ultra-high-molecular-weight polyethylene: chains of a hundred thousand units, aligned into fibres stronger than steel, used in bulletproof vests and ropes.']];
          let lv = 4, k = 0, done = false; const c = $('.c', root); let mon = [];
          slider($('.n', root), v => { lv = v - 1; const L = LV[lv]; $('.no', root).textContent = '~' + L[0].toLocaleString('en') + ' units'; $('.tx', root).innerHTML = `<b>${L[1]}.</b> ${L[2]}`; });
          $('.go', root).addEventListener('click', () => { if (done) return; tween(reduceMotion ? 10 : 3500, q => k = q, () => done = true); });
          $('.rs', root).addEventListener('click', () => { k = 0; done = false; mon = []; });
          animate(c, (dt, t) => { const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); const N = 22;
            if (!mon.length) for (let i = 0; i < N; i++) mon.push({ x: 30 + Math.random() * (w - 60), y: 30 + Math.random() * (h - 60), a: Math.random() * TAU, vx: (Math.random() - .5) * 30, vy: (Math.random() - .5) * 30 });
            const sp = (w - 60) / N, cy = h / 2;
            const pos = mon.map((m, i) => { m.x += m.vx * dt * (1 - k); m.y += m.vy * dt * (1 - k); if (m.x < 20 || m.x > w - 20) m.vx *= -1; if (m.y < 20 || m.y > h - 20) m.vy *= -1; const f = clamp(k * N * 1.2 - i * .9, 0, 1), tx = 30 + sp * (i + .5), ty = cy + (i % 2 ? 14 : -14) + (done ? Math.sin(t * 2 + i * .5) * 18 : 0); return { x: lerp(m.x, tx, ease(f)), y: lerp(m.y, ty, ease(f)), a: lerp(m.a, 0, f), f }; });
            for (let i = 0; i < N - 1; i++) { const a = pos[i], b = pos[i + 1]; if (a.f > .98 && b.f > .98) { ctx.strokeStyle = '#cfd5e6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(a.x + 9, a.y); ctx.lineTo(b.x - 9, b.y); ctx.stroke(); } }
            pos.forEach(p => { const dx = Math.cos(p.a) * 9, dy = Math.sin(p.a) * 9; ctx.strokeStyle = '#cfd5e6'; ctx.lineWidth = 2.5; if (p.f < .98) { ctx.beginPath(); ctx.moveTo(p.x - dx - dy * .25, p.y - dy + dx * .25); ctx.lineTo(p.x + dx - dy * .25, p.y + dy + dx * .25); ctx.moveTo(p.x - dx + dy * .25, p.y - dy - dx * .25); ctx.lineTo(p.x + dx + dy * .25, p.y + dy - dx * .25); ctx.stroke(); } else { ctx.beginPath(); ctx.moveTo(p.x - dx, p.y - dy); ctx.lineTo(p.x + dx, p.y + dy); ctx.stroke(); }
              ball(ctx, '#8d95ab', p.x - dx, p.y - dy, 7); ball(ctx, '#8d95ab', p.x + dx, p.y + dy, 7); [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([sx, sy]) => ball(ctx, '#eef3ff', p.x + sx * (dx + 6) + (sy * 7) * (p.f > .98 ? 0 : 0), p.y + sy * 12 + sx * dy, 3.5)); });
            label(ctx, k < .01 ? 'ethene monomers: CH₂=CH₂ (double bond)' : done ? 'poly(ethene): –(CH₂–CH₂)ₙ–   (only 22 units shown)' : 'double bonds open and link…', 14, 20, { size: 11, color: '#c9c8dc' }); });
        }
      },
      lenses: ['Carrier bags, milk bottles, nylon tights, a rubber band, a strand of wool.', 'Thousands of monomer units joined into chains that tangle like spaghetti, so they don’t slide apart easily.', 'n CH₂=CH₂ → –(CH₂–CH₂)ₙ–', 'Addition polymerisation: each double bond opens to link to its neighbours. n can be tens of thousands.'],
      miracle: { ico: 'bottle', title: 'Bacteria learning to eat plastic', html: '<p>In 2016 Japanese scientists found a bacterium, <i>Ideonella sakaiensis</i>, living at a bottle-recycling site. It had evolved enzymes able to break down PET, the plastic of drinks bottles, into its monomers.</p><p>Researchers have since engineered faster versions of these enzymes, which can break PET down into monomers to be made into new bottles. Evolution, it seems, is beginning to catch up with plastic.</p>', c1: '#6fe3a0', c2: '#5ca8ff' },
      quiz: [
        { q: 'What is a monomer?', o: ['A giant molecule', 'A small molecule that links with others to form a polymer', 'A type of plastic bag', 'A single atom'], a: 1, w: 'Monomers ("one part") join into polymers ("many parts").' },
        { q: 'Why are many plastics so slow to biodegrade?', o: ['They are radioactive', 'Microbes lack enzymes able to break their strong carbon backbones', 'They are made of metal', 'They dissolve in water'], a: 1, w: 'Enzymes are shape-specific, and few have evolved to fit synthetic polymers.' }
      ],
      prompt: { p: 'Explain why longer polymer chains make a stronger plastic, using a spaghetti analogy.', m: 'A short polymer is like a handful of short pieces of spaghetti: they slide past each other easily, so the material is soft or waxy. Long chains are like very long spaghetti: they tangle, and each strand touches many others along its length, so intermolecular forces add up. Pulling the material apart means untangling and dragging many long chains past each other, which takes much more force.' }
    },
    {
      short: 'The Code of Life', kicker: 'DNA & biomolecules', titleHTML: 'The Code of <em>Life</em>', item: 'The instruction molecule', ico: 'dna', teaser: 'How does a molecule store you?',
      clue: 'DNA is a double helix: two sugar-phosphate backbones joined by base pairs (A–T, G–C) held by hydrogen bonds. The order of bases is the code.',
      mystery: { q: 'Every cell in your body carries the full instructions to build you. How can a chemical molecule store information?', h: ['In the weight of the molecule', 'In the order of four kinds of base along a chain, like letters in a sentence', 'In its electric charge'], a: 1, v: 'DNA is a polymer whose units come in four kinds: the bases <b>A, T, G and C</b>. Their <b>order</b> along the chain is a code, like letters spelling words. About 3 billion base pairs, 2 metres of DNA packed into each cell, spell out roughly 20,000 genes. Because A always pairs with T and G with C, each strand is a template for copying the other.' },
      story: `<p>By 1950 scientists knew genes were made of DNA, but not what it looked like. At King’s College London, <strong>Rosalind Franklin</strong> fired X-rays through carefully prepared DNA fibres. Her 1952 image, <strong>Photo 51</strong>, showed an unmistakable X pattern: the signature of a <strong>helix</strong>.</p>
        <p>In Cambridge, <strong>James Watson</strong> and <strong>Francis Crick</strong> saw the photo, shown to them without her knowledge, and combined it with her measurements to build their model in 1953: a <strong>double helix</strong>, two strands twisting around each other, with bases pointing inwards and pairing up: <strong>A with T</strong> (two hydrogen bonds) and <strong>G with C</strong> (three). Franklin died of cancer in 1958, aged 37; the 1962 Nobel Prize went to Watson, Crick and Maurice Wilkins.</p>
        <p>The pairing rule is the secret of heredity. Unzip the helix by breaking the hydrogen bonds, and each strand carries the information to rebuild its partner. Every time a cell divides, enzymes copy all three billion pairs with fewer than one error in a billion.</p>`,
      lab: {
        label: 'Double helix', title: 'Spin it, unzip it',
        head: '<div class="controls" style="margin:0"><button class="btn primary small zip">Unzip</button><button class="btn small ghost cp">Copy the strands</button></div>',
        body: `<div class="lab-grid"><div class="stage" style="height:380px"><canvas class="c" aria-label="Rotating DNA double helix with base pairs"></canvas></div><div class="side-panel"><div class="info-card"><div class="meta">TEMPLATE STRAND</div><div class="mono seq" style="font-size:18px;letter-spacing:.2em;margin:6px 0"></div><div class="meta">PARTNER STRAND (A↔T, G↔C)</div><div class="mono cmp" style="font-size:18px;letter-spacing:.2em;margin-top:6px;color:var(--gold)"></div></div><div class="legend"><span><i style="background:#ff6b9a"></i>A</span><span><i style="background:#6fe3a0"></i>T</span><span><i style="background:#f4c35a"></i>G</span><span><i style="background:#5ca8ff"></i>C</span><span><i style="background:#c4cbe0"></i>backbone</span></div><div class="info-card"><p class="tx" style="margin:0;font-size:14px;color:var(--soft)">Each rung is a base pair held by hydrogen bonds: 2 for A–T, 3 for G–C.</p></div></div></div>`,
        init(root) {
          const COL = { A: '#ff6b9a', T: '#6fe3a0', G: '#f4c35a', C: '#5ca8ff' }, PAIR = { A: 'T', T: 'A', G: 'C', C: 'G' };
          const seq = 'ATGCGTACCTGAGCTTAACG'.split(''), N = seq.length; let unzip = 0, copy = 0; const c = $('.c', root);
          $('.seq', root).innerHTML = seq.map(b => `<span style="color:${COL[b]}">${b}</span>`).join(''); $('.cmp', root).innerHTML = seq.map(b => `<span style="color:${COL[PAIR[b]]}">${PAIR[b]}</span>`).join('');
          $('.zip', root).addEventListener('click', () => { const to = unzip > .5 ? 0 : 1, from = unzip; copy = 0; tween(reduceMotion ? 10 : 2500, q => unzip = lerp(from, to, q)); $('.zip', root).textContent = to ? 'Zip up' : 'Unzip'; $('.tx', root).innerHTML = to ? 'Helicase enzymes break the hydrogen bonds between bases: the helix unzips. Each strand is now a template.' : 'Each rung is a base pair held by hydrogen bonds: 2 for A–T, 3 for G–C.'; });
          $('.cp', root).addEventListener('click', () => { if (unzip < .9) { toast('Unzip the helix first.'); return; } tween(reduceMotion ? 10 : 2500, q => copy = q); $('.tx', root).innerHTML = 'DNA polymerase reads each strand and adds the matching base: A opposite T, G opposite C. One helix becomes two identical copies.'; });
          animate(c, (dt, t) => { const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); const R = Math.min(w * .14, 60), top = 24, step = (h - 48) / (N - 1), rot = reduceMotion ? .6 : t * .7;
            const items = [];
            for (let i = 0; i < N; i++) { const y = top + i * step, a = rot + i * .62, open = clamp(unzip * N * 1.3 - i * .9 * (unzip > .5 ? 1 : 1), 0, 1) * unzip, sep = open * w * .18;
              const x1 = w / 2 + Math.cos(a) * R - sep, z1 = Math.sin(a), x2 = w / 2 + Math.cos(a + Math.PI) * R + sep, z2 = Math.sin(a + Math.PI); items.push({ i, y, x1, z1, x2, z2, open }); }
            for (let i = 1; i < N; i++) { const p = items[i - 1], q = items[i]; ctx.strokeStyle = 'rgba(196,203,224,.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(p.x1, p.y); ctx.lineTo(q.x1, q.y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(p.x2, p.y); ctx.lineTo(q.x2, q.y); ctx.stroke(); }
            items.sort((a, b) => (a.z1 + a.z2) - (b.z1 + b.z2)).forEach(it => { const b = seq[it.i], pb = PAIR[b], mid = (it.x1 + it.x2) / 2;
              if (it.open < .3) { ctx.lineWidth = 6; ctx.strokeStyle = COL[b]; ctx.beginPath(); ctx.moveTo(it.x1, it.y); ctx.lineTo(mid, it.y); ctx.stroke(); ctx.strokeStyle = COL[pb]; ctx.beginPath(); ctx.moveTo(mid, it.y); ctx.lineTo(it.x2, it.y); ctx.stroke(); const nb = b === 'A' || b === 'T' ? 2 : 3; for (let k = 0; k < nb; k++) { ctx.fillStyle = '#fff'; ctx.fillRect(mid - 1, it.y - 4 + k * 4 - (nb - 1) * 2 + 2, 2, 2); } }
              else { const L = 18; ctx.lineWidth = 6; ctx.strokeStyle = COL[b]; ctx.beginPath(); ctx.moveTo(it.x1, it.y); ctx.lineTo(it.x1 + L, it.y); ctx.stroke(); ctx.strokeStyle = COL[pb]; ctx.beginPath(); ctx.moveTo(it.x2, it.y); ctx.lineTo(it.x2 - L, it.y); ctx.stroke();
                if (copy > 0) { const f = clamp(copy * N * 1.2 - it.i, 0, 1); if (f > 0) { ctx.globalAlpha = f; ctx.strokeStyle = COL[pb]; ctx.beginPath(); ctx.moveTo(it.x1 + L, it.y); ctx.lineTo(it.x1 + L + 18, it.y); ctx.stroke(); ctx.strokeStyle = COL[b]; ctx.beginPath(); ctx.moveTo(it.x2 - L, it.y); ctx.lineTo(it.x2 - L - 18, it.y); ctx.stroke(); ball(ctx, '#9aa3b8', it.x1 + L + 22, it.y, 4); ball(ctx, '#9aa3b8', it.x2 - L - 22, it.y, 4); ctx.globalAlpha = 1; } } }
              ball(ctx, '#c4cbe0', it.x1, it.y, 5 + it.z1 * 1.5); ball(ctx, '#c4cbe0', it.x2, it.y, 5 + it.z2 * 1.5); }); });
        }
      },
      dialogue: [['RF', 'happy', 'ROSALIND · Franklin', '“Photo 51 took over a hundred hours of X-ray exposure. That cross told me: helix. The spacing told me: two strands, ten bases per turn.”'], ['C', 'happy', 'CASS · carbon', '“And every sugar in that backbone is built on my rings. From the star I was born in to the code that wrote you, I’ve been there the whole time.”']],
      lenses: ['Strawberry DNA extracted in a kitchen forms white, stringy threads you can wind on a stick.', 'Two sugar-phosphate backbones twist around each other; bases pair across the middle by hydrogen bonds: A–T and G–C.', 'A=T &nbsp; G≡C', 'Two hydrogen bonds between A and T; three between G and C. This pairing rule is the basis of copying.'],
      miracle: { ico: 'dna', title: 'Two metres of you, in every cell', html: '<p>Stretched out, the DNA in one human cell is about <strong>2 metres</strong> long, yet it fits inside a nucleus around 6 micrometres across. It is wound around protein spools (histones), coiled and coiled again. All the DNA in your body, laid end to end, would reach the Sun and back dozens of times.</p><p>DNA is so stable and dense that scientists have stored books, films and music in synthetic DNA. In theory, every movie ever made would fit in a sugar cube.</p>', c1: '#6fe3a0', c2: '#ff6b9a' },
      quiz: [
        { q: 'In DNA, adenine (A) always pairs with…', o: ['Guanine (G)', 'Cytosine (C)', 'Thymine (T)', 'Another adenine'], a: 2, w: 'A pairs with T (two hydrogen bonds); G pairs with C (three).' },
        { q: 'What holds the two strands of the DNA double helix together?', o: ['Ionic bonds', 'Hydrogen bonds between base pairs', 'Metallic bonds', 'Magnetic forces'], a: 1, w: 'Hydrogen bonds: strong enough to be stable, weak enough to unzip for copying.' }
      ],
      prompt: { p: 'Explain how DNA’s structure allows it to be copied accurately.', m: 'DNA has two strands held together by base pairs: A always with T, G always with C. To copy it, enzymes unzip the hydrogen bonds between the strands. Each single strand then acts as a template: for every A, the new strand gets a T; for every G, a C. The result is two identical double helices, each with one old and one new strand.' }
    }
  ],
  extra: [
    { c: 1, q: 'What is the name of the alkane with 3 carbons?', o: ['Methane', 'Propane', 'Butane', 'Ethane'], a: 1, w: 'Meth-1, eth-2, prop-3, but-4.' },
    { c: 2, q: 'Butane and methylpropane are…', o: ['the same molecule', 'structural isomers', 'isotopes', 'polymers'], a: 1, w: 'Both C₄H₁₀ but with different skeletons.' },
    { c: 3, q: 'Which functional group gives vinegar its sourness?', o: ['–OH (alcohol)', '–COOH (carboxylic acid)', '–NH₂ (amine)', 'C=O (ketone)'], a: 1, w: 'Ethanoic acid’s carboxyl group donates H⁺.' },
    { c: 4, q: 'Poly(ethene) is made from which monomer?', o: ['Ethane', 'Ethene (CH₂=CH₂)', 'Ethanol', 'Glucose'], a: 1, w: 'The C=C double bond opens to allow linking.' },
    { c: 5, q: 'Who took Photo 51, the X-ray image that revealed DNA’s helix?', o: ['Marie Curie', 'Rosalind Franklin', 'Linus Pauling', 'Dorothy Hodgkin'], a: 1, w: 'Rosalind Franklin, with her student Raymond Gosling, in 1952.' },
    { c: 4, q: 'Starch, cellulose and proteins are all…', o: ['metals', 'natural polymers', 'alkanes', 'gases'], a: 1, w: 'Starch and cellulose are polymers of glucose; proteins are polymers of amino acids.' }
  ],
  cards: [
    [1, 'Alkane general formula?', 'CₙH₂ₙ₊₂'],
    [1, 'Names of alkanes 1–4?', 'Methane, ethane, propane, butane.'],
    [1, 'Why do longer alkanes boil higher?', 'Stronger dispersion forces from more surface contact and more electrons.'],
    [1, 'Fractional distillation?', 'Separating crude oil into fractions by boiling point (chain length).'],
    [2, 'What are isomers?', 'Compounds with the same molecular formula but different structures.'],
    [2, 'What is a chiral carbon?', 'A carbon bonded to four different groups; it has two mirror-image forms.'],
    [2, 'Enantiomers?', 'Non-superimposable mirror-image isomers.'],
    [2, 'Why does chirality matter for drugs?', 'Body receptors are chiral, so mirror forms can have different effects (e.g. thalidomide).'],
    [3, 'Alcohol functional group?', '–OH (hydroxyl).'],
    [3, 'Carboxylic acid functional group?', '–COOH (carboxyl).'],
    [3, 'Ester formation?', 'Carboxylic acid + alcohol ⇌ ester + water (acid catalyst).'],
    [3, 'Ketone vs aldehyde?', 'Both contain C=O. Ketone: in the middle of the chain. Aldehyde: at the end (–CHO).'],
    [3, 'Amine functional group?', '–NH₂: basic, with a fishy smell.'],
    [4, 'Monomer vs polymer?', 'Monomer: small repeating unit. Polymer: a long chain of many monomers.'],
    [4, 'Addition polymerisation of ethene?', 'n CH₂=CH₂ → –(CH₂–CH₂)ₙ–'],
    [4, 'Natural polymers?', 'Starch, cellulose (glucose), proteins (amino acids), DNA (nucleotides), rubber.'],
    [5, 'DNA base pairing rules?', 'A–T (2 hydrogen bonds), G–C (3 hydrogen bonds).'],
    [5, 'Structure of DNA?', 'A double helix of two sugar-phosphate backbones with paired bases inside.'],
    [5, 'Who discovered the double helix?', 'Watson and Crick (1953), using Rosalind Franklin’s X-ray data (Photo 51).']
  ]
};
