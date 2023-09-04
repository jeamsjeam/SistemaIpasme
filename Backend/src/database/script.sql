CREATE DATABASE ipasme
USE ipasme

CREATE TABLE ROL (
    id BIGSERIAL PRIMARY KEY,
    nombre TEXT
);

CREATE TABLE USUARIO (
    id BIGSERIAL PRIMARY KEY,
    usuario TEXT,
    clave TEXT,
    nombre TEXT,
    rol_id BIGINT
);

ALTER TABLE USUARIO ADD CONSTRAINT FK_USU_ROL
    FOREIGN KEY (rol_id) REFERENCES ROL(id);

CREATE TABLE DEPENDENCIA (
    id BIGSERIAL PRIMARY KEY,
    nombre TEXT
);

CREATE TABLE CARGO (
    id BIGSERIAL PRIMARY KEY,
    nombre TEXT
);

CREATE TABLE ESTADO (
    id BIGSERIAL PRIMARY KEY,
    nombre TEXT
);

CREATE TABLE MUNICIPIO (
    id BIGSERIAL PRIMARY KEY,
    nombre TEXT,
    estado_id BIGINT
);

ALTER TABLE MUNICIPIO ADD CONSTRAINT FK_MUN_EST
    FOREIGN KEY (estado_id) REFERENCES ESTADO(id);

CREATE TABLE ESPECIALIDAD (
    id BIGSERIAL PRIMARY KEY,
    nombre TEXT,
    maximo_dias INT
);

CREATE TABLE GENERO (
    id BIGSERIAL PRIMARY KEY,
    nombre TEXT
);

CREATE TABLE TURNO (
    id BIGSERIAL PRIMARY KEY,
    nombre TEXT,
    hora_llegada TIMESTAMP,
    hora_salida TIMESTAMP
);

CREATE TABLE EMPLEADO (
    cedula BIGSERIAL PRIMARY KEY,
    nombre TEXT,
    apellido TEXT,
    fecha_nacimiento TIMESTAMP,
    direccion TEXT,
    telefono VARCHAR(11),
    especialidad_id BIGINT,
    cargo_id BIGINT,
    dependencia_id BIGINT,
    turno_id BIGINT,
    genero_id BIGINT
);

ALTER TABLE EMPLEADO ADD CONSTRAINT FK_EMP_ESP
    FOREIGN KEY (especialidad_id) REFERENCES ESPECIALIDAD(id);
ALTER TABLE EMPLEADO ADD CONSTRAINT FK_EMP_DEP
    FOREIGN KEY (dependencia_id) REFERENCES DEPENDENCIA(id);
ALTER TABLE EMPLEADO ADD CONSTRAINT FK_EMP_TUR
    FOREIGN KEY (turno_id) REFERENCES TURNO(id);
ALTER TABLE EMPLEADO ADD CONSTRAINT FK_EMP_CAR
    FOREIGN KEY (cargo_id) REFERENCES CARGO(id);
ALTER TABLE EMPLEADO ADD CONSTRAINT FK_EMP_GEN
    FOREIGN KEY (genero_id) REFERENCES GENERO(id);

CREATE TABLE PERMISO (
    id BIGSERIAL PRIMARY KEY,
    descripcion_motivo TEXT,
    fecha_inicio TIMESTAMP,
    fecha_fin TIMESTAMP,
    empleado_cedula BIGINT
);

ALTER TABLE PERMISO ADD CONSTRAINT FK_PER_EMP
    FOREIGN KEY (empleado_cedula) REFERENCES EMPLEADO(cedula);

CREATE TABLE ASISTENCIA (
    id BIGSERIAL PRIMARY KEY,
    hora_llegada TIMESTAMP,
    hora_salida TIMESTAMP,
    comentario TEXT,
    empleado_cedula BIGINT
);

ALTER TABLE ASISTENCIA ADD CONSTRAINT FK_ASI_EMP
    FOREIGN KEY (empleado_cedula) REFERENCES EMPLEADO(cedula);

CREATE TABLE PACIENTE (
    cedula BIGSERIAL PRIMARY KEY,
    nombre TEXT,
    apellido TEXT,
    institucion_laboral TEXT,
    fecha_nacimiento TIMESTAMP,
    direccion TEXT,
    telefono VARCHAR(11),
    cargo_id BIGINT,
    dependencia_id BIGINT,
    municipio_id BIGINT
);

ALTER TABLE PACIENTE ADD CONSTRAINT FK_PAC_DEP
    FOREIGN KEY (dependencia_id) REFERENCES DEPENDENCIA(id);
ALTER TABLE PACIENTE ADD CONSTRAINT FK_PAC_MUN
    FOREIGN KEY (municipio_id) REFERENCES MUNICIPIO(id);
ALTER TABLE PACIENTE ADD CONSTRAINT FK_PAC_CAR
    FOREIGN KEY (cargo_id) REFERENCES CARGO(id);

CREATE TABLE grupo_reposo (
    id BIGSERIAL PRIMARY KEY,
    paciente_cedula BIGINT,
    especialidad_id BIGINT,
    fecha_inicio TIMESTAMP
);

ALTER TABLE grupo_reposo ADD CONSTRAINT FK_GR_PAC
    FOREIGN KEY (paciente_cedula) REFERENCES PACIENTE(cedula);
ALTER TABLE grupo_reposo ADD CONSTRAINT FK_GR_ESP
    FOREIGN KEY (especialidad_id) REFERENCES ESPECIALIDAD(id);

CREATE TABLE reposo (
    id BIGSERIAL PRIMARY KEY,
    codigo_asistencial TEXT,
    codigo_registro TEXT,
    fecha_inicio TIMESTAMP,
    fecha_fin TIMESTAMP,
    quien_valida text,
    grupo_reposo_id BIGINT
);

ALTER TABLE reposo ADD CONSTRAINT FK_REP_GR
    FOREIGN KEY (grupo_reposo_id) REFERENCES grupo_reposo(id);
