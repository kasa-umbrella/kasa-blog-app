# DB接続設定とセッション管理を分離したモジュール

import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# ベースクラスの作成
Base = declarative_base()

# .envファイルを読み込む
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# SQLAlchemyエンジンとセッションの設定
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_database():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

