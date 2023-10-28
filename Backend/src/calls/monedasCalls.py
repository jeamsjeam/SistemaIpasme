from ..models.moneda import Moneda
from src import db

class MonedasCalls():
    def get_monedas():
        monedas = sorted(Moneda.query.all(), key=lambda x: x.nombre)
        return monedas
    
    def get_moneda_id(id):
        moneda = Moneda.query.get(id)
        return moneda