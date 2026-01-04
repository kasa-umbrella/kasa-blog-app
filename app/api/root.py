from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from db import get_db

router = APIRouter()


@router.get("/")
def read_root():
    return {"message": "かさたたのブログAPIにようこそ"}


@router.get("/db-test")
def db_test(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"message": "DB connected"}
