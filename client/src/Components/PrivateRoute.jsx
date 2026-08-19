import { Navigate } from 'react-router-dom';

/**
 * PrivateRoute - Protects routes based on authentication and role
 * @param {string} role - Required role ('Admin' | 'User'). If not provided, only checks authentication.
 */
const PrivateRoute = ({ children, role }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })();

  if (!isLoggedIn || !localStorage.getItem('accessToken')) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Logged in but wrong role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
