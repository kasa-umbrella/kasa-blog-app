import os

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-me-in-production")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24時間

COOKIE_NAME = "access_token"
COOKIE_MAX_AGE = 60 * 60 * 24  # 24時間（秒）
SECURE_COOKIES = os.getenv("SECURE_COOKIES", "false").lower() == "true"
