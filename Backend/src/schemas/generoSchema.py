from src import app
from flask_marshmallow import Marshmallow
from ..models.genero  import Genero

ma = Marshmallow(app)

class GeneroSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Genero
        load_instance = True

genero_schema = GeneroSchema()
generos_schema = GeneroSchema(many=True)