from ..models.cita import Cita
from src import db

class CitasCalls():
    def get_citas():
        citas = Cita.query.all()
        return citas
    
    def get_cita_id(id):
        cita = Cita.query.get(id)
        return cita
    
    def crear_cita(cita):
        citaNueva = Cita(nota = cita.nota, 
                         empleado_id=cita.empleado_id,
                         paciente_id=cita.paciente_id,
                         fecha=cita.fecha,
                         estado_cita_id=cita.estado_cita_id)
        db.session.add(citaNueva)
        db.session.commit()
        db.session.refresh(citaNueva)
        return citaNueva
    
    def modificar_cita(cita):
        citaBD = Cita.query.get(cita.id)
        citaBD.nota = cita.nota
        citaBD.empleado_id = cita.empleado_id
        citaBD.paciente_id = cita.paciente_id
        citaBD.fecha = cita.fecha
        citaBD.estado_cita_id = cita.estado_cita_id
        db.session.commit()
        db.session.refresh(citaBD)
        return citaBD

    def borrar_cita(id):
        citaBD = Cita.query.get(id)
        db.session.delete(citaBD)
        db.session.commit()
        return "00|Ok"