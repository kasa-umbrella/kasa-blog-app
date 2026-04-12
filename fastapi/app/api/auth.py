"""認証関連のAPIエンドポイント"""

from typing import Optional

from fastapi import APIRouter, Cookie, Depends, HTTPException, Request, Response, status
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy.orm import Session

from database import get_database
from schemas.user import LoginRequest, LoginResponse
from services.user_service import (
    authenticate_user,
    clear_auth_cookie,
    create_access_token,
    set_auth_cookie,
    verify_access_token,
)

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.post("/login", response_model=LoginResponse)
@limiter.limit("10/minute")
def login(request: Request, body: LoginRequest, response: Response, db: Session = Depends(get_database)):
    user = authenticate_user(db, body.login_id, body.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ログインIDまたはパスワードが正しくありません",
        )
    token = create_access_token(user.id)
    set_auth_cookie(response, token)
    return LoginResponse()


@router.get("/auth")
def verify_auth(access_token: Optional[str] = Cookie(default=None)):
    if access_token is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="未認証")
    user_id = verify_access_token(access_token)
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="無効なトークンです")
    return {"userId": user_id}


@router.post("/logout")
def logout(response: Response):
    clear_auth_cookie(response)
    return {"message": "ログアウトしました"}
