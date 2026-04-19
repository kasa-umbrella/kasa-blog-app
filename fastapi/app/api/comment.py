from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.orm import Session
from database import get_database
from dependencies import require_auth, verify_csrf
from schemas.comment import AdminCommentListResponse, CommentInput, CommentListResponse, CommentResponse
from services.comment_service import CommentService

router = APIRouter()


@router.get("/comments", response_model=AdminCommentListResponse)
def get_all_comments(
    page: int = 1,
    db: Session = Depends(get_database),
    _: str = Depends(require_auth),
):
    return CommentService(db).get_all_comments(page)


@router.get("/articles/{article_id}/comments", response_model=CommentListResponse)
def get_comments(
    article_id: str,
    page: int = 1,
    db: Session = Depends(get_database),
):
    service = CommentService(db)
    return service.get_comments(article_id, page)


@router.post(
    "/articles/{article_id}/comments",
    response_model=CommentResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(verify_csrf)],
)
def create_comment(
    article_id: str,
    body: CommentInput,
    request: Request,
    db: Session = Depends(get_database),
):
    ip = request.headers.get("x-real-ip") or (request.client.host if request.client else None)
    service = CommentService(db)
    return service.create_comment(article_id, body, ip)
