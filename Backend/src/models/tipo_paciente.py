from src import db
from sqlalchemy.orm import relationship, backref

class TipoPaciente(db.Model):
    __tablename__ = 'tipo_paciente'

    id = db.Column(db.BigInteger(), primary_key=True)
    nombre = db.Column(db.Text)

    pacientes = relationship('Paciente', backref='tipo_paciente')

    def __init__(self, nombre):
        self.nombre = nombre