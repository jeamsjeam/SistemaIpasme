PGDMP     4                	    {            ipas    14.5    14.5 *    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    1188663    ipas    DATABASE     c   CREATE DATABASE ipas WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE ipas;
                postgres    false            �          0    1188665    cargo 
   TABLE DATA           +   COPY public.cargo (id, nombre) FROM stdin;
    public          postgres    false    210   #       �          0    1188674    dependencia 
   TABLE DATA           1   COPY public.dependencia (id, nombre) FROM stdin;
    public          postgres    false    212   m#       �          0    1188692    especialidad 
   TABLE DATA           =   COPY public.especialidad (id, nombre, consultas) FROM stdin;
    public          postgres    false    216   �#       �          0    1188739    estado_empleado 
   TABLE DATA           5   COPY public.estado_empleado (id, nombre) FROM stdin;
    public          postgres    false    226   �$       �          0    1188710    genero 
   TABLE DATA           ,   COPY public.genero (id, nombre) FROM stdin;
    public          postgres    false    220   �$       �          0    1188730    turno 
   TABLE DATA           F   COPY public.turno (id, nombre, hora_llegada, hora_salida) FROM stdin;
    public          postgres    false    224   �$       �          0    1188765    empleado 
   TABLE DATA           �   COPY public.empleado (cedula, nombre, apellido, fecha_nacimiento, direccion, telefono, especialidad_id, cargo_id, dependencia_id, turno_id, genero_id, estado_empleado_id) FROM stdin;
    public          postgres    false    231   6%       �          0    1188833 
   asistencia 
   TABLE DATA           `   COPY public.asistencia (id, comentario, hora_llegada, hora_salida, empleado_cedula) FROM stdin;
    public          postgres    false    237   �&       �          0    1188701    estado 
   TABLE DATA           ,   COPY public.estado (id, nombre) FROM stdin;
    public          postgres    false    218   �'       �          0    1188757    estado_cita 
   TABLE DATA           1   COPY public.estado_cita (id, nombre) FROM stdin;
    public          postgres    false    230   (       �          0    1188803 	   municipio 
   TABLE DATA           :   COPY public.municipio (id, nombre, estado_id) FROM stdin;
    public          postgres    false    233   J(       �          0    1188719    rol 
   TABLE DATA           )   COPY public.rol (id, nombre) FROM stdin;
    public          postgres    false    222   �(       �          0    1188748    tipo_paciente 
   TABLE DATA           3   COPY public.tipo_paciente (id, nombre) FROM stdin;
    public          postgres    false    228   )       �          0    1188817    usuario 
   TABLE DATA           E   COPY public.usuario (id, usuario, clave, nombre, rol_id) FROM stdin;
    public          postgres    false    235   H)       �          0    1188846    paciente 
   TABLE DATA           �   COPY public.paciente (cedula, nombre, apellido, institucion_laboral, fecha_nacimiento, direccion, telefono, correo, cargo_id, dependencia_id, municipio_id, tipo_paciente_id, usuario_id) FROM stdin;
    public          postgres    false    238   v*       �          0    1188910    cita 
   TABLE DATA           a   COPY public.cita (id, nota, empleado_cedula, paciente_cedula, fecha, estado_cita_id) FROM stdin;
    public          postgres    false    244   �,       �          0    1188683    tipo_reposo 
   TABLE DATA           >   COPY public.tipo_reposo (id, nombre, maximo_dias) FROM stdin;
    public          postgres    false    214   -       �          0    1188893    grupo_reposo 
   TABLE DATA           Y   COPY public.grupo_reposo (id, paciente_cedula, tipo_reposo_id, fecha_inicio) FROM stdin;
    public          postgres    false    242   8-       �          0    1188879    permiso 
   TABLE DATA           c   COPY public.permiso (id, descripcion_motivo, fecha_inicio, fecha_fin, empleado_cedula) FROM stdin;
    public          postgres    false    240   �-       �          0    1188934    reposo 
   TABLE DATA           �   COPY public.reposo (id, codigo_asistencial, codigo_registro, fecha_inicio, fecha_fin, quien_valida, grupo_reposo_id) FROM stdin;
    public          postgres    false    246   7.       �           0    0    asistencia_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.asistencia_id_seq', 11, true);
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
          public          postgres    false    234            �   Z   x��;
�0E�z�b���6�d61�H�d`�_��5��4����X--�8FG�O1ǻ�-��dN��@��m��e�`"S�rT ^��t      �   '   x�3��KL���K��2�t-.IL��9�K��b���� ���      �   �   x�E�ϊ1���S�,��EP�]GX�^�4�i�d:�>��#�[��i�k,�.H]h!�)���+�H*Y���$F[�u������nPߔ4�K��vPv����������Tmʔ=z�5=l'EHH�����w��Yշ>R�Ҍi��[���v�����i/ɸ�s�M9^�Zx�rU��i��c�����@�b�      �   '   x�3�tL.�,��2���K�0�9�J�2sS�b���� ǿ
E      �   !   x�3��M,N.�����2�tK�M�1c���� ~�      �   =   x�3��M<�11/�����X���,��Y��"�e��X���"g�E�9T}� �      �   s  x���Mn�0FדS� ��ۉ�]E+*D��vٍU�
)�*4]p�]���Xm��?��D��}�b�R!<���;���m�+�-�5,P	�)�u��ؕe�r:v��"et&Y+`��IL�$�����}QW��ZDb�"]"^ ��r�J����z����9�VH�(#1N��e�we�-o}�(����?N^�u��$�����\5�ݪ��Q1�sAfP�ߊ�k���j��.6A�
�k�J��B6�g��?�}���ꖘ	dAjP�0�!���f������[���a����*��(��Y�����"� xB<���T����0m\�?z-�U{�G<:B�T���u#J�1ۯ��ܗ�5O�lj�U��U�$ߠ;��      �   �   x�m�˕� еV1x|�e��cLvI���
������e��.��N�-�Gw�T���O�����6H��5��J��O|p.iB7K�q.z�G�`ڇ�b����N�4e���x��
���;r경.����w�Z�潔��G��x�<h�����ICX+�	�z�Y�L%>�Z�2{��y�P�[>*W�#��>u7}�>�^���r��U��VS䠱k7��1��0�]��Gs�Gi~�      �   ;   x�3�IL��,J�2��M-�LI�2�*��L�2�)*������2�t,(-J����� �jl      �   4   x�3�tLO�KILI�2�t,�,.�2�9��Ss@�&�~�
�|�=... �W      �   O   x�3��*������2�t�LL.M���9}2�R�JS�@|���<���Û�s@b��>�I�%�E� ^� �c�      �   X   x�3�tL����,.)JL�/�2�tN��sRR�3K���9���yə�9\&�A�ɥE���
���y��\���ə@m�\1z\\\ �      �   '   x�3�tL���LL��2�tJ�KM�L�L,������� �=	      �     x�M��j�0E����F�eh����`誛q#�����,��Yv�8̝��`x��q}��<�+�d��Ri��=SL1��y�����A���Zj�E��pJ7Ҁl8WP�68D$�T#ml��q9�l��!OM�i��`󄝧(h�R���#ht��-�p.;�	m(���4�i).�q�*z��^3ō-M|�(c9��:c��1�Q+P�|���6��eYe�q�A�4@,	�)�i����jOK�JZ��p�X�Pr:	��$l��i.������̀      �   _  x����n�0E��W�ʀ�GWu�GS8�ѴZt3����,��E��C�1��Qȏ�ݹw�e�Rs.�:nK&?a�)�g��z�Zg\0n�?^d	]!Շf��-l	�B;o�6���1n���Rw��QDޚ
ɹ2x¢��/��b�I5�"�!�A�6N*NV0 _a�
���v�4�v���d<0�gS��+���*��Lnb��"x����r�K>P�g\1�fM�p	*�6kT ��)	���U�*�17W�ks�L��uL��J%�ӤS֐G��	P�-�6�I�*�C�^�P�
&0?r>YQŭ���'�"�1F�P�������殤�`�0��)>�^�62�+�q����I�Q4�a�<r��*���G��U���>��>ї��ϧ4�k��b�2y��VN[/�#�2��=6�Q唯j�:����.����B�������Y�(x8�>��8����2����J�%�| �.���E��O{�6�j�Vd������9�u|��%��\���'\rZ=�v��ah��䭠k�T��P����#_F�%��؋g�	�g�1�g��	��G����.�J��	�����W1�P��
>;+�_����"�      �      x������ � �      �   &   x�3�tO�K-J��43�2�t-.HM��,�b���� �F�      �   ~   x�u�Q
1�os�^`�8j�,��9��v�>fD�d �80�8�i��-���(\8�g8B��ò }99�G��P�lm`
c�A�Hȭ�{�b��O�>�.4�	�'>�����@l      �   a   x�m�=
�0��9���ֳ�:8���ťJ�L/<|���Ǻ�[bdɄ�C�k�[5D1� �DɯF慫
H�H�C�`.��Pz7�_�S ��1S      �   H  x����j�PFg�)�	��֦t,t��Ő�P(����ihZ[����>}>W����q�^�b�#��i�x�>?g�����{�?�����2��)�-$�����Ù�f!#i���(�X�p�%J*�)��?���6Cqj�����М�f t�[P��w ��OP�i<AE��"�n��O��J@�e�T��Tsɔ�u��3	�r|�py9.(/�us���+�kA�^W~=�+/�� ���g�W`�-.(�5. �=^!x�qA��⬠j�ZN��z�Y?���A�S�Dؠ�Y���7��^�rB�"�5�{�B*.W�� ��\O2     