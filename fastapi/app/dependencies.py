"""共通依存関数"""

from typing import Optional

from fastapi import Cookie, HTTPException, Request, status

from services.user_service import verify_access_token
from services.csrf_service import CSRF_COOKIE_NAME, CSRF_HEADER_NAME, validate_csrf


def optional_auth(access_token: Optional[str] = Cookie(default=None)) -> Optional[str]:
    if access_token is None:
        return None
    return verify_access_token(access_token)


def require_auth(access_token: Optional[str] = Cookie(default=None)) -> str:
    if access_token is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="未認証")
    user_id = verify_access_token(access_token)
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="無効なトークンです")
    return user_id


def verify_csrf(
    request: Request,
    csrf_token: Optional[str] = Cookie(alias=CSRF_COOKIE_NAME, default=None),
):
    header_token = request.headers.get(CSRF_HEADER_NAME)
    if not validate_csrf(csrf_token, header_token):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="CSRFトークンが無効です")
