from src import db

class Cita(db.Model):
    __tablename__ = 'cita'

    id = db.Column(db.BigInteger(), primary_key=True)
    nota = db.Column(db.Text)
    empleado_id = db.Column(db.BigInteger(), db.ForeignKey('empleado.id'))
    paciente_id = db.Column(db.BigInteger(), db.ForeignKey('paciente.id'))
    fecha = db.Column(db.DateTime(), nullable=False)
    estado_cita_id = db.Column(db.BigInteger(), db.ForeignKey('estado_cita.id'))

    def __init__(self, nota, empleado_id, paciente_id, fecha, estado_cita_id):
        self.nota = nota
        self.empleado_id = empleado_id
        self.paciente_id = paciente_id
        self.fecha = fecha
        self.estado_cita_id = estado_cita_id