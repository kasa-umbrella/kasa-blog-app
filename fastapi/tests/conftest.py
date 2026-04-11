"""テスト共通設定・フィクスチャ"""

# database.py がインポート時にエンジンを生成するため、先に環境変数をセット
import os
os.environ.setdefault("DATABASE_URL", "sqlite://")
os.environ.setdefault("JWT_SECRET_KEY", "test-secret-key")
os.environ.setdefault("CORS_ORIGINS", "http://localhost:3000")

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

SQLITE_URL = "sqlite://"

engine = create_engine(
    SQLITE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(autouse=True)
def setup_db():
    """各テスト前にテーブルを作成し、テスト後に破棄する"""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db():
    """テストデータ挿入用のDBセッション"""
    session = TestingSessionLocal()
    yield session
    session.close()


@pytest.fixture
def client(db):
    """未認証クライアント (db と同じセッションを共有)"""
    app.dependency_overrides[get_database] = lambda: db
    app.dependency_overrides[optional_auth] = lambda: None
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


@pytest.fixture
def auth_client(db):
    """認証済みクライアント (db と同じセッションを共有)"""
    app.dependency_overrides[get_database] = lambda: db
    app.dependency_overrides[optional_auth] = lambda: "test-user-id"
    app.dependency_overrides[require_auth] = lambda: "test-user-id"
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
