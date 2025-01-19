import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { usePlayerDetails } from "./usePlayerDetails";
import { createSinglePick } from "../services/api";
import { toast } from "react-hot-toast";
import { renderWithProviders } from "../test/utils";

// Mock dependencies
vi.mock("../services/api");
vi.mock("react-hot-toast");
vi.mock("./usePlayerStats", () => ({
  usePlayerStats: () => ({
    data: mockPlayerStats,
    isLoading: false,
  }),
}));

const mockPlayerStats = {
  playerId: 1,
  playerName: "LeBron James",
  category: "POINTS",
  hitRate: 75,
  gamesPlayed: 10,
  averagePoints: 28.5,
  lastGames: [
    { value: 30, threshold: 25, date: "2024-01-01" },
    { value: 22, threshold: 25, date: "2024-01-03" },
  ],
};

describe("usePlayerDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches player details successfully", async () => {
    const { result } = renderHook(
      () => usePlayerDetails(1, "L10", "POINTS", 25),
      { wrapper: renderWithProviders }
    );

    await waitFor(() => {
      expect(result.current.stats).toEqual(mockPlayerStats);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("creates pick successfully", async () => {
    vi.mocked(createSinglePick).mockResolvedValueOnce({
      success: true,
      data: { id: "123", ...mockPlayerStats },
    });

    const { result } = renderHook(
      () => usePlayerDetails(1, "L10", "POINTS", 25),
      { wrapper: renderWithProviders }
    );

    await result.current.createPick({
      category: "POINTS",
      threshold: 25,
      hitRateAtPick: 75,
    });

    expect(createSinglePick).toHaveBeenCalledWith({
      playerId: 1,
      category: "POINTS",
      threshold: 25,
      hitRateAtPick: 75,
      isParlay: false,
    });
    expect(toast.success).toHaveBeenCalledWith("Pick saved successfully!");
  });

  it("handles pick creation failure", async () => {
    vi.mocked(createSinglePick).mockRejectedValueOnce(
      new Error("Failed to create pick")
    );

    const { result } = renderHook(
      () => usePlayerDetails(1, "L10", "POINTS", 25),
      { wrapper: renderWithProviders }
    );

    await result.current.createPick({
      category: "POINTS",
      threshold: 25,
      hitRateAtPick: 75,
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to save pick");
  });

  it("tracks creation loading state", async () => {
    vi.mocked(createSinglePick).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    const { result } = renderHook(
      () => usePlayerDetails(1, "L10", "POINTS", 25),
      { wrapper: renderWithProviders }
    );

    expect(result.current.isCreating).toBe(false);

    result.current.createPick({
      category: "POINTS",
      threshold: 25,
      hitRateAtPick: 75,
    });

    expect(result.current.isCreating).toBe(true);
  });
});
