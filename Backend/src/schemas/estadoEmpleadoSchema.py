from src import app
from flask_marshmallow import Marshmallow
from ..models.estado_empleado  import EstadoEmpleado

ma = Marshmallow(app)

class EstadoEmpleadoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = EstadoEmpleado
        load_instance = True

estado_empleado_schema = EstadoEmpleadoSchema()
estados_empleados_schema = EstadoEmpleadoSchema(many=True)