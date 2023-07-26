from flask import Blueprint, request, jsonify, make_response
from src import app
from ..calls.generoCalls import GenerosCalls
from ..schemas.generoSchema import generos_schema
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/generos', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_generos():
    respuesta = GenerosCalls.get_generos()
    return generos_schema.dump(respuesta)