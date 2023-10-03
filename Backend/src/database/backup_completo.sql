PGDMP     #                	    {            ipas    14.5    14.5 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    1188663    ipas    DATABASE     c   CREATE DATABASE ipas WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE ipas;
                postgres    false            �            1259    1188833 
   asistencia    TABLE     �   CREATE TABLE public.asistencia (
    id bigint NOT NULL,
    comentario text NOT NULL,
    hora_llegada timestamp without time zone,
    hora_salida timestamp without time zone,
    empleado_cedula bigint
);
    DROP TABLE public.asistencia;
       public         heap    postgres    false            �            1259    1188832    asistencia_id_seq    SEQUENCE     z   CREATE SEQUENCE public.asistencia_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.asistencia_id_seq;
       public          postgres    false    237            �           0    0    asistencia_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.asistencia_id_seq OWNED BY public.asistencia.id;
          public          postgres    false    236            �            1259    1188665    cargo    TABLE     G   CREATE TABLE public.cargo (
    id bigint NOT NULL,
    nombre text
);
    DROP TABLE public.cargo;
       public         heap    postgres    false            �            1259    1188664    cargo_id_seq    SEQUENCE     u   CREATE SEQUENCE public.cargo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.cargo_id_seq;
       public          postgres    false    210            �           0    0    cargo_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.cargo_id_seq OWNED BY public.cargo.id;
          public          postgres    false    209            �            1259    1188910    cita    TABLE     �   CREATE TABLE public.cita (
    id bigint NOT NULL,
    nota text,
    empleado_cedula bigint,
    paciente_cedula bigint,
    fecha timestamp without time zone NOT NULL,
    estado_cita_id bigint
);
    DROP TABLE public.cita;
       public         heap    postgres    false            �            1259    1188909    cita_id_seq    SEQUENCE     t   CREATE SEQUENCE public.cita_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.cita_id_seq;
       public          postgres    false    244            �           0    0    cita_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.cita_id_seq OWNED BY public.cita.id;
          public          postgres    false    243            �            1259    1188674    dependencia    TABLE     M   CREATE TABLE public.dependencia (
    id bigint NOT NULL,
    nombre text
);
    DROP TABLE public.dependencia;
       public         heap    postgres    false            �            1259    1188673    dependencia_id_seq    SEQUENCE     {   CREATE SEQUENCE public.dependencia_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.dependencia_id_seq;
       public          postgres    false    212            �           0    0    dependencia_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.dependencia_id_seq OWNED BY public.dependencia.id;
          public          postgres    false    211            �            1259    1188765    empleado    TABLE     s  CREATE TABLE public.empleado (
    cedula bigint NOT NULL,
    nombre text NOT NULL,
    apellido text NOT NULL,
    fecha_nacimiento timestamp without time zone,
    direccion text,
    telefono character varying(11),
    especialidad_id bigint,
    cargo_id bigint,
    dependencia_id bigint,
    turno_id bigint,
    genero_id bigint,
    estado_empleado_id bigint
);
    DROP TABLE public.empleado;
       public         heap    postgres    false            �            1259    1188692    especialidad    TABLE     n   CREATE TABLE public.especialidad (
    id bigint NOT NULL,
    nombre text,
    consultas boolean NOT NULL
);
     DROP TABLE public.especialidad;
       public         heap    postgres    false            �            1259    1188691    especialidad_id_seq    SEQUENCE     |   CREATE SEQUENCE public.especialidad_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.especialidad_id_seq;
       public          postgres    false    216            �           0    0    especialidad_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.especialidad_id_seq OWNED BY public.especialidad.id;
          public          postgres    false    215            �            1259    1188701    estado    TABLE     H   CREATE TABLE public.estado (
    id bigint NOT NULL,
    nombre text
);
    DROP TABLE public.estado;
       public         heap    postgres    false            �            1259    1188757    estado_cita    TABLE     M   CREATE TABLE public.estado_cita (
    id bigint NOT NULL,
    nombre text
);
    DROP TABLE public.estado_cita;
       public         heap    postgres    false            �            1259    1188756    estado_cita_id_seq    SEQUENCE     {   CREATE SEQUENCE public.estado_cita_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.estado_cita_id_seq;
       public          postgres    false    230            �           0    0    estado_cita_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.estado_cita_id_seq OWNED BY public.estado_cita.id;
          public          postgres    false    229            �            1259    1188739    estado_empleado    TABLE     Q   CREATE TABLE public.estado_empleado (
    id bigint NOT NULL,
    nombre text
);
 #   DROP TABLE public.estado_empleado;
       public         heap    postgres    false            �            1259    1188738    estado_empleado_id_seq    SEQUENCE        CREATE SEQUENCE public.estado_empleado_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.estado_empleado_id_seq;
       public          postgres    false    226            �           0    0    estado_empleado_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.estado_empleado_id_seq OWNED BY public.estado_empleado.id;
          public          postgres    false    225            �            1259    1188700    estado_id_seq    SEQUENCE     v   CREATE SEQUENCE public.estado_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.estado_id_seq;
       public          postgres    false    218            �           0    0    estado_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.estado_id_seq OWNED BY public.estado.id;
          public          postgres    false    217            �            1259    1188710    genero    TABLE     H   CREATE TABLE public.genero (
    id bigint NOT NULL,
    nombre text
);
    DROP TABLE public.genero;
       public         heap    postgres    false            �            1259    1188709    genero_id_seq    SEQUENCE     v   CREATE SEQUENCE public.genero_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.genero_id_seq;
       public          postgres    false    220            �           0    0    genero_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.genero_id_seq OWNED BY public.genero.id;
          public          postgres    false    219            �            1259    1188893    grupo_reposo    TABLE     �   CREATE TABLE public.grupo_reposo (
    id bigint NOT NULL,
    paciente_cedula bigint,
    tipo_reposo_id bigint,
    fecha_inicio timestamp without time zone
);
     DROP TABLE public.grupo_reposo;
       public         heap    postgres    false            �            1259    1188892    grupo_reposo_id_seq    SEQUENCE     |   CREATE SEQUENCE public.grupo_reposo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.grupo_reposo_id_seq;
       public          postgres    false    242            �           0    0    grupo_reposo_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.grupo_reposo_id_seq OWNED BY public.grupo_reposo.id;
          public          postgres    false    241            �            1259    1188803 	   municipio    TABLE     j   CREATE TABLE public.municipio (
    id bigint NOT NULL,
    nombre text NOT NULL,
    estado_id bigint
);
    DROP TABLE public.municipio;
       public         heap    postgres    false            �            1259    1188802    municipio_id_seq    SEQUENCE     y   CREATE SEQUENCE public.municipio_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.municipio_id_seq;
       public          postgres    false    233            �           0    0    municipio_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.municipio_id_seq OWNED BY public.municipio.id;
          public          postgres    false    232            �            1259    1188846    paciente    TABLE     �  CREATE TABLE public.paciente (
    cedula bigint NOT NULL,
    nombre text NOT NULL,
    apellido text NOT NULL,
    institucion_laboral text,
    fecha_nacimiento timestamp without time zone,
    direccion text,
    telefono character varying(11),
    correo text,
    cargo_id bigint,
    dependencia_id bigint,
    municipio_id bigint,
    tipo_paciente_id bigint,
    usuario_id bigint
);
    DROP TABLE public.paciente;
       public         heap    postgres    false            �            1259    1188879    permiso    TABLE     �   CREATE TABLE public.permiso (
    id bigint NOT NULL,
    descripcion_motivo text NOT NULL,
    fecha_inicio timestamp without time zone,
    fecha_fin timestamp without time zone,
    empleado_cedula bigint
);
    DROP TABLE public.permiso;
       public         heap    postgres    false            �            1259    1188878    permiso_id_seq    SEQUENCE     w   CREATE SEQUENCE public.permiso_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.permiso_id_seq;
       public          postgres    false    240            �           0    0    permiso_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.permiso_id_seq OWNED BY public.permiso.id;
          public          postgres    false    239            �            1259    1188934    reposo    TABLE       CREATE TABLE public.reposo (
    id bigint NOT NULL,
    codigo_asistencial text NOT NULL,
    codigo_registro text NOT NULL,
    fecha_inicio timestamp without time zone,
    fecha_fin timestamp without time zone,
    quien_valida text,
    grupo_reposo_id bigint
);
    DROP TABLE public.reposo;
       public         heap    postgres    false            �            1259    1188933    reposo_id_seq    SEQUENCE     v   CREATE SEQUENCE public.reposo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.reposo_id_seq;
       public          postgres    false    246            �           0    0    reposo_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.reposo_id_seq OWNED BY public.reposo.id;
          public          postgres    false    245            �            1259    1188719    rol    TABLE     E   CREATE TABLE public.rol (
    id bigint NOT NULL,
    nombre text
);
    DROP TABLE public.rol;
       public         heap    postgres    false            �            1259    1188718 
   rol_id_seq    SEQUENCE     s   CREATE SEQUENCE public.rol_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.rol_id_seq;
       public          postgres    false    222            �           0    0 
   rol_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id;
          public          postgres    false    221            �            1259    1188748    tipo_paciente    TABLE     O   CREATE TABLE public.tipo_paciente (
    id bigint NOT NULL,
    nombre text
);
 !   DROP TABLE public.tipo_paciente;
       public         heap    postgres    false            �            1259    1188747    tipo_paciente_id_seq    SEQUENCE     }   CREATE SEQUENCE public.tipo_paciente_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.tipo_paciente_id_seq;
       public          postgres    false    228            �           0    0    tipo_paciente_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.tipo_paciente_id_seq OWNED BY public.tipo_paciente.id;
          public          postgres    false    227            �            1259    1188683    tipo_reposo    TABLE     f   CREATE TABLE public.tipo_reposo (
    id bigint NOT NULL,
    nombre text,
    maximo_dias integer
);
    DROP TABLE public.tipo_reposo;
       public         heap    postgres    false            �            1259    1188682    tipo_reposo_id_seq    SEQUENCE     {   CREATE SEQUENCE public.tipo_reposo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.tipo_reposo_id_seq;
       public          postgres    false    214            �           0    0    tipo_reposo_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.tipo_reposo_id_seq OWNED BY public.tipo_reposo.id;
          public          postgres    false    213            �            1259    1188730    turno    TABLE     �   CREATE TABLE public.turno (
    id bigint NOT NULL,
    nombre text,
    hora_llegada timestamp without time zone,
    hora_salida timestamp without time zone
);
    DROP TABLE public.turno;
       public         heap    postgres    false            �            1259    1188729    turno_id_seq    SEQUENCE     u   CREATE SEQUENCE public.turno_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.turno_id_seq;
       public          postgres    false    224            �           0    0    turno_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.turno_id_seq OWNED BY public.turno.id;
          public          postgres    false    223            �            1259    1188817    usuario    TABLE     �   CREATE TABLE public.usuario (
    id bigint NOT NULL,
    usuario text NOT NULL,
    clave text NOT NULL,
    nombre text,
    rol_id bigint
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    1188816    usuario_id_seq    SEQUENCE     w   CREATE SEQUENCE public.usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public          postgres    false    235            �           0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public          postgres    false    234            �           2604    1188836    asistencia id    DEFAULT     n   ALTER TABLE ONLY public.asistencia ALTER COLUMN id SET DEFAULT nextval('public.asistencia_id_seq'::regclass);
 <   ALTER TABLE public.asistencia ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    237    237            �           2604    1188668    cargo id    DEFAULT     d   ALTER TABLE ONLY public.cargo ALTER COLUMN id SET DEFAULT nextval('public.cargo_id_seq'::regclass);
 7   ALTER TABLE public.cargo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            �           2604    1188913    cita id    DEFAULT     b   ALTER TABLE ONLY public.cita ALTER COLUMN id SET DEFAULT nextval('public.cita_id_seq'::regclass);
 6   ALTER TABLE public.cita ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243    244            �           2604    1188677    dependencia id    DEFAULT     p   ALTER TABLE ONLY public.dependencia ALTER COLUMN id SET DEFAULT nextval('public.dependencia_id_seq'::regclass);
 =   ALTER TABLE public.dependencia ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            �           2604    1188695    especialidad id    DEFAULT     r   ALTER TABLE ONLY public.especialidad ALTER COLUMN id SET DEFAULT nextval('public.especialidad_id_seq'::regclass);
 >   ALTER TABLE public.especialidad ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    1188704 	   estado id    DEFAULT     f   ALTER TABLE ONLY public.estado ALTER COLUMN id SET DEFAULT nextval('public.estado_id_seq'::regclass);
 8   ALTER TABLE public.estado ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    1188760    estado_cita id    DEFAULT     p   ALTER TABLE ONLY public.estado_cita ALTER COLUMN id SET DEFAULT nextval('public.estado_cita_id_seq'::regclass);
 =   ALTER TABLE public.estado_cita ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    230    230            �           2604    1188742    estado_empleado id    DEFAULT     x   ALTER TABLE ONLY public.estado_empleado ALTER COLUMN id SET DEFAULT nextval('public.estado_empleado_id_seq'::regclass);
 A   ALTER TABLE public.estado_empleado ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            �           2604    1188713 	   genero id    DEFAULT     f   ALTER TABLE ONLY public.genero ALTER COLUMN id SET DEFAULT nextval('public.genero_id_seq'::regclass);
 8   ALTER TABLE public.genero ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    1188896    grupo_reposo id    DEFAULT     r   ALTER TABLE ONLY public.grupo_reposo ALTER COLUMN id SET DEFAULT nextval('public.grupo_reposo_id_seq'::regclass);
 >   ALTER TABLE public.grupo_reposo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    241    242    242            �           2604    1188806    municipio id    DEFAULT     l   ALTER TABLE ONLY public.municipio ALTER COLUMN id SET DEFAULT nextval('public.municipio_id_seq'::regclass);
 ;   ALTER TABLE public.municipio ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    233    232    233            �           2604    1188882 
   permiso id    DEFAULT     h   ALTER TABLE ONLY public.permiso ALTER COLUMN id SET DEFAULT nextval('public.permiso_id_seq'::regclass);
 9   ALTER TABLE public.permiso ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    240    240            �           2604    1188937 	   reposo id    DEFAULT     f   ALTER TABLE ONLY public.reposo ALTER COLUMN id SET DEFAULT nextval('public.reposo_id_seq'::regclass);
 8   ALTER TABLE public.reposo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    246    245    246            �           2604    1188722    rol id    DEFAULT     `   ALTER TABLE ONLY public.rol ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);
 5   ALTER TABLE public.rol ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    1188751    tipo_paciente id    DEFAULT     t   ALTER TABLE ONLY public.tipo_paciente ALTER COLUMN id SET DEFAULT nextval('public.tipo_paciente_id_seq'::regclass);
 ?   ALTER TABLE public.tipo_paciente ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227    228            �           2604    1188686    tipo_reposo id    DEFAULT     p   ALTER TABLE ONLY public.tipo_reposo ALTER COLUMN id SET DEFAULT nextval('public.tipo_reposo_id_seq'::regclass);
 =   ALTER TABLE public.tipo_reposo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            �           2604    1188733    turno id    DEFAULT     d   ALTER TABLE ONLY public.turno ALTER COLUMN id SET DEFAULT nextval('public.turno_id_seq'::regclass);
 7   ALTER TABLE public.turno ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    1188820 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    235    235            �          0    1188833 
   asistencia 
   TABLE DATA           `   COPY public.asistencia (id, comentario, hora_llegada, hora_salida, empleado_cedula) FROM stdin;
    public          postgres    false    237   �       �          0    1188665    cargo 
   TABLE DATA           +   COPY public.cargo (id, nombre) FROM stdin;
    public          postgres    false    210   �       �          0    1188910    cita 
   TABLE DATA           a   COPY public.cita (id, nota, empleado_cedula, paciente_cedula, fecha, estado_cita_id) FROM stdin;
    public          postgres    false    244   ��       �          0    1188674    dependencia 
   TABLE DATA           1   COPY public.dependencia (id, nombre) FROM stdin;
    public          postgres    false    212   ��       �          0    1188765    empleado 
   TABLE DATA           �   COPY public.empleado (cedula, nombre, apellido, fecha_nacimiento, direccion, telefono, especialidad_id, cargo_id, dependencia_id, turno_id, genero_id, estado_empleado_id) FROM stdin;
    public          postgres    false    231   ڵ       �          0    1188692    especialidad 
   TABLE DATA           =   COPY public.especialidad (id, nombre, consultas) FROM stdin;
    public          postgres    false    216   ]�       �          0    1188701    estado 
   TABLE DATA           ,   COPY public.estado (id, nombre) FROM stdin;
    public          postgres    false    218   :�       �          0    1188757    estado_cita 
   TABLE DATA           1   COPY public.estado_cita (id, nombre) FROM stdin;
    public          postgres    false    230   ��       �          0    1188739    estado_empleado 
   TABLE DATA           5   COPY public.estado_empleado (id, nombre) FROM stdin;
    public          postgres    false    226   ɸ       �          0    1188710    genero 
   TABLE DATA           ,   COPY public.genero (id, nombre) FROM stdin;
    public          postgres    false    220    �       �          0    1188893    grupo_reposo 
   TABLE DATA           Y   COPY public.grupo_reposo (id, paciente_cedula, tipo_reposo_id, fecha_inicio) FROM stdin;
    public          postgres    false    242   1�       �          0    1188803 	   municipio 
   TABLE DATA           :   COPY public.municipio (id, nombre, estado_id) FROM stdin;
    public          postgres    false    233   ��       �          0    1188846    paciente 
   TABLE DATA           �   COPY public.paciente (cedula, nombre, apellido, institucion_laboral, fecha_nacimiento, direccion, telefono, correo, cargo_id, dependencia_id, municipio_id, tipo_paciente_id, usuario_id) FROM stdin;
    public          postgres    false    238   �       �          0    1188879    permiso 
   TABLE DATA           c   COPY public.permiso (id, descripcion_motivo, fecha_inicio, fecha_fin, empleado_cedula) FROM stdin;
    public          postgres    false    240   ��       �          0    1188934    reposo 
   TABLE DATA           �   COPY public.reposo (id, codigo_asistencial, codigo_registro, fecha_inicio, fecha_fin, quien_valida, grupo_reposo_id) FROM stdin;
    public          postgres    false    246   ��       �          0    1188719    rol 
   TABLE DATA           )   COPY public.rol (id, nombre) FROM stdin;
    public          postgres    false    222   V�       �          0    1188748    tipo_paciente 
   TABLE DATA           3   COPY public.tipo_paciente (id, nombre) FROM stdin;
    public          postgres    false    228   ��       �          0    1188683    tipo_reposo 
   TABLE DATA           >   COPY public.tipo_reposo (id, nombre, maximo_dias) FROM stdin;
    public          postgres    false    214   ��       �          0    1188730    turno 
   TABLE DATA           F   COPY public.turno (id, nombre, hora_llegada, hora_salida) FROM stdin;
    public          postgres    false    224   +�       �          0    1188817    usuario 
   TABLE DATA           E   COPY public.usuario (id, usuario, clave, nombre, rol_id) FROM stdin;
    public          postgres    false    235   x�       �           0    0    asistencia_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.asistencia_id_seq', 11, true);
          public          postgres    false    236            �           0    0    cargo_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.cargo_id_seq', 8, true);
          public          postgres    false    209            �           0    0    cita_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.cita_id_seq', 1, false);
          public          postgres    false    243            �           0    0    dependencia_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.dependencia_id_seq', 3, true);
          public          postgres    false    211            �           0    0    especialidad_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.especialidad_id_seq', 18, true);
          public          postgres    false    215            �           0    0    estado_cita_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.estado_cita_id_seq', 4, true);
          public          postgres    false    229            �           0    0    estado_empleado_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.estado_empleado_id_seq', 3, true);
          public          postgres    false    225            �           0    0    estado_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.estado_id_seq', 5, true);
          public          postgres    false    217            �           0    0    genero_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.genero_id_seq', 2, true);
          public          postgres    false    219            �           0    0    grupo_reposo_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.grupo_reposo_id_seq', 11, true);
          public          postgres    false    241            �           0    0    municipio_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.municipio_id_seq', 5, true);
          public          postgres    false    232            �           0    0    permiso_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.permiso_id_seq', 4, true);
          public          postgres    false    239            �           0    0    reposo_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.reposo_id_seq', 37, true);
          public          postgres    false    245            �           0    0 
   rol_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.rol_id_seq', 5, true);
          public          postgres    false    221            �           0    0    tipo_paciente_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.tipo_paciente_id_seq', 2, true);
          public          postgres    false    227            �           0    0    tipo_reposo_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.tipo_reposo_id_seq', 2, true);
          public          postgres    false    213            �           0    0    turno_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.turno_id_seq', 2, true);
          public          postgres    false    223            �           0    0    usuario_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuario_id_seq', 20, true);
          public          postgres    false    234            �           2606    1188840    asistencia asistencia_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.asistencia
    ADD CONSTRAINT asistencia_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.asistencia DROP CONSTRAINT asistencia_pkey;
       public            postgres    false    237            �           2606    1188672    cargo cargo_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.cargo
    ADD CONSTRAINT cargo_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.cargo DROP CONSTRAINT cargo_pkey;
       public            postgres    false    210            �           2606    1188917    cita cita_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.cita DROP CONSTRAINT cita_pkey;
       public            postgres    false    244            �           2606    1188681    dependencia dependencia_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.dependencia
    ADD CONSTRAINT dependencia_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.dependencia DROP CONSTRAINT dependencia_pkey;
       public            postgres    false    212            �           2606    1188771    empleado empleado_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_pkey PRIMARY KEY (cedula);
 @   ALTER TABLE ONLY public.empleado DROP CONSTRAINT empleado_pkey;
       public            postgres    false    231            �           2606    1188699    especialidad especialidad_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.especialidad
    ADD CONSTRAINT especialidad_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.especialidad DROP CONSTRAINT especialidad_pkey;
       public            postgres    false    216            �           2606    1188764    estado_cita estado_cita_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.estado_cita
    ADD CONSTRAINT estado_cita_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.estado_cita DROP CONSTRAINT estado_cita_pkey;
       public            postgres    false    230            �           2606    1188746 $   estado_empleado estado_empleado_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.estado_empleado
    ADD CONSTRAINT estado_empleado_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.estado_empleado DROP CONSTRAINT estado_empleado_pkey;
       public            postgres    false    226            �           2606    1188708    estado estado_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.estado
    ADD CONSTRAINT estado_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.estado DROP CONSTRAINT estado_pkey;
       public            postgres    false    218            �           2606    1188717    genero genero_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.genero
    ADD CONSTRAINT genero_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.genero DROP CONSTRAINT genero_pkey;
       public            postgres    false    220            �           2606    1188898    grupo_reposo grupo_reposo_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.grupo_reposo
    ADD CONSTRAINT grupo_reposo_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.grupo_reposo DROP CONSTRAINT grupo_reposo_pkey;
       public            postgres    false    242            �           2606    1188810    municipio municipio_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.municipio
    ADD CONSTRAINT municipio_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.municipio DROP CONSTRAINT municipio_pkey;
       public            postgres    false    233            �           2606    1188852    paciente paciente_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_pkey PRIMARY KEY (cedula);
 @   ALTER TABLE ONLY public.paciente DROP CONSTRAINT paciente_pkey;
       public            postgres    false    238            �           2606    1188886    permiso permiso_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.permiso
    ADD CONSTRAINT permiso_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.permiso DROP CONSTRAINT permiso_pkey;
       public            postgres    false    240            �           2606    1188941    reposo reposo_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.reposo
    ADD CONSTRAINT reposo_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.reposo DROP CONSTRAINT reposo_pkey;
       public            postgres    false    246            �           2606    1188728    rol rol_nombre_key 
   CONSTRAINT     O   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_nombre_key UNIQUE (nombre);
 <   ALTER TABLE ONLY public.rol DROP CONSTRAINT rol_nombre_key;
       public            postgres    false    222            �           2606    1188726    rol rol_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.rol DROP CONSTRAINT rol_pkey;
       public            postgres    false    222            �           2606    1188755     tipo_paciente tipo_paciente_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.tipo_paciente
    ADD CONSTRAINT tipo_paciente_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.tipo_paciente DROP CONSTRAINT tipo_paciente_pkey;
       public            postgres    false    228            �           2606    1188690    tipo_reposo tipo_reposo_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.tipo_reposo
    ADD CONSTRAINT tipo_reposo_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.tipo_reposo DROP CONSTRAINT tipo_reposo_pkey;
       public            postgres    false    214            �           2606    1188737    turno turno_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.turno
    ADD CONSTRAINT turno_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.turno DROP CONSTRAINT turno_pkey;
       public            postgres    false    224            �           2606    1188824    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    235            �           2606    1188826    usuario usuario_usuario_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_usuario_key UNIQUE (usuario);
 E   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_usuario_key;
       public            postgres    false    235            �           2606    1188841 *   asistencia asistencia_empleado_cedula_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.asistencia
    ADD CONSTRAINT asistencia_empleado_cedula_fkey FOREIGN KEY (empleado_cedula) REFERENCES public.empleado(cedula);
 T   ALTER TABLE ONLY public.asistencia DROP CONSTRAINT asistencia_empleado_cedula_fkey;
       public          postgres    false    3300    237    231                       2606    1188918    cita cita_empleado_cedula_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_empleado_cedula_fkey FOREIGN KEY (empleado_cedula) REFERENCES public.empleado(cedula);
 H   ALTER TABLE ONLY public.cita DROP CONSTRAINT cita_empleado_cedula_fkey;
       public          postgres    false    3300    244    231            
           2606    1188928    cita cita_estado_cita_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_estado_cita_id_fkey FOREIGN KEY (estado_cita_id) REFERENCES public.estado_cita(id);
 G   ALTER TABLE ONLY public.cita DROP CONSTRAINT cita_estado_cita_id_fkey;
       public          postgres    false    244    3298    230            	           2606    1188923    cita cita_paciente_cedula_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_paciente_cedula_fkey FOREIGN KEY (paciente_cedula) REFERENCES public.paciente(cedula);
 H   ALTER TABLE ONLY public.cita DROP CONSTRAINT cita_paciente_cedula_fkey;
       public          postgres    false    238    3310    244            �           2606    1188777    empleado empleado_cargo_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_cargo_id_fkey FOREIGN KEY (cargo_id) REFERENCES public.cargo(id);
 I   ALTER TABLE ONLY public.empleado DROP CONSTRAINT empleado_cargo_id_fkey;
       public          postgres    false    3276    210    231            �           2606    1188782 %   empleado empleado_dependencia_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_dependencia_id_fkey FOREIGN KEY (dependencia_id) REFERENCES public.dependencia(id);
 O   ALTER TABLE ONLY public.empleado DROP CONSTRAINT empleado_dependencia_id_fkey;
       public          postgres    false    231    212    3278            �           2606    1188772 &   empleado empleado_especialidad_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_especialidad_id_fkey FOREIGN KEY (especialidad_id) REFERENCES public.especialidad(id);
 P   ALTER TABLE ONLY public.empleado DROP CONSTRAINT empleado_especialidad_id_fkey;
       public          postgres    false    3282    216    231            �           2606    1188797 )   empleado empleado_estado_empleado_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_estado_empleado_id_fkey FOREIGN KEY (estado_empleado_id) REFERENCES public.estado_empleado(id);
 S   ALTER TABLE ONLY public.empleado DROP CONSTRAINT empleado_estado_empleado_id_fkey;
       public          postgres    false    3294    231    226            �           2606    1188792     empleado empleado_genero_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_genero_id_fkey FOREIGN KEY (genero_id) REFERENCES public.genero(id);
 J   ALTER TABLE ONLY public.empleado DROP CONSTRAINT empleado_genero_id_fkey;
       public          postgres    false    220    231    3286            �           2606    1188787    empleado empleado_turno_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_turno_id_fkey FOREIGN KEY (turno_id) REFERENCES public.turno(id);
 I   ALTER TABLE ONLY public.empleado DROP CONSTRAINT empleado_turno_id_fkey;
       public          postgres    false    231    3292    224                       2606    1188899 .   grupo_reposo grupo_reposo_paciente_cedula_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.grupo_reposo
    ADD CONSTRAINT grupo_reposo_paciente_cedula_fkey FOREIGN KEY (paciente_cedula) REFERENCES public.paciente(cedula);
 X   ALTER TABLE ONLY public.grupo_reposo DROP CONSTRAINT grupo_reposo_paciente_cedula_fkey;
       public          postgres    false    3310    242    238                       2606    1188904 -   grupo_reposo grupo_reposo_tipo_reposo_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.grupo_reposo
    ADD CONSTRAINT grupo_reposo_tipo_reposo_id_fkey FOREIGN KEY (tipo_reposo_id) REFERENCES public.tipo_reposo(id);
 W   ALTER TABLE ONLY public.grupo_reposo DROP CONSTRAINT grupo_reposo_tipo_reposo_id_fkey;
       public          postgres    false    3280    242    214            �           2606    1188811 "   municipio municipio_estado_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.municipio
    ADD CONSTRAINT municipio_estado_id_fkey FOREIGN KEY (estado_id) REFERENCES public.estado(id);
 L   ALTER TABLE ONLY public.municipio DROP CONSTRAINT municipio_estado_id_fkey;
       public          postgres    false    218    3284    233                        2606    1188853    paciente paciente_cargo_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_cargo_id_fkey FOREIGN KEY (cargo_id) REFERENCES public.cargo(id);
 I   ALTER TABLE ONLY public.paciente DROP CONSTRAINT paciente_cargo_id_fkey;
       public          postgres    false    3276    238    210                       2606    1188858 %   paciente paciente_dependencia_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_dependencia_id_fkey FOREIGN KEY (dependencia_id) REFERENCES public.dependencia(id);
 O   ALTER TABLE ONLY public.paciente DROP CONSTRAINT paciente_dependencia_id_fkey;
       public          postgres    false    238    212    3278                       2606    1188863 #   paciente paciente_municipio_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_municipio_id_fkey FOREIGN KEY (municipio_id) REFERENCES public.municipio(id);
 M   ALTER TABLE ONLY public.paciente DROP CONSTRAINT paciente_municipio_id_fkey;
       public          postgres    false    238    233    3302                       2606    1188868 '   paciente paciente_tipo_paciente_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_tipo_paciente_id_fkey FOREIGN KEY (tipo_paciente_id) REFERENCES public.tipo_paciente(id);
 Q   ALTER TABLE ONLY public.paciente DROP CONSTRAINT paciente_tipo_paciente_id_fkey;
       public          postgres    false    238    228    3296                       2606    1188873 !   paciente paciente_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id);
 K   ALTER TABLE ONLY public.paciente DROP CONSTRAINT paciente_usuario_id_fkey;
       public          postgres    false    235    3304    238                       2606    1188887 $   permiso permiso_empleado_cedula_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.permiso
    ADD CONSTRAINT permiso_empleado_cedula_fkey FOREIGN KEY (empleado_cedula) REFERENCES public.empleado(cedula);
 N   ALTER TABLE ONLY public.permiso DROP CONSTRAINT permiso_empleado_cedula_fkey;
       public          postgres    false    231    3300    240                       2606    1188942 "   reposo reposo_grupo_reposo_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reposo
    ADD CONSTRAINT reposo_grupo_reposo_id_fkey FOREIGN KEY (grupo_reposo_id) REFERENCES public.grupo_reposo(id);
 L   ALTER TABLE ONLY public.reposo DROP CONSTRAINT reposo_grupo_reposo_id_fkey;
       public          postgres    false    3314    246    242            �           2606    1188827    usuario usuario_rol_id_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.rol(id);
 E   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rol_id_fkey;
       public          postgres    false    222    3290    235            �   �   x�m�˕� еV1x|�e��cLvI���
������e��.��N�-�Gw�T���O�����6H��5��J��O|p.iB7K�q.z�G�`ڇ�b����N�4e���x��
���;r경.����w�Z�潔��G��x�<h�����ICX+�	�z�Y�L%>�Z�2{��y�P�[>*W�#��>u7}�>�^���r��U��VS䠱k7��1��0�]��Gs�Gi~�      �   Z   x��;
�0E�z�b���6�d61�H�d`�_��5��4����X--�8FG�O1ǻ�-��dN��@��m��e�`"S�rT ^��t      �      x������ � �      �   '   x�3��KL���K��2�t-.IL��9�K��b���� ���      �   s  x���Mn�0FדS� ��ۉ�]E+*D��vٍU�
)�*4]p�]���Xm��?��D��}�b�R!<���;���m�+�-�5,P	�)�u��ؕe�r:v��"et&Y+`��IL�$�����}QW��ZDb�"]"^ ��r�J����z����9�VH�(#1N��e�we�-o}�(����?N^�u��$�����\5�ݪ��Q1�sAfP�ߊ�k���j��.6A�
�k�J��B6�g��?�}���ꖘ	dAjP�0�!���f������[���a����*��(��Y�����"� xB<���T����0m\�?z-�U{�G<:B�T���u#J�1ۯ��ܗ�5O�lj�U��U�$ߠ;��      �   �   x�E�ϊ1���S�,��EP�]GX�^�4�i�d:�>��#�[��i�k,�.H]h!�)���+�H*Y���$F[�u������nPߔ4�K��vPv����������Tmʔ=z�5=l'EHH�����w��Yշ>R�Ҍi��[���v�����i/ɸ�s�M9^�Zx�rU��i��c�����@�b�      �   ;   x�3�IL��,J�2��M-�LI�2�*��L�2�)*������2�t,(-J����� �jl      �   4   x�3�tLO�KILI�2�t,�,.�2�9��Ss@�&�~�
�|�=... �W      �   '   x�3�tL.�,��2���K�0�9�J�2sS�b���� ǿ
E      �   !   x�3��M,N.�����2�tK�M�1c���� ~�      �   ~   x�u�Q
1�os�^`�8j�,��9��v�>fD�d �80�8�i��-���(\8�g8B��ò }99�G��P�lm`
c�A�Hȭ�{�b��O�>�.4�	�'>�����@l      �   O   x�3��*������2�t�LL.M���9}2�R�JS�@|���<���Û�s@b��>�I�%�E� ^� �c�      �   _  x����n�0E��W�ʀ�GWu�GS8�ѴZt3����,��E��C�1��Qȏ�ݹw�e�Rs.�:nK&?a�)�g��z�Zg\0n�?^d	]!Շf��-l	�B;o�6���1n���Rw��QDޚ
ɹ2x¢��/��b�I5�"�!�A�6N*NV0 _a�
���v�4�v���d<0�gS��+���*��Lnb��"x����r�K>P�g\1�fM�p	*�6kT ��)	���U�*�17W�ks�L��uL��J%�ӤS֐G��	P�-�6�I�*�C�^�P�
&0?r>YQŭ���'�"�1F�P�������殤�`�0��)>�^�62�+�q����I�Q4�a�<r��*���G��U���>��>ї��ϧ4�k��b�2y��VN[/�#�2��=6�Q唯j�:����.����B�������Y�(x8�>��8����2����J�%�| �.���E��O{�6�j�Vd������9�u|��%��\���'\rZ=�v��ah��䭠k�T��P����#_F�%��؋g�	�g�1�g��	��G����.�J��	�����W1�P��
>;+�_����"�      �   a   x�m�=
�0��9���ֳ�:8���ťJ�L/<|���Ǻ�[bdɄ�C�k�[5D1� �DɯF慫
H�H�C�`.��Pz7�_�S ��1S      �   H  x����j�PFg�)�	��֦t,t��Ő�P(����ihZ[����>}>W����q�^�b�#��i�x�>?g�����{�?�����2��)�-$�����Ù�f!#i���(�X�p�%J*�)��?���6Cqj�����М�f t�[P��w ��OP�i<AE��"�n��O��J@�e�T��Tsɔ�u��3	�r|�py9.(/�us���+�kA�^W~=�+/�� ���g�W`�-.(�5. �=^!x�qA��⬠j�ZN��z�Y?���A�S�Dؠ�Y���7��^�rB�"�5�{�B*.W�� ��\O2      �   X   x�3�tL����,.)JL�/�2�tN��sRR�3K���9���yə�9\&�A�ɥE���
���y��\���ə@m�\1z\\\ �      �   '   x�3�tL���LL��2�tJ�KM�L�L,������� �=	      �   &   x�3�tO�K-J��43�2�t-.HM��,�b���� �F�      �   =   x�3��M<�11/�����X���,��Y��"�e��X���"g�E�9T}� �      �     x�M��j�0E����F�eh����`誛q#�����,��Yv�8̝��`x��q}��<�+�d��Ri��=SL1��y�����A���Zj�E��pJ7Ҁl8WP�68D$�T#ml��q9�l��!OM�i��`󄝧(h�R���#ht��-�p.;�	m(���4�i).�q�*z��^3ō-M|�(c9��:c��1�Q+P�|���6��eYe�q�A�4@,	�)�i����jOK�JZ��p�X�Pr:	��$l��i.������̀     