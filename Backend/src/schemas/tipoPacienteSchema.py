from src import app
from flask_marshmallow import Marshmallow
from ..models.tipo_paciente  import TipoPaciente

ma = Marshmallow(app)

class TipoPacienteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TipoPaciente
        load_instance = True

tipo_paciente_schema = TipoPacienteSchema()
tipos_paciente_schema = TipoPacienteSchema(many=True)