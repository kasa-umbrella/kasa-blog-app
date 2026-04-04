#!/bin/bash
# 初回 Let's Encrypt 証明書取得スクリプト
# 使い方: DOMAIN=example.com EMAIL=you@example.com ./init-letsencrypt.sh

set -e

DOMAIN=${DOMAIN:?'DOMAIN 環境変数を設定してください (例: DOMAIN=example.com)'}
EMAIL=${EMAIL:?'EMAIL 環境変数を設定してください (例: EMAIL=you@example.com)'}

echo "==> ドメイン: $DOMAIN"
echo "==> メール: $EMAIL"

# 1. certbot_certs ボリュームに仮の自己署名証明書を置く
#    (nginx が起動できるように)
echo "==> ダミー証明書を生成中..."
docker compose --profile prod run --rm --entrypoint "" certbot \
  sh -c "mkdir -p /etc/letsencrypt/live/${DOMAIN} && \
         openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
           -keyout /etc/letsencrypt/live/${DOMAIN}/privkey.pem \
           -out /etc/letsencrypt/live/${DOMAIN}/fullchain.pem \
           -subj '/CN=localhost'"

# 2. nginx を起動
echo "==> nginx を起動中..."
docker compose --profile prod up -d nginx

# 3. 本物の証明書を取得
echo "==> Let's Encrypt 証明書を取得中..."
docker compose --profile prod run --rm --entrypoint "" certbot \
  certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "${EMAIL}" \
    --agree-tos \
    --no-eff-email \
    -d "${DOMAIN}"

# 4. nginx をリロード
echo "==> nginx をリロード中..."
docker compose --profile prod exec nginx nginx -s reload

echo "==> 完了！ https://${DOMAIN} でアクセスできます"
