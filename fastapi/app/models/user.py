"""ユーザーのSQLAlchemyモデル"""

import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, String
from database import Base


class User(Base):
    # ユーザーテーブルの定義
    __tablename__ = "users"

    id: str = Column(
        String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid7())
    )
    password: str = Column(String(255), nullable=False)
    created_at: datetime = Column(DateTime, default=datetime.now, nullable=False)
    updated_at: datetime = Column(
        DateTime, default=datetime.now, onupdate=datetime.now, nullable=False
    )

    def __repr__(self) -> str:
        return f"<User id={self.id}>"
