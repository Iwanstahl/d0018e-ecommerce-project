"""Cart supporting session

Revision ID: 80244a5373de
Revises: b8debbad8240
Create Date: 2026-02-17 19:18:05.920064

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '80244a5373de'
down_revision: Union[str, Sequence[str], None] = 'b8debbad8240'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Make user_id nullable
    op.alter_column(
        "cart",              # table name
        "user_id",
        existing_type=sa.Integer(),
        nullable=True
    )

op.add_column(
    "cart",
    sa.Column("session_id", sa.String(255), nullable=True)
)


def downgrade():
    # Remove session_id
    op.drop_column("cart", "session_id")

    # Make user_id NOT nullable again
    op.alter_column(
        "cart",
        "user_id",
        existing_type=sa.Integer(),
        nullable=False
    )