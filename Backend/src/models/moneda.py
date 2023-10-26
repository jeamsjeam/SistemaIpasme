from src import db
from sqlalchemy.orm import relationship, backref

class Moneda(db.Model):
    __tablename__ = 'moneda'

    id = db.Column(db.BigInteger(), primary_key=True)
    nombre = db.Column(db.Text)
    simbolo = db.Column(db.Text)

    monederos = relationship('Monedero', backref='moneda')

    def __init__(self, nombre, simbolo):
        self.nombre = nombre
        self.simbolo = simbolo