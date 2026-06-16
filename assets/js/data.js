/* =========================================================
   encontro.me — dados compartilhados (home + página de lugar)
   ========================================================= */

/* Lugares parceiros — cada um vira uma página interna:
   lugares/lugar.html?slug=<slug>
   Para adicionar um lugar novo, basta incluir um objeto aqui. */
window.LUGARES = [
  {
    slug: 'cafe-35', nome: 'Café 35', tipo: 'Cafeteria', emoji: '☕', tone: 0,
    bairro: 'Centro', cidade: 'São Paulo · SP', capacidade: 'até 30 pessoas',
    instagram: '@cafe35', endereco: 'Rua das Conexões, 35 · Centro',
    desc: 'Uma cafeteria acolhedora no coração da cidade, parceira da comunidade para cafés com networking e encontros mais intimistas. Ambiente leve, perfeito para conversas que viram negócio.',
    benef: ['10% de desconto para participantes da comunidade', 'Espaço reservado para encontros do EncontroME', 'Wi-fi e tomadas para trabalhar à vontade']
  },
  {
    slug: 'espaco-lilas', nome: 'Espaço Lilás', tipo: 'Espaço de eventos', emoji: '💜', tone: 1,
    bairro: 'Zona Sul', cidade: 'São Paulo · SP', capacidade: 'até 80 pessoas',
    instagram: '@espacolilas', endereco: 'Av. Empreendedoras, 1200 · Zona Sul',
    desc: 'Um espaço versátil e charmoso para os eventos da comunidade, ideal para o EncontroME Amigas e celebrações. Estrutura completa para receber as participantes com conforto.',
    benef: ['Condição especial para eventos de associadas', 'Estrutura completa de som e luz', 'Estacionamento no local']
  },
  {
    slug: 'coworking-conexao', nome: 'Coworking Conexão', tipo: 'Coworking', emoji: '🤝', tone: 2,
    bairro: 'Vila Olímpia', cidade: 'São Paulo · SP', capacidade: 'até 50 pessoas',
    instagram: '@coworkingconexao', endereco: 'Rua da Colaboração, 88 · Vila Olímpia',
    desc: 'Coworking moderno que sedia as Rodadas de Negócios, com salas de reunião e um ambiente colaborativo feito para conexões acontecerem.',
    benef: ['Day-use gratuito na primeira visita', 'Salas de reunião para fechar parcerias', 'Café e copa inclusos']
  },
  {
    slug: 'auditorio-invictta', nome: 'Auditório Invictta', tipo: 'Auditório', emoji: '🎓', tone: 3,
    bairro: 'Centro', cidade: 'São Paulo · SP', capacidade: 'até 120 pessoas',
    instagram: '@invicttaimoveis', endereco: 'Av. Central, 500 · Centro',
    desc: 'Auditório equipado para workshops e palestras, parceiro da comunidade nos eventos de capacitação. Estrutura audiovisual completa para grandes encontros.',
    benef: ['Estrutura audiovisual completa', 'Condição parceira para workshops', 'Recepção dedicada aos participantes']
  }
];

/* Eventos — cada um acontece em um lugar parceiro (lugarSlug) */
window.EVENTOS = [
  { emoji: '☕', tone: 0, d: '28', m: 'jun', titulo: 'Café com Networking', hora: '09h00 às 11h30', lugarSlug: 'cafe-35', area: 'Centro' },
  { emoji: '💜', tone: 1, d: '12', m: 'jul', titulo: 'EncontroME Amigas', hora: '19h00 às 22h00', lugarSlug: 'espaco-lilas', area: 'Zona Sul' },
  { emoji: '🤝', tone: 2, d: '24', m: 'jul', titulo: 'Rodada de Negócios', hora: '14h00 às 18h00', lugarSlug: 'coworking-conexao', area: 'Vila Olímpia' },
  { emoji: '🎓', tone: 3, d: '09', m: 'ago', titulo: 'Workshop de Vendas', hora: '09h00 às 12h00', lugarSlug: 'auditorio-invictta', area: 'Centro' }
];

/* helper de gradientes (mesma paleta do main.js) */
window.LUGAR_TONES = [
  'linear-gradient(135deg,#5a22d6,#401970)',
  'linear-gradient(135deg,#C9B8F0,#4A15BD)',
  'linear-gradient(135deg,#F2A15E,#4A15BD)',
  'linear-gradient(135deg,#7c4ad6,#401970)',
  'linear-gradient(135deg,#f7b377,#4A15BD)'
];
window.lugarBySlug = slug => (window.LUGARES || []).find(l => l.slug === slug);

/* Participantes — cada uma vira uma página interna de perfil:
   perfis/perfil.html?slug=<slug> */
window.PARTICIPANTES = [
  { slug: 'lara-moda', nome: 'Lara Souza', empresa: 'Lara Moda', cat: 'Moda', tone: 0, cidade: 'São Paulo · SP', instagram: '@laramoda', whatsapp: '(11) 90000-0001', desc: 'Moda autoral feminina, peças exclusivas produzidas em pequenos lotes com muito cuidado.', benef: '👗 Brinde exclusivo para associadas da comunidade' },
  { slug: 'invictta-imobiliaria', nome: 'Bia Martins', empresa: 'Invictta Imobiliária', cat: 'Imóveis', tone: 1, cidade: 'Campinas · SP', instagram: '@invicttaimoveis', whatsapp: '(19) 90000-0002', desc: 'Consultoria imobiliária com foco em ajudar mulheres a conquistarem o primeiro imóvel.', benef: '🏠 Consultoria gratuita para participantes' },
  { slug: 'croche-lara', nome: 'Lara Pinto', empresa: 'Crochê Lara', cat: 'Artesanato', tone: 2, cidade: 'Sorocaba · SP', instagram: '@crochelara', whatsapp: '(15) 90000-0003', desc: 'Peças artesanais em crochê feitas à mão, sob encomenda e com identidade própria.', benef: '🧶 Frete grátis durante o mês' },
  { slug: 'cr-comunicacao', nome: 'Camila Reis', empresa: 'CR Comunicação', cat: 'Marketing', tone: 3, cidade: 'São Paulo · SP', instagram: '@crcomunicacao', whatsapp: '(11) 90000-0004', desc: 'Branding e gestão de redes sociais para pequenas marcas que querem crescer com consistência.', benef: '🎨 Diagnóstico de marca gratuito' },
  { slug: 'marina-fotografia', nome: 'Marina Lopes', empresa: 'Marina Fotografia', cat: 'Serviços', tone: 4, cidade: 'Santos · SP', instagram: '@marinafoto', whatsapp: '(13) 90000-0005', desc: 'Fotografia de marca e ensaios profissionais para empreendedoras destacarem seus negócios.', benef: '📸 20% de desconto para a comunidade' },
  { slug: 'studio-bella', nome: 'Bella Cruz', empresa: 'Studio Bella', cat: 'Beleza', tone: 0, cidade: 'São Paulo · SP', instagram: '@studiobella', whatsapp: '(11) 90000-0006', desc: 'Skincare natural e cuidados personalizados, com produtos pensados para cada tipo de pele.', benef: '💄 Amostra grátis na primeira visita' },
  { slug: 'doce-encontro', nome: 'Helena Dias', empresa: 'Doce Encontro', cat: 'Alimentação', tone: 1, cidade: 'Jundiaí · SP', instagram: '@doceencontro', whatsapp: '(11) 90000-0007', desc: 'Confeitaria artesanal para eventos e presentes, com receitas afetivas e ingredientes selecionados.', benef: '🍰 Kit degustação com 15% off' },
  { slug: 'viva-bem', nome: 'Sofia Nunes', empresa: 'Viva Bem', cat: 'Saúde', tone: 2, cidade: 'São Paulo · SP', instagram: '@vivabem', whatsapp: '(11) 90000-0008', desc: 'Nutrição e bem-estar para empreendedoras que querem cuidar da saúde sem abrir mão da rotina.', benef: '🥗 Primeira consulta como cortesia' },
  { slug: 'mente-em-foco', nome: 'Júlia Alves', empresa: 'Mente em Foco', cat: 'Educação', tone: 3, cidade: 'Online', instagram: '@menteemfoco', whatsapp: '(11) 90000-0009', desc: 'Cursos de produtividade e gestão para autônomas organizarem o negócio e a vida.', benef: '🎓 Aula experimental gratuita' }
];
window.participanteBySlug = slug => (window.PARTICIPANTES || []).find(p => p.slug === slug);

/* Entidades do mapa: empresas (→ perfil) + lugares (→ página do lugar).
   Cada nó do mapa usa o nome e o link daqui. */
window.MAP_ENTITIES = [
  ...window.PARTICIPANTES.map(p => ({ nome: p.empresa, href: 'perfis/perfil.html?slug=' + p.slug })),
  ...window.LUGARES.map(l => ({ nome: l.nome, href: 'lugares/lugar.html?slug=' + l.slug }))
];
