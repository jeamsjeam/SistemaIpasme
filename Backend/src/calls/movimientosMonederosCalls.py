from ..models.movimiento_monedero import MovimientoMonedero
from src import db

class MovimientosMonederosCalls():
    def get_movimientos():
        movimientos = sorted(MovimientoMonedero.query.all(), key=lambda x: x.fecha, reverse=True)
        return movimientos
    
    def get_movimiento_id(id):
        movimiento = MovimientoMonedero.query.get(id)
        return movimiento
    
    def get_movimientos_monedero(monedero_id):
        movimientos = sorted(MovimientoMonedero.query.filter_by(monedero_id = monedero_id), key=lambda x: x.fecha, reverse=True)
        return movimientos
    
    def crear_movimiento(movimiento):
        movimientoNuevo = MovimientoMonedero(descripcion = movimiento.descripcion, 
                         saldo=movimiento.saldo,
                         moneda_id=movimiento.moneda_id,
                         monedero_id=movimiento.monedero_id,
                         fecha=movimiento.fecha)
        db.session.add(movimientoNuevo)
        db.session.commit()
        db.session.refresh(movimientoNuevo)
        return movimientoNuevo
    
    def borrar_movimiento(id):
        movimientoBD = MovimientoMonedero.query.get(id)
        if movimientoBD is not None:
            db.session.delete(movimientoBD)
            db.session.commit()
            return "00|Ok"
        else:
            return "01|Error"