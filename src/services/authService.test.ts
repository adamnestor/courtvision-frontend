import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { authService } from "./authService";

// Mock axios
vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

describe("authService", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Clear localStorage
    localStorage.clear();
  });

  describe("login", () => {
    const mockCredentials = {
      email: "test@example.com",
      password: "password123",
    };

    const mockResponse = {
      data: {
        token: "mock-token",
        email: "test@example.com",
        role: "USER" as const,
      },
    };

    it("successfully logs in user and stores token", async () => {
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.login(mockCredentials);

      expect(result).toEqual(mockResponse.data);
      expect(localStorage.getItem("user")).toBeTruthy();
      expect(JSON.parse(localStorage.getItem("user")!)).toEqual(
        mockResponse.data
      );
    });

    it("handles login failure", async () => {
      const errorMessage = "Invalid credentials";
      mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(authService.login(mockCredentials)).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe("getCurrentUser", () => {
    it("returns null when no user is stored", () => {
      const user = authService.getCurrentUser();
      expect(user).toBeNull();
    });

    it("returns user data when user is stored", () => {
      const mockUser = {
        token: "mock-token",
        email: "test@example.com",
        role: "USER" as const,
      };
      localStorage.setItem("user", JSON.stringify(mockUser));

      const user = authService.getCurrentUser();
      expect(user).toEqual(mockUser);
    });
  });

  describe("logout", () => {
    it("removes user data from storage", () => {
      const mockUser = {
        token: "mock-token",
        email: "test@example.com",
        role: "USER" as const,
      };
      localStorage.setItem("user", JSON.stringify(mockUser));

      authService.logout();
      expect(localStorage.getItem("user")).toBeNull();
    });
  });

  describe("register", () => {
    const mockRegisterData = {
      email: "new@example.com",
      password: "password123",
      confirmPassword: "password123",
    };

    const mockResponse = {
      data: {
        token: "new-token",
        email: "new@example.com",
        role: "USER" as const,
      },
    };

    it("successfully registers new user", async () => {
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.register(mockRegisterData);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining("/register"),
        mockRegisterData
      );
    });

    it("handles registration failure", async () => {
      const errorMessage = "Email already exists";
      mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(authService.register(mockRegisterData)).rejects.toThrow(
        errorMessage
      );
    });
  });
});
