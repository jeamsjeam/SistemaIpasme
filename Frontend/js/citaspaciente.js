document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = JSON.parse(sessionStorage.getItem('usuario'))
    if(!(datosUsuario.rol.toUpperCase() === 'ASISTENCIAL' || datosUsuario.rol.toUpperCase() === 'ADMINISTRADOR')){
        window.location.href = "index.html";
    }
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
            mostrarNotificacion("Paciente Encontrado","linear-gradient(to right, #00b09b, #96c93d)") 
            var pacienteEncontrado = document.getElementById("formularioDatosEncontrados");
            var tablaReposos = document.getElementById("tablaReposos");
            //var formularioRegistrarReposo = document.getElementById("formularioRegistrarReposo");
            //var tablaReposos = document.getElementById("tablaReposos");
            pacienteEncontrado.classList.remove("d-none");
            tablaReposos.classList.remove("d-none");
            //formularioRegistrarReposo.classList.remove("d-none");
            //tablaReposos.classList.remove("d-none");
            datosPacienteTabla(data)
            initDataTable(data.reposos)
            
        }else{
            mostrarNotificacion("No se encontro paciente","#FF0000") 
        }
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )
}


function datosPacienteTabla(datos){
    sessionStorage.setItem('datosPaciente', JSON.stringify(datos))
    // Asignar valores a las celdas de la tabla
    document.getElementById("datosPaciente_cedula").textContent = datos.cedula;
    document.getElementById("datosPaciente_nombres").textContent = datos.nombre;
    document.getElementById("datosPaciente_apellidos").textContent = datos.apellido;
    document.getElementById("datosPaciente_institucion_laboral").textContent = datos.institucion_laboral;
    document.getElementById("datosPaciente_fecha_nacimiento").textContent = formatearFecha(datos.fecha_nacimiento);
    document.getElementById("datosPaciente_telefono").textContent = datos.telefono;
    document.getElementById("datosPaciente_correo").textContent = datos.correo;
    document.getElementById("datosPaciente_cargo").textContent = datos.cargo.nombre;
    document.getElementById("datosPaciente_dependencia").textContent = datos.dependencia.nombre;
    document.getElementById("datosPaciente_municipio").textContent = datos.municipio.nombre;
    document.getElementById("datosPaciente_tipo_paciente").textContent = datos.tipo_paciente.nombre;

}

// Función para llenar la tabla con los datos de la lista de objetos

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
}

/** FIN REPOSO **/

let dataTable;
let dataTableIsInitialized = false;
let numeroPorPagona = 5;

const dataTableOptions = {
    //scrollX: "2000px",
    //lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4] },
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

function initDataTable(reposos) { 
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

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
                    <td>${reposo.fecha_inicio != null && typeof reposo.fecha_inicio !== 'undefined' ? formatDateString(reposo.fecha_inicio) : ''}</td>
                    <td>${reposo.fecha_fin != null && typeof reposo.fecha_fin !== 'undefined' ? formatDateString(reposo.fecha_fin) : ''}</td>
                    <td>${reposo.quien_valida != null && typeof reposo.quien_valida !== 'undefined' ? reposo.quien_valida : ''}</td>
                    <!-- <td><i class="fa-solid fa-check" style="color: green;"></i></td> -->
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="AbrirModalModificarReposo(${reposo.id})"
                        ${reposo.quien_valida != null && typeof reposo.quien_valida !== 'undefined' ? '' : 'disabled'}
                        ><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="AbrirModalEliminarReposo(${reposo.id})"
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

function GenerarPDF(){
    let datosPaciente = JSON.parse(sessionStorage.getItem('datosPaciente'))
    let cedula = parseInt(datosPaciente.cedula);
    descargarPDF('pacientes/individualPDF','documento',cedula)
}
