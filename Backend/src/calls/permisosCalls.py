from ..models.permiso import Permiso
from datetime import datetime
from src import db
from sqlalchemy import or_, and_

class PermisoCalls():   
    def get_permisos_empleado_fecha(cedula, fechaInicio, fechaFin):
        dateInicio = datetime.strptime(fechaInicio, "%d/%m/%Y")
        dateFin = datetime.strptime(fechaFin, "%d/%m/%Y")
        permisos = Permiso.query.filter_by(empleado_cedula=cedula).filter(or_(\
            # La fecha de inicio está entre el rango
            and_(Permiso.fecha_inicio >= dateInicio,\
                 Permiso.fecha_inicio <= dateFin,),\
            # La fecha fin está entre el rango
            and_(Permiso.fecha_fin >= dateInicio,\
            Permiso.fecha_fin <= dateFin,),\
            # El rango es menor a las fechas del permiso
            and_(Permiso.fecha_inicio <= dateInicio,\
            Permiso.fecha_fin >= dateFin,),\
            )).order_by(Permiso.fecha_inicio.desc())
        return permisos
    
    def registrar_permiso(permiso):
        permisoNuevo = Permiso(descripcion_motivo=permiso.descripcion_motivo,
                               fecha_inicio=permiso.fecha_inicio,
                               fecha_fin=permiso.fecha_fin,
                               empleado_cedula=permiso.empleado_cedula)
        db.session.add(permisoNuevo)
        db.session.commit()
        db.session.refresh(permisoNuevo)
        return permisoNuevo
    
    def get_permisos_empleado(cedula):
        permisos = Permiso.query.filter_by(empleado_cedula=cedula).order_by(Permiso.fecha_inicio.desc())
        return permisos