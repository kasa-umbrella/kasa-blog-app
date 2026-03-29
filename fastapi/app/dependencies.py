"""共通依存関数"""

from typing import Optional

from fastapi import Cookie, HTTPException, status

from services.userService import verify_access_token


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
