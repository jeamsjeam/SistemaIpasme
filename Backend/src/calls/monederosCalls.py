from ..models.monedero import Monedero
from src import db

class MonederosCalls():
    def get_monederos():
        monederos = sorted(Monedero.query.all(), key=lambda x: x.nombre)
        return monederos
    
    def get_monedero_id(id):
        monedero = Monedero.query.get(id)
        return monedero
    
    def get_monederos_moneda(moneda_id):
        monederos = sorted(Monedero.query.filter_by(moneda_id = moneda_id), key=lambda x: x.nombre)
        return monederos
    
    def crear_monedero(monedero):
        monederoNuevo = Monedero(nombre = monedero.nombre, 
                         saldo=monedero.saldo,
                         moneda_id=monedero.moneda_id,
                         usuario_id=monedero.usuario_id)
        db.session.add(monederoNuevo)
        db.session.commit()
        db.session.refresh(monederoNuevo)
        return monederoNuevo
    
    def modificar_monedero(monedero):
        monederoBD = Monedero.query.get(monedero.id)
        monederoBD.nombre = monedero.nombre
        # monederoBD.saldo = monedero.saldo
        # monederoBD.moneda_id = monedero.moneda_id
        monederoBD.usuario_id = monedero.usuario_id
        db.session.commit()
        db.session.refresh(monederoBD)
        return monederoBD

    def borrar_monedero(id):
        monederoBD = Monedero.query.get(id)
        if monederoBD is not None:
            
            for movimientoBD in monederoBD.movimientos:
                db.session.delete(movimientoBD)

            db.session.delete(monederoBD)
            db.session.commit()
            return "00|Ok"
        else:
            return "01|Error"
    
    def registrar_monto(id, saldo):
        monederoBD = Monedero.query.get(id)
        if monederoBD.saldo + saldo < 0:
            return "01|Monto no valido"

        monederoBD.saldo = monederoBD.saldo + saldo
        db.session.commit()
        db.session.refresh(monederoBD)
        return monederoBD

