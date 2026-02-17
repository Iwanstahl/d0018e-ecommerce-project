from fastapi import APIRouter, Depends, status, HTTPException, Response
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
from models import User
import utils
import oauth2
from schemas.auth import UserResponse, UserCreate
from schemas.token import Token, TokenData


router = APIRouter(tags=['Authentication'])




@router.post("/register", response_model= UserResponse)
def register_user(user:UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail="Email already exists."
        )


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



# FastAPI anväder OAuth2, så ingen JSON, använd x-www-form-urlencoded
@router.post('/login', response_model= Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.email == user_credentials.username).first()


    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

    if not utils.verify(user_credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

   

    access_token = oauth2.create_access_token(data={"user_id": user.user_id})

    return {"access_token": access_token, "token_type": "bearer"}
 