import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}