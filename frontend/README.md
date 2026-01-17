# Kasa Blog App (Next.js)

Next.js 16 をベースにしたブログアプリです。Docker を用いた開発・本番運用に対応しています。

## 構成

- Next.js (App Router)
- Node.js 22 (alpine)
- Docker / Docker Compose

ディレクトリ例:

```
app/
	layout.tsx
	page.tsx
public/
Dockerfile
Dockerfile.dev
docker-compose.yml
```

## 前提条件

- macOS / Linux / Windows (WSL2)
- Docker と Docker Compose がインストール済み

ローカルに Node を入れなくても Docker で開発可能です。

## 開発手順（Docker）

ホットリロードありの開発用コンテナを起動します。

```bash
docker compose up app
```

アクセス: http://localhost:3000

- `app` サービスは [Dockerfile.dev](Dockerfile.dev) を使用します。
- ソースをカレントディレクトリから `/app` にボリュームマウントしています。
- `next dev -H 0.0.0.0 -p 3000` で外部アクセス可能にしています。

停止:

```bash
docker compose down
```

## 本番手順（Docker）

最適化済みのマルチステージビルドイメージで起動します。

```bash
docker compose up --build app-prod
```

アクセス: http://localhost:3001

- `app-prod` サービスは [Dockerfile](Dockerfile) を使用します。
- ビルド済み `.next` と本番依存関係のみを含む軽量ランナーで `next start` を実行します。
- 追加のリバースプロキシが不要な場合はこのサービスだけで完結します。
- 開発とポートが重複しないよう、ホスト側は 3001 を使用しています（コンテナ内は 3000 でリッスン）。

## npm スクリプト（参考）

Docker を使わずローカル Node で動かす場合:

```bash
npm run dev     # 開発サーバ
npm run build   # 本番ビルド
npm run start   # 本番起動
npm run lint    # Lint
```

## よくあるトラブル

- 3000 ポートが使用中: 既存のプロセスを終了するか、Compose のポート設定を変更してください。
- 依存関係の不整合: `package-lock.json` を更新して再ビルド（`npm install` → `docker compose build`）。
- キャッシュが効きすぎる: `docker compose build --no-cache` を試してください。

## 補足

- Nginx リバースプロキシを別途構成したい場合は [Dockerfile.nginx](Dockerfile.nginx) を参考にサービス追加してください（現在の Compose には含めていません）。
- ページの編集は `app/page.tsx` を変更すると反映されます（開発時は自動更新）。

## リンク

- Next.js 公式: https://nextjs.org/docs
