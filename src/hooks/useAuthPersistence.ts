import { useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { authService } from "../services/authService";

export function useAuthPersistence() {
  const { user, login } = useAuth();

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser && !user) {
      login();
    }
  }, [user, login]);

  return { isInitialized: true };
}
