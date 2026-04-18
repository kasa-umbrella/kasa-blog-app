from fastapi import APIRouter, Response
from services.csrf_service import CSRF_COOKIE_MAX_AGE, CSRF_COOKIE_NAME, generate_csrf_token
from util.constant import SECURE_COOKIES

router = APIRouter()


@router.get("/csrf-token")
def get_csrf_token(response: Response):
    token = generate_csrf_token()
    response.set_cookie(
        key=CSRF_COOKIE_NAME,
        value=token,
        httponly=False,
        samesite="strict",
        secure=SECURE_COOKIES,
        max_age=CSRF_COOKIE_MAX_AGE,
    )
    return {"csrfToken": token}
