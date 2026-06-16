/* =========================================================
   encontro.me — interações da landing
   ========================================================= */
(function () {
  'use strict';

  /* ---------- helpers ---------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };

  /* paleta para avatares/thumbs */
  const TONES = [
    'linear-gradient(135deg,#5a22d6,#401970)',
    'linear-gradient(135deg,#C9B8F0,#4A15BD)',
    'linear-gradient(135deg,#F2A15E,#4A15BD)',
    'linear-gradient(135deg,#7c4ad6,#401970)',
    'linear-gradient(135deg,#f7b377,#4A15BD)'
  ];
  const tone = i => TONES[i % TONES.length];
  const initials = name => name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  /* =========================================================
     1. HEADER scroll + menu mobile
     ========================================================= */
  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = $('#menuToggle');
  const nav = $('#mainNav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  $$('#mainNav a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  /* =========================================================
     2. VITRINE — carrossel infinito
     ========================================================= */
  const vitrine = [
    { emoji: '☕', tone: 0, cat: 'Alimentação', nome: 'Café 35', txt: '10% de desconto para participantes da comunidade.', tag: 'Cupom ativo' },
    { emoji: '🏠', tone: 1, cat: 'Imóveis', nome: 'Invictta Imobiliária', txt: 'Consultoria gratuita para o primeiro imóvel.', tag: 'Benefício' },
    { emoji: '🧶', tone: 2, cat: 'Artesanato', nome: 'Crochê Lara', txt: 'Frete grátis durante todo o mês.', tag: 'Promoção' },
    { emoji: '💄', tone: 3, cat: 'Beleza', nome: 'Studio Bella', txt: 'Lançamento: linha de skincare natural.', tag: 'Lançamento' },
    { emoji: '📸', tone: 4, cat: 'Serviços', nome: 'Marina Fotografia', txt: 'Ensaio de marca com 20% off para associadas.', tag: 'Desconto' },
    { emoji: '👗', tone: 0, cat: 'Moda', nome: 'Lara Moda', txt: 'Nova coleção outono com brinde exclusivo.', tag: 'Destaque' },
    { emoji: '🎨', tone: 2, cat: 'Marketing', nome: 'CR Comunicação', txt: 'Diagnóstico de marca gratuito este mês.', tag: 'Benefício' },
    { emoji: '🍰', tone: 1, cat: 'Alimentação', nome: 'Doce Encontro', txt: 'Kit degustação com 15% para a comunidade.', tag: 'Cupom' }
  ];
  const vTrack = $('#vitrineTrack');
  const buildVitrineCard = v => el('article', 'vitrine-card', `
    <div class="vitrine-top" style="background:${tone(v.tone)}">${v.emoji}</div>
    <div class="vitrine-body">
      <span class="cat">${v.cat}</span>
      <h4>${v.nome}</h4>
      <p>${v.txt}</p>
      <span class="vitrine-tag">${v.tag}</span>
    </div>`);
  // duplica para loop contínuo (translateX -50%)
  [...vitrine, ...vitrine].forEach(v => vTrack.appendChild(buildVitrineCard(v)));

  /* =========================================================
     3. EVENTOS
     ========================================================= */
  const eventos = window.EVENTOS || [];
  const eGrid = $('#eventsGrid');
  eventos.forEach(ev => {
    const lugar = window.lugarBySlug(ev.lugarSlug) || {};
    const localTxt = (lugar.nome || ev.lugarSlug) + (ev.area ? ' · ' + ev.area : '');
    eGrid.appendChild(el('article', 'event-card', `
      <div class="event-photo" style="background:${tone(ev.tone)}">
        <span class="event-emoji">${ev.emoji}</span>
        <span class="event-date"><span class="d">${ev.d}</span><span class="m">${ev.m}</span></span>
      </div>
      <div class="event-body">
        <h3>${ev.titulo}</h3>
        <div class="event-meta">
          <span>🕒 ${ev.hora}</span>
          <span>📍 <a class="event-place" href="lugares/lugar.html?slug=${ev.lugarSlug}">${localTxt}</a></span>
        </div>
        <button class="btn btn-primary btn-sm js-confirm">Confirmar presença</button>
      </div>`));
  });
  eGrid.addEventListener('click', e => {
    const btn = e.target.closest('.js-confirm');
    if (!btn || btn.disabled) return;
    btn.textContent = '✓ Presença confirmada';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-ghost');
    btn.disabled = true;
  });

  /* =========================================================
     3b. LUGARES PARCEIROS
     ========================================================= */
  const placesGrid = $('#placesGrid');
  (window.LUGARES || []).forEach(lg => {
    const a = el('a', 'place-card');
    a.href = `lugares/lugar.html?slug=${lg.slug}`;
    a.innerHTML = `
      <div class="place-top" style="background:${tone(lg.tone)}">
        <span class="place-emoji">${lg.emoji}</span>
        <span class="place-type">${lg.tipo}</span>
      </div>
      <div class="place-body">
        <h3>${lg.nome}</h3>
        <span class="place-loc">📍 ${lg.bairro} · ${lg.cidade}</span>
        <p>${lg.desc}</p>
        <span class="place-cta">Ver lugar →</span>
      </div>`;
    placesGrid.appendChild(a);
  });

  /* =========================================================
     4. FEED
     ========================================================= */
  const posts = [
    { tone: 0, nome: 'Lara · Lara Moda', quando: 'há 2 horas', txt: 'Hoje fechamos parceria com duas participantes do EncontroME! 💜 Juntas no kit de inverno.', likes: 34, coms: 8 },
    { tone: 2, nome: 'Camila · CR Comunicação', quando: 'há 5 horas', txt: 'Procuro fornecedor de brindes personalizados para um evento em agosto. Alguma indicação da comunidade?', likes: 12, coms: 15 },
    { tone: 3, nome: 'Marina · Marina Fotografia', quando: 'ontem', txt: 'Lançamos nossa nova coleção de ensaios de marca! Quem quiser fechar com benefício de associada, chama. 📸', likes: 47, coms: 6 },
    { tone: 1, nome: 'Bia · Invictta Imobiliária', quando: 'há 2 dias', txt: 'Que Rodada de Negócios incrível ontem. Saí com 3 reuniões marcadas. O escambo está vivo! ✨', likes: 58, coms: 11 }
  ];
  const feedList = $('#feedList');
  posts.forEach(p => {
    feedList.appendChild(el('article', 'feed-post', `
      <div class="feed-head">
        <div class="avatar" style="background:${tone(p.tone)}">${initials(p.nome.split(' · ')[0])}</div>
        <div class="meta"><b>${p.nome}</b><small>${p.quando}</small></div>
      </div>
      <p>${p.txt}</p>
      <div class="feed-actions">
        <button class="js-like" data-likes="${p.likes}">❤️ <span>${p.likes}</span></button>
        <button>💬 <span>${p.coms}</span></button>
        <button>🔄 Compartilhar</button>
      </div>`));
  });
  feedList.addEventListener('click', e => {
    const btn = e.target.closest('.js-like');
    if (!btn) return;
    const span = $('span', btn);
    let n = +btn.dataset.likes;
    const liked = btn.classList.toggle('liked');
    n += liked ? 1 : -1;
    btn.dataset.likes = n;
    span.textContent = n;
  });

  /* =========================================================
     5. DIRETÓRIO + filtros
     ========================================================= */
  const categorias = ['Todas', 'Moda', 'Beleza', 'Alimentação', 'Saúde', 'Imóveis', 'Marketing', 'Artesanato', 'Serviços', 'Educação'];
  const participantes = window.PARTICIPANTES || [];
  const dirGrid = $('#dirGrid');
  const dirFilters = $('#dirFilters');

  function renderDir(cat) {
    dirGrid.innerHTML = '';
    const list = cat === 'Todas' ? participantes : participantes.filter(p => p.cat === cat);
    list.forEach(p => {
      const card = el('article', 'dir-card', `
        <div class="dir-top">
          <div class="dir-avatar" style="background:${tone(p.tone)}">${initials(p.nome)}</div>
          <div>
            <h3>${p.nome}</h3>
            <span class="company">${p.empresa}</span>
          </div>
        </div>
        <span class="dir-cat">${p.cat}</span>
        <p>${p.desc}</p>
        <div class="dir-benefit">${p.benef}</div>
        <div class="dir-foot">
          <a class="dir-social" href="#" aria-label="Instagram">📷</a>
          <a class="dir-social" href="#" aria-label="WhatsApp">💬</a>
          <span class="city">📍 ${p.cidade}</span>
        </div>
        <a class="dir-perfil" href="perfis/perfil.html?slug=${p.slug}">Ver perfil →</a>`);
      dirGrid.appendChild(card);
    });
  }
  categorias.forEach((c, i) => {
    const b = el('button', 'filter-btn' + (i === 0 ? ' active' : ''), c);
    b.addEventListener('click', () => {
      $$('.filter-btn', dirFilters).forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      renderDir(c);
    });
    dirFilters.appendChild(b);
  });
  renderDir('Todas');

  /* =========================================================
     6. CONTADORES (impacto)
     ========================================================= */
  function animateCount(node) {
    const target = +node.dataset.target;
    const prefix = node.dataset.prefix || '';
    const suffix = node.dataset.suffix || '';
    const dur = 1600;
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      node.textContent = prefix + Math.round(target * eased).toLocaleString('pt-BR') + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* =========================================================
     7. MAPA DAS CONEXÕES (SVG)
     ========================================================= */
  const SVGNS = 'http://www.w3.org/2000/svg';
  const mapNodes = [
    { id: 'lara', x: 170, y: 120 },
    { id: 'cr', x: 460, y: 80 },
    { id: 'invictta', x: 730, y: 150 },
    { id: 'marina', x: 250, y: 340 },
    { id: 'bella', x: 560, y: 360 },
    { id: 'evento', x: 760, y: 330 }
  ];
  const XLINK = 'http://www.w3.org/1999/xlink';
  // pool de serviços/relações que circulam por tipo de conexão
  const flowPool = {
    buy: ['contratou', 'comprou de', 'fechou com', 'investiu em'],
    rec: ['indicou', 'recomendou', 'apresentou', 'conectou'],
    part: ['fez parceria', 'co-criou com', 'patrocinou', 'uniu-se a']
  };
  const COLORS = { buy: '#F2A15E', rec: '#C9B8F0', part: '#ffffff' };
  const mapLinks = [
    { from: 'lara', to: 'cr', type: 'buy', flow: 'contratou' },
    { from: 'cr', to: 'invictta', type: 'rec', flow: 'indicou' },
    { from: 'invictta', to: 'evento', type: 'part', flow: 'patrocinou' },
    { from: 'marina', to: 'lara', type: 'buy', flow: 'fotografou' },
    { from: 'bella', to: 'cr', type: 'buy', flow: 'contratou' },
    { from: 'marina', to: 'bella', type: 'part', flow: 'parceria' }
  ];
  const byId = id => mapNodes.find(n => n.id === id);

  function drawMap() {
    const svg = $('#connMap');
    if (!svg || svg.dataset.drawn) return;
    svg.dataset.drawn = '1';
    const mk = (tag, attrs) => {
      const n = document.createElementNS(SVGNS, tag);
      for (const k in attrs) n.setAttribute(k, attrs[k]);
      return n;
    };
    // linhas + rótulos de fluxo
    mapLinks.forEach((lk, i) => {
      const a = byId(lk.from), b = byId(lk.to);
      const line = mk('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, stroke: COLORS[lk.type], 'stroke-width': 2.5, 'stroke-linecap': 'round', class: 'map-line', opacity: 0 });
      line.style.transition = 'opacity .5s, stroke-width .4s ease';
      svg.appendChild(line);
      lk.lineEl = line;
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const lbl = mk('text', { x: mx, y: my - 6, 'text-anchor': 'middle', class: 'map-flow', opacity: 0 });
      lbl.style.transition = 'opacity .45s ease';
      lbl.textContent = lk.flow;
      svg.appendChild(lbl);
      lk.flowEl = lbl;
      setTimeout(() => { line.setAttribute('opacity', .9); lbl.setAttribute('opacity', 1); }, 250 * i);
    });
    // nós — cada um é um link para a página interna (perfil ou lugar)
    const ents = window.MAP_ENTITIES || [];
    mapNodes.forEach((n, i) => { const e = ents[i % ents.length] || { nome: '—', href: '#' }; n.label = e.nome; n.href = e.href; });

    mapNodes.forEach((n, i) => {
      const a = mk('a', { class: 'map-node', opacity: 0 });
      a.setAttribute('href', n.href);
      a.setAttributeNS(XLINK, 'xlink:href', n.href);
      const halo = mk('circle', { cx: n.x, cy: n.y, r: 18, fill: 'rgba(255,255,255,.15)' });
      a.appendChild(mk('circle', { cx: n.x, cy: n.y, r: 9, fill: '#fff' }));
      a.appendChild(halo);
      const t = mk('text', { x: n.x, y: n.y + 36, 'text-anchor': 'middle', class: 'map-label' });
      t.style.transition = 'opacity .45s ease, fill .2s ease';
      t.textContent = n.label;
      a.appendChild(t);
      svg.appendChild(a);
      n.labelEl = t; n.haloEl = halo; n.linkEl = a;
      setTimeout(() => { a.style.transition = 'opacity .5s'; a.setAttribute('opacity', 1); }, 120 * i);
    });

    startMapCycle();
  }

  /* mantém o mapa "rodando": troca marcas e serviços em loop */
  function startMapCycle() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rand = arr => arr[Math.floor(Math.random() * arr.length)];

    const cycleFlow = () => {
      const lk = rand(mapLinks);
      lk.flow = rand(flowPool[lk.type].filter(f => f !== lk.flow));
      lk.flowEl.setAttribute('opacity', 0);
      lk.lineEl.setAttribute('stroke-width', 4.5);
      setTimeout(() => {
        lk.flowEl.textContent = lk.flow;
        lk.flowEl.setAttribute('opacity', 1);
        lk.lineEl.setAttribute('stroke-width', 2.5);
      }, 450);
    };

    const ents = window.MAP_ENTITIES || [];
    const cycleNode = () => {
      const shown = mapNodes.map(n => n.href);
      const options = ents.filter(e => !shown.includes(e.href));
      if (!options.length) return;
      const node = rand(mapNodes);
      const e = rand(options);
      node.label = e.nome; node.href = e.href;
      node.labelEl.setAttribute('opacity', 0);
      node.haloEl.setAttribute('r', 28);
      setTimeout(() => {
        node.labelEl.textContent = node.label;
        node.linkEl.setAttribute('href', node.href);
        node.linkEl.setAttributeNS(XLINK, 'xlink:href', node.href);
        node.labelEl.setAttribute('opacity', 1);
        node.haloEl.setAttribute('r', 18);
      }, 450);
    };

    setInterval(cycleFlow, 2200);
    setInterval(cycleNode, 3400);
  }

  /* =========================================================
     8. REVEAL + observers (contadores e mapa)
     ========================================================= */
  const revealItems = $$('.section, .reveal, .stat-card, .event-card, .dir-card, .blog-card');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        obs.unobserve(en.target);
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(x => io.observe(x));

    // contadores
    const statsObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        $$('.stat-num', en.target).forEach(animateCount);
        obs.unobserve(en.target);
      });
    }, { threshold: 0.3 });
    const sg = $('#statsGrid'); if (sg) statsObs.observe(sg);

    // mapa
    const mapObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => { if (en.isIntersecting) { drawMap(); obs.unobserve(en.target); } });
    }, { threshold: 0.2 });
    const ms = $('#mapa'); if (ms) mapObs.observe(ms);
  } else {
    $$('.reveal').forEach(x => x.classList.add('in'));
    $$('.stat-num').forEach(animateCount);
    drawMap();
  }

  /* =========================================================
     9. FORM CTA
     ========================================================= */
  const form = $('#ctaForm');
  const note = $('#ctaNote');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    if (!nome || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      note.textContent = 'Preencha seu nome e um e-mail válido 💜';
      return;
    }
    note.textContent = `Boas-vindas, ${nome.split(' ')[0]}! Em breve entraremos em contato. ✨`;
    form.reset();
  });
})();
