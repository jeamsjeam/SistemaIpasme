from src import app
from flask_marshmallow import Marshmallow
from ..models.paciente  import Paciente

ma = Marshmallow(app)

class PacienteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Paciente
        #load_instance = True
    cedula = ma.auto_field()
    nombre = ma.auto_field()
    apellido = ma.auto_field()
    institucion_laboral = ma.auto_field()
    fecha_nacimiento = ma.auto_field()
    direccion = ma.auto_field()
    telefono = ma.auto_field()
    cargo = ma.Nested('CargoSchema')
    dependencia = ma.Nested('DependenciaSchema')
    municipio = ma.Nested('MunicipioSchema')

paciente_schema = PacienteSchema()
Pacientes_schema = PacienteSchema(many=True)