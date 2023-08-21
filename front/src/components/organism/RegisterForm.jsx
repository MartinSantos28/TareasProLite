import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Objects from '../../assets/img/OBJECTS.svg';
import Swal from 'sweetalert2';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      email,
      username,
      password,
    };
    
    // Enviar los datos al backend (ajusta la URL según tu configuración)
    fetch('http://localhost:3000/register', {
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
        Swal.fire('Success', data.message, 'success');
      }
    })
    
      .catch((error) => {
        console.error('Error al enviar los datos:', error);
        Swal.fire('Error', error.message || 'An error occurred while sending data', 'error');
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <h4 className='title'>Username*</h4>
          <div className='input-field'>
            <i className='fas fa-lock'></i>
            <input
              type='text'
              placeholder='Enter Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <h4 className='title'>Password*</h4>
          <div className='input-field'>
            <i className='fas fa-lock'></i>
            <input
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type='submit' value='Register' className='btn' />
          <p className='account-text'>
            Already registered? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
      <div className='panels-container'>
        <div className='panel right-panel'>
          <div className='content'>
            <div className='rombo'></div>
            <div className='rombo2'></div>
            <h3>Hello! Welcome to our website</h3>
            <img src={Objects} alt='' className='image' />
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing, elit et semper
              lectus metus bibendum dapibus, aptent conubia pellentesque morbi
              ante. Cum id eleifend euismod aptent ligula nullam justo porta
              iaculis pellentesque, mattis turpis lectus tempus interdum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
