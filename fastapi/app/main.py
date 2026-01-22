from fastapi import FastAPI

from api import article, root


app = FastAPI()

app.include_router(root.router)
