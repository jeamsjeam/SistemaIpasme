from flask import Blueprint, request, jsonify, make_response
from src import app
from ..services.asistenciasServices import AsistenciasServices
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/asistencias/empleado/mes', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_asistencias_empleado_mes():
    json = request.json
    respuesta = AsistenciasServices.get_asistencias_empleado_mes(json['cedula'], json['fecha'])
    return respuesta