from ..models.empleado import Empleado
from ..models.cargo import Cargo
from src import db
from sqlalchemy import and_

class EmpleadosCalls():
    def get_empleados():
        empleados = Empleado.query.all()
        return empleados
    
    def get_empleado_cedula(cedula):
        empleado = Empleado.query.get(cedula)
        return empleado

    def crear_empleado(empleado):
        empleadoNuevo = Empleado(cedula=empleado.cedula,
                                 nombre=empleado.nombre,
                                 apellido=empleado.apellido,
                                 fecha_nacimiento=empleado.fecha_nacimiento,
                                 direccion=empleado.direccion,
                                 telefono=empleado.telefono,
                                 especialidad_id=empleado.especialidad_id,
                                 cargo_id=empleado.cargo_id,
                                 dependencia_id=empleado.dependencia_id,
                                 turno_id=empleado.turno_id,
                                 genero_id=empleado.genero_id,
                                 estado_empleado_id = empleado.estado_empleado_id)
        db.session.add(empleadoNuevo)
        db.session.commit()
        db.session.refresh(empleadoNuevo)
        return empleadoNuevo

    def modificar_empleado(empleado):
        empleadoBD = Empleado.query.get(empleado.cedula)
        if empleadoBD is not None:
            empleadoBD.cedula=empleado.cedula
            empleadoBD.nombre=empleado.nombre
            empleadoBD.apellido=empleado.apellido
            empleadoBD.fecha_nacimiento=empleado.fecha_nacimiento
            empleadoBD.direccion=empleado.direccion
            empleadoBD.telefono=empleado.telefono
            empleadoBD.especialidad_id=empleado.especialidad_id
            empleadoBD.cargo_id=empleado.cargo_id
            empleadoBD.dependencia_id=empleado.dependencia_id
            empleadoBD.turno_id=empleado.turno_id
            empleadoBD.genero_id=empleado.genero_id
            empleadoBD.estado_empleado_id=empleado.estado_empleado_id
            db.session.commit()
            db.session.refresh(empleadoBD)
            return empleadoBD
        else:
            return None

    def borrar_empleado(cedula):
        empleadoBD = Empleado.query.get(cedula)
        if empleadoBD is not None:
            for permisoBD in empleadoBD.permisos:
                db.session.delete(permisoBD)
            for asistenciaBD in empleadoBD.asistencias:
                db.session.delete(asistenciaBD)
            db.session.delete(empleadoBD)
            db.session.commit()
            return "00|Ok"
        else:
            return "01|Error"
        
    def get_medicos_especialidad(especialidad_id):
        medicos = Empleado.query.join(Cargo, Cargo.id == Empleado.cargo_id)\
                          .filter(and_(Cargo.nombre == 'Medico', Empleado.especialidad_id == especialidad_id))
        return medicos