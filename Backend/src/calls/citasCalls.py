from ..models.cita import Cita
from src import db
from datetime import datetime
from sqlalchemy import extract
import pdb

class CitasCalls():
    def get_citas():
        citas = Cita.query.all()
        return citas
    
    def get_cita_id(id):
        cita = Cita.query.get(id)
        return cita
    
    def get_citas_paciente(cedula):
        cita = sorted(Cita.query.filter_by(paciente_cedula = cedula), key=lambda cit: cit.fecha, reverse=True) 
        return cita
    
    def crear_cita(cita):
        citaNueva = Cita(nota = cita.nota, 
                         empleado_cedula=cita.empleado_cedula,
                         paciente_cedula=cita.paciente_cedula,
                         fecha=cita.fecha,
                         estado_cita_id=cita.estado_cita_id)
        db.session.add(citaNueva)
        db.session.commit()
        db.session.refresh(citaNueva)
        return citaNueva
    
    def modificar_cita(cita):
        citaBD = Cita.query.get(cita.id)
        citaBD.nota = cita.nota
        citaBD.empleado_cedula = cita.empleado_cedula
        citaBD.paciente_cedula = cita.paciente_cedula
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

    def borrar_ucita_sin_consultar(citaBD):
        if citaBD is not None:
            db.session.delete(citaBD)
            db.session.commit()
            return True
        else:
            return False
        
    def get_citas_dia_medico(cedula, fecha):
        date = datetime.strptime(fecha, "%d/%m/%Y")
        citas = Cita.query.filter_by(empleado_cedula=cedula).filter(\
            extract('month', Cita.fecha) == date.month,\
            extract('year', Cita.fecha) == date.year,\
            extract('day', Cita.fecha) == date.day)
        return citas
    
    def get_citas_dia_paciente(cedula, fecha):
        date = datetime.strptime(fecha, "%d/%m/%Y")
        citas = Cita.query.filter_by(paciente_cedula=cedula).filter(\
            extract('month', Cita.fecha) == date.month,\
            extract('year', Cita.fecha) == date.year,\
            extract('day', Cita.fecha) == date.day)
        return citas
    
    def get_citas_paciente_mes(cedula, fecha):
        date = datetime.strptime(fecha, "%d/%m/%Y")
        citas = Cita.query.filter_by(paciente_cedula=cedula).filter(\
            extract('month', Cita.fecha) == date.month,\
            extract('year', Cita.fecha) == date.year\
            ).order_by(Cita.fecha)
        return citas