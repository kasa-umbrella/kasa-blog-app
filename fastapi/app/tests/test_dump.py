"""DBダンプAPIのテスト"""

from helpers import make_access_log, make_article


class TestDump:
    def test_未認証は401(self, client):
        res = client.get("/api/dump")

        assert res.status_code == 401

    def test_認証済でSQLファイルをダウンロードできる(self, auth_client):
        res = auth_client.get("/api/dump")

        assert res.status_code == 200
        assert "attachment" in res.headers["content-disposition"]
        assert ".sql" in res.headers["content-disposition"]

    def test_articlesのINSERT文が含まれる(self, auth_client, db):
        make_article(db, title="テスト記事")

        res = auth_client.get("/api/dump")

        body = res.text
        assert "INSERT INTO articles" in body
        assert "テスト記事" in body

    def test_access_logsのINSERT文が含まれる(self, auth_client, db):
        article = make_article(db)
        make_access_log(db, article_id=article.id)

        res = auth_client.get("/api/dump")

        body = res.text
        assert "INSERT INTO access_logs" in body

    def test_データが0件でもダウンロードできる(self, auth_client):
        res = auth_client.get("/api/dump")

        assert res.status_code == 200
        assert "INSERT INTO articles" not in res.text
        assert "INSERT INTO access_logs" not in res.text
