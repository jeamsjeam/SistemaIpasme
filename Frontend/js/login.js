//------------------------------------------------------------------------------------------------------------
function registrarUsuario() {
    try{
        //Se obtienen los valores de los campos en el formulario de registrar
        const nombre = document.querySelector('input[name="nombre"]').value;
        const usuario = document.querySelector('input[name="user_registro"]').value;
        const contraseña = document.querySelector('input[name="password_registro"]').value;
        const rol = document.querySelector('select[name="rol"]').value;
        const usuarioAdministrador = document.querySelector('input[name="usuarioAdministrador"]').value;
        const contraseñaAdministrador = document.querySelector('input[name="paswordAdministrador"]').value;

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
    debugger
    // Realizar la petición fetch
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            // Acceder a la propiedad 'mensaje' del objeto JSON y mostrarla en el alert
            alert("Usuario creado exitosamente: " + data);
        })
        .catch(error => {
            // En caso de error, puedes mostrar una alerta con el mensaje de error
            alert("Error al crear el usuario: " + error.message);
        });
    } catch (e) {
        console.log(e);
        debugger;
    }
  }
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


