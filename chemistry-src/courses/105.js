const COURSE = {
  id: '105', title: 'Under Pressure', brand: '<i>Under</i> Pressure',
  eyebrow: 'Chemistry 105 · Gases, phases & solutions', titleHTML: '<em>Under</em> Pressure',
  lede: 'A crisp packet puffs up on a mountain. Tea brews badly on Everest. Salt melts ice on a frozen road. A mystery about invisible pushing, and the restless particles behind it.',
  accent: ['#5ca8ff', '#ff9f5a'],
  cast: {
    Bl: { name: 'Robert', full: 'Boyle', color: '#ff9f5a', title: 'Squeezed air in a J-shaped tube', sym: 'PV' },
    Ch: { name: 'Jacques', full: 'Charles', color: '#5ca8ff', title: 'Flew a hydrogen balloon 3 km high in 1783', sym: 'V/T' },
    K: { name: 'William', full: 'Kelvin', color: '#a78bfa', title: 'Found the bottom of the temperature scale', sym: 'K' },
    gas: { name: 'The Crowd', full: 'Gas particles', color: '#6fe3a0', title: 'Billions of tiny collisions a second', sym: 'nRT', orbit: true }
  },
  prologue: {
    short: 'The Puffed-up Packet', kicker: 'The case begins', titleHTML: 'The Puffed-up <em>Packet</em>',
    story: `<p>Drive a sealed bag of crisps up a mountain pass and it swells like a pillow. Take a plastic bottle on a flight, and on landing it’s crushed. Scuba divers are taught one rule above all others: <strong>never hold your breath on the way up</strong>.</p>
      <p>Meanwhile, at the top of Mount Everest, water boils at only about 70 °C, too cool for a decent cup of tea. And every winter, road gritters spread salt on ice that is far colder than 0 °C, and it melts anyway.</p>
      <p>None of these involve a chemical reaction. They’re all about <strong>pressure</strong>, <strong>temperature</strong> and the restless motion of particles. Five case files will take you from the push of a single molecule to the laws that tie the whole crowd together.</p>`,
    cast: [['Bl', 'happy'], ['Ch', 'happy'], ['K', 'sly'], ['gas', 'happy'], ['H', 'shocked']]
  },
  finale: {
    q: 'What connects the crisp packet, the diver and the icy road?', lead: 'Pressure from collisions, squeezing, heating, boiling and freezing. Every clue is the same restless crowd seen from a different angle.',
    avatar: 'gas', nameHTML: 'The restless <em>crowd</em>',
    html: `<p>Billions of particles in motion, summed up in one equation: <strong>PV = nRT</strong>.</p>
      <p>Pressure is just collisions with the walls. Squeeze the volume and the hits come more often (Boyle). Heat the gas and every hit is harder, so it expands (Charles), all the way down to absolute zero, where the motion stops. Whether a substance is solid, liquid or gas depends on the contest between that motion and the pressure pushing down, which is why water boils cooler on Everest. And dissolved particles get in the way of freezing, which is why salt melts ice.</p>
      <p>Pressure (P), volume (V), amount (n), temperature (T), and one constant (R): the ideal gas law, written by Émile Clapeyron in 1834. Case closed.</p>`
  },
  cases: [
    {
      short: 'The Invisible Push', kicker: 'Gas pressure', titleHTML: 'The Invisible <em>Push</em>', item: 'The popping ears', ico: 'gauge', teaser: 'What is pushing?',
      clue: 'Gas pressure is the force of countless particles hitting a surface. More particles, or faster particles, means more pressure.',
      mystery: { q: 'Why do your ears "pop" when a plane takes off or lands?', h: ['The engine noise', 'The air pressure outside your eardrum changes, while the air trapped inside is at the old pressure', 'Your ears get cold'], a: 1, v: 'Behind each eardrum is a pocket of trapped air. As the plane climbs, fewer air molecules hit the outside of the drum each second, so the trapped air pushes the drum outwards. When a tube to your throat briefly opens (swallowing helps), air rushes through to balance the pressure: <b>pop</b>.' },
      story: `<p>Right now the air is pressing on every square centimetre of you with a force equal to about a kilogram’s weight. Over your whole body that comes to roughly <strong>15 tonnes</strong>. You don’t notice because the air inside you pushes back just as hard.</p>
        <p>In 1654 the mayor of Magdeburg, <strong>Otto von Guericke</strong>, made the invisible push visible. He fitted two copper hemispheres together and pumped the air out from inside. Then he hitched two teams of horses to pull them apart, and they couldn’t. Nothing held the hemispheres together but the pressure of the air outside.</p>
        <p>What <em>is</em> that pressure? Gas particles are flying around at hundreds of metres per second. Every time one bounces off a surface, it gives a tiny shove. Add up billions of billions of shoves each second and you get a steady push: <strong>pressure = force ÷ area</strong>. More particles, or faster particles, mean more pushing.</p>`,
      lab: {
        label: 'Collision counter', title: 'Make the gauge move',
        body: `<div class="lab-grid"><div><div class="stage" style="height:330px"><canvas class="c" aria-label="Gas particles hitting the walls of a box, with a pressure gauge"></canvas></div>
          <div class="slider-row" style="margin-top:14px"><label>Particles</label><input type="range" class="n" min="5" max="80" value="30" style="--track:linear-gradient(90deg,#3a3f66,#6fe3a0)"><span class="readout"><b class="no"></b></span></div>
          <div class="slider-row"><label>Temperature</label><input type="range" class="t" min="50" max="600" value="300"><span class="readout"><b class="to"></b></span></div></div>
          <div class="side-panel"><div class="info-card" style="text-align:center"><svg class="gauge" viewBox="-100 -100 200 130" style="width:100%;max-width:240px;margin:0 auto"></svg><div class="big-read pv"></div><div class="meta">MEASURED PRESSURE (relative)</div></div><div class="info-card"><p class="tx" style="margin:0;font-size:14.5px;color:var(--soft)">Each flash at a wall is one collision. Pressure is their combined push per second.</p></div></div></div>`,
        init(root) {
          let T = 300; const box = ParticleBox($('.c', root), { species: { g: { color: '#6fe3a0', r: 5, m: 1 } }, counts: { g: 30 }, speed: 70, T: 1, collide: true,
            after: (ctx, w, h, api) => { api.S.P.forEach(p => { if (p.x < 7 || p.x > w * api.S.wall - 7 || p.y < 7 || p.y > h - 7) glow(ctx, p.x, p.y, 14, '#fff', .6); }); } });
          const g = $('.gauge', root); g.innerHTML = `<path d="M-80 0 A80 80 0 0 1 80 0" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="14"/><path class="arc" d="" fill="none" stroke="#6fe3a0" stroke-width="14" stroke-linecap="round"/>${Array.from({ length: 11 }, (_, i) => { const a = Math.PI + i / 10 * Math.PI; return `<line x1="${Math.cos(a) * 62}" y1="${Math.sin(a) * 62}" x2="${Math.cos(a) * 70}" y2="${Math.sin(a) * 70}" stroke="rgba(255,255,255,.4)"/>`; }).join('')}<line class="nd" x1="0" y1="0" x2="-66" y2="0" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle r="6" fill="#fff"/>`;
          slider($('.n', root), v => { const d = v - box.count('g'); if (box.S.P.length || box.W) { if (d > 0) box.add('g', d); else box.remove('g', -d); } $('.no', root).textContent = v; });
          slider($('.t', root), v => { T = v; box.setT(v / 300); $('.to', root).textContent = v + ' K (' + (v - 273) + ' °C)'; });
          let shown = 0;
          animate(g, (dt) => { const p = box.S.pressure * box.W * box.H / (30 * 4900) * 40; shown += (p - shown) * Math.min(1, dt * 2); const f = clamp(shown / 100, 0, 1), a = Math.PI + f * Math.PI;
            $('.nd', root).setAttribute('x2', Math.cos(a) * 66); $('.nd', root).setAttribute('y2', Math.sin(a) * 66); $('.arc', root).setAttribute('d', `M-80 0 A80 80 0 0 1 ${Math.cos(a) * 80} ${Math.sin(a) * 80}`); $('.pv', root).textContent = Math.round(shown);
            $('.tx', root).innerHTML = `Each flash is a collision with a wall. <b>${box.count('g')}</b> particles at <b>${T} K</b>. Double the particles and you double the hits. Raise the temperature and every hit is faster and harder.`; });
        }
      },
      lenses: ['A bicycle tyre goes hard when you pump it; a crisp packet bulges at altitude; a sealed bottle crumples as a plane descends.', 'Particles collide with the walls billions of times per second. Each collision pushes outwards; together they make pressure.', 'P = F / A', 'Measured in pascals (Pa). Air at sea level: 101,325 Pa = 1 atm = about 1 kg per cm².'],
      miracle: { ico: 'cup', title: 'Drinking through a straw is air pushing, not you pulling', html: '<p>When you "suck" on a straw, you lower the pressure inside your mouth. The atmosphere, pressing down on the surface of your drink, then <strong>pushes</strong> the liquid up the straw. Suction is really the outside air doing the work.</p><p>That is why there\'s a limit: even a perfect vacuum can only lift water about 10 metres, the height at which the water\'s weight equals the atmosphere\'s push. Old mine pumps couldn\'t lift water higher, a puzzle that helped reveal air pressure in the 1600s.</p>', c1: '#5ca8ff', c2: '#6fe3a0' },
      quiz: [
        { q: 'What causes gas pressure?', o: ['Gas particles repelling each other', 'Gas particles colliding with the walls of their container', 'The weight of a single particle', 'Heat radiating from the gas'], a: 1, w: 'Pressure is the total force of particle collisions per unit area.' },
        { q: 'You pump more air into a tyre (same temperature). Pressure rises because…', o: ['particles get bigger', 'there are more particles hitting the walls each second', 'the air gets hotter', 'the rubber gets thinner'], a: 1, w: 'More particles in the same volume means more collisions per second.' }
      ],
      prompt: { p: 'Explain why a sealed crisp packet puffs up when you drive up a mountain.', m: 'Inside the packet, the trapped air molecules keep hitting the plastic just as before. Outside, the air is thinner at altitude: fewer molecules, so fewer collisions pushing back. The inside push now beats the outside push, so the packet expands until the forces balance.' }
    },
    {
      short: 'Boyle’s Squeeze', kicker: 'Pressure & volume', titleHTML: 'Boyle’s <em>Squeeze</em>', item: 'The diver’s lungs', ico: 'fish', teaser: 'Why breathe out going up?',
      clue: 'At constant temperature, squeezing a gas into half the volume doubles its pressure: P × V stays constant (Boyle’s law).',
      mystery: { q: 'Why must a scuba diver never hold their breath while swimming up from 20 metres down?', h: ['The water gets colder', 'As the water pressure drops, the air in their lungs expands, and can tear the lungs', 'They would run out of oxygen'], a: 1, v: 'At 20 m deep, the pressure is 3 atmospheres, so the air in the diver’s lungs is squeezed to a third of its surface volume. Rising to the surface, the pressure falls to 1 atm and that air tries to expand <b>threefold</b> (Boyle’s law). Held in, it can over-inflate and rupture the lungs. Breathing out steadily lets it escape.' },
      story: `<p>In 1662 the Irish scientist <strong>Robert Boyle</strong> and his assistant Robert Hooke poured mercury into a J-shaped glass tube, trapping a pocket of air in the short, sealed end. Each time they added more mercury, they increased the pressure on the trapped air, and measured how much it shrank.</p>
        <p>The pattern was astonishingly clean: <strong>double the pressure, and the volume halves</strong>. Triple it, and the volume falls to a third. Pressure times volume stayed constant: <strong>P × V = constant</strong> (at fixed temperature).</p>
        <p>The particle picture makes it obvious. Squeeze the same particles into half the space and each one hits a wall twice as often, so the pressure doubles. Boyle’s law is why bubbles grow as they rise in a fizzy drink, why your lungs work like bellows, and why divers breathe out on the way up.</p>`,
      lab: {
        label: 'Piston press', title: 'Squeeze the gas, plot the curve',
        head: '<div class="controls" style="margin:0"><button class="btn primary small rec">● Record point</button><button class="btn small ghost clr">Clear</button></div>',
        body: `<div class="lab-grid"><div><div class="stage" style="height:320px"><canvas class="c" aria-label="Gas in a cylinder with a movable piston"></canvas></div><div class="slider-row" style="margin-top:14px"><label>Volume</label><input type="range" class="v" min="25" max="100" value="100" style="--track:linear-gradient(90deg,#ff9f5a,#3a3f66)"><span class="readout"><b class="vo"></b></span></div></div>
          <div class="side-panel"><div class="info-card"><canvas class="g" style="width:100%;height:220px" aria-label="Pressure versus volume graph"></canvas></div><div class="kv"><div><small>Pressure</small><b class="pp"></b></div><div><small>P × V</small><b class="pv"></b></div></div></div></div>`,
        init(root) {
          let V = 1, pts = [];
          const box = ParticleBox($('.c', root), { species: { g: { color: '#ff9f5a', r: 4.5, m: 1 } }, counts: { g: 45 }, speed: 80, collide: false, substeps: 3 });
          slider($('.v', root), v => { V = v / 100; box.S.wall = V; $('.vo', root).textContent = (V * 10).toFixed(1) + ' L'; });
          const P0 = () => box.S.pressure * box.W * box.H / (45 * 6400);
          $('.rec', root).addEventListener('click', () => { pts.push([V * 10, pS]); });
          $('.clr', root).addEventListener('click', () => { pts = []; });
          let pS = 0;
          animate($('.g', root), (dt) => { pS += (P0() - pS) * Math.min(1, dt * 1.5); const p = pS; $('.pp', root).textContent = p.toFixed(2) + ' atm'; $('.pv', root).textContent = (p * V * 10).toFixed(1);
            const k = pts.length ? pts.reduce((s, q) => s + q[0] * q[1], 0) / pts.length : 10; const curve = []; for (let v = 2; v <= 10.2; v += .1) curve.push([v, k / v]);
            plot($('.g', root), { x: [0, 10.5], y: [0, 5], xt: [0, 2, 4, 6, 8, 10], yt: [0, 1, 2, 3, 4, 5], xl: 'volume (L)', yl: 'pressure (atm)', series: [{ pts: curve, color: 'rgba(255,159,90,.45)', dash: [4, 4], width: 1.5 }, { pts: pts.slice().sort((a, b) => a[0] - b[0]), color: '#ff9f5a', dots: true, width: 0 }], marks: [{ x: V * 10, y: Math.min(5, p), color: '#fff' }] }); });
        }
      },
      lenses: ['A syringe with its nozzle blocked gets harder to push the further you press it in.', 'Same particles, less space: each particle hits the walls more often, so pressure rises.', 'P₁V₁ = P₂V₂', 'At constant temperature and amount of gas. Halve the volume, double the pressure.'],
      miracle: { ico: 'wind', title: 'You breathe with Boyle’s law', html: '<p>To breathe in, your diaphragm pulls down and your rib cage lifts, enlarging your chest. The air in your lungs suddenly has more room, so its pressure drops slightly below the air outside, and air flows in. To breathe out, the chest shrinks, the pressure rises, and air flows out.</p><p>The difference is tiny, only about 0.3% of atmospheric pressure, and you do it about 20,000 times a day.</p>', c1: '#5ca8ff', c2: '#ff9f5a' },
      quiz: [
        { q: 'A gas occupies 6 L at 1 atm. It is squeezed to 2 L at the same temperature. New pressure?', o: ['1/3 atm', '3 atm', '2 atm', '6 atm'], a: 1, w: 'P₁V₁ = P₂V₂: 1 × 6 = P₂ × 2, so P₂ = 3 atm.' },
        { q: 'Why does squeezing a gas raise its pressure (at constant temperature)?', o: ['The particles speed up', 'The particles hit the walls more often because they have less room', 'New particles are created', 'The particles get bigger'], a: 1, w: 'Same speed, less space: more collisions per second per area.' }
      ],
      prompt: { p: 'Use Boyle’s law to explain why bubbles from a diver get bigger as they rise to the surface.', m: 'Deep down, the water pressure on a bubble is high, so the gas inside is squeezed small. As the bubble rises, the pressure around it falls. Since P × V stays constant (at the same temperature), lower pressure means larger volume, so the bubble grows. A bubble from 10 m depth (2 atm) doubles in volume by the time it reaches the surface (1 atm).' }
    },
    {
      short: 'Charles’s Balloon', kicker: 'Temperature & volume', titleHTML: 'Charles’s <em>Balloon</em>', item: 'The freezer balloon', ico: 'balloon', teaser: 'Why does it shrink?',
      clue: 'At constant pressure, a gas’s volume is proportional to its absolute temperature (Charles’s law). Extrapolated, all gases reach zero volume at −273 °C: absolute zero.',
      mystery: { q: 'Put a blown-up balloon in the freezer for an hour and it comes out wrinkled and smaller. It warms up and swells back. Why?', h: ['Air leaks out in the cold and back in when warm', 'Cold particles move more slowly and hit the rubber less hard, so the balloon shrinks until pressures balance', 'The rubber shrinks in the cold'], a: 1, v: 'Nothing leaks. In the cold, the air molecules slow down and push less hard on the inside of the balloon, so the outside air squeezes it smaller. Warm them up and they speed up, push harder, and the balloon expands again. Volume is proportional to <b>absolute temperature</b>.' },
      story: `<p>On 1 December 1783, ten days after the first hot-air balloon flight, the French physicist <strong>Jacques Charles</strong> rose above Paris in a balloon filled with hydrogen and climbed to almost 3 kilometres. He was fascinated by how gases expand when heated, and he measured it.</p>
        <p>His finding: at constant pressure, every gas expands by the same fraction for each degree of warming, about 1/273 of its volume at 0 °C. Run the numbers backwards and something extraordinary appears. At <strong>−273 °C</strong>, every gas would shrink to <em>zero</em> volume. The particles would simply stop moving.</p>
        <p>In 1848 <strong>William Thomson</strong>, later Lord Kelvin, proposed a new temperature scale starting at this <strong>absolute zero</strong>: −273.15 °C = 0 K. On the kelvin scale, Charles’s law is beautifully simple: <strong>V ∝ T</strong>. Double the absolute temperature, double the volume.</p>`,
      lab: {
        label: 'Heat & cool', title: 'Find absolute zero',
        head: '<div class="controls" style="margin:0"><button class="btn primary small rec">● Record point</button><button class="btn small ghost clr">Clear</button></div>',
        body: `<div class="lab-grid"><div><div class="stage" style="height:300px"><canvas class="c" aria-label="Gas in a cylinder whose piston moves to keep pressure constant"></canvas></div><div class="slider-row" style="margin-top:14px"><label>Temperature</label><input type="range" class="t" min="80" max="600" value="300"><span class="readout"><b class="to"></b></span></div></div>
          <div class="side-panel"><div class="info-card"><canvas class="g" style="width:100%;height:230px" aria-label="Volume against temperature graph extrapolated to absolute zero"></canvas></div><p class="hint tx" style="font-size:13px">Record a few points at different temperatures, then follow the dashed line back to where the volume would be zero.</p></div></div>`,
        init(root) {
          let T = 300, pts = [];
          const box = ParticleBox($('.c', root), { species: { g: { color: '#5ca8ff', r: 4.5, m: 1 } }, counts: { g: 40 }, speed: 70, collide: false, substeps: 2 });
          slider($('.t', root), v => { T = v; box.setT(v / 300); $('.to', root).textContent = `${v} K (${v - 273} °C)`; });
          $('.rec', root).addEventListener('click', () => { pts.push([T - 273, T / 600 * 10]); });
          $('.clr', root).addEventListener('click', () => { pts = []; });
          animate($('.g', root), (dt) => { const tw = T / 600; box.S.wall += (tw - box.S.wall) * Math.min(1, dt * 2);
            plot($('.g', root), { x: [-300, 340], y: [0, 10.5], xt: [-273, -200, -100, 0, 100, 200, 300], yt: [0, 2, 4, 6, 8, 10], xl: 'temperature (°C)', yl: 'volume (L)', series: [{ pts: [[-273, 0], [327, 10]], color: pts.length >= 2 ? 'rgba(92,168,255,.6)' : 'rgba(0,0,0,0)', dash: [5, 5], width: 1.5 }, { pts: pts.slice().sort((a, b) => a[0] - b[0]), color: '#5ca8ff', dots: true, width: 0 }], vlines: [{ x: -273, color: '#a78bfa', label: 'absolute zero' }], marks: [{ x: T - 273, y: box.S.wall * 10, color: '#fff' }] });
            if (pts.length >= 2) $('.tx', root).innerHTML = 'The dashed line through your points hits zero volume at <b style="color:var(--violet)">−273 °C</b>. Every gas gives the same answer. That is absolute zero, 0 K.'; });
        }
      },
      lenses: ['A balloon shrivels in the freezer; a football goes soft on a frosty morning; a hot-air balloon rises.', 'Warmer particles move faster and push harder; at constant pressure the gas spreads out to balance them.', 'V₁ / T₁ = V₂ / T₂', 'T must be in kelvin: K = °C + 273.15.'],
      miracle: { ico: 'balloon', title: 'Hot-air balloons fly on Charles’s law', html: '<p>The burner heats the air inside the envelope from about 20 °C to 100 °C, from 293 K to 373 K. By Charles’s law the air expands by 27%, and since the envelope is open at the bottom, the extra pours out. The air left inside is about a fifth lighter than the same volume of cool air outside.</p><p>A big balloon holds about 2,800 cubic metres, so that difference lifts around 700 kg: basket, burner, fuel and passengers.</p>', c1: '#ff9f5a', c2: '#ff5d5d' },
      quiz: [
        { q: 'A balloon holds 2 L at 300 K. At constant pressure, what is its volume at 600 K?', o: ['1 L', '2 L', '4 L', '600 L'], a: 2, w: 'V ∝ T in kelvin: doubling T from 300 K to 600 K doubles V to 4 L.' },
        { q: 'What is 0 K in degrees Celsius?', o: ['0 °C', '−100 °C', '−273.15 °C', '273 °C'], a: 2, w: 'Absolute zero, 0 K, is −273.15 °C: the temperature at which particle motion would be at its minimum.' }
      ],
      prompt: { p: 'Why must you use kelvin, not Celsius, in gas law calculations? Use an example.', m: 'Gas volume is proportional to absolute temperature, measured from the true zero of motion. Celsius has an arbitrary zero (freezing water), so doubling °C doesn’t double anything. Going from 10 °C to 20 °C seems like doubling, but in kelvin it’s 283 K to 293 K, only a 3.5% increase, and that’s how much the gas actually expands.' }
    },
    {
      short: 'The Phase Map', kicker: 'Phase diagrams & boiling points', titleHTML: 'The Phase <em>Map</em>', item: 'The Everest tea', ico: 'mountain', teaser: 'Why won’t it brew?',
      clue: 'A liquid boils when its vapour pressure equals the surrounding pressure. Lower outside pressure means a lower boiling point; higher pressure, a higher one.',
      mystery: { q: 'Climbers on Mount Everest complain that tea brewed there tastes weak, even straight from a rolling boil. Why?', h: ['The water is impure from melted snow', 'Low air pressure lets water boil at only about 70 °C, too cool to extract the flavour', 'Tea leaves freeze at that altitude'], a: 1, v: 'Boiling happens when water’s <b>vapour pressure</b> (the push of molecules escaping) equals the air pressure pressing down. On Everest, air pressure is only a third of sea level, so water reaches that point at about <b>70 °C</b>. It bubbles furiously, but it’s not hot enough to brew tea properly, or to cook pasta quickly.' },
      story: `<p>We tend to think of 100 °C as a fixed fact about water. It isn’t. It is the boiling point <em>at sea-level pressure</em>. Change the pressure and the boiling point moves.</p>
        <p>At any temperature, some molecules at the surface of a liquid are fast enough to escape, and those escaped molecules exert a <strong>vapour pressure</strong>. Heat the liquid and its vapour pressure rises. <strong>Boiling</strong> happens when the vapour pressure equals the pressure of the surroundings, so bubbles of vapour can form inside the liquid without being crushed.</p>
        <p>Chemists summarise this on a <strong>phase diagram</strong>, a map of pressure against temperature showing where a substance is solid, liquid or gas. Water’s map has two odd features: a <strong>triple point</strong> (0.01 °C, 0.006 atm) where ice, water and vapour coexist, and a melting line that tilts backwards, because ice is less dense than water.</p>`,
      lab: {
        label: 'Phase map', title: 'Click anywhere to set temperature and pressure',
        body: `<div class="lab-grid"><div class="stage" style="height:380px;padding:6px"><canvas class="c" style="cursor:crosshair" aria-label="Phase diagram of water"></canvas></div><div class="side-panel"><div class="grid-btns pre"></div><div class="kv"><div><small>State</small><b class="st"></b></div><div><small>Boils at</small><b class="bp"></b></div></div><div class="info-card"><p class="tx" style="margin:0;font-size:14.5px;color:var(--soft)"></p></div></div></div>`,
        init(root) {
          const R = 8.314, Hv = 40700, Hs = 51000, Tt = 273.16, Pt = .00604, Tc = 647, Pc = 218;
          const pVap = T => Math.exp(-Hv / R * (1 / T - 1 / 373.15)), pSub = T => Pt * Math.exp(-Hs / R * (1 / T - 1 / Tt));
          const tMelt = P => 273.15 - .0074 * (P - 1);
          const Tb = P => 1 / (1 / 373.15 - R * Math.log(P) / Hv);
          const PRE = [['Sea level', 25, 1, 'Water boils at 100 °C.'], ['Everest summit', 25, .33, 'At 8,849 m the air pressure is a third of sea level: water boils at about 71 °C.'], ['Pressure cooker', 25, 2, 'Sealing in the steam doubles the pressure, raising the boiling point to about 120 °C, so food cooks much faster.'], ['Mars surface', -60, .006, 'Mars’ air is so thin that liquid water can barely exist. Ice there sublimes straight to vapour.'], ['Deep-sea vent', 350, 250, 'At 2,500 m depth, vent water at 350 °C stays liquid, even supercritical, under hundreds of atmospheres.']];
          let T = 298, P = 1, note = PRE[0][3];
          $('.pre', root).innerHTML = PRE.map((p, i) => `<button data-i="${i}"><b>${p[0]}</b>${p[1]} °C · ${p[2]} atm</button>`).join('');
          $('.pre', root).addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const p = PRE[+b.dataset.i]; T = p[1] + 273.15; P = p[2]; note = p[3]; $$('.pre button', root).forEach(x => x.classList.toggle('on', x === b)); draw(); });
          const c = $('.c', root); let M;
          function state(T, P) { if (T > Tc && P > Pc) return 'Supercritical'; if (T < Tt) return P > pSub(T) ? (T < tMelt(P) ? 'Solid (ice)' : 'Liquid') : 'Gas (vapour)'; if (T < tMelt(P) && P > Pt) return 'Solid (ice)'; return P > pVap(T) ? 'Liquid' : 'Gas (vapour)'; }
          function draw() {
            const lp = Math.log10; const vap = [], sub = [], mel = [];
            for (let t = Tt; t <= Tc; t += 2) vap.push([t - 273.15, lp(pVap(t))]); for (let t = 200; t <= Tt; t += 1) sub.push([t - 273.15, lp(pSub(t))]); for (let q = -2.2; q <= 3.3; q += .1) mel.push([tMelt(Math.pow(10, q)) - 273.15, q]);
            M = plot(c, { x: [-75, 440], y: [-3.5, 3.4], xt: [-50, 0, 100, 200, 300, 400], xf: v => v + '°', yt: [-3, -2, -1, 0, 1, 2, 3], yf: v => (v === 0 ? '1' : '10' + String(v).split('').map(ch => ({ '-': '⁻', '1': '¹', '2': '²', '3': '³' })[ch] || ch).join('')), yl: 'pressure (atm, log)', xl: 'temperature (°C)', padL: 52,
              areas: [], series: [{ pts: vap, color: '#5ca8ff' }, { pts: sub, color: '#a78bfa' }, { pts: mel, color: '#6fe3a0' }], hlines: [{ y: 0, color: 'rgba(255,255,255,.3)', label: '1 atm' }], marks: [{ x: .01, y: lp(Pt), color: '#f4c35a', label: 'triple point', r: 4 }, { x: 374, y: lp(Pc), color: '#ff9f5a', label: 'critical point', r: 4 }, { x: T - 273.15, y: lp(P), color: '#fff', r: 7 }] });
            const ctx = M.ctx; [['ICE', -55, 1.5], ['LIQUID', 60, 1.5], ['VAPOUR', 180, -2.2]].forEach(([s, x, y]) => label(ctx, s, M.X(x), M.Y(y), { size: 12, color: 'rgba(255,255,255,.4)', align: 'center' }));
            const s = state(T, P); $('.st', root).textContent = s; $('.bp', root).textContent = P >= Pt && P < Pc ? Math.round(Tb(P) - 273.15) + ' °C' : '—';
            $('.tx', root).innerHTML = `${(T - 273.15).toFixed(0)} °C at ${P < .1 ? P.toFixed(3) : P.toFixed(2)} atm. ${note}`;
          }
          c.addEventListener('click', e => { const r = c.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top; const x = -75 + (mx - M.L) / M.pw * 515, y = 3.4 - (my - M.T) / M.ph * 6.9; T = clamp(x, -75, 400) + 273.15; P = Math.pow(10, clamp(y, -3.5, 3.4)); note = 'Your own point on the map.'; $$('.pre button', root).forEach(x => x.classList.remove('on')); draw(); });
          draw(); new ResizeObserver(draw).observe(c);
        }
      },
      lenses: ['A pressure cooker hisses; pasta takes ages to cook at a mountain hut; dry ice "smokes" without melting.', 'Boiling starts when escaping molecules push as hard as the surroundings push back. Less push from outside means it happens at a lower temperature.', 'Boiling: P<sub>vapour</sub> = P<sub>surroundings</sub>', 'On a phase diagram, each line is a boundary where two phases coexist.'],
      miracle: { ico: 'flame', title: 'The pressure cooker: cooking above 100 °C', html: '<p>A pressure cooker traps the steam, raising the pressure inside to about twice atmospheric. Water’s boiling point rises to about <strong>120 °C</strong>, and because chemical reactions speed up with temperature, beans and stews cook in a third of the time.</p><p>Hospitals use the same trick in autoclaves: steam at 121 °C and high pressure kills even the toughest bacterial spores.</p>', c1: '#ff9f5a', c2: '#f4c35a' },
      quiz: [
        { q: 'Why does water boil at a lower temperature on a high mountain?', o: ['There is less oxygen', 'The air pressure is lower, so vapour pressure reaches it at a lower temperature', 'Water is lighter at altitude', 'The Sun is closer'], a: 1, w: 'Boiling occurs when vapour pressure equals the surrounding pressure. Lower outside pressure means it happens at a lower temperature.' },
        { q: 'What happens at the triple point of a substance?', o: ['It boils three times', 'Solid, liquid and gas can all exist together in equilibrium', 'It becomes a plasma', 'It cannot exist'], a: 1, w: 'At one specific temperature and pressure (for water, 0.01 °C and 0.006 atm), all three phases coexist.' }
      ],
      prompt: { p: 'Explain how a pressure cooker makes food cook faster.', m: 'The sealed lid traps steam, so the pressure inside rises above atmospheric. Water only boils when its vapour pressure matches the surrounding pressure, so it now has to get hotter, about 120 °C, before it boils. Food sits in hotter water, and chemical changes in cooking go faster at higher temperature.' }
    },
    {
      short: 'Dissolving Secrets', kicker: 'Solutions & freezing-point depression', titleHTML: 'Dissolving <em>Secrets</em>', item: 'The salted road', ico: 'snow', teaser: 'Why does salt melt ice?',
      clue: 'Dissolved particles get in the way of water molecules joining an ice crystal, so a solution freezes at a lower temperature than pure water.',
      mystery: { q: 'Gritters spread salt on roads at −5 °C, and the ice melts, even though it’s below water’s freezing point. How?', h: ['Salt reacts with ice and releases heat', 'Dissolved salt ions get in the way of water refreezing, lowering the freezing point below −5 °C', 'Salt crystals scratch the ice apart'], a: 1, v: 'At the surface of ice, water molecules constantly leave and rejoin the crystal. Salt dissolves into the thin film of meltwater, and its <b>Na⁺ and Cl⁻ ions</b> crowd the liquid so fewer water molecules can rejoin the ice. Melting now outpaces freezing. The salty water freezes only at a lower temperature, down to about −21 °C for the saltiest brine.' },
      story: `<p>Pure water freezes at 0 °C. Sea water freezes at about −2 °C. Antifreeze in a car engine keeps the coolant liquid down to −35 °C. In each case, something is <strong>dissolved</strong> in the water, and the more particles that are dissolved, the lower the freezing point drops.</p>
        <p>Freezing is a constant tug-of-war at the surface of an ice crystal. Water molecules keep joining the crystal (freezing) and breaking off (melting). At the freezing point the two rates are equal. Dissolved particles take up space in the liquid, so fewer water molecules are in position to join the crystal. Freezing slows, melting wins, and you need to go colder to balance it again.</p>
        <p>Remarkably, it hardly matters <em>what</em> is dissolved, only <strong>how many particles</strong>. Salt counts double, because each NaCl splits into two ions. Effects like this, which depend only on the number of dissolved particles, are called <strong>colligative properties</strong>. They also explain why salty water boils a little hotter.</p>`,
      lab: {
        label: 'Ice front', title: 'Salt the ice',
        body: `<div class="lab-grid"><div><div class="stage" style="height:300px"><canvas class="c" aria-label="Ice crystal surface with water molecules and dissolved salt ions"></canvas></div><div class="slider-row" style="margin-top:14px"><label>Salt</label><input type="range" class="s" min="0" max="50" value="0" style="--track:linear-gradient(90deg,#3a3f66,#e8ecf5)"><span class="readout"><b class="so"></b></span></div><div class="slider-row"><label>Temperature</label><input type="range" class="t" min="-25" max="5" value="-5" style="--track:linear-gradient(90deg,#6b8cff,#5ce1e6,#ff9f5a)"><span class="readout"><b class="to"></b></span></div></div>
          <div class="side-panel"><div class="kv"><div><small>Freezing point</small><b class="fp" style="color:var(--cyan)"></b></div><div><small>The ice is…</small><b class="st"></b></div></div><div class="info-card"><canvas class="g" style="width:100%;height:170px" aria-label="Freezing point versus salt concentration"></canvas></div></div></div>`,
        init(root) {
          let m = 0, T = -5, ice = .6; const c = $('.c', root);
          const fp = () => Math.max(-21.1, -2 * 1.86 * m);
          function upd() { $('.so', root).textContent = m.toFixed(1) + ' mol/kg'; $('.to', root).textContent = T + ' °C'; $('.fp', root).textContent = fp().toFixed(1) + ' °C'; const f = T < fp(); $('.st', root).textContent = f ? 'growing' : 'melting'; $('.st', root).style.color = f ? 'var(--cyan)' : 'var(--orange)';
            const pts = []; for (let x = 0; x <= 5; x += .1) pts.push([x, Math.max(-21.1, -3.72 * x)]); plot($('.g', root), { x: [0, 5], y: [-25, 5], xt: [0, 1, 2, 3, 4, 5], yt: [-20, -10, 0], xl: 'salt (mol per kg water)', yl: 'freezing point (°C)', series: [{ pts, color: '#5ce1e6' }], hlines: [{ y: T, color: '#ff9f5a', label: 'road ' + T + ' °C' }], marks: [{ x: m, y: fp(), color: '#fff' }] }); }
          slider($('.s', root), v => { m = v / 10; upd(); }); slider($('.t', root), v => { T = v; upd(); });
          const rnd = seeded(3); const W = Array.from({ length: 70 }, () => ({ x: rnd(), y: rnd(), vx: (rnd() - .5) * .2, vy: (rnd() - .5) * .2 })); const I = Array.from({ length: 50 }, (_, i) => ({ x: rnd(), y: rnd(), vx: (rnd() - .5) * .15, vy: (rnd() - .5) * .15, p: i % 2 }));
          animate(c, (dt, t) => { const target = T < fp() ? 1 : 0, rate = clamp(Math.abs(T - fp()) / 6, .05, 1) * .12; ice += Math.sign(target - ice) * Math.min(Math.abs(target - ice), rate * dt); ice = clamp(ice, .15, .72);
            const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h); const iy = h * (1 - ice), s = 22;
            const g = ctx.createLinearGradient(0, iy, 0, h); g.addColorStop(0, 'rgba(200,240,255,.35)'); g.addColorStop(1, 'rgba(120,190,255,.12)'); ctx.fillStyle = g; ctx.fillRect(0, iy, w, h - iy);
            for (let y = h - s / 2, row = 0; y > iy; y -= s * .87, row++) for (let x = (row % 2) * s / 2; x < w; x += s) { ball(ctx, '#ff5d5d', x, y, 4.5); ball(ctx, '#eef3ff', x + 4, y - 3, 2.6); }
            ctx.strokeStyle = 'rgba(200,240,255,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, iy); ctx.lineTo(w, iy); ctx.stroke();
            const nIons = Math.round(m * 10);
            W.forEach(p => { p.x += p.vx * dt; p.y += p.vy * dt; if (p.x < 0 || p.x > 1) p.vx *= -1; if (p.y < 0 || p.y > 1) p.vy *= -1; const y = p.y * (iy - 12) + 6; ball(ctx, '#ff5d5d', p.x * w, y, 4.5); ball(ctx, '#eef3ff', p.x * w + 4, y - 3, 2.6); });
            I.slice(0, nIons).forEach(p => { p.x += p.vx * dt; p.y += p.vy * dt; if (p.x < 0 || p.x > 1) p.vx *= -1; if (p.y < 0 || p.y > 1) p.vy *= -1; const y = p.y * (iy - 12) + 6; ball(ctx, p.p ? '#b38cff' : '#6fe3a0', p.x * w, y, p.p ? 4 : 5.5); });
            label(ctx, 'liquid water' + (nIons ? ' + Na⁺ / Cl⁻ ions' : ''), 10, 16, { size: 10, color: '#c9c8dc' }); label(ctx, 'ice', 10, Math.min(h - 6, iy + 16), { size: 10, color: '#c9c8dc' }); });
        }
      },
      lenses: ['Salted roads stay clear; sea water stays liquid below 0 °C; ice cream makers pack ice with salt.', 'Dissolved ions crowd the liquid and block water molecules from rejoining the ice crystal, so melting outpaces freezing.', 'ΔT<sub>f</sub> = i × K<sub>f</sub> × m', 'K<sub>f</sub> = 1.86 °C kg/mol for water; i = particles per formula (2 for NaCl); m = mol per kg of water.'],
      miracle: { ico: 'fish', title: 'Fish with antifreeze in their blood', html: '<p>Antarctic icefish swim in water at −1.9 °C, colder than the freezing point of their own blood. They survive thanks to <strong>antifreeze proteins</strong> that bind to tiny ice crystals and stop them growing.</p><p>Back in the kitchen, old-fashioned ice-cream makers surround the mix with ice and rock salt. The salty slush gets as cold as −10 °C or below, cold enough to freeze the cream.</p>', c1: '#5ce1e6', c2: '#a78bfa' },
      quiz: [
        { q: 'Why does dissolving salt lower the freezing point of water?', o: ['Salt is warm', 'Dissolved ions get in the way of water molecules joining the ice crystal', 'Salt reacts with water and releases heat', 'Salt makes water evaporate'], a: 1, w: 'Fewer water molecules can rejoin the solid, so melting wins at 0 °C and you have to go colder to freeze it.' },
        { q: 'Which lowers the freezing point more: 1 mol of sugar or 1 mol of salt (NaCl), each in 1 kg of water?', o: ['Sugar', 'Salt, because it splits into two ions', 'They are equal', 'Neither'], a: 1, w: 'Colligative effects depend on the number of dissolved particles. NaCl gives Na⁺ + Cl⁻, two particles per unit, so about double the effect.' }
      ],
      prompt: { p: 'Explain why spreading salt on an icy road works, and why it stops working in extreme cold.', m: 'Ice and liquid water are constantly swapping molecules at the surface. Dissolved salt ions crowd the thin layer of liquid, so fewer water molecules rejoin the ice and melting wins: the freezing point drops. But there is a limit. Even the most concentrated salt water freezes at about −21 °C, so below that salt can’t melt the ice.' }
    }
  ],
  extra: [
    { c: 1, q: 'What is standard atmospheric pressure at sea level?', o: ['1 Pa', '101,325 Pa (1 atm)', '10 atm', '0 atm'], a: 1, w: '1 atm = 101.3 kPa, roughly the weight of 1 kg on every square centimetre.' },
    { c: 2, q: 'If you halve the pressure on a gas at constant temperature, its volume…', o: ['halves', 'doubles', 'stays the same', 'quadruples'], a: 1, w: 'P × V is constant, so halving P doubles V.' },
    { c: 3, q: 'Convert 27 °C to kelvin.', o: ['27 K', '300 K', '246 K', '−246 K'], a: 1, w: '27 + 273 = 300 K.' },
    { c: 4, q: 'In a pressure cooker, water boils…', o: ['below 100 °C', 'at exactly 100 °C', 'above 100 °C', 'not at all'], a: 2, w: 'Higher pressure raises the boiling point, to about 120 °C at 2 atm.' },
    { c: 5, q: 'Which property depends only on the number of dissolved particles, not their type?', o: ['Colour', 'Freezing-point depression', 'Smell', 'Taste'], a: 1, w: 'Freezing-point depression and boiling-point elevation are colligative properties.' },
    { c: 2, q: 'The ideal gas law is…', o: ['P = nRT', 'PV = nRT', 'PV = constant', 'V = nT'], a: 1, w: 'PV = nRT combines Boyle’s, Charles’s and Avogadro’s laws. R = 8.314 J/(mol K).' }
  ],
  cards: [
    [1, 'What causes gas pressure?', 'Particles colliding with the walls of their container.'],
    [1, 'Pressure formula and unit?', 'P = F / A, measured in pascals (Pa). 1 atm = 101,325 Pa.'],
    [1, 'Two ways to increase gas pressure in a fixed container?', 'Add more particles, or heat it (faster, harder collisions).'],
    [2, 'Boyle’s law?', 'At constant temperature, P × V is constant: P₁V₁ = P₂V₂.'],
    [2, 'Why does squeezing a gas raise its pressure?', 'Particles hit the walls more often in the smaller space.'],
    [2, 'Why must divers exhale while rising?', 'Air in the lungs expands as water pressure drops and could over-inflate them.'],
    [3, 'Charles’s law?', 'At constant pressure, V ∝ T (in kelvin): V₁/T₁ = V₂/T₂.'],
    [3, 'What is absolute zero?', '0 K = −273.15 °C, the lowest possible temperature, where particle motion is at a minimum.'],
    [3, 'Convert °C to K.', 'Add 273.15 (often 273).'],
    [3, 'Ideal gas law?', 'PV = nRT, with R = 8.314 J/(mol K).'],
    [4, 'When does a liquid boil?', 'When its vapour pressure equals the surrounding pressure.'],
    [4, 'What is a phase diagram?', 'A map of pressure vs temperature showing the regions where a substance is solid, liquid or gas.'],
    [4, 'Triple point of water?', '0.01 °C and 0.006 atm: ice, water and vapour coexist.'],
    [4, 'Why do pressure cookers cook faster?', 'Higher pressure raises water’s boiling point to about 120 °C.'],
    [5, 'Freezing-point depression?', 'Dissolved particles lower the freezing point of a solvent.'],
    [5, 'Formula for freezing-point depression?', 'ΔT<sub>f</sub> = i × K<sub>f</sub> × m. For water, K<sub>f</sub> = 1.86 °C kg/mol.'],
    [5, 'What is a colligative property?', 'One that depends only on the number of dissolved particles, not their identity.'],
    [5, 'Why is salt (NaCl) twice as effective as sugar per mole?', 'It splits into two ions (i = 2).']
  ]
};
