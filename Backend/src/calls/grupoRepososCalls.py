from ..models.grupo_reposo import GrupoReposo
from src import db

class GrupoReposoCalls:
    def crear_grupo_reposo(grupo_reposo):
        grupo_reposo_nuevo = GrupoReposo(paciente_cedula=grupo_reposo.paciente_cedula,
                                         especialidad_id=grupo_reposo.especialidad_id,
                                         fecha_inicio=grupo_reposo.fecha_inicio)
        db.session.add(grupo_reposo_nuevo)
        db.session.commit()
        db.session.refresh(grupo_reposo_nuevo)
        return grupo_reposo_nuevo