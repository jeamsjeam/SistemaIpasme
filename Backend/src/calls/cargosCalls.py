from ..models.cargo import Cargo
from src import db

class CargosCalls():
    def get_cargos():
        cargos = sorted(Cargo.query.all(), key=lambda rol: rol.nombre)
        return cargos
    
    def get_cargo_id(id):
        cargo = Cargo.query.get(id)
        return cargo