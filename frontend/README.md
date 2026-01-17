# Kasa Blog App (Next.js)

Next.js 16 をベースにしたブログアプリです。Docker を用いた開発・本番運用に対応しています。

## 構成

- Next.js (App Router)
- Node.js 22 (alpine)
- Docker / Docker Compose

## 前提条件

- macOS / Linux / Windows (WSL2)
- Docker と Docker Compose がインストール済み

ローカルに Node を入れなくても Docker で開発可能です。

## 開発手順（Docker）

リポジトリルートの `docker-compose.yml`（モノレポ統合）を使って起動します。

```bash
docker compose up frontend-dev
```

アクセス: http://localhost:3000

- `frontend-dev` サービスは [Dockerfile.dev](Dockerfile.dev) を使用します。
- 依存関係として API / MySQL も自動で立ち上がります（`depends_on`）。
- ソースを `./frontend` から `/app` にマウントし、`next dev -H 0.0.0.0 -p 3000` でホットリロードします。

停止:

```bash
docker compose down
```

## 本番手順（Docker）

最適化済みのマルチステージビルドイメージで起動します（ルートの Compose を使用）。

```bash
docker compose --profile prod up --build frontend-prod nginx
```

アクセス:
- フロントエンド: http://localhost
- API: http://localhost:8000

- `frontend-prod` は [Dockerfile](Dockerfile) を使用します。
- `nginx` サービス（プロファイル `prod`）が 80 番でリバースプロキシします。
- 開発とポートが重複しないよう、ホスト側は 3001（コンテナ内 3000）を使用します。

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
