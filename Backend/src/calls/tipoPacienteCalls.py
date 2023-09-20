from ..models.tipo_paciente import TipoPaciente
from src import db

class TipoPacienteCalls():
    def get_tipos_paciente():
        tipos = sorted(TipoPaciente.query.all(), key=lambda x: x.nombre)
        return tipos
    
    def get_tipo_paciente_id(id):
        tipo = TipoPaciente.query.get(id)
        return tipo