import { useFormState } from "../../hooks/useFormState";

export const Form = ({ onSubmit, children }) => {
  const { isSubmitting, errors, setSubmitting, setErrors } = useFormState();
  // ... rest of the component
};
