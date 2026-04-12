"""画像アップロードサービス（Sakura Cloud Object Storage / S3互換）"""

import os
import uuid

import boto3
from botocore.exceptions import BotoCoreError, ClientError
from dotenv import load_dotenv
from fastapi import UploadFile

load_dotenv()

S3_ENDPOINT_URL = os.getenv("S3_ENDPOINT_URL", "https://s3.isk01.sakurastorage.jp")
S3_ACCESS_KEY_ID = os.getenv("S3_ACCESS_KEY_ID")
S3_SECRET_ACCESS_KEY = os.getenv("S3_SECRET_ACCESS_KEY")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "gif", "webp"}

# マジックバイト: (先頭バイト列, Content-Type)
MAGIC_BYTES: list[tuple[bytes, str]] = [
    (b"\xff\xd8\xff", "image/jpeg"),
    (b"\x89PNG\r\n\x1a\n", "image/png"),
    (b"GIF87a", "image/gif"),
    (b"GIF89a", "image/gif"),
    (b"RIFF", "image/webp"),  # RIFF????WEBP の先頭4バイト
]


def _detect_content_type(header: bytes) -> str | None:
    for magic, content_type in MAGIC_BYTES:
        if header.startswith(magic):
            # WebP は RIFF の後ろに WEBP が続くか確認
            if magic == b"RIFF" and b"WEBP" not in header[4:12]:
                continue
            return content_type
    return None


class ImageService:
    def __init__(self):
        self.client = boto3.client(
            "s3",
            endpoint_url=S3_ENDPOINT_URL,
            aws_access_key_id=S3_ACCESS_KEY_ID,
            aws_secret_access_key=S3_SECRET_ACCESS_KEY,
        )
        self.bucket_name = S3_BUCKET_NAME

    def upload_image(self, file: UploadFile) -> str:
        # 拡張子チェック
        ext = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else ""
        if ext not in ALLOWED_EXTENSIONS:
            raise ValueError(f"許可されていないファイル形式です: .{ext}")

        # ファイルサイズ・マジックバイトチェック
        body = file.file.read()
        if len(body) > MAX_FILE_SIZE:
            raise ValueError("ファイルサイズは10MB以下にしてください")

        detected_type = _detect_content_type(body)
        if detected_type is None:
            raise ValueError("画像ファイルとして認識できません")

        # 読み込んだ分を先頭に戻す
        import io
        file.file = io.BytesIO(body)

        object_key = f"{uuid.uuid4()}.{ext}"
        self.client.upload_fileobj(
            file.file,
            self.bucket_name,
            object_key,
            ExtraArgs={"ContentType": detected_type, "ACL": "public-read"},
        )

        image_url = f"{S3_ENDPOINT_URL}/{self.bucket_name}/{object_key}"
        return image_url

    def get_recent_image_keys(self, limit: int = 20) -> list[str]:
        response = self.client.list_objects_v2(Bucket=self.bucket_name)
        objects = response.get("Contents", [])
        sorted_objects = sorted(objects, key=lambda obj: obj["LastModified"], reverse=True)
        return [obj["Key"] for obj in sorted_objects[:limit]]
