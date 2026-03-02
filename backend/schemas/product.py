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
    category_name: str | None
    average_rating : float | None
    rating_count: int


    class Config:
        from_attributes = True

    
class CategoryResponse(BaseModel):
    category_id : int
    category_name : str

###################################

class AddProductInput(BaseModel):
    category: str | None = None
    name: str
    price: Decimal
    description: str | None = None
    image: str | None = None
    stock: int | None = None


class UpdateProductInput(BaseModel):
    name: str 
    price: Decimal 
    image: str  | None = None
    stock: int 
    category: str | None = None
    description: str | None = None


class ProductResponseAdmin(BaseModel):
    product_id: int
    name: str
    price: Decimal
    description: str | None = None
    image: str | None = None
    inventory: InventoryResponse | None = None
    category: CategoryResponse | None = None
