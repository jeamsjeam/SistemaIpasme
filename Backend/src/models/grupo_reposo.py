from src import db
from datetime import datetime
from sqlalchemy.orm import relationship, backref

class GrupoReposo(db.Model):
    __tablename__ = 'grupo_reposo'

    id = db.Column(db.BigInteger(), primary_key=True)
    paciente_cedula = db.Column(db.BigInteger(), db.ForeignKey('paciente.cedula'))
    tipo_reposo_id = db.Column(db.BigInteger(), db.ForeignKey('tipo_reposo.id'))
    fecha_inicio = db.Column(db.DateTime(), default=datetime.now)

    reposos = relationship('Reposo', backref='grupo_reposo')

    def __init__(self, paciente_cedula, tipo_reposo_id, fecha_inicio):
        self.paciente_cedula = paciente_cedula
        self.tipo_reposo_id = tipo_reposo_id
        self.fecha_inicio = fecha_inicio