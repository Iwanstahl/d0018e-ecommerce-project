"""Add comments to rating

Revision ID: 932ab098c042
Revises: 741d924dd3fe
Create Date: 2026-02-23 17:45:42.778516

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '932ab098c042'
down_revision: Union[str, Sequence[str], None] = '741d924dd3fe'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "rating",
        sa.Column("comment", sa.Text(), nullable=True)
    )


def downgrade() -> None:
    op.drop_column("rating", "comment")