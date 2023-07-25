from flask import Blueprint, request, jsonify, make_response
from src import app
from ..services.usuariosServices import UsuariosServices
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/usuarios/login', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def login():
    respuesta = UsuariosServices.login(request.json['usuario'], request.json['clave'])
    return make_response(jsonify(respuesta)) 
    
@app.route('/usuarios/register', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def register():
    respuesta = UsuariosServices.register(request.json)
    return make_response(jsonify(respuesta))
    
