
--DROP DATABASE IF EXISTS ipasprueba  WITH (FORCE);

INSERT INTO ROL (nombre) VALUES ('Administrador'),('Central de Citas'),('Asistencial'),('Recursos Humanos'),('Paciente');
INSERT INTO USUARIO (usuario, clave, nombre, rol_id) VALUES ('admin', 'admin', 'System',1), ('jeam', '1234', 'Jesus',1);
INSERT INTO GENERO (nombre) VALUES ('Masculino'),('Femenino');
INSERT INTO ESTADO_EMPLEADO (nombre) VALUES ('Activo'),('Inactivo'),('Jubilado');
INSERT INTO ESTADO_CITA (nombre) VALUES ('Agendada'),('Asistida'),('Cancelada'),('No Asistio');

INSERT INTO cargo (nombre) VALUES ('Medico'),('Enfermero'),('Docente'),('Administrativo'),('Obrero'),('Jefe'),('Encargado'),('Otro');
INSERT INTO dependencia (nombre) VALUES ('Nacional'),('Estadal'),('Otro');
INSERT INTO especialidad (nombre, consultas) VALUES ('Odontologia', '1'),('Medicina interna', '1'),
('Pediatria','1'),('Administrativo','0'),('Obrero','0'),('Seguridad','0'),('Limpieza','0');
INSERT INTO tipo_reposo (nombre,maximo_dias) VALUES ('General',63),('Especial',80);
INSERT INTO tipo_paciente (nombre) VALUES ('Afiliado'),('Beneficiario');
INSERT INTO estado (nombre) VALUES ('Tachira'),('Merida'),('Zulia'),('Trujillo'),('Apure');
INSERT INTO municipio (nombre) VALUES ('Junin'),('Ayacucho'),('Libertador'),('San Cristóbal'),('Lobatera');

INSERT INTO turno (nombre,hora_llegada,hora_salida) VALUES ('Turno Prueba','2023-09-05 00:00:00.307429','2023-09-05 00:00:00.307429');

INSERT INTO EMPLEADO(cedula,nombre,apellido,fecha_nacimiento,direccion,telefono,especialidad_id,cargo_id,dependencia_id,turno_id,genero_id,estado_empleado_id)
VALUES(1111111,'Prueba','Prueba',current_timestamp,'Prueba','11111111',1,1,1,1,1,1);

INSERT INTO ASISTENCIA (comentario, hora_llegada, hora_salida, empleado_cedula) 
VALUES ('A tiempo', current_timestamp, current_timestamp,1111111);

INSERT INTO PERMISO (descripcion_motivo,fecha_inicio,fecha_fin,empleado_cedula)
VALUES ('Permiso por comision de servicio', '2023-09-04 00:00:00.307429', '2023-09-06 00:00:00.307429', 1111111);

--INSERT INTO DEPENDENCIA (nombre) VALUES ('');
--INSERT INTO DEPENDENCIA (nombre) VALUES ('');
/*
POST
http://127.0.0.1:5000/pacientes/CrearPaciente
{
  "cedula": 19925000,
  "nombre": "Oscar",
  "apellido": "Perez",
  "institucion_laboral": "Hospital ABC",
  "fecha_nacimiento": "1985-05-10",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 1,
  "dependencia_id": 2,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}
{
  "cedula": 19925001,
  "nombre": "Pedro",
  "apellido": "Zambrano",
  "institucion_laboral": "Hospital ABC",
  "fecha_nacimiento": "1985-05-10",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "",
  "cargo_id": 2,
  "dependencia_id": 1,
  "municipio_id": 3,
  "tipo_paciente_id": 1
}
http://127.0.0.1:5000/pacientes/CrearReposo
{
  "cedula": 19925000,
  "grupo_reposo_fecha_inicio": "2020-08-01",
  "tipo_reposo_id": 1,
  "reposos": [
    {
      "codigo_asistencial": "COD123",
      "codigo_registro": "REG456",
      "fecha_inicio": "2020-08-01",
      "fecha_fin": "2020-08-10",
      "quien_valida": "Dr. Validador"
    },
    {
      "codigo_asistencial": "COD789",
      "codigo_registro": "REG012",
      "fecha_inicio": "2020-08-15",
      "fecha_fin": "2020-08-20",
      "quien_valida": "Dra. Validadora"
    },
    {
      "codigo_asistencial": "COD123",
      "codigo_registro": "REG456",
      "fecha_inicio": "2020-08-11",
      "fecha_fin": "2020-08-14",
      "quien_valida": "Dr. Validador"
    },
    {
      "codigo_asistencial": "COD789",
      "codigo_registro": "REG012",
      "fecha_inicio": "2020-08-21",
      "fecha_fin": "2020-08-25",
      "quien_valida": "Dra. Validadora"
    }
  ]
}
*/