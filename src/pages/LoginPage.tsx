import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/auth/AuthForm";
import { AuthLayout } from "../components/auth/AuthLayout";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      await login();
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back">
      {error && <div className="text-red-500">{error}</div>}
      <AuthForm
        type="login"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
}
