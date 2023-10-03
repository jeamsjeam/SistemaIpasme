document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = JSON.parse(sessionStorage.getItem('usuario'))
    if(!(datosUsuario.rol.toUpperCase() === 'RECURSOS HUMANOS' || datosUsuario.rol.toUpperCase() === 'ADMINISTRADOR')){
        window.location.href = "index.html";
    }
});

function cargarCalendario(sumar){
    let year = 0
    let mes = 0 
    let asistencias = []
    let mesConsulta = sessionStorage.getItem('mesCalendario')
    switch (sumar) {
        case 1:
            let mesSiguiente = new Date(mesConsulta)
            mesSiguiente.setMonth(mesSiguiente.getMonth() + 1)
            year = mesSiguiente.getFullYear()
            mes = mesSiguiente.getMonth()
            break;
        case -1:
            let mesAnterior = new Date(mesConsulta)
            mesAnterior.setMonth(mesAnterior.getMonth() - 1)
            year = mesAnterior.getFullYear()
            mes = mesAnterior.getMonth()
            break;

        default:
            year = new Date().getFullYear()
            mes = new Date().getMonth()
            break;
    }
    fechaConsulta = new Date(year, mes, 1)
    sessionStorage.setItem('mesCalendario', fechaConsulta)

    let cedula = JSON.parse(sessionStorage.getItem('cedulaBuscarEmpleado'));    
    let url = "http://127.0.0.1:5000/asistencias/empleado/mes"; 
    data = {
        cedula : cedula,
        fecha : fechaConsulta.toLocaleDateString('en-GB')
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
        asistencias = data

        // Formatos
        let locale = "es"; // formato 
        let formatoMes = new Intl.DateTimeFormat(locale, { month: 'long' }) // los indice del los  meses en texto largo 
        let formatoSemana = new Intl.DateTimeFormat(locale, { weekday: "short" });

        // Dias
        let diasMes = new Date(year, mes + 1, 0).getDate() // obtiene los días del mes 
        let dias = [...Array(diasMes).keys()] //todos los dias del mes
        let diaInicio = new Date(year, mes, 2).getDay()

        // Texto y Html
        let diasSemana = [...Array(7).keys()].map((dayIndex) => formatoSemana.format(new Date(2023, 0, dayIndex + 1  ))); // obtenemos semana del mes
        let nombreMes = formatoMes.format(new Date(year, mes)) // nombre del mes

        let htmlNombreDias = diasSemana
        .map(
            (dayName) => `<li class='day-name'>${dayName}</li>`
        )
        .join('') // nombres de los días del mes
    let htmlDias = dias
        .map(
            (day, index) =>
                `<li ${buscarClaseDia(index, diaInicio, asistencias[day])}>${day + 1}</li>`
        )
        .join('')

    // Inyeccion HTML
    let html = `<h2 class="header"> <span class="prev" onclick="cargarCalendario(-1)"><i class="fas fa-chevron-left icon"></i></span> ${nombreMes.toUpperCase()} ${year} <span class="next" onclick="cargarCalendario(1)"><i class="fas fa-chevron-right icon"></i></span></h2> <ol>${htmlNombreDias}${htmlDias}</ol>`
    document.querySelector('.calendar').innerHTML = html
    document.querySelector('.calendar').classList.remove('d-none')
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )


    
}

const nombreAsistencia = {
    true : 'Asistencia',
    false : 'Permiso'
}

function buscarClaseDia(index, diaInicio, asistenciaServicio){
    let estiloPrimerDia = `style='--first-day-start: ${diaInicio}'`
    let claseAsistencia = ''
    
    if (nombreAsistencia[asistenciaServicio.asistencia] != null){
        claseAsistencia = nombreAsistencia[asistenciaServicio.asistencia].toLowerCase()
    }
    let clase = `class='${index === 0? 'first-day ' + claseAsistencia : claseAsistencia}' ${asistenciaServicio.asistencia != null ? ` title='${nombreAsistencia[asistenciaServicio.asistencia]}'` : ''}`
    if (index === 0){
        return clase + estiloPrimerDia
    } else{
        return clase
    }
}

function cargarOpcionesBotones(cedula){
    let url = "http://127.0.0.1:5000/asistencias/empleado"; 
    data = {
        cedula : cedula,
        fecha : new Date().toLocaleDateString('en-GB')
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
        botonEntrada = `<button class="col-4 btn btn-success btn-sm px-5  mx-1" data-bs-toggle="modal" data-bs-target="#asistenciaModal" >Registrar Entrada</button>`
        botonSalida = `<button class="col-4 btn btn-success btn-sm px-5  mx-1" data-bs-toggle="modal" data-bs-target="#asistenciaModal" >Registrar Salida</button>`
        botonPermiso = `<button class="col-4 btn btn-primary btn-sm px-5 mx-1" data-bs-toggle="modal" data-bs-target="#permisoModal" >Registrar Permiso</button>`
        let html = ""
        if(typeof data !== 'undefined' && data !== null && Object.keys(data).length > 0){
            if (data.hora_salida === null || data.hora_salida === "null" || data.hora_salida === "") {
                html = botonSalida + botonPermiso
                document.getElementById("comentario").value = data.comentario;
                document.getElementById("botonAsistencia").onclick = registrarSalida;
            }else{
                html = botonPermiso
            }
            sessionStorage.setItem('asistenciaDiaria', JSON.stringify(data))
        } else{
            html = botonEntrada + botonPermiso
            document.getElementById("botonAsistencia").onclick = registrarEntrada;
        }
        document.querySelector('.botonesAsistencia').innerHTML = html
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )

}

function buscarEmpleado(recarga){
    let cedula = document.getElementById("buscarCedula").value;
    if (recarga) {
        cedula = JSON.parse(sessionStorage.getItem('cedulaBuscarEmpleado'));    
    }
    const url = "http://127.0.0.1:5000/empleados/" + cedula;

    fetch(url)
    .then(response => response.json() )
    .then(data => {
        if(typeof data !== 'undefined' && data !== null && Object.keys(data).length > 0 ){
            sessionStorage.setItem('cedulaBuscarEmpleado', cedula)
            cargarOpcionesBotones(cedula)
            cargarCalendario(0)
            buscarPermisos(cedula)
            document.getElementById("buscarCedula").value = ""
        }else{
            mostrarNotificacion("No se encontro el empleado","#FF0000") 
        }
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000"))
}

function registrarEntrada(){
    let url = "http://127.0.0.1:5000/asistencias/registrarEntrada"; 
    data = {
        comentario : document.getElementById("comentario").value,
        hora_salida : new Date().toISOString(),
        hora_llegada : null,
        empleado_cedula : JSON.parse(sessionStorage.getItem('cedulaBuscarEmpleado'))
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
                mostrarNotificacion("Registrado con Exito", "#198754")
                buscarEmpleado(true)
            } else {
                mostrarNotificacion(resultado[1], "#FF0000")
            }
        } else {
            mostrarNotificacion(resultado[0], "#FF0000")
        }
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )
}

function registrarSalida(){
    let url = "http://127.0.0.1:5000/asistencias/registrarSalida"; 
    let asistencia = JSON.parse(sessionStorage.getItem('asistenciaDiaria'))
    data = {
        id : asistencia.id,
        comentario : document.getElementById("comentario").value,
        hora_salida : new Date().toISOString(),
        hora_llegada : asistencia.hora_llegada, 
        empleado_cedula : JSON.parse(sessionStorage.getItem('cedulaBuscarEmpleado'))
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
                mostrarNotificacion("Registrado con Exito", "#198754")
                buscarEmpleado(true)
            } else {
                mostrarNotificacion(resultado[1], "#FF0000")
            }
        } else {
            mostrarNotificacion(resultado[0], "#FF0000")
        }
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )
}

function registrarPermiso(){
    let descripcion_motivo = document.getElementById("motivo").value;
    let fecha_inicio = document.getElementById("fecha-inicio-permiso").value;
    let fecha_fin = document.getElementById("fecha-fin-permiso").value; 
    if (descripcion_motivo == '' || fecha_inicio == '' || fecha_fin == '') {
        mostrarNotificacion('Por favor, complete todos los campos', "#FF0000")
        return 0
    }

    let url = "http://127.0.0.1:5000/permisos/registrar"; 
    data = {
        descripcion_motivo : descripcion_motivo,
        fecha_inicio : formatearFecha(fecha_inicio),
        fecha_fin : formatearFecha(fecha_fin), 
        empleado_cedula : JSON.parse(sessionStorage.getItem('cedulaBuscarEmpleado'))
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
                mostrarNotificacion("Registrado con Exito", "#198754")
                document.getElementById("motivo").value = "";
                document.getElementById("fecha-inicio-permiso").value = "";
                document.getElementById("fecha-fin-permiso").value = ""; 
                buscarEmpleado(true)
            } else {
                mostrarNotificacion(resultado[1], "#FF0000")
            }
        } else {
            mostrarNotificacion(resultado[0], "#FF0000")
        }
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )
}

function formatearFecha(fecha) {
    let data = fecha.split('-')
    return data[2] + "/" + data[1] + "/" + data[0]
}

function buscarPermisos(cedula){
    let url = "http://127.0.0.1:5000/permisos/consultar"; 
    let fechaConsulta = sessionStorage.getItem('mesCalendario')
    let fechaInicio = new Date(fechaConsulta)
    let fechaFin =  new Date(fechaConsulta)
    fechaFin.setMonth(fechaFin.getMonth() + 1)
    fechaFin.setDate(fechaFin.getDate() - fechaFin.getDay())


    data = {
        cedula : cedula,
        fechaInicio : fechaInicio.toLocaleDateString('en-GB'),
        fechaFin : fechaFin.toLocaleDateString('en-GB')
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
        document.getElementById("tablaPermisos").classList.remove("d-none");
        initDataTable(data)
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )
}


let dataTable = null;
let dataTableIsInitialized = false;
const dataTableOptions = {
    //scrollX: "2000px",
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3] },
        { orderable: false, targets: [0, 1] },
        { searchable: false, targets: [1] }
        //{ width: "50%", targets: [0] }
    ],
    pageLength: 3,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún permiso encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún permiso encontrado",
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
        dataTable = $("#datatable_permisos").DataTable(dataTableOptions);
    }catch(error){
        console.error("Error initializing DataTable:", error);
    }

    dataTableIsInitialized = true;
}

function list(lista) {
    try {
        let content = ``;
        lista.forEach((data, index) => {
            let fechaInicio = new Date(data.fecha_inicio)
            let fechaFin = new Date(data.fecha_fin)
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${data.descripcion_motivo}</td>
                    <td>${fechaInicio.toLocaleDateString('en-GB')}</td>
                    <td>${fechaFin.toLocaleDateString('en-GB')}</td>
                </tr>`;
        });
        tableBody_permisos.innerHTML = content;
    } catch (ex) {
        console.error("Error initializing DataTable:", error);
    }
}

const coloresBotones={
    true : 'success',
    null : 'secondary',
    false : 'primary'
}
function cargarReporteSemana(){
    let url = "http://127.0.0.1:5000/asistencias/empleado/reporte"; 
    data = {
        fecha : new Date().toLocaleDateString('en-GB')
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
        const reporteSemana = document.getElementById('reporteSemana');
            data.forEach((turno) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                        <div class="card-header">${turno.turno}</div>
                        <div class="card-body">
                            <ul class="list-group col-12">
                            ${turno.trabajadores.map((trabajador) => `
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="col-6">
                                    <span class="text-muted">${trabajador.cedula}</span>
                                    <span class = "ms-2">${trabajador.nombre}</span>
                                    <span class = "ms-2 text-muted">${trabajador.cargo}</span>
                                </div>
                                <div class="col-6 d-flex justify-content-around">
                                    ${trabajador.semana.map((asistencia) => 
                                        `<button class="btn btn-${coloresBotones[asistencia.asistencia]} btn-sm">${asistencia.dia.substring(0,1)}</button>`
                                    ).join('')}
                                </div>
                                </li>
                            `).join('')}
                            </ul>
                        </div>
                `;
                reporteSemana.appendChild(card);
            });
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )
}
