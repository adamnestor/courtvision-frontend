import { createContext, useContext } from "react";

interface AuthContextType {
  user: {
    id: number;
    email: string;
    isAdmin: boolean;
    // Add other user properties you need
  } | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: () => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
