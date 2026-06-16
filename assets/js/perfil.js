/* =========================================================
   encontro.me — perfil da participante (perfis/perfil.html)
   Lê ?slug=... e renderiza a partir de window.PARTICIPANTES
   ========================================================= */
(function () {
  'use strict';

  const app = document.getElementById('perfilApp');
  const tones = window.LUGAR_TONES || [];
  const tone = i => tones[i % tones.length] || '#4A15BD';
  const initials = name => name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  const slug = new URLSearchParams(location.search).get('slug');
  const p = window.participanteBySlug ? window.participanteBySlug(slug) : null;

  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!p) {
    document.title = 'Participante não encontrada — encontro.me';
    app.innerHTML = `
      <section class="section" style="text-align:center">
        <div class="container">
          <h1 style="font-size:2rem">Participante não encontrada 🔎</h1>
          <p class="section-lead" style="margin:1rem auto 2rem;max-width:520px">
            Não encontramos esse perfil. Veja todas as participantes da comunidade.
          </p>
          <a class="btn btn-primary" href="../index.html#diretorio">Ver participantes</a>
        </div>
      </section>`;
    return;
  }

  document.title = `${p.empresa} — ${p.nome} · encontro.me`;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', `${p.empresa} (${p.nome}) — ${p.cat} na comunidade encontro.me. ${p.desc}`);

  app.innerHTML = `
    <section class="lugar-hero">
      <div class="lugar-blob" aria-hidden="true"></div>
      <div class="container">
        <a class="lugar-back" href="../index.html#diretorio">← Participantes</a>
        <div class="perfil-head">
          <span class="perfil-avatar-big" style="background:${tone(p.tone)}">${initials(p.nome)}</span>
          <div>
            <span class="lugar-type">${p.cat}</span>
            <h1>${p.empresa}</h1>
            <p class="lugar-loc">${p.nome} · 📍 ${p.cidade}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container lugar-body">
        <div class="lugar-main">
          <h2>Sobre</h2>
          <p class="lead">${p.desc}</p>

          <h2 style="margin-top:2rem">Benefício para a comunidade</h2>
          <ul class="lugar-benef">
            <li>${p.benef}</li>
          </ul>
        </div>

        <aside class="lugar-info">
          <h3>Contato</h3>
          <dl>
            <div><dt>Empresa</dt><dd>${p.empresa}</dd></div>
            <div><dt>Categoria</dt><dd>${p.cat}</dd></div>
            <div><dt>Cidade</dt><dd>${p.cidade}</dd></div>
            <div><dt>Instagram</dt><dd>${p.instagram}</dd></div>
            <div><dt>WhatsApp</dt><dd>${p.whatsapp}</dd></div>
          </dl>
          <a class="btn btn-primary" href="../index.html#participar">Conectar com a comunidade</a>
        </aside>
      </div>
    </section>`;
})();
