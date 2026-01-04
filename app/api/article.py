from datetime import datetime

from fastapi import APIRouter
from schemas.article import article

router = APIRouter()


@router.get("/articles", response_model=list[article])
def get_articles():
    articles = [
        article(
            article_id="1",
            title="サンプル記事タイトル1",
            main_image_url="https://example.com/image1.jpg",
            content="これはサンプル記事1の本文です。",
            create_at=datetime.now().isoformat(),
        ),
        article(
            article_id="2",
            title="サンプル記事タイトル2",
            main_image_url="https://example.com/image2.jpg",
            content="これはサンプル記事2の本文です。",
            create_at=datetime.now().isoformat(),
        ),
    ]
    return articles


@router.get("/article/{article_id}", response_model=article)
def get_article_by_id(article_id: str):
    article_data = article(
        id=article_id,
        title="サンプル記事タイトル",
        main_image_url="https://example.com/image.jpg",
        content="これはサンプル記事の本文です。",
        create_at=datetime.now().isoformat(),
    )

    return article_data
