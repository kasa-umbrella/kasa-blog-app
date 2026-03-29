from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy.orm import Session
from database import get_database
from schemas.article import ArticleInput, ArticleResponse, ArticleSearchParams, ArticleListResponse
from schemas.access_log import AccessLogInput
from services.articleService import ArticleService
from services.accessLogService import AccessLogService
from dependencies import require_auth, optional_auth
from util.constant import ACCESS_LOG_COOKIE_EXPIRE_SECONDS, ACCESS_LOG_COOKIE_NAME_PREFIX

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
    service = ArticleService(db)
    return service.get_articles(params)


@router.get("/articles/{article_id}", response_model=ArticleResponse)
def get_article_by_id(
    article_id: str,
    request: Request,
    response: Response,
    db: Session = Depends(get_database),
):
    service = ArticleService(db)
    article_data = service.get_article_by_id(article_id)
    if article_data is None:
        raise HTTPException(status_code=404, detail="Article not found")

    cookie_name = f"{ACCESS_LOG_COOKIE_NAME_PREFIX}{article_id}"
    if not request.cookies.get(cookie_name):
        ip_address = request.headers.get("x-forwarded-for", request.client.host)
        AccessLogService(db).create_log(AccessLogInput(
            article_id=article_id,
            ip_address=ip_address,
            user_agent=request.headers.get("user-agent"),
            referrer=request.headers.get("referer"),
        ))
        response.set_cookie(
            key=cookie_name,
            value="1",
            max_age=ACCESS_LOG_COOKIE_EXPIRE_SECONDS,
            httponly=True,
        )

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
        raise HTTPException(status_code=404, detail="Article not found")
    return article_data


@router.delete("/articles/{article_id}")
def delete_article(article_id: str, _: str = Depends(require_auth)):
    print(article_id)
    return {"message": "ok"}
