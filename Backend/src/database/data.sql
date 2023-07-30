INSERT INTO ROL (nombre) VALUES ('Administrador'),('Estandar');
INSERT INTO USUARIO (usuario, clave, nombre, rol_id) VALUES ('admin', 'admin', 'System',1);
INSERT INTO GENERO (nombre) VALUES ('Masculino'),('Femenino');

INSERT INTO cargo (nombre) VALUES ('Cargo1'),('Cargo2');
INSERT INTO dependencia (nombre) VALUES ('Dependencia1'),('Dependencia2');
INSERT INTO especialidad (nombre,maximo_dias) VALUES ('Especialidad1',63),('Especialidad2',63);
INSERT INTO estado (nombre) VALUES ('Tachira'),('Merida'),('Zulia'),('Trujillo'),('Apure');
INSERT INTO municipio (nombre) VALUES ('Junin'),('Ayacucho'),('Libertador'),('San Cristóbal'),('Lobatera');

INSERT INTO turno (nombre,hora_llegada,hora_salida) VALUES ('Turno Prueba',current_timestamp,current_timestamp);

INSERT INTO EMPLEADO(cedula,nombre,apellido,fecha_nacimiento,direccion,telefono,especialidad_id,cargo_id,dependencia_id,turno_id,genero_id)
VALUES(1111111,'Prueba','Prueba',current_timestamp,'Prueba','11111111',1,1,1,1,1);

--INSERT INTO DEPENDENCIA (nombre) VALUES ('');
--INSERT INTO DEPENDENCIA (nombre) VALUES ('');
