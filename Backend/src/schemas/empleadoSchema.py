from src import app
from flask_marshmallow import Marshmallow
from ..models.empleado  import Empleado

ma = Marshmallow(app)

class EmpleadoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Empleado
        load_instance = True

empleado_schema = EmpleadoSchema()
empleados_schema = EmpleadoSchema(many=True)