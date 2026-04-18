"""create article_comments table

Revision ID: d1e2f3a4b5c6
Revises: c93e1f2a4b7d, b4c9d2e1f3a0
Create Date: 2026-04-18 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd1e2f3a4b5c6'
down_revision: Union[str, Sequence[str], None] = ('c93e1f2a4b7d', 'b4c9d2e1f3a0')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'article_comments',
        sa.Column('id', sa.String(36), primary_key=True, index=True),
        sa.Column('article_id', sa.String(36), sa.ForeignKey('articles.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('commenter_name', sa.String(20), nullable=False),
        sa.Column('content', sa.String(50), nullable=False),
        sa.Column('ip_address', sa.String(45), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table('article_comments')
