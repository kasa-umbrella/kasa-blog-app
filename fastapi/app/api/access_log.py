from fastapi import APIRouter, Depends, Request, Response
from sqlalchemy.orm import Session
from database import get_database
from schemas.access_log import AccessLogInput, AccessLogListResponse, WeeklyAccessResponse
from services.access_log_service import AccessLogService
from dependencies import require_auth
from util.constant import ACCESS_LOG_COOKIE_EXPIRE_SECONDS, ACCESS_LOG_COOKIE_NAME_PREFIX

router = APIRouter()


@router.get("/access-log/weekly", response_model=WeeklyAccessResponse)
def get_weekly_access(
    db: Session = Depends(get_database),
    _: str = Depends(require_auth),
):
    return AccessLogService(db).get_weekly_access()


@router.get("/access-log/list", response_model=AccessLogListResponse)
def get_access_log_list(
    page: int = 1,
    db: Session = Depends(get_database),
    _: str = Depends(require_auth),
):
    return AccessLogService(db).get_access_log_list(page=page)


@router.post("/access-log/{article_id}", status_code=204)
def record_access(
    article_id: str,
    request: Request,
    response: Response,
    db: Session = Depends(get_database),
):
    cookie_name = f"{ACCESS_LOG_COOKIE_NAME_PREFIX}{article_id}"
    if request.cookies.get(cookie_name):
        return

    ip_address = request.headers.get("x-forwarded-for", request.client.host)
    AccessLogService(db).create_log(AccessLogInput(
        article_id=article_id,
        ip_address=ip_address,
        user_agent=request.headers.get("user-agent"),
        referrer=request.headers.get("referer"),
    ))
    response.set_cookie(
        key=cookie_name,
        value="1",
        max_age=ACCESS_LOG_COOKIE_EXPIRE_SECONDS,
        httponly=True,
        samesite="lax",
    )
