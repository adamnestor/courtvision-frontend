import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  loadingMessage: string;
  setLoading: (isLoading: boolean, message?: string) => void;
}

export const useLoadingState = create<LoadingState>((set) => ({
  isLoading: false,
  loadingMessage: "",
  setLoading: (isLoading, message = "") =>
    set({ isLoading, loadingMessage: message }),
}));
