"""add unit price to order_item

Revision ID: 3179c8f79eee
Revises: 932ab098c042
Create Date: 2026-03-04 22:59:10.839798

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3179c8f79eee'
down_revision: Union[str, Sequence[str], None] = '932ab098c042'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade():
    op.add_column(
        "order_item",
        sa.Column("unit_price", sa.Numeric(10, 2), nullable=False)
    )


def downgrade():
    op.drop_column("order_item", "unit_price")
