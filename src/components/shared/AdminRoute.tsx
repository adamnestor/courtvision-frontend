import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user?.role === "ADMIN" ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" />
  );
};
