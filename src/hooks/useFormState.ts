import { create } from "zustand";

interface FormState {
  isSubmitting: boolean;
  errors: Record<string, string>;
  setSubmitting: (isSubmitting: boolean) => void;
  setErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;
}

export const useFormState = create<FormState>((set) => ({
  isSubmitting: false,
  errors: {},
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setErrors: (errors) => set({ errors }),
  clearErrors: () => set({ errors: {} }),
}));
