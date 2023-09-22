document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = JSON.parse(sessionStorage.getItem('usuario'))
    if(!(datosUsuario.rol.toUpperCase() === 'ASISTENCIAL' || datosUsuario.rol.toUpperCase() === 'ADMINISTRADOR')){
        window.location.href = "index.html";
    }
    //------------------------------Dependencia------------------------------
    // URL del servicio REST que retorna la lista de roles
    const urlPacientes= "http://127.0.0.1:5000/pacientes";

    // Llamada al servicio REST utilizando fetch
    fetch(urlPacientes)
        .then(response => response.json())
        .then(data => {
            // data es un array con los objetos de los roles
            // Recorremos cada objeto y agregamos las opciones al select
            if(data !== null && typeof data !== 'undefined' && data.length > 0){
                mostrarNotificacion("Lista de pacientes","linear-gradient(to right, #00b09b, #96c93d)") 
                initDataTable(data)
            }else{
                mostrarNotificacion("No se consiguieron pacientes","#FF0000")
            }
            
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los pacientes: " + error.message,"#FF0000")
        });

});

let dataTable;
let dataTableIsInitialized = false;
let numeroPorPagona = 10;

const dataTableOptions = {
    //scrollX: "2000px",
    lengthMenu: [10],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
        //{ orderable: false, targets: [1, 2] },
        { searchable: false, targets: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
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
    sScrollY: (500)
};

function initDataTable(pacientes) { 
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    listPacientes(pacientes);

    dataTable = $("#datatable_Pacientes").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
}

function listPacientes(datos) {
    try {
        let content = ``;
        datos.forEach((dato, index) => {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${dato.cedula !== null && typeof dato.cedula !== 'undefined' ? dato.cedula : ''}</td>
                    <td>${dato.nombre !== null && typeof dato.nombre !== 'undefined' ? dato.nombre : ''}</td>
                    <td>${dato.apellido !== null && typeof dato.apellido !== 'undefined' ? dato.apellido : ''}</td>
                    <td>${dato.fecha_nacimiento != null && typeof dato.fecha_nacimiento !== 'undefined' ? formatDateString(dato.fecha_nacimiento) : ''}</td>
                    <td>${dato.telefono !== null && typeof dato.telefono !== 'undefined' ? dato.telefono : ''}</td>
                    <td>${dato.correo !== null && typeof dato.correo !== 'undefined' ? dato.correo : ''}</td> 
                    <td>${dato.municipio !== null && typeof dato.municipio !== 'undefined' ? dato.municipio.nombre : ''}</td>
                    <td>${dato.institucion_laboral !== null && typeof dato.institucion_laboral !== 'undefined' ? dato.institucion_laboral : ''}</td>
                    <td>${dato.cargo !== null && typeof dato.cargo !== 'undefined' ? dato.cargo.nombre : ''}</td>
                    <td>${dato.dependencia !== null && typeof dato.dependencia !== 'undefined' ? dato.dependencia.nombre : ''}</td>
                    <td>${dato.dias_reposo !== null && typeof dato.dias_reposo !== 'undefined' ? dato.dias_reposo : ''}</td>
                    <td>${dato.tipo_paciente !== null && typeof dato.tipo_paciente !== 'undefined' ? dato.tipo_paciente.nombre : ''}</td>
                    <!-- <td><i class="fa-solid fa-check" style="color: green;"></i></td> -->
                    <td>
                        <button class="btn btn-sm btn-primary"
                        ${dato.cedula !== null && typeof dato.cedula !== 'undefined' ? '' : 'disabled'}
                        ><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-sm btn-danger"
                        ${dato.cedula !== null && typeof dato.cedula !== 'undefined' ? '' : 'disabled'}
                        ><i class="fa-solid fa-trash-can"></i></button>
                        
                    </td>
                </tr>`;
        });
        tableBody_pacientes.innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
}