
--DROP DATABASE IF EXISTS ipasprueba  WITH (FORCE);
--DROP DATABASE IF EXISTS ipas  WITH (FORCE);

INSERT INTO ROL (nombre) VALUES ('Administrador'),('Central de Citas'),('Asistencial'),('Recursos Humanos'),('Paciente');
INSERT INTO USUARIO (usuario, clave, nombre, rol_id) VALUES ('admin', 'admin', 'System',1), ('jeam', '1234', 'Jesus',1);
INSERT INTO GENERO (nombre) VALUES ('Masculino'),('Femenino');
INSERT INTO ESTADO_EMPLEADO (nombre) VALUES ('Activo'),('Inactivo'),('Jubilado');
INSERT INTO ESTADO_CITA (nombre) VALUES ('Agendada'),('Asistida'),('Cancelada'),('No Asistio');
INSERT INTO MONEDA (nombre, simbolo) VALUES ('Bolívares', 'BS'),('Dólares', 'USD'),('Pesos Colombianos', 'COP');
INSERT INTO MONEDERO (nombre, saldo, moneda_id, usuario_id) VALUES ('Central', 0, 1,1);
INSERT INTO cargo (nombre) VALUES ('Medico'),('Enfermero'),('Docente'),('Administrativo'),('Obrero'),('Jefe'),('Encargado'),('Otro');
INSERT INTO dependencia (nombre) VALUES ('Nacional'),('Estadal'),('Otro');
INSERT INTO especialidad (nombre, consultas) VALUES ('Odontologia', '1'),('Medicina interna', '1'),
('Pediatria','1'),('Administrativo','0'),('Obrero','0'),('Seguridad','0'),('Limpieza','0'),
('Otros','0'),
('Medicina Familiar','1'),
('Medicina General','1'),
('Ginecologia y Obstetricia','1'),
('Imagenologia','1'),
('Cardiologia','1'),
('Nutricion','1'),
('Psicologia','1'),
('Nefrologia','1'),
('Otorrino','1'),
('Traumatologia','1');
INSERT INTO tipo_reposo (nombre,maximo_dias) VALUES ('General',90),('Especial',90);
INSERT INTO tipo_paciente (nombre) VALUES ('Afiliado'),('Beneficiario');
INSERT INTO estado (nombre) VALUES ('Tachira'),('Merida'),('Zulia'),('Trujillo'),('Apure');
INSERT INTO municipio (nombre) VALUES ('Junin'),('Ayacucho'),('Libertador'),('San Cristóbal'),('Lobatera');

INSERT INTO turno (nombre,hora_llegada,hora_salida) VALUES 
('Mañana','2023-09-05 08:00:00.307429','2023-09-05 12:00:00.307429'),
('Tarde','2023-09-05 13:00:00.307429','2023-09-05 17:00:00.307429');

INSERT INTO EMPLEADO(cedula,nombre,apellido,fecha_nacimiento,direccion,telefono,especialidad_id,cargo_id,dependencia_id,turno_id,genero_id,estado_empleado_id)
VALUES(3450035,'Juan','Pérez', '1975-08-12', 'Calle 1 Casa 1', '04148563254', 1, 1, 1, 1, 1, 1);

INSERT INTO EMPLEADO(cedula,nombre,apellido,fecha_nacimiento,direccion,telefono,especialidad_id,cargo_id,dependencia_id,turno_id,genero_id,estado_empleado_id)
VALUES(4205340,'María','González', '1982-04-25', 'Calle 2 Casa 1', '04148563254', 2, 1, 2, 1, 2, 1);

INSERT INTO EMPLEADO(cedula,nombre,apellido,fecha_nacimiento,direccion,telefono,especialidad_id,cargo_id,dependencia_id,turno_id,genero_id,estado_empleado_id)
VALUES(4550348,'Luis','Martínez', '1968-11-08', 'Calle 3 Casa 1', '04148563254', 1, 1, 2, 2, 1, 1);

INSERT INTO EMPLEADO(cedula,nombre,apellido,fecha_nacimiento,direccion,telefono,especialidad_id,cargo_id,dependencia_id,turno_id,genero_id,estado_empleado_id)
VALUES(8743215,'Ana','Hernández', '1972-06-15', 'Calle 1 Casa 1', '04148563254', 2, 1, 1, 2, 2, 1);

INSERT INTO EMPLEADO(cedula,nombre,apellido,fecha_nacimiento,direccion,telefono,especialidad_id,cargo_id,dependencia_id,turno_id,genero_id,estado_empleado_id)
VALUES(15672943,'Carlos','López', '1988-09-30', 'Calle 2 Casa 1', '04148563254', 3, 1, 1, 1, 1, 1);

INSERT INTO EMPLEADO(cedula,nombre,apellido,fecha_nacimiento,direccion,telefono,especialidad_id,cargo_id,dependencia_id,turno_id,genero_id,estado_empleado_id)
VALUES(5892301,'Elena','Díaz', '1977-03-22', 'Calle 3 Casa 1', '04148563254', 3, 1, 1, 2, 2, 1);

INSERT INTO EMPLEADO(cedula,nombre,apellido,fecha_nacimiento,direccion,telefono,especialidad_id,cargo_id,dependencia_id,turno_id,genero_id,estado_empleado_id)
VALUES(20134567,'Javier','Ramírez', '1965-07-18', 'Calle 1 Casa 1', '04148563254', 3, 1, 1, 1, 1, 1);

INSERT INTO EMPLEADO(cedula,nombre,apellido,fecha_nacimiento,direccion,telefono,especialidad_id,cargo_id,dependencia_id,turno_id,genero_id,estado_empleado_id)
VALUES(6543219,'Sara','Torres', '1979-12-05', 'Calle 2 Casa 1', '04148563254', 4, 4, 2, 1, 2, 1);

INSERT INTO EMPLEADO(cedula,nombre,apellido,fecha_nacimiento,direccion,telefono,especialidad_id,cargo_id,dependencia_id,turno_id,genero_id,estado_empleado_id)
VALUES(10287654,'Martín','Gómez', '1986-02-14', 'Calle 3 Casa 1', '04148563254', 4, 4, 1, 1, 1, 1);

INSERT INTO EMPLEADO(cedula,nombre,apellido,fecha_nacimiento,direccion,telefono,especialidad_id,cargo_id,dependencia_id,turno_id,genero_id,estado_empleado_id)
VALUES(25674321,'Laura','Rodríguez', '1990-10-28', 'Calle 1 Casa 1', '04148563254', 4, 4, 3, 2, 2, 1);

/*
POST
http://127.0.0.1:5000/pacientes/CrearPaciente
{
  "cedula": 19925000,
  "nombre": "Oscar",
  "apellido": "Perez",
  "institucion_laboral": "UECLA",
  "fecha_nacimiento": "1985-05-10",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 2,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 29424001,
  "nombre": "Pedro",
  "apellido": "Zambrano",
  "institucion_laboral": "UECLA",
  "fecha_nacimiento": "1990-01-05",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 1,
  "municipio_id": 3,
  "tipo_paciente_id": 1
}

{
  "cedula": 12003500,
  "nombre": "Ana",
  "apellido": "Lopez",
  "institucion_laboral": "UECLA",
  "fecha_nacimiento": "1965-08-23",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 2,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 19925467,
  "nombre": "Oscar",
  "apellido": "Perez",
  "institucion_laboral": "UECLA",
  "fecha_nacimiento": "1985-05-10",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 2,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 19925890,
  "nombre": "Oscar",
  "apellido": "Perez",
  "institucion_laboral": "UECLA",
  "fecha_nacimiento": "1985-05-10",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 2,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 19925901,
  "nombre": "Oscar",
  "apellido": "Perez",
  "institucion_laboral": "UECLA",
  "fecha_nacimiento": "1985-05-10",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 1,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 19925567,
  "nombre": "Oscar",
  "apellido": "Perez",
  "institucion_laboral": "UECLA",
  "fecha_nacimiento": "1985-05-10",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 1,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 12457230,
  "nombre": "Laura",
  "apellido": "Ramirez",
  "institucion_laboral": "Escuela Primavera",
  "fecha_nacimiento": "1972-09-14",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 2,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 28369542,
  "nombre": "Diego",
  "apellido": "Fernandez",
  "institucion_laboral": "Colegio Aurora",
  "fecha_nacimiento": "1998-03-27",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 1,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 21476539,
  "nombre": "Gabriela",
  "apellido": "Perez",
  "institucion_laboral": "Liceo Del Sol",
  "fecha_nacimiento": "1985-07-19",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 2,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 19827365,
  "nombre": "Santiago",
  "apellido": "Garcia",
  "institucion_laboral": "Colegio Los Olivos",
  "fecha_nacimiento": "1991-11-02",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 2,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 30671245,
  "nombre": "Valentina",
  "apellido": "Martinez",
  "institucion_laboral": "Escuela Arco Iris",
  "fecha_nacimiento": "2000-05-30",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 1,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 16784529,
  "nombre": "Daniel",
  "apellido": "Lopez",
  "institucion_laboral": "Colegio San Pedro",
  "fecha_nacimiento": "1978-12-05",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 2,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 25893014,
  "nombre": "Carolina",
  "apellido": "Gutierrez",
  "institucion_laboral": "Escuela Bella Vista",
  "fecha_nacimiento": "1983-06-20",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 1,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 19374682,
  "nombre": "Sebastian",
  "apellido": "Castro",
  "institucion_laboral": "Liceo Los Pinos",
  "fecha_nacimiento": "1992-09-15",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 1,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 31247560,
  "nombre": "Isabel",
  "apellido": "Torres",
  "institucion_laboral": "Colegio Montessori",
  "fecha_nacimiento": "1986-04-18",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 1,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 27654389,
  "nombre": "Alejandro",
  "apellido": "Hernandez",
  "institucion_laboral": "Escuela San Francisco",
  "fecha_nacimiento": "1995-10-09",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 1,
  "municipio_id": 1,
  "tipo_paciente_id": 1
}

{
  "cedula": 28653389,
  "nombre": "Marta",
  "apellido": "Hernandez",
  "institucion_laboral": "Escuela San Francisco",
  "fecha_nacimiento": "1995-10-09",
  "direccion": "Calle 123, Ciudad",
  "telefono": "04147863456",
  "correo": "prueba@gmail.com",
  "cargo_id": 3,
  "dependencia_id": 1,
  "municipio_id": 1,
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