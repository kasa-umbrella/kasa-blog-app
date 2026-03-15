# Next.js 用 本番ビルドのマルチステージ Dockerfile

# ベース: パスとテレメトリ設定を共通化
FROM node:22-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# 依存関係をキャッシュする層
FROM base AS deps
COPY package.json package-lock.json ./
RUN NODE_OPTIONS=--max-old-space-size=512 npm ci

# ビルド
FROM deps AS builder
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
COPY . .
RUN NODE_OPTIONS=--max-old-space-size=512 npm run build

# 実行（本番）: standalone 出力のみ使用
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# standalone サーバーと静的ファイルをコピー
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
