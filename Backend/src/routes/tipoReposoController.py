from flask import Blueprint, request, jsonify, make_response
from src import app
from ..calls.tipoReposoCall import TipoReposoCalls
from ..schemas.tipoReposoSchema import tipoReposo_schema
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/tipoReposo', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_tipo_reposo():
    respuesta = TipoReposoCalls.get_tipoReposo()
    return tipoReposo_schema.dump(respuesta)