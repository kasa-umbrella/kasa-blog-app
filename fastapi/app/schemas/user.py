"""ユーザー認証関連のPydanticスキーマ"""

from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    login_id: str = Field(..., alias="loginId")
    password: str

    model_config = {"populate_by_name": True}


class LoginResponse(BaseModel):
    message: str = "ログインに成功しました"
