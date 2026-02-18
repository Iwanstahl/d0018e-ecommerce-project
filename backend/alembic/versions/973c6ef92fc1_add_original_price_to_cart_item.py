"""add original_price to cart_item

Revision ID: 973c6ef92fc1
Revises: 80244a5373de
Create Date: 2026-02-18 16:13:23.079043

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '973c6ef92fc1'
down_revision: Union[str, Sequence[str], None] = '80244a5373de'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Lägg till kolumn med temporär default (för befintliga rader)
    op.add_column(
        "cart_item",
        sa.Column(
            "original_price",
            sa.Numeric(10, 2),
            nullable=False,
            server_default="0.00"
        )
    )

    # Ta bort default efter att kolumnen skapats
    op.alter_column(
        "cart_item",
        "original_price",
        server_default=None
    )

def downgrade() -> None:
    op.drop_column("cart_item", "original_price")
