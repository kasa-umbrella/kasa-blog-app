import os

HTTP_NOT_FOUND = 404

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-me-in-production")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 3  # 3時間

COOKIE_NAME = "access_token"
COOKIE_MAX_AGE = 60 * 60 * 3  # 3時間（秒）
SECURE_COOKIES = os.getenv("SECURE_COOKIES", "false").lower() == "true"

ARTICLES_PER_PAGE = 15

ACCESS_LOG_COOKIE_EXPIRE_SECONDS = 60 * 30  # 30分
ACCESS_LOG_COOKIE_NAME_PREFIX = "article_visit_"
