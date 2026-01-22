"""ブログ記事のSQLAlchemyモデル"""

import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text
from app.database import Base


class Article(Base):
    # 記事テーブルの定義
    __tablename__ = "articles"

    id: str = Column(
        String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid7())
    )
    title: str = Column(String(15), nullable=False)
    summary: str = Column(String(100), nullable=False)
    main_image_url: str = Column(String(255), nullable=True)
    content: str = Column(Text, nullable=False)
    limited: bool = Column(Integer, default=0, nullable=False)
    created_at: datetime = Column(DateTime, default=datetime.now, nullable=False)
    updated_at: datetime = Column(
        DateTime, default=datetime.now, onupdate=datetime.now, nullable=False
    )

    def __repr__(self) -> str:
        return f"<Article id={self.id} title={self.title!r}>"
