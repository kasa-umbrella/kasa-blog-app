from datetime import datetime
from pydantic import BaseModel, ConfigDict
from pydantic import Field
from util.constant import ARTICLES_PER_PAGE


class ArticleSearchParams(BaseModel):
    limited: bool | None = None
    published: bool | None = None
    keyword: str | None = None
    page: int = 1
    limit: int = ARTICLES_PER_PAGE


class ArticleInput(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    title: str = Field(..., min_length=1, max_length=15)
    summary: str = Field(..., min_length=1, max_length=100)
    main_image_url: str = Field(..., alias="mainImageUrl")
    content: str = Field(..., min_length=1)
    limited: bool = False
    published: bool = False


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
    updated_at: datetime = Field(..., alias="updatedAt")
    pv_count: int = Field(0, alias="pvCount")


class ArticleListResponse(BaseModel):
    articles: list[ArticleResponse]
    total: int
    page: int
    limit: int