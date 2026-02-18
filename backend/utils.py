from passlib.context import CryptContext
from datetime import datetime, UTC
from models import Cart

pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto"
)

def hash(password: str):
    return pwd_context.hash(password)

def verify(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def delete_expired_carts(db):
    db.query(Cart).filter(
        Cart.expires_at != None,
        Cart.expires_at < datetime.now(UTC)
    ).delete(synchronize_session=False)

    db.commit()
