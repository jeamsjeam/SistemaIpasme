from ..models.estado_empleado import EstadoEmpleado
from src import db

class EstadoEmpleadosCalls():
    def get_estados_empleados():
        retorno = sorted(EstadoEmpleado.query.all(), key=lambda x: x.id)
        return retorno