from fastapi import FastAPI

from api import article, auth, root


app = FastAPI()

app.include_router(root.router)
app.include_router(article.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
