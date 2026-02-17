from fastapi import APIRouter, Depends, status, HTTPException, Response
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
from models import User, Cart
import utils
import oauth2
from schemas.auth import UserResponse, UserCreate
from schemas.token import Token, TokenData


router = APIRouter(tags=['Authentication'])




@router.post("/register", response_model=UserResponse)
def register_user(
    user: UserCreate,
    token: int | None = None,
    db: Session = Depends(get_db)
):


    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists."
        )


    hashed_password = utils.hash(user.password)


    new_user = User(
        username=user.username,
        email=user.email,
        password_hash=hashed_password,
        is_admin=False
    )

    db.add(new_user)


    db.flush()


    if token:

        guest_cart = db.query(Cart).filter(
            Cart.session_id == token
        ).first()

        if guest_cart:
            guest_cart.user_id = new_user.user_id
            guest_cart.session_id = None

    db.commit()


    db.refresh(new_user)

    return new_user




@router.post('/login', response_model=Token)
def login(
    token: int | None = None,
    user_credentials: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == user_credentials.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid Credentials"
        )

    if not utils.verify(user_credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid Credentials"
        )

    if token:

        guest_cart = db.query(Cart).filter(
            Cart.session_id == token
        ).first()

        if guest_cart:

            existing_cart = db.query(Cart).filter(
                Cart.user_id == user.user_id
            ).first()

            if existing_cart:
                db.delete(existing_cart)
                db.flush()

            guest_cart.user_id = user.user_id
            guest_cart.session_id = None

            db.commit()

    access_token = oauth2.create_access_token(
        data={"user_id": user.user_id}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
