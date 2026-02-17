from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Product, Inventory, Cart, User, CartItem
from sqlalchemy.orm import joinedload
from schemas.cart import CartItemInput, CartProductResponse

router = APIRouter(
    prefix="/cart",
    tags=["cart"]
)




@router.get("/get-cart", response_model=list[CartProductResponse])
def get_cart(
    user_id: int,
    db: Session = Depends(get_db)
):
    
    user = (
        db.query(User)
        .options(joinedload(User.cart))
        .filter(User.user_id == user_id)
        .first()
    )

    if (user.cart == None):
        raise HTTPException(status_code=404, detail="Cart not found")


    cart = user.cart
    existing_item = (
        db.query(CartItem)\
        .options(joinedload(CartItem.product))
        .filter(
            CartItem.cart_id == cart.cart_id,
        )
        .all()
    )

    return existing_item
    

@router.post("/update-cart")
def update_cart(
    user_id: int,
    cart_item: CartItemInput,
    db: Session = Depends(get_db)
):


    product = (
        db.query(Product)
        .filter(Product.product_id == cart_item.product_id)
        .options(joinedload(Product.inventory))
        .first()
    )

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if not product.inventory:
        raise HTTPException(status_code=400, detail="No inventory found")

    user = (
        db.query(User)
        .options(joinedload(User.cart))
        .filter(User.user_id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

  
    if not user.cart:
        cart = Cart(user_id=user.user_id)
        db.add(cart)
        db.flush()  
    else:
        cart = user.cart


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
            quantity=cart_item.quantity
        )
        db.add(new_item)


    db.commit()

    return {"success": True}

@router.post("/delete-cart")
def delete_cart(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = (
        db.query(User)
        .options(joinedload(User.cart))
        .filter(User.user_id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.cart:
        return {"info": "User has no cart"}

    # Delete the cart
    db.delete(user.cart)
    db.commit()

    return {"success": True}
