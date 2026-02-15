"""modify cart

Revision ID: b8debbad8240
Revises: bf1e0f3cb9f5
Create Date: 2026-02-15 19:40:18.005984

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b8debbad8240'
down_revision: Union[str, Sequence[str], None] = 'bf1e0f3cb9f5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add expires_at column
    op.add_column(
        "cart",
        sa.Column("expires_at", sa.DateTime(), nullable=True)
    )

    # Add cart_price column (money = use Numeric, NOT Float)
    op.add_column(
        "cart",
        sa.Column(
            "cart_price",
            sa.Numeric(10, 2),
            nullable=False,
            server_default="0.00"
        )
    )


def downgrade() -> None:
    op.drop_column("cart", "cart_price")
    op.drop_column("cart", "expires_at")
