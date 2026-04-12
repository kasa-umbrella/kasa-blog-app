"""DBダンプエンドポイント"""

from datetime import datetime

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from database import get_database
from dependencies import require_auth
from services.dump_service import DumpService

router = APIRouter()


@router.get("/dump")
def download_dump(
    _: str = Depends(require_auth),
    db: Session = Depends(get_database),
):
    sql = DumpService(db).generate_sql()
    filename = f"dump_{datetime.now().strftime('%Y%m%d_%H%M%S')}.sql"

    return StreamingResponse(
        iter([sql]),
        media_type="text/plain",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )
