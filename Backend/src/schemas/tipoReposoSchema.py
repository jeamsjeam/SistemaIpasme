from src import app
from flask_marshmallow import Marshmallow
from ..models.tipo_reposo  import TipoReposo

ma = Marshmallow(app)

class TipoReposoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TipoReposo
        load_instance = True

tipoReposo_schema = TipoReposoSchema()
tipoReposo_schema = TipoReposoSchema(many=True)