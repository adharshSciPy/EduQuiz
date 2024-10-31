// src/components/ProtectedAdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';  // Adjust the path if necessary

const ProtectedAdminRoute = ({ element }) => {
  const { isLoggedIn, isAdmin } = useAuth();  // Extract values from useAuth

  // Check if the user is logged in and has the ADMIN_ROLE
  if (!isLoggedIn || !isAdmin) {
    // Redirect to landing page or login if not authenticated or not an admin
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated and has ADMIN_ROLE, render the child component
  return element;
};

export default ProtectedAdminRoute;
