from flask import Blueprint, request, jsonify, make_response
from src import app
from ..calls.estadoEmpleadosCalls import EstadoEmpleadosCalls
from ..schemas.estadoEmpleadoSchema import estados_empleados_schema
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/estados_empleados', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_estados_empleados():
    respuesta = EstadoEmpleadosCalls.get_estados_empleados()
    return estados_empleados_schema.dump(respuesta)