from src import app
from flask_marshmallow import Marshmallow
from ..models.asistencia  import Asistencia

ma = Marshmallow(app)

class AsistenciaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Asistencia
        load_instance = True

asistencia_schema = AsistenciaSchema()
asistencias_schema = AsistenciaSchema(many=True)