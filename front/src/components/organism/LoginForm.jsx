import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import '../../assets/styles/Styles.css';
import LoginImg from '../../assets/img/img-login.png';

function LoginForm() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      email: correo,
      password: contrasena,
    };

    // Enviar los datos al backend
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          Swal.fire('Error', data.error, 'error');
        } else {
          Swal.fire('Éxito', data.message, 'success');
          // Aquí puedes manejar el estado de inicio de sesión si es necesario
        }
      })
      .catch((error) => {
        console.error('Error al enviar los datos:', error);
        Swal.fire('Error', 'Ocurrió un error al enviar los datos', 'error');
      });
  };

  return (
    <div className='container'>
      <div className='signin-signup'>
        <form onSubmit={handleSubmit} className='sign-up-form'>
          <h4 className='title'>Email*</h4>
          <div className='input-field'>
            <i className='fas fa-envelope'></i>
            <input
              type='text'
              placeholder='Enter Email'
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <h4 className='title'>Password*</h4>
          <div className='input-field'>
            <i className='fas fa-lock'></i>
            <input
              type='password'
              placeholder='Enter Password'
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
          <input type='submit' value='Login' className='btn' />
          <p className='account-text'>
            Not registered yet? <Link to='/register'>Create an Account</Link>
          </p>
          <p className='account-text'>Forgot your password? <Link to="/recoverpass">Reset Password</Link></p> 
        </form>
      </div>
      <div className='panels-container'>
        <div className='panel right-panel'>
          <div className='content'>
            <div className='rombo'></div>
            <div className='rombo2'></div>
            <h3>Hello! Welcome to our website</h3>
            <img src={LoginImg} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
