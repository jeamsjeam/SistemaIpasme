document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = JSON.parse(sessionStorage.getItem('usuario'))
    if(!datosUsuario.rol.toUpperCase() === 'PACIENTE'){
        window.location.href = "index.html";
    }
});

function cargarCalendario(sumar){
    let year = 0
    let mes = 0 
    let asistencias = []
    let mesConsulta = sessionStorage.getItem('mesCalendarioCita')
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
    sessionStorage.setItem('mesCalendarioCita', fechaConsulta)

    let usuario = JSON.parse(sessionStorage.getItem('usuario'));    
    let url = "http://127.0.0.1:5000/citas/paciente/mes"; 
    data = {
        usuario : usuario.usuario,
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
        citas = data

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
                `<li ${buscarClaseDia(index, diaInicio, citas[day])}>${day + 1}</li>`
        )
        .join('')

    // Inyeccion HTML
    let html = `<h2 class="header"> <span class="prev" onclick="cargarCalendario(-1)"><i class="fas fa-chevron-left icon"></i></span> ${nombreMes.toUpperCase()} ${year} <span class="next" onclick="cargarCalendario(1)"><i class="fas fa-chevron-right icon"></i></span></h2> <ol>${htmlNombreDias}${htmlDias}</ol>`
    document.querySelector('.calendar').innerHTML = html

    })
    .catch(err => mostrarNotificacion(err.message,"#FF0000") )    
}

function buscarClaseDia(index, diaInicio, diaCita){
    let estiloPrimerDia = `style='--first-day-start: ${diaInicio}'`
    let claseAsistencia = ''
    
    switch (diaCita.estado) {
        case 'Agendada':
            claseAsistencia = 'agendada'
            break;
        case 'Asistida':
            claseAsistencia = 'asistida'
            break;
        case 'Cancelada':
            claseAsistencia = 'cancelada'
            break;
    
        default:
            break;
    }

    let clase = `class='${index === 0? 'first-day ' + claseAsistencia : claseAsistencia}'`
    if (index === 0){
        return clase + estiloPrimerDia
    } else{
        return clase
    }
}

function cargarEspecialidades(){
    // URL del servicio REST
    let url = "http://127.0.0.1:5000/especialidades/consultas";

    // Llamada al servicio REST utilizando fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let html = ''
            data.forEach(data => {
                html += `<div class="col-sm-12 col-md-5 col-lg-3 mb-4">
                            <div onclick="seleccionarEspecialidad(${data.id})" class="card text-white card-has-bg click-col">
                                <div class="card-img-overlay d-flex flex-column">
                                    <div class="card-body">
                                        <h4 class="card-title mt-0 text-white text-center">${data.nombre}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>`
            });
            document.getElementById('especialidades').innerHTML = html
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Datos: " + error.message, "#FF0000")
        });
}

function seleccionarEspecialidad(especialidadId){
    sessionStorage.setItem('especialidadCita', especialidadId)
    window.location.href = "agendarCita.html"
}

function cargarMedicos(){
    let especialidadId = JSON.parse(sessionStorage.getItem('especialidadCita'))
    // URL del servicio REST
    let url = "http://127.0.0.1:5000//empleados/medicos/" + especialidadId;

    // Llamada al servicio REST utilizando fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let html = ''

            if (data != null && data.length > 0){
                data.forEach(data => {
                    html += `<div class="row card-medico">
                                <h2 class="col">${data.nombre}</h2>
                                <button onclick="seleccionarMedico(${data.cedula})" class="btn register_icon col-1" data-bs-toggle="modal" data-bs-target="#seleccionarFecha"><i class="agenda fas fa-calendar-check"></i></button>
                            </div>`
                });
            }else{
                html = `<div class="row pt-5">
                            <h2 class="col-12 text-center pt-5">Lo sentimos</h2>
                            <h4 class="col-12 text-center">No se han encontrado médicos disponible</h4>
                        </div>`
            }


            document.getElementById('medicos').innerHTML = html
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Datos: " + error.message, "#FF0000")
        });
}

function seleccionarMedico(medicoCedula){
    sessionStorage.setItem('medicoCita', medicoCedula)
}

function agendarCita(){
    debugger
    let fecha_cita = document.getElementById("fecha-cita").value;
    if (fecha_cita == '') {
        mostrarNotificacion('Por favor, indique una fecha valida', "#FF0000")
        return 0
    }
    let usuario = JSON.parse(sessionStorage.getItem('usuario'))
    let url = "http://127.0.0.1:5000/citas/agendar"; 
    data = {
        nota : '',
        fecha : formatearFecha(fecha_cita),
        empleado_cedula : JSON.parse(sessionStorage.getItem('medicoCita')),
        paciente_usuario : usuario.usuario
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
                document.getElementById("fecha-cita").value = "";
                window.location.href = "menuPaciente.html"
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