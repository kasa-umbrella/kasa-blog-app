from fastapi import APIRouter, Depends, UploadFile, File
from dependencies import require_auth
from services.imageService import ImageService

router = APIRouter()


@router.post("/image")
def upload_image(file: UploadFile = File(...), _: str = Depends(require_auth)):
    service = ImageService()
    image_url = service.upload_image(file)
    return {"imageUrl": image_url}
