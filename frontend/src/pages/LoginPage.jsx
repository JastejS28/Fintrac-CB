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
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
          Sign in to your FinTrac account
        </p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <input 
            type='email' 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            className="auth-input"
          />
          
          <input 
            type='password' 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            className="auth-input"
          />
          
          <button type='submit' className="auth-btn">
            🚀 Sign In
          </button>
        </form>
        
        <div className="auth-link">
          Don't have an account? <a href="/register">Create one here</a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
