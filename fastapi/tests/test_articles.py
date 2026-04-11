"""記事APIのテスト"""

from datetime import datetime, timedelta

from helpers import make_article


class TestGetArticles:
    def test_未認証_公開記事のみ返る(self, client, db):
        make_article(db, title="公開記事", published=True, limited=False)
        make_article(db, title="非公開記事", published=False)
        make_article(db, title="限定記事", published=True, limited=True)

        res = client.get("/api/articles")

        assert res.status_code == 200
        titles = [a["title"] for a in res.json()["articles"]]
        assert "公開記事" in titles
        assert "非公開記事" not in titles
        assert "限定記事" not in titles

    def test_未認証_未来日の記事は除外される(self, client, db):
        make_article(db, title="過去記事", published_at=datetime.now() - timedelta(days=1))
        make_article(db, title="未来記事", published_at=datetime.now() + timedelta(days=1))

        res = client.get("/api/articles")

        assert res.status_code == 200
        titles = [a["title"] for a in res.json()["articles"]]
        assert "過去記事" in titles
        assert "未来記事" not in titles

    def test_認証済_全記事が返る(self, auth_client, db):
        make_article(db, title="公開記事", published=True, limited=False)
        make_article(db, title="非公開記事", published=False)
        make_article(db, title="限定記事", published=True, limited=True)

        res = auth_client.get("/api/articles")

        assert res.status_code == 200
        assert res.json()["total"] == 3

    def test_ページネーション_件数が正しい(self, client, db):
        for i in range(5):
            make_article(db, title=f"記事{i}")

        res = client.get("/api/articles?page=1&limit=3")

        assert res.status_code == 200
        data = res.json()
        assert len(data["articles"]) == 3
        assert data["total"] == 5

    def test_記事が0件のとき空配列を返す(self, client):
        res = client.get("/api/articles")

        assert res.status_code == 200
        data = res.json()
        assert data["articles"] == []
        assert data["total"] == 0


class TestGetArticleById:
    def test_公開記事を取得できる(self, client, db):
        article = make_article(db, published=True, limited=False)

        res = client.get(f"/api/articles/{article.id}")

        assert res.status_code == 200
        assert res.json()["articleId"] == article.id

    def test_非公開記事は未認証で404(self, client, db):
        article = make_article(db, published=False)

        res = client.get(f"/api/articles/{article.id}")

        assert res.status_code == 404

    def test_限定記事は未認証で404(self, client, db):
        article = make_article(db, published=True, limited=True)

        res = client.get(f"/api/articles/{article.id}")

        assert res.status_code == 404

    def test_未来日記事は未認証で404(self, client, db):
        article = make_article(db, published=True, published_at=datetime.now() + timedelta(days=1))

        res = client.get(f"/api/articles/{article.id}")

        assert res.status_code == 404

    def test_存在しないIDは404(self, client):
        res = client.get("/api/articles/non-existent-id")

        assert res.status_code == 404

    def test_認証済は限定記事を取得できる(self, auth_client, db):
        article = make_article(db, published=True, limited=True)

        res = auth_client.get(f"/api/articles/{article.id}")

        assert res.status_code == 200

    def test_認証済は非公開記事を取得できる(self, auth_client, db):
        article = make_article(db, published=False)

        res = auth_client.get(f"/api/articles/{article.id}")

        assert res.status_code == 200


VALID_ARTICLE_BODY = {
    "title": "新しい記事",
    "summary": "テスト用の要約です。",
    "mainImageUrl": "https://example.com/image.jpg",
    "content": "テスト用の本文です。",
    "limited": False,
    "published": True,
}


class TestCreateArticle:
    def test_未認証は401(self, client):
        res = client.post("/api/articles", json=VALID_ARTICLE_BODY)

        assert res.status_code == 401

    def test_認証済で記事を作成できる(self, auth_client):
        res = auth_client.post("/api/articles", json=VALID_ARTICLE_BODY)

        assert res.status_code == 200
        data = res.json()
        assert data["title"] == VALID_ARTICLE_BODY["title"]
        assert "articleId" in data

    def test_作成した記事が一覧に表示される(self, auth_client):
        auth_client.post("/api/articles", json=VALID_ARTICLE_BODY)

        res = auth_client.get("/api/articles")

        assert res.status_code == 200
        assert res.json()["total"] == 1


class TestUpdateArticle:
    UPDATE_BODY = {
        "title": "更新タイトル",
        "summary": "更新要約です。",
        "mainImageUrl": "https://example.com/image.jpg",
        "content": "更新本文です。",
        "limited": False,
        "published": True,
    }

    def test_未認証は401(self, client, db):
        article = make_article(db)

        res = client.put(f"/api/articles/{article.id}", json=self.UPDATE_BODY)

        assert res.status_code == 401

    def test_認証済で記事を更新できる(self, auth_client, db):
        article = make_article(db, title="元のタイトル")

        res = auth_client.put(f"/api/articles/{article.id}", json=self.UPDATE_BODY)

        assert res.status_code == 200
        assert res.json()["title"] == "更新タイトル"

    def test_存在しないIDは404(self, auth_client):
        res = auth_client.put("/api/articles/non-existent-id", json=self.UPDATE_BODY)

        assert res.status_code == 404
