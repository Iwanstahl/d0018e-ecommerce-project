"""adding cart_item, product, inventory, category

Revision ID: 990fd166ba0e
Revises: d42c10aade5c
Create Date: 2026-02-13 17:57:19.022367

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '990fd166ba0e'
down_revision: Union[str, Sequence[str], None] = 'd42c10aade5c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None



def upgrade() -> None:
    # ---------------------
    # CATEGORY TABLE
    # ---------------------
    op.create_table(
        "category",
        sa.Column("category_id", sa.Integer(), primary_key=True),
        sa.Column("category_name", sa.String(length=100), nullable=False, unique=True),
    )

    # ---------------------
    # PRODUCT TABLE
    # ---------------------
    op.create_table(
        "product",
        sa.Column("product_id", sa.Integer(), primary_key=True),
        sa.Column("category_id", sa.Integer(), sa.ForeignKey("category.category_id", ondelete="SET NULL")),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("price", sa.Numeric(10, 2), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
    )

    # ---------------------
    # INVENTORY TABLE
    # ---------------------
    op.create_table(
        "inventory",
        sa.Column("product_id", sa.Integer(), sa.ForeignKey("product.product_id", ondelete="CASCADE"), primary_key=True),
        sa.Column("stock", sa.Integer(), nullable=False, server_default="0"),
    )

    # ---------------------
    # CART ITEM TABLE
    # ---------------------
    op.create_table(
        "cart_item",
        sa.Column("cart_item_id", sa.Integer(), primary_key=True),
        sa.Column("cart_id", sa.Integer(), sa.ForeignKey("cart.cart_id", ondelete="CASCADE"), nullable=False),
        sa.Column("product_id", sa.Integer(), sa.ForeignKey("product.product_id", ondelete="CASCADE"), nullable=False),
        sa.Column("quantity", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
    )



def downgrade() -> None:
    op.drop_table("cart_item")
    op.drop_table("inventory")
    op.drop_table("product")
    op.drop_table("category")
