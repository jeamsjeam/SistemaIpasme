from src import app
from flask_marshmallow import Marshmallow
from ..models.especialidad  import Especialidad

ma = Marshmallow(app)

class EspecialidadSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Especialidad
        load_instance = True

especialidad_schema = EspecialidadSchema()
especialidades_schema = EspecialidadSchema(many=True)