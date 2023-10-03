from flask import Blueprint, request, jsonify, make_response, send_file
from src import app
from ..services.citasServices import CitasServices
from ..services.pacientesServices import PacientesServices
from ..services.empleadosServices import EmpleadosServices
from ..calls.citasCalls import CitasCalls
from flask_cors import cross_origin # Se utiliza para evitar el problema de cors
from io import BytesIO
import os
import pdb

@app.route('/citas/agendar', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def agendar_cita():
    variable = request.json
    print(variable)
    respuesta = CitasServices.agendar_cita(request.json)
    return make_response(jsonify(respuesta))

@app.route('/citas/paciente/mes', methods=['POST'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def get_citas_paciente_mes():
    json = request.json
    respuesta = CitasServices.get_citas_paciente_mes(json['usuario'], json['fecha'])
    return respuesta

@app.route('/citas/cambiarEstado/<int:id>/<int:estado>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def cita_cambiar_estado(id,estado):
    respuesta = CitasCalls.modificar_estado_cita(id,estado)
    if respuesta is not None:
        return make_response(jsonify("00|Se cambio el estado de la cita"))
    else:
        return make_response(jsonify("01|Error al cambiar el estado de la cita"))
    
@app.route('/citas/pdf/<nombre>/<int:cedula>/<int:cita>', methods=['GET'])
@cross_origin() # Se debe colocar en servicio para evitar problemas de cors
def buscar_cita_pdf(cedula,nombre,cita):

    # Obtén la ruta del directorio del script actual (donde se encuentra pacientesControllers.py)
    script_directory = os.path.dirname(os.path.abspath(__file__))

    # Retrocede cuatro niveles para llegar a la raíz del proyecto y luego entra en Frontend/css/imagenes/
    ruta_relativa_logo = '../../../Frontend/css/imagenes/ipaslogoMasPequeno.png'

    # Obtén la ruta absoluta completa al logo
    logo_path = os.path.normpath(os.path.join(script_directory, ruta_relativa_logo))

    pdf_path = ""
    titulo = ""

    if cita == 1:
        pacientes = PacientesServices.buscar_citas(cedula) 
        titulo = "Reporte Paciente Citas"
        # Llamar a la función para generar el PDF y obtener la ruta del archivo temporal
        pdf_path = CitasServices.create_pdf_citas(pacientes, logo_path, titulo,cita)

    else:
        empleado = EmpleadosServices.buscar_citas(cedula)  
        titulo = "Reporte Medico Citas"
        # Llamar a la función para generar el PDF y obtener la ruta del archivo temporal
        pdf_path = CitasServices.create_pdf_citas(empleado, logo_path, titulo,cita)

    # Devolver el PDF como una respuesta para descargar
    return send_file(
        pdf_path,
        download_name=nombre,
        as_attachment=True,
        mimetype='application/pdf'
    )