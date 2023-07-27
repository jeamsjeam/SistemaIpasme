from src import app
from flask_marshmallow import Marshmallow
from ..models.dependencia  import Dependencia

ma = Marshmallow(app)

class DependenciaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Dependencia
        load_instance = True

dependecia_schema = DependenciaSchema()
dependecias_schema = DependenciaSchema(many=True)