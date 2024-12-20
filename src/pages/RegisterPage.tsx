import { RegisterForm } from "../components/auth/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-cv-indigo/5 via-cv-purple/5 to-cv-pink/5">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};
