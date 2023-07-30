from ..models.rol import Rol
from src import db

class RolesCalls():
    def get_roles():
        roles = Rol.query.all()
        return roles

    def permite_crear(id):
        rol = Rol.query.get(id)
        if rol.nombre.lower().find('administrador') != -1:
            return True
        else :
            return False
    
    def get_rol_id(id):
        rol = Rol.query.get(id)
        return rol
