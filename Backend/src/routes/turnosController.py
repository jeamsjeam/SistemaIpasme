from flask import Blueprint, request, jsonify, make_response
from src import app
from ..calls.turnosCalls import TurnosCalls
from ..schemas.turnoSchema import turnos_schema
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/turnos', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_turnos():
    respuesta = TurnosCalls.get_turnos()
    return turnos_schema.dump(respuesta)