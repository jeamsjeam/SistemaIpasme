from ..models.paciente import Paciente
from fpdf import FPDF
import pdb

class GenerarPDF(FPDF):
    def __init__(self, logo_path, tipo, titulo):
        super().__init__()
        self.logo_path = logo_path
        self.tipo = tipo
        self.titulo = titulo

    def header(self):
        # Agregar imagen como logo (ajusta las coordenadas y dimensiones según tu necesidad)
        self.image(self.logo_path, 10, 8, 33)
        self.set_xy(0.0,0.0)
        self.set_font('Arial', 'B', 16)
        # self.set_text_color(76.0, 32.0 ,250.0)
        self.set_text_color(41, 0 ,199)
        self.cell(w=210.0, h=40.0, align='C', txt=self.titulo, border=0)
        
        if self.tipo == "pacientes":
            # Agregar cabeceras de columnas
            self.set_text_color(0.0, 0.0 ,0.0)
            self.set_xy(10.0,50.0)
            self.set_font('Arial', 'B', 12)
            self.cell(30, 10, 'Cedula', 1)
            self.cell(40, 10, 'Nombre', 1)
            self.cell(40, 10, 'Apellido', 1)
            self.cell(40, 10, 'Correo', 1)
            self.cell(30, 10, 'Días Reposo', 1)  # Agrega este campo solo para pacientes
            self.ln()

    def footer(self):
        # Posición en pie de página
        self.set_y(-15)
        # Número de página
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, 'Página ' + str(self.page_no()), 0, 0, 'C')
