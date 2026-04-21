from sqlalchemy.orm import Session
from models.article import Article
from models.comment import ArticleComment
from schemas.comment import AdminCommentListResponse, AdminCommentResponse, CommentInput, CommentListResponse, CommentResponse, COMMENTS_PER_PAGE


class CommentService:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    def get_comments(self, article_id: str, page: int = 1) -> CommentListResponse:
        query = (
            self.db_session.query(ArticleComment)
            .filter(ArticleComment.article_id == article_id)
            .order_by(ArticleComment.created_at.desc())
        )
        total = query.count()
        comments_orm = query.offset((page - 1) * COMMENTS_PER_PAGE).limit(COMMENTS_PER_PAGE).all()
        comments = [CommentResponse.model_validate(c) for c in comments_orm]
        has_next = (page * COMMENTS_PER_PAGE) < total
        return CommentListResponse(
            comments=comments,
            total=total,
            page=page,
            has_next=has_next,
        )

    def get_all_comments(self, page: int = 1) -> AdminCommentListResponse:
        query = (
            self.db_session.query(ArticleComment, Article.title)
            .join(Article, ArticleComment.article_id == Article.id)
            .order_by(ArticleComment.created_at.desc())
        )
        total = query.count()
        rows = query.offset((page - 1) * COMMENTS_PER_PAGE).limit(COMMENTS_PER_PAGE).all()
        comments = [
            AdminCommentResponse(
                id=c.id,
                articleId=c.article_id,
                articleTitle=title,
                commenterName=c.commenter_name,
                content=c.content,
                ipAddress=c.ip_address,
                isVisible=c.is_visible,
                createdAt=c.created_at,
            )
            for c, title in rows
        ]
        has_next = (page * COMMENTS_PER_PAGE) < total
        return AdminCommentListResponse(comments=comments, total=total, page=page, hasNext=has_next)

    def create_comment(
        self, article_id: str, data: CommentInput, ip_address: str | None
    ) -> CommentResponse:
        comment = ArticleComment(
            article_id=article_id,
            commenter_name=data.commenter_name,
            content=data.content,
            ip_address=ip_address,
        )
        self.db_session.add(comment)
        self.db_session.commit()
        self.db_session.refresh(comment)
        return CommentResponse.model_validate(comment)
