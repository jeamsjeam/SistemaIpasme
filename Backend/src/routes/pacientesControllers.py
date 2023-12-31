from flask import Blueprint, request, jsonify, make_response, send_file
from src import app
from ..services.pacientesServices import PacientesServices
from ..calls.pacienteCall import PacienteCalls
from ..calls.repososCalls import ReposoCalls
from ..schemas.pacienteSchema import paciente_schema,Pacientes_schema
from ..schemas.reposoSchema import reposo_schema,reposos_schema
from ..services.generarPDFServices import GenerarPDF
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors
from io import BytesIO
import os
import pdb

@app.route('/pacientes/<int:cedula>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def buscar_paciente(cedula):
    respuesta = PacientesServices.buscar(cedula)
    if respuesta is not None and len(respuesta) > 0:
        return make_response(jsonify(respuesta))
    else:
        return jsonify(None)
    
@app.route('/pacientes/citas/<int:cedula>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def buscar_paciente_citas(cedula):
    respuesta = PacientesServices.buscar_citas(cedula)
    
    if respuesta is not None and len(respuesta) > 0:
        return make_response(jsonify(respuesta))
    else:
        return jsonify(None)
    
@app.route('/pacientes', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def buscar_paciente_todos():
    respuesta = PacientesServices.buscarTodos()
    if respuesta is not None and len(respuesta) > 0:
        return make_response(jsonify(respuesta))
    else:
        return jsonify(None)
    
@app.route('/pacientes/<int:cedula>', methods=['DELETE'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def eliminar_paciente(cedula):
    respuesta = PacientesServices.eliminar_paciente(cedula)
    return make_response(jsonify(respuesta))
    
@app.route('/pacientes/registrarNuevo', methods=['POST'])
@cross_origin()  # Para manejar problemas de CORS
def registrar_datos_paciente_nuevo():
    
    # Obtenemos los datos del JSON enviado en la solicitud HTTP
    datos_completos = request.json

    # Llamamos al método registrar_datos del objeto registro_paciente
    respuesta = PacientesServices.registrar_datos_paciente_nuevo(datos_completos)

    # Devolvemos la respuesta como JSON en la respuesta HTTP
    return make_response(jsonify(respuesta))

@app.route('/pacientes/CrearPaciente', methods=['POST'])
@cross_origin()  # Para manejar problemas de CORS
def crear_paciente():
    
    # Obtenemos los datos del JSON enviado en la solicitud HTTP
    datos_completos = request.json

    # Llamamos al método registrar_datos del objeto registro_paciente
    respuesta = PacientesServices.crear_paciente(datos_completos)
    
    # Devolvemos la respuesta como JSON en la respuesta HTTP
    return make_response(jsonify(respuesta))

@app.route('/pacientes/ModificarPaciente', methods=['POST'])
@cross_origin()  # Para manejar problemas de CORS
def modificar_paciente():

    # Obtenemos los datos del JSON enviado en la solicitud HTTP
    datos_completos = request.json

    datos_completos_objeto = PacienteCalls.crear_obj_paciente(datos_completos)
    
    resultado = {}
    # Llamamos al método registrar_datos del objeto registro_paciente
    respuesta = PacienteCalls.modificar_paciente(datos_completos_objeto)
    if respuesta is not None:
        resultado["mensaje"] = "00|Se modifico paciente con exito"
        resultado["paciente"] = paciente_schema.dump(respuesta)
        # Devolvemos la respuesta como JSON en la respuesta HTTP
        
    else:
        resultado["mensaje"] = "01|Error al modificar paciente"
        resultado["paciente"] = None
    return make_response(jsonify(resultado))
    
@app.route('/pacientes/CrearReposo', methods=['POST'])
@cross_origin()  # Para manejar problemas de CORS
def crear_reposos():
    
    # Obtenemos los datos del JSON enviado en la solicitud HTTP
    datos_completos = request.json

    # Llamamos al método registrar_datos del objeto registro_paciente
    respuesta = PacientesServices.registrar_reposo(datos_completos)

    # Devolvemos la respuesta como JSON en la respuesta HTTP
    return make_response(jsonify(respuesta))

@app.route('/pacientes/solo/<int:cedula>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def buscar_paciente_solo(cedula):
    respuesta = PacienteCalls.get_paciente_cedula(cedula)
    if respuesta is not None:
        return make_response(jsonify(paciente_schema.dump(respuesta)))
    else:
        return jsonify(None)
    
@app.route('/pacientes/reposo/<int:id>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def buscar_paciente_reposo(id):
    respuesta = ReposoCalls.get_reposo_id(id)
    if respuesta is not None:
        return make_response(jsonify(reposo_schema.dump(respuesta)))
    else:
        return jsonify(None)
    
@app.route('/pacientes/reposo/ModificarReposo', methods=['POST'])
@cross_origin()  # Para manejar problemas de CORS
def modificar_reposo():

    # Obtenemos los datos del JSON enviado en la solicitud HTTP
    datos_completos = request.json

    datos_completos_objeto = ReposoCalls.retornar_obj_reposo(datos_completos)

    # Llamamos al método registrar_datos del objeto registro_paciente
    respuesta = ReposoCalls.modificar_reposo(datos_completos_objeto,datos_completos["id"])
    if respuesta is not None:
        return make_response(jsonify("00|Se modifico el reposo con exito"))
        # Devolvemos la respuesta como JSON en la respuesta HTTP
    else:
        return make_response(jsonify("01|Error al modificar el reposo"))
    
    
@app.route('/pacientes/reposo/<int:id>', methods=['DELETE'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def eliminar_reposo(id):
    respuesta = ReposoCalls.borrar_reposo(id)
    return make_response(jsonify(respuesta))

@app.route('/pacientes/pdf/<nombre>', methods=['GET'])
@cross_origin()  # Se debe colocar en servicio para evitar problemas de cors
def generar_pdf_pacientes(nombre):
    pacientes = PacientesServices.buscarTodos()  # Obtener datos de pacientes (reemplaza esto con tu lógica para obtener los pacientes)

    # Obtén la ruta del directorio del script actual (donde se encuentra pacientesControllers.py)
    script_directory = os.path.dirname(os.path.abspath(__file__))

    # Retrocede cuatro niveles para llegar a la raíz del proyecto y luego entra en Frontend/css/imagenes/
    ruta_relativa_logo = '../../../Frontend/css/imagenes/ipaslogoMasPequeno.png'

    # Obtén la ruta absoluta completa al logo
    logo_path = os.path.normpath(os.path.join(script_directory, ruta_relativa_logo))

    # Llamar a la función para generar el PDF y obtener la ruta del archivo temporal
    pdf_path = PacientesServices.create_pdf_pacientes(pacientes, logo_path, "Reporte Pacientes","pacientes")

    # Devolver el PDF como una respuesta para descargar
    return send_file(
        pdf_path,
        download_name=nombre,
        as_attachment=True,
        mimetype='application/pdf'
    )

@app.route('/pacientes/individualPDF/<nombre>/<int:cedula>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def buscar_paciente_individual_pdf(cedula,nombre):
    respuesta = PacientesServices.buscar(cedula)
    # Obtén la ruta del directorio del script actual (donde se encuentra pacientesControllers.py)
    script_directory = os.path.dirname(os.path.abspath(__file__))

    # Retrocede cuatro niveles para llegar a la raíz del proyecto y luego entra en Frontend/css/imagenes/
    ruta_relativa_logo = '../../../Frontend/css/imagenes/ipaslogoMasPequeno.png'

    # Obtén la ruta absoluta completa al logo
    logo_path = os.path.normpath(os.path.join(script_directory, ruta_relativa_logo))

    # Llamar a la función para generar el PDF y obtener la ruta del archivo temporal
    pdf_path = PacientesServices.create_pdf_pacientes(respuesta, logo_path, "Reporte Paciente","pacienteIndividual")

    # Devolver el PDF como una respuesta para descargar
    return send_file(
        pdf_path,
        download_name=nombre,
        as_attachment=True,
        mimetype='application/pdf'
    )