from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from decimal import Decimal



class CartItemInput(BaseModel):
    product_id: int
    quantity: int



class ProductResponseCart(BaseModel):
    product_id: int
    name: str
    price: Decimal  # optional but recommended

    class Config:
        from_attributes = True


class CartProductResponse(BaseModel):
    quantity: int
    original_price: Decimal
    product: ProductResponseCart

    class Config:
        from_attributes = True



class CartResponse(BaseModel):
    expires_at: Optional[datetime]
    cart_price: Decimal
    items: List[CartProductResponse]

    class Config:
        from_attributes = True
