"""DBダンプ（INSERT文生成）サービス"""

from datetime import datetime

from sqlalchemy.orm import Session

from models.access_log import AccessLog
from models.article import Article


def _escape(value) -> str:
    if value is None:
        return "NULL"
    if isinstance(value, bool):
        return "1" if value else "0"
    if isinstance(value, int):
        return str(value)
    if isinstance(value, datetime):
        return f"'{value.strftime('%Y-%m-%d %H:%M:%S')}'"
    escaped = str(value).replace("\\", "\\\\").replace("'", "\\'")
    return f"'{escaped}'"


class DumpService:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    def generate_sql(self) -> str:
        lines = [
            "-- kasa-blog-app dump",
            f"-- Generated at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
            "",
            "-- articles",
        ]

        articles = self.db_session.query(Article).order_by(Article.created_at).all()
        for a in articles:
            lines.append(
                f"INSERT INTO articles (id, title, summary, main_image_url, content, limited, published, published_at, created_at, updated_at) VALUES ("
                f"{_escape(a.id)}, {_escape(a.title)}, {_escape(a.summary)}, {_escape(a.main_image_url)}, "
                f"{_escape(a.content)}, {_escape(a.limited)}, {_escape(a.published)}, "
                f"{_escape(a.published_at)}, {_escape(a.created_at)}, {_escape(a.updated_at)});"
            )

        lines += ["", "-- access_logs"]

        logs = self.db_session.query(AccessLog).order_by(AccessLog.created_at).all()
        for log in logs:
            lines.append(
                f"INSERT INTO access_logs (id, article_id, ip_address, user_agent, referrer, created_at) VALUES ("
                f"{_escape(log.id)}, {_escape(log.article_id)}, {_escape(log.ip_address)}, "
                f"{_escape(log.user_agent)}, {_escape(log.referrer)}, {_escape(log.created_at)});"
            )

        return "\n".join(lines) + "\n"
