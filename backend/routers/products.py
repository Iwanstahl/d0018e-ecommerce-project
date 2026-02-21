from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from database import get_db
from models import Product, Rating
from schemas.product import ProductListResponse, InventoryResponse

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get("/", response_model=list[ProductListResponse])
def get_products(
    category_id: int | None = None,
    db: Session = Depends(get_db)
):
    avg_rating = func.avg(Rating.score).label("average_rating")
    rating_count = func.count(Rating.rating_id).label("rating_count")

    query = (
        db.query(Product, avg_rating, rating_count)
        .outerjoin(Rating, Rating.product_id == Product.product_id)
        .options(joinedload(Product.inventory))
        .group_by(Product.product_id)
    )

    if category_id is not None:
        query = query.filter(Product.category_id == category_id)

    rows = query.all()  


    results = []
    for product, average_rating, rating_count in rows:
        results.append(
            ProductListResponse(
                **product.__dict__, 
                average_rating=float(average_rating) if average_rating is not None else None,
                rating_count=int(rating_count),
            )
        )

    return results


@router.get("/{product_id}")
def get_product(
        product_id: int,
        db: Session = Depends(get_db)
    ):
    

    product = (
        db.query(Product)
        .options(joinedload(Product.inventory))
        .filter(Product.product_id == product_id)
        .first()
)

    return product
