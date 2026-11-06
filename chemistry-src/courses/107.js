const COURSE = {
  id: '107', title: 'The Balance', brand: 'The <i>Balance</i>',
  eyebrow: 'Chemistry 107 · Kinetics & equilibrium', titleHTML: 'The <em>Balance</em>',
  lede: 'One chemical reaction feeds half of humanity, and it never quite finishes. A mystery about how fast reactions run, why they stop, and how to push them where you want.',
  accent: ['#5ce1e6', '#6fe3a0'],
  cast: {
    Hb: { name: 'Fritz', full: 'Haber', color: '#ff9f5a', title: 'Made bread from air, and poison gas from chlorine', sym: 'Hb' },
    LC: { name: 'Henry', full: 'Le Chatelier', color: '#5ce1e6', title: 'Push a balance and it pushes back', sym: 'LC' },
    Ez: { name: 'Zyme', full: 'Enzyme', color: '#a78bfa', title: 'The fastest worker in the cell', sym: 'Ez' },
    eq: { name: 'Equi', full: 'Dynamic equilibrium', color: '#6fe3a0', title: 'Busy, yet nothing seems to change', sym: '⇌', orbit: true }
  },
  prologue: {
    short: 'Bread from Air', kicker: 'The case begins', titleHTML: 'Bread from <em>Air</em>',
    story: `<p>By 1900 the world faced a looming famine. Crops need nitrogen, and farms were running out of the natural fertiliser they mined: bird droppings and saltpetre from Chile. Meanwhile the air above every field was 78% nitrogen, locked in unbreakable N≡N triple bonds.</p>
      <p>In 1909, in a laboratory in Karlsruhe, <strong>Fritz Haber</strong> made a small machine drip liquid ammonia, NH₃, made from nothing but nitrogen and hydrogen. Scaled up by Carl Bosch, the <strong>Haber–Bosch process</strong> now makes over 150 million tonnes a year. About half the nitrogen atoms in your body passed through one of its reactors.</p>
      <p>But the reaction is strangely stubborn. It is slow. It never runs to completion. And making it give more product makes it slower. To understand why, you need to learn how fast reactions go, what controls their speed, and why so many end in a delicate balance.</p>`,
    cast: [['Hb', 'sly'], ['N', 'sleepy'], ['H', 'happy'], ['LC', 'happy'], ['eq', 'sly']]
  },
  finale: {
    q: 'Why does the Haber process never finish?', lead: 'Rates that fall over time, energy hills, enzymes that saturate, reactions running both ways, and balances that push back. One idea joins them.',
    avatar: 'eq', nameHTML: 'Dynamic <em>equilibrium</em>',
    html: `<p>Every reaction can run <strong>both forwards and backwards</strong>. As products build up, the reverse reaction speeds up, until the two rates are equal. From then on, nothing <em>seems</em> to change, yet molecules are reacting furiously in both directions.</p>
      <p>Rates depend on concentration and on how many collisions clear the activation-energy hill. Catalysts and enzymes lower that hill, speeding both directions equally. Where the balance settles is set by the equilibrium constant K, and when you disturb it by changing concentration, pressure or temperature, it shifts to oppose you (Le Chatelier).</p>
      <p>The Haber process is a deliberate compromise between <em>how much</em> and <em>how fast</em>, and it feeds half the world. Case closed.</p>`
  },
  cases: [
    {
      short: 'How Fast?', kicker: 'Reaction rates over time', titleHTML: 'How <em>Fast?</em>', item: 'The flat soda', ico: 'bottle', teaser: 'Fast then slow?',
      clue: 'The rate of a reaction depends on the concentration of reactants. As reactants are used up, the rate falls, so reactions slow down over time.',
      mystery: { q: 'A freshly opened bottle of soda fizzes furiously, then calms down, then goes flat very slowly over hours. Why does it slow down?', h: ['The bottle gets warmer', 'The rate depends on how much dissolved CO₂ is left; as it is used up, the rate falls', 'Bubbles block the opening'], a: 1, v: 'The speed of escape depends on the <b>concentration</b> of dissolved CO₂. At first there is lots, so the rate is high. As the gas escapes, there is less left to escape, so the rate falls. That gives a curve that drops steeply, then levels off: each equal stretch of time removes the same <i>fraction</i> of what remains.' },
      story: `<p>Chemistry isn’t only about <em>what</em> happens. It’s also about <em>how fast</em>. Iron rusts over years; dynamite explodes in microseconds; the browning of an apple takes minutes. The study of reaction speeds is called <strong>kinetics</strong>.</p>
        <p>The <strong>rate</strong> of a reaction is how quickly reactants disappear (or products appear), measured in moles per litre per second. In Chemistry 101 you met collision theory: particles must collide, hard enough. More particles in the same space means more collisions per second, so <strong>rate depends on concentration</strong>.</p>
        <p>That has a consequence. As a reaction proceeds, reactants are used up and their concentration falls, so the reaction <strong>slows down</strong>. For many reactions the rate is simply proportional to the concentration: <strong>rate = k[A]</strong>. Such "first-order" reactions have a constant <em>half-life</em>, just like radioactive decay: every half-life, half of what remains is gone.</p>`,
      lab: {
        label: 'Fizz tracker', title: 'Watch the rate fall',
        head: '<button class="btn primary small rs">↻ Open a new bottle</button>',
        body: `<div class="lab-grid"><div><div class="stage" style="height:300px"><canvas class="c" aria-label="Dissolved gas particles escaping over time"></canvas></div><div class="slider-row" style="margin-top:14px"><label>Rate constant k</label><input type="range" class="k" min="5" max="60" value="20" style="--track:linear-gradient(90deg,#3a3f66,#5ce1e6)"><span class="readout"><b class="ko"></b></span></div></div>
          <div class="side-panel"><div class="info-card"><canvas class="g" style="width:100%;height:200px" aria-label="Concentration against time"></canvas></div><div class="kv"><div><small>Left</small><b class="lf"></b></div><div><small>Current rate</small><b class="rt"></b></div><div><small>Half-life</small><b class="hl"></b></div></div></div></div>`,
        init(root) {
          let k = .2, hist = [], acc = 0, N0 = 80;
          const box = ParticleBox($('.c', root), { species: { a: { color: '#5ce1e6', r: 5, m: 1, glow: true } }, counts: { a: N0 }, speed: 40, collide: false, uni: [{ a: 'a', products: [], k: () => k, flash: '#5ce1e6' }],
            bg: (ctx, w, h, api) => { const f = api.count('a') / N0; ctx.fillStyle = `rgba(92,225,230,${.04 + f * .1})`; ctx.fillRect(0, 0, w, h); },
            onTick: (api, dt) => { acc += dt; if (acc > .25) { acc = 0; hist.push([api.S.t, api.count('a')]); if (hist.length > 400) hist.shift(); } } });
          const reset = () => { box.reset({ a: N0 }); hist = [[0, N0]]; };
          $('.rs', root).addEventListener('click', reset);
          slider($('.k', root), v => { k = v / 100; $('.ko', root).textContent = k.toFixed(2) + ' s⁻¹'; $('.hl', root).textContent = (Math.LN2 / k).toFixed(1) + ' s'; });
          animate($('.g', root), () => { const n = box.count('a'); $('.lf', root).textContent = n; $('.rt', root).textContent = (k * n).toFixed(1) + ' /s';
            const tm = Math.max(20, hist.length ? hist[hist.length - 1][0] : 0), th = []; for (let x = 0; x <= tm; x += tm / 80) th.push([x, N0 * Math.exp(-k * x)]);
            plot($('.g', root), { x: [0, tm], y: [0, N0], xt: [0, Math.round(tm / 2), Math.round(tm)], yt: [0, N0 / 2, N0], yf: v => Math.round(v / N0 * 100) + '%', xl: 'time (s)', yl: '[CO₂] left', series: [{ pts: th, color: 'rgba(255,255,255,.3)', dash: [4, 4], width: 1.5 }, { pts: hist, color: '#5ce1e6' }], hlines: [{ y: N0 / 2, color: 'rgba(244,195,90,.6)', label: 'half' }] }); });
        }
      },
      lenses: ['A newly opened soda fizzes wildly at first, then gently for hours.', 'Fewer dissolved molecules left means fewer escape each second: the rate is proportional to concentration.', 'rate = k[A]', 'k is the rate constant; [A] is concentration in mol/L. First order: half-life t½ = 0.693 / k.'],
      miracle: { ico: 'heart', title: 'Your body clears caffeine by first-order kinetics', html: '<p>After a cup of coffee, your liver breaks caffeine down at a rate proportional to how much is in your blood. Its half-life is about <strong>5 hours</strong> in most adults. An afternoon espresso still leaves a quarter of its caffeine in you at bedtime, ten hours later.</p><p>Doctors use the same maths to decide how often to give medicines, so the concentration stays in the useful range between doses.</p>', c1: '#c98a5e', c2: '#5ce1e6' },
      quiz: [
        { q: 'Why does a reaction usually slow down as it proceeds?', o: ['The catalyst wears out', 'Reactants are used up, so there are fewer collisions per second', 'Products block the reaction', 'Temperature always falls'], a: 1, w: 'Lower reactant concentration means fewer successful collisions per second.' },
        { q: 'A first-order reaction has a half-life of 10 s. What fraction remains after 30 s?', o: ['1/3', '1/8', '0', '1/2'], a: 1, w: 'Three half-lives: ½ × ½ × ½ = 1/8.' }
      ],
      prompt: { p: 'Sketch in words the graph of reactant concentration against time, and explain its shape.', m: 'The curve starts high and drops steeply, then flattens out and approaches zero gradually. At the start there are many reactant particles, so collisions and reactions are frequent and the concentration falls fast. As they’re used up, collisions become rarer, so the rate drops and the curve levels off.' }
    },
    {
      short: 'The Energy Hill', kicker: 'Activation energy & temperature', titleHTML: 'The Energy <em>Hill</em>', item: 'The 10-degree rule', ico: 'thermo', teaser: 'Why double?',
      clue: 'Only particles with energy above the activation energy can react. Warming shifts the energy distribution, so the fraction above the hill grows dramatically.',
      mystery: { q: 'Raising the temperature by just 10 °C, from 20 to 30 °C, makes the particles only about 2% faster. Yet many reactions roughly double in speed. How?', h: ['Particles get bigger when hot', 'The number of particles with enough energy to clear the activation-energy hill roughly doubles', 'Heat acts as a catalyst'], a: 1, v: 'The average speed barely changes, but reactions depend on the rare particles in the <b>high-energy tail</b> of the distribution, those above the activation energy. That tail is extremely sensitive to temperature: a small warming can double the number of particles that make it over the hill.' },
      story: `<p>Even a perfect collision only leads to a reaction if the particles hit with enough energy to start breaking bonds. That minimum is the <strong>activation energy</strong>, E<sub>a</sub>: a hill every reaction must climb before it can roll down the other side.</p>
        <p>In a gas or liquid, particles don’t all have the same energy. James Clerk Maxwell and Ludwig Boltzmann worked out the spread in the 1860s and 70s: a hump of particles with middling energy, and a long tail of a few with much more. Only the tail beyond E<sub>a</sub> can react.</p>
        <p>In 1889 the Swede <strong>Svante Arrhenius</strong> (whom you met in 101) captured the effect in an equation: <strong>k = A e<sup>−Ea/RT</sup></strong>. Because temperature sits inside an exponential, small warmings have big effects. A <strong>catalyst</strong> doesn’t change the particles at all. It provides a different route with a lower hill, so far more of the existing particles can get over it.</p>`,
      lab: {
        label: 'Maxwell–Boltzmann explorer', title: 'Who has enough energy?',
        head: '<button class="btn small cat">Add catalyst</button>',
        body: `<div class="lab-grid"><div><div class="stage" style="height:320px;padding:6px"><canvas class="c" aria-label="Distribution of molecular energies with the activation energy marked"></canvas></div><div class="slider-row" style="margin-top:14px"><label>Temperature</label><input type="range" class="t" min="250" max="400" value="293"><span class="readout"><b class="to"></b></span></div><div class="slider-row"><label>Activation energy</label><input type="range" class="e" min="20" max="80" value="50" style="--track:linear-gradient(90deg,#3a3f66,#ff9f5a)"><span class="readout"><b class="eo"></b></span></div></div>
          <div class="side-panel"><div class="kv"><div><small>Fraction over the hill</small><b class="fr"></b></div><div><small>Rate vs 20 °C</small><b class="rr" style="color:var(--gold)"></b></div></div><div class="info-card"><p class="tx" style="margin:0;font-size:14.5px;color:var(--soft)"></p></div></div></div>`,
        init(root) {
          let T = 293, Ea = 50, cat = false; const R = 8.314e-3;
          const f = (E, T) => 2 * Math.sqrt(E / Math.PI) * Math.pow(1 / (R * T), 1.5) * Math.exp(-E / (R * T));
          const frac = (Ea, T) => { const x = Ea / (R * T); return 2 * Math.sqrt(x / Math.PI) * Math.exp(-x) + (1 - erf(Math.sqrt(x))); };
          function erf(x) { const t = 1 / (1 + .3275911 * x); return 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - .284496736) * t + .254829592) * t * Math.exp(-x * x); }
          function draw() { const ea = cat ? Ea * .6 : Ea, fr = frac(ea, T), fr0 = frac(Ea, 293);
            $('.to', root).textContent = `${T} K (${T - 273} °C)`; $('.eo', root).textContent = `${Ea} kJ/mol${cat ? ' → ' + ea.toFixed(0) : ''}`; $('.fr', root).innerHTML = fmt(fr * 100, 2) + ' %'; $('.rr', root).innerHTML = '×' + fmt(fr / fr0, fr / fr0 > 100 ? 0 : 2);
            const pts = [], pts2 = [], tail = []; let mx = 0; for (let E = 0; E <= 30; E += .2) { const v = f(E, T); pts.push([E, v]); mx = Math.max(mx, v); pts2.push([E, f(E, 293)]); }
            const tailMax = f(Math.max(ea, 0.1), T), mag = Math.pow(10, Math.max(0, Math.floor(Math.log10(mx * .35 / tailMax))));
            const E1 = Math.min(ea, 79), EmaxPlot = 80; for (let E = E1; E <= EmaxPlot; E += .5) tail.push([E, Math.min(mx * 1.1, f(E, T) * mag)]);
            const curve = []; for (let E = 0; E <= EmaxPlot; E += .5) curve.push([E, f(E, T)]);
            const P = plot($('.c', root), { x: [0, EmaxPlot], y: [0, mx * 1.15], xt: [0, 20, 40, 60, 80], yt: [], xl: 'energy of a collision (kJ/mol)', yl: 'number of particles', padL: 30,
              areas: [{ pts: tail, color: 'rgba(255,159,90,.45)' }], series: [{ pts: pts2.concat([[80, 0]]), color: 'rgba(255,255,255,.25)', dash: [4, 4], width: 1.2 }, { pts: curve, color: '#5ce1e6' }, { pts: tail, color: '#ff9f5a', width: 1.5 }],
              vlines: [{ x: ea, color: cat ? '#6fe3a0' : '#ff9f5a', label: (cat ? 'catalysed ' : '') + 'Eₐ' }].concat(cat ? [{ x: Ea, color: 'rgba(255,159,90,.5)', label: 'old Eₐ' }] : []) });
            label(P.ctx, `orange tail magnified ×10${String(Math.round(Math.log10(mag))).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]).join('')}`, P.L + P.pw - 4, P.T + 28, { align: 'right', size: 10, color: '#ff9f5a' }); label(P.ctx, 'dashed: 20 °C', P.L + P.pw - 4, P.T + 42, { align: 'right', size: 10, color: '#8f8eab' });
            $('.tx', root).innerHTML = cat ? 'The catalyst offers a lower hill. Far more of the <i>same</i> particles now have enough energy, so the rate soars without heating.' : T > 300 ? `At ${T - 273} °C the hump shifts only slightly right, but the orange tail beyond the hill grows a lot. That tail is where reactions happen.` : 'Only collisions in the orange tail have enough energy to react. Warm things up and watch the tail.'; }
          slider($('.t', root), v => { T = v; draw(); }); slider($('.e', root), v => { Ea = v; draw(); });
          $('.cat', root).addEventListener('click', () => { cat = !cat; $('.cat', root).classList.toggle('on', cat); $('.cat', root).textContent = cat ? 'Catalyst added ✓' : 'Add catalyst'; draw(); });
          new ResizeObserver(draw).observe($('.c', root));
        }
      },
      lenses: ['Food keeps in the fridge; glow sticks blaze in hot water; a match needs a strike to light.', 'Only collisions with energy above Eₐ react. A slight warming greatly enlarges that high-energy minority.', 'k = A e<sup>−Eₐ/RT</sup>', 'The Arrhenius equation: rate constant k rises exponentially with temperature T.'],
      miracle: { ico: 'flame', title: 'Why a match needs a strike', html: '<p>A matchstick head and the air around it are a perfect mix of fuel and oxidiser, yet they sit in the box for years without reacting. The activation-energy hill is too high for room-temperature collisions.</p><p>Striking the match generates a burst of frictional heat, enough for a few molecules to clear the hill. Their reaction releases heat, which pushes more over the hill, and the flame runs away by itself. Exothermic reactions can supply their own activation energy once started.</p>', c1: '#ff9f5a', c2: '#ff5d5d' },
      quiz: [
        { q: 'What is activation energy?', o: ['The energy released by a reaction', 'The minimum collision energy needed for a reaction to occur', 'The energy of the products', 'The heat capacity of the reactants'], a: 1, w: 'It is the hill that colliding particles must climb before bonds can rearrange.' },
        { q: 'How does a catalyst speed up a reaction?', o: ['It heats the reactants', 'It provides a route with a lower activation energy', 'It increases the concentration', 'It is used up as fuel'], a: 1, w: 'A catalyst lowers the hill, so more existing collisions succeed. It isn’t consumed.' }
      ],
      prompt: { p: 'Explain why a small temperature rise can double a reaction rate, using the idea of an energy distribution.', m: 'Particles have a spread of energies: most are moderate, and a few in the tail have a lot. Only those above the activation energy can react. Warming slightly shifts the whole distribution to higher energies; the average hardly changes, but the number in the high-energy tail grows sharply, often doubling for a 10 °C rise. So twice as many collisions succeed.' }
    },
    {
      short: 'Nature’s Catalysts', kicker: 'Enzymes & saturation', titleHTML: 'Nature’s <em>Catalysts</em>', item: 'The foaming wound', ico: 'gear', teaser: 'Why does it fizz?',
      clue: 'Enzymes are biological catalysts with active sites shaped for one substrate. Rate rises with substrate concentration until every enzyme is busy (saturation).',
      mystery: { q: 'Pour hydrogen peroxide on a cut and it foams instantly. In the bottle it barely changes for months. What’s different?', h: ['Blood is hot', 'An enzyme in your blood (catalase) breaks peroxide down millions of times faster', 'Air in the wound reacts with it'], a: 1, v: 'Your blood and cells contain <b>catalase</b>, one of the fastest enzymes known. Each molecule converts about <b>40 million</b> peroxide molecules into water and oxygen every second. The oxygen bubbles make the foam. Without the enzyme, the same reaction takes months.' },
      story: `<p>Almost every reaction in your body would be far too slow at 37 °C without help. That help comes from <strong>enzymes</strong>: protein catalysts, each folded into a precise 3D shape with a pocket called the <strong>active site</strong>.</p>
        <p>In 1894 <strong>Emil Fischer</strong> compared an enzyme and its target molecule (the <em>substrate</em>) to a <strong>lock and key</strong>: only the right shape fits. The substrate slips in, the enzyme holds it in a strained position that lowers the activation energy, the products pop out, and the enzyme is ready again, unchanged.</p>
        <p>In 1913 two scientists in Berlin, <strong>Maud Menten</strong> and <strong>Leonor Michaelis</strong>, measured how enzyme rates depend on substrate. At low concentration, more substrate means more reactions. But eventually every enzyme molecule is busy, and adding more substrate does nothing: the enzymes are <strong>saturated</strong>, like checkout tills on a busy Saturday.</p>`,
      lab: {
        label: 'Enzyme factory', title: 'Feed the enzymes',
        body: `<div class="lab-grid"><div><div class="stage" style="height:320px"><canvas class="c" aria-label="Enzymes binding substrates and releasing products"></canvas></div><div class="slider-row" style="margin-top:14px"><label>Substrate</label><input type="range" class="s" min="2" max="70" value="10" style="--track:linear-gradient(90deg,#3a3f66,#ff9f5a)"><span class="readout"><b class="so"></b></span></div></div>
          <div class="side-panel"><div class="info-card"><canvas class="g" style="width:100%;height:200px" aria-label="Reaction rate against substrate concentration"></canvas></div><div class="kv"><div><small>Enzymes busy</small><b class="bz"></b></div><div><small>Products / s</small><b class="rt"></b></div></div><p class="hint tx" style="font-size:13px">Points are recorded every few seconds. Try low, medium and high substrate.</p></div></div>`,
        init(root) {
          const c = $('.c', root); let nS = 10, S = [], prods = [], E = [], evts = [], pts = [], acc = 0;
          const mkS = (w, h) => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * 120, vy: (Math.random() - .5) * 120 });
          slider($('.s', root), v => { nS = v; $('.so', root).textContent = v + ' molecules'; evts = []; acc = 0; });
          animate(c, (dt, t) => { const { ctx, w, h } = fit(c); ctx.clearRect(0, 0, w, h);
            if (E.length === 0) for (let i = 0; i < 6; i++) E.push({ x: w * (.15 + (i % 3) * .35), y: h * (i < 3 ? .3 : .72), a: i * 1.3, busy: 0, sub: null });
            while (S.length < nS) S.push(mkS(w, h)); while (S.length > nS) S.pop();
            for (const s of S) { s.x += s.vx * dt; s.y += s.vy * dt; if (s.x < 0 || s.x > w) s.vx *= -1; if (s.y < 0 || s.y > h) s.vy *= -1; s.x = clamp(s.x, 0, w); s.y = clamp(s.y, 0, h); }
            for (const e of E) { const sx = e.x + Math.cos(e.a) * 30, sy = e.y + Math.sin(e.a) * 30;
              if (e.busy > 0) { e.busy -= dt; if (e.busy <= 0) { prods.push({ x: sx, y: sy, vx: Math.cos(e.a) * 140 + (Math.random() - .5) * 60, vy: Math.sin(e.a) * 140 + (Math.random() - .5) * 60, life: 1.6 }); evts.push(t); } }
              else for (let i = 0; i < S.length; i++) { const s = S[i]; if ((s.x - sx) ** 2 + (s.y - sy) ** 2 < 22 * 22) { e.busy = .9; S.splice(i, 1); S.push(mkS(w, h)); break; } }
              e.a += dt * .3;
              ctx.save(); ctx.translate(e.x, e.y); ctx.rotate(e.a); const g = ctx.createRadialGradient(-8, -8, 2, 0, 0, 34); g.addColorStop(0, '#d9c8ff'); g.addColorStop(1, '#5b3aa0'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 32, .45, TAU - .45); ctx.lineTo(14, 0); ctx.closePath(); ctx.fill(); if (e.busy > 0) { ball(ctx, '#ff9f5a', 26, 0, 7); glow(ctx, 22, 0, 22, '#ffd36e', .6); } ctx.restore(); }
            for (const s of S) ball(ctx, '#ff9f5a', s.x, s.y, 6);
            for (const p of prods) { p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; ctx.globalAlpha = Math.max(0, p.life); ball(ctx, '#6fe3a0', p.x - 4, p.y, 4.5); ball(ctx, '#6fe3a0', p.x + 4, p.y + 3, 4.5); ctx.globalAlpha = 1; }
            prods = prods.filter(p => p.life > 0); evts = evts.filter(x => t - x < 4);
            const rate = evts.length / 4, busy = E.filter(e => e.busy > 0).length; $('.bz', root).textContent = `${busy} / ${E.length}`; $('.rt', root).textContent = rate.toFixed(1);
            acc += dt; if (acc > 4.5) { acc = 0; pts.push([nS, rate]); if (pts.length > 30) pts.shift(); }
            const vmax = 6 / .9, km = 14, th = []; for (let x = 0; x <= 72; x += 1) th.push([x, vmax * x / (km + x)]);
            plot($('.g', root), { x: [0, 72], y: [0, 8], xt: [0, 20, 40, 60], yt: [0, 2, 4, 6, 8], xl: 'substrate', yl: 'rate', series: [{ pts: th, color: 'rgba(167,139,250,.5)', dash: [4, 4], width: 1.5 }, { pts: pts.slice().sort((a, b) => a[0] - b[0]), color: '#ff9f5a', dots: true, width: 0 }], hlines: [{ y: vmax, color: 'rgba(255,255,255,.3)', label: 'max rate (all busy)' }], marks: [{ x: nS, y: rate, color: '#fff', r: 4 }] }); });
        }
      },
      lenses: ['Biological washing powder removes stains at 30 °C; pineapple stops jelly setting; peroxide foams on a cut.', 'Each enzyme binds its substrate in an active site shaped to fit, lowers the activation energy, releases products and repeats.', 'E + S ⇌ ES → E + P', 'Enzyme + substrate form a complex, which turns into product and releases the enzyme unchanged.'],
      miracle: { ico: 'drop', title: 'Why fresh pineapple ruins jelly', html: '<p>Fresh pineapple contains <strong>bromelain</strong>, an enzyme that cuts proteins. Gelatin, the stuff that sets jelly, is a protein. Add fresh pineapple and the enzyme chops the gelatin chains to pieces, so the jelly never sets.</p><p>Tinned pineapple works fine: canning heats the fruit, and heat unfolds the enzyme, destroying its active site. Enzymes are powerful, but delicate.</p>', c1: '#f4d35a', c2: '#a78bfa' },
      quiz: [
        { q: 'What happens to an enzyme-catalysed rate at very high substrate concentration?', o: ['It keeps rising forever', 'It levels off, because all enzymes are busy (saturated)', 'It drops to zero', 'The enzyme is used up'], a: 1, w: 'With every active site occupied, extra substrate just waits in line.' },
        { q: 'Why does boiling usually stop an enzyme from working?', o: ['It kills the substrate', 'Heat unfolds the protein and destroys the active site’s shape', 'It removes water', 'Enzymes need cold'], a: 1, w: 'Shape is everything for enzymes. Heat denatures them.' }
      ],
      prompt: { p: 'Use the "checkout tills" analogy to explain enzyme saturation.', m: 'Think of enzymes as checkout tills and substrate molecules as shoppers. With few shoppers, more shoppers means more served per minute. But once every till is busy, adding more shoppers just makes the queue longer; the number served per minute can’t rise. Enzymes work the same way: once every active site is occupied, the rate reaches its maximum.' }
    },
    {
      short: 'Both Ways at Once', kicker: 'Dynamic equilibrium & K', titleHTML: 'Both Ways at <em>Once</em>', item: 'The sealed fizzy bottle', ico: 'bottle', teaser: 'Why does it stay fizzy?',
      clue: 'Reversible reactions reach dynamic equilibrium: forward and backward rates become equal, so concentrations stop changing, even though reactions continue.',
      mystery: { q: 'An opened soda goes flat. But a sealed bottle stays fizzy for years. Isn’t the CO₂ still trying to escape from the liquid?', h: ['The cap pushes it back in', 'Yes: CO₂ escapes into the gap at the top, and returns to the liquid at exactly the same rate', 'CO₂ can’t move in a sealed bottle'], a: 1, v: 'In the sealed bottle, CO₂ molecules leave the liquid for the gas space, and gas molecules dissolve back in. Soon the two rates are equal: a <b>dynamic equilibrium</b>. Nothing seems to change, yet molecules swap places constantly. Open the cap, the gas escapes, the balance is broken, and more CO₂ leaves the liquid to replace it.' },
      story: `<p>Many reactions don’t simply run to completion. They are <strong>reversible</strong>: products can react to re-form reactants. Start with only reactants and the forward reaction is fast. As products build up, the reverse reaction speeds up. Eventually the two rates become <strong>equal</strong>.</p>
        <p>From then on the amounts stop changing. This is <strong>dynamic equilibrium</strong>: dynamic, because both reactions keep going at furious speed; equilibrium, because their effects cancel. It’s like an escalator on which you walk down exactly as fast as it carries you up.</p>
        <p>In 1864 two Norwegians, <strong>Cato Guldberg</strong> and <strong>Peter Waage</strong>, found that at equilibrium a particular ratio of concentrations is always the same at a given temperature: the <strong>equilibrium constant</strong>, K. For N₂O₄ ⇌ 2 NO₂, K = [NO₂]² / [N₂O₄]. Big K means mostly products; small K, mostly reactants.</p>`,
      lab: {
        label: 'Brown gas balance', title: 'N₂O₄ ⇌ 2 NO₂',
        head: '<button class="btn primary small rs">↻ Start with pure N₂O₄</button>',
        body: `<div class="lab-grid"><div><div class="stage" style="height:300px"><canvas class="c" aria-label="Colourless N2O4 splitting into brown NO2 and recombining"></canvas></div><div class="slider-row" style="margin-top:14px"><label>Temperature</label><input type="range" class="t" min="0" max="100" value="40"><span class="readout"><b class="to"></b></span></div></div>
          <div class="side-panel"><div class="info-card"><canvas class="g" style="width:100%;height:190px" aria-label="Amounts of N2O4 and NO2 over time"></canvas><div class="legend"><span><i style="background:#e8ecf5"></i>N₂O₄ (colourless)</span><span><i style="background:#c46a3a"></i>NO₂ (brown)</span></div></div><div class="kv"><div><small>N₂O₄</small><b class="a"></b></div><div><small>NO₂</small><b class="b"></b></div><div><small>K (relative)</small><b class="k"></b></div></div></div></div>`,
        init(root) {
          let T = .4, hist = [], acc = 0;
          const box = ParticleBox($('.c', root), { species: { N: { color: '#e8ecf5', r: 7, m: 2, draw: (ctx, p) => { ball(ctx, '#d6dbe8', p.x - 4, p.y, 5.5); ball(ctx, '#d6dbe8', p.x + 4, p.y, 5.5); } }, B: { color: '#c46a3a', r: 5.5, m: 1, glow: true } }, counts: { N: 40 }, speed: 55, collide: true,
            uni: [{ a: 'N', products: ['B', 'B'], k: () => .02 + T * .5 }], reactions: [{ a: 'B', b: 'B', products: ['N'], Ea: 0, p: () => .55 - T * .35 }],
            bg: (ctx, w, h, api) => { const b = api.count('B'); ctx.fillStyle = `rgba(196,106,58,${Math.min(.35, b / 200)})`; ctx.fillRect(0, 0, w, h); },
            onTick: (api, dt) => { acc += dt; if (acc > .25) { acc = 0; hist.push([api.S.t, api.count('N'), api.count('B')]); if (hist.length > 300) hist.shift(); } } });
          const reset = () => { box.reset({ N: 40 }); hist = []; };
          $('.rs', root).addEventListener('click', reset);
          slider($('.t', root), v => { T = v / 100; box.setT(.6 + T * .8); $('.to', root).textContent = Math.round(-10 + v * .9) + ' °C'; });
          animate($('.g', root), () => { const a = box.count('N'), b = box.count('B'); $('.a', root).textContent = a; $('.b', root).textContent = b; $('.k', root).textContent = a ? (b * b / a / 10).toFixed(1) : '∞';
            const tm = Math.max(20, hist.length ? hist[hist.length - 1][0] - (hist[0] ? hist[0][0] : 0) : 0), t0 = hist.length ? hist[0][0] : 0;
            plot($('.g', root), { x: [0, tm], y: [0, 80], xt: [0, Math.round(tm)], yt: [0, 20, 40, 60, 80], xl: 'time', yl: 'molecules', series: [{ pts: hist.map(q => [q[0] - t0, q[1]]), color: '#e8ecf5' }, { pts: hist.map(q => [q[0] - t0, q[2]]), color: '#c46a3a' }] }); });
        }
      },
      dialogue: [['eq', 'sly', 'EQUI · dynamic equilibrium', '“People think I’m lazy because nothing changes. In fact, millions of molecules are splitting and joining every second. I’m just perfectly balanced.”'], ['LC', 'happy', 'HENRY · Le Chatelier', '“And if you push me, I push back. Heat me up and I’ll make more brown gas to soak up the heat. You’ll see in the next case.”']],
      lenses: ['A sealed tube of brown gas gets darker when warmed and paler when cooled, but in each condition its colour holds steady.', 'N₂O₄ molecules split into NO₂ while NO₂ pairs join into N₂O₄, at equal rates.', 'N₂O₄ ⇌ 2 NO₂ &nbsp; K = [NO₂]² / [N₂O₄]', 'The double arrow ⇌ marks a reversible reaction. K is fixed for a given temperature.'],
      miracle: { ico: 'heart', title: 'Your blood is an equilibrium in motion', html: '<p>Haemoglobin in your red blood cells binds oxygen reversibly: Hb + O₂ ⇌ HbO₂. In your lungs, where oxygen is plentiful, the equilibrium shifts right and haemoglobin loads up. In your muscles, where oxygen is scarce, it shifts left and oxygen is released.</p><p>The same molecule loads and unloads, every lap of your circulation (about once a minute), all governed by equilibrium.</p>', c1: '#ff5d5d', c2: '#6fe3a0' },
      quiz: [
        { q: 'At dynamic equilibrium…', o: ['all reactions have stopped', 'the forward and backward reactions happen at equal rates', 'there are no reactants left', 'concentrations of reactants and products are always equal'], a: 1, w: 'The rates are equal, so amounts stop changing. The amounts themselves need not be equal.' },
        { q: 'A reaction has a very large K. At equilibrium the mixture is…', o: ['mostly reactants', 'mostly products', 'exactly half and half', 'empty'], a: 1, w: 'K = products ÷ reactants. Large K means products dominate.' }
      ],
      prompt: { p: 'Explain why dynamic equilibrium is "dynamic" and why it is an "equilibrium".', m: 'It’s dynamic because both the forward and the reverse reactions never stop: molecules keep converting in both directions. It’s an equilibrium because the two rates are exactly equal, so the overall amounts of reactants and products stay constant and nothing appears to change from outside.' }
    },
    {
      short: 'Le Chatelier’s Revenge', kicker: 'Shifting equilibrium · the Haber process', titleHTML: 'Le Chatelier’s <em>Revenge</em>', item: 'The fertiliser factory', ico: 'gear', teaser: 'Why the "wrong" temperature?',
      clue: 'If you disturb an equilibrium, it shifts to oppose the change (Le Chatelier). Industry balances yield against rate: a compromise.',
      mystery: { q: 'Making ammonia (N₂ + 3 H₂ ⇌ 2 NH₃) gives more product at low temperatures. So why do factories run it at a hot 450 °C, which gives LESS?', h: ['Hot ammonia is purer', 'At low temperature the reaction is far too slow; 450 °C is a compromise between yield and speed', 'The catalyst melts at lower temperatures'], a: 1, v: 'The forward reaction is exothermic, so <b>Le Chatelier</b> says cooling shifts the equilibrium towards ammonia. But cold collisions rarely clear the activation-energy hill, so the reaction would crawl. Running hot (with an iron catalyst and 200 atm pressure) gives a smaller yield very fast, and unreacted gas is recycled. Speed wins the economics.' },
      story: `<p>In 1884 the French chemist <strong>Henry Le Chatelier</strong> described how equilibria respond to being disturbed. His principle: <strong>if you change the conditions of a system at equilibrium, it shifts to counteract the change</strong>.</p>
        <p>Add more reactant, and the equilibrium shifts to use it up, making more product. Increase the pressure, and it shifts towards the side with fewer gas molecules, to reduce the pressure. For ammonia, 4 molecules (N₂ + 3 H₂) become 2 (2 NH₃), so high pressure favours ammonia. Raise the temperature, and it shifts in the direction that absorbs heat. Ammonia formation releases heat, so heating shifts it <em>backwards</em>.</p>
        <p>Haber’s genius was the compromise: high pressure (around 200 atm), a moderate temperature (about 450 °C), an iron catalyst, and recycling of unreacted gas. His legacy is double-edged. The same Haber who fed the world also directed Germany’s chlorine-gas attacks in the First World War. He received the Nobel Prize in 1918 amid fierce protest.</p>`,
      lab: {
        label: 'Ammonia plant control room', title: 'Set the conditions',
        body: `<div class="lab-grid"><div class="stage" style="height:340px;padding:6px"><canvas class="c" aria-label="Equilibrium yield of ammonia against temperature"></canvas></div><div class="side-panel"><div class="slider-row"><label>Temp</label><input type="range" class="t" min="200" max="700" value="450"><span class="readout"><b class="to"></b></span></div><div class="slider-row"><label>Pressure</label><input type="range" class="p" min="1" max="400" value="200" style="--track:linear-gradient(90deg,#3a3f66,#a78bfa)"><span class="readout"><b class="po"></b></span></div>
          <div class="kv"><div><small>Equilibrium yield</small><b class="y" style="color:var(--green)"></b></div><div><small>Speed (relative)</small><b class="s" style="color:var(--gold)"></b></div><div><small>Ammonia per hour</small><b class="o" style="color:var(--pink)"></b></div></div><div class="info-card"><p class="tx" style="margin:0;font-size:14px;color:var(--soft)"></p></div></div></div>`,
        init(root) {
          const R = 8.314; let T = 450, P = 200;
          const Kp = Tk => Math.exp(-(-92000 + Tk * 198) / (R * Tk));
          function yieldAt(Tc, P) { const K = Kp(Tc + 273.15) * P * P; let lo = 0, hi = .9999; for (let i = 0; i < 60; i++) { const x = (lo + hi) / 2, n = 4 - 2 * x, yN = 2 * x / n, yA = (1 - x) / n, yB = (3 - 3 * x) / n, q = yN * yN / (yA * yB * yB); if (q > K) hi = x; else lo = x; } const x = lo; return 2 * x / (4 - 2 * x); }
          const speed = Tc => Math.exp(-80000 / R * (1 / (Tc + 273.15) - 1 / 723.15));
          function draw() { const y = yieldAt(T, P), s = speed(T), out = y * Math.min(s, 3) * (1 - Math.exp(-P / 150));
            $('.to', root).textContent = T + ' °C'; $('.po', root).textContent = P + ' atm'; $('.y', root).textContent = (y * 100).toFixed(0) + '%'; $('.s', root).textContent = '×' + fmt(s, s < 1 ? 3 : 1); $('.o', root).textContent = (out * 100).toFixed(0);
            const ser = [1, 50, 200, 400].map((pp, i) => { const pts = []; for (let t = 200; t <= 700; t += 10) pts.push([t, yieldAt(t, pp) * 100]); return { pts, color: ['#3a4a8a', '#5a6ad0', '#6fe3a0', '#a78bfa'][i], width: pp === P ? 3 : 1.5 }; });
            const cur = []; for (let t = 200; t <= 700; t += 10) cur.push([t, yieldAt(t, P) * 100]);
            const out2 = []; for (let t = 200; t <= 700; t += 10) out2.push([t, yieldAt(t, P) * Math.min(speed(t), 3) * (1 - Math.exp(-P / 150)) * 100 * .6]);
            const M = plot($('.c', root), { x: [200, 700], y: [0, 100], xt: [200, 300, 400, 500, 600, 700], xf: v => v + '°', yt: [0, 25, 50, 75, 100], yf: v => v + '%', xl: 'temperature (°C)', yl: 'NH₃ at equilibrium', series: ser.concat([{ pts: cur, color: '#6fe3a0', width: 3 }, { pts: out2, color: '#ff6b9a', dash: [5, 4], width: 2 }]), marks: [{ x: T, y: y * 100, color: '#fff' }], vlines: [{ x: 450, color: 'rgba(244,195,90,.5)', label: 'industry' }] });
            label(M.ctx, `green: yield at ${P} atm · pink dashed: ammonia per hour`, M.L + 6, M.T + M.ph - 8, { size: 10, color: '#c9c8dc' });
            $('.tx', root).innerHTML = T < 350 ? '<b>Great yield, terrible speed.</b> Cooling favours the exothermic forward reaction (Le Chatelier), but collisions rarely clear the energy hill. The plant would barely produce anything.' : T > 550 ? '<b>Fast, but the equilibrium has shifted back.</b> Heating favours the endothermic reverse reaction, and most ammonia breaks down again.' : P < 80 ? '<b>Low pressure hurts.</b> 4 gas molecules become 2, so higher pressure pushes the equilibrium towards ammonia.' : '<b>The industrial compromise.</b> Moderate temperature for speed, high pressure for yield, an iron catalyst, and unreacted gas recycled round and round.'; }
          slider($('.t', root), v => { T = v; draw(); }); slider($('.p', root), v => { P = v; draw(); }); new ResizeObserver(draw).observe($('.c', root));
        }
      },
      lenses: ['Huge steel reactors, compressors roaring, sacks of fertiliser, and the bread on your table.', 'Squeezing favours the side with fewer gas molecules; heating favours the side that absorbs heat; removing product pulls the reaction forward.', 'N₂ + 3 H₂ ⇌ 2 NH₃ &nbsp; ΔH = −92 kJ', 'Exothermic forward, 4 gas molecules → 2. So low T and high P favour ammonia.'],
      miracle: { ico: 'leaf', title: 'Half the nitrogen in you came from a factory', html: '<p>Measurements of nitrogen isotopes suggest that about half the nitrogen atoms in the average human body were fixed by the Haber–Bosch process before reaching our food. Without it, the world could feed perhaps only half its current population.</p><p>The process also uses about 1–2% of all the world’s energy and causes a significant share of greenhouse emissions, which is why chemists today are racing to find greener catalysts, inspired by the bacteria that do it at room temperature.</p>', c1: '#6fe3a0', c2: '#f4c35a' },
      quiz: [
        { q: 'For N₂ + 3 H₂ ⇌ 2 NH₃, increasing the pressure shifts the equilibrium…', o: ['left, towards N₂ and H₂', 'right, towards NH₃ (fewer gas molecules)', 'nowhere', 'it stops the reaction'], a: 1, w: 'Higher pressure favours the side with fewer gas molecules: 2 versus 4.' },
        { q: 'Adding a catalyst to a reaction at equilibrium…', o: ['shifts it towards products', 'shifts it towards reactants', 'doesn’t change the position, but equilibrium is reached faster', 'increases K'], a: 2, w: 'A catalyst speeds up both directions equally. It changes how fast, not where the balance sits.' }
      ],
      prompt: { p: 'Explain, as if to a factory manager, why the Haber process runs at 450 °C rather than at 200 °C.', m: 'At 200 °C the equilibrium would give a higher percentage of ammonia, because the forward reaction releases heat and cooling favours it. But at that temperature very few collisions have enough energy to react, even with the catalyst, so the reaction would be painfully slow. At 450 °C we get a lower yield per pass, about 15–30%, but very quickly, and we recycle the unreacted gas. Overall, far more ammonia is made per hour.' }
    }
  ],
  extra: [
    { c: 1, q: 'Rate = k[A]. If [A] is doubled, the rate…', o: ['halves', 'doubles', 'stays the same', 'quadruples'], a: 1, w: 'First order: rate is directly proportional to [A].' },
    { c: 2, q: 'Why do refrigerators slow food spoilage?', o: ['They remove oxygen', 'Fewer collisions have enough energy to overcome activation energy', 'They kill all bacteria', 'They add a catalyst'], a: 1, w: 'Lower temperature shrinks the high-energy tail of the energy distribution.' },
    { c: 3, q: 'The part of an enzyme where the substrate binds is called…', o: ['the nucleus', 'the active site', 'the product site', 'the catalyst'], a: 1, w: 'The active site’s shape matches the substrate: lock and key.' },
    { c: 4, q: 'Which symbol shows a reversible reaction?', o: ['→', '⇌', '=', '↑'], a: 1, w: 'The double half-arrow means the reaction runs both ways.' },
    { c: 5, q: 'For an exothermic reaction at equilibrium, raising the temperature shifts the equilibrium…', o: ['towards products', 'towards reactants', 'nowhere', 'faster towards products'], a: 1, w: 'Heating favours the endothermic direction, which for an exothermic forward reaction is the reverse.' }
  ],
  cards: [
    [1, 'What is reaction rate?', 'The change in concentration of a reactant or product per unit time.'],
    [1, 'Why do reactions slow down over time?', 'Reactants are used up, so collisions become less frequent.'],
    [1, 'First-order rate law?', 'rate = k[A]; half-life t½ = 0.693/k (constant).'],
    [2, 'Activation energy?', 'The minimum energy colliding particles need to react.'],
    [2, 'Maxwell–Boltzmann distribution?', 'The spread of particle energies: a hump plus a long high-energy tail.'],
    [2, 'Arrhenius equation?', 'k = A e<sup>−Ea/RT</sup>: rate constants rise exponentially with temperature.'],
    [2, 'How do catalysts work?', 'They provide an alternative route with a lower activation energy, and are not consumed.'],
    [3, 'What is an enzyme?', 'A protein catalyst with an active site shaped for a specific substrate.'],
    [3, 'Lock-and-key model?', 'Only a substrate of the right shape fits an enzyme’s active site (Fischer, 1894).'],
    [3, 'Enzyme saturation?', 'At high substrate concentration, all active sites are busy and the rate reaches a maximum.'],
    [3, 'What is denaturation?', 'Loss of an enzyme’s shape (and function), e.g. by heat or extreme pH.'],
    [4, 'Dynamic equilibrium?', 'Forward and reverse rates are equal, so concentrations stay constant while reactions continue.'],
    [4, 'Equilibrium constant for aA ⇌ bB?', 'K = [B]<sup>b</sup> / [A]<sup>a</sup> (products over reactants).'],
    [4, 'Large vs small K?', 'Large K: mostly products. Small K: mostly reactants.'],
    [5, 'Le Chatelier’s principle?', 'A system at equilibrium shifts to counteract any change imposed on it.'],
    [5, 'Effect of pressure on gas equilibria?', 'Higher pressure favours the side with fewer gas molecules.'],
    [5, 'Effect of a catalyst on equilibrium?', 'None on the position. It only helps equilibrium be reached faster.'],
    [5, 'Haber process conditions?', 'About 450 °C, 200 atm, iron catalyst, with recycling of unreacted gases.']
  ]
};
