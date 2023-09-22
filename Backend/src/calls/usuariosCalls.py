from ..models.usuario import Usuario
from src import db
import pdb

class UsuariosCalls():
    def get_usuarios():
        usuarios = Usuario.query.all()
        return usuarios

    def crear_usuario(usuario):
        usuarioNuevo = Usuario(usuario = usuario.usuario, 
                               clave = usuario.clave, 
                               nombre = usuario.nombre, 
                               rol_id=usuario.rol_id)
        db.session.add(usuarioNuevo)
        db.session.commit()
        db.session.refresh(usuarioNuevo)
        return usuarioNuevo

    def modificar_usuario(usuario):
        usuarioBD = Usuario.query.get(usuario.id)
        usuarioBD.usuario = usuario.usuario
        usuarioBD.clave = usuario.clave
        usuarioBD.nombre = usuario.nombre
        usuarioBD.rol_id = usuario.rol_id
        db.session.commit()
        db.session.refresh(usuarioBD)
        return usuarioBD

    def borrar_usuario(id):
        usuarioBD = Usuario.query.get(id)
        db.session.delete(usuarioBD)
        db.session.commit()
        return "Ok"

    def autenticar_usuario(usuario, clave):
        usuarioBD = Usuario.query.filter_by(usuario = usuario).first()
        if usuarioBD is None:
            return "02|Usuario incorrecto"
        else : 
            if usuarioBD.clave == clave:
                #return "00|" + usuarioBD.nombre
                return "00|OK"
            else :
                return "01|Usuario o Clave Incorrecta"
            
    def usuario_por_nombre(usuario):
        return Usuario.query.filter_by(usuario = usuario).first()
    
    def crear_obj_usuario(datos_usuario):
        usuario = Usuario(usuario = datos_usuario["usuario"], 
                               clave = datos_usuario["clave"], 
                               nombre = datos_usuario["nombre"], 
                               rol_id=datos_usuario["rol_id"])
        return usuario