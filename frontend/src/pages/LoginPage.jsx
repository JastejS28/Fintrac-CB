import React,{useState} from 'react';
import { loginUser } from '../services/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../store/authActions'; // 1. Update this import path


function LoginPage() {
  const [email, setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [error, setError]= useState('');

  const navigate= useNavigate();
  const dispatch= useDispatch();
   
  const handleSubmit= async(e)=>{
    e.preventDefault();
    setError('');
  const UserData={
  email,
  password
}
    try{
      const response= await loginUser(UserData)
      dispatch(setCredentials({user: response.data.user, token: response.data.token}))
         console.log('Login successful!', response.data);
         navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response.data.message || 'Failed to login. Please try again.');
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input  type='email' placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
        <br/>
        <input  type='password'  placeholder ='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <br/>
        <button type='submit'>Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default LoginPage;
