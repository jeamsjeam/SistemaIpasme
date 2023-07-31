from src import app
from flask_marshmallow import Marshmallow
from ..models.cargo  import Cargo

ma = Marshmallow(app)

class CargoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Cargo
        #load_instance = True
    id = ma.auto_field()
    nombre = ma.auto_field()

cargo_schema = CargoSchema()
cargos_schema = CargoSchema(many=True)