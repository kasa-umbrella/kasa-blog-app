from sqlalchemy import func
from models.access_log import AccessLog
from schemas.access_log import AccessLogInput


class AccessLogService:
    def __init__(self, db_session):
        self.db_session = db_session

    def create_log(self, input: AccessLogInput) -> None:
        log = AccessLog(
            article_id=input.article_id,
            ip_address=input.ip_address,
            user_agent=input.user_agent,
            referrer=input.referrer,
        )
        self.db_session.add(log)
        self.db_session.commit()

    def get_pv_counts(self, article_ids: list[str]) -> dict[str, int]:
        if not article_ids:
            return {}
        rows = (
            self.db_session.query(AccessLog.article_id, func.count(AccessLog.id).label("cnt"))
            .filter(AccessLog.article_id.in_(article_ids))
            .group_by(AccessLog.article_id)
            .all()
        )
        return {row.article_id: row.cnt for row in rows}
