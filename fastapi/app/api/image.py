from botocore.exceptions import BotoCoreError, ClientError
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from dependencies import require_auth, verify_csrf
from services.image_service import ImageService

router = APIRouter()


@router.post("/image", dependencies=[Depends(verify_csrf)])
def upload_image(file: UploadFile = File(...), _: str = Depends(require_auth)):
    try:
        service = ImageService()
        image_url = service.upload_image(file)
        return {"imageUrl": image_url}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
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
