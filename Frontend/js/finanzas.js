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
                                <div class="card-img-overlay d-flex flex-column">
                                    <div class="card-body">
                                        <h4 class="card-title mt-0 text-white text-center"><i class="fa-solid fa-wallet"></i>  ${data.nombre}</h4>
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

function seleccionarMonedero(id){
    sessionStorage.setItem('monedero', monederoId)
    window.location.href = "movimientos.html"
}
