from src import db
from sqlalchemy.orm import relationship, backref

class Especialidad(db.Model):
    __tablename__ = 'especialidad'

    id = db.Column(db.BigInteger(), primary_key=True)
    nombre = db.Column(db.Text)

    empleados = relationship('Empleado', backref='especialidad')

    def __init__(self, nombre, maximo_dias):
        self.nombre = nombre
        self.maximo_dias = maximo_dias