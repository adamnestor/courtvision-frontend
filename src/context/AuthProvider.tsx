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
    login: async () => {
      // Implement login logic
      setUser({ id: 1, email: "user@example.com", isAdmin: false });
      return Promise.resolve();
    },
    logout: () => setUser(null),
    register: async (email: string, password: string) => {
      // Implement registration logic here
      console.log(`Registering with password length: ${password.length}`);
      setUser({ id: 1, email, isAdmin: false });
      return Promise.resolve();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
