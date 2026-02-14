"""creating user, address, cart and order table

Revision ID: d42c10aade5c
Revises: 
Create Date: 2026-02-13 17:50:24.443526

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd42c10aade5c'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ---------------------
    # USERS TABLE
    # ---------------------
    op.create_table(
        "users",
        sa.Column("user_id", sa.Integer(), primary_key=True),
        sa.Column("username", sa.String(length=100), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False, unique=True),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("is_admin", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
    )

    # ---------------------
    # CART TABLE
    # ---------------------
    op.create_table(
        "cart",
        sa.Column("cart_id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False),
    )

    # ---------------------
    # ADDRESS TABLE
    # ---------------------
    op.create_table(
        "address",
        sa.Column("address_id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False),
        sa.Column("country", sa.String(length=100), nullable=False),
        sa.Column("state", sa.String(length=100), nullable=False),
        sa.Column("city", sa.String(length=100), nullable=False),
        sa.Column("address", sa.String(length=255), nullable=False),
    )

    # ---------------------
    # ORDERS TABLE
    # ---------------------
    op.create_table(
        "orders",
        sa.Column("order_id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False),
        sa.Column("total_price", sa.Float(), nullable=False),
        sa.Column("status", sa.String(length=50), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("orders")
    op.drop_table("address")
    op.drop_table("cart")
    op.drop_table("users")