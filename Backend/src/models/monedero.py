from src import db
from datetime import datetime
from sqlalchemy.orm import relationship, backref


class Monedero(db.Model):
    __tablename__ = 'monedero'

    id = db.Column(db.BigInteger(), primary_key=True)
    nombre = db.Column(db.Text, nullable=False)
    saldo = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    moneda_id = db.Column(db.BigInteger(), db.ForeignKey('moneda.id'))
    usuario_id = db.Column(db.BigInteger(), db.ForeignKey('usuario.id'))

    movimientos = relationship('MovimientoMonedero', backref='monedero')

    def __init__(self, nombre, saldo, moneda_id, usuario_id):
        self.comentanombrerio = nombre
        self.saldo = saldo
        self.moneda_id = moneda_id
        self.usuario_id = usuario_id
    