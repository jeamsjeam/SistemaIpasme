document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = JSON.parse(sessionStorage.getItem('usuario'))
    if(!(datosUsuario.rol.toUpperCase() === 'ASISTENCIAL' || datosUsuario.rol.toUpperCase() === 'ADMINISTRADOR' || datosUsuario.rol === 'ADMINISTRADOR (LECTURA)')){
        window.location.href = "index.html";
    }
    //------------------------------Dependencia------------------------------
    // URL del servicio REST que retorna la lista de roles
    const urlDependencia = "http://127.0.0.1:5000/dependencias";
    // Elemento select donde agregaremos las opciones de los roles
    const dependenciaSelect = document.getElementById("seleccionDependencia");

    // Llamada al servicio REST utilizando fetch
    fetch(urlDependencia)
        .then(response => response.json())
        .then(dataDependencia => {
            // data es un array con los objetos de los roles
            // Recorremos cada objeto y agregamos las opciones al select
            dataDependencia.forEach(data => {
                // Creamos una opción para cada rol
                const option = document.createElement("option");
                option.value = data.id;
                option.textContent = data.nombre;
                dependenciaSelect.appendChild(option);
            });
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Dependencia: " + error.message,"#FF0000")
        });

    //------------------------------Municipio------------------------------
    // URL del servicio REST que retorna la lista de roles
    const urlMunicipio = "http://127.0.0.1:5000/municipios";
    // Elemento select donde agregaremos las opciones de los roles
    const municipiosSelect = document.getElementById("seleccionMunicipio");

    // Llamada al servicio REST utilizando fetch
    fetch(urlMunicipio)
        .then(response => response.json())
        .then(dataMunicipio => {
            // data es un array con los objetos de los roles
            // Recorremos cada objeto y agregamos las opciones al select
            dataMunicipio.forEach(data => {
                // Creamos una opción para cada rol
                const option = document.createElement("option");
                option.value = data.id;
                option.textContent = data.nombre;
                municipiosSelect.appendChild(option);
            });
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Municipios: " + error.message,"#FF0000")
        });

    //------------------------------Cargo------------------------------
    // URL del servicio REST que retorna la lista de roles
    const urlCargos = "http://127.0.0.1:5000/cargos";
    // Elemento select donde agregaremos las opciones de los roles
    const cargosSelect = document.getElementById("seleccionCargo");

    // Llamada al servicio REST utilizando fetch
    fetch(urlCargos)
        .then(response => response.json())
        .then(Cargosdata => {
            // data es un array con los objetos de los roles
            // Recorremos cada objeto y agregamos las opciones al select
            Cargosdata.forEach(data => {
                // Creamos una opción para cada rol
                const option = document.createElement("option");
                option.value = data.id;
                option.textContent = data.nombre;
                cargosSelect.appendChild(option);
            });
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Cargos: " + error.message,"#FF0000")
        });

    //------------------------------Tipo Reposo------------------------------
    // URL del servicio REST que retorna la lista de roles
    const urlTipoReposo = "http://127.0.0.1:5000/tipoReposo";
    // Elemento select donde agregaremos las opciones de los roles
    //const cargosTipoReposo = document.getElementById("primerReposoTipoReposo");

    // Llamada al servicio REST utilizando fetch
    fetch(urlTipoReposo)
        .then(response => response.json())
        .then(TipoReposodata => {
            // data es un array con los objetos de los roles
            // Recorremos cada objeto y agregamos las opciones al select
            TipoReposodata.forEach(data => {
                // Creamos una opción para cada rol
                const option = document.createElement("option");
                option.value = data.id;
                option.textContent = data.nombre;
                //cargosTipoReposo.appendChild(option);
            });
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Tipo Reposo: " + error.message,"#FF0000")
        });
});

function buscarPaciente(ced){
    resetearEtquitasOcultas()
    var cedula = ""
    if(ced !== null && typeof ced !== 'undefined'){
        cedula = ced;
    }else{
        cedula = document.getElementById("buscarCedula").value;
    }
    
    const url = "http://127.0.0.1:5000/pacientes/" + cedula;

    document.getElementById("buscarCedula").value = ""
    
    fetch(url)
    .then(response => response.json() )
    .then(data => {
        console.log(data)
        if(typeof data !== 'undefined' && data !== null){
            var pacienteEncontrado = document.getElementById("formularioDatosEncontrados");
            var tablaReposos = document.getElementById("tablaReposos");
            //var formularioRegistrarReposo = document.getElementById("formularioRegistrarReposo");
            //var tablaReposos = document.getElementById("tablaReposos");
            pacienteEncontrado.classList.remove("d-none");
            tablaReposos.classList.remove("d-none");
            //formularioRegistrarReposo.classList.remove("d-none");
            //tablaReposos.classList.remove("d-none");
            toggleDesplegable()
            datosPacienteTabla(data)
            initDataTable(data.reposos)
            
        }else{
            var registrarPaciente = document.getElementById("formularioRegistrarPaciente");
            document.getElementById("registrarPacienteCedula").value = cedula;
            registrarPaciente.classList.remove("d-none");
            mostrarNotificacion("No se encontro paciente","#FF0000") 
            toggleDesplegable()
        }
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )
}

function toggleDesplegable() {
    var contenido = document.getElementById("contenidoDesplegable");
    contenido.style.maxHeight = contenido.style.maxHeight === "" ? "0px" : contenido.style.maxHeight
    contenido.style.maxHeight = contenido.style.maxHeight === "0px" ? contenido.scrollHeight + "px" : "0px";
}

function registrarPacienteNuevo(){

    let cedula = document.getElementById('registrarPacienteCedula').value;
    let nombres = document.getElementById('registrarPacienteNombre').value;
    let apellidos = document.getElementById('registrarPacienteApellido').value;
    let institucion = document.getElementById('registrarPacienteInstitucion').value;
    let direccion = document.getElementById('registrarPacienteDireccion').value;
    let telefono = document.getElementById('registrarPacienteTelefono').value;
    let cargo = document.getElementById('seleccionCargo').value;
    let dependencia = document.getElementById('seleccionDependencia').value;
    let municipio = document.getElementById('seleccionMunicipio').value;
    let fechaNacimiento = document.getElementById('registrarPacienteFechaNacimiento').value;

    // Crear objeto con los valores obtenidos
    let datosPaciente = {
        "cedula": parseInt(cedula),
        "nombre": nombres,
        "apellido": apellidos,
        "institucion_laboral": institucion,
        "fecha_nacimiento": fechaNacimiento,
        "direccion": direccion,
        "telefono": telefono,
        "cargo_id": parseInt(cargo),
        "dependencia_id": parseInt(dependencia),
        "municipio_id": parseInt(municipio)
    };

    // Opciones para la petición fetch
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datosPaciente)
    };

    // URL del servicio que crea el usuario
    const url = "http://127.0.0.1:5000/pacientes/CrearPaciente";

    document.getElementById('registrarPacienteCedula').value = "";
    document.getElementById('registrarPacienteNombre').value = "";
    document.getElementById('registrarPacienteApellido').value = "";
    document.getElementById('registrarPacienteInstitucion').value = "";
    document.getElementById('registrarPacienteDireccion').value = "";
    document.getElementById('registrarPacienteTelefono').value = "";
    document.getElementById('seleccionCargo').value = "";
    document.getElementById('seleccionDependencia').value = "";
    document.getElementById('seleccionMunicipio').value = "";
    document.getElementById('registrarPacienteFechaNacimiento').value = "";

    let datosPacienteResultado = {}
    fetch(url, options)
    .then(Response => Response.json())
    .then(data => {

        // Guardamos el mensaje para saber si fue exitoso o no el registro
        let mensajeResultado = data.mensaje.toString().split('|')

        if(typeof mensajeResultado[1] !== 'undefined' && mensajeResultado[1] !== null){
            if(mensajeResultado[0] === '00'){

                // Guardamos los datos del paciente en una variable
                datosPacienteResultado = data.paciente 
                mostrarNotificacion(mensajeResultado[1],"linear-gradient(to right, #00b09b, #96c93d)") 
                resetearEtquitasOcultas()
            }else{
                mostrarNotificacion(mensajeResultado[1],"#FF0000") 
            }
        }else{
            mostrarNotificacion(mensajeResultado[0],"#FF0000") 
        }
    })
    .catch(err => {
        mostrarNotificacion(err.message,"#FF0000") 
    })
}

function datosPacienteTabla(datos){

    // Asignar valores a las celdas de la tabla
    document.getElementById("datosPaciente_cedula").textContent = datos.cedula;
    sessionStorage.setItem('cedula', parseInt(datos.cedula))
    document.getElementById("datosPaciente_nombres").textContent = datos.nombre;
    document.getElementById("datosPaciente_apellidos").textContent = datos.apellido;
    document.getElementById("datosPaciente_institucion_laboral").textContent = datos.institucion_laboral;
    document.getElementById("datosPaciente_fecha_nacimiento").textContent = formatearFecha(datos.fecha_nacimiento);
    let datosPaciente_dias_reposo = datos.dias_reposo
    let datosPaciente_permiso = 2
    if (datosPaciente_dias_reposo > 62) {
        document.getElementById("datosPaciente_dias_reposo").innerHTML = '<span class="requerido">' + datosPaciente_dias_reposo + '</span>';
    } else {
        document.getElementById("datosPaciente_dias_reposo").textContent = datosPaciente_dias_reposo;
    }
    document.getElementById("datosPaciente_telefono").textContent = datos.telefono;
    document.getElementById("datosPaciente_direccion").textContent = datos.direccion;
    document.getElementById("datosPaciente_cargo").textContent = datos.cargo.nombre;
    document.getElementById("datosPaciente_dependencia").textContent = datos.dependencia.nombre;
    document.getElementById("datosPaciente_municipio").textContent = datos.municipio.nombre;

    // Habilitar o deshabilitar botones según el permiso
    var modificarButton = document.getElementById("modificarButton");
    var eliminarButton = document.getElementById("eliminarButton");

    if (datosPaciente_permiso === 2) {
        modificarButton.disabled = true;
        eliminarButton.disabled = true;
    } else {
        modificarButton.disabled = false;
        eliminarButton.disabled = false;
    }

    //llenarTablaReposos(datos.reposos);
}

function registrarReposo(){

    let codAsistencial = document.getElementById('reposoCodAsistencial').value;
    let codRegistro = document.getElementById('reposoCodRegistro').value;
    let fechaDesde = document.getElementById('reposofechaDesde').value;
    let fechaHasta = document.getElementById('reposofechaHasta').value;
    let quienValida = document.getElementById('reposoValida').value;
    let cedula = parseInt(sessionStorage.getItem('cedula'));

    // Crear objeto con los valores obtenidos
    let datosReposo = {
        "cedula": cedula,
        "tipo_reposo_id": 1,
        "grupo_reposo_fecha_inicio": fechaDesde,
        "reposos": [
            {
                "codigo_asistencial": codAsistencial,
                "codigo_registro": codRegistro,
                "fecha_inicio": fechaDesde,
                "fecha_fin": fechaHasta,
                "quien_valida": quienValida
            }
        ]
    };

    // Opciones para la petición fetch
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datosReposo)
    };

    // URL del servicio que crea el usuario
    const url = "http://127.0.0.1:5000/pacientes/CrearReposo";

    document.getElementById('reposoCodAsistencial').value = "";
    document.getElementById('reposoCodRegistro').value = "";
    document.getElementById('reposofechaDesde').value = "";
    document.getElementById('reposofechaHasta').value = "";
    document.getElementById('reposoValida').value = "";

    let datosReposoResultado = {}
    fetch(url, options)
    .then(Response => Response.json())
    .then(data => {

        // Guardamos el mensaje para saber si fue exitoso o no el registro
        let mensajeResultado = data.toString().split('|')
        console.log(data)

        if(typeof mensajeResultado[1] !== 'undefined' && mensajeResultado[1] !== null){
            if(mensajeResultado[0] === '00'){

                // Guardamos los datos del paciente en una variable
                datosReposoResultado = data.paciente 
                mostrarNotificacion(mensajeResultado[1],"linear-gradient(to right, #00b09b, #96c93d)") 
                buscarPaciente(parseInt(sessionStorage.getItem('cedula')))
            }else{
                mostrarNotificacion(mensajeResultado[1],"#FF0000") 
            }
        }else{
            mostrarNotificacion(mensajeResultado[0],"#FF0000") 
        }
    })
    .catch(err => {
        mostrarNotificacion(err.message,"#FF0000") 
    })
}


// Función para llenar la tabla con los datos de la lista de objetos
function llenarTablaReposos(datos) {

    var tablaBody = document.getElementById("tabla-body");

    // Recorrer los datos de reposos y crear las filas y celdas correspondientes
    datos.forEach(function(reposo) {
        var filaReposo = document.createElement("tr");

        var celdaCodigoAsistencial = document.createElement("td");
        celdaCodigoAsistencial.textContent = reposo.codigo_asistencial;
        filaReposo.appendChild(celdaCodigoAsistencial);

        var celdaCodigoRegistro = document.createElement("td");
        celdaCodigoRegistro.textContent = reposo.codigo_registro;
        filaReposo.appendChild(celdaCodigoRegistro);

        var celdaReposoCuido = document.createElement("td");
        //celdaReposoCuido.textContent = reposo.reposo_cuido === 1 ? "Reposo" : "Cuido";
        celdaReposoCuido.textContent = "Reposo";
        filaReposo.appendChild(celdaReposoCuido);

        var celdaFechaDesde = document.createElement("td");
        celdaFechaDesde.textContent = formatearFecha(reposo.fecha_inicio);
        filaReposo.appendChild(celdaFechaDesde);

        var celdaFechaHasta = document.createElement("td");
        celdaFechaHasta.textContent = formatearFecha(reposo.fecha_fin);
        filaReposo.appendChild(celdaFechaHasta);

        var celdaQuienValida = document.createElement("td");
        celdaQuienValida.textContent = reposo.quien_valida;
        filaReposo.appendChild(celdaQuienValida);

        var celdaEspecialidadValida = document.createElement("td");
        celdaEspecialidadValida.textContent = reposo.especialidad_valida;
        filaReposo.appendChild(celdaEspecialidadValida);

        var celdaAccion = document.createElement("td");
        // Agregar el contenido deseado en la celda de Acción aquí, por ejemplo:
        // celdaAccion.innerHTML = '<button class="btn btn-secondary">Acción</button>';
        filaReposo.appendChild(celdaAccion);

        // Agregar la fila al tbody de la tabla
        tablaBody.appendChild(filaReposo);
    });
}

function formatearFecha(fecha) {
    var opciones = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(fecha).toLocaleDateString(undefined, opciones);
}

function resetearEtquitasOcultas(){

    //Formulario con datos del paciente y registro de reposos
    var pacienteEncontrado = document.getElementById("formularioDatosEncontrados");
    pacienteEncontrado.classList.add("d-none");

    // var formularioRegistrarReposo = document.getElementById("formularioRegistrarReposo");
    // formularioRegistrarReposo.classList.add("d-none");

    //Tabla de los reposos
    var tablaReposos = document.getElementById("tablaReposos");
    tablaReposos.classList.add("d-none");

    //Formulario para paciente nuevo
    var registrarPaciente = document.getElementById("formularioRegistrarPaciente");
    registrarPaciente.classList.add("d-none");

    //Desplegable
    var contenido = document.getElementById("contenidoDesplegable");
    contenido.style.maxHeight = "";
}

function PacienteEncontrado(){

    //Formulario con datos del paciente y registro de reposos
    var pacienteEncontrado = document.getElementById("formularioDatosEncontrados");
    pacienteEncontrado.classList.remove("d-none");

    // var formularioRegistrarReposo = document.getElementById("formularioRegistrarReposo");
    // formularioRegistrarReposo.classList.remove("d-none");

    //Tabla de los reposos
    var tablaReposos = document.getElementById("tablaReposos");
    tablaReposos.classList.add("d-none");

    //Formulario para paciente nuevo
    var registrarPaciente = document.getElementById("formularioRegistrarPaciente");
    registrarPaciente.classList.add("d-none");

    //Desplegable
    var contenido = document.getElementById("contenidoDesplegable");
    contenido.style.maxHeight = "";
}

let dataTable;
let dataTableIsInitialized = false;
let numeroPorPagona = 5;

const dataTableOptions = {
    //scrollX: "2000px",
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
        { orderable: false, targets: [5, 6] },
        { searchable: false, targets: [1] }
        //{ width: "50%", targets: [0] }
    ],
    pageLength: numeroPorPagona,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún reposo encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún reposo encontrado",
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

function initDataTable(reposos) { 
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    // Añade registros vacíos si es necesario para mantener el tamaño deseado
    let numeroFilasAgregar =  reposos.length;
    let banderaAgregarFilas = true
    debugger
    if(numeroFilasAgregar >= numeroPorPagona){
        while(banderaAgregarFilas){
            if(numeroFilasAgregar >= numeroPorPagona){
                numeroFilasAgregar = numeroFilasAgregar - numeroPorPagona;
            }else{
                banderaAgregarFilas = false
            }
        }
    }else{
        numeroFilasAgregar = numeroPorPagona - numeroFilasAgregar + 1;
    }
    
    debugger
    for (let i = 1; i < numeroFilasAgregar; i++) {
        reposos.push({});
    }
    debugger
    listUsers(reposos);

    dataTable = $("#datatable_reposos").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
}

function listUsers(reposos) {
    try {
        let content = ``;
        reposos.forEach((reposo, index) => {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${reposo.codigo_asistencial != null && typeof reposo.codigo_asistencial !== 'undefined' ? reposo.codigo_asistencial : ''}</td>
                    <td>${reposo.codigo_registro != null && typeof reposo.codigo_registro !== 'undefined' ? reposo.codigo_registro : ''}</td>
                    <td>${reposo.fecha_inicio != null && typeof reposo.fecha_inicio !== 'undefined' ? formatDateString(reposo.fecha_inicio) : ''}</td>
                    <td>${reposo.fecha_fin != null && typeof reposo.fecha_fin !== 'undefined' ? formatDateString(reposo.fecha_fin) : ''}</td>
                    <td>${reposo.quien_valida != null && typeof reposo.quien_valida !== 'undefined' ? reposo.quien_valida : ''}</td>
                    <!-- <td><i class="fa-solid fa-check" style="color: green;"></i></td> -->
                    <td>
                        <button class="btn btn-sm btn-primary"
                        ${reposo.quien_valida != null && typeof reposo.quien_valida !== 'undefined' ? '' : 'disabled'}
                        ><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-sm btn-danger"
                        ${reposo.quien_valida != null && typeof reposo.quien_valida !== 'undefined' ? '' : 'disabled'}
                        ><i class="fa-solid fa-trash-can"></i></button>
                        
                    </td>
                </tr>`;
        });
        tableBody_reposos.innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
}

function formatDateString(dateString) {
    // Crea un objeto Date a partir de la cadena de fecha
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
        return "Fecha no válida"; // Maneja casos en los que la cadena de fecha no es válida
    }
    
    const day = String(date.getDate()).padStart(2, '0'); // Obtener el día y agregar ceros a la izquierda si es necesario
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtener el mes (los meses comienzan desde 0) y agregar ceros a la izquierda si es necesario
    const year = date.getFullYear(); // Obtener el año

    return `${day}-${month}-${year}`;
}