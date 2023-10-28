from src import app
from flask_marshmallow import Marshmallow
from ..models.monedero  import Monedero

ma = Marshmallow(app)

class MonederoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Monedero
        #load_instance = True
    id = ma.auto_field()
    nombre = ma.auto_field()
    saldo = ma.auto_field()
    moneda = ma.Nested('MonedaSchema')
    usuario = ma.Nested('UsuarioSchema')

monedero_schema = MonederoSchema()
monederos_schema = MonederoSchema(many=True)