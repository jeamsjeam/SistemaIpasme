from ..models.genero import Genero
from src import db

class GenerosCalls():
    def get_generos():
        generos = sorted(Genero.query.all(), key=lambda x: x.nombre)
        return generos