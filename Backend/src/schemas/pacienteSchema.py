from src import app
from flask_marshmallow import Marshmallow
from ..models.paciente  import Paciente

ma = Marshmallow(app)

class PacienteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Paciente
        load_instance = True

paciente_schema = PacienteSchema()
Pacientes_schema = PacienteSchema(many=True)