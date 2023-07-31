from ..models.municipio import Municipio
from src import db

class MunicipiosCalls():
    def get_municipios():
        municipio = sorted(Municipio.query.all(), key=lambda rol: rol.nombre)
        return municipio
    
    def get_municipio_id(id):
        municipio = Municipio.query.get(id)
        return municipio