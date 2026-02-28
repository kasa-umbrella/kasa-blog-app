"""ユーザー認証関連のPydanticスキーマ"""

from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    login_id: str = Field(..., alias="loginId")
    password: str

    model_config = {"populate_by_name": True}


class LoginResponse(BaseModel):
    access_token: str = Field(..., alias="accessToken")
    token_type: str = Field(default="bearer", alias="tokenType")

    model_config = {"populate_by_name": True}
