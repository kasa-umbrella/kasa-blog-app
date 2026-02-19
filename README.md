# Kasa Blog App

フロントエンド（Next.js）とバックエンド（FastAPI）＋ MySQL を Docker Compose で構築したブログアプリです。開発用のホットリロード環境と、本番用の Nginx リバースプロキシ構成を含みます。

## 構成
- **バックエンド**: FastAPI（Uvicorn）
  - ポート: 8000（ホスト）
  - ヘルスチェック: `/docs`
  - DB接続: `DATABASE_URL`（.env から読み込み）
- **DB**: MySQL 8.0
  - ポート: 3306（ホスト）
  - ボリューム: `mysql_data`
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

### 初回セットアップ
1. 環境変数ファイルを作成

```bash
# .env.example をコピーして .env を作成
cp .env.example .env

# 必要に応じて .env を編集（パスワードやポート設定など）
```

### 開発モード（ホットリロード）
開発環境では、ソースコードの変更が自動的にコンテナに反映されます。

```bash
# 開発環境を起動
docker compose --profile dev up --build -d

# ログを見る（任意）
docker compose logs -f

# 停止
docker compose --profile dev down
```

起動後、以下のURLでアクセス可能：
- API ドキュメント: http://localhost:8000/docs
- ルートメッセージ: http://localhost:8000/
- DB 接続テスト: http://localhost:8000/db-test
- Next.js（開発）: http://localhost:3000

### 本番モード（Nginx 経由で公開）
本番環境では、最適化されたビルドと Nginx リバースプロキシが使用されます。

```bash
# 本番環境を起動
docker compose --profile prod up --build -d

# 80/tcp で公開
open http://localhost/

# 停止
docker compose --profile prod down
```

## 環境変数
すべての設定は `.env` ファイルで管理されています。

### 主要な環境変数
- `MYSQL_ROOT_PASSWORD`: MySQL のルートパスワード
- `MYSQL_DATABASE`: データベース名
- `DATABASE_URL`: FastAPI 用の DB 接続文字列
  - 例: `mysql+pymysql://root:password@mysql:3306/kasa_blog_db`
- `NEXT_PUBLIC_API_BASE_URL`: Next.js から API にアクセスするための URL
- ポート設定: `FASTAPI_PORT`, `MYSQL_PORT`, `NEXT_DEV_PORT`, `NEXT_PROD_PORT`, `NGINX_PORT`

詳細は [.env.example](.env.example) を参照してください。

## データベースとマイグレーション（Alembic）
スキーマは Alembic で管理しています。初期テーブルは `articles` が含まれます。

### マイグレーション適用
```bash
# 開発環境の場合
docker compose exec kasa-blog-api alembic -c app/alembic.ini upgrade head

# 本番環境の場合
docker compose --profile prod exec kasa-blog-api-prod alembic -c app/alembic.ini upgrade head
```

### 変更の自動生成
```bash
# モデル変更から差分を生成（開発環境）
docker compose exec kasa-blog-api alembic -c app/alembic.ini revision --autogenerate -m "update schema"

# 生成後に適用
docker compose exec kasa-blog-api alembic -c app/alembic.ini upgrade head
```

## API 概要
- `GET /` … ウェルカムメッセージ
- `GET /db-test` … DB 接続確認（`SELECT 1`）
- `GET /api/articles` … 記事一覧
- `GET /api/article/{article_id}` … 記事詳細
- `POST /api/login` … ログイン
- `GET /api/auth` … 認証確認

> エンドポイントの詳細・試験は [http://localhost:8000/docs](http://localhost:8000/docs) を参照。

## フロントエンド開発
Next.js のソースは `next/` 配下です。開発サーバはホットリロード対応の `next-dev` コンテナで動作します。

### Lint（ESLint）
```bash
# 開発環境で実行
docker compose --profile dev exec next-dev npm run lint
```

### 本番ビルドの確認
```bash
# 本番環境を起動して確認
docker compose --profile prod up --build -d
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
  - `mysql` のヘルスチェック完了後に `kasa-blog-api` が起動します。
  - 再起動: `docker compose restart kasa-blog-api`
- **マイグレーションで `DATABASE_URL` 未設定**
  - `.env` ファイルが正しく設定されているか確認してください。
  - 環境変数の確認: `docker compose exec kasa-blog-api env | grep DATABASE_URL`
- **Next.js が起動しない**
  - コンテナのログを確認: `docker compose logs -f next-dev`
- **.env ファイルが見つからない**
  - `.env.example` をコピーして `.env` を作成してください: `cp .env.example .env`

## メンテナンスコマンド
```bash
# 開発環境の停止
docker compose down

# 本番環境の停止
docker compose --profile prod down

# 再起動（開発環境）
docker compose --profile dev restart kasa-blog-api next-dev

# ボリュームを含めて完全停止（DB初期化に注意）
docker compose --profile dev down -v

# イメージの再ビルド（コードを大幅に変更した場合）
docker compose --profile dev build --no-cache
docker compose --profile dev up --build -d
```
