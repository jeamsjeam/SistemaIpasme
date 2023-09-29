from src import app
from flask_marshmallow import Marshmallow
from ..models.cita  import Cita

ma = Marshmallow(app)

class CitaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Cita
        #load_instance = True
    id = ma.auto_field()
    nota = ma.auto_field()
    fecha = ma.auto_field()
    empleado = ma.Nested('EmpleadoSchema')
    paciente = ma.Nested('PacienteSchema')
    estado_cita = ma.Nested('EstadoCitaSchema')

cita_schema = CitaSchema()
citas_schema = CitaSchema(many=True)