from datetime import datetime
from sqlalchemy import or_
from models.article import Article
from schemas.article import ArticleInput, ArticleResponse, ArticleSearchParams, ArticleListResponse
from services.access_log_service import AccessLogService


class ArticleService:
    def __init__(self, db_session):
        self.db_session = db_session

    def get_articles(self, params: ArticleSearchParams) -> ArticleListResponse:
        query = self.db_session.query(Article)
        if params.limited is not None:
            query = query.filter(Article.limited == params.limited)
        if params.published is not None:
            query = query.filter(Article.published == params.published)
        if params.keyword:
            like = f"%{params.keyword}%"
            query = query.filter(
                or_(
                    Article.title.ilike(like),
                    Article.summary.ilike(like),
                    Article.content.ilike(like),
                )
            )
        if params.exclude_future_published:
            now = datetime.now()
            query = query.filter(
                or_(Article.published_at == None, Article.published_at <= now)
            )
        total = query.count()
        articles_orm = (
            query.order_by(Article.published_at.desc())
            .offset((params.page - 1) * params.limit)
            .limit(params.limit)
            .all()
        )

        article_ids = [a.id for a in articles_orm]
        pv_map = AccessLogService(self.db_session).get_pv_counts(article_ids)

        articles = [
            ArticleResponse.model_validate(a).model_copy(update={"pv_count": pv_map.get(a.id, 0)})
            for a in articles_orm
        ]

        return ArticleListResponse(
            articles=articles,
            total=total,
            page=params.page,
            limit=params.limit,
        )

    def get_article_by_id(self, article_id: str) -> Article | None:
        query = self.db_session.query(Article).filter(Article.id == article_id)
        return query.first()

    def create_article(self, article_input: ArticleInput) -> Article:
        article = Article(
            title=article_input.title,
            summary=article_input.summary,
            main_image_url=article_input.main_image_url,
            content=article_input.content,
            limited=article_input.limited,
            published=article_input.published,
        )
        article.published_at = article_input.published_at
        self.db_session.add(article)
        self.db_session.commit()
        self.db_session.refresh(article)
        return article

    def update_article(
        self, article_id: str, article_input: ArticleInput
    ) -> Article | None:
        query = self.db_session.query(Article).filter(Article.id == article_id)
        article = query.first()
        if article is None:
            return None
        article.title = article_input.title
        article.summary = article_input.summary
        article.main_image_url = article_input.main_image_url
        article.content = article_input.content
        article.limited = article_input.limited
        article.published = article_input.published
        article.published_at = article_input.published_at
        self.db_session.commit()
        self.db_session.refresh(article)
        return article
