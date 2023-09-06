from ..calls.asistenciasCalls import AsistenciasCalls
from ..calls.permisosCalls import PermisoCalls
from ..models.asistencia import Asistencia
from ..schemas.asistenciaSchema import asistencia_schema,asistencias_schema
from ..schemas.permisoSchema import permiso_schema,permisos_schema
from datetime import datetime, timedelta

class AsistenciasServices:
    def get_asistencias_empleado_mes(cedula, fecha):
        asistencias = AsistenciasCalls.get_asistencias_empleado_mes(cedula, fecha)
        return asistencias_schema.dump(asistencias)
    
    def get_asistencias_permisos_reporte(turnos_empleados, fecha):
        for turno in turnos_empleados:
            for empleado in turno['trabajadores']:
                # Se llenan las asistencias
                asistencias = AsistenciasCalls.get_asistencias_empleado_semana(empleado['cedula'], fecha)
                asistenciasJson = asistencias_schema.dump(asistencias)
                semana = formatearAsistencias(asistenciasJson)
                empleado['semana'] = semana
        return turnos_empleados

    def get_asistencias_empleado_semana(cedula, fecha):
        asistencias = AsistenciasCalls.get_asistencias_empleado_semana(cedula, fecha)
        return asistencias_schema.dump(asistencias)
    
def formatearAsistencias(asistencias):
    retorno = semanaBase()
    if len(asistencias) > 0:
        for asistencia in asistencias:
            fecha = asistencia['hora_llegada'].split('T')[0]
            date = datetime.strptime(fecha, "%Y-%m-%d")
            # Obtener el día de la semana (0 para lunes, 6 para domingo)
            diaSemana = date.weekday()
            retorno[diaSemana]['asistencia'] = True
    return retorno

def semanaBase():
    dias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo']
    retorno = []
    for i, dia in enumerate(dias):
        base = asistenciaBase()
        base['dia'] = dia
        base['numeroDia'] = i
        retorno.append(base)
    return retorno

def asistenciaBase():
    base = {
        'dia' : '',
        'asistencia' : None,
        'numeroDia' : -1
    }
    return base