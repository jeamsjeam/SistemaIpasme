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
        return paciente_creado
    
    def registrar_grupo_reposo(datos_completos):

        # Se busca al paciente
        pacienteConsulta = PacienteCalls.get_paciente_cedula(datos_completos['cedula'])

        # Si no se encuentra se retorna el mensaje
        if pacienteConsulta is None:
            return "02|No se encontro paciente"
        
        # Creamos el objeto grupo_reposo con los datos recibidos
        grupo_reposo = GrupoReposoCalls.retornar_obj_grupoReposo(datos_completos)

        # Se consulta el servicio que trae el ultimo grupoReposo y sus reposos
        # Si no han pasado mas de 180 dias desde la fecha inicio del grupo hasta la fecha inicio del reporte nuevo
        resultado = GrupoReposoCalls.buscar_grupoReposo(datos_completos['cedula'], datos_completos['fecha_inicio'])

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
            for reposo in reposos_asociados:
                print("ID Reposo:", reposo.id, "Código Asistencial:", reposo.codigo_asistencial)
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
        
    
        
        