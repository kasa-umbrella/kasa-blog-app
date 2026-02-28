"""認証関連のAPIエンドポイント"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_database
from schemas.user import LoginRequest, LoginResponse
from services.userService import authenticate_user, create_access_token

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, db: Session = Depends(get_database)):
    user = authenticate_user(db, request.login_id, request.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ログインIDまたはパスワードが正しくありません",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token(user.id)
    return LoginResponse(accessToken=token)
