from pydantic import BaseModel

class ArticleRecord(BaseModel):
    id: str
    title: str
    summary: str
    main_image_url: str | None = None
    created_at: str