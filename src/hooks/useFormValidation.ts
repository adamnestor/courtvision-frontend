import { create } from "zustand";

interface ValidationState {
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValid: boolean;
  setFieldError: (field: string, error: string) => void;
  setFieldTouched: (field: string, isTouched?: boolean) => void;
  clearErrors: () => void;
  validateField: (field: string, value: any) => Promise<boolean>;
  validateForm: (values: Record<string, any>) => Promise<boolean>;
}

export const useFormValidation = create<ValidationState>((set, get) => ({
  errors: {},
  touched: {},
  isValid: true,
  setFieldError: (field, error) =>
    set((state) => ({
      errors: { ...state.errors, [field]: error },
      isValid: false,
    })),
  setFieldTouched: (field, isTouched = true) =>
    set((state) => ({
      touched: { ...state.touched, [field]: isTouched },
    })),
  clearErrors: () => set({ errors: {}, isValid: true }),
  validateField: async (field, value) => {
    // Implement your validation logic here
    return true;
  },
  validateForm: async (values) => {
    // Implement your form validation logic here
    return true;
  },
}));
