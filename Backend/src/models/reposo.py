from src import db
from datetime import datetime

class Reposo(db.Model):
    __tablename__ = 'reposo'

    id = db.Column(db.BigInteger(), primary_key=True)
    codigo_asistencial = db.Column(db.Text, nullable=False)
    codigo_registro = db.Column(db.Text, nullable=False)
    fecha_inicio = db.Column(db.DateTime(), default=datetime.now)
    fecha_fin = db.Column(db.DateTime())
    quien_valida = db.Column(db.Text)
    grupo_reposo_id = db.Column(db.BigInteger(), db.ForeignKey('grupo_reposo.id'))

    def __init__(self,codigo_asistencial,codigo_registro,fecha_inicio, fecha_fin,quien_valida,grupo_reposo_id):
        self.codigo_asistencial = codigo_asistencial
        self.codigo_registro = codigo_registro
        self.fecha_inicio = fecha_inicio
        self.fecha_fin = fecha_fin
        self.quien_valida = quien_valida
        self.grupo_reposo_id = grupo_reposo_id