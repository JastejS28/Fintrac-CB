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
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Join FinTrac</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
          Start your financial journey today
        </p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleRegister} className="auth-form">
          <input 
            type='text' 
            placeholder='Full Name'
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
            className="auth-input"
          />
          
          <input 
            type='email' 
            placeholder='Email Address'
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            className="auth-input"
          />
          
          <input 
            type='password' 
            placeholder='Create Password'
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            className="auth-input"
          />
          
          <button type='submit' className="auth-btn">
            ✨ Create Account
          </button>
        </form>
        
        <div className="auth-link">
          Already have an account? <a href="/login">Sign in here</a>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;
