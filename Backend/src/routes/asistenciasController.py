from flask import Blueprint, request, jsonify, make_response
from src import app
from ..services.asistenciasServices import AsistenciasServices
from ..services.empleadosServices import EmpleadosServices
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/asistencias/empleado/mes', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_asistencias_empleado_mes():
    json = request.json
    respuesta = AsistenciasServices.get_asistencias_empleado_mes(json['cedula'], json['fecha'])
    return respuesta

@app.route('/asistencias/empleado/reporte', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_asistencias_permisos_reporte():
    json = request.json
    empleados = EmpleadosServices.get_empleados_turno()
    respuesta = AsistenciasServices.get_asistencias_permisos_reporte(empleados, json['fecha'])
    return respuesta

@app.route('/asistencias/empleado', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_asistencias_empleado_dia():
    json = request.json
    respuesta = AsistenciasServices.get_asistencias_empleado_dia(json['cedula'], json['fecha'])
    return respuesta

@app.route('/asistencias/registrarEntrada', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def registrar_entrada():
    respuesta = AsistenciasServices.registrar_entrada(request.json)
    return make_response(jsonify(respuesta))

@app.route('/asistencias/registrarSalida', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def registrar_salida():
    respuesta = AsistenciasServices.registrar_salida(request.json)
    return make_response(jsonify(respuesta))