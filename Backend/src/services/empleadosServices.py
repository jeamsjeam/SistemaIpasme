from ..calls.empleadosCalls import EmpleadosCalls
from ..models.empleado import Empleado

class EmpleadosServices:
    def get():
        return EmpleadosCalls.get_empleados()
    
    def buscar(cedula):
        return EmpleadosCalls.get_empleado_cedula(cedula)

    def entrada(empleado_cedula, fecha):
        respuesta = ''
        return respuesta

    def crear(json):
        empleado = deserealizarJson(json)
        repetido = EmpleadosCalls.get_empleado_cedula(empleado.cedula)
        if repetido is None:
            done = EmpleadosCalls.crear_empleado(empleado)
            if done is not None:
                return '00|OK'
            else:
                return '01|Problemas al registrar empleado'
        else:
            return '02|Empleado repetido'
        
    def modificar(json):
        empleado = deserealizarJson(json)
        return EmpleadosCalls.modificar_empleado(empleado)

    def borrar(id):
        return EmpleadosCalls.borrar_empleado(id)
    
def deserealizarJson(json):
    empleado = Empleado(cedula= json['cedula'],
                            nombre= json['nombre'],
                            apellido= json['apellido'],
                            fecha_nacimiento= json['fecha_nacimiento'],
                            direccion= json['direccion'],
                            telefono= json['telefono'],
                            especialidad_id= json['especialidad_id'],
                            cargo_id= json['cargo_id'],
                            dependencia_id= json['dependencia_id'],
                            turno_id= json['turno_id'],
                            genero_id= json['genero_id'])
    return empleado