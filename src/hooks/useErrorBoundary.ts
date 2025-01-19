import { create } from "zustand";

interface ErrorState {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  hasError: boolean;
  setError: (error: Error, errorInfo: React.ErrorInfo) => void;
  clearError: () => void;
  resetErrorBoundary: () => void;
}

export const useErrorBoundary = create<ErrorState>((set) => ({
  error: null,
  errorInfo: null,
  hasError: false,
  setError: (error, errorInfo) => set({ error, errorInfo, hasError: true }),
  clearError: () => set({ error: null, errorInfo: null, hasError: false }),
  resetErrorBoundary: () =>
    set({ error: null, errorInfo: null, hasError: false }),
}));
