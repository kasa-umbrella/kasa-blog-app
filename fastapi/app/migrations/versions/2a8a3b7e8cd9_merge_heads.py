"""merge heads

Revision ID: 2a8a3b7e8cd9
Revises: 989ae1af7388, a3f2b1c4d5e6
Create Date: 2026-03-28 12:34:07.678263

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2a8a3b7e8cd9'
down_revision: Union[str, Sequence[str], None] = ('989ae1af7388', 'a3f2b1c4d5e6')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
