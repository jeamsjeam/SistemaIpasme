const urlTurno = "http://127.0.0.1:5000/turnos";
function cargarTurnos() {
    // Llamada al servicio REST utilizando fetch
    fetch(urlTurno)
        .then(response => response.json())
        .then(dataResponse => {
            let turnosContainer = document.getElementById("turnos");
            for (let index = 0; index < turnosContainer.children.length; index++) {
                turnosContainer.removeChild(turnosContainer.children[index]);
            }
            dataResponse.forEach((turno) => {
                agregarTurnoUI(turno);
            });
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los turnos: " + error.message, "#FF0000")
        });
}

function agregarTurnoUI(turno) {
    let turnosContainer = document.getElementById("turnos");
    let nuevoTurno = document.createElement("div");

    let horaLlegada = turno.hora_llegada;
    let horaSalida = turno.hora_salida;

    if (turno.id != 0) {
        horaLlegada = turno.hora_llegada.split('T')[1].substring(0, 5);
        horaSalida = turno.hora_salida.split('T')[1].substring(0, 5);
    }
    nuevoTurno.className = "row pt-3";
    nuevoTurno.id = turno.id
    nuevoTurno.innerHTML = `
            <div class="col-lg-3">
                Nombre Turno
                <input type="text" class="form-control" id="nombre-turno-${turno.id}" value="${turno.nombre}" />
            </div>
            <div class="col-lg-4">
                Hora Entrada
                <div class="cs-form">
                    <input type="time" class="form-control" id="hora-entrada-${turno.id}" value="${horaLlegada}" />
                </div>
            </div>
            <div class="col-lg-4">
                Hora Salida
                <div class="cs-form">
                    <input type="time" class="form-control" id="hora-salida-${turno.id}" value="${horaSalida}" />
                </div>
            </div>
            <div class="col-lg-1 align-self-end">
                <button class="btn btn-danger btn-sm" onclick="eliminarTurno(this,${turno.id})">Eliminar</button>
            </div>
        `;

    turnosContainer.appendChild(nuevoTurno);
}

function agregarNuevoTurno() {
    let nuevoTurno = { id: 0, nombre: "", hora_llegada: "08:05", hora_salida: "14:05" };
    agregarTurnoUI(nuevoTurno);
}

function eliminarTurno(button, id) {
    if (id == 0) {
        const turnoAEliminar = button.parentElement.parentElement;
        let turnosContainer = document.getElementById("turnos");
        turnosContainer.removeChild(turnoAEliminar);
    } else {
        urlBorrar = urlTurno + "/borrar/" + id.toString()
        // Llamada al servicio REST utilizando fetch
        fetch(urlBorrar)
            .then(response => response.json())
            .then(dataResponse => {
                resultado = dataResponse.toString().split('|')

                if (typeof resultado[1] !== 'undefined' && resultado[1] !== null) {
                    if (resultado[0] === '00') {
                        cargarTurnos()
                        mostrarNotificacion("Borrado con Exito", "#198754")
                    } else {
                        mostrarNotificacion(resultado[1], "#FF0000")
                    }
                } else {
                    mostrarNotificacion(resultado[0], "#FF0000")
                }
            })
            .catch(error => {
                mostrarNotificacion("Error al borrar el turno: " + error.message, "#FF0000")
            });
    }
}

function guardarTurnos() {
    let turnosContainer = document.getElementById("turnos");
    let listaTurnos = [];
    for (let index = 0; index < turnosContainer.children.length; index++) {
        let turno = {};

        turno.id = parseInt(turnosContainer.children[index].id);
        turno.nombre = turnosContainer.children[index].children[0].children[0].value;

        let hora_llegada = turnosContainer.children[index].children[1].children[0].children[0].value;
        turno.hora_llegada = "2023-01-01T" + hora_llegada + ":00.000Z";
        let hora_salida = turnosContainer.children[index].children[2].children[0].children[0].value;
        turno.hora_salida = "2023-01-01T" + hora_salida + ":00.000Z";

        listaTurnos.push(turno)
    }

    let url = urlTurno + "/guardar"
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(listaTurnos)
    };

    fetch(url, options)
        .then(response => response.json())
        .then(dataResponse => {
            resultado = dataResponse.toString().split('|')
            if (typeof resultado[1] !== 'undefined' && resultado[1] !== null) {
                if (resultado[0] === '00') {
                    mostrarNotificacion("Guardado con Exito", "#198754")
                    cargarTurnos()
                } else {
                    mostrarNotificacion(resultado[1], "#FF0000")
                }
            } else {
                mostrarNotificacion(resultado[0], "#FF0000")
            }
        })
        .catch(error => {
            mostrarNotificacion("Error al guardar los turnos: " + error.message, "#FF0000")
        });
}