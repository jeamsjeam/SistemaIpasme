from ..models.paciente import Paciente
from src import db

class PacienteCalls():
    def mostrar_paciente():
        paciente = Paciente.query.all()
        return paciente
    
    def mostrar_paciente_cedula(cedula):
        paciente = Paciente.query.get(cedula)
        return paciente

    def crear_paciente(paciente):
        pacienteNuevo = Paciente(cedula=paciente.cedula,
                                 nombre=paciente.nombre,
                                 apellido=paciente.apellido,
                                 institucion_laboral=paciente.institucion_laboral,
                                 fecha_nacimiento=paciente.fecha_nacimiento,
                                 direccion=paciente.direccion,
                                 telefono=paciente.telefono,
                                 permiso_dias_extra=paciente.permiso_dias_extra,
                                 cargo_id=paciente.cargo_id,
                                 dependencia_id=paciente.dependencia_id,
                                 municipio_id=paciente.municipio_id)
        db.session.add(pacienteNuevo)
        db.session.commit()
        db.session.refresh(pacienteNuevo)
        return pacienteNuevo

    def modificar_paciente(paciente):
        pacienteBD = Paciente.query.get(paciente.cedula)
        if pacienteBD is not None:
            pacienteBD.nombre = paciente.nombre
            pacienteBD.apellido = paciente.apellido
            pacienteBD.institucion_laboral = paciente.institucion_laboral
            pacienteBD.fecha_nacimiento = paciente.fecha_nacimiento
            pacienteBD.direccion = paciente.direccion
            pacienteBD.permiso_dias_extra = paciente.permiso_dias_extra
            pacienteBD.cargo_id = paciente.cargo_id
            pacienteBD.dependencia_id = paciente.dependencia_id
            pacienteBD.municipio_id = paciente.municipio_id
            db.session.commit()
            db.session.refresh(pacienteBD)
            return pacienteBD
        else:
            return None

    def borrar_paciente(cedula):
        pacienteBD = Paciente.query.get(cedula)
        if pacienteBD is not None:
            db.session.delete(pacienteBD)
            db.session.commit()
            return "00|Ok"
        else:
            return "01|Error"
        
    # def usuario_por_nombre(usuario):
    #     return Usuario.query.filter_by(usuario = usuario).first()