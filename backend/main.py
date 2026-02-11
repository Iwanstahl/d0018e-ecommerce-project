
from fastapi import Depends, FastAPI
from pydantic import BaseModel
from typing import Annotated
from backend import models
from database import SessionLocal, engine
from sqlalchemy.orm import Session


app = FastAPI()
models.Base.metadata.create_all(bind=engine)


class PostBase(BaseModel):
    name: str
    price: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]


@app.get("/")
async def root():
    return {"message": "Hello World"}