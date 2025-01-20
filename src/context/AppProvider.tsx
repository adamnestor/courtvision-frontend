import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { ThemeProvider } from "./theme-provider";
import { ParlayBuilderProvider } from "./ParlayBuilderProvider";
import { Toaster } from "react-hot-toast";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <ParlayBuilderProvider>
            {children}
            <Toaster position="top-right" />
          </ParlayBuilderProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
