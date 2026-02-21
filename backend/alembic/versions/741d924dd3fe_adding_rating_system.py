"""adding rating system

Revision ID: 741d924dd3fe
Revises: 973c6ef92fc1
Create Date: 2026-02-21 12:57:28.098683

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '741d924dd3fe'
down_revision: Union[str, Sequence[str], None] = '973c6ef92fc1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "rating",
        sa.Column("rating_id", sa.Integer(), primary_key=True),

        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey("users.user_id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "product_id",
            sa.Integer(),
            sa.ForeignKey("product.product_id", ondelete="CASCADE"),
            nullable=False,
        ),

        sa.Column("score", sa.Integer(), nullable=False),

        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=True),

        sa.UniqueConstraint("user_id", "product_id", name="unique_user_product_rating"),
        sa.CheckConstraint("score >= 1 AND score <= 5", name="score_between_1_5"),
    )



def downgrade() -> None:
    op.drop_table("rating")