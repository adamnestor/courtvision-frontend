import { createContext, useContext } from "react";
import { AuthContextType } from "./AuthContext.types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ... implementation
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
