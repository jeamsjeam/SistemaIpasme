from flask import Blueprint, request, jsonify, make_response
from src import app
from ..calls.municipiosCalls import MunicipiosCalls
from ..schemas.municipioSchema import municipios_schema
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/municipios', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_municipios():
    respuesta = MunicipiosCalls.get_municipios()
    return municipios_schema.dump(respuesta)