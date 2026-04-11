"""テスト用ヘルパー関数"""

from datetime import datetime, timedelta


def make_article(db, **kwargs):
    """テスト用記事を作成するヘルパー関数"""
    from models.article import Article

    defaults = {
        "title": "テスト記事",
        "summary": "テスト用の要約文です。",
        "main_image_url": "https://example.com/image.jpg",
        "content": "テスト用の本文です。",
        "limited": False,
        "published": True,
        "published_at": datetime.now() - timedelta(hours=1),
    }
    defaults.update(kwargs)
    article = Article(**defaults)
    db.add(article)
    db.commit()
    db.refresh(article)
    return article
