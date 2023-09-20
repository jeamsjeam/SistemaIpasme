from flask import Blueprint, request, jsonify, make_response
from src import app
from ..calls.estadoCitasCalls import EstadoCitasCalls
from ..schemas.estadoCitaSchema import estados_citas_schema
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/estados_citas', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_estados_citas():
    respuesta = EstadoCitasCalls.get_estados_citas()
    return estados_citas_schema.dump(respuesta)