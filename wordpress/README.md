# encontro.me — Landing para WordPress + Elementor

Dois arquivos, duas formas de usar. **Os dois entregam a página idêntica** ao site publicado
(https://thiagovernetti2.github.io/encontrome/), com todo o visual e interatividade
(carrossel, mapa de conexões animado com nós clicáveis, filtros, contadores).

> Importante: toda a landing fica dentro de **um widget HTML** do Elementor. Isso preserva
> 100% do design e das animações custom (que não existem como widgets nativos do Elementor).
> Os textos/imagens são editáveis pelo código HTML do widget, não pelo editor visual do Elementor.

---

## Opção A — Importar o template (.json) — recomendado

Arquivo: **`encontrome-elementor-template.json`**

1. No WordPress: **Templates → Saved Templates** (ou *Modelos → Meus Modelos*).
2. Clique em **Import Templates** e selecione o arquivo `.json`.
3. Crie/edite uma página, abra com o **Elementor** e insira o template salvo
   (ícone de pasta → aba *My Templates*).
4. Em **Configurações da página → Layout da página**, escolha **Elementor Canvas**
   (tela cheia, sem cabeçalho/rodapé do tema) para o melhor resultado.
5. Publique.

## Opção B — Colar no widget HTML

Arquivo: **`encontrome-landing.html`**

1. Crie uma página e edite com Elementor (layout **Elementor Canvas**).
2. Arraste um widget **HTML** para a seção.
3. Abra `encontrome-landing.html`, copie **todo** o conteúdo e cole no widget.
4. Publique.

---

## Observações

- **Fontes:** o bundle já carrega Fredoka + Quicksand do Google Fonts.
- **CSS isolado:** todo o estilo está escopado em `#encontrome-app`, então não afeta o tema do site.
- **Links internos** (perfis das participantes e páginas dos lugares no mapa/diretório)
  apontam para o site publicado no GitHub Pages. Se você recriar essas páginas no WordPress,
  edite as URLs no HTML (procure por `thiagovernetti2.github.io/encontrome`).
- **Formulário "Quero fazer parte":** é só demonstração (não envia e-mail ainda). Para receber
  os cadastros, troque pelo widget de formulário do Elementor ou plugin (ex.: WPForms).
- **Acentuação:** o WordPress usa UTF-8, então os acentos aparecem corretos automaticamente.
