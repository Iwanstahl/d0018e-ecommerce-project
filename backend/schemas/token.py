from pydantic import BaseModel
from typing import Optional


class Token(BaseModel):
    access_token: str
    token_type: str

    class Config:
        from_attributes = True


class TokenData(BaseModel):
    id: Optional[str] = None
    class Config:
        from_attributes = True
