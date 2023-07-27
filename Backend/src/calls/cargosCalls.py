from ..models.cargo import Cargo
from src import db

class CargosCalls():
    def get_cargos():
        cargos = Cargo.query.all()
        return cargos