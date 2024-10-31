// src/components/ProtectedUserRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Adjust the path if necessary

const ProtectedUserRoute = ({ element }) => {
  const { isLoggedIn, isUser } = useAuth();  // Extract values from useAuth

  // Check if the user is logged in and has the USER_ROLE
  if (!isLoggedIn || !isUser) {
    // Redirect to landing page or login if not authenticated or not a user
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated and has USER_ROLE, render the child component
  return element;
};

export default ProtectedUserRoute;
