from src import app
from flask_marshmallow import Marshmallow
from ..models.moneda  import Moneda

ma = Marshmallow(app)

class MonedaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Moneda
        load_instance = True

moneda_schema = MonedaSchema()
monedas_schema = MonedaSchema(many=True)