function cargarMonederos(){
    // URL del servicio REST
    let url = "http://127.0.0.1:5000/monederos";

    // Llamada al servicio REST utilizando fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let html = ''
            data.forEach(data => {
                html += `<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                            <div onclick="seleccionarMonedero(${data.id})" class="card text-white card-has-bg click-col">
                                <div class="card-img-overlay d-flex">
                                    <div class="card-body flex-column">
                                        <h4 class="card-title mt-3 text-white text-center">${data.moneda.simbolo}   <i class="fa-solid fa-money-bill"></i>  ${data.nombre}</h4>
                                        <h6 class="card-title mb-0 text-white text-end" style="width: 100%">${data.usuario.nombre} </h6>
                                    </div>
                                </div>
                            </div>
                        </div>`
            });
            document.getElementById('monederos').innerHTML = html
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Datos: " + error.message, "#FF0000")
        });
}

function cargarMonedas(){
    // URL del servicio REST
    let url = "http://127.0.0.1:5000/monedas";

    // Elemento select donde agregaremos las opciones
    let select = document.getElementById("selectMonedas");
    // Llamada al servicio REST utilizando fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(data => {
                const option = document.createElement("option");
                option.value = data.id;
                option.textContent = data.nombre;
                select.appendChild(option);
            });
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Datos: " + error.message, "#FF0000")
        });
}

function cargarUsuarios(){
    // URL del servicio REST
    let url = "http://127.0.0.1:5000/usuarios/empleados";

    // Elemento select donde agregaremos las opciones
    let select = document.getElementById("selectUsuarios");
    // Llamada al servicio REST utilizando fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(data => {
                const option = document.createElement("option");
                option.value = data.id;
                option.textContent = data.nombre;
                select.appendChild(option);
            });
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Datos: " + error.message, "#FF0000")
        });
}

function seleccionarMonedero(monederoId){
    // URL del servicio REST
    let url = "http://127.0.0.1:5000/monederos/" + monederoId ;
    
    // Llamada al servicio REST utilizando fetch
    fetch(url)
    .then(response => response.json())
    .then(data => {
            sessionStorage.setItem('monedero', JSON.stringify(data))
            window.location.href = "movimientos.html"
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Datos: " + error.message, "#FF0000")
        });
}

function registrarMonedero(){
    let url = "http://127.0.0.1:5000/monederos/crear"; 
    let nombre = document.getElementById("nombreMonedero").value
    if (nombre == "") {
        mostrarNotificacion('Por favor, complete todos los campos', "#FF0000")
        return 0
    }
    data = {
        nombre : nombre,
        saldo : 0,
        moneda_id : document.getElementById("selectMonedas").value, 
        usuario_id : document.getElementById("selectUsuarios").value
    }
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };   
    fetch(url, options)
    .then(response => response.json() )
    .then(data => {
        resultado = data.toString().split('|')
        if (typeof resultado[1] !== 'undefined' && resultado[1] !== null) {
            if (resultado[0] === '00') {
                mostrarNotificacion("Guardado con Exito", "#198754")
                cargarMonederos()
                document.getElementById("nombreMonedero").value = ""
            } else {
                mostrarNotificacion(resultado[1], "#FF0000")
            }
        } else {
            mostrarNotificacion(resultado[0], "#FF0000")
        }
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )
}

let dataTable = null;
let dataTableIsInitialized = false;
const dataTableOptions = {
    //scrollX: "2000px",
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4] },
        { orderable: false, targets: [0, 2, 4] },
        { searchable: false, targets: [1, 2, 4] }
        //{ width: "50%", targets: [0] }
    ],
    pageLength: 3,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún movimiento encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún movimiento encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};

function initDataTable(lista) { 
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    try{
        list(lista);
        dataTable = $("#datatable_movimientos").DataTable(dataTableOptions);
    }catch(error){
        console.error("Error initializing DataTable:", error);
    }

    dataTableIsInitialized = true;
}

function list(lista) {
    try {
        let content = ``;
        lista.forEach((data, index) => {
            let fecha = new Date(data.fecha)
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${data.descripcion}</td>
                    <td>${data.saldo}</td>
                    <td>${data.moneda.simbolo}</td>
                    <td>${fecha.toLocaleDateString('en-GB')}</td>
                </tr>`;
        });
        tableBody_movimientos.innerHTML = content;
    } catch (ex) {
        console.error("Error initializing DataTable:", error);
    }
}

function cargarMovimientos(){
    let monedero = JSON.parse(sessionStorage.getItem('monedero'))
    // URL del servicio REST
    let url = "http://127.0.0.1:5000/movimientos/" + monedero.id;

    // Llamada al servicio REST utilizando fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {
            initDataTable(data)
            elemento = document.getElementById("selectUsuarios");
            for (let index = 0; index < elemento.options.length; index++) {
                if (elemento.options[index].value == monedero.usuario.id.toString()) {
                    elemento.selectedIndex = index;
                }
            }
            document.getElementById('nombreMonedero').value = monedero.nombre
            document.getElementById('tituloMonedero').innerText = monedero.nombre
            document.getElementById('saldoMonedero').innerText = monedero.saldo + " " + monedero.moneda.simbolo
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Datos: " + error.message, "#FF0000")
        });
}

function modificarMonedero(){
    let monedero = JSON.parse(sessionStorage.getItem('monedero'))
    let url = "http://127.0.0.1:5000/monederos/modificar"; 
    let nombre = document.getElementById("nombreMonedero").value
    if (nombre == "") {
        mostrarNotificacion('Por favor, complete todos los campos', "#FF0000")
        return 0
    }
    data = {
        id : monedero.id,
        nombre : nombre,
        saldo : monedero.saldo,
        moneda_id : monedero.moneda.id, 
        usuario_id : document.getElementById("selectUsuarios").value
    }
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };   
    fetch(url, options)
    .then(response => response.json() )
    .then(data => {
        if (typeof data !== 'undefined' && data !== null) {
            sessionStorage.setItem('monedero', JSON.stringify(data))
            mostrarNotificacion("Guardado con Exito", "#198754")
            cargarMovimientos()
            document.getElementById("nombreMonedero").value = ""
        } else {
            mostrarNotificacion("Error al guardar", "#FF0000")
        }
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )
}

function borrarMonedero(){
    let monedero = JSON.parse(sessionStorage.getItem('monedero'))
    // URL del servicio REST
    let url = "http://127.0.0.1:5000/monederos/borrar/" + monedero.id;
    // Llamada al servicio REST utilizando fetch
    fetch(url)
        .then(response => response.json())
        .then(dataResponse => {
            resultado = dataResponse.toString().split('|')
            if(typeof resultado[1] !== 'undefined' && resultado[1] !== null){
                if(resultado[0] === '00'){
                    sessionStorage.setItem('monedero', null)
                    window.location.href = "contable.html";
                    mostrarNotificacion("Borrado con Exito","#198754") 
                }else{
                    mostrarNotificacion(resultado[1],"#FF0000") 
                }
            }else{
                mostrarNotificacion(resultado[0],"#FF0000") 
            }
            
        })
        .catch(error => {
            mostrarNotificacion("Error al borrar el empleado: " + error.message, "#FF0000")
        });

}