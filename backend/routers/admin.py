from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User, Product, Category, Inventory
from schemas.product import AddProduct
from oauth2 import get_current_user

router = APIRouter(tags=['Admin'], prefix="/admin")


@router.post("/add-product")
def add_product(
    product_info: AddProduct,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # 🔒 Admin check
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")

    # 🧠 Basic validation
    if product_info.price <= 0:
        raise HTTPException(status_code=400, detail="Price must be positive")

    if product_info.stock < 0:
        raise HTTPException(status_code=400, detail="Stock cannot be negative")

    # 🏷 Check if category exists
    category = db.query(Category).filter(
        Category.category_name == product_info.category
    ).first()

    if category is None:
        category = Category(category_name=product_info.category)
        db.add(category)
        db.flush()

    # 🚫 Optional: prevent duplicate product names
    existing_product = db.query(Product).filter(
        Product.name == product_info.name
    ).first()

    if existing_product:
        raise HTTPException(status_code=400, detail="Product already exists")

    # 📦 Create product
    new_product = Product(
        name=product_info.name,
        price=product_info.price,
        image=product_info.image,
        category_id=category.category_id
    )

    db.add(new_product)
    db.flush()

    # 📊 Create inventory
    new_inventory = Inventory(
        stock=product_info.stock,
        product_id=new_product.product_id
    )

    db.add(new_inventory)

    db.commit()
    db.refresh(new_product)

    return new_product
