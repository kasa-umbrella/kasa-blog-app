# Project: kasa-blog-app

シンプルなブログアプリ。バックエンドは FastAPI + Alembic、フロントエンドは Next.js (App Router)。

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js (App Router) | 16 |
| UI | React + Material-UI | 19 / 7 |
| Language (FE) | TypeScript | 5.x |
| Backend | FastAPI + SQLAlchemy | latest |
| Language (BE) | Python | 3.12 |
| DB | MySQL | 8.0 |
| Migrations | Alembic | latest |
| Infra | Docker Compose + Nginx | - |

## Directory Structure

```
fastapi/          # バックエンド
  app/
    main.py           # アプリ起動点
    database.py       # SQLAlchemy セッション管理
    api/              # ルーター (article.py, root.py)
    models/           # ORM モデル (article.py)
    schemas/          # Pydantic スキーマ (article.py, articleRecord.py)
    services/         # ビジネスロジック (articleService.py)
    alembic.ini       # Alembic 設定
    migrations/       # マイグレーションファイル
      versions/
  requirements.txt

next/             # フロントエンド
  app/                # Next.js App Router (ページ)
    layout.tsx            # ルートレイアウト
    page.tsx              # ホーム
    article/[articleId]/  # 記事詳細
    login/                # ログイン
    manage/               # 管理画面
    post/                 # 記事作成
    edit/                 # 記事編集
  features/           # 機能別コンポーネント
    about/
    article/              # 単体記事表示
    articles/             # 記事一覧
    edit/                 # 編集フォーム
    form/                 # 記事フォーム共通
    login/                # ログイン
    post/                 # 記事投稿
  util/               # 共通ユーティリティ
    components/           # AppHeader, AppFooter, AppTheme 等
    functions/            # format.ts 等
  package.json

docker-compose.yml       # ベース (MySQL)
docker-compose.dev.yml   # 開発環境
docker-compose.prod.yml  # 本番環境
.env / .env.example      # 環境変数
```

## Naming Conventions

- **Backend (Python)**: snake_case (ファイル名・変数・関数), PascalCase (クラス)
- **Frontend (TypeScript)**: PascalCase (コンポーネント), camelCase (関数・変数)
- **Interface**: `*Props`, `*FormData`, `*Response`
- **API サービス**: `*Service.ts` (FE), `*Service.py` (BE)
- **API レスポンス**: Backend は snake_case、Frontend は camelCase (Pydantic alias で変換)

## Architecture Patterns

- **Frontend**: Feature-driven structure (`features/` にドメイン単位で配置)
- **Frontend**: Server Components (データ取得) と Client Components (インタラクション) を使い分け
- **Frontend**: `*Service.ts` で API 呼び出しを分離
- **Backend**: Router → Service → Model の 3 層構成
- **Backend**: FastAPI の `Depends()` で DB セッションを DI

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Welcome メッセージ |
| GET | `/db-test` | DB 接続テスト |
| GET | `/api/articles` | 記事一覧 |
| GET | `/api/article/{article_id}` | 記事詳細 |
| POST | `/api/login` | ログイン |
| GET | `/api/auth` | 認証確認 |

## Database

- **テーブル**: `articles` (id: UUID, title, summary, main_image_url, content, limited, created_at, updated_at)
- **ORM**: SQLAlchemy declarative_base
- **Driver**: PyMySQL

## Commands

### Development (Docker)

```bash
# 開発環境起動
docker compose up --build

# 本番環境起動
docker compose --profile prod up --build
```

### Alembic (Migrations)

```bash
# マイグレーション作成 (自動生成)
alembic -c fastapi/app/alembic.ini revision --autogenerate -m "メッセージ"

# 適用 (最新へ)
alembic -c fastapi/app/alembic.ini upgrade head

# ロールバック (1つ戻す)
alembic -c fastapi/app/alembic.ini downgrade -1

# 現在のリビジョン確認
alembic -c fastapi/app/alembic.ini current

# Docker 経由
docker compose exec fastapi alembic -c app/alembic.ini upgrade head
```

### Frontend

```bash
cd next
npm run dev      # 開発サーバー起動
npm run build    # ビルド
npm run start    # 本番サーバー起動
npm run lint     # Lint 実行
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | SQLAlchemy 接続文字列 (mysql+pymysql://...) |
| `NEXT_PUBLIC_API_BASE_URL` | フロントエンドからの API ベース URL |
| `MYSQL_ROOT_PASSWORD` | MySQL root パスワード |
| `MYSQL_DATABASE` | データベース名 |
| `FASTAPI_PORT` | FastAPI ポート (default: 8000) |
| `NEXT_DEV_PORT` | Next.js 開発ポート (default: 3000) |

## Deployment

- **開発**: `docker compose up --build` (hot reload 有効, API:8000, FE:3000, DB:3306)
- **本番**: `docker compose --profile prod up --build` (API:8000 x4 workers, FE:3001, Nginx:80, DB:3306)
- **画像ストレージ**: Sakura Cloud Object Storage (`s3.isk01.sakurastorage.jp`)
