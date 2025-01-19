import { describe, it, expect, vi, beforeEach } from "vitest";
import axios, { AxiosError } from "axios";
import api, {
  createSinglePick,
  createParlay,
  getUserPicks,
  deletePick,
  ApiError,
} from "./api";
import { authService } from "./authService";
import { toast } from "react-hot-toast";

// Mock dependencies
vi.mock("axios");
vi.mock("./authService");
vi.mock("react-hot-toast");

describe("API Service", () => {
  const mockUser = {
    token: "mock-token",
    email: "test@example.com",
  };

  const mockPick = {
    playerId: 1,
    category: "POINTS",
    threshold: 25,
    hitRateAtPick: 75,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(authService.getCurrentUser).mockReturnValue(mockUser);
  });

  describe("API Configuration", () => {
    it("adds authorization header when user is logged in", () => {
      const config = { headers: {} };
      api.interceptors.request.handlers[0].fulfilled(config);

      expect(config.headers["Authorization"]).toBe(`Bearer ${mockUser.token}`);
    });

    it("handles request without auth token", () => {
      vi.mocked(authService.getCurrentUser).mockReturnValue(null);
      const config = { headers: {} };
      api.interceptors.request.handlers[0].fulfilled(config);

      expect(config.headers["Authorization"]).toBeUndefined();
    });

    it("includes CSRF protection header", () => {
      expect(api.defaults.headers["X-Requested-With"]).toBe("XMLHttpRequest");
    });

    it("has correct timeout configuration", () => {
      expect(api.defaults.timeout).toBe(10000);
    });
  });

  describe("Error Handling", () => {
    it("handles unauthorized error", async () => {
      const error = new AxiosError();
      error.response = {
        status: 401,
        data: { message: "Unauthorized" },
      } as any;

      await api.interceptors.response.handlers[0].rejected(error);

      expect(authService.logout).toHaveBeenCalled();
      expect(window.location.href).toContain("/login");
    });

    it("handles network error", async () => {
      const error = new AxiosError();
      error.message = "Network Error";

      await expect(
        api.interceptors.response.handlers[0].rejected(error)
      ).rejects.toThrow();
      expect(toast.error).toHaveBeenCalled();
    });

    it("creates ApiError with correct properties", () => {
      const error = new ApiError("Test error", 400, "BAD_REQUEST", {
        field: ["Invalid value"],
      });

      expect(error.message).toBe("Test error");
      expect(error.status).toBe(400);
      expect(error.code).toBe("BAD_REQUEST");
      expect(error.errors?.field).toEqual(["Invalid value"]);
    });
  });

  describe("API Methods", () => {
    describe("createSinglePick", () => {
      it("creates pick successfully", async () => {
        const mockResponse = {
          data: { success: true, data: { id: "123", ...mockPick } },
        };
        vi.mocked(axios.post).mockResolvedValueOnce(mockResponse);

        const result = await createSinglePick(mockPick);

        expect(result).toEqual(mockResponse.data);
        expect(axios.post).toHaveBeenCalledWith("/picks", {
          ...mockPick,
          isParlay: false,
        });
      });

      it("validates response format", async () => {
        const invalidResponse = {
          data: { success: true, data: { invalid: "format" } },
        };
        vi.mocked(axios.post).mockResolvedValueOnce(invalidResponse);

        await expect(createSinglePick(mockPick)).rejects.toThrow(
          "Invalid pick response format from server"
        );
      });
    });

    describe("createParlay", () => {
      it("creates parlay successfully", async () => {
        const picks = [mockPick, { ...mockPick, playerId: 2 }];
        const mockResponse = {
          data: {
            success: true,
            data: picks.map((pick, i) => ({ id: `${i}`, ...pick })),
          },
        };
        vi.mocked(axios.post).mockResolvedValueOnce(mockResponse);

        const result = await createParlay(picks);

        expect(result).toEqual(mockResponse.data);
        expect(axios.post).toHaveBeenCalledWith("/picks/parlay", picks);
      });
    });

    describe("getUserPicks", () => {
      it("fetches user picks successfully", async () => {
        const mockResponse = {
          data: { success: true, data: [{ id: "123", ...mockPick }] },
        };
        vi.mocked(axios.get).mockResolvedValueOnce(mockResponse);

        const result = await getUserPicks();

        expect(result.data).toEqual(mockResponse.data);
      });
    });

    describe("deletePick", () => {
      it("deletes pick successfully", async () => {
        const mockResponse = {
          data: { success: true },
        };
        vi.mocked(axios.delete).mockResolvedValueOnce(mockResponse);

        const result = await deletePick(123);

        expect(result).toEqual(mockResponse.data);
        expect(axios.delete).toHaveBeenCalledWith("/picks/123");
      });
    });
  });
});
