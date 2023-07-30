var usuario = {}

document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = sessionStorage.getItem('usuario')
    if(typeof datosUsuario !== 'undefined' && datosUsuario !== null){
        usuario = JSON.parse(datosUsuario)
        console.log(usuario)
    }else{
        window.location.href = "login.html";
    }
});
