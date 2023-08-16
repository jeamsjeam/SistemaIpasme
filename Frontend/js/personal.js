// Variables globales
const urlEmpleados = "http://127.0.0.1:5000/empleados";

// Función para crear la lista de trabajadores por especialidad
function mostrarListaTrabajadores() {
    let urlPorEspecialidad = urlEmpleados + "/agrupadosEspecialidad";
    // Llamada al servicio REST utilizando fetch
    fetch(urlPorEspecialidad)
        .then(response => response.json())
        .then(dataResponse => {
            const listaTrabajadores = document.getElementById('listaTrabajadores');
            dataResponse.forEach((depto) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                        <div class="card-header">${depto.especialidad}</div>
                        <div class="card-body">
                            <ul class="list-group">
                            ${depto.trabajadores.map((trabajador) => `
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <span class="text-muted">${trabajador.cedula}</span>
                                    <span class = "ms-2">${trabajador.nombre}</span>
                                    <span class = "ms-2 text-muted">${trabajador.cargo}</span>
                                </div>
                                <div>
                                    <button class="btn btn-primary btn-sm" onclick="verPerfil(${trabajador.cedula})"><img src="css/imagenes/eye-solid.svg" alt="Icono" width="16" height="16"></button>
                                </div>
                                </li>
                            `).join('')}
                            </ul>
                        </div>
                `;
                listaTrabajadores.appendChild(card);
            });
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Empleados: " + error.message, "#FF0000")
        });
}

// Función que muestra el id del empleado por consola al presionar los botones
function verPerfil(ced) {
    sessionStorage.setItem('cedulaPerfil', JSON.stringify(ced))
    window.location.href = "perfil.html";
}

// Función para crear la lista de trabajadores por especialidad
function buscarPerfilUsuario() {
    let cedulaPerfil = sessionStorage.getItem('cedulaPerfil')
    sessionStorage.setItem('modoPerfil', false)
    if (typeof cedulaPerfil === 'undefined' && cedulaPerfil === null && cedulaPerfil != 0) {
        let urlPerfil = urlEmpleados + "/" + cedulaPerfil;
        // Llamada al servicio REST utilizando fetch
        fetch(urlPerfil)
            .then(response => response.json())
            .then(dataResponse => {
                console.log(dataResponse)
            })
            .catch(error => {
                mostrarNotificacion("Error al obtener data del empleado: " + error.message, "#FF0000")
            });
    }
}

function modoEditar() {
    let fieldsToEdit = ["nombre", "apellido", "correo", "telefono", "nacimiento", "direccion"];
    let modo = sessionStorage.getItem('modoPerfil')

    if (typeof modo != 'undefined' && modo != null && modo != 'false') {
        let divElement = document.getElementById("botonesNormal");
        divElement.classList.remove("d-none");

        divElement = document.getElementById("botonesEditar");
        divElement.classList.add("d-none");

        fieldsToEdit.forEach(fieldName => {
            let labelElement = document.getElementById(fieldName);
            let inputElement = document.getElementById(fieldName + "Input");

            if (labelElement && inputElement) {
                labelElement.classList.remove("d-none");
                inputElement.classList.add("d-none");
                inputElement.value = ""; // Limpiar el contenido del input
            }
        });
        sessionStorage.setItem('modoPerfil', false)
    } else {
        let divElement = document.getElementById("botonesNormal");
        divElement.classList.add("d-none");

        divElement = document.getElementById("botonesEditar");
        divElement.classList.remove("d-none");

        fieldsToEdit.forEach(fieldName => {
            let labelElement = document.getElementById(fieldName);
            let inputElement = document.getElementById(fieldName + "Input");

            if (labelElement && inputElement) {
                labelElement.classList.add("d-none");
                inputElement.classList.remove("d-none");
            }
        });
        sessionStorage.setItem('modoPerfil', true)
    }
}