"""テスト共通設定・フィクスチャ"""

# database.py がインポート時にエンジンを生成するため、先に環境変数をセット
import os
os.environ.setdefault("DATABASE_URL", "sqlite://")
os.environ.setdefault("JWT_SECRET_KEY", "test-secret-key")
os.environ.setdefault("CORS_ORIGINS", "http://localhost:3000")

from datetime import datetime, timedelta

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database import Base, get_database
from dependencies import optional_auth, require_auth
from main import app
import models.article  # noqa: F401 - テーブル登録のためインポート
import models.access_log  # noqa: F401

SQLITE_URL = "sqlite://"

engine = create_engine(SQLITE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_database():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


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
    try:
        yield session
    finally:
        session.close()


@pytest.fixture
def client():
    """未認証クライアント"""
    app.dependency_overrides[get_database] = override_get_database
    app.dependency_overrides[optional_auth] = lambda: None
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


@pytest.fixture
def auth_client():
    """認証済みクライアント"""
    app.dependency_overrides[get_database] = override_get_database
    app.dependency_overrides[optional_auth] = lambda: "test-user-id"
    app.dependency_overrides[require_auth] = lambda: "test-user-id"
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


