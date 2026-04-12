from fastapi import APIRouter, Depends, HTTPException, status
from util.constant import HTTP_NOT_FOUND
from sqlalchemy.orm import Session
from database import get_database
from schemas.article import ArticleInput, ArticleResponse, ArticleSearchParams, ArticleListResponse
from services.article_service import ArticleService
from dependencies import require_auth, optional_auth

router = APIRouter()


@router.get("/articles", response_model=ArticleListResponse)
def get_articles(
    params: ArticleSearchParams = Depends(),
    db: Session = Depends(get_database),
    user_id: str | None = Depends(optional_auth),
):
    if user_id is None:
        params.limited = False
        params.published = True
        params.exclude_future_published = True
    service = ArticleService(db)
    return service.get_articles(params)


@router.get("/articles/{article_id}", response_model=ArticleResponse)
def get_article_by_id(
    article_id: str,
    db: Session = Depends(get_database),
    user_id: str | None = Depends(optional_auth),
):
    service = ArticleService(db)
    article_data = service.get_article_by_id(article_id, user_id=user_id)
    if article_data is None:
        raise HTTPException(status_code=HTTP_NOT_FOUND, detail="Article not found")
    return article_data


@router.post("/articles", response_model=ArticleResponse)
def create_article(
    body: ArticleInput,
    _: str = Depends(require_auth),
    db: Session = Depends(get_database),
):
    service = ArticleService(db)
    article_data = service.create_article(body)
    return article_data


@router.put("/articles/{article_id}", response_model=ArticleResponse)
def update_article(
    article_id: str,
    body: ArticleInput,
    _: str = Depends(require_auth),
    db: Session = Depends(get_database),
):
    service = ArticleService(db)
    article_data = service.update_article(article_id, body)
    if article_data is None:
        raise HTTPException(status_code=HTTP_NOT_FOUND, detail="Article not found")
    return article_data


@router.delete("/articles/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_article(
    article_id: str,
    _: str = Depends(require_auth),
    db: Session = Depends(get_database),
):
    service = ArticleService(db)
    deleted = service.delete_article(article_id)
    if not deleted:
        raise HTTPException(status_code=HTTP_NOT_FOUND, detail="Article not found")
