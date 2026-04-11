"""make published_at not nullable with default now

Revision ID: c93e1f2a4b7d
Revises: b25bcd30efcc
Create Date: 2026-04-11 19:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c93e1f2a4b7d'
down_revision: Union[str, Sequence[str], None] = 'b25bcd30efcc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # NULLのpublished_atをcreated_atで埋める
    op.execute("UPDATE articles SET published_at = created_at WHERE published_at IS NULL")
    # NOT NULL制約を追加
    op.alter_column('articles', 'published_at',
                    existing_type=sa.DateTime(),
                    nullable=False)


def downgrade() -> None:
    op.alter_column('articles', 'published_at',
                    existing_type=sa.DateTime(),
                    nullable=True)
