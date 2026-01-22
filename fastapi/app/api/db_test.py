from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.database import get_database

router = APIRouter()


@router.get("/db-test")
def db_test(db: Session = Depends(get_database)):
    db.execute(text("SELECT 1"))
    return {"message": "DB connected"}
