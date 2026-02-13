# ========================================
# FastAPI アプリケーション用 Dockerfile
# ========================================
FROM python:3.12-slim

# 作業ディレクトリを設定
WORKDIR /app

# 必要なシステムパッケージをインストール
# - default-mysql-client: MySQLクライアント（マイグレーション等で使用）
# - curl: ヘルスチェック用
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    default-mysql-client \
    curl && \
    rm -rf /var/lib/apt/lists/*

# 依存関係ファイルを先にコピー（レイヤーキャッシュの活用）
COPY requirements.txt ./

# Pythonパッケージをインストール
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコピー
COPY app app

# 非rootユーザーを作成して切り替え
RUN useradd -m -u 1000 appuser && \
    chown -R appuser:appuser /app
USER appuser

# ポートを公開
EXPOSE 8000

# アプリケーションを起動
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
