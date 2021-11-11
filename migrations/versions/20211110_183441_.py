"""empty message

Revision ID: e1e0d7f2c7e0
Revises: e0e9f7127b3d
Create Date: 2021-11-10 18:34:41.820311

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e1e0d7f2c7e0'
down_revision = 'e0e9f7127b3d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('online', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'online')
    # ### end Alembic commands ###
