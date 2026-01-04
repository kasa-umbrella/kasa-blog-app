from fastapi import FastAPI

from api import items, article, root


app = FastAPI()

app.include_router(root.router)
app.include_router(items.router)
app.include_router(article.router)
