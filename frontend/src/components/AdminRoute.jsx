import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.role === "ADMIN" ? children : <Navigate to="/login" />;
};

export default AdminRoute;
