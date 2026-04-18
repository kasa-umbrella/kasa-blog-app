"""コメントAPIのテスト"""

import pytest
from fastapi.testclient import TestClient

from dependencies import verify_csrf
from main import app
from helpers import make_article, make_comment


@pytest.fixture
def no_csrf_client(client):
    """CSRF検証をスキップするクライアント"""
    app.dependency_overrides[verify_csrf] = lambda: None
    yield client
    app.dependency_overrides.pop(verify_csrf, None)


VALID_COMMENT_BODY = {
    "commenterName": "投稿者",
    "content": "コメント内容です。",
}


class TestGetCsrfToken:
    def test_トークンが返る(self, client):
        res = client.get("/api/csrf-token")

        assert res.status_code == 200
        assert "csrfToken" in res.json()

    def test_Cookieがセットされる(self, client):
        res = client.get("/api/csrf-token")

        assert "csrf_token" in res.cookies


class TestGetComments:
    def test_コメントがない場合空配列を返す(self, client, db):
        article = make_article(db)

        res = client.get(f"/api/articles/{article.id}/comments")

        assert res.status_code == 200
        data = res.json()
        assert data["comments"] == []
        assert data["total"] == 0

    def test_コメント一覧が返る(self, client, db):
        article = make_article(db)
        make_comment(db, article_id=article.id, commenter_name="ユーザーA")
        make_comment(db, article_id=article.id, commenter_name="ユーザーB")

        res = client.get(f"/api/articles/{article.id}/comments")

        assert res.status_code == 200
        data = res.json()
        assert data["total"] == 2
        names = [c["commenterName"] for c in data["comments"]]
        assert "ユーザーA" in names
        assert "ユーザーB" in names

    def test_他の記事のコメントは含まれない(self, client, db):
        article1 = make_article(db)
        article2 = make_article(db)
        make_comment(db, article_id=article1.id)
        make_comment(db, article_id=article2.id, commenter_name="別記事のユーザー")

        res = client.get(f"/api/articles/{article1.id}/comments")

        assert res.status_code == 200
        names = [c["commenterName"] for c in res.json()["comments"]]
        assert "別記事のユーザー" not in names

    def test_ページネーション_has_nextが正しい(self, client, db):
        article = make_article(db)
        for i in range(11):
            make_comment(db, article_id=article.id)

        res = client.get(f"/api/articles/{article.id}/comments?page=1")

        assert res.status_code == 200
        data = res.json()
        assert len(data["comments"]) == 10
        assert data["hasNext"] is True

    def test_ページネーション_最終ページはhas_nextがFalse(self, client, db):
        article = make_article(db)
        for i in range(10):
            make_comment(db, article_id=article.id)

        res = client.get(f"/api/articles/{article.id}/comments?page=1")

        assert res.status_code == 200
        assert res.json()["hasNext"] is False


class TestCreateComment:
    def test_CSRFトークンなしは403(self, client, db):
        article = make_article(db)

        res = client.post(f"/api/articles/{article.id}/comments", json=VALID_COMMENT_BODY)

        assert res.status_code == 403

    def test_CSRFトークン不一致は403(self, client, db):
        article = make_article(db)
        client.get("/api/csrf-token")

        res = client.post(
            f"/api/articles/{article.id}/comments",
            json=VALID_COMMENT_BODY,
            headers={"x-csrf-token": "invalid-token"},
        )

        assert res.status_code == 403

    def test_正常投稿できる(self, no_csrf_client, db):
        article = make_article(db)

        res = no_csrf_client.post(f"/api/articles/{article.id}/comments", json=VALID_COMMENT_BODY)

        assert res.status_code == 201
        data = res.json()
        assert data["commenterName"] == VALID_COMMENT_BODY["commenterName"]
        assert data["content"] == VALID_COMMENT_BODY["content"]
        assert data["articleId"] == article.id

    def test_投稿後に一覧に反映される(self, no_csrf_client, db):
        article = make_article(db)
        no_csrf_client.post(f"/api/articles/{article.id}/comments", json=VALID_COMMENT_BODY)

        res = no_csrf_client.get(f"/api/articles/{article.id}/comments")

        assert res.json()["total"] == 1

    def test_名前が空は422(self, no_csrf_client, db):
        article = make_article(db)

        res = no_csrf_client.post(
            f"/api/articles/{article.id}/comments",
            json={"commenterName": "", "content": "内容"},
        )

        assert res.status_code == 422

    def test_コンテンツが空は422(self, no_csrf_client, db):
        article = make_article(db)

        res = no_csrf_client.post(
            f"/api/articles/{article.id}/comments",
            json={"commenterName": "名前", "content": ""},
        )

        assert res.status_code == 422

    def test_名前が20字超は422(self, no_csrf_client, db):
        article = make_article(db)

        res = no_csrf_client.post(
            f"/api/articles/{article.id}/comments",
            json={"commenterName": "あ" * 21, "content": "内容"},
        )

        assert res.status_code == 422

    def test_コンテンツが50字超は422(self, no_csrf_client, db):
        article = make_article(db)

        res = no_csrf_client.post(
            f"/api/articles/{article.id}/comments",
            json={"commenterName": "名前", "content": "あ" * 51},
        )

        assert res.status_code == 422
