#place order
#see the list of orders for a user
#see the details of an order
#cancel an order

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models import Cart, CartItem, Order, OrderItem, Inventory, User
from oauth2 import get_current_user
from datetime import datetime, UTC

router = APIRouter(
    prefix="/orders",
    tags=["orders"]
)


@router.post("/checkout")
def checkout(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    cart = (
        db.query(Cart)
        .filter(Cart.user_id == current_user.user_id)
        .first()
    )

    if not cart:
        raise HTTPException(status_code=400, detail="Cart not found")

    cart_items = (
        db.query(CartItem)
        .options(joinedload(CartItem.product))
        .filter(CartItem.cart_id == cart.cart_id)
        .all()
    )

    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total_price = sum(
        item.quantity * item.original_price
        for item in cart_items
    )

    new_order = Order(
        user_id=current_user.user_id,
        total_price=total_price,
        status="Completed",
        created_at=datetime.now(UTC)
    )

    db.add(new_order)
    db.flush() 

    for item in cart_items:
        inventory = (
            db.query(Inventory)
            .filter(Inventory.product_id == item.product_id)
            .first()
        )

        if inventory.stock < item.quantity:
            raise HTTPException(status_code=400, detail="Not enough in stock!")

        inventory.stock -= item.quantity

        order_item = OrderItem(
            order_id=new_order.order_id,
            product_id=item.product_id,
            quantity=item.quantity
        )

        db.add(order_item)

    db.query(Cart).filter(
        Cart.cart_id == current_user.user_id
    ).delete()

    db.commit()

    return {
        "message": "Order created successfully!",
        "order_id": new_order.order_id
    }

@router.get("/my-orders")
def get_my_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    orders = (
        db.query(Order)
        .options(joinedload(Order.items).joinedload(OrderItem.product))
        .filter(Order.user_id == current_user.user_id)
        .order_by(Order.created_at.desc())
        .all()
    )

    return orders

