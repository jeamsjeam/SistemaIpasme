from ..models.estado import Estado
from src import db

class EstadosCalls():
    def get_estados():
        estados = sorted(Estado.query.all(), key=lambda x: x.nombre)
        return estados
    
    def get_estado_id(id):
        estado = Estado.query.get(id)
        return estado