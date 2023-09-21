from src import db

class Cita(db.Model):
    __tablename__ = 'cita'

    id = db.Column(db.BigInteger(), primary_key=True)
    nota = db.Column(db.Text)
    empleado_cedula = db.Column(db.BigInteger(), db.ForeignKey('empleado.cedula'))
    paciente_cedula = db.Column(db.BigInteger(), db.ForeignKey('paciente.cedula'))
    fecha = db.Column(db.DateTime(), nullable=False)
    estado_cita_id = db.Column(db.BigInteger(), db.ForeignKey('estado_cita.id'))

    def __init__(self, nota, empleado_cedula, paciente_cedula, fecha, estado_cita_id):
        self.nota = nota
        self.empleado_cedula = empleado_cedula
        self.paciente_cedula = paciente_cedula
        self.fecha = fecha
        self.estado_cita_id = estado_cita_id