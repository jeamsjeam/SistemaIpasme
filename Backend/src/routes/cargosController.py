from flask import Blueprint, request, jsonify, make_response
from src import app
from ..calls.cargosCalls import CargosCalls
from ..schemas.cargoSchema import cargos_schema
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/cargos', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_cargos():
    respuesta = CargosCalls.get_cargos()
    return cargos_schema.dump(respuesta)