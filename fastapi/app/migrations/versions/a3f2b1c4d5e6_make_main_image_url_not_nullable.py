"""make main_image_url not nullable

Revision ID: a3f2b1c4d5e6
Revises: e1ce34463472
Create Date: 2026-03-20 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a3f2b1c4d5e6'
down_revision: Union[str, Sequence[str], None] = 'e1ce34463472'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column('articles', 'main_image_url',
                    existing_type=sa.String(length=255),
                    nullable=False)


def downgrade() -> None:
    op.alter_column('articles', 'main_image_url',
                    existing_type=sa.String(length=255),
                    nullable=True)
