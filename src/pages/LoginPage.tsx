import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/auth/AuthForm";
import { AuthLayout } from "../components/auth/AuthLayout";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (data: { email: string; password: string }) => {
    const success = await login(data.email, data.password);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <AuthLayout title="Welcome Back">
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
};
