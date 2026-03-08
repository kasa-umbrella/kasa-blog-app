from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_database
from schemas.article import ArticleInput, ArticleResponse
from services.articleService import ArticleService
from dependencies import require_auth

router = APIRouter()


@router.get("/articles", response_model=list[ArticleResponse])
def get_articles(db: Session = Depends(get_database)):
    service = ArticleService(db)
    return service.get_articles()


@router.get("/article/{article_id}", response_model=ArticleResponse)
def get_article_by_id(article_id: str, db: Session = Depends(get_database)):
    service = ArticleService(db)
    article_data = service.get_article_by_id(article_id)
    if article_data is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return article_data


@router.post("/article")
def create_article(body: ArticleInput, _: str = Depends(require_auth), db: Session = Depends(get_database)):
    service = ArticleService(db)
    article_data = service.create_article(body)
    return article_data


@router.put("/article/{article_id}")
def update_article(article_id: str, body: ArticleInput, _: str = Depends(require_auth), db: Session = Depends(get_database)):
    service = ArticleService(db)
    article_data = service.update_article(article_id, body)
    if article_data is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return article_data


@router.delete("/article/{article_id}")
def delete_article(article_id: str, _: str = Depends(require_auth)):
    print(article_id)
    return {"message": "ok"}
