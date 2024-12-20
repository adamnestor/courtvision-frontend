import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "./Input";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await register(
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      navigate("/login");
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="w-full text-center mb-8 bg-gradient-to-r from-cv-indigo via-cv-purple to-cv-pink bg-clip-text text-transparent">
        <h1 className="text-4xl font-bold tracking-tight">
          Join CourtVision
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Create your account to start tracking picks
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={
            formData.confirmPassword && formData.password !== formData.confirmPassword
              ? "Passwords do not match"
              : ""
          }
          required
        />
        
        {error && (
          <div className="text-sm text-cv-error-from flex items-center">
            <AlertCircle className="mr-2 h-4 w-4" />
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 bg-gradient-to-r from-cv-indigo via-cv-purple to-cv-pink text-white rounded-lg
                    hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed 
                    flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="text-center text-sm">
          <span className="text-gray-500">Already have an account? </span>
          <a 
            href="/login" 
            className="text-cv-purple hover:text-cv-indigo transition-colors"
          >
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
};