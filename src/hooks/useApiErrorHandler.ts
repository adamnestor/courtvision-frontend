import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { toast } from "react-hot-toast";

export function useApiErrorHandler() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
      navigate("/login");
      toast.error("Session expired. Please login again.");
    };

    const handleNetworkError = () => {
      toast.error("Network error. Please check your connection.");
    };

    window.addEventListener("unauthorized", handleUnauthorized);
    window.addEventListener("networkError", handleNetworkError);

    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
      window.removeEventListener("networkError", handleNetworkError);
    };
  }, [navigate, logout]);
}
