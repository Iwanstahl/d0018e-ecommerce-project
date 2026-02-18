from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    DateTime,
    Numeric,
    Text
)
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.sql import func
import decimal

Base = declarative_base()


# =========================
# USER
# =========================
class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships
    addresses = relationship("Address", back_populates="user", cascade="all, delete")
    cart = relationship("Cart", back_populates="user", uselist=False, cascade="all, delete")
    orders = relationship("Order", back_populates="user", cascade="all, delete")


# =========================
# ADDRESS
# =========================
class Address(Base):
    __tablename__ = "address"

    address_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
    country = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    city = Column(String(100), nullable=False)
    address = Column(String(255), nullable=False)

    user = relationship("User", back_populates="addresses")


# =========================
# CART
# =========================
class Cart(Base):
    __tablename__ = "cart"

    cart_id = Column(Integer, primary_key=True)

    # Logged-in user (optional)
    user_id = Column(
        Integer,
        ForeignKey("users.user_id", ondelete="CASCADE"),
        nullable=True,          # ✅ must be nullable now
        unique=True
    )

    # Guest session (optional)
    session_id = Column(
        String(255),            # ✅ MySQL requires length
        nullable=True,
        unique=True             # prevents duplicate carts per session
    )

    expires_at = Column(DateTime, nullable=True)

    cart_price = Column(
        Numeric(10, 2),
        nullable=False,
        default=decimal.Decimal("0.00")
    )

    # Relationships
    user = relationship(
        "User",
        back_populates="cart",
        uselist=False
    )

    items = relationship(
        "CartItem",
        back_populates="cart",
        cascade="all, delete-orphan"   # 🔥 better than "delete"
    )
# =========================
# CART ITEM
# =========================
class CartItem(Base):
    __tablename__ = "cart_item"

    cart_item_id = Column(Integer, primary_key=True)
    cart_id = Column(Integer, ForeignKey("cart.cart_id", ondelete="CASCADE"))
    product_id = Column(Integer, ForeignKey("product.product_id", ondelete="CASCADE"))
    quantity = Column(Integer, nullable=False)
    original_price = Column(Numeric(10, 2), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    cart = relationship("Cart", back_populates="items")
    product = relationship("Product")


# =========================
# CATEGORY
# =========================
class Category(Base):
    __tablename__ = "category"

    category_id = Column(Integer, primary_key=True)
    category_name = Column(String(100), unique=True, nullable=False)

    products = relationship("Product", back_populates="category")


# =========================
# PRODUCT
# =========================
class Product(Base):
    __tablename__ = "product"

    product_id = Column(Integer, primary_key=True)

    category_id = Column(
        Integer,
        ForeignKey("category.category_id", ondelete="SET NULL"),
        nullable=True
    )

    name = Column(String(255), nullable=False)

    price = Column(
        Numeric(10, 2),  
        nullable=False
    )

    description = Column(Text, nullable=True)

    image = Column(String(500), nullable=True)  


    # Relationships
    category = relationship("Category", back_populates="products")

    inventory = relationship(
        "Inventory",
        back_populates="product",
        uselist=False,      
        cascade="all, delete"
    )

# =========================
# INVENTORY
# =========================
class Inventory(Base):
    __tablename__ = "inventory"

    product_id = Column(Integer, ForeignKey("product.product_id", ondelete="CASCADE"), primary_key=True)
    stock = Column(Integer, nullable=False, default=0)

    product = relationship("Product", back_populates="inventory")


# =========================
# ORDER
# =========================
class Order(Base):
    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
    total_price = Column(Numeric(10, 2), nullable=False)
    status = Column(String(50), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete")


# =========================
# ORDER ITEM
# =========================
class OrderItem(Base):
    __tablename__ = "order_item"

    order_item_id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.order_id", ondelete="CASCADE"))
    product_id = Column(Integer, ForeignKey("product.product_id", ondelete="CASCADE"))
    quantity = Column(Integer, nullable=False)

    order = relationship("Order", back_populates="items")
    product = relationship("Product")
