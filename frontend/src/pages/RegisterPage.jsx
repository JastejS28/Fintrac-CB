import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const RegisterPage = () => {
const navigate= useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const handleRegister = async (e) => {
  e.preventDefault();
  setError('');
  const userData = {
    username,
    email,
    password
  };

try{
  await registerUser(userData);
  navigate('/login');

}catch (error) {
  setError('Registration failed. Please try again.');
}

}

  return (
    <div>
      <h2>Register</h2>
      <form>
        <input type='text' placeholder='Username'
        value= {username}  onChange={(e)=> setUsername(e.target.value)} />
        <input type='email' placeholder='Email'
        value= {email}  onChange={(e)=> setEmail(e.target.value)} />
        <input type='password' placeholder='Password'
        value= {password}  onChange={(e)=> setPassword(e.target.value)} />
        <button onClick={handleRegister} type='submit'>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage;
