from src import app
from flask_marshmallow import Marshmallow
from ..models.estado  import Estado

ma = Marshmallow(app)

class EstadoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Estado
        load_instance = True

estado_schema = EstadoSchema()
estados_schema = EstadoSchema(many=True)