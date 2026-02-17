from pydantic import BaseModel
from decimal import Decimal





class CartItemInput(BaseModel):
    product_id : int
    quantity : int



class CartProductResponse(BaseModel):
    quantity: int
    product: ProductResponseCart

    class Config:
        from_attributes = True

class ProductResponseCart(BaseModel):
    product_id : int
    name : str
    