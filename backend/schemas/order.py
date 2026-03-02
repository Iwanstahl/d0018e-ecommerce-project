from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List


class AdminUserResponse(BaseModel):
    user_id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True


class ProductInOrderResponse(BaseModel):
    product_id: int
    name: str
    price: float
    image: str | None = None

    class Config:
        from_attributes = True


class OrderItemResponse(BaseModel):
    quantity: int
    product: ProductInOrderResponse

    class Config:
        from_attributes = True


class AdminOrderResponse(BaseModel):
    order_id: int
    created_at: datetime
    status: str
    total_price: float
    user: AdminUserResponse
    items: List[OrderItemResponse]

    class Config:
        from_attributes = True