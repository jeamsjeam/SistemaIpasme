from src import app
from flask_marshmallow import Marshmallow
from ..models.municipio  import Municipio

ma = Marshmallow(app)

class MunicipioSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Municipio
        load_instance = True

municipio_schema = MunicipioSchema()
municipios_schema = MunicipioSchema(many=True)