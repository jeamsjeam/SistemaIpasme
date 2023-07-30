from flask import Blueprint, request, jsonify, make_response
from src import app
from ..services.turnosServices import TurnosServices
from ..schemas.turnoSchema import turnos_schema, turno_schema
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/turnos', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_turnos():
    respuesta = TurnosServices.get()
    return turnos_schema.dump(respuesta)

@app.route('/turnos/<int:id>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def buscar_turno(id):
    respuesta = TurnosServices.buscar(id)
    if respuesta is not None:
        return turno_schema.dump(respuesta)
    else:
        return jsonify(None)
    
@app.route('/turnos/crear', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def crear_turno():
    respuesta = TurnosServices.crear(request.json)
    return make_response(jsonify(respuesta))

@app.route('/turnos/modificar', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def modificar_turno():
    respuesta = TurnosServices.modificar(request.json)
    return turno_schema.dump(respuesta)

@app.route('/turnos/borrar/<int:id>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def borrar_turno(id):
    respuesta = TurnosServices.borrar(id)
    return make_response(jsonify(respuesta))