import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const AdminRoute = () => {
  const { user, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated or not an admin
  if (!isAuthenticated || !user || user.role !== "ADMIN") {
    return <Navigate to="/login" />;
  }

  // Render child routes
  return <Outlet />;
};
