//------------------------------------------------------------------------------------------------------------
async function registrarUsuario() {
    try{
        //Se obtienen los valores de los campos en el formulario de registrar
        const nombre = document.querySelector('input[name="nombre"]').value;
        const usuario = document.querySelector('input[name="user_registro"]').value;
        const contraseña = document.querySelector('input[name="password_registro"]').value;
        const rol = document.querySelector('select[name="rol"]').value;
        const usuarioAdministrador = document.querySelector('input[name="usuarioAdministrador"]').value;
        const contraseñaAdministrador = document.querySelector('input[name="passwordAdministrador"]').value;

        // Se crea el objeto que se envia al servicio de crear usuario
        const datosUsuario = {
            usuarioValidador: usuarioAdministrador,
            claveValidador: contraseñaAdministrador,
            usuario: usuario,
            clave: contraseña,
            nombre: nombre,
            rol_id: rol
        };
    
        // Opciones para la petición fetch
        const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datosUsuario)
        };
  
        // URL del servicio que crea el usuario
        const url = "http://127.0.0.1:5000/usuarios/register";

        document.querySelector('input[name="nombre"]').value = "";
        document.querySelector('input[name="user_registro"]').value = "";
        document.querySelector('input[name="password_registro"]').value = "";
        document.querySelector('select[name="rol"]').value = 1;
        document.querySelector('input[name="usuarioAdministrador"]').value = "";
        document.querySelector('input[name="passwordAdministrador"]').value = "";

        fetch(url, options)
        .then(Response => Response.json())
        .then(data => {
            console.log(data)
            resultado = data.toString().split('|')

            if(typeof resultado[1] !== 'undefined' && resultado[1] !== null){
                if(resultado[0] === '00'){
                    mostrarNotificacion(resultado[1],"linear-gradient(to right, #00b09b, #96c93d)") 
                }else{
                    mostrarNotificacion(resultado[1],"#FF0000") 
                }
            }else{
                mostrarNotificacion(resultado[0],"#FF0000") 
            }
            //alert("Usuario creado exitosamente: " + typeof resultado[1] !== 'undefined' && resultado[1] !== null ? resultado[1] : resultado[0]);
            //location.reload();
        })
        .catch(err => {
            console.log(err)
            mostrarNotificacion(err.message,"#FF0000") 
            //alert("Error al crear el usuario: " + err.message);
        })
    } catch (e) {
        mostrarNotificacion(e,"#FF0000") 
        console.log(e);
    }
  }

  async function ingresar() {
    try{
        //Se obtienen los valores de los campos en el formulario de registrar
        const usuario = document.querySelector('input[name="user"]').value;
        const contraseña = document.querySelector('input[name="password"]').value;

        // Se crea el objeto que se envia al servicio de crear usuario
        const datosUsuario = {
            usuario: usuario,
            clave: contraseña,
        };
    
        // Opciones para la petición fetch
        const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datosUsuario)
        };
  
        // URL del servicio que crea el usuario
        const url = "http://127.0.0.1:5000/usuarios/login";

        document.querySelector('input[name="user"]').value = "";
        document.querySelector('input[name="password"]').value = "";

        fetch(url, options)
        .then(Response => Response.json())
        .then(data => {
            console.log(data)
            resultado = data.toString().split('|')

            if(typeof resultado[1] !== 'undefined' && resultado[1] !== null){
                if(resultado[0] === '00'){
                    window.location.href = "index.html";
                }else{
                    mostrarNotificacion(resultado[1],"#FF0000") 
                }
            }else{
                mostrarNotificacion(resultado[0],"#FF0000") 
            }
            //alert("Usuario creado exitosamente: " + typeof resultado[1] !== 'undefined' && resultado[1] !== null ? resultado[1] : resultado[0]);
            //location.reload();
        })
        .catch(err => {
            console.log(err)
            mostrarNotificacion(err.message,"#FF0000") 
            //alert("Error al crear el usuario: " + err.message);
        })
    } catch (e) {
        mostrarNotificacion(e,"#FF0000") 
        console.log(e);
    }
  }

  // Función que muestra la notificación de Toastify
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

document.addEventListener("DOMContentLoaded", function () {
    // URL del servicio REST que retorna la lista de roles
    const url = "http://127.0.0.1:5000/roles";
    // Elemento select donde agregaremos las opciones de los roles
    const rolesSelect = document.getElementById("roles-select");

    // Llamada al servicio REST utilizando fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // data es un array con los objetos de los roles
            // Recorremos cada objeto y agregamos las opciones al select
            data.forEach(role => {
                // Creamos una opción para cada rol
                const option = document.createElement("option");
                option.value = role.id;
                option.textContent = role.nombre;
                rolesSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error al obtener los roles:", error);
        });
});

//------------------------------------------------------------------------------------------------------------

//Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

//Declarando variables
var form_login = document.querySelector(".form_login");
var form_register = document.querySelector(".form_register");
var container_login_register = document.querySelector(".container_login-register");
var box_login = document.querySelector(".box-login");
var box_register = document.querySelector(".box-register");

    //FUNCIONES

function anchoPage(){

    if (window.innerWidth > 850){
        box_register.style.display = "block";
        box_login.style.display = "block";
    }else{
        box_register.style.display = "block";
        box_register.style.opacity = "1";
        box_login.style.display = "none";
        form_login.style.display = "block";
        container_login_register.style.left = "0px";
        form_register.style.display = "none";   
    }
}

anchoPage();
    function iniciarSesion(){
        if (window.innerWidth > 850){
            form_login.style.display = "block";
            container_login_register.style.left = "10px";
            form_register.style.display = "none";
            box_register.style.opacity = "1";
            box_login.style.opacity = "0";
        }else{
            form_login.style.display = "block";
            container_login_register.style.left = "0px";
            form_register.style.display = "none";
            box_register.style.display = "block";
            box_login.style.display = "none";
        }
    }

    function register(){
        if (window.innerWidth > 850){
            form_register.style.display = "block";
            container_login_register.style.left = "410px";
            form_login.style.display = "none";
            box_register.style.opacity = "0";
            box_login.style.opacity = "1";
        }else{
            form_register.style.display = "block";
            container_login_register.style.left = "0px";
            form_login.style.display = "none";
            box_register.style.display = "none";
            box_login.style.display = "block";
            box_login.style.opacity = "1";
        }
}


