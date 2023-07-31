from src import app
from flask_marshmallow import Marshmallow
from ..models.grupo_reposo  import GrupoReposo

ma = Marshmallow(app)

class GrupoReposoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = GrupoReposo
        load_instance = True

grupoReposo_schema = GrupoReposoSchema()
grupoReposos_schema = GrupoReposoSchema(many=True)