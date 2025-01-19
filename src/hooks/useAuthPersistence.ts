import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { authService } from "../services/authService";

export function useAuthPersistence() {
  const { user, login } = useAuth();

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser && !user) {
      login(storedUser.email, storedUser.token);
    }
  }, []);

  return { isInitialized: true };
}
