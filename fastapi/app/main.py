from fastapi import FastAPI

from api import article, root


app = FastAPI()

app.include_router(root.router)
app.include_router(article.router, prefix="/api")
