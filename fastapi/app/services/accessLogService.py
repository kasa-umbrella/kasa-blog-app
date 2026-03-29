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
