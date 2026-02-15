"""product(1)-(2)inventory, user(1)-(1)cart

Revision ID: 8a8542967bae
Revises: cffedd8b2941
Create Date: 2026-02-15 19:33:23.362259

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8a8542967bae'
down_revision: Union[str, Sequence[str], None] = 'cffedd8b2941'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Make user → cart one-to-one
    op.create_unique_constraint(
        "uq_cart_user_id",   # constraint name
        "cart",              # table
        ["user_id"]          # column
    )

    # Make product → inventory one-to-one
    op.create_unique_constraint(
        "uq_inventory_product_id",
        "inventory",
        ["product_id"]
    )


def downgrade() -> None:
    op.drop_constraint(
        "uq_inventory_product_id",
        "inventory",
        type_="unique"
    )

    op.drop_constraint(
        "uq_cart_user_id",
        "cart",
        type_="unique"
    )