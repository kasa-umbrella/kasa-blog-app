from pydantic import BaseModel

class article(BaseModel):
    article_id: str
    title: str
    main_image_url: str | None = None
    content: str
    create_at: str