from botocore.exceptions import BotoCoreError, ClientError
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from dependencies import require_auth
from services.imageService import ImageService

router = APIRouter()


@router.post("/image")
def upload_image(file: UploadFile = File(...), _: str = Depends(require_auth)):
    try:
        service = ImageService()
        image_url = service.upload_image(file)
        return {"imageUrl": image_url}
    except (BotoCoreError, ClientError) as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/images/recent")
def get_recent_images(_: str = Depends(require_auth)):
    try:
        service = ImageService()
        keys = service.get_recent_image_keys()
        return {"keys": keys}
    except (BotoCoreError, ClientError) as e:
        raise HTTPException(status_code=500, detail=str(e))
