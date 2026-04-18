import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, String
from database import Base


class ArticleComment(Base):
    __tablename__ = "article_comments"

    id: str = Column(
        String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid7())
    )
    article_id: str = Column(String(36), nullable=False, index=True)
    commenter_name: str = Column(String(20), nullable=False)
    content: str = Column(String(50), nullable=False)
    ip_address: str = Column(String(45), nullable=True)
    created_at: datetime = Column(DateTime, default=datetime.now, nullable=False)
    updated_at: datetime = Column(
        DateTime, default=datetime.now, onupdate=datetime.now, nullable=False
    )
