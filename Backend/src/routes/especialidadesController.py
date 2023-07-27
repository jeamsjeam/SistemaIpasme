from flask import Blueprint, request, jsonify, make_response
from src import app
from ..calls.especialidadesCalls import EspecialidadesCalls
from ..schemas.especialidadSchema import especialidades_schema
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/especialidades', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_especialidades():
    respuesta = EspecialidadesCalls.get_especialidades()
    return especialidades_schema.dump(respuesta)