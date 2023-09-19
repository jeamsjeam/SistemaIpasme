document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = JSON.parse(sessionStorage.getItem('usuario'))
    if(datosUsuario.rol === 'Asistencial'){
        window.location.href = "asistencial.html";
    }else if(datosUsuario.rol === 'Recursos Humanos'){
        window.location.href = "recursoshumanos.html";
    }
});