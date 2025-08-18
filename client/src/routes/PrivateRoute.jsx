import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ role }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  if (role) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== role) return <Navigate to="/" replace />;
    } catch { return <Navigate to="/login" replace />; }
  }
  return <Outlet />;
}
