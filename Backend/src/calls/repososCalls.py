from ..models.reposo import Reposo
from src import db
import pdb

class ReposoCalls:
    def get_reposo_id(id):
        reposo = Reposo.query.get(id)
        return reposo

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
        reposos = sorted(Reposo.query.filter_by(grupo_reposo_id = grupo_reposo_id), key=lambda rep: rep.fecha_inicio, reverse=True)  
        return reposos
    
    def retornar_obj_reposo(reposo_info):
        reposo = Reposo(codigo_asistencial=reposo_info['codigo_asistencial'],
                            codigo_registro=reposo_info['codigo_registro'],
                            fecha_inicio=reposo_info['fecha_inicio'],
                            fecha_fin=reposo_info['fecha_fin'],
                            quien_valida=reposo_info['quien_valida'],
                            grupo_reposo_id=None)
        return reposo

    def borrar_reposo(id):
        reposoBD = Reposo.query.get(id)
        if reposoBD is not None:
            db.session.delete(reposoBD)
            db.session.commit()
            return "00|Se borro el reposo con exito"
        else:
            return "01|No se pudo borrar el reposo"

    def borrar_reposo_sin_consultar(reposoBD):
        if reposoBD is not None:
            db.session.delete(reposoBD)
            db.session.commit()
            return True
        else:
            return False
        
    def modificar_reposo(reposo,id):
        reposoBD = Reposo.query.get(id)
        if reposoBD is not None:
            reposoBD.codigo_asistencial = reposo.codigo_asistencial
            reposoBD.codigo_registro = reposo.codigo_registro
            reposoBD.quien_valida = reposo.quien_valida
            db.session.commit()
            db.session.refresh(reposoBD)
            return reposoBD
        else:
            return None