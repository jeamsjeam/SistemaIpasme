document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = JSON.parse(sessionStorage.getItem('usuario'))
    if(!(datosUsuario.rol.toUpperCase() === 'RECURSOS HUMANOS' || datosUsuario.rol.toUpperCase() === 'ADMINISTRADOR' || datosUsuario.rol === 'ADMINISTRADOR (LECTURA)')){
        window.location.href = "index.html";
    }
});