import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context"; // Updated import path

interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export const useApiErrorHandler = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return {
    handleError: (error: ApiError) => {
      const message = error.message || "An unexpected error occurred";

      if (error.status === 401) {
        logout();
        navigate("/login");
        toast.error("Session expired. Please login again.");
        return;
      }

      toast.error(message);
    },
  };
};
