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
function buscarPerfilUsuario(clave) {
    let cedulaPerfil = sessionStorage.getItem('cedulaPerfil')
    sessionStorage.setItem('modoPerfil', false)
    llenarSelects()
    if (typeof cedulaPerfil != 'undefined' && cedulaPerfil != null && cedulaPerfil != "0" && clave != 0) {
        let urlPerfil = urlEmpleados + "/" + cedulaPerfil;
        // Llamada al servicio REST utilizando fetch
        fetch(urlPerfil)
            .then(response => response.json())
            .then(dataResponse => {
                cargarCard(dataResponse)
                cargarFormulario(dataResponse)
            })
            .catch(error => {
                mostrarNotificacion("Error al obtener data del empleado: " + error.message, "#FF0000")
            });
    }
    else {
        let elemento = document.getElementById("cedula");
        elemento.readOnly = false;
        modoEditar()
    }
}

function modoEditar() {
    let fieldsToEdit = ["nombre", "apellido", "telefono", "fecha_nacimiento", "direccion"];
    let selectsToEdit = ["dependencias", "generos", "especialidades", "cargos", "turnos", "estados_empleados"];
    let modo = sessionStorage.getItem('modoPerfil')

    if (typeof modo != 'undefined' && modo != null && modo != 'false') {
        // Cuando se va a editar
        let divElement = document.getElementById("botonesNormal");
        divElement.classList.remove("d-none");

        divElement = document.getElementById("botonesEditar");
        divElement.classList.add("d-none");

        fieldsToEdit.forEach(fieldName => {
            let labelElement = document.getElementById(fieldName);
            if (labelElement) {
                labelElement.readOnly = true;
                labelElement.value = "";
            }
        });

        selectsToEdit.forEach(fieldName => {
            let labelElement = document.getElementById(fieldName);
            if (labelElement) {
                labelElement.disabled = true;
                labelElement.value = "";
            }
        });

        sessionStorage.setItem('modoPerfil', false)
        buscarPerfilUsuario(1)
    } else {
        let divElement = document.getElementById("botonesNormal");
        divElement.classList.add("d-none");

        divElement = document.getElementById("botonesEditar");
        divElement.classList.remove("d-none");

        fieldsToEdit.forEach(fieldName => {
            let labelElement = document.getElementById(fieldName);

            if (labelElement) {
                labelElement.readOnly = false;
            }
        });

        selectsToEdit.forEach(fieldName => {
            let labelElement = document.getElementById(fieldName);
            if (labelElement) {
                labelElement.disabled = false;
            }
        });

        sessionStorage.setItem('modoPerfil', true)
    }
}

function cargarCard(data) {
    let elemento = document.getElementById("nombreApellidoCard");
    elemento.textContent = data.nombre + " " + data.apellido;

    elemento = document.getElementById("cargoCard");
    elemento.textContent = data.cargo.nombre;

    elemento = document.getElementById("departamentoCard");
    elemento.textContent = data.especialidad.nombre;
}

function cargarFormulario(data) {
    let fieldsToRead = ["cedula", "nombre", "apellido", "telefono", "fecha_nacimiento", "direccion"];
    fieldsToRead.forEach(campo => {
        let elemento = document.getElementById(campo);
        if (elemento) {
            if (campo === "fecha_nacimiento") {
                elemento.value = formatDate(data[campo]);
            } else {
                elemento.value = data[campo];
            }
        }
    });

    elemento = document.getElementById("generos");
    for (let index = 0; index < elemento.options.length; index++) {
        if (elemento.options[index].value == data.genero.id.toString()) {
            elemento.selectedIndex = index;
        }
    }

    elemento = document.getElementById("dependencias");
    for (let index = 0; index < elemento.options.length; index++) {
        if (elemento.options[index].value == data.dependencia.id.toString()) {
            elemento.selectedIndex = index;
        }
    }

    elemento = document.getElementById("turnos");
    for (let index = 0; index < elemento.options.length; index++) {
        if (elemento.options[index].value == data.turno.id.toString()) {
            elemento.selectedIndex = index;
        }
    }

    elemento = document.getElementById("especialidades");
    for (let index = 0; index < elemento.options.length; index++) {
        if (elemento.options[index].value == data.especialidad.id.toString()) {
            elemento.selectedIndex = index;
        }
    }

    elemento = document.getElementById("cargos");
    for (let index = 0; index < elemento.options.length; index++) {
        if (elemento.options[index].value == data.cargo.id.toString()) {
            elemento.selectedIndex = index;
        }
    }

    elemento = document.getElementById("estados_empleados");
    for (let index = 0; index < elemento.options.length; index++) {
        if (elemento.options[index].value == data.estado_empleado.id.toString()) {
            elemento.selectedIndex = index;
        }
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function llenarSelects() {
    let selectsToEdit = ["dependencias", "generos", "especialidades", "cargos", "turnos", "estados_empleados"];

    selectsToEdit.forEach(fieldName => {
        // URL del servicio REST
        let url = "http://127.0.0.1:5000/" + fieldName;
        // Elemento select donde agregaremos las opciones
        let select = document.getElementById(fieldName);
        if (typeof select.options != 'undefined' && select.options != null && select.length > 0) {                        
            for (let index = 0; index < select.options.length; index++) {
                select.removeChild(select.options[index])
            }
        }
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
    });
}

function guardarPerfil() {
    let fieldsToRead = ["cedula", "nombre", "apellido", "telefono", "fecha_nacimiento", "direccion", "dependencias", "generos", "especialidades", "cargos", "turnos", "estados_empleados"];
    let empleado = {}
    fieldsToRead.forEach(x => {
        let elemento = document.getElementById(x);
        if (elemento) {
            empleado[x] = elemento.value
        }
    });

    let urlGuardar = urlEmpleados + "/guardar";
    // Opciones para la petición fetch
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(empleado)
    };
    // Llamada al servicio REST utilizando fetch
    fetch(urlGuardar, options)
        .then(response => response.json())
        .then(dataResponse => {
            resultado = dataResponse.toString().split('|')

            if(typeof resultado[1] !== 'undefined' && resultado[1] !== null){
                if(resultado[0] === '00'){
                    sessionStorage.setItem('cedulaPerfil', empleado["cedula"])
                    let elemento = document.getElementById("cedula");
                    elemento.readOnly = true;
                    mostrarNotificacion("Guardado con Exito","#198754") 
                }else{
                    mostrarNotificacion(resultado[1],"#FF0000") 
                }
            }else{
                mostrarNotificacion(resultado[0],"#FF0000") 
            }
            modoEditar();
            buscarPerfilUsuario(1);
        })
        .catch(error => {
            mostrarNotificacion("Error al registrar al empleado: " + error.message, "#FF0000")
        });
}

function borrarCedula(){
    let cedulaPerfil = sessionStorage.getItem('cedulaPerfil')
    if (typeof cedulaPerfil != 'undefined' && cedulaPerfil != null && cedulaPerfil != "0") {
        let urlBorrar = urlEmpleados + "/borrar/" + cedulaPerfil;
        // Llamada al servicio REST utilizando fetch
        fetch(urlBorrar)
            .then(response => response.json())
            .then(dataResponse => {
                resultado = dataResponse.toString().split('|')
                if(typeof resultado[1] !== 'undefined' && resultado[1] !== null){
                    if(resultado[0] === '00'){
                        sessionStorage.setItem('cedulaPerfil', 0)
                        window.location.href = "personal.html";
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
}