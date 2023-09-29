from ..calls.citasCalls import CitasCalls
from ..models.cita import Cita
from datetime import datetime, timedelta
from ..schemas.citaSchema import cita_schema,citas_schema
import locale

class CitasServices:
    def agendar_cita(json):
        cita = deserealizarJsonUsuario(json)
        citasDelDia = CitasCalls.get_citas_dia_medico(cita.empleado_cedula, cita.fecha)
        if len(citasDelDia) < 8:
            cita.estado_cita_id = 1
            done = CitasCalls.crear_cita(cita)
            if done is not None:
                return '00|OK'
            else:
                return '01|Problemas al registrar cita'
        else:
            return '02|Este médico ha alcanzado su límite de pacientes para este día'
        
    def get_citas_paciente_mes(cedula, fecha):
        retorno = []

        citas = CitasCalls.get_citas_paciente_mes(cedula, fecha)
        citasJson = citas_schema.dump(citas)

        # Se buscan las fechas de la semana
        date = datetime.strptime(fecha, "%d/%m/%Y")
        inicioMes = datetime(date.year, date.month, 1)
        finMes = date.replace(day=28) + timedelta(days=4) 
        finMes = finMes - timedelta(days=finMes.day)

        retorno = mesBase(finMes)
        # Se llenan las citas
        if len(citasJson) > 0:
            for cita in citasJson:
                date = datetime.strptime(cita['fecha'].split('T')[0], "%Y-%m-%d")
                retorno[date.day - 1]['estado'] = cita['estado_cita']['nombre']
                retorno[date.day - 1]['nota'] = cita['nota']
        return retorno
    

def deserealizarJson(json):
    cita = Cita(nota=json['nota'], 
                      empleado_cedula=json['empleado_cedula'], 
                      paciente_cedula=json['paciente_cedula'],
                      fecha=json['fecha'],
                      estado_cita_id=int(json['estado_cita_id']))
    if 'id' in json:
        cita.id = int(json['id'])
    return cita

def deserealizarJsonUsuario(json):
    json['paciente_usuario']
    cita = Cita(nota=json['nota'], 
                      empleado_cedula=json['empleado_cedula'], 
                      paciente_cedula='',
                      fecha=json['fecha'],
                      estado_cita_id=0)
    if 'id' in json:
        cita.id = int(json['id'])
    return cita

def mesBase(fechaFin):
    configuracion_original = locale.getlocale()
    retorno = []
    fechaActual = fechaFin
    locale.setlocale(locale.LC_TIME, 'es_ES')
    for i in range(fechaFin.day):
        base = citaBase()
        base['numeroDia'] = fechaActual.day
        retorno.append(base)
        fechaActual = fechaActual - timedelta(days=1)
    locale.setlocale(locale.LC_TIME, configuracion_original)
    retorno.reverse()
    return retorno


def citaBase():
    base = {
        'nota' : '',
        'estado' : None,
        'numeroDia' : -1
    }
    return base
