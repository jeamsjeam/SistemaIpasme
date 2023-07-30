from ..models.rol import Rol
from src import db

class RolesCalls():
    def mostrar_roles():
        roles = sorted(Rol.query.all(), key=lambda rol: rol.nombre)
        return roles

    def permite_crear(id):
        rol = Rol.query.get(id)
        if rol.nombre.lower().find('administrador') != -1:
            return True
        else :
            return False
    
    def mostrar_rol_id(id):
        rol = Rol.query.get(id)
        return rol

