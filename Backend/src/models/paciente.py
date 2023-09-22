from src import db
from sqlalchemy.orm import relationship, backref

class Paciente(db.Model):
    __tablename__ = 'paciente'

    cedula = db.Column(db.BigInteger(), primary_key=True, autoincrement=False)
    nombre = db.Column(db.Text, nullable=False)
    apellido = db.Column(db.Text, nullable=False)
    institucion_laboral = db.Column(db.Text)
    fecha_nacimiento = db.Column(db.DateTime())
    direccion = db.Column(db.Text)
    telefono = db.Column(db.String(11))
    correo = db.Column(db.Text, nullable=True)
    cargo_id = db.Column(db.BigInteger(), db.ForeignKey('cargo.id'))
    dependencia_id = db.Column(db.BigInteger(), db.ForeignKey('dependencia.id'))
    municipio_id = db.Column(db.BigInteger(), db.ForeignKey('municipio.id'))
    tipo_paciente_id = db.Column(db.BigInteger(), db.ForeignKey('tipo_paciente.id'))
    usuario_id = db.Column(db.BigInteger(), db.ForeignKey('usuario.id'))

    grupos_reposo = relationship('GrupoReposo', backref='paciente')
    citas = relationship('Cita', backref='paciente')

    def __init__(self, cedula, nombre, apellido, institucion_laboral, fecha_nacimiento, direccion, telefono, correo, cargo_id, dependencia_id, municipio_id, tipo_paciente_id, usuario_id):
        self.cedula = cedula
        self.nombre = nombre
        self.apellido = apellido
        self.institucion_laboral = institucion_laboral
        self.fecha_nacimiento = fecha_nacimiento
        self.direccion = direccion
        self.telefono = telefono
        self.correo = correo
        self.cargo_id = cargo_id
        self.dependencia_id = dependencia_id
        self.municipio_id = municipio_id
        self.tipo_paciente_id = tipo_paciente_id
        self.usuario_id = usuario_id