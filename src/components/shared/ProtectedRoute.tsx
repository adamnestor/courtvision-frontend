import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { ParlayBuilderPanel } from "../parlay/ParlayBuilderPanel";

export const ProtectedRoute = () => {
  const { user, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  // Render child routes
  return (
    <>
      <Outlet />;
      <ParlayBuilderPanel />
    </>
  );
};
