from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=100)
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(..., min_length=6)
    is_admin : bool = False


class UserResponse(UserBase):
    user_id: int
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True
