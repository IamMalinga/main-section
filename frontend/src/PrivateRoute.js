import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../authentication/hooks/useAuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify" replace />;
  }

  return children;
};

export default PrivateRoute;
