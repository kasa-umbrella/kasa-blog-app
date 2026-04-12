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


def make_user(db, login_id: str = "testuser", password: str = "password") -> "User":
    """テスト用ユーザーを作成するヘルパー関数（パスワードはbcryptハッシュ化済み）"""
    import bcrypt
    from models.user import User

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    user = User(id=login_id, password=hashed)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def make_access_log(db, article_id: str, **kwargs):
    """テスト用アクセスログを作成するヘルパー関数"""
    from models.access_log import AccessLog

    defaults = {
        "article_id": article_id,
        "ip_address": "127.0.0.1",
        "user_agent": "test-agent",
        "referrer": None,
    }
    defaults.update(kwargs)
    log = AccessLog(**defaults)
    db.add(log)
    db.commit()
    db.refresh(log)
    return log
