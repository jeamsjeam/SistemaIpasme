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
            # paciente["cargo"] = cargo_schema.dump(CargosCalls.get_cargo_id(paciente["cargo_id"]))["nombre"]
            # paciente["dependencia"] = dependecia_schema.dump(DependenciasCalls.get_dependencia_id(paciente["dependencia_id"]))["nombre"]
            # paciente["municipio"] = municipio_schema.dump(MunicipiosCalls.get_municipio_id(paciente["municipio_id"]))["nombre"]
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
    
    def registrar_datos_paciente_nuevo(datos_completos):
        # Creamos el objeto paciente con los datos recibidos
        paciente = Paciente(cedula=datos_completos['cedula'],
                            nombre=datos_completos['nombre'],
                            apellido=datos_completos['apellido'],
                            institucion_laboral=datos_completos['institucion_laboral'],
                            fecha_nacimiento=datos_completos['fecha_nacimiento'],
                            direccion=datos_completos['direccion'],
                            telefono=datos_completos['telefono'],
                            permiso_dias_extra=datos_completos['permiso_dias_extra'],
                            cargo_id=datos_completos['cargo_id'],
                            dependencia_id=datos_completos['dependencia_id'],
                            municipio_id=datos_completos['municipio_id'])
        
        # Creamos el objeto grupo_reposo con los datos recibidos
        grupo_reposo = GrupoReposo(paciente_cedula=datos_completos['cedula'],
                                   especialidad_id=datos_completos['especialidad_id'],
                                   fecha_inicio=datos_completos['grupo_reposo_fecha_inicio'])
        
        # Creamos una lista de objetos reposo con los datos recibidos
        reposos = []
        for reposo_info in datos_completos['reposos']:
            reposo = Reposo(codigo_asistencial=reposo_info['codigo_asistencial'],
                            codigo_registro=reposo_info['codigo_registro'],
                            fecha_inicio=reposo_info['fecha_inicio'],
                            fecha_fin=reposo_info['fecha_fin'],
                            quien_valida=reposo_info['quien_valida'],
                            grupo_reposo_id=None)  # Asociaremos este campo más adelante
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
        