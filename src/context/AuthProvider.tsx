import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "./AuthContext.types";
import { authService } from "../services/authService";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setUser(response);
  };

  const register = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    await authService.register({ email, password, confirmPassword });
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}