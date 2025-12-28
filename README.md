# kasa-blog-app-api

このリポジトリは FastAPI アプリケーションを含みます。Docker Compose を使ってローカルでビルド・起動できます。

## 使い方

ターミナル（zsh）でリポジトリルートに移動して以下を実行します。

```bash
# 初回または変更があるときはビルドを行う
docker compose build

# コンテナをビルドしてフォアグラウンドで起動（--build を付けると常にビルドします）
docker compose up --build
```

ブラウザで http://localhost:8000/ にアクセスすると `{"Hello":"World"}` が返ります。

開発モードではソースをマウントしているため、`app/` を編集すると Uvicorn の `--reload` により自動リロードされます。
