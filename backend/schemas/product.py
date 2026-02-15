from pydantic import BaseModel
from decimal import Decimal
from typing import Optional



class ProductListResponse(BaseModel):
    product_id: int
    name: str
    price: Decimal
    image : str | None
    inventory: InventoryResponse | None


    class Config:
        from_attributes = True

class InventoryResponse(BaseModel):
    stock: int