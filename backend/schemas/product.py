from pydantic import BaseModel
from decimal import Decimal
from typing import Optional




class InventoryResponse(BaseModel):
    stock: int
    
    model_config = {"from_attributes": True}

class ProductListResponse(BaseModel):
    product_id: int
    name: str
    price: Decimal
    image : str | None
    inventory: InventoryResponse | None
    average_rating : float | None
    rating_count: int


    class Config:
        from_attributes = True

    
class CategoryResponse(BaseModel):
    category_id : int
    category_name : str

class AddProductInput(BaseModel):
    name: str
    price: Decimal
    stock: int | None = None
    category: str

    image: str | None = None
    description: str | None = None


class UpdateProductInput(BaseModel):
    name: str | None = None
    price: Decimal | None = None
    image: str | None = None
    stock: int | None = None
    category: str | None = None
    description: str | None = None


class ProductResponseAdmin(BaseModel):
    product_id: int
    name: str
    description: str | None = None
    price: Decimal
    image: str | None = None
    inventory: InventoryResponse | None = None
    category: CategoryResponse | None = None
