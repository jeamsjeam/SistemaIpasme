from flask import Blueprint, request, jsonify, make_response
from src import app
from ..services.movimientosMonederoServices import MovimientosMonederoServices
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/movimientos/<int:id>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_movimientos_monedero(monedero_id):
    return MovimientosMonederoServices.get_movimientos_monedero(monedero_id)

@app.route('/movimientos/guardar', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def crear_movimiento():
    respuesta = MovimientosMonederoServices.crear(request.json)
    return make_response(jsonify(respuesta))
