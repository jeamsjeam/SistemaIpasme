from src import app
from flask_marshmallow import Marshmallow
from ..models.usuario  import Usuario

ma = Marshmallow(app)

class UsuarioSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Usuario
        load_instance = True
        #fields = ('id', 'nombre') # fields to expose

usuario_schema = UsuarioSchema()
usuarios_schema = UsuarioSchema(many=True)