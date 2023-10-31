from flask import Blueprint, request, jsonify, make_response
from src import app
from ..services.monederosServices import MonederosServices
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/monederos', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_monederos():
    return MonederosServices.get()

@app.route('/monederos/crear', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def crear_monedero():
    respuesta = MonederosServices.crear(request.json)
    return make_response(jsonify(respuesta))

@app.route('/monederos/modificar', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def modificar_monedero():
    return MonederosServices.modificar(request.json)

@app.route('/monederos/borrar/<int:id>', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def borrar_monedero(id):
    respuesta = MonederosServices.borrar(id)
    return make_response(jsonify(respuesta))