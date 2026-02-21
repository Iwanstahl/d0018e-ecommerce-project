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


from sqlalchemy import func

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

    if not product:
        return {"error": "Product not found"}


    rating_counts = (
        db.query(Rating.score, func.count(Rating.rating_id))
        .filter(Rating.product_id == product_id)
        .group_by(Rating.score)
        .all()
    )

    rating_distribution = {score: count for score, count in rating_counts}


    for i in range(1, 6):
        rating_distribution.setdefault(i, 0)


    avg_rating, total_count = (
        db.query(
            func.avg(Rating.score),
            func.count(Rating.rating_id)
        )
        .filter(Rating.product_id == product_id)
        .first()
    )

    return {
        "product_id": product.product_id,
        "name": product.name,
        "price": product.price,
        "description" : product.description,
        "inventory": product.inventory.stock if product.inventory else None,
        "average_rating": float(avg_rating) if avg_rating else None,
        "rating_count": total_count,
        "ratings": rating_distribution
    }