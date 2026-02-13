from pydantic import BaseModel
from decimal import Decimal
from typing import Optional



class ProductListResponse(BaseModel):
    product_id: int
    name: str
    price: Decimal

    class Config:
        from_attributes = True
