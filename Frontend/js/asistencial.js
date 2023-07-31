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

    //------------------------------Especialidades------------------------------
    // URL del servicio REST que retorna la lista de roles
    const urlEspecialidad = "http://127.0.0.1:5000/especialidades";
    // Elemento select donde agregaremos las opciones de los roles
    const cargosEspecialidades = document.getElementById("primerReposoEspecialidades");

    // Llamada al servicio REST utilizando fetch
    fetch(urlEspecialidad)
        .then(response => response.json())
        .then(Especialidadesdata => {
            // data es un array con los objetos de los roles
            // Recorremos cada objeto y agregamos las opciones al select
            Especialidadesdata.forEach(data => {
                // Creamos una opción para cada rol
                const option = document.createElement("option");
                option.value = data.id;
                option.textContent = data.nombre;
                cargosEspecialidades.appendChild(option);
            });
        })
        .catch(error => {
            mostrarNotificacion("Error al obtener los Especialidades: " + error.message,"#FF0000")
        });
});

function buscarPaciente(){
    resetearEtquitasOcultas()
    var cedula = document.getElementById("buscarCedula").value;
    const url = "http://127.0.0.1:5000/pacientes/" + cedula;
    fetch(url)
    .then(response => response.json() )
    .then(data => {
        console.log(data)
        if(typeof data !== 'undefined' && data !== null){
            var pacienteEncontrado = document.getElementById("formularioDatosEncontrados");
            pacienteEncontrado.classList.remove("d-none");
            datosPacienteTabla(data)
            toggleDesplegable()
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
    let codAsistencial = document.getElementById('primerReposoCodAsistencial').value;
    let codRegistro = document.getElementById('primerReposoCodRegistro').value;
    let fechaDesde = document.getElementById('primerReposofechaDesde').value;
    let fechaHasta = document.getElementById('primerReposofechaHasta').value;
    let quienValida = document.getElementById('primerReposoValida').value;
    let especialidad = document.getElementById('primerReposoEspecialidades').value;
    let diasExtras = document.getElementById('primerReposoDiasExtras').checked;

    // Crear objeto con los valores obtenidos
    let datosPaciente = {
        "cedula": parseInt(cedula),
        "nombre": nombres,
        "apellido": apellidos,
        "institucion_laboral": institucion,
        "fecha_nacimiento": fechaNacimiento,
        "direccion": direccion,
        "telefono": telefono,
        "permiso_dias_extra": diasExtras,
        "cargo_id": parseInt(cargo),
        "dependencia_id": parseInt(dependencia),
        "municipio_id": parseInt(municipio),
        "especialidad_id": parseInt(especialidad),
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
        body: JSON.stringify(datosPaciente)
    };

    // URL del servicio que crea el usuario
    const url = "http://127.0.0.1:5000/pacientes/registrarNuevo";

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
    document.getElementById('primerReposoCodAsistencial').value = "";
    document.getElementById('primerReposoCodRegistro').value = "";
    document.getElementById('primerReposofechaDesde').value = "";
    document.getElementById('primerReposofechaHasta').value = "";
    document.getElementById('primerReposoValida').value = "";
    document.getElementById('primerReposoEspecialidades').value = "";
    document.getElementById('primerReposoDiasExtras').checked = false;
    debugger
    fetch(url, options)
    .then(Response => Response.json())
    .then(data => {

        resultado = data.toString().split('|')

        if(typeof resultado[1] !== 'undefined' && resultado[1] !== null){
            if(resultado[0] === '00'){
                mostrarNotificacion(resultado[1],"linear-gradient(to right, #00b09b, #96c93d)") 
                resetearEtquitasOcultas()
            }else{
                mostrarNotificacion(resultado[1],"#FF0000") 
            }
        }else{
            mostrarNotificacion(resultado[0],"#FF0000") 
        }
    })
    .catch(err => {
        mostrarNotificacion(err.message,"#FF0000") 
    })
}

function datosPacienteTabla(datos){


    // Asignar valores a las celdas de la tabla
    document.getElementById("datosPaciente_cedula").textContent = datos.cedula;
    document.getElementById("datosPaciente_nombres").textContent = datos.nombres;
    document.getElementById("datosPaciente_apellidos").textContent = datos.apellidos;
    document.getElementById("datosPaciente_institucion_laboral").textContent = datos.institucion_laboral;
    document.getElementById("datosPaciente_fecha_nacimiento").textContent = datos.fecha_nacimiento;
    let datosPaciente_dias_reposo = 63
    let datosPaciente_permiso = 2
    if (datosPaciente_dias_reposo > 62) {
        document.getElementById("datosPaciente_dias_reposo").innerHTML = '<span class="requerido">' + datosPaciente_dias_reposo + '</span>';
    } else {
        document.getElementById("datosPaciente_dias_reposo").textContent = datosPaciente_dias_reposo;
    }

    document.getElementById("datosPaciente_telefono").textContent = datos.telefono;
    document.getElementById("datosPaciente_direccion").textContent = datos.direccion;
    document.getElementById("datosPaciente_cargo").textContent = datos.cargo;
    document.getElementById("datosPaciente_dependencia").textContent = datos.dependencia;
    document.getElementById("datosPaciente_municipio").textContent = datos.municipio;

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
}

function resetearEtquitasOcultas(){

    //Formulario con datos del paciente y registro de reposos
    var pacienteEncontrado = document.getElementById("formularioDatosEncontrados");
    pacienteEncontrado.classList.add("d-none");

    //Formulario para paciente nuevo
    var registrarPaciente = document.getElementById("formularioRegistrarPaciente");
    registrarPaciente.classList.add("d-none");

    //Desplegable
    var contenido = document.getElementById("contenidoDesplegable");
    contenido.style.maxHeight = "";
}
