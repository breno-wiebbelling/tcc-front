import React  from 'react';
import { Navigate } from 'react-router-dom'

import { isLoggedIn } from "../../service/authService"

export const RequireAuth = ({ children }) => {
  const authed  = isLoggedIn();

  return authed ? children : <Navigate to="/login" />
}