document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = JSON.parse(sessionStorage.getItem('usuario'))
    if(!(datosUsuario.rol.toUpperCase() === 'RECURSOS HUMANOS' || datosUsuario.rol.toUpperCase() === 'ADMINISTRADOR' || datosUsuario.rol === 'ADMINISTRADOR (LECTURA)')){
        window.location.href = "index.html";
    }
});

function cargarCalendario(sumar){
    let year = 0
    let mes = 0 

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
    sessionStorage.setItem('mesCalendario', new Date(year, mes, 1))

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
                `<li ${buscarClaseDia(index, diaInicio, day)}>${day + 1}</li>`
        )
        .join('')

    // Inyeccion HTML
    let html = `<h2 class="header"> <span class="prev" onclick="cargarCalendario(-1)"><i class="fas fa-chevron-left icon"></i></span> ${nombreMes.toUpperCase()} ${year} <span class="next" onclick="cargarCalendario(1)"><i class="fas fa-chevron-right icon"></i></span></h2> <ol>${htmlNombreDias}${htmlDias}</ol>`
    document.querySelector('.calendar').innerHTML = html
}

function buscarClaseDia(index, diaInicio, dia){
    let estiloPrimerDia = `style='--first-day-start: ${diaInicio}'`
    
    let asistencia = null // Comparar si vino o no
    let claseAsistencia = ''
    
    if (asistencia === true){
        claseAsistencia = 'asistencia'
    }
    else if (asistencia === false) {
        claseAsistencia = 'permiso'
    }
    
    let clase = `class='${index === 0? 'first-day ' + claseAsistencia : claseAsistencia}'`
    if (index === 0){
        return clase + estiloPrimerDia
    } else{
        return clase
    }
}

function cargarOpcionesBotones(){
    botonEntrada = `<button class="col-4 btn btn-success btn-sm px-5  mx-1" onclick="verPerfil(0)">Registrar Entrada</button>`
    botonSalida = `<button class="col-4 btn btn-success btn-sm px-5  mx-1" onclick="verPerfil(0)">Registrar Salida</button>`
    botonPermiso = `<button class="col-4 btn btn-primary btn-sm px-5 mx-1" onclick="verPerfil(0)">Registrar Permiso</button>`

    let html = true ? botonEntrada + botonPermiso :
                    true ? botonSalida + botonPermiso :
                        botonPermiso
    document.querySelector('.botonesAsistencia').innerHTML = html
}