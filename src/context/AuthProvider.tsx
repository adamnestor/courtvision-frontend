import { ReactNode, useState } from "react";
import { AuthContext } from "./auth-context";

interface User {
  id: number;
  email: string;
  isAdmin: boolean;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    login: () => {
      // Implement login logic
      setUser({ id: 1, email: "user@example.com", isAdmin: false });
    },
    logout: () => setUser(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
