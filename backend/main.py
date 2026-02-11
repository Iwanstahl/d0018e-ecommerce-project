
from fastapi import Depends, FastAPI
from pydantic import BaseModel
from typing import Annotated
import models
from database import get_db, engine
from sqlalchemy.orm import Session


app = FastAPI()



models.Base.metadata.create_all(bind=engine)



@app.get("/")
async def root():
    return {"message": "Hello World"}


