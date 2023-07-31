from src import app
from flask_marshmallow import Marshmallow
from ..models.reposo  import Reposo

ma = Marshmallow(app)

class ReposoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Reposo
        load_instance = True

reposo_schema = ReposoSchema()
reposos_schema = ReposoSchema(many=True)