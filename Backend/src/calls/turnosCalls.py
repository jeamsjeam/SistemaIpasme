from ..models.turno import Turno
from src import db

class TurnosCalls():
    def get_turnos():
        turnos = Turno.query.all()
        return turnos