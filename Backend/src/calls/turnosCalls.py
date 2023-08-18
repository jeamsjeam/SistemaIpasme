from ..models.turno import Turno
from src import db

class TurnosCalls():
    def get_turnos():
        turnos = Turno.query.all()
        return turnos
    
    def get_turno_id(id):
        turno = Turno.query.get(id)
        return turno
    
    def get_turno_nombre(nombre):
        return Turno.query.filter_by(nombre = nombre).first()
    
    def crear_turno(turno):
        turnoNuevo = Turno(nombre = turno.nombre, 
                           hora_llegada=turno.hora_llegada,
                           hora_salida=turno.hora_salida)
        db.session.add(turnoNuevo)
        db.session.commit()
        db.session.refresh(turnoNuevo)
        return turnoNuevo
    
    def modificar_turno(turno):
        turnoBD = Turno.query.get(turno.id)
        turnoBD.nombre = turno.nombre
        turnoBD.hora_llegada = turno.hora_llegada
        turnoBD.hora_salida = turno.hora_salida
        db.session.commit()
        db.session.refresh(turnoBD)
        return turnoBD

    def borrar_turno(id):
        turnoBD = Turno.query.get(id)
        db.session.delete(turnoBD)
        db.session.commit()
        return "00|Ok"