# encontro.me

Landing e páginas internas da comunidade encontro.me: HTML/CSS/JS puros, sem build e sem
dependências. Os dados ficam em `assets/js/data.js`; as páginas de lugar e de perfil leem o
`?slug=` (`lugares/lugar.html?slug=<slug>`, `perfis/perfil.html?slug=<slug>`).

A pasta `wordpress/` é o export para Elementor (veja o README dela) e não vai para a imagem.

Para ver localmente: `python3 -m http.server 8000` e abra `http://localhost:8000`.

## Deploy (Dokploy)

O workflow `.github/workflows/deploy.yml` faz:

- **Pull request:** só constrói a imagem, para um Dockerfile quebrado aparecer antes da `main`.
- **Push na `main`:** constrói a imagem, publica no registry da Magalu Cloud e chama a API do
  Dokploy, que baixa o `:latest` e reinicia o app.

Imagem: `container-registry.br-se1.magalu.cloud/conjunta-registry/encontrome`, com as tags
`:latest` e `:sha-<commit>`. O `Dockerfile` copia `index.html`, `assets/`, `lugares/` e `perfis/`
para um nginx sem root (`nginx.conf`, porta **8080**): URLs limpas funcionam (`/lugares/lugar`
abre `lugar.html`), o que não existe dá 404 de verdade e o HTML nunca fica em cache.

Secrets do repositório (Settings > Secrets and variables > Actions):

| Secret | Origem |
| --- | --- |
| `MGC_REGISTRY_USERNAME`, `MGC_REGISTRY_PASSWORD` | `mgc container-registry credentials get` |
| `DOKPLOY_URL` | `https://deploy.conjunta.com.br` |
| `DOKPLOY_APP_ID` | último trecho da URL do app no Dokploy (`…/services/application/<id>`) |
| `DOKPLOY_API_KEY` | Dokploy > Settings > Profile > API/CLI |

Sem os `DOKPLOY_*` a imagem é publicada e o deploy é pulado (com aviso no log).

App no Dokploy: provider **Docker**, imagem acima com a tag `latest`, campos de registry vazios,
sem variáveis de ambiente e sem volume. Domínio: container na porta **8080**, HTTPS com Let's Encrypt.

Rollback: no app do Dokploy, troque a tag da imagem para `sha-<commit>` e faça o deploy (volte
para `latest` depois da correção, senão os próximos deploys da CI repetem a versão antiga).
