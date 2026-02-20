from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models import User, Product, Category, Inventory
from schemas.product import AddProductInput, UpdateProductInput, ProductResponseAdmin
from oauth2 import get_current_user

router = APIRouter(tags=['Admin'], prefix="/admin")


@router.post("/add-product")
def add_product(
    product_info: AddProductInput,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if not current_user.is_admin:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    if product_info.price <= 0:
        raise HTTPException(status_code=400, detail="Price must be positive")
    
    if product_info.stock is None:
        product_info.stock = 0


    if product_info.stock < 0:
        raise HTTPException(status_code=400, detail="Stock cannot be negative")
    
    

    category = db.query(Category).filter(
        Category.category_name == product_info.category
    ).first()

    if category is None:
        category = Category(category_name=product_info.category)
        db.add(category)
        db.flush()


    existing_product = db.query(Product).filter(
        Product.name == product_info.name
    ).first()

    if existing_product:
        raise HTTPException(status_code=400, detail="Product already exists")


    new_product = Product(
        name=product_info.name,
        price=product_info.price,
        image=product_info.image,
        category_id=category.category_id
    )

    db.add(new_product)
    db.flush()

    new_inventory = Inventory(
        stock=product_info.stock,
        product_id=new_product.product_id
    )

    db.add(new_inventory)

    db.commit()
    db.refresh(new_product)

    return new_product



@router.get("/products", response_model=list[ProductResponseAdmin])
def get_products(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    products = (
    db.query(Product)
    .options(
        joinedload(Product.category),
        joinedload(Product.inventory)
    )
    .all()
)    
    return products




@router.put("/update-product/{product_id}")
def update_product(
    product_id: int,
    product_info: UpdateProductInput,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Optional: Only allow admins
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")

    product = db.query(Product).filter(
        Product.product_id == product_id
    ).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Update basic fields
    product.name = product_info.name
    product.price = product_info.price
    product.image = product_info.image
    product.description = product_info.description

    # Update category (create if not exists)
    category = db.query(Category).filter(
        Category.category_name == product_info.category
    ).first()

    if category is None:
        category = Category(category_name=product_info.category)
        db.add(category)
        db.flush()

    product.category_id = category.category_id

    # Update inventory
    inventory = db.query(Inventory).filter(
        Inventory.product_id == product.product_id
    ).first()

    if inventory:
        inventory.stock = product_info.stock
    else:
        new_inventory = Inventory(
            product_id=product.product_id,
            stock=product_info.stock
        )
        db.add(new_inventory)

    db.commit()
    db.refresh(product)

    return product


@router.delete("/delete-product")
def update_product(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    pass


    
