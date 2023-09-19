document.addEventListener("DOMContentLoaded", function () {
    let datosUsuario = sessionStorage.getItem('usuario')
    if(typeof datosUsuario === 'undefined' || datosUsuario === null){
        window.location.href = "login.html";
    }
    // let usuario = JSON.parse(datosUsuario);
    // const mensajeNavbar = document.getElementById("mensajeNavbar");
    // mensajeNavbar.textContent = usuario.usuario.toUpperCase() + " - " + usuario.rol.toUpperCase();
});

function mostrarNotificacion(texto,color) {
    var notificacion = Toastify({
      text: texto,
      duration: 3000,
      gravity: "top-right",
      close: true,
      backgroundColor: color
    });
  
    notificacion.showToast();
}

function formatDateString(dateString) {
    // Crea un objeto Date a partir de la cadena de fecha
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
        return "Fecha no válida"; // Maneja casos en los que la cadena de fecha no es válida
    }
    
    const day = String(date.getDate()).padStart(2, '0'); // Obtener el día y agregar ceros a la izquierda si es necesario
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtener el mes (los meses comienzan desde 0) y agregar ceros a la izquierda si es necesario
    const year = date.getFullYear(); // Obtener el año

    return `${day}-${month}-${year}`;
}