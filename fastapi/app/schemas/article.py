from datetime import datetime
from pydantic import BaseModel, ConfigDict
from pydantic import Field

class article(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,  # fieldとalias両方を受け付ける
    )
    
    article_id: str = Field(..., alias="articleId")
    title: str
    main_image_url: str | None = Field(None, alias="mainImageUrl")
    body: str
    created_at: datetime = Field(..., alias="createdAt")