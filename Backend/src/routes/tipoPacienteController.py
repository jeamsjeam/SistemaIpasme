from flask import Blueprint, request, jsonify, make_response
from src import app
from ..calls.tipoPacienteCalls import TipoPacienteCalls
from ..schemas.tipoPacienteSchema import tipos_paciente_schema
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/tiposPaciente', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_tipos_paciente():
    respuesta = TipoPacienteCalls.get_tipos_paciente()
    return tipos_paciente_schema.dump(respuesta)