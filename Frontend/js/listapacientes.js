document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = JSON.parse(sessionStorage.getItem('usuario'))
    if(!(datosUsuario.rol.toUpperCase() === 'ASISTENCIAL' || datosUsuario.rol.toUpperCase() === 'ADMINISTRADOR')){
        window.location.href = "index.html";
    }

    //------------------------------Dependencia------------------------------
    // URL del servicio REST que retorna la lista de Dependencia
    const urlDependencia = "http://127.0.0.1:5000/dependencias";
    
    // Elemento select donde agregaremos las opciones de als Dependencia
    const dependenciaSelectModal = document.getElementById("seleccionDependenciaModal");

    // Llamada al servicio REST utilizando fetch
    fetch(urlDependencia)
        .then(response => response.json())
        .then(dataDependencia => {
            // data es un array con los objetos de las Dependencia
            // Recorremos cada objeto y agregamos las opciones al select
            dataDependencia.forEach(data => {
                // Creamos una opción para cada rol
                const option = document.createElement("option");
                option.value = data.id;
                option.textContent = data.nombre;
                dependenciaSelectModal.appendChild(option);
            });
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Dependencia: " + error.message,"#FF0000")
        });

    //------------------------------Municipio------------------------------
    // URL del servicio REST que retorna la lista de municipio
    const urlMunicipio = "http://127.0.0.1:5000/municipios";

    // Elemento select donde agregaremos las opciones de los municipio
    const municipiosSelectModal = document.getElementById("seleccionMunicipioModal");

    // Llamada al servicio REST utilizando fetch
    fetch(urlMunicipio)
        .then(response => response.json())
        .then(dataMunicipio => {
            // data es un array con los objetos de los municipio
            // Recorremos cada objeto y agregamos las opciones al select
            dataMunicipio.forEach(data => {
                // Creamos una opción para cada rol
                const option = document.createElement("option");
                option.value = data.id;
                option.textContent = data.nombre;
                municipiosSelectModal.appendChild(option);
            });
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Municipios: " + error.message,"#FF0000")
        });

    //------------------------------Cargo------------------------------
    // URL del servicio REST que retorna la lista de cargo
    const urlCargos = "http://127.0.0.1:5000/cargos";

    // Elemento select donde agregaremos las opciones de los cargo
    const cargosSelectModal = document.getElementById("seleccionCargoModal");

    // Llamada al servicio REST utilizando fetch
    fetch(urlCargos)
        .then(response => response.json())
        .then(Cargosdata => {
            // data es un array con los objetos de los cargo
            // Recorremos cada objeto y agregamos las opciones al select
            Cargosdata.forEach(data => {
                // Creamos una opción para cada rol
                const option = document.createElement("option");
                option.value = data.id;
                option.textContent = data.nombre;
                cargosSelectModal.appendChild(option);
            });
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Cargos: " + error.message,"#FF0000")
        });

        //------------------------------Tipos Paciente------------------------------
        // URL del servicio REST que retorna la lista de tipo de pacientes
        const urlTipoPaciente = "http://127.0.0.1:5000/tiposPaciente";

        // Elemento select donde agregaremos las opciones de los tipos de pacientes
        const tipoPacienteSelectModal = document.getElementById("seleccionTipoPacienteModal");

        // Llamada al servicio REST utilizando fetch
        fetch(urlTipoPaciente)
            .then(response => response.json())
            .then(tipoPacientedata => {
                // data es un array con los objetos de lostipo de pacientes
                // Recorremos cada objeto y agregamos las opciones al select
                tipoPacientedata.forEach(data => {
                    // Creamos una opción para cada rol
                    const option = document.createElement("option");
                    option.value = data.id;
                    option.textContent = data.nombre;
                    tipoPacienteSelectModal.appendChild(option);
                });
            })
            .catch(error => {
                mostrarNotificacion("Error al obtener los TIpos de paciente: " + error.message,"#FF0000")
        });

    BuscarPacientes()
});

function BuscarPacientes(){
    //------------------------------Pacientes------------------------------
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
                initDataTable([])
            }
            
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los pacientes: " + error.message,"#FF0000")
        });
}

async function buscarPacienteSolo(cedula){
    // URL del servicio REST que busca un reposo
    const url = "http://127.0.0.1:5000/pacientes/solo/" + cedula;

    try {
        const response = await fetch(url);
    
        if (!response.ok) {
          mostrarNotificacion(`Error al consultar el servicio: ${response.status} ${response.statusText}`,"#FF0000")
          return null
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        mostrarNotificacion("Error al obtener el paciente: " + error.message,"#FF0000")
        return null
      }

}

async function AbrirModalModificarPaciente(cedula){
    let datosPaciente = {}
    if(cedula === null || typeof cedula === 'undefined'){
        datosPaciente = JSON.parse(sessionStorage.getItem('datosPaciente'))
    }else{
        datosPaciente = await buscarPacienteSolo(cedula)
    }

    document.getElementById('registrarPacienteCedulaModal').value = datosPaciente.cedula;
    document.getElementById('registrarPacienteNombreModal').value = datosPaciente.nombre;
    document.getElementById('registrarPacienteApellidoModal').value = datosPaciente.apellido;
    document.getElementById('registrarPacienteInstitucionModal').value = datosPaciente.institucion_laboral;
    document.getElementById('registrarPacienteDireccionModal').value = datosPaciente.direccion;
    document.getElementById('registrarPacienteTelefonoModal').value = datosPaciente.telefono;
    document.getElementById('registrarPacienteCorreoModal').value = datosPaciente.correo;
    document.getElementById('seleccionCargoModal').value = datosPaciente.cargo.id;
    document.getElementById('seleccionDependenciaModal').value = datosPaciente.dependencia.id;
    document.getElementById('seleccionMunicipioModal').value = datosPaciente.municipio.id;
    document.getElementById('seleccionTipoPacienteModal').value = datosPaciente.tipo_paciente.id;
    var partesFecha = formatearFecha(datosPaciente.fecha_nacimiento).split('/'); 
    var anio = partesFecha[2];
    var mes = partesFecha[0].length === 1 ? "0" + partesFecha[0] : partesFecha[0];
    var dia = partesFecha[1].length === 1 ? "0" + partesFecha[1] : partesFecha[1];
    var fechaFormateada = anio + '-' + mes + '-' + dia;
    document.getElementById('registrarPacienteFechaNacimientoModal').value = fechaFormateada;
    
    $('#modificarModal').modal('show');
}

function ModificarPaciente(){
    let cedula = document.getElementById('registrarPacienteCedulaModal').value;
    let nombres = document.getElementById('registrarPacienteNombreModal').value;
    let apellidos = document.getElementById('registrarPacienteApellidoModal').value;
    let institucion = document.getElementById('registrarPacienteInstitucionModal').value;
    let direccion = document.getElementById('registrarPacienteDireccionModal').value;
    let telefono = document.getElementById('registrarPacienteTelefonoModal').value;
    let correo = document.getElementById('registrarPacienteCorreoModal').value;
    let cargo = document.getElementById('seleccionCargoModal').value;
    let dependencia = document.getElementById('seleccionDependenciaModal').value;
    let municipio = document.getElementById('seleccionMunicipioModal').value;
    let tipoPaciente = document.getElementById('seleccionTipoPacienteModal').value;
    let fechaNacimiento = document.getElementById('registrarPacienteFechaNacimientoModal').value;

    // Crear objeto con los valores obtenidos
    let datosPaciente = {
        "cedula": parseInt(cedula),
        "nombre": nombres,
        "apellido": apellidos,
        "institucion_laboral": institucion,
        "fecha_nacimiento": fechaNacimiento,
        "direccion": direccion,
        "telefono": telefono,
        "correo": (correo !== null && typeof correo !== 'undefined' ? correo : ""),
        "cargo_id": parseInt(cargo),
        "dependencia_id": parseInt(dependencia),
        "municipio_id": parseInt(municipio),
        "tipo_paciente_id": parseInt(tipoPaciente),
        "usuario_id": 0
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
    const url = "http://127.0.0.1:5000/pacientes/ModificarPaciente";

    document.getElementById('registrarPacienteCedulaModal').value = "";
    document.getElementById('registrarPacienteNombreModal').value = "";
    document.getElementById('registrarPacienteApellidoModal').value = "";
    document.getElementById('registrarPacienteInstitucionModal').value = "";
    document.getElementById('registrarPacienteDireccionModal').value = "";
    document.getElementById('registrarPacienteTelefonoModal').value = "";
    document.getElementById('registrarPacienteCorreoModal').value = "";
    document.getElementById('seleccionCargoModal').value = 1;
    document.getElementById('seleccionDependenciaModal').value = 1;
    document.getElementById('seleccionMunicipioModal').value = 1;
    document.getElementById('seleccionTipoPacienteModal').value = 1;
    document.getElementById('registrarPacienteFechaNacimientoModal').value = "";

    fetch(url, options)
    .then(Response => Response.json())
    .then(data => {
  
        // Guardamos el mensaje para saber si fue exitoso o no el registro
        let mensajeResultado = data.mensaje.toString().split('|')
        
        if(typeof mensajeResultado[1] !== 'undefined' && mensajeResultado[1] !== null){
            if(mensajeResultado[0] === '00'){
            
                mostrarNotificacion(mensajeResultado[1],"linear-gradient(to right, #00b09b, #96c93d)") 
                BuscarPacientes()
            }else{
                mostrarNotificacion(mensajeResultado[1],"#FF0000") 
            }
        }else{
            mostrarNotificacion(mensajeResultado[0],"#FF0000") 
        }
        $('#modificarModal').modal('hide');
    })
    .catch(err => {
        mostrarNotificacion(err.message,"#FF0000") 
        $('#modificarModal').modal('hide');
    })
    
}

function AbrirModalEliminarPaciente(cedula){
    sessionStorage.setItem('cedulaEliminar',cedula)
    $('#eliminarModal').modal('show');
}

function EliminarPaciente(){
    let cedula = JSON.parse(sessionStorage.getItem('cedulaEliminar'))

    const url = "http://127.0.0.1:5000/pacientes/" + cedula;

    // Opciones para la petición fetch
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    
    fetch(url, options)
    .then(Response => Response.json())
    .then(data => {
        // Guardamos el mensaje para saber si fue exitoso o no el registro
        let mensajeResultado = data.toString().split('|')
        $('#eliminarModal').modal('hide');

        if(typeof mensajeResultado[1] !== 'undefined' && mensajeResultado[1] !== null){
            if(mensajeResultado[0] === '00'){
            
                mostrarNotificacion(mensajeResultado[1],"linear-gradient(to right, #00b09b, #96c93d)") 
                BuscarPacientes()
            }else{
                mostrarNotificacion(mensajeResultado[1],"#FF0000") 
            }
        }else{
            mostrarNotificacion(mensajeResultado[0],"#FF0000") 
        }
    })
    .catch(err => {
        mostrarNotificacion(err.message,"#FF0000") 
        $('#eliminarModal').modal('hide');
    })
}

function formatearFecha(fecha) {
    var opciones = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(fecha).toLocaleDateString(undefined, opciones);
}

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
        zeroRecords: "Ningún paciente encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún paciente encontrado",
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
                        <button class="btn btn-sm btn-primary" onclick="AbrirModalModificarPaciente(${dato.cedula})"
                        ${dato.cedula !== null && typeof dato.cedula !== 'undefined' ? '' : 'disabled'}
                        ><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="AbrirModalEliminarPaciente(${dato.cedula})"
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
