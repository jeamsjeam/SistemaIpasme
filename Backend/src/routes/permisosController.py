from flask import Blueprint, request, jsonify, make_response
from src import app
from ..services.permisosServices import PermisosServices
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/permisos/registrar', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def registrar_permiso():
    respuesta = PermisosServices.registrarPermiso(request.json)
    return make_response(jsonify(respuesta))

@app.route('/permisos/consultar', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_permisos_cedula_fecha(): 
    json = request.json
    respuesta = PermisosServices.get_permisos_cedula_fecha(json['cedula'], json['fechaInicio'], json['fechaFin'])
    return make_response(jsonify(respuesta))