from flask import Blueprint, request, jsonify, make_response
from src import app
from ..services.citasServices import CitasServices
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/citas/agendar', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def agendar_cita():
    respuesta = CitasServices.agendar_cita(request.json)
    return make_response(jsonify(respuesta))

@app.route('/citas/paciente/mes', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_citas_paciente_mes():
    json = request.json
    respuesta = CitasServices.get_citas_paciente_mes(json['cedula'], json['fecha'])
    return respuesta