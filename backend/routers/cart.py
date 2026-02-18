from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models import Product, Inventory, Cart, User, CartItem
from schemas.cart import CartItemInput, CartResponse
from datetime import datetime, timedelta, UTC

router = APIRouter(
    prefix="/cart",
    tags=["cart"]
)


@router.get("/get-cart", response_model=CartResponse)
def get_cart(
    user_id: int | None = None,
    session_id: str | None = None,
    db: Session = Depends(get_db)
):

    if user_id is None and session_id is None:
        raise HTTPException(
            status_code=400,
            detail="Missing user_id or session_id"
        )

    if user_id is not None and session_id is not None:
        raise HTTPException(
            status_code=400,
            detail="Provide only user_id OR session_id"
        )

    if user_id is not None:
        cart = db.query(Cart).filter(
            Cart.user_id == user_id
        ).first()
    else:
        cart = db.query(Cart).filter(
            Cart.session_id == session_id
        ).first()

    if not cart:
        return {
            "expires_at": None,
            "cart_price": 0,
            "items": []
        }

    items = (
        db.query(CartItem)
        .options(joinedload(CartItem.product))
        .filter(CartItem.cart_id == cart.cart_id)
        .all()
    )

    return {
        "expires_at": cart.expires_at,
        "cart_price": cart.cart_price,
        "items": items
    }





@router.post("/update-cart")
def update_cart(
    user_id: int | None = None,
    session_id: str | None = None,
    cart_item: CartItemInput = None,
    db: Session = Depends(get_db)
):

    if user_id is None and session_id is None:
        raise HTTPException(
            status_code=400,
            detail="Missing user_id or session_id"
        )

    if user_id is not None and session_id is not None:
        raise HTTPException(
            status_code=400,
            detail="Provide only user_id OR session_id"
        )


    product = (
        db.query(Product)
        .options(joinedload(Product.inventory))
        .filter(Product.product_id == cart_item.product_id)
        .first()
    )

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if not product.inventory:
        raise HTTPException(status_code=400, detail="No inventory found")


    if user_id is not None:
        cart = db.query(Cart).filter(Cart.user_id == user_id).first()
        if not cart:
            cart = Cart(
                user_id=user_id,
                expires_at=datetime.now(UTC) + timedelta(hours=24)
            )
            db.add(cart)
            db.flush()

    else:
        cart = db.query(Cart).filter(Cart.session_id == session_id).first()
        if not cart:
            cart = Cart(
                session_id=session_id,
                expires_at=datetime.now(UTC) + timedelta(hours=24)
            )
            db.add(cart)
            db.flush()


    existing_item = (
        db.query(CartItem)
        .filter(
            CartItem.cart_id == cart.cart_id,
            CartItem.product_id == cart_item.product_id
        )
        .first()
    )

    if existing_item:
        new_quantity = existing_item.quantity + cart_item.quantity

        if new_quantity <= 0:
            db.delete(existing_item)

        elif new_quantity > product.inventory.stock:
            raise HTTPException(status_code=400, detail="Not enough stock")

        else:
            existing_item.quantity = new_quantity

    else:
        if cart_item.quantity <= 0:
            return {"info": "Nothing to remove"}

        if cart_item.quantity > product.inventory.stock:
            raise HTTPException(status_code=400, detail="Not enough stock")

        new_item = CartItem(
            cart_id=cart.cart_id,
            product_id=cart_item.product_id,
            quantity=cart_item.quantity,
            original_price=product.price 
        )
        db.add(new_item)

    db.commit()

    return {"success": True}



@router.delete("/delete-cart")
def delete_cart(
    user_id: int | None = None,
    session_id: str | None = None,
    db: Session = Depends(get_db)
):


    if user_id is None and session_id is None:
        raise HTTPException(
            status_code=400,
            detail="Missing user_id or session_id"
        )

    if user_id is not None and session_id is not None:
        raise HTTPException(
            status_code=400,
            detail="Provide only user_id OR session_id"
        )


    if user_id is not None:
        cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    else:
        cart = db.query(Cart).filter(Cart.session_id == session_id).first()

    if not cart:
        return {"info": "Cart not found"}


    db.delete(cart)
    db.commit()

    return {"success": True}
