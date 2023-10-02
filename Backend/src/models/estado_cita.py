from src import db
from sqlalchemy.orm import relationship, backref

class EstadoCita(db.Model):
    __tablename__ = 'estado_cita'

    id = db.Column(db.BigInteger(), primary_key=True)
    nombre = db.Column(db.Text)

    citas = relationship('Cita', backref='estado_cita')

    def __init__(self, nombre):
        self.nombre = nombre