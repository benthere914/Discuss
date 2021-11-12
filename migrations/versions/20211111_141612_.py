"""empty message

Revision ID: ddedc0d4597c
Revises: 44508509d676
Create Date: 2021-11-11 14:16:12.997043

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ddedc0d4597c'
down_revision = '44508509d676'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('servers_name_key', 'servers', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('servers_name_key', 'servers', ['name'])
    # ### end Alembic commands ###