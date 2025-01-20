import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/auth/AuthForm";
import { AuthLayout } from "../components/auth/AuthLayout";

interface RegisterFormData {
  email: string;
  password: string;
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(undefined);
      await register(data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account">
      {error && <div className="text-red-500">{error}</div>}
      <AuthForm
        type="register"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
}
