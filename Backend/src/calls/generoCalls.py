from ..models.genero import Genero
from src import db

class GenerosCalls():
    def get_generos():
        generos = Genero.query.all()
        return generos