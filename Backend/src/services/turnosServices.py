from ..calls.turnosCalls import TurnosCalls
from ..models.turno import Turno

class TurnosServices:
    def get():
        return TurnosCalls.get_turnos()
    
    def buscar(id):
        return TurnosCalls.get_turno_id(id)
    
    def crear(json):
        turno = deserealizarJson(json)
        repetido = TurnosCalls.get_turno_nombre(turno.nombre)
        if repetido is None:
            done = TurnosCalls.crear_turno(turno)
            if done is not None:
                return '00|OK'
            else:
                return '01|Problemas al registrar turno'
        else:
            return '02|Turno repetido'
        
    def modificar(json):
        turno = deserealizarJson(json)
        return TurnosCalls.modificar_turno(turno)

    def borrar(id):
        return TurnosCalls.borrar_turno(id)

def deserealizarJson(json):
    turno = Turno(nombre=json['nombre'], 
                      hora_llegada=json['hora_llegada'], 
                      hora_salida=json['hora_salida'])
    if 'id' in json:
        turno.id = json['id']
    return turno