import { describe, it, expect, vi, beforeEach } from "vitest";
import { createSinglePick, createParlay } from "./api";
import { authService } from "./authService";
import { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { PickCategory } from "../types/parlay";
import type { User } from "../types/auth"; // Import from types directory

vi.mock("./authService", () => ({
  authService: {
    getCurrentUser: vi.fn(),
    logout: vi.fn(),
  },
}));

describe("API Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Request Interceptor", () => {
    const requestInterceptor = (config: InternalAxiosRequestConfig) => {
      const user = authService.getCurrentUser();
      if (user?.token) {
        config.headers["Authorization"] = `Bearer ${user.token}`;
      }
      return config;
    };

    it("adds auth token to headers when user is logged in", async () => {
      const mockUser: User = {
        id: "1",
        token: "test-token",
        email: "test@example.com",
        role: "USER" as const,
      };
      vi.mocked(authService.getCurrentUser).mockReturnValue(mockUser);

      const mockConfig: InternalAxiosRequestConfig = {
        headers: new AxiosHeaders(),
      };
      const config = requestInterceptor(mockConfig);

      expect(config.headers["Authorization"]).toBe(`Bearer ${mockUser.token}`);
    });

    it("does not add auth token when user is not logged in", async () => {
      vi.mocked(authService.getCurrentUser).mockReturnValue(null);

      const mockConfig: InternalAxiosRequestConfig = {
        headers: new AxiosHeaders(),
      };
      const config = requestInterceptor(mockConfig);

      expect(config.headers["Authorization"]).toBeUndefined();
    });
  });

  describe("createSinglePick", () => {
    it("creates a single pick", async () => {
      const mockPick = {
        playerId: 1,
        category: "POINTS" as PickCategory,
        threshold: 20,
        hitRateAtPick: 75,
        isParlay: false,
      };

      const response = await createSinglePick(mockPick);
      expect(response).toBeDefined();
    });
  });

  describe("createParlay", () => {
    it("creates a parlay", async () => {
      const mockPicks = [
        {
          playerId: 1,
          category: "POINTS" as PickCategory,
          threshold: 20,
          hitRateAtPick: 75,
          isParlay: true,
        },
        {
          playerId: 2,
          category: "ASSISTS" as PickCategory,
          threshold: 10,
          hitRateAtPick: 80,
          isParlay: true,
        },
      ];

      const response = await createParlay(mockPicks);
      expect(response).toBeDefined();
    });
  });
});
