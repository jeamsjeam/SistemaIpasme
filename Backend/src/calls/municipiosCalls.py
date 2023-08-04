from ..models.municipio import Municipio
from src import db

class MunicipiosCalls():
    def get_municipios():
        municipio = sorted(Municipio.query.all(), key=lambda x: x.nombre)
        return municipio
    
    def get_municipio_id(id):
        municipio = Municipio.query.get(id)
        return municipio
    
    def get_municipios_estado(estadoId):
        municipios = Municipio.query.filter_by(estado_id = estadoId)
        return municipios