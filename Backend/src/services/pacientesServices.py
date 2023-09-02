from ..calls.pacienteCall import PacienteCalls
from ..calls.grupoRepososCalls import GrupoReposoCalls
from ..calls.repososCalls import ReposoCalls
from ..calls.cargosCalls import CargosCalls
from ..calls.dependenciasCalls import DependenciasCalls
from ..calls.municipiosCalls import MunicipiosCalls
from ..models.paciente import Paciente
from ..models.grupo_reposo import GrupoReposo
from ..models.reposo import Reposo
from ..schemas.pacienteSchema import paciente_schema,Pacientes_schema
from ..schemas.grupoReposoSchema import grupoReposo_schema,grupoReposos_schema
from ..schemas.reposoSchema import reposo_schema,reposos_schema
from ..schemas.cargoSchema import cargo_schema,cargos_schema
from ..schemas.dependenciaSchema import dependecia_schema,dependecias_schema
from ..schemas.municipioSchema import municipio_schema,municipios_schema
from datetime import datetime
import pdb

class PacientesServices:

    def buscar(cedula):
        pacienteConsulta = PacienteCalls.get_paciente_cedula(cedula)
        if pacienteConsulta is not None:
            paciente = paciente_schema.dump(pacienteConsulta)   
            #pdb.set_trace()  
            grupoReposoConsulta = GrupoReposoCalls.get_grupoReposo_paciente(paciente['cedula'])
            if grupoReposoConsulta is not None and len(grupoReposoConsulta) > 0:
                grupoReposo = grupoReposos_schema.dump(grupoReposoConsulta)
                listaReposos = []
                for grupo in grupoReposo:
                    reposoConsulta = ReposoCalls.get_reposo_paciente(grupo['id'])
                    if reposoConsulta is not None and len(reposoConsulta) > 0:
                        repososAux = reposos_schema.dump(reposoConsulta)
                        for rep in repososAux:
                            listaReposos.append(rep)
                if listaReposos is not None and len(listaReposos) > 0:
                    paciente['reposos'] = listaReposos
                else:
                    paciente['reposos'] = []
                return paciente
            else:
                paciente['reposos'] = []
                return paciente
        else:
            return None
        
    def crear_paciente(datos_completos):
        # Creamos el objeto paciente con los datos recibidos
        paciente = PacienteCalls.crear_obj_paciente(datos_completos)
        paciente_creado = PacienteCalls.crear_paciente(paciente)
        return paciente_schema.dump(paciente_creado)
    
    def registrar_reposo(datos_completos):

        # Se busca al paciente
        pacienteConsulta = PacienteCalls.get_paciente_cedula(datos_completos['cedula'])

        # Si no se encuentra se retorna el mensaje
        if pacienteConsulta is None:
            return "02|No se encontro paciente"
        
        # Creamos el objeto grupo_reposo con los datos recibidos
        grupo_reposo = GrupoReposoCalls.retornar_obj_grupoReposo(datos_completos)

        # Se consulta el servicio que trae el ultimo grupoReposo y sus reposos
        # Si no han pasado mas de 180 dias desde la fecha inicio del grupo hasta la fecha inicio del reporte nuevo
        resultado = GrupoReposoCalls.buscar_grupoReposo(datos_completos['cedula'], datos_completos['grupo_reposo_fecha_inicio'])

        # Se pregunta si el resultado es un string, de ser asi quiere decir que o no tiene o los dias son mayores a 180
        if isinstance(resultado, str) or resultado is None:
            
            # Se crea el nuevo grupo reposo
            grupoReposo_nuevo = GrupoReposoCalls.crear_grupo_reposo(grupo_reposo)

            # Creamos una lista de objetos reposo con los datos recibidos
            reposos = []

            # Se recorren todos los reposos que se enviaron, normalmente seria 1 solo
            for reposo_info in datos_completos['reposos']:
                reposo = ReposoCalls.retornar_obj_reposo(reposo_info)  # Asociaremos este campo más adelante
                reposos.append(reposo)
            
            # Se pregunta si existre grupo de reporte nuevo y si la lista de reposos tiene algo
            if grupoReposo_nuevo and len(reposos) > 0:

                # Se recorren y se crean
                for i, reposo in enumerate(reposos):
                    reposo.grupo_reposo_id = grupoReposo_nuevo.id
                    ReposoCalls.crear_reposo(reposo)
                return "00|Reposo creado"
            
            return None
        
        # Parte por hacer
        elif resultado[0]:
            grupo_reposo_encontrado = resultado[0]
            reposos_asociados = resultado[1]
            print("Último Grupo de Reposo:", grupo_reposo_encontrado.id)
            print("Reposos asociados:")

            total_dias_reposos = 0  # Inicializamos la variable para almacenar el total de días

            for reposo in reposos_asociados:
                print("ID Reposo:", reposo.id, "Código Asistencial:", reposo.codigo_asistencial, "Fecha Inicio", reposo.fecha_inicio, "Fecha Fin", reposo.fecha_fin)

                # Calculamos la duración del reposo en días
                duracion_reposo = (reposo.fecha_fin - reposo.fecha_inicio).days + 1
                total_dias_reposos += duracion_reposo  # Sumamos los días al total

            reposos = []

            total_dias_completos = 0  # Inicializamos el total de días de los rangos en datos_completos

            # Se recorren los reposos que se enviaron al servicio
            for reposo_info in datos_completos['reposos']:
                fecha_inicio_reposo = datetime.strptime(reposo_info['fecha_inicio'], "%Y-%m-%d")
                fecha_fin_reposo = datetime.strptime(reposo_info['fecha_fin'], "%Y-%m-%d")
                duracion_reposo_completo = (fecha_fin_reposo - fecha_inicio_reposo).days + 1

                # Se recorren los reposos que se consultaron de la base de datos para las validaciones
                for reposo_existente in reposos_asociados:
                    if (fecha_inicio_reposo <= reposo_existente.fecha_fin and fecha_fin_reposo >= reposo_existente.fecha_inicio):
                        pdb.set_trace()  
                        return "06|Fecha de reposo se superpone con reposo existente"
                    elif (fecha_inicio_reposo >= reposo_existente.fecha_inicio and fecha_inicio_reposo <= reposo_existente.fecha_fin) or \
                        (fecha_fin_reposo >= reposo_existente.fecha_inicio and fecha_fin_reposo <= reposo_existente.fecha_fin):
                        return "07|Existen 2 o más reposos asociados dentro del rango de fechas"

                total_dias_completos += duracion_reposo_completo

                # Se agregan a una lista los reposos nuevos para ser creados mas adelante
                reposo = ReposoCalls.retornar_obj_reposo(reposo_info)
                reposos.append(reposo)

            total_dias_totales = total_dias_reposos + total_dias_completos

            if total_dias_totales > 63:
                return "04|La suma de días de reposos es mayor a 63"
            else:
                # Se recorren y se crean
                for i, reposo in enumerate(reposos):
                    reposo.grupo_reposo_id = grupo_reposo_encontrado.id
                    ReposoCalls.crear_reposo(reposo)
                return "00|Reposo creado"
        else:
            print("No se encontró ningún Grupo de Reposo para el paciente.")




    def registrar_datos_paciente_nuevo(datos_completos):
        # Creamos el objeto paciente con los datos recibidos
        paciente = PacienteCalls.crear_obj_paciente(datos_completos)
        
        # Creamos el objeto grupo_reposo con los datos recibidos
        grupo_reposo = GrupoReposoCalls.retornar_obj_grupoReposo
        
        # Creamos una lista de objetos reposo con los datos recibidos
        reposos = []
        for reposo_info in datos_completos['reposos']:
            reposo = ReposoCalls.retornar_obj_reposo(reposo_info)  # Asociaremos este campo más adelante
            reposos.append(reposo)

        # Registramos los datos en las tres tablas
        paciente_creado = PacienteCalls.crear_paciente(paciente)
        if paciente_creado:
            grupo_reposo.paciente_cedula = paciente_creado.cedula
            grupo_reposo_creado = GrupoReposoCalls.crear_grupo_reposo(grupo_reposo)
            if grupo_reposo_creado:
                for i, reposo in enumerate(reposos):
                    reposo.grupo_reposo_id = grupo_reposo_creado.id
                    ReposoCalls.crear_reposo(reposo)
                return "00|Registro exitoso de paciente, grupo de reposo y reposos asociados"
            else:
                # Si hubo un error en el registro del grupo de reposo, eliminamos el paciente creado previamente
                PacienteCalls.borrar_paciente(paciente_creado.cedula)
                return "01|Error en el registro del grupo de reposo"
        else:
            return "02|Error en el registro del paciente"
        
    
"""
{
  "cedula": 19925888,
  "fecha_inicio": "2023-08-01",
  "reposos": [
    {
      "codigo_asistencial": "COD123",
      "codigo_registro": "REG456",
      "fecha_inicio": "2023-08-05",
      "fecha_fin": "2023-08-10",
      "quien_valida": "Dr. Validador"
      // Puedes agregar campos adicionales aquí, si existen en el modelo Reposo
    },
    {
      "codigo_asistencial": "COD789",
      "codigo_registro": "REG012",
      "fecha_inicio": "2023-08-15",
      "fecha_fin": "2023-08-20",
      "quien_valida": "Dra. Validadora"
      // Puedes agregar campos adicionales aquí, si existen en el modelo Reposo
    }
  ]
}
{
  "cedula": 19925888,
  "grupo_reposo_fecha_inicio": "2023-08-01",
  "especialidad_id": 1,
  "reposos": [
    {
      "codigo_asistencial": "COD123",
      "codigo_registro": "REG456",
      "fecha_inicio": "2023-08-11",
      "fecha_fin": "2023-08-14",
      "quien_valida": "Dr. Validador"
      // Puedes agregar campos adicionales aquí, si existen en el modelo Reposo
    },
    {
      "codigo_asistencial": "COD789",
      "codigo_registro": "REG012",
      "fecha_inicio": "2023-08-21",
      "fecha_fin": "2023-08-25",
      "quien_valida": "Dra. Validadora"
      // Puedes agregar campos adicionales aquí, si existen en el modelo Reposo
    }
  ]
}
"""
"""
{
  "cedula": 19925888,
  "nombre": "Jesus",
  "apellido": "Acevedo",
  "institucion_laboral": "Hospital ABC",
  "fecha_nacimiento": "1985-05-10",
  "direccion": "Calle 123, Ciudad",
  "telefono": "555-1234",
  "permiso_dias_extra": true,
  "cargo_id": 1,
  "dependencia_id": 2,
  "municipio_id": 1
}
"""
        