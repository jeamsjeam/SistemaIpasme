from ..models.reposo import Reposo
from src import db
import pdb

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
    
    def get_reposo_paciente(grupo_reposo_id):
        reposos = sorted(Reposo.query.filter_by(grupo_reposo_id = grupo_reposo_id), key=lambda rep: rep.fecha_inicio)  
        return reposos
    
    def retornar_obj_reposo(reposo_info):
        reposo = Reposo(codigo_asistencial=reposo_info['codigo_asistencial'],
                            codigo_registro=reposo_info['codigo_registro'],
                            fecha_inicio=reposo_info['fecha_inicio'],
                            fecha_fin=reposo_info['fecha_fin'],
                            quien_valida=reposo_info['quien_valida'],
                            grupo_reposo_id=None)
        return reposo