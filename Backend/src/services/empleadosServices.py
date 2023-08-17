from ..calls.empleadosCalls import EmpleadosCalls
from ..models.empleado import Empleado
from ..schemas.empleadoSchema import empleado_schema,empleados_schema
from ..schemas.estadoEmpleadoSchema import estados_empleados_schema, estado_empleado_schema

class EmpleadosServices:
    def get():
        empleados = EmpleadosCalls.get_empleados()
        return empleados_schema.dump(empleados)
    
    def buscar(cedula):
        empleado = EmpleadosCalls.get_empleado_cedula(cedula)
        return empleado_schema.dump(empleado)

    def entrada(empleado_cedula, fecha):
        respuesta = ''
        return respuesta

    def guardar(json):
        empleado = deserealizarJson(json)
        repetido = EmpleadosCalls.get_empleado_cedula(empleado.cedula)
        if repetido is None:
            done = EmpleadosCalls.crear_empleado(empleado)
            if done is not None:
                return '00|OK'
            else:
                return '01|Problemas al registrar empleado'
        else:
            done = EmpleadosCalls.modificar_empleado(empleado)
            if done is not None:
                return '00|OK'
            else:
                return '01|Problemas al registrar empleado'

    def borrar(id):
        return EmpleadosCalls.borrar_empleado(id)
    
    def get_empleados_especialidad(id):
        empleadosConsulta = EmpleadosCalls.get_empleados()
        empleados = empleados_schema.dump(empleadosConsulta)
        retorno = []
        if len(empleados) > 0:
            for empleado in empleados:
                if any(especialidad['especialidad'] == empleado['especialidad']['nombre'] for especialidad in retorno):
                    for item in retorno:
                        if item['especialidad'] == empleado['especialidad']['nombre']:
                            agregar = infoBasica(empleado)
                            item['trabajadores'].append(agregar)
                else :
                    nuevo = { 'especialidad' : empleado['especialidad']['nombre'], 'trabajadores' : []}
                    agregar = infoBasica(empleado)
                    nuevo['trabajadores'].append(agregar)
                    retorno.append(nuevo)
            return retorno
        return []
    
def deserealizarJson(json):
    empleado = Empleado(cedula= int(json['cedula']),
                            nombre= json['nombre'],
                            apellido= json['apellido'],
                            fecha_nacimiento= json['fecha_nacimiento'],
                            direccion= json['direccion'],
                            telefono= json['telefono'],
                            especialidad_id= int(json['especialidades']),
                            cargo_id= int(json['cargos']),
                            dependencia_id= int(json['dependencias']),
                            turno_id= int(json['turnos']),
                            genero_id= int(json['generos']),
                            estado_empleado_id= int(json['estados_empleados']))
    return empleado

def infoBasica(empleado):
    info = {
        'cedula' : empleado['cedula'],
        'nombre' :  empleado['nombre'] + " " +  empleado['apellido'],
        'cargo' :  empleado['cargo']['nombre']
    }
    return info