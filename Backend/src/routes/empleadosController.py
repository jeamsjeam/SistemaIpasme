from flask import Blueprint, request, jsonify, make_response
from src import app
from ..services.empleadosServices import EmpleadosServices
from ..schemas.empleadoSchema import empleado_schema,empleados_schema
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/empleados', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_empleados():
    respuesta = EmpleadosServices.get()
    return empleados_schema.dump(respuesta)
    
@app.route('/empleados/<int:cedula>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def buscar_empleado(cedula):
    respuesta = EmpleadosServices.buscar(cedula)
    if respuesta is not None:
        return empleado_schema.dump(respuesta)
    else:
        return jsonify(None)

@app.route('/empleados/crear', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def crear_empleado():
    respuesta = EmpleadosServices.crear(request.json)
    return make_response(jsonify(respuesta))

@app.route('/empleados/modificar', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def modificar_empleado():
    respuesta = EmpleadosServices.modificar(request.json)
    return empleado_schema.dump(respuesta)

@app.route('/empleados/borrar/<int:id>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def borrar_empleado(id):
    respuesta = EmpleadosServices.borrar(id)
    return make_response(jsonify(respuesta))
