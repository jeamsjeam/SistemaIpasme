from flask import Blueprint, request, jsonify, make_response
from src import app
from ..services.usuariosServices import UsuariosServices
from ..schemas.usuarioSchema import usuario_schema,usuarios_schema
from ..schemas.rolSchema import rol_schema
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

@app.route('/usuarios/<usuario>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def usuari_rol_por_nombre(usuario):
    respuesta = UsuariosServices.usuari_rol_por_nombre(usuario)
    rol = usuario_schema.dump(respuesta)
    if rol is not None and len(rol) > 0:
        return make_response(jsonify(rol['nombre']))
    else:
        return make_response(jsonify(rol))
    
