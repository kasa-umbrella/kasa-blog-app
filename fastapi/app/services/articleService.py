from models.article import Article
from schemas.article import ArticleInput, ArticleSearchParams


class ArticleService:
    def __init__(self, db_session):
        self.db_session = db_session

    def get_articles(self, params: ArticleSearchParams) -> list[Article]:
        query = self.db_session.query(Article)
        if params.limited is not None:
            query = query.filter(Article.limited == params.limited)
        return query.order_by(Article.created_at.desc()).all()

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
        )
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
        self.db_session.commit()
        self.db_session.refresh(article)
        return article
