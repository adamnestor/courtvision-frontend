import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RateLimiter } from "../utils/rateLimiter";
import {
  validateEmail,
  validatePassword,
  sanitizeInput,
} from "../utils/validation";

// 5 attempts per minute
const loginRateLimiter = new RateLimiter(5, 60 * 1000);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const login = async (email: string, password: string) => {
    if (!loginRateLimiter.canMakeRequest()) {
      throw new Error("Too many login attempts. Please try again later.");
    }

    const sanitizedEmail = sanitizeInput(email);
    if (!validateEmail(sanitizedEmail)) {
      throw new Error("Invalid email format");
    }

    if (!validatePassword(password)) {
      throw new Error("Invalid password format");
    }

    // ... rest of login logic
  };

  return { ...context, login };
};
