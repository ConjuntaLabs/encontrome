# Site estático (HTML/CSS/JS puros, sem build): só copia os arquivos servidos
# para um nginx sem root. A pasta wordpress/ (export) fica de fora.
FROM nginxinc/nginx-unprivileged:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY assets /usr/share/nginx/html/assets
COPY lugares /usr/share/nginx/html/lugares
COPY perfis /usr/share/nginx/html/perfis

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
