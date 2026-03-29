"""create access_logs table

Revision ID: b4c9d2e1f3a0
Revises: 577e74b6aad3
Create Date: 2026-03-29 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b4c9d2e1f3a0'
down_revision: Union[str, Sequence[str], None] = '577e74b6aad3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'access_logs',
        sa.Column('id', sa.String(36), primary_key=True, index=True),
        sa.Column('article_id', sa.String(36), sa.ForeignKey('articles.id', ondelete='SET NULL'), nullable=True),
        sa.Column('ip_address', sa.String(45), nullable=False),
        sa.Column('user_agent', sa.String(512), nullable=True),
        sa.Column('referrer', sa.String(512), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table('access_logs')
