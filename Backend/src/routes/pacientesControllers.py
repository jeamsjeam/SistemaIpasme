from flask import Blueprint, request, jsonify, make_response
from src import app
from ..services.pacientesServices import PacientesServices
from ..calls.pacienteCall import PacienteCalls
from ..schemas.pacienteSchema import paciente_schema,Pacientes_schema
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors
import pdb

@app.route('/pacientes/<int:cedula>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def buscar_paciente(cedula):
    respuesta = PacientesServices.buscar(cedula)
    if respuesta is not None and len(respuesta) > 0:
        return make_response(jsonify(respuesta))
    else:
        return jsonify(None)
    
@app.route('/pacientes', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def buscar_paciente_todos():
    respuesta = PacientesServices.buscarTodos()
    if respuesta is not None and len(respuesta) > 0:
        return make_response(jsonify(respuesta))
    else:
        return jsonify(None)
    
@app.route('/pacientes/registrarNuevo', methods=['POST'])
@cross_origin()  # Para manejar problemas de CORS
def registrar_datos_paciente_nuevo():
    
    # Obtenemos los datos del JSON enviado en la solicitud HTTP
    datos_completos = request.json

    # Llamamos al método registrar_datos del objeto registro_paciente
    respuesta = PacientesServices.registrar_datos_paciente_nuevo(datos_completos)

    # Devolvemos la respuesta como JSON en la respuesta HTTP
    return make_response(jsonify(respuesta))

@app.route('/pacientes/CrearPaciente', methods=['POST'])
@cross_origin()  # Para manejar problemas de CORS
def crear_paciente():
    
    # Obtenemos los datos del JSON enviado en la solicitud HTTP
    datos_completos = request.json

    # Llamamos al método registrar_datos del objeto registro_paciente
    respuesta = PacientesServices.crear_paciente(datos_completos)
    
    # Devolvemos la respuesta como JSON en la respuesta HTTP
    return make_response(jsonify(respuesta))

@app.route('/pacientes/ModificarPaciente', methods=['POST'])
@cross_origin()  # Para manejar problemas de CORS
def modificar_paciente():

    # Obtenemos los datos del JSON enviado en la solicitud HTTP
    datos_completos = request.json

    datos_completos_objeto = PacienteCalls.crear_obj_paciente(datos_completos)
    
    resultado = {}
    # Llamamos al método registrar_datos del objeto registro_paciente
    respuesta = PacienteCalls.modificar_paciente(datos_completos_objeto)
    if respuesta is not None:
        resultado["mensaje"] = "00|Se modifico paciente con exito"
        resultado["paciente"] = paciente_schema.dump(respuesta)
        # Devolvemos la respuesta como JSON en la respuesta HTTP
        
    else:
        resultado["mensaje"] = "01|Error al modificar paciente"
        resultado["paciente"] = None
    return make_response(jsonify(resultado))
    
@app.route('/pacientes/CrearReposo', methods=['POST'])
@cross_origin()  # Para manejar problemas de CORS
def crear_reposos():
    
    # Obtenemos los datos del JSON enviado en la solicitud HTTP
    datos_completos = request.json

    # Llamamos al método registrar_datos del objeto registro_paciente
    respuesta = PacientesServices.registrar_reposo(datos_completos)

    # Devolvemos la respuesta como JSON en la respuesta HTTP
    return make_response(jsonify(respuesta))