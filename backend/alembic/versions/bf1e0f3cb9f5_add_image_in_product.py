"""add image in product

Revision ID: bf1e0f3cb9f5
Revises: 8a8542967bae
Create Date: 2026-02-15 19:37:55.838643

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bf1e0f3cb9f5'
down_revision: Union[str, Sequence[str], None] = '8a8542967bae'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    op.add_column(
        "product",
        sa.Column("image", sa.String(length=500), nullable=True)
    )


def downgrade() -> None:
    op.drop_column("product", "image")
