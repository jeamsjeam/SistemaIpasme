document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = sessionStorage.getItem('usuario')
    if(typeof datosUsuario === 'undefined' || datosUsuario === null){
        window.location.href = "login.html";
    }
});