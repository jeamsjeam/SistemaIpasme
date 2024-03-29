from src import db
from datetime import datetime

class MovimientoMonedero(db.Model):
    __tablename__ = 'movimiento_monedero'

    id = db.Column(db.BigInteger(), primary_key=True)
    descripcion = db.Column(db.Text, nullable=False)
    saldo = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    moneda_id = db.Column(db.BigInteger(), db.ForeignKey('moneda.id'))
    monedero_id = db.Column(db.BigInteger(), db.ForeignKey('monedero.id'))
    fecha = db.Column(db.DateTime(), default=datetime.now)

    def __init__(self, descripcion, saldo, moneda_id, monedero_id, fecha):
        self.descripcion = descripcion
        self.saldo = saldo
        self.moneda_id = moneda_id
        self.monedero_id = monedero_id
        self.fecha = fecha
    