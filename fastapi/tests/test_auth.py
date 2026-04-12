"""認証APIのテスト"""

from helpers import make_user


class TestLogin:
    def test_正しい認証情報でログインできる(self, client, db):
        make_user(db, login_id="admin", password="correct-pass")

        res = client.post("/api/login", json={"loginId": "admin", "password": "correct-pass"})

        assert res.status_code == 200
        assert "access_token" in res.cookies

    def test_パスワードが間違っていると401(self, client, db):
        make_user(db, login_id="admin", password="correct-pass")

        res = client.post("/api/login", json={"loginId": "admin", "password": "wrong-pass"})

        assert res.status_code == 401
        assert "access_token" not in res.cookies

    def test_存在しないユーザーは401(self, client):
        res = client.post("/api/login", json={"loginId": "nobody", "password": "pass"})

        assert res.status_code == 401

    def test_ログイン成功後にauthエンドポイントが通る(self, client, db):
        make_user(db, login_id="admin", password="pass")
        login_res = client.post("/api/login", json={"loginId": "admin", "password": "pass"})
        # TestClientはHTTP経由のためSecureクッキーを自動送信しない場合があるので明示的にセット
        token = login_res.cookies.get("access_token")
        client.cookies.set("access_token", token)

        res = client.get("/api/auth")

        assert res.status_code == 200


class TestLogout:
    def test_ログアウト後はauthエンドポイントが401(self, client, db):
        make_user(db, login_id="admin", password="pass")
        client.post("/api/login", json={"loginId": "admin", "password": "pass"})
        client.post("/api/logout")

        res = client.get("/api/auth")

        assert res.status_code == 401

    def test_未ログインでもログアウトは200(self, client):
        res = client.post("/api/logout")

        assert res.status_code == 200


class TestAuth:
    def test_トークンなしは401(self, client):
        res = client.get("/api/auth")

        assert res.status_code == 401

    def test_不正なトークンは401(self, client):
        client.cookies.set("access_token", "invalid-token")

        res = client.get("/api/auth")

        assert res.status_code == 401
