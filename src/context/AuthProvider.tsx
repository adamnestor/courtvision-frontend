import { ReactNode, useState, useEffect } from "react";
import { AuthContext } from "./auth-context";
import { authService } from "../services/authService";
import { User } from "../types/auth";
import { useAuthStore } from "../hooks/useAuthStore";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { setIsAuthenticated, setIsLoading } = useAuthStore();

  useEffect(() => {
    setIsLoading(true);
    try {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [setIsAuthenticated, setIsLoading]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      setUser(response);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "ADMIN",
        login,
        logout: () => {
          authService.logout();
          setUser(null);
          setIsAuthenticated(false);
        },
        register: authService.register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
