from ..models.estado_cita import EstadoCita
from src import db

class EstadoCitasCalls():
    def get_estados_citas():
        retorno = sorted(EstadoCita.query.all(), key=lambda x: x.id)
        return retorno