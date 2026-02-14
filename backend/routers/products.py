from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Product, Inventory
from sqlalchemy.orm import joinedload
from schemas.product import ProductListResponse
import os

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)




@router.get("/", response_model=list[ProductListResponse])
def get_products(
    category_id: int | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Product)

    if category_id:
        query = query.filter(Product.category_id == category_id)

    return query.all()



@router.get("/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = (
    db.query(Product)
    .options(joinedload(Product.inventory))
    .filter(Product.product_id == product_id)
    .first()
)

    return product
