from ..models.asistencia import Asistencia
from datetime import datetime, timedelta
from src import db
from sqlalchemy import extract

class AsistenciasCalls():   
    def get_asistencias_empleado_mes(cedula, fecha):
        date = datetime.strptime(fecha, "%d/%m/%Y")
        asistencias = Asistencia.query.filter_by(empleado_cedula=cedula).filter(\
            extract('month', Asistencia.hora_llegada) == date.month,\
            extract('year', Asistencia.hora_llegada) == date.year\
            ).order_by(Asistencia.hora_llegada)
        return asistencias
    
    def registrar_asistencia(asistencia):
        asistenciaNueva = Asistencia(comentario=asistencia.comentario,
                                     hora_llegada=asistencia.hora_llegada,
                                     hora_salida=asistencia.hora_salida,
                                     empleado_cedula=asistencia.empleado_cedula)
        db.session.add(asistenciaNueva)
        db.session.commit()
        db.session.refresh(asistenciaNueva)
        return asistenciaNueva
    
    def registrar_entrada(asistencia):
        asistenciaNueva = Asistencia(comentario=asistencia.comentario,
                                     hora_llegada=None,
                                     hora_salida=None,
                                     empleado_cedula=asistencia.empleado_cedula)
        db.session.add(asistenciaNueva)
        db.session.commit()
        db.session.refresh(asistenciaNueva)
        return asistenciaNueva
    
    def registrar_salida(asistencia):
        asistenciaBD = Asistencia.query.get(asistencia.id)
        asistenciaBD.comentario = asistencia.comentario
        asistenciaBD.hora_salida = asistencia.hora_salida
        db.session.commit()
        db.session.refresh(asistenciaBD)
        return asistenciaBD
    
    def get_asistencias_empleado_semana(cedula, fecha):
        date = datetime.strptime(fecha, "%d/%m/%Y")

        # Obtener el día de la semana (0 para lunes, 6 para domingo)
        diaSemana = date.weekday()
        # Calcular la fecha del inicio de la semana (lunes)
        inicioSemana = date - timedelta(days=diaSemana)
        # Calcular la fecha del final de la semana (domingo)
        finSemana = inicioSemana + timedelta(days=6)

        asistencias = Asistencia.query.filter_by(empleado_cedula=cedula).filter(\
            Asistencia.hora_llegada >= inicioSemana,\
            Asistencia.hora_llegada <= finSemana\
            ).order_by(Asistencia.hora_llegada)
        return asistencias
    
    def get_asistencias_empleado_dia(cedula, fecha):
        date = datetime.strptime(fecha, "%d/%m/%Y")
        asistencia = Asistencia.query.filter_by(empleado_cedula=cedula).filter(extract('day', Asistencia.hora_llegada) == date.day,
                                                                               extract('month', Asistencia.hora_llegada) == date.month,
                                                                               extract('year', Asistencia.hora_llegada) == date.year).first()
        return asistencia