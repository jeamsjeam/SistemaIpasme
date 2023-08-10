from src import app
from flask_marshmallow import Marshmallow
from ..models.empleado  import Empleado

ma = Marshmallow(app)

class EmpleadoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Empleado
        # load_instance = True
    cedula = ma.auto_field()
    nombre = ma.auto_field()
    apellido = ma.auto_field()
    fecha_nacimiento = ma.auto_field()
    direccion = ma.auto_field()
    telefono = ma.auto_field()
    especialidad = ma.Nested('EspecialidadSchema')
    cargo = ma.Nested('CargoSchema')
    dependencia = ma.Nested('DependenciaSchema')
    turno = ma.Nested('TurnoSchema')
    genero = ma.Nested('GeneroSchema')
    estado_empleado = ma.Nested('EstadoEmpleadoSchema')

empleado_schema = EmpleadoSchema()
empleados_schema = EmpleadoSchema(many=True)