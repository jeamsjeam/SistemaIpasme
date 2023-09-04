from ..calls.pacienteCall import PacienteCalls
from ..calls.grupoRepososCalls import GrupoReposoCalls
from ..calls.repososCalls import ReposoCalls
from ..calls.cargosCalls import CargosCalls
from ..calls.dependenciasCalls import DependenciasCalls
from ..calls.municipiosCalls import MunicipiosCalls
from ..calls.tipoReposoCall import TipoReposoCalls
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

        # Se busca al paciente
        pacienteConsulta = PacienteCalls.get_paciente_cedula(cedula)

        # Guarda la cantidad de dias de los reposos
        total_dias_reposos = 0

        # Si existe el paciente se procede a buscar sus reposos
        if pacienteConsulta is not None:

            # Se convierte el objeto Paciente a un diccionario
            paciente = paciente_schema.dump(pacienteConsulta)   
            #pdb.set_trace()  

            # Se buscan los grupos de reposos de ese paciente y se retornan en orden de la fecha mas actual a la mas antigua
            grupoReposoConsulta = GrupoReposoCalls.get_grupoReposo_paciente(paciente['cedula'])

            # Se verifica que exista al menos un grupo de reposo
            if grupoReposoConsulta is not None and len(grupoReposoConsulta) > 0:

                # Se convierte el objeto GrupoReposo en un diccionario
                grupoReposo = grupoReposos_schema.dump(grupoReposoConsulta)

                # Se crea una lista donde se van a guardar los reposos del paciente
                listaReposos = []
                
                # Se utiliza para poder saber cual es el primer grupo reposo para sumar solo esos dias
                banderaDias = True

                # Se recorren todos los grupos de reposos encontrados
                for grupo in grupoReposo:

                    # Se buscan los reposos de cada grupo de reposos y se traen en orden de la fecha mas actual a la mas antigua
                    reposoConsulta = ReposoCalls.get_reposo_paciente(grupo['id'])

                    # Se verifica que existan reposos
                    if reposoConsulta is not None and len(reposoConsulta) > 0:

                        # Se recorren todos los reposos y se agregan a la lista 
                        for rep in reposoConsulta:

                            # Se suman los dias del grupo reposo mas nuevo
                            if banderaDias:
                                total_dias_reposos += (rep.fecha_fin - rep.fecha_inicio).days + 1

                            listaReposos.append(rep)

                    # se cambia la bandera de estado para que ya no cuente mas dias
                    banderaDias = False
                
                # Si se agrego algo a lista se agrega al objeto paciente un nuevo campo llamado reposo donde estara la lista que se acabo de llenar
                # En caso de que no exista nada en la lista se agrega vacia
                if listaReposos is not None and len(listaReposos) > 0:

                    # Se convierte el objeto Reposos en un diccionario y se agrega al objeto paciente
                    paciente['reposos'] = reposos_schema.dump(listaReposos)
                    paciente["dias_reposo"] = total_dias_reposos
                else:
                    paciente['reposos'] = []
                    paciente["dias_reposo"] = total_dias_reposos
                return paciente
            else:
                # Si el paciente no se le encontraron grupo de reposos se envia la lista de reposos vacia 
                paciente['reposos'] = []
                paciente["dias_reposo"] = total_dias_reposos
                return paciente
        else:
            # Si no se encuentra paciente se retorna null
            return None
        
    def crear_paciente(datos_completos):

        # Creamos el objeto paciente con los datos recibidos
        paciente = PacienteCalls.crear_obj_paciente(datos_completos)

        # Se cre ale paciente 
        paciente_creado = PacienteCalls.crear_paciente(paciente)

        # Se crea un diccionario de salida
        resultadoDiccionario = {}

        # Se verifica si la creacion del paciente se hizo con existo
        # Si fue exitosa se retona un mensaje y el objeto paciente agregandole un campo mas de reposos que es una lista vacia
        # Si no se pudo crear se retorna un mensaje de error y el objeto paciente null
        if paciente_creado is not None:
            resultadoDiccionario["mensaje"] = "00|Paciente Registrado con exito"
            resultado = paciente_schema.dump(paciente_creado)
            resultado["dias_reposo"] = 0
            resultado["reposo"] = []
            resultadoDiccionario["paciente"] = resultado
            return resultadoDiccionario
        else:
            resultadoDiccionario["mensaje"] = "01|Error al registrar el paciente"
            resultadoDiccionario["paciente"] = None
            return resultadoDiccionario
    
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

            total_dias_reposos = 0  # Inicializamos la variable para almacenar el total de días

            for reposo in reposos_asociados:

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
                        return "05|Fecha de reposo se superpone con reposo existente"
                    elif (fecha_inicio_reposo >= reposo_existente.fecha_inicio and fecha_inicio_reposo <= reposo_existente.fecha_fin) or \
                        (fecha_fin_reposo >= reposo_existente.fecha_inicio and fecha_fin_reposo <= reposo_existente.fecha_fin):
                        return "06|Existen 2 o más reposos asociados dentro del rango de fechas"

                total_dias_completos += duracion_reposo_completo

                # Se agregan a una lista los reposos nuevos para ser creados mas adelante
                reposo = ReposoCalls.retornar_obj_reposo(reposo_info)
                reposos.append(reposo)

            total_dias_totales = total_dias_reposos + total_dias_completos

            diasMaximos = 63

            tipoReposo = TipoReposoCalls.get_tipoReposo_id(grupo_reposo_encontrado.tipo_reposo_id)

            if tipoReposo is not None:
                diasMaximos = tipoReposo.maximo_dias

            if total_dias_totales > diasMaximos:
                return "04|La suma de días de reposos es mayor a 63"
            else:
                # Se recorren y se crean
                for i, reposo in enumerate(reposos):
                    reposo.grupo_reposo_id = grupo_reposo_encontrado.id
                    ReposoCalls.crear_reposo(reposo)
                return "00|Reposo creado"
        else:
            return "03|No se encontró ningún Grupo de Reposo para el paciente"

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
    
    def sumar_dias_reposos_ultimo_grupo(cedula):
        # Obtener el último grupo de reposos del paciente por su cédula
        grupo_reposos = GrupoReposoCalls.get_grupoReposo_paciente(cedula)

        if grupo_reposos:
            # Obtener el último grupo de reposos (el primero en la lista ordenada)
            ultimo_grupo = grupo_reposos[0]

            # Obtener los reposos asociados al último grupo
            reposos_asociados = ultimo_grupo.reposos

            # Inicializar la variable para almacenar el total de días
            total_dias_reposos = 0

            # Sumar los días de cada reposo
            for reposo in reposos_asociados:
                duracion_reposo = (reposo.fecha_fin - reposo.fecha_inicio).days + 1
                total_dias_reposos += duracion_reposo

            return total_dias_reposos
        else:
            # No se encontraron grupos de reposos para el paciente
            return 0
        
    
"""
{
  "cedula": 19925888,
  "grupo_reposo_fecha_inicio": "2023-08-01",
  "tipo_reposo_id": 1,
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
    },
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
  "cargo_id": 1,
  "dependencia_id": 2,
  "municipio_id": 1
}
"""
        