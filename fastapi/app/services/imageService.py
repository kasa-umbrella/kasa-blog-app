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
        ext = file.filename.rsplit(".", 1)[-1] if "." in file.filename else ""
        object_key = f"{uuid.uuid4()}.{ext}" if ext else str(uuid.uuid4())

        self.client.upload_fileobj(
            file.file,
            self.bucket_name,
            object_key,
            ExtraArgs={"ContentType": file.content_type, "ACL": "public-read"},
        )

        image_url = f"{S3_ENDPOINT_URL}/{self.bucket_name}/{object_key}"
        return image_url

    def get_recent_image_keys(self, limit: int = 20) -> list[str]:
        response = self.client.list_objects_v2(Bucket=self.bucket_name)
        objects = response.get("Contents", [])
        sorted_objects = sorted(objects, key=lambda obj: obj["LastModified"], reverse=True)
        return [obj["Key"] for obj in sorted_objects[:limit]]
