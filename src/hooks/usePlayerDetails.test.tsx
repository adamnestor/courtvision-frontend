import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePlayerDetails } from "./usePlayerDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { api } from "../services/api";
import { ReactNode } from "react";

vi.mock("../services/api", () => ({
  api: {
    get: vi.fn(),
  },
}));

const mockPlayerDetails = {
  player: {
    playerId: 1,
    firstName: "Test",
    lastName: "Player",
    teamAbbreviation: "TST",
    position: "G",
  },
  games: [],
  summary: {
    category: "POINTS",
    threshold: 15,
    timePeriod: "L10",
    hitRate: 75,
    confidenceScore: 85,
    average: 20,
    successCount: 8,
    failureCount: 2,
  },
  metrics: {
    maxValue: 30,
    minValue: 10,
    averageValue: 20,
    totalGames: 10,
    gamesAboveThreshold: 8,
  },
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePlayerDetails", () => {
  it("fetches player details", async () => {
    vi.mocked(api.get).mockResolvedValueOnce({ data: mockPlayerDetails });

    const { result } = renderHook(() => usePlayerDetails({ playerId: 1 }), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(api.get).toHaveBeenCalledWith("/players/1/details", {
      params: { category: "POINTS", timePeriod: "L10" },
    });
  });

  it("handles errors", async () => {
    const error = new Error("Failed to fetch");
    vi.mocked(api.get).mockRejectedValueOnce(error);

    const { result } = renderHook(() => usePlayerDetails({ playerId: 1 }), {
      wrapper: createWrapper(),
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(error);
  });
});
