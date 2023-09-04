from src import db
from sqlalchemy.orm import relationship, backref

class TipoReposo(db.Model):
    __tablename__ = 'tipo_reposo'

    id = db.Column(db.BigInteger(), primary_key=True)
    nombre = db.Column(db.Text)
    maximo_dias = db.Column(db.Integer)
    
    grupos_reposo = relationship('GrupoReposo', backref='tipo_reposo')

    def __init__(self, nombre, maximo_dias):
        self.nombre = nombre
        self.maximo_dias = maximo_dias