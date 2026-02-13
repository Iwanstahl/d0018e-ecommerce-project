from fastapi import APIRouter, Depends, status, HTTPException, Response
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from schemas.auth import UserCreate, UserResponse
from database import get_db
from models import User
import utils


router = APIRouter(tags=['Authentication'])




@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):

    hashed_password = utils.hash(user.password)


    new_user = User(
        username=user.username,
        email=user.email,
        password_hash=hashed_password,
        is_admin=False   # Explicitly force it
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user




@router.post('/login')
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    pass
    #Get username check if it exist.
    #If exist hash password and compare.
    #Create a json token

 