from src import app
from flask_marshmallow import Marshmallow
from ..models.permiso  import Permiso

ma = Marshmallow(app)

class PermisoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Permiso
        load_instance = True

permiso_schema = PermisoSchema()
permisos_schema = PermisoSchema(many=True)