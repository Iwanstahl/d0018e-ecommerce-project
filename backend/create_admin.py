import os
from database import SessionLocal
from models import User
from utils import hash as get_password_hash
from config import settings

db = SessionLocal()

email = settings.admin_email
password = settings.admin_password
username = "admin"


if not email or not password:
    raise Exception("Set ADMIN_EMAIL and ADMIN_PASSWORD")

existing = db.query(User).filter(User.email == email).first()
if existing:
    print("Admin already exists")
else:
    admin = User(

        email=email,
        username= username,
        password_hash=get_password_hash(password),
        is_admin=True
    )
    db.add(admin)
    db.commit()
    print("Admin created successfully")

db.close()