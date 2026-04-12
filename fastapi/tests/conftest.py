"""テスト共通設定・フィクスチャ"""

# database.py がインポート時にエンジンを生成するため、先に環境変数をセット
import os
os.environ.setdefault("DATABASE_URL", "sqlite:///:memory:")
os.environ.setdefault("JWT_SECRET_KEY", "test-secret-key")
os.environ.setdefault("CORS_ORIGINS", "http://localhost:3000")
os.environ.setdefault("SECURE_COOKIES", "false")

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from database import Base, get_database
from dependencies import optional_auth, require_auth
from main import app
import models.article  # noqa: F401 - テーブル登録のためインポート
import models.access_log  # noqa: F401
import models.user  # noqa: F401

engine = create_engine(
    "sqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# フィクスチャの順序に依存しないよう、モジュールロード時にテーブルを作成する
Base.metadata.create_all(bind=engine)


@pytest.fixture(autouse=True)
def clean_data():
    """各テスト後にデータを全削除する"""
    yield
    with engine.begin() as conn:
        for table in reversed(Base.metadata.sorted_tables):
            conn.execute(table.delete())


@pytest.fixture
def db():
    """テストデータ挿入用のDBセッション"""
    session = TestingSessionLocal()
    yield session
    session.close()


@pytest.fixture
def client(db):
    """未認証クライアント"""
    def _get_db():
        yield db

    app.dependency_overrides[get_database] = _get_db
    app.dependency_overrides[optional_auth] = lambda: None
    yield TestClient(app)
    app.dependency_overrides.clear()


@pytest.fixture
def auth_client(db):
    """認証済みクライアント"""
    def _get_db():
        yield db

    app.dependency_overrides[get_database] = _get_db
    app.dependency_overrides[optional_auth] = lambda: "test-user-id"
    app.dependency_overrides[require_auth] = lambda: "test-user-id"
    yield TestClient(app)
    app.dependency_overrides.clear()
