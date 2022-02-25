import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard/overview" />;
  }

  return <>{children}</>;
}

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;
