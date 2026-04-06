from pydantic import BaseModel, ConfigDict, Field


class AccessLogInput(BaseModel):
    article_id: str | None = None
    ip_address: str
    user_agent: str | None = None
    referrer: str | None = None


class DailyAccessCount(BaseModel):
    date: str
    count: int


class WeeklyAccessResponse(BaseModel):
    data: list[DailyAccessCount]


class AccessLogRecord(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    created_at: str = Field(..., alias="createdAt")
    article_title: str | None = Field(None, alias="articleTitle")
    ip_address: str = Field(..., alias="ipAddress")
    user_agent: str | None = Field(None, alias="userAgent")


class AccessLogListResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    data: list[AccessLogRecord]
    total: int
    page: int
    total_pages: int = Field(..., alias="totalPages")
