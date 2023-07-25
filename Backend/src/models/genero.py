from src import db
from sqlalchemy.orm import relationship, backref

class Genero(db.Model):
    __tablename__ = 'genero'

    id = db.Column(db.BigInteger(), primary_key=True)
    nombre = db.Column(db.Text)

    empleados = relationship('Empleado', backref='genero')

    def __init__(self, nombre):
        self.nombre = nombre