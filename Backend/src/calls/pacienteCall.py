from ..models.paciente import Paciente
from ..models.usuario import Usuario
from src import db

class PacienteCalls():
    def get_paciente():
        paciente = Paciente.query.all()
        paciente = sorted(Paciente.query.all(), key=lambda pa: pa.cedula, reverse=False) 
        return paciente
    
    def get_paciente_cedula(cedula):
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
                                 correo=paciente.correo,
                                 cargo_id=paciente.cargo_id,
                                 dependencia_id=paciente.dependencia_id,
                                 municipio_id=paciente.municipio_id,
                                 tipo_paciente_id=paciente.tipo_paciente_id,
                                 usuario_id=paciente.usuario_id)
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
            pacienteBD.telefono=paciente.telefono,
            pacienteBD.correo=paciente.correo,
            pacienteBD.cargo_id = paciente.cargo_id
            pacienteBD.dependencia_id = paciente.dependencia_id
            pacienteBD.municipio_id = paciente.municipio_id
            pacienteBD.tipo_paciente_id = paciente.tipo_paciente_id
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
        
    def borrar_paciente_sin_consultar(pacienteBD):
        if pacienteBD is not None:
            db.session.delete(pacienteBD)
            db.session.commit()
            return True
        else:
            return False
        
    def crear_obj_paciente(datos_completos):
        paciente = Paciente(cedula=datos_completos['cedula'],
                        nombre=datos_completos['nombre'],
                        apellido=datos_completos['apellido'],
                        institucion_laboral=datos_completos['institucion_laboral'],
                        fecha_nacimiento=datos_completos['fecha_nacimiento'],
                        direccion=datos_completos['direccion'],
                        telefono=datos_completos['telefono'],
                        correo=datos_completos['correo'],
                        cargo_id=datos_completos['cargo_id'],
                        dependencia_id=datos_completos['dependencia_id'],
                        municipio_id=datos_completos['municipio_id'],
                        tipo_paciente_id=datos_completos['tipo_paciente_id'],
                        usuario_id=datos_completos['usuario_id'])
        return paciente
        
    # def usuario_por_nombre(usuario):
    #     return Usuario.query.filter_by(usuario = usuario).first()
 
    def get_paciente_usuario(usuario):
        paciente = Paciente.query.join(Usuario, Usuario.id == Paciente.usuario_id)\
                          .filter(Usuario.usuario == usuario).first()
        return paciente