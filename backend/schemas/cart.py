from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from decimal import Decimal


# 🔹 Input when updating cart
class CartItemInput(BaseModel):
    product_id: int
    quantity: int


# 🔹 Product inside cart
class ProductResponseCart(BaseModel):
    product_id: int
    name: str
    price: Decimal  # optional but recommended

    class Config:
        from_attributes = True


# 🔹 Single cart item
class CartProductResponse(BaseModel):
    quantity: int
    product: ProductResponseCart

    class Config:
        from_attributes = True


# 🔹 Full cart response (wrapper)
class CartResponse(BaseModel):
    expires_at: Optional[datetime]
    cart_price: Decimal
    items: List[CartProductResponse]

    class Config:
        from_attributes = True
