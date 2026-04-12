"""入力バリデーションのテスト"""

import pytest


VALID_BODY = {
    "title": "タイトル",
    "summary": "テスト用の要約文です。",
    "mainImageUrl": "https://example.com/image.jpg",
    "content": "本文です。",
    "limited": False,
    "published": True,
}


class TestArticleSearchParams:
    def test_limitが上限100を超えると422(self, client):
        res = client.get("/api/articles?limit=101")

        assert res.status_code == 422

    def test_limitが0以下だと422(self, client):
        res = client.get("/api/articles?limit=0")

        assert res.status_code == 422

    def test_pageが0以下だと422(self, client):
        res = client.get("/api/articles?page=0")

        assert res.status_code == 422

    def test_keywordが100文字を超えると422(self, client):
        long_keyword = "あ" * 101

        res = client.get(f"/api/articles?keyword={long_keyword}")

        assert res.status_code == 422

    def test_limit最大値100は通る(self, client):
        res = client.get("/api/articles?limit=100")

        assert res.status_code == 200

    def test_keyword100文字ちょうどは通る(self, client):
        keyword = "あ" * 100

        res = client.get(f"/api/articles?keyword={keyword}")

        assert res.status_code == 200


class TestArticleInputValidation:
    def test_タイトルが15文字を超えると422(self, auth_client):
        body = {**VALID_BODY, "title": "あ" * 16}

        res = auth_client.post("/api/articles", json=body)

        assert res.status_code == 422

    def test_概要が100文字を超えると422(self, auth_client):
        body = {**VALID_BODY, "summary": "あ" * 101}

        res = auth_client.post("/api/articles", json=body)

        assert res.status_code == 422

    def test_mainImageUrlがhttpでないと422(self, auth_client):
        body = {**VALID_BODY, "mainImageUrl": "javascript:alert(1)"}

        res = auth_client.post("/api/articles", json=body)

        assert res.status_code == 422

    def test_mainImageUrlがdataスキームだと422(self, auth_client):
        body = {**VALID_BODY, "mainImageUrl": "data:text/html,<script>alert(1)</script>"}

        res = auth_client.post("/api/articles", json=body)

        assert res.status_code == 422

    def test_mainImageUrlがhttpsなら通る(self, auth_client):
        res = auth_client.post("/api/articles", json=VALID_BODY)

        assert res.status_code == 200

    def test_mainImageUrlがhttpでも通る(self, auth_client):
        body = {**VALID_BODY, "mainImageUrl": "http://example.com/image.jpg"}

        res = auth_client.post("/api/articles", json=body)

        assert res.status_code == 200

    def test_タイトルが空だと422(self, auth_client):
        body = {**VALID_BODY, "title": ""}

        res = auth_client.post("/api/articles", json=body)

        assert res.status_code == 422

    def test_本文が空だと422(self, auth_client):
        body = {**VALID_BODY, "content": ""}

        res = auth_client.post("/api/articles", json=body)

        assert res.status_code == 422
