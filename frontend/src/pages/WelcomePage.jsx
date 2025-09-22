// frontend/src/pages/WelcomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import MoneyRain from '../components/MoneyRain'; // 1. Import the new component
import './WelcomePage.css';

function WelcomePage() {
  return (
    <div className="welcome-container">
      {/* 2. Add the MoneyRain component as the background */}
      <MoneyRain />
      
      <div className="content-overlay">
        <h1>Welcome to FinTrac</h1>
        <p>Your personal finance journey starts here.</p>
        <div className="button-group">
          <Link to="/register" className="btn btn-primary">Register</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;