from ..calls.monederosCalls import MonederosCalls
from ..models.monedero import Monedero
from ..schemas.monederoSchema import monedero_schema,monederos_schema

class MonederosServices:
    def get():
        monederos = MonederosCalls.get_monederos()
        return monederos_schema.dump(monederos)
    
    def get_monederos_moneda(moneda_id):
        monederos = MonederosCalls.get_monederos_moneda(moneda_id)
        return monederos_schema.dump(monederos)
    
    def buscar(id):
        monedero = MonederosCalls.get_monedero_id(id)
        return monedero_schema.dump(monedero)
    
    def crear(json):
        monedero = deserealizarJson(json)
        done = MonederosCalls.crear_monedero(monedero)
        if done is not None:
            return '00|OK'
        else:
            return '01|Problemas al registrar el monedero'
        
    def modificar(json):
        monedero = deserealizarJson(json)
        monederoBD = MonederosCalls.modificar_monedero(monedero)
        return monedero_schema.dump(monederoBD)

    def borrar(id):
        return MonederosCalls.borrar_monedero(id)

def deserealizarJson(json):
    monedero = Monedero(nombre=json['nombre'], 
                      saldo=json['saldo'], 
                      moneda_id=json['moneda_id'], 
                      usuario_id=json['usuario_id'])
    if 'id' in json:
        monedero.id = int(json['id'])
    return monedero