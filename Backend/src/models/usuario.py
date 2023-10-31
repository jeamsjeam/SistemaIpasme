from src import db
from sqlalchemy.orm import relationship, backref

class Usuario(db.Model):
    __tablename__ = 'usuario'

    id = db.Column(db.BigInteger(), primary_key=True)
    usuario = db.Column(db.Text, nullable=False, unique=True)
    clave = db.Column(db.Text, nullable=False)
    nombre = db.Column(db.Text)
    rol_id = db.Column(db.BigInteger(), db.ForeignKey('rol.id'))

    monederos = relationship('Monedero', backref='usuario')

    def __init__(self, usuario, clave, nombre, rol_id):
        self.usuario = usuario
        self.clave = clave
        self.nombre = nombre
        self.rol_id = rol_id