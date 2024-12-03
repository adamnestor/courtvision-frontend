import { LoginForm } from "../components/auth/LoginForm";

export const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="container flex items-center justify-center mx-auto">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
