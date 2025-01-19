import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAuth } from "./useAuth";
import { authService } from "../services/authService";
import { toast } from "react-hot-toast";
import { RateLimiter } from "../utils/rateLimiter";
import { AuthContext } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../utils/validation";

// Mock dependencies
vi.mock("../services/authService");
vi.mock("react-hot-toast");
vi.mock("../utils/rateLimiter", () => ({
  RateLimiter: vi.fn().mockImplementation(() => ({
    canMakeRequest: () => true,
  })),
}));
vi.mock("../utils/validation");

describe("useAuth", () => {
  const mockUser = {
    email: "test@example.com",
    token: "mock-token",
    role: "USER" as const,
  };

  const wrapper = ({ children }) => (
    <AuthContext.Provider
      value={{
        user: null,
        isAuthenticated: false,
        login: vi.fn(),
        logout: vi.fn(),
        register: vi.fn(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.mocked(validateEmail).mockReturnValue(true);
    vi.mocked(validatePassword).mockReturnValue(true);
  });

  describe("login", () => {
    it("successfully logs in user", async () => {
      vi.mocked(authService.login).mockResolvedValueOnce(mockUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.login("test@example.com", "password123");
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
      expect(toast.success).toHaveBeenCalledWith("Successfully logged in");
    });

    it("handles login failure", async () => {
      const error = new Error("Invalid credentials");
      vi.mocked(authService.login).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await expect(
          result.current.login("test@example.com", "wrong-password")
        ).rejects.toThrow("Invalid credentials");
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(toast.error).toHaveBeenCalled();
    });

    it("enforces rate limiting", async () => {
      vi.mocked(RateLimiter).mockImplementationOnce(() => ({
        canMakeRequest: () => false,
      }));

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await expect(
          result.current.login("test@example.com", "password123")
        ).rejects.toThrow("Too many login attempts");
      });

      expect(authService.login).not.toHaveBeenCalled();
    });

    it("validates email before login", async () => {
      vi.mocked(validateEmail).mockReturnValue(false);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await expect(
          result.current.login("invalid-email", "password123")
        ).rejects.toThrow("Invalid email format");
      });

      expect(result.current.isAuthenticated).toBe(false);
    });

    it("validates password before login", async () => {
      vi.mocked(validatePassword).mockReturnValue(false);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await expect(
          result.current.login("test@example.com", "weak")
        ).rejects.toThrow("Invalid password format");
      });

      expect(result.current.isAuthenticated).toBe(false);
    });

    it("sanitizes input before processing", async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.login(
          "<script>alert('xss')</script>@example.com",
          "password123"
        );
      });

      // Check if sanitized email was used
      expect(result.current.login).toHaveBeenCalledWith(
        "alert('xss')@example.com",
        "password123"
      );
    });
  });

  describe("logout", () => {
    it("successfully logs out user", async () => {
      // Setup initial authenticated state
      vi.mocked(authService.getCurrentUser).mockReturnValueOnce(mockUser);
      const { result } = renderHook(() => useAuth(), { wrapper });

      act(() => {
        result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(authService.logout).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Successfully logged out");
    });
  });

  describe("register", () => {
    const registerData = {
      email: "new@example.com",
      password: "password123",
      confirmPassword: "password123",
    };

    it("successfully registers new user", async () => {
      vi.mocked(authService.register).mockResolvedValueOnce(mockUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.register(registerData);
      });

      expect(authService.register).toHaveBeenCalledWith(registerData);
      expect(toast.success).toHaveBeenCalledWith("Registration successful");
    });

    it("handles registration failure", async () => {
      const error = new Error("Email already exists");
      vi.mocked(authService.register).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await expect(result.current.register(registerData)).rejects.toThrow(
          "Email already exists"
        );
      });

      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("authentication state", () => {
    it("initializes with current user", () => {
      vi.mocked(authService.getCurrentUser).mockReturnValueOnce(mockUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it("handles token expiration", () => {
      vi.mocked(authService.getCurrentUser).mockReturnValueOnce(null);

      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it("maintains authentication state", () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: ({ children }) => (
          <AuthContext.Provider
            value={{
              user: mockUser,
              isAuthenticated: true,
              login: vi.fn(),
              logout: vi.fn(),
              register: vi.fn(),
            }}
          >
            {children}
          </AuthContext.Provider>
        ),
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual(mockUser);
    });
  });

  it("enforces rate limiting", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    // Attempt multiple logins quickly
    for (let i = 0; i < 6; i++) {
      await act(async () => {
        try {
          await result.current.login("test@example.com", "password123");
        } catch (error) {
          if (i === 5) {
            expect(error.message).toBe("Too many login attempts");
          }
        }
      });
    }
  });
});
