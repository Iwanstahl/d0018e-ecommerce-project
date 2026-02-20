from pydantic import BaseModel
from decimal import Decimal
from typing import Optional

class InventoryResponse(BaseModel):
    stock: int

class ProductListResponse(BaseModel):
    product_id: int
    name: str
    price: Decimal
    image : str | None
    inventory: InventoryResponse | None


    class Config:
        from_attributes = True


class AddProduct(BaseModel):
    name: str
    price : Decimal
    image : str | None
    stock: int
    category : str