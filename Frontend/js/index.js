document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = JSON.parse(sessionStorage.getItem('usuario'))
    if(datosUsuario.rol === 'Reposos'){
        window.location.href = "reposos.html";
    }
});