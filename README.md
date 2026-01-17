# Kasa Blog App

フロントエンド（Next.js 16）とバックエンド（FastAPI）＋ MySQL を Docker Compose で構築したブログアプリです。開発用のホットリロード環境と、本番用の Nginx リバースプロキシ構成を含みます。

## 構成
- **バックエンド**: FastAPI（Uvicorn）
  - ポート: 8000（ホスト）
  - ヘルスチェック: `/docs`
  - DB接続: `DATABASE_URL`（compose から注入）
- **DB**: MySQL 8.0
  - ポート: 3306（ホスト）
  - ボリューム: `mysql_data`
- **DB管理**: phpMyAdmin
  - ポート: 8080（ホスト）
- **フロント（開発）**: Next.js 開発サーバ（ホットリロード）
  - ポート: 3000（ホスト）
- **フロント（本番）**: Next.js 本番ビルド
  - ポート: 3001（ホスト → Next.js）
- **リバースプロキシ**: Nginx（Next.js 本番を 80/tcp で公開）
  - ポート: 80（ホスト）

詳細は [docker-compose.yml](docker-compose.yml) を参照してください。

## 前提条件
- Docker Desktop（Compose 対応）
- macOS / Linux / Windows いずれか

> Node や Python をローカルに直接インストールする必要はありません（Docker 利用前提）。

## クイックスタート
### 開発モード（ホットリロード）
1. すべての主要サービスを起動（API / MySQL / phpMyAdmin / Next.js 開発）

```bash
# 初回・通常起動
docker compose up -d kasa-blog-api mysql phpmyadmin next-dev

# ログを見る（任意）
docker compose logs -f kasa-blog-api
```

2. 確認
- API ドキュメント: http://localhost:8000/docs
- ルートメッセージ: http://localhost:8000/
- DB 接続テスト: http://localhost:8000/db-test
- Next.js（開発）: http://localhost:3000
- phpMyAdmin: http://localhost:8080

### 本番モード（Nginx 経由で公開）
Next.js 本番と Nginx は `prod` プロファイルで起動します。

```bash
# 本番用フロント＆Nginx を含めて起動
docker compose --profile prod up -d kasa-blog-api mysql next-prod nginx

# 80/tcp で公開
open http://localhost/
```

> 本番プロファイルでも API・MySQL は通常どおり起動します。

## 環境変数
- `DATABASE_URL`: FastAPI 用の DB 接続文字列（Compose から注入）。
  - 例: `mysql+pymysql://root:password@mysql:3306/kasa_blog_db`
- FastAPI は `.env` も読み込みます（ローカル起動する場合に利用可能）。Compose 利用時は未設定でも問題ありません。

## データベースとマイグレーション（Alembic）
スキーマは Alembic で管理しています。初期テーブルは `articles` が含まれます。

### マイグレーション適用
```bash
# コンテナ内で最新に適用
docker compose exec kasa-blog-api alembic upgrade head
```

### 変更の自動生成
```bash
# モデル変更から差分を生成
docker compose exec kasa-blog-api alembic revision --autogenerate -m "update schema"

# 生成後に適用
docker compose exec kasa-blog-api alembic upgrade head
```

## API 概要
- `GET /` … ウェルカムメッセージ
- `GET /db-test` … DB 接続確認（`SELECT 1`）
- `GET /articles` … サンプル記事のリスト（モック）
- `GET /article/{article_id}` … サンプル記事の詳細（モック）

> エンドポイントの詳細・試験は [http://localhost:8000/docs](http://localhost:8000/docs) を参照。

## フロントエンド開発
Next.js のソースは `next/` 配下です。開発サーバはホットリロード対応の `next-dev` コンテナで動作します。

### Lint（ESLint）
```bash
docker compose exec kasa-blog-next-dev npm run lint
```

### 本番ビルド（手動）
```bash
# プロファイルを使わず個別に
docker compose build next-prod
docker compose up -d next-prod
```

## ディレクトリ構成（抜粋）
- バックエンド: [fastapi/app](fastapi/app)
  - API ルータ: [fastapi/app/api](fastapi/app/api)
  - モデル: [fastapi/app/models](fastapi/app/models)
  - スキーマ: [fastapi/app/schemas](fastapi/app/schemas)
  - マイグレーション: [fastapi/app/migrations](fastapi/app/migrations)
- フロントエンド: [next](next)
  - Next.js App Router: [next/app](next/app)
  - 逆プロキシ設定: [next/nginx.conf](next/nginx.conf)
- オーケストレーション: [docker-compose.yml](docker-compose.yml)

## よくあるトラブル
- **FastAPI が DB に接続できない**
  - `mysql` のヘルスチェック完了後に `kasa-blog-api` が起動します。再起動: `docker compose restart kasa-blog-api`
- **マイグレーションで `DATABASE_URL` 未設定**
  - Compose 経由で起動し、`docker compose exec kasa-blog-api env | grep DATABASE_URL` を確認してください。
- **Next.js が 3000 で起動しない**
  - `next-dev` コンテナのログを確認: `docker compose logs -f kasa-blog-next-dev`

## メンテナンスコマンド
```bash
# 停止
docker compose down

# 再起動（一部サービス）
docker compose restart kasa-blog-api next-dev

# ボリュームを含めて完全停止（DB初期化に注意）
docker compose down -v
```

---
何か追加したい項目（CI、テスト、公開手順など）があればお知らせください。