from datetime import datetime
from pydantic import BaseModel, ConfigDict, field_validator
from pydantic import Field
from util.constant import (
    ARTICLES_MAX_LIMIT,
    ARTICLES_PER_PAGE,
    ARTICLE_SUMMARY_MAX_LENGTH,
    ARTICLE_TITLE_MAX_LENGTH,
    KEYWORD_MAX_LENGTH,
)


class ArticleSearchParams(BaseModel):
    limited: bool | None = None
    published: bool | None = None
    keyword: str | None = Field(None, max_length=KEYWORD_MAX_LENGTH)
    page: int = Field(1, ge=1)
    limit: int = Field(ARTICLES_PER_PAGE, ge=1, le=ARTICLES_MAX_LIMIT)
    exclude_future_published: bool = False
    sort_by: str = Field("published_at", pattern="^(published_at|pv_count)$")


class ArticleInput(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    title: str = Field(..., min_length=1, max_length=ARTICLE_TITLE_MAX_LENGTH)
    summary: str = Field(..., min_length=1, max_length=ARTICLE_SUMMARY_MAX_LENGTH)
    main_image_url: str = Field(..., alias="mainImageUrl")
    content: str = Field(..., min_length=1)
    limited: bool = False
    published: bool = False
    published_at: datetime | None = Field(None, alias="publishedAt")

    @field_validator("main_image_url", mode="before")
    @classmethod
    def validate_image_url(cls, v: str) -> str:
        if not v.startswith(("http://", "https://")):
            raise ValueError("main_image_url は http または https の URL のみ許可されています")
        return v


class ArticleDetail(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,  # fieldとalias両方を受け付ける
    )

    article_id: str = Field(..., alias="articleId")
    title: str
    summery: str
    main_image_url: str | None = Field(None, alias="mainImageUrl")
    body: str
    created_at: datetime = Field(..., alias="createdAt")

    model_config = {"populate_by_name": True}


class ArticleResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: str = Field(..., alias="articleId")
    title: str
    summary: str
    main_image_url: str | None = Field(None, alias="mainImageUrl")
    content: str
    limited: bool
    published: bool
    created_at: datetime = Field(..., alias="createdAt")
    published_at: datetime | None = Field(None, alias="publishedAt")
    updated_at: datetime = Field(..., alias="updatedAt")
    pv_count: int = Field(0, alias="pvCount")


class ArticleListResponse(BaseModel):
    articles: list[ArticleResponse]
    total: int
    page: int
    limit: int