from flask import Blueprint, request, jsonify, make_response
from src import app
from ..services.pacientesServices import PacientesServices
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/pacientes/<int:cedula>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def buscar_paciente(cedula):
    respuesta = PacientesServices.buscar(cedula)
    if respuesta is not None and len(respuesta) > 0:
        return respuesta
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