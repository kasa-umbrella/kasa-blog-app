from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


COMMENT_NAME_MAX_LENGTH = 20
COMMENT_CONTENT_MAX_LENGTH = 50
COMMENTS_PER_PAGE = 10


class CommentInput(BaseModel):
    commenter_name: str = Field(..., min_length=1, max_length=COMMENT_NAME_MAX_LENGTH, alias="commenterName")
    content: str = Field(..., min_length=1, max_length=COMMENT_CONTENT_MAX_LENGTH)

    model_config = ConfigDict(populate_by_name=True)


class CommentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: str
    article_id: str = Field(..., alias="articleId")
    commenter_name: str = Field(..., alias="commenterName")
    content: str
    created_at: datetime = Field(..., alias="createdAt")


class CommentListResponse(BaseModel):
    comments: list[CommentResponse]
    total: int
    page: int
    has_next: bool = Field(..., alias="hasNext")

    model_config = ConfigDict(populate_by_name=True)


class AdminCommentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: str
    article_id: str = Field(..., alias="articleId")
    article_title: str = Field(..., alias="articleTitle")
    commenter_name: str = Field(..., alias="commenterName")
    content: str
    created_at: datetime = Field(..., alias="createdAt")


class AdminCommentListResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    comments: list[AdminCommentResponse]
    total: int
    page: int
    has_next: bool = Field(..., alias="hasNext")
