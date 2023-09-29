from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# create the application instance
app = Flask(__name__)

#postgresql://postgres:admin@localhost:5432/ipasme
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:admin@localhost:5432/ipasprueba"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# create the application database instance
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from .models import asistencia,cargo,dependencia,empleado,tipo_reposo,especialidad,estado,genero,grupo_reposo,municipio,paciente,permiso,reposo,rol,turno,usuario, estado_empleado, cita, tipo_paciente, estado_cita
from .routes import  usuariosController,municipiosControllers, pacientesControllers, rolesController, generosController, turnosController, cargosController, empleadosController, dependenciasController, especialidadesController, tipoReposoController, estadoEmpleadosController, asistenciasController, permisosController, tipoPacienteController, citasController, estadoCitasController