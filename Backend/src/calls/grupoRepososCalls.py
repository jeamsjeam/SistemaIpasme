from ..models.grupo_reposo import GrupoReposo
from ..models.reposo import Reposo
from datetime import datetime
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
    
    def get_grupoReposo_paciente(cedula):
        grupoReposos = sorted(GrupoReposo.query.filter_by(paciente_cedula = cedula), key=lambda grupo: grupo.fecha_inicio)
        return grupoReposos
    
    def retornar_obj_grupoReposo(datos_completos):
        grupo_reposo = GrupoReposo(paciente_cedula=datos_completos['cedula'],
                                   especialidad_id=datos_completos['especialidad_id'],
                                   fecha_inicio=datos_completos['grupo_reposo_fecha_inicio'])
        return grupo_reposo
    
    def buscar_grupoReposo(cedula, fechaInicioReposo):
        # Buscar el último grupo de reposo del paciente
        grupoReposo = GrupoReposo.query.filter_by(paciente_cedula=cedula).order_by(GrupoReposo.fecha_inicio.desc()).first()

        if grupoReposo:
            
            # Calcular la diferencia de días entre la fechaInicioReposo y la fecha_inicio del grupo
            dias_transcurridos = (datetime.strptime(fechaInicioReposo, "%Y-%m-%d") - grupoReposo.fecha_inicio).days

            if dias_transcurridos > 180:
                return "04"  # Retorna el mensaje "04" si han pasado más de 180 días
            else:
                # Obtener todos los reposos asociados a ese grupo y paciente
                reposos = Reposo.query.filter_by(grupo_reposo_id=grupoReposo.id).all()
                if reposos is not None and len(reposos) > 0:
                    return grupoReposo, reposos
                else:
                    return grupoReposo, []
        else:
            return "05"
        
"""
# Uso de la función
cedula_paciente = 123456789
fecha_inicio_reposo = datetime(2023, 3, 1)  # Reemplaza con la fecha que desees
resultado = buscar_grupoReposo(cedula_paciente, fecha_inicio_reposo)

if isinstance(resultado, str):
    print("Mensaje:", resultado)
elif resultado[0]:
    grupo_reposo_encontrado = resultado[0]
    reposos_asociados = resultado[1]
    print("Último Grupo de Reposo:", grupo_reposo_encontrado.id)
    print("Reposos asociados:")
    for reposo in reposos_asociados:
        print("ID Reposo:", reposo.id, "Código Asistencial:", reposo.codigo_asistencial)
else:
    print("No se encontró ningún Grupo de Reposo para el paciente.")
"""