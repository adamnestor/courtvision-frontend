import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { toast } from "react-hot-toast";

const sanitizeErrorMessage = (message: string) => {
  // Remove sensitive info from error messages
  const sensitivePatterns = [
    /token/i,
    /password/i,
    /email/i,
    /database/i,
    /error/i,
    /sql/i,
  ];

  let sanitized = message;
  sensitivePatterns.forEach((pattern) => {
    if (pattern.test(message)) {
      sanitized = "An error occurred. Please try again later.";
    }
  });

  return sanitized;
};

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

  const handleError = (error: any) => {
    const message = error?.response?.data?.message || error.message;
    const sanitizedMessage = sanitizeErrorMessage(message);
    // ... rest of error handling
  };
}
