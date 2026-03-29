import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import access_log, article, auth, image, root


app = FastAPI()

origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(root.router)
app.include_router(article.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(image.router, prefix="/api")
app.include_router(access_log.router, prefix="/api")
