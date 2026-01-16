import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';

const ProtectedRoute = () => {
      const { user } = useAuth();
      return user ? <Outlet /> : <Navigate to="/login" />;
  };

export default ProtectedRoute;
