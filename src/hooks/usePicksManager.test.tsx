import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePicksManager } from "./usePicksManager";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query/build/lib/QueryClientProvider";
import { picksService } from "../services/picksService";
import { ReactNode } from "react";
import { toast } from "react-hot-toast";
import { UserPickDTO } from "../types/picks";

vi.mock("../services/picksService", () => ({
  picksService: {
    getUserPicks: vi.fn(),
    deletePick: vi.fn(),
    deleteParlay: vi.fn(),
  },
}));

const mockPicks = {
  singles: [
    {
      id: 1,
      playerId: 1,
      playerName: "Test Player",
      team: "TEST",
      opponent: "OPP",
      category: "POINTS",
      threshold: 15,
      hitRate: 75,
      result: true,
      gamesPlayed: 10,
      createdAt: new Date().toISOString(),
    },
  ],
  parlays: [
    {
      id: "parlay-1",
      picks: [
        {
          id: 2,
          playerId: 2,
          playerName: "Test Player 2",
          team: "TEST2",
          opponent: "OPP2",
          category: "ASSISTS",
          threshold: 5,
          hitRate: 65,
          result: false,
          gamesPlayed: 8,
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ],
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

describe("usePicksManager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and returns picks", async () => {
    vi.mocked(picksService.getUserPicks).mockResolvedValue(mockPicks);
    const { result } = renderHook(() => usePicksManager(), {
      wrapper: createWrapper(),
    });
    expect(result.current.picks).toEqual(mockPicks);
  });

  // ... rest of tests with updated wrapper usage
});
