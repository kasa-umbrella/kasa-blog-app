"""アクセスログのSQLAlchemyモデル"""

import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, String
from database import Base


class AccessLog(Base):
    __tablename__ = "access_logs"

    id: str = Column(
        String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid7())
    )
    article_id: str = Column(String(36), ForeignKey("articles.id", ondelete="SET NULL"), nullable=True)
    ip_address: str = Column(String(45), nullable=False)
    user_agent: str = Column(String(512), nullable=True)
    referrer: str = Column(String(512), nullable=True)
    created_at: datetime = Column(DateTime, default=datetime.now, nullable=False)

    def __repr__(self) -> str:
        return f"<AccessLog id={self.id} ip={self.ip_address!r}>"
