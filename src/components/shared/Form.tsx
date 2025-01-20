import { ReactNode } from "react";
import {
  useForm as useHookForm,
  FieldValues,
  SubmitHandler,
  DefaultValues,
} from "react-hook-form";

interface FormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  children:
    | ((props: {
        register: ReturnType<typeof useHookForm<T>>["register"];
        errors: ReturnType<typeof useHookForm<T>>["formState"]["errors"];
        isSubmitting: boolean;
      }) => ReactNode)
    | ReactNode;
  className?: string;
}

export const Form = <T extends FieldValues>({
  onSubmit,
  defaultValues,
  children,
  className = "space-y-4",
}: FormProps<T>) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useHookForm<T>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {typeof children === "function"
        ? children({ register, errors, isSubmitting })
        : children}
    </form>
  );
};
