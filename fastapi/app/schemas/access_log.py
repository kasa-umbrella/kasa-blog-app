from pydantic import BaseModel


class AccessLogInput(BaseModel):
    article_id: str | None = None
    ip_address: str
    user_agent: str | None = None
    referrer: str | None = None
