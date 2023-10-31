from ..calls.movimientosMonederosCalls import MovimientosMonederosCalls
from ..models.movimiento_monedero import MovimientoMonedero
from ..schemas.movimientoMonederoSchema import movimiento_monedero_schema,movimientos_monedero_schema

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
            return '00|OK'
        else:
            return '01|Problemas al registrar el movimiento'

def deserealizarJson(json):
    movimiento = MovimientoMonedero(nombre=json['nombre'], 
                      saldo=json['saldo'], 
                      moneda_id=json['moneda_id'], 
                      monedero_id=json['monedero_id'],
                      fecha=json['fecha'])

    return movimiento