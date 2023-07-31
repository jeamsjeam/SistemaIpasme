from src import app
from flask_marshmallow import Marshmallow
from ..models.municipio  import Municipio

ma = Marshmallow(app)

class CargoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Municipio
        load_instance = True

municipio_schema = CargoSchema()
municipios_schema = CargoSchema(many=True)