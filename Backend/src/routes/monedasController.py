from flask import Blueprint, request, jsonify, make_response
from src import app
from ..calls.monedasCalls import MonedasCalls
from ..schemas.monedaSchema import moneda_schema,monedas_schema
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors

@app.route('/monedas', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_monedas():
    respuesta = MonedasCalls.get_monedas()
    if respuesta is not None:
        return monedas_schema.dump(respuesta)
    else:
        return jsonify(None)