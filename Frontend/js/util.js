document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = sessionStorage.getItem('usuario')
    if(typeof datosUsuario === 'undefined' || datosUsuario === null){
        window.location.href = "login.html";
    }
    let usuario = JSON.parse(datosUsuario);
    const mensajeNavbar = document.getElementById("mensajeNavbar");
    mensajeNavbar.textContent = usuario.usuario.toUpperCase() + " - " + usuario.rol.toUpperCase();
});