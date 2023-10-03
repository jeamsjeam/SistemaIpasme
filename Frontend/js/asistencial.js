document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = JSON.parse(sessionStorage.getItem('usuario'))
    if(!(datosUsuario.rol.toUpperCase() === 'ASISTENCIAL' || datosUsuario.rol.toUpperCase() === 'ADMINISTRADOR')){
        window.location.href = "index.html";
    }
    //------------------------------Dependencia------------------------------
    // URL del servicio REST que retorna la lista de Dependencia
    const urlDependencia = "http://127.0.0.1:5000/dependencias";
    // Elemento select donde agregaremos las opciones de als Dependencia
    const dependenciaSelect = document.getElementById("seleccionDependencia");

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
                dependenciaSelect.appendChild(option);
            });
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
    const municipiosSelect = document.getElementById("seleccionMunicipio");

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
                municipiosSelect.appendChild(option);
            });
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
    const cargosSelect = document.getElementById("seleccionCargo");

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
                cargosSelect.appendChild(option);
            });
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

    //------------------------------Tipo Reposo------------------------------
    // URL del servicio REST que retorna la lista de tipo de reposo
    /*const urlTipoReposo = "http://127.0.0.1:5000/tipoReposo";
    // Elemento select donde agregaremos las opciones de los tipo de reposo
    //const cargosTipoReposo = document.getElementById("primerReposoTipoReposo");

    // Llamada al servicio REST utilizando fetch
    fetch(urlTipoReposo)
        .then(response => response.json())
        .then(TipoReposodata => {
            // data es un array con los objetos de los tipo de reposo
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
        });*/

        //------------------------------Tipos Pacientes------------------------------
        // URL del servicio REST que retorna la lista de tipo de pacientes
        const urlTipoPaciente = "http://127.0.0.1:5000/tiposPaciente";
        // Elemento select donde agregaremos las opciones de los tipos de pacientes
        const tipoPacienteSelect = document.getElementById("seleccionTipoPaciente");

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
                    tipoPacienteSelect.appendChild(option);
                });
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
    let correo = document.getElementById('registrarPacienteCorreo').value;
    let cargo = document.getElementById('seleccionCargo').value;
    let dependencia = document.getElementById('seleccionDependencia').value;
    let municipio = document.getElementById('seleccionMunicipio').value;
    let tipoPaciente = document.getElementById('seleccionTipoPaciente').value;
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
        "correo": (correo !== null && typeof correo !== 'undefined' ? correo : ""),
        "cargo_id": parseInt(cargo),
        "dependencia_id": parseInt(dependencia),
        "municipio_id": parseInt(municipio),
        "tipo_paciente_id": parseInt(tipoPaciente)
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
    document.getElementById('registrarPacienteCorreo').value = "";
    document.getElementById('seleccionCargo').value = 1;
    document.getElementById('seleccionDependencia').value = 1;
    document.getElementById('seleccionMunicipio').value = 1;
    document.getElementById('seleccionTipoPaciente').value = 1;
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
    sessionStorage.setItem('datosPaciente', JSON.stringify(datos))
    // Asignar valores a las celdas de la tabla
    document.getElementById("datosPaciente_cedula").textContent = datos.cedula;
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
    document.getElementById("datosPaciente_correo").textContent = datos.correo;
    document.getElementById("datosPaciente_direccion").textContent = datos.direccion;
    document.getElementById("datosPaciente_cargo").textContent = datos.cargo.nombre;
    document.getElementById("datosPaciente_dependencia").textContent = datos.dependencia.nombre;
    document.getElementById("datosPaciente_municipio").textContent = datos.municipio.nombre;
    document.getElementById("datosPaciente_tipo_paciente").textContent = datos.tipo_paciente.nombre;

    // Habilitar o deshabilitar botones según el permiso
    var modificarButton = document.getElementById("modificarButton");
    var eliminarButton = document.getElementById("eliminarButton");

    // if (datosPaciente_permiso === 2) {
    //     modificarButton.disabled = true;
    //     eliminarButton.disabled = true;
    // } else {
    //     modificarButton.disabled = false;
    //     eliminarButton.disabled = false;
    // }

    //llenarTablaReposos(datos.reposos);
}

function registrarReposo(){

    let codAsistencial = document.getElementById('reposoCodAsistencial').value;
    let codRegistro = document.getElementById('reposoCodRegistro').value;
    let fechaDesde = document.getElementById('reposofechaDesde').value;
    let fechaHasta = document.getElementById('reposofechaHasta').value;
    let quienValida = document.getElementById('reposoValida').value;
    let datosPaciente = JSON.parse(sessionStorage.getItem('datosPaciente'))
    let cedula = parseInt(datosPaciente.cedula);

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
                let datosPaciente = JSON.parse(sessionStorage.getItem('datosPaciente'))
                buscarPaciente(parseInt(datosPaciente.cedula))
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

/** PACIENTE **/

function AbrirModalModificarPaciente(cedula){
    let datosPaciente = {}
    if(cedula === null || typeof cedula === 'undefined'){
        datosPaciente = JSON.parse(sessionStorage.getItem('datosPaciente'))
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
                buscarPaciente(parseInt(data.paciente.cedula))
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

function AbrirModalEliminarPaciente(){
    
    $('#eliminarModal').modal('show');
}

function EliminarPaciente(cedula){
    if(cedula === null || typeof cedula === 'undefined'){
        let datosPacienteTodos = JSON.parse(sessionStorage.getItem('datosPaciente'))
        cedula = datosPacienteTodos.cedula
    }

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
        
        if(typeof mensajeResultado[1] !== 'undefined' && mensajeResultado[1] !== null){
            if(mensajeResultado[0] === '00'){
            
                mostrarNotificacion(mensajeResultado[1],"linear-gradient(to right, #00b09b, #96c93d)") 
                resetearEtquitasOcultas()
            }else{
                mostrarNotificacion(mensajeResultado[1],"#FF0000") 
            }
        }else{
            mostrarNotificacion(mensajeResultado[0],"#FF0000") 
        }
        $('#eliminarModal').modal('hide');
    })
    .catch(err => {
        mostrarNotificacion(err.message,"#FF0000") 
        $('#eliminarModal').modal('hide');
    })
}

/** FIN PACIENTE **/

/** REPOSO **/

async function buscarReposo(id){
    // URL del servicio REST que busca un reposo
    const url = "http://127.0.0.1:5000/pacientes/reposo/" + id;

    try {
        const response = await fetch(url);
    
        if (!response.ok) {
          mostrarNotificacion(`Error al consultar el servicio: ${response.status} ${response.statusText}`,"#FF0000")
          return null
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        mostrarNotificacion("Error al obtener el reposo: " + error.message,"#FF0000")
        return null
      }

}
async function AbrirModalModificarReposo(id){
    reposo = await buscarReposo(id)
    if(reposo === null || typeof reposo === 'undefined'){
        mostrarNotificacion("Error","#FF0000") 
        return
    }

    document.getElementById('reposoCodAsistencialModal').value = reposo.codigo_asistencial;
    document.getElementById('reposoCodRegistroModal').value = reposo.codigo_registro;
    document.getElementById('reposoValidaModal').value = reposo.quien_valida;
    document.getElementById('reposoIdModificarModal').value = reposo.id.toString();

    var partesFechaInicio = formatearFecha(reposo.fecha_inicio).split('/'); 
    var anioInicio = partesFechaInicio[2];
    var mesInicio = partesFechaInicio[1].length === 1 ? "0" + partesFechaInicio[1] : partesFechaInicio[1];
    var diaInicio = partesFechaInicio[0].length === 1 ? "0" + partesFechaInicio[0] : partesFechaInicio[0];
    var fechaInicioFormateada = anioInicio + '-' + mesInicio + '-' + diaInicio;
    
    document.getElementById('reposofechaDesdeModal').value = fechaInicioFormateada;

    var partesFechaFin = formatearFecha(reposo.fecha_fin).split('/'); 
    var anioFin = partesFechaFin[2];
    var mesFin = partesFechaFin[1].length === 1 ? "0" + partesFechaFin[1] : partesFechaFin[1];
    var diaFin = partesFechaFin[0].length === 1 ? "0" + partesFechaFin[0] : partesFechaFin[0];
    var fechaFinFormateada = anioFin + '-' + mesFin + '-' + diaFin;

    document.getElementById('reposofechaHastaModal').value = fechaFinFormateada;

    $('#modificarModalReposo').modal('show');
}

function ModificarReposo(){
    let codAsistencial = document.getElementById('reposoCodAsistencialModal').value;
    let codRegistro = document.getElementById('reposoCodRegistroModal').value;
    let fechaDesde = document.getElementById('reposofechaDesdeModal').value;
    let fechaHasta = document.getElementById('reposofechaHastaModal').value;
    let quienValida = document.getElementById('reposoValidaModal').value;
    let id = document.getElementById('reposoIdModificarModal').value;

    // Crear objeto con los valores obtenidos
    let datosReposo = {
        "codigo_asistencial": codAsistencial,
        "codigo_registro": codRegistro,
        "fecha_inicio": fechaDesde,
        "fecha_fin": fechaHasta,
        "quien_valida": quienValida,  
        "id": id
    };

    // Opciones para la petición fetch
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datosReposo)
    };

    // URL del servicio que modifica el reposo
    const url = "http://127.0.0.1:5000/pacientes/reposo/ModificarReposo";

    document.getElementById('reposoCodAsistencialModal').value = "";
    document.getElementById('reposoCodRegistroModal').value = "";
    document.getElementById('reposofechaDesdeModal').value = "";
    document.getElementById('reposofechaHastaModal').value = "";
    document.getElementById('reposoValidaModal').value = "";
    document.getElementById('reposoIdModificarModal').value = "";

    let datosReposoResultado = {}
    fetch(url, options)
    .then(Response => Response.json())
    .then(data => {

        // Guardamos el mensaje para saber si fue exitoso o no el registro
        let mensajeResultado = data.toString().split('|')
        $('#modificarModalReposo').modal('hide');

        if(typeof mensajeResultado[1] !== 'undefined' && mensajeResultado[1] !== null){
            if(mensajeResultado[0] === '00'){
                // Guardamos los datos del paciente en una variable
                datosReposoResultado = data.paciente 
                mostrarNotificacion(mensajeResultado[1],"linear-gradient(to right, #00b09b, #96c93d)") 
                let datosPaciente = JSON.parse(sessionStorage.getItem('datosPaciente'))
                buscarPaciente(parseInt(datosPaciente.cedula))
            }else{
                mostrarNotificacion(mensajeResultado[1],"#FF0000") 
            }
        }else{
            mostrarNotificacion(mensajeResultado[0],"#FF0000") 
        }
    })
    .catch(err => {
        mostrarNotificacion(err.message,"#FF0000") 
        $('#modificarModalReposo').modal('hide');
    })
    
}

function AbrirModalEliminarReposo(id){
    sessionStorage.setItem('reposoId',id)
    $('#eliminarModalReposo').modal('show');
}

function EliminarReposo(){
    
    let reposoId = JSON.parse(sessionStorage.getItem('reposoId'))


    const url = "http://127.0.0.1:5000/pacientes/reposo/" + reposoId;

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
        $('#eliminarModalReposo').modal('hide');

        if(typeof mensajeResultado[1] !== 'undefined' && mensajeResultado[1] !== null){
            if(mensajeResultado[0] === '00'){
                // Guardamos los datos del paciente en una variable
                datosReposoResultado = data.paciente 
                mostrarNotificacion(mensajeResultado[1],"linear-gradient(to right, #00b09b, #96c93d)") 
                let datosPaciente = JSON.parse(sessionStorage.getItem('datosPaciente'))
                buscarPaciente(parseInt(datosPaciente.cedula))
            }else{
                mostrarNotificacion(mensajeResultado[1],"#FF0000") 
            }
        }else{
            mostrarNotificacion(mensajeResultado[0],"#FF0000") 
        }
    })
    .catch(err => {
        mostrarNotificacion(err.message,"#FF0000") 
        $('#eliminarModalReposo').modal('hide');
    })
}

/** FIN REPOSO **/

let dataTable;
let dataTableIsInitialized = false;
let numeroPorPagona = 5;

const dataTableOptions = {
    //scrollX: "2000px",
    //lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
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
                    <td>${reposo.codigo_asistencial != null && typeof reposo.codigo_asistencial !== 'undefined' ? reposo.codigo_asistencial : ''}</td>
                    <td>${reposo.codigo_registro != null && typeof reposo.codigo_registro !== 'undefined' ? reposo.codigo_registro : ''}</td>
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
