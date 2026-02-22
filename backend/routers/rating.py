from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from sqlalchemy.orm import Session
from oauth2 import get_current_user
from models import User, Rating, Product
from datetime import UTC, datetime
from schemas.rating import AddRatingInput, RatingResponse



router = APIRouter(prefix="/rating", tags=["Rating"])


@router.post("/add-rating", response_model=RatingResponse)
def add_rating(
    rating_info : AddRatingInput,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    product = db.query(Product).filter(
        Product.product_id == rating_info.product_id
    ).first()

    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    rating = db.query(Rating).filter(
        Rating.product_id == rating_info.product_id,
        Rating.user_id == current_user.user_id
    ).first()

    if rating is None:
        rating = Rating(
            user_id=current_user.user_id,
            product_id=rating_info.product_id,
            score= rating_info.score
        )
        db.add(rating)
    else:
        rating.score = rating_info.score
        rating.updated_at = datetime.now(UTC)

    db.commit()
    db.refresh(rating)

    return rating


@router.delete("/delete-rating/{product_id}")
def delete_rating(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    product = db.query(Product).filter(
        Product.product_id == product_id
    ).first()

    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    rating = db.query(Rating).filter(
        Rating.product_id == product_id,
        Rating.user_id == current_user.user_id
    ).first()

    if rating is None:
        raise HTTPException(status_code=404, detail="Rating not found")

    db.delete(rating)
    db.commit()

    return {"success": True}


@router.get("/get-ratings", response_model=list[RatingResponse])
def get_ratings(
    product_id: int | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    query = db.query(Rating).filter(
        Rating.user_id == current_user.user_id
    )

    if product_id is not None:
        query = query.filter(Rating.product_id == product_id)

    ratings = query.all()

    return ratings
