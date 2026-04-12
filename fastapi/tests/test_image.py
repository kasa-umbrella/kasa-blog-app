"""画像アップロードAPIのテスト"""

import io
from unittest.mock import MagicMock, patch

import pytest

# JPEG マジックバイト
JPEG_HEADER = b"\xff\xd8\xff\xe0" + b"\x00" * 100
# PNG マジックバイト
PNG_HEADER = b"\x89PNG\r\n\x1a\n" + b"\x00" * 100
# 無効なバイト列
INVALID_HEADER = b"this-is-not-an-image" + b"\x00" * 100


def _make_upload(filename: str, content: bytes, content_type: str = "image/jpeg"):
    return {"file": (filename, io.BytesIO(content), content_type)}


class TestUploadImage:
    def test_未認証は401(self, client):
        res = client.post("/api/image", files=_make_upload("test.jpg", JPEG_HEADER))

        assert res.status_code == 401

    def test_jpeg画像をアップロードできる(self, auth_client):
        with patch("services.image_service.ImageService.upload_image", return_value="https://example.com/image.jpg"):
            res = auth_client.post("/api/image", files=_make_upload("test.jpg", JPEG_HEADER))

        assert res.status_code == 200
        assert "imageUrl" in res.json()

    def test_png画像をアップロードできる(self, auth_client):
        with patch("services.image_service.ImageService.upload_image", return_value="https://example.com/image.png"):
            res = auth_client.post("/api/image", files=_make_upload("test.png", PNG_HEADER, "image/png"))

        assert res.status_code == 200

    def test_許可外の拡張子は400(self, auth_client):
        res = auth_client.post("/api/image", files=_make_upload("test.php", JPEG_HEADER, "image/jpeg"))

        assert res.status_code == 400

    def test_拡張子を偽装しても弾かれる(self, auth_client):
        """拡張子は.jpgだがマジックバイトが無効なファイル"""
        res = auth_client.post("/api/image", files=_make_upload("test.jpg", INVALID_HEADER))

        assert res.status_code == 400

    def test_サイズ上限超過は400(self, auth_client):
        oversized = JPEG_HEADER + b"\x00" * (10 * 1024 * 1024 + 1)

        res = auth_client.post("/api/image", files=_make_upload("test.jpg", oversized))

        assert res.status_code == 400
