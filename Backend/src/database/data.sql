
--DROP DATABASE IF EXISTS ipasprueba  WITH (FORCE);

INSERT INTO ROL (nombre) VALUES ('Administrador'),('Central de Citas'),('Asistencial'),('Recursos Humanos'),('Paciente');
INSERT INTO USUARIO (usuario, clave, nombre, rol_id) VALUES ('admin', 'admin', 'System',1), ('jeam', '1234', 'Jesus',1);
INSERT INTO GENERO (nombre) VALUES ('Masculino'),('Femenino');
INSERT INTO ESTADO_EMPLEADO (nombre) VALUES ('Activo'),('Inactivo'),('Jubilado');
INSERT INTO ESTADO_CITA (nombre) VALUES ('Agendada'),('Asistida'),('Cancelada');

INSERT INTO cargo (nombre) VALUES ('Medico'),('Enfermero'),('Docente'),('Administrativo'),('Obrero'),('Jefe'),('Encargado');
INSERT INTO dependencia (nombre) VALUES ('Nacional'),('Estadal');
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
