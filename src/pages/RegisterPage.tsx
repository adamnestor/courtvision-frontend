import { RegisterForm } from "../components/auth/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
        <RegisterForm />
      </div>
    </div>
  );
};
