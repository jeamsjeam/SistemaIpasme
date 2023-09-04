from ..models.tipo_reposo import TipoReposo
from src import db

class TipoReposoCalls():
    def get_tipoReposo():
        tipoReposos = TipoReposo.query.all()
        return tipoReposos
    
    def get_tipoReposo_id(id):
        tipoReposo = TipoReposo.query.get(id)
        return tipoReposo