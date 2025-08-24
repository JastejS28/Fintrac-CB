// frontend/src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  // This hook reads data from the store.
  // 'state.auth' matches the key we used in our store's rootReducer.
  const { token } = useSelector((state) => state.auth);       // Accessing token from auth state

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;