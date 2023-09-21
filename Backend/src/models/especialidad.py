from src import db
from sqlalchemy.orm import relationship, backref

class Especialidad(db.Model):
    __tablename__ = 'especialidad'

    id = db.Column(db.BigInteger(), primary_key=True)
    nombre = db.Column(db.Text)
    consultas = db.Column(db.Boolean, default=False, nullable=False)

    empleados = relationship('Empleado', backref='especialidad')

    def __init__(self, nombre, maximo_dias, consultas):
        self.nombre = nombre
        self.maximo_dias = maximo_dias
        self.consultas = consultas