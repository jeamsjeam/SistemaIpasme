from flask import Blueprint, request, jsonify, make_response
from src import app
from ..services.empleadosServices import EmpleadosServices
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/empleados', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_empleados():
    respuesta = EmpleadosServices.get()
    return respuesta
    
@app.route('/empleados/<int:cedula>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def buscar_empleado(cedula):
    respuesta = EmpleadosServices.buscar(cedula)
    if respuesta is not None:
        return respuesta
    else:
        return jsonify(None)

@app.route('/empleados/guardar', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def guardar_empleado():
    respuesta = EmpleadosServices.guardar(request.json)
    return make_response(jsonify(respuesta))

@app.route('/empleados/borrar/<int:id>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def borrar_empleado(id):
    respuesta = EmpleadosServices.borrar(id)
    return make_response(jsonify(respuesta))

@app.route('/empleados/agrupadosEspecialidad', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_empleados_especialidad():
    return EmpleadosServices.get_empleados_especialidad(id)
