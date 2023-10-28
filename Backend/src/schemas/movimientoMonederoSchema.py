from src import app
from flask_marshmallow import Marshmallow
from ..models.movimiento_monedero  import MovimientoMonedero

ma = Marshmallow(app)

class MovimientoMonederoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = MovimientoMonedero
        #load_instance = True
    id = ma.auto_field()
    descripcion = ma.auto_field()
    saldo = ma.auto_field()
    fecha = ma.auto_field()
    moneda = ma.Nested('MonedaSchema')
    monedero = ma.Nested('MonederoSchema')

movimiento_monedero_schema = MovimientoMonederoSchema()
movimientos_monedero_schema = MovimientoMonederoSchema(many=True)