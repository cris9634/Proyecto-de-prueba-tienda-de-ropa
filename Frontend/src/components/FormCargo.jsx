import React from 'react';
import axiosInstance from '../api/axioInstance';

/* Se crea esta const para que le de funcion al boton al momento de ejecutar */ 
const cargarButton = async (e) => { 
    e.preventDefault();
    const Correo_Electronico = document.querySelector("#email").value;/* Aqui va al html y busca la etiqueta llamada email */
    const Contrasena = document.querySelector("#password").value;

    const nuevoRegistro = {/*  aqui se da un nombre a la constante y se ponen los campos de la tabla de la DB */
      Correo_Electronico,
      Contrasena
    }
    console.log(nuevoRegistro)
    try {
      const response =  await axiosInstance.post("http://localhost:3000/api/loginUsuario", nuevoRegistro); /* aqui se pone la ruta por donde va a hacer el llamado de los datos  */
      console.log("el nuevo registro fue un exito..." , nuevoRegistro)
      
    } catch (error) { /* se  */
      if (error.response) {
        console.error("Error del servidor:", error.response.data);
      } else {
        console.error("Error de la solicitud:", error.message);
      }

    }
}

const FormCargo = () => { 
  return (
    <>
    <div className='container'>

      <div className="containerForm">
      <main>
        <div class="login-container">
            <div class="login-box">
                {/* Formulario de Login */}
                <div class="form-container">
                    <h2 class="titulo-principal">Iniciar sesión</h2>
                    <form action="#">
                        <div class="input-container">
                            <label for="email">Correo Electrónico:</label>
                            <input type="email" id="email" name="email" required/>
                        </div>
                        <div class="input-container">
                            <label for="password">Contraseña:</label>
                            <input type="password" id="password" name="password" required/>
                        </div>
                        <button type="submit" onClick={cargarButton}>Iniciar sesión</button>
                    </form>
                    <p>¿No tienes cuenta? <a href="registro.html">Regístrate aquí</a></p>
                </div>

                
                <div class="image-container">
                    <img src="./images/imagen9.png" alt="Moda"/>
                </div>
            </div>
        </div>
    </main>
      </div>
    </div>
    </>
  )
}

export default FormCargo