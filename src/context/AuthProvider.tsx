import { ReactNode } from "react";
import { AuthContext } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const value = {
    isAuthenticated: false,
    isAdmin: false,
    login: () => {}, // Empty implementation for now
    logout: () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
