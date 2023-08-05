from src import db
from sqlalchemy.orm import relationship, backref

class EstadoEmpleado(db.Model):
    __tablename__ = 'estado_empleado'

    id = db.Column(db.BigInteger(), primary_key=True)
    nombre = db.Column(db.Text)

    empleados = relationship('Empleado', backref='estado_empleado')

    def __init__(self, nombre):
        self.nombre = nombre