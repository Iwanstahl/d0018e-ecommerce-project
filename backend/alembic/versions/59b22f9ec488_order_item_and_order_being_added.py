"""order_item and order being added

Revision ID: 59b22f9ec488
Revises: 990fd166ba0e
Create Date: 2026-02-13 18:01:21.910061

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '59b22f9ec488'
down_revision: Union[str, Sequence[str], None] = '990fd166ba0e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "order_item",
        sa.Column("order_item_id", sa.Integer(), primary_key=True),
        sa.Column(
            "order_id",
            sa.Integer(),
            sa.ForeignKey("orders.order_id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "product_id",
            sa.Integer(),
            sa.ForeignKey("product.product_id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("quantity", sa.Integer(), nullable=False),
    )

def downgrade() -> None:
    op.drop_table("order_item")
