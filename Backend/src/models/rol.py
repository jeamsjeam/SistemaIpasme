from src import db
from sqlalchemy.orm import relationship, backref

class Rol(db.Model):
    __tablename__ = 'rol'

    id = db.Column(db.BigInteger(), primary_key=True)
    nombre = db.Column(db.Text, unique=True)

    usuarios = relationship('Usuario', backref='rol')

    def __init__(self, nombre):
        self.nombre = nombre