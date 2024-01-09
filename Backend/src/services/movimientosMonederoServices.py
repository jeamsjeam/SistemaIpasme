from ..calls.movimientosMonederosCalls import MovimientosMonederosCalls
from ..calls.monederosCalls import MonederosCalls
from ..models.movimiento_monedero import MovimientoMonedero
from ..schemas.movimientoMonederoSchema import movimiento_monedero_schema,movimientos_monedero_schema
from ..schemas.monederoSchema import monedero_schema
from decimal import Decimal

class MovimientosMonederoServices:
    def get():
        movimientos = MovimientosMonederosCalls.get_movimientos()
        return movimientos_monedero_schema.dump(movimientos)
    
    def get_movimientos_monedero(monedero_id):
        movimientos = MovimientosMonederosCalls.get_movimientos_monedero(monedero_id)
        return movimientos_monedero_schema.dump(movimientos)
    
    def crear(json):
        movimiento = deserealizarJson(json)
        done = MovimientosMonederosCalls.crear_movimiento(movimiento)
        if done is not None:
            done = movimiento_monedero_schema.dump(done)
            monedero = MonederosCalls.registrar_monto(movimiento.monedero_id, movimiento.saldo)
            if monedero == "01|Monto no valido":
                MovimientosMonederosCalls.borrar_movimiento(done['id'])
                return monedero
            return monedero_schema.dump(monedero)
        else:
            return '01|Problemas al registrar el movimiento'

def deserealizarJson(json):
    movimiento = MovimientoMonedero(descripcion=json['descripcion'], 
                      saldo=Decimal(json['saldo']), 
                      moneda_id=json['moneda_id'], 
                      monedero_id=json['monedero_id'],
                      fecha=json['fecha'])

    return movimiento