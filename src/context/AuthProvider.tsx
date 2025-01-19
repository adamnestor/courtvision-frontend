import { ReactNode } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, isLoading, setUser, logout } = useAuthStore();

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login: setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
