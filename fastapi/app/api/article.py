from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_database
from schemas.article import ArticleInput, article
from services.articleService import ArticleService
from dependencies import require_auth

router = APIRouter()


@router.get("/articles", response_model=list[article])
def get_articles():
    articles = [
        article(
            article_id="0194ce69-6571-70cb-873b-5a02e5b87823",
            title="サンプル記事タイトル1",
            summery="これはサンプル記事1の概要です。",
            main_image_url="https://s3.isk01.sakurastorage.jp/kasa-blog-images/G3HgXOqbwAAMnbA.jpeg",
            body="これはサンプル記事1の本文です。",
            created_at=datetime.now(),
        ),
        article(
            article_id="0194ce74-4595-711e-84b2-2977508f7734",
            title="サンプル記事タイトル2",
            summery="これはサンプル記事2の概要です。",
            main_image_url="https://s3.isk01.sakurastorage.jp/kasa-blog-images/GyiYX4Ca8AA_Qrv.jpeg",
            body="これはサンプル記事2の本文です。",
            created_at=datetime.now(),
        ),
    ]
    return articles


@router.get("/article/{article_id}", response_model=article)
def get_article_by_id(article_id: str):
    article_data = article(
        article_id=article_id,
        title="APIサーバーから取得した記事タイトル",
        summery="これはAPIサーバーから取得した記事の概要です。",
        main_image_url="https://s3.isk01.sakurastorage.jp/kasa-blog-images/IMG_5135.jpg",
        body="これはAPIサーバーから取得した記事の本文です。",
        created_at=datetime.now(),
    )

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
