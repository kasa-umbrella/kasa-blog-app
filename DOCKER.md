# Docker 構成ガイド

このプロジェクトはフロントエンド・バックエンド統合モノレポです。Docker Compose で全サービスを管理します。

## 構成

### サービス一覧

#### バックエンド
- **kasa-blog-api**: FastAPI アプリケーション（ポート: 8000）
- **mysql**: MySQL データベース（ポート: 3306）
- **phpmyadmin**: DB 管理ツール（ポート: 8080）

#### フロントエンド
- **frontend-dev**: 開発用 Next.js（ホットリロード有効、ポート: 3000）
- **frontend-prod**: 本番ビルド Next.js（ポート: 3001）
- **nginx**: リバースプロキシ（ポート: 80）

## 起動方法

### 開発環境（推奨：デフォルト）

ルートディレクトリから以下を実行するだけで全て起動：

```bash
docker compose up
```

このコマンドで以下が起動します：
- API: http://localhost:8000
- フロントエンド（開発モード・ホットリロード有効）: http://localhost:3000
- MySQL: localhost:3306
- PhpMyAdmin: http://localhost:8080

フロントエンドのコードは `./frontend` フォルダをマウントしているため、ファイル変更時に自動でリロードされます。

### 本番環境

バックエンド + フロントエンド（本番ビルド） + Nginx を起動：

```bash
docker compose --profile prod up
```

- API: http://localhost:8000
- Nginx（フロントエンド）: http://localhost
- PhpMyAdmin: http://localhost:8080

## Dockerfile 配置

各 Dockerfile はサブディレクトリに配置されており、`docker-compose.yml` の `context` で参照します：

```
backend/
├── Dockerfile          # API 用ビルド
└── app/               # アプリケーションコード

frontend/
├── Dockerfile         # 本番ビルド
├── Dockerfile.dev     # 開発用ビルド
├── Dockerfile.nginx   # Nginx 用ビルド
└── ...               # アプリケーションコード
```

## ボリューム

- `mysql_data`: MySQL データ永続化
- `./backend/app`: バックエンド ホットリロード
- `./frontend`: フロントエンド ホットリロード（開発のみ）

## ネットワーク

すべてのサービスは `kasa-blog-network` ブリッジネットワークで接続。内部 DNS で相互通信可能。

## クリーンアップ

```bash
# すべて停止・削除
docker compose down -v
```

`-v` フラグで永続ボリュームも削除します（注意：DB データが失われます）
