document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = JSON.parse(sessionStorage.getItem('usuario'))
    if(!(datosUsuario.rol.toUpperCase() === 'RECURSOS HUMANOS' || datosUsuario.rol.toUpperCase() === 'ADMINISTRADOR' || datosUsuario.rol === 'ADMINISTRADOR (LECTURA)')){
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

    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )


    
}

function buscarClaseDia(index, diaInicio, asistenciaServicio){
    let estiloPrimerDia = `style='--first-day-start: ${diaInicio}'`
    let claseAsistencia = ''
    
    if (asistenciaServicio.asistencia === true){
        claseAsistencia = 'asistencia'
    }
    else if (asistenciaServicio.asistencia === false) {
        claseAsistencia = 'permiso'
    }
    
    let clase = `class='${index === 0? 'first-day ' + claseAsistencia : claseAsistencia}'`
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
            if (data.hora_salida === null) {
                html = botonPermiso
            }else{
                html = botonSalida + botonPermiso
                document.getElementById("comentario").value = data.comentario;
                document.getElementById("botonAsistencia").onclick = registrarSalida;
            }
        } else{
            html = botonEntrada + botonPermiso
            document.getElementById("botonAsistencia").onclick = registrarEntrada;
        }
        document.querySelector('.botonesAsistencia').innerHTML = html
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )

}

function buscarEmpleado(){
    let cedula = document.getElementById("buscarCedula").value;
    const url = "http://127.0.0.1:5000/empleados/" + cedula;

    fetch(url)
    .then(response => response.json() )
    .then(data => {
        if(typeof data !== 'undefined' && data !== null && Object.keys(data).length > 0 ){
            sessionStorage.setItem('cedulaBuscarEmpleado', cedula)
            cargarOpcionesBotones(cedula)
            cargarCalendario(0)
            document.getElementById("buscarCedula").value = ""
        }else{
            mostrarNotificacion("No se encontro el empleado","#FF0000") 
        }
    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000"))
}

function registrarEntrada(){
    
}

function registrarSalida(){
    
}