from ..models.dependencia import Dependencia
from src import db

class DependenciasCalls():
    def get_dependencias():
        dependencias = Dependencia.query.all()
        return dependencias