import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function HomePage() {
  // Get the token from the Redux store
  const { token } = useSelector((state) => state.auth);

  // If a token exists, the user is logged in, so redirect to the dashboard.
  // Otherwise, redirect to the login page.
  return token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}

export default HomePage;