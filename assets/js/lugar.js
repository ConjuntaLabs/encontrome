/* =========================================================
   encontro.me — página interna do lugar (lugares/lugar.html)
   Lê ?slug=... e renderiza a partir de window.LUGARES / window.EVENTOS
   ========================================================= */
(function () {
  'use strict';

  const app = document.getElementById('lugarApp');
  const tones = window.LUGAR_TONES || [];
  const tone = i => tones[i % tones.length] || '#4A15BD';

  const slug = new URLSearchParams(location.search).get('slug');
  const lugar = window.lugarBySlug ? window.lugarBySlug(slug) : null;

  // header dinâmico do scroll (mesmo comportamento da home)
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!lugar) {
    document.title = 'Lugar não encontrado — encontro.me';
    app.innerHTML = `
      <section class="section" style="text-align:center">
        <div class="container">
          <h1 style="font-size:2rem">Lugar não encontrado 🔎</h1>
          <p class="section-lead" style="margin:1rem auto 2rem;max-width:520px">
            Não encontramos esse lugar parceiro. Volte e escolha um dos lugares da comunidade.
          </p>
          <a class="btn btn-primary" href="../index.html#lugares">Ver lugares parceiros</a>
        </div>
      </section>`;
    return;
  }

  document.title = `${lugar.nome} — Lugar parceiro · encontro.me`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', `${lugar.nome} — ${lugar.tipo} parceira da comunidade encontro.me em ${lugar.bairro}. Benefícios e próximos eventos no local.`);

  // eventos que acontecem neste lugar
  const eventos = (window.EVENTOS || []).filter(e => e.lugarSlug === lugar.slug);
  const eventosHtml = eventos.length
    ? `<div class="events-grid">${eventos.map(ev => `
        <article class="event-card">
          <div class="event-photo" style="background:${tone(ev.tone)}">
            <span class="event-emoji">${ev.emoji}</span>
            <span class="event-date"><span class="d">${ev.d}</span><span class="m">${ev.m}</span></span>
          </div>
          <div class="event-body">
            <h3>${ev.titulo}</h3>
            <div class="event-meta">
              <span>🕒 ${ev.hora}</span>
              <span>📍 ${lugar.nome}${ev.area ? ' · ' + ev.area : ''}</span>
            </div>
            <a class="btn btn-primary btn-sm" href="../index.html#participar">Confirmar presença</a>
          </div>
        </article>`).join('')}</div>`
    : `<p class="lugar-empty">Nenhum evento agendado neste lugar por enquanto. Fique de olho na agenda da comunidade. 💜</p>`;

  app.innerHTML = `
    <section class="lugar-hero">
      <div class="lugar-blob" aria-hidden="true"></div>
      <div class="container">
        <a class="lugar-back" href="../index.html#lugares">← Lugares parceiros</a>
        <span class="lugar-emoji-big" aria-hidden="true">${lugar.emoji}</span>
        <span class="lugar-type">${lugar.tipo}</span>
        <h1>${lugar.nome}</h1>
        <p class="lugar-loc">📍 ${lugar.bairro} · ${lugar.cidade}</p>
      </div>
    </section>

    <section class="section">
      <div class="container lugar-body">
        <div class="lugar-main">
          <h2>Sobre o lugar</h2>
          <p class="lead">${lugar.desc}</p>

          <h2 style="margin-top:2rem">Benefícios para participantes</h2>
          <ul class="lugar-benef">
            ${lugar.benef.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>

        <aside class="lugar-info">
          <h3>Informações</h3>
          <dl>
            <div><dt>Tipo</dt><dd>${lugar.tipo}</dd></div>
            <div><dt>Capacidade</dt><dd>${lugar.capacidade}</dd></div>
            <div><dt>Endereço</dt><dd>${lugar.endereco}</dd></div>
            <div><dt>Instagram</dt><dd>${lugar.instagram}</dd></div>
          </dl>
          <a class="btn btn-primary" href="../index.html#participar">Quero participar dos eventos</a>
        </aside>
      </div>
    </section>

    <section class="section section-soft lugar-events">
      <div class="container">
        <h2>Próximos eventos neste lugar</h2>
        ${eventosHtml}
      </div>
    </section>`;
})();
