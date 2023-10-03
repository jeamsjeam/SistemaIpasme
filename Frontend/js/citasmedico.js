document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = JSON.parse(sessionStorage.getItem('usuario'))
    if(!(datosUsuario.rol.toUpperCase() === 'CENTRAL DE CITAS' || datosUsuario.rol.toUpperCase() === 'ADMINISTRADOR')){
        window.location.href = "index.html";
    }
});

function buscarEmpleado(ced){
    resetearEtquitasOcultas()
    var cedula = ""
    if(ced !== null && typeof ced !== 'undefined'){
        cedula = ced;
    }else{
        cedula = document.getElementById("buscarCedula").value;
    }
    
    const url = "http://127.0.0.1:5000/empleados/citas/" + cedula;

    document.getElementById("buscarCedula").value = ""
    
    fetch(url)
    .then(response => response.json() )
    .then(data => {
        if(typeof data !== 'undefined' && data !== null){

            mostrarNotificacion("Paciente Encontrado","linear-gradient(to right, #00b09b, #96c93d)") 
            var pacienteEncontrado = document.getElementById("formularioDatosEncontrados");
            var tablaReposos = document.getElementById("tablaCitas");
            //var formularioRegistrarReposo = document.getElementById("formularioRegistrarReposo");
            //var tablaReposos = document.getElementById("tablaReposos");
            pacienteEncontrado.classList.remove("d-none");
            tablaReposos.classList.remove("d-none");
            //formularioRegistrarReposo.classList.remove("d-none");
            //tablaReposos.classList.remove("d-none");
            datosPacienteTabla(data)
            initDataTable(data.citas)
            
        }else{
            mostrarNotificacion("No se encontro paciente","#FF0000") 
        }
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )
}


function datosPacienteTabla(datos){

    sessionStorage.setItem('cedulaCitas', datos.cedula)
    // Asignar valores a las celdas de la tabla
    document.getElementById("datos_nombres").textContent = datos.nombre + " " + datos.apellido;
    document.getElementById("datos_cargo").textContent = datos.cargo.nombre;
    document.getElementById("datos_departamento").textContent = datos.especialidad.nombre;
}

// Función para llenar la tabla con los datos de la lista de objetos

function formatearFecha(fecha) {
    var opciones = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(fecha).toLocaleDateString(undefined, opciones);
}

function resetearEtquitasOcultas(){

    //Formulario 
    var pacienteEncontrado = document.getElementById("formularioDatosEncontrados");
    pacienteEncontrado.classList.add("d-none");

    // var formularioRegistrarReposo = document.getElementById("formularioRegistrarReposo");
    // formularioRegistrarReposo.classList.add("d-none");

    //Tabla de los reposos
    var tablaCitas = document.getElementById("tablaCitas");
    tablaCitas.classList.add("d-none");

}

function PacienteEncontrado(){

    //Formulario 
    var pacienteEncontrado = document.getElementById("formularioDatosEncontrados");
    pacienteEncontrado.classList.remove("d-none");

    // var formularioRegistrarReposo = document.getElementById("formularioRegistrarReposo");
    // formularioRegistrarReposo.classList.remove("d-none");

    //Tabla de los citas
    var tablaCitas = document.getElementById("tablaCitas");
    tablaCitas.classList.add("d-none");
}

/** FIN REPOSO **/

let dataTable;
let dataTableIsInitialized = false;
let numeroPorPagona = 5;

const dataTableOptions = {
    //scrollX: "2000px",
    //lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
        //{ orderable: false, targets: [1, 2] },
        //{ searchable: false, targets: [1] }
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
    },
    sScrollY: (250),
};

function initDataTable(citas) { 
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    listUsers(citas);

    dataTable = $("#datatable_citas").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
}

function listUsers(citas) {
    try {
        let content = ``;
        citas.forEach((cita, index) => {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${cita.fecha != null && typeof cita.fecha !== 'undefined' ? formatDateString(cita.fecha) : ''}</td>
                    <td>${cita.paciente != null && typeof cita.paciente !== 'undefined' ? cita.paciente.nombre + ' ' +  cita.paciente.apellido : ''}</td>
                    <td>${cita.nota != null && typeof cita.nota !== 'undefined' ? cita.nota : ''}</td>
                    <td>${cita.estado_cita != null && typeof cita.estado_cita !== 'undefined' ? cita.estado_cita.nombre : ''}</td>
                    <!-- <td><i class="fa-solid fa-check" style="color: green;"></i></td> -->
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="CambiarEstadoCita(${cita.id},2)"
                        ${cita.id != null && typeof cita.id !== 'undefined' ? '' : 'disabled'}
                        ><i class="fa-solid fa-check"></i></button>
                        <button class="btn btn-sm btn-secondary" onclick="CambiarEstadoCita(${cita.id},4)"
                        ${cita.id != null && typeof cita.id !== 'undefined' ? '' : 'disabled'}
                        ><i class="fa-solid fa-times-circle"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="CambiarEstadoCita(${cita.id},3)"
                        ${cita.id != null && typeof cita.id !== 'undefined' ? '' : 'disabled'}
                        ><i class="fa-solid fa-trash-can"></i></button>
                        
                    </td>
                </tr>`;
        });
        tableBody_citas.innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
}

function CambiarEstadoCita(id,estado){
    const url = "http://127.0.0.1:5000/citas/cambiarEstado/" + id + "/" + estado;

    fetch(url)
    .then(response => response.json() )
    .then(data => {

        // Guardamos el mensaje para saber si fue exitoso o no el registro
        let mensajeResultado = data.toString().split('|')

        if(typeof mensajeResultado[1] !== 'undefined' && mensajeResultado[1] !== null){
            if(mensajeResultado[0] === '00'){
                // Guardamos los datos del paciente en una variable
                datosReposoResultado = data.paciente 
                mostrarNotificacion(mensajeResultado[1],"linear-gradient(to right, #00b09b, #96c93d)") 
                let cedula = parseInt(JSON.parse(sessionStorage.getItem('cedulaCitas')))
                buscarEmpleado(cedula)
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

function GenerarPDF(){
    let cedula = parseInt(JSON.parse(sessionStorage.getItem('cedulaCitas')))
    descargarPDF('citas/pdf','documento',cedula,2)
}
