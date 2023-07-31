from ..models.reposo import Reposo
from src import db

class ReposoCalls:
    def crear_reposo(reposo):
        reposo_nuevo = Reposo(codigo_asistencial=reposo.codigo_asistencial,
                              codigo_registro=reposo.codigo_registro,
                              fecha_inicio=reposo.fecha_inicio,
                              fecha_fin=reposo.fecha_fin,
                              quien_valida=reposo.quien_valida,
                              grupo_reposo_id=reposo.grupo_reposo_id)
        db.session.add(reposo_nuevo)
        db.session.commit()
        db.session.refresh(reposo_nuevo)
        return reposo_nuevo