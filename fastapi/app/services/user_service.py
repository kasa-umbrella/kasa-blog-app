"""ユーザー認証ビジネスロジック"""

from datetime import datetime, timedelta, timezone

import bcrypt
from fastapi import Response
from jose import jwt
from sqlalchemy.orm import Session

from models.user import User
from util.constant import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    COOKIE_MAX_AGE,
    COOKIE_NAME,
    JWT_ALGORITHM,
    JWT_SECRET_KEY,
    SECURE_COOKIES,
)


def get_user_by_id(db: Session, login_id: str) -> User | None:
    return db.query(User).filter(User.id == login_id).first()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())


def authenticate_user(db: Session, login_id: str, password: str) -> User | None:
    user = get_user_by_id(db, login_id)
    if user is None:
        return None
    if not verify_password(password, user.password):
        return None
    return user


def create_access_token(user_id: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": user_id, "exp": expire}
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def verify_access_token(token: str) -> str | None:
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        user_id: str | None = payload.get("sub")
        return user_id
    except Exception:
        return None


def set_auth_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        samesite="lax",
        secure=SECURE_COOKIES,
        max_age=COOKIE_MAX_AGE,
    )


def clear_auth_cookie(response: Response) -> None:
    response.delete_cookie(key=COOKIE_NAME, httponly=True, samesite="lax")
