from src import app
from flask_marshmallow import Marshmallow
from ..models.turno  import Turno

ma = Marshmallow(app)

class TurnoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Turno
        load_instance = True

turno_schema = TurnoSchema()
turnos_schema = TurnoSchema(many=True)