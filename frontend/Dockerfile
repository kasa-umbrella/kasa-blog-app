# Next.js 用 本番ビルドのマルチステージ Dockerfile

# ベース: パスとテレメトリ設定を共通化
FROM node:22-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# 依存関係（開発+本番）をキャッシュする層
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ビルド: dev 依存を使ってビルド後、不要な dev 依存を削除
FROM deps AS builder
COPY . .
RUN npm run build \
	&& npm prune --omit=dev

# 実行（本番）
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 必要ファイルのみコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]