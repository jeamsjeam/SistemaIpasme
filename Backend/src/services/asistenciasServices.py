from ..calls.asistenciasCalls import AsistenciasCalls
from ..models.asistencia import Asistencia
from ..schemas.asistenciaSchema import asistencia_schema,asistencias_schema

class AsistenciasServices:
    def get_asistencias_empleado_mes(cedula, fecha):
        empleados = AsistenciasCalls.get_asistencias_empleado_mes(cedula, fecha)
        return asistencias_schema.dump(empleados)
