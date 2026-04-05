from datetime import datetime, timedelta
from sqlalchemy import func
from models.access_log import AccessLog
from schemas.access_log import AccessLogInput, DailyAccessCount, WeeklyAccessResponse


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

    def get_weekly_access(self) -> WeeklyAccessResponse:
        today = datetime.now().date()
        week_ago = today - timedelta(days=6)
        rows = (
            self.db_session.query(
                func.date(AccessLog.created_at).label("date"),
                func.count(AccessLog.id).label("count"),
            )
            .filter(AccessLog.created_at >= week_ago)
            .group_by(func.date(AccessLog.created_at))
            .all()
        )
        count_map = {str(row.date): row.count for row in rows}
        data = [
            DailyAccessCount(
                date=str(today - timedelta(days=i)),
                count=count_map.get(str(today - timedelta(days=i)), 0),
            )
            for i in range(6, -1, -1)
        ]
        return WeeklyAccessResponse(data=data)

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
