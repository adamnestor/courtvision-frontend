import { create } from "zustand";

interface ValidationError {
  message: string;
  type: string;
}

interface ValidationState {
  errors: Record<string, ValidationError>;
  touched: Record<string, boolean>;
  isValid: boolean;
  setFieldError: (field: string, error: ValidationError) => void;
  setFieldTouched: (field: string, isTouched?: boolean) => void;
  clearErrors: () => void;
  validateField: (field: string, value: unknown) => void;
  validateForm: (values: Record<string, unknown>) => boolean;
}

export const useFormValidation = create<ValidationState>((set) => ({
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
  validateField: (field: string) => {
    set((state) => ({
      errors: {
        ...state.errors,
        [field]: { message: "Invalid value", type: "error" },
      },
      touched: { ...state.touched, [field]: true },
    }));
  },
  validateForm: (values: Record<string, unknown>) => {
    // Implement form validation logic
    return Object.keys(values).every((key) => {
      const value = values[key];
      return value !== undefined && value !== null && value !== "";
    });
  },
}));
