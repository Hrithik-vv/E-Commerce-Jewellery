import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Wraps routes that require authentication.
 * Unauthenticated users are redirected to /login?redirect=<current-path>
 * so they are returned here after a successful login.
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    // Preserve the full path + search string so Login can redirect back
    const redirectTo = location.pathname + location.search;
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirectTo)}`} replace />;
  }

  return children;
}
