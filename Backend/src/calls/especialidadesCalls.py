from ..models.especialidad import Especialidad
from src import db

class EspecialidadesCalls():
    def get_especialidades():
        especialidades = Especialidad.query.all()
        return especialidades
    
    def get_especialidad_id(id):
        especialidad = Especialidad.query.get(id)
        return especialidad