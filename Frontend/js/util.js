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

function descargarPDF(url,nonbreArchivo,cedula) {
    // Llamar al servicio REST que genera el PDF
    let urlCompleta = 'http://127.0.0.1:5000/' + url + "/" + nonbreArchivo + ".pdf"
    if(cedula !== null && typeof cedula !== 'undefined'){
        urlCompleta += "/" + cedula
    }

    fetch(urlCompleta, {
        method: 'GET',
    })
    .then(response => {
        // Verificar si la respuesta es un archivo PDF
        if (response.headers.get('content-type').includes('application/pdf')) {
            mostrarNotificacion("Se genero correctamente el PDF","linear-gradient(to right, #00b09b, #96c93d)") 
            return response.blob(); // Convertir la respuesta a un blob
        } else {
            // Si la respuesta no es un PDF, mostrar un mensaje de error
            mostrarNotificacion('El servidor no ha devuelto un archivo PDF.',"#FF0000")
        }
    })
    .then(blob => {
        // Crear un objeto de URL para el blob del PDF
        const url = window.URL.createObjectURL(blob);
        
        // Crear un enlace <a> para descargar el PDF
        const a = document.createElement('a');
        a.href = url;
        a.download = nonbreArchivo; // Nombre del archivo PDF cuando se descargue
        
        // Hacer clic en el enlace para iniciar la descarga
        a.click();
        
        // Limpiar el objeto de URL después de la descarga
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        mostrarNotificacion("Error al descargar el PDF: ",error.message,"#FF0000") 
        // Manejar el error, por ejemplo, mostrando un mensaje al usuario
    });
}
