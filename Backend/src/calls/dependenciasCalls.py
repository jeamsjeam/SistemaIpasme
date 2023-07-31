from ..models.dependencia import Dependencia
from src import db

class DependenciasCalls():
    def get_dependencias():
        dependencias = sorted(Dependencia.query.all(), key=lambda rol: rol.nombre)
        return dependencias