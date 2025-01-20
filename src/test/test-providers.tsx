import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContext } from "../context/auth-context";
import { vi } from "vitest";

const mockAuthValue = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: vi.fn(),
  logout: vi.fn(),
  register: vi.fn(),
};

export const AllTheProviders = ({
  children,
  queryClient,
}: {
  children: ReactNode;
  queryClient: QueryClient;
}) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuthValue}>
          {children}
        </AuthContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
