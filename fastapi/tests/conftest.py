"""テスト共通設定・フィクスチャ"""

# database.py がインポート時にエンジンを生成するため、先に環境変数をセット
import os
os.environ.setdefault("DATABASE_URL", "sqlite://")
os.environ.setdefault("JWT_SECRET_KEY", "test-secret-key")
os.environ.setdefault("CORS_ORIGINS", "http://localhost:3000")

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

from database import Base, get_database
from dependencies import optional_auth, require_auth
from main import app
import models.article  # noqa: F401 - テーブル登録のためインポート
import models.access_log  # noqa: F401

TEST_DB_PATH = "./test_temp.db"
SQLITE_URL = f"sqlite:///{TEST_DB_PATH}"

engine = create_engine(SQLITE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="session", autouse=True)
def setup_tables():
    """セッション全体で一度だけテーブルを作成し、終了後に削除する"""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)
    if os.path.exists(TEST_DB_PATH):
        os.remove(TEST_DB_PATH)


@pytest.fixture(autouse=True)
def clean_data():
    """各テスト後にデータを全削除する"""
    yield
    with engine.begin() as conn:
        for table in reversed(Base.metadata.sorted_tables):
            conn.execute(table.delete())


def override_get_database():
    """テスト用DBセッションを都度生成するオーバーライド"""
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()


@pytest.fixture
def db():
    """テストデータ挿入用のDBセッション"""
    session = TestingSessionLocal()
    yield session
    session.close()


@pytest.fixture
def client():
    """未認証クライアント"""
    app.dependency_overrides[get_database] = override_get_database
    app.dependency_overrides[optional_auth] = lambda: None
    yield TestClient(app)
    app.dependency_overrides.clear()


@pytest.fixture
def auth_client():
    """認証済みクライアント"""
    app.dependency_overrides[get_database] = override_get_database
    app.dependency_overrides[optional_auth] = lambda: "test-user-id"
    app.dependency_overrides[require_auth] = lambda: "test-user-id"
    yield TestClient(app)
    app.dependency_overrides.clear()
