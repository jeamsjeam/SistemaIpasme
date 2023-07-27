from flask import Blueprint, request, jsonify, make_response
from src import app
from ..calls.dependenciasCalls import DependenciasCalls
from ..schemas.dependenciaSchema import dependecias_schema
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/dependencias', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_dependencias():
    respuesta = DependenciasCalls.get_dependencias()
    return dependecias_schema.dump(respuesta)