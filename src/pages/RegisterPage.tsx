import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/auth/AuthForm";
import { AuthLayout } from "../components/auth/AuthLayout";
import { useAuth } from "../hooks/useAuth";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();

  const handleRegister = async (data: { email: string; password: string }) => {
    const success = await register(data.email, data.password);
    if (success) {
      navigate("/login");
    }
  };

  return (
    <AuthLayout title="Create Account">
      <AuthForm
        type="register"
        onSubmit={handleRegister}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
};
