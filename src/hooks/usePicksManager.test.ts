import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { usePicksManager } from "./usePicksManager";
import { picksService } from "../services/picksService";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Mock dependencies
vi.mock("../services/picksService");
vi.mock("react-hot-toast");

const mockPicks = [
  {
    id: "1",
    playerId: 1,
    category: "POINTS",
    hitRate: 80,
    result: true,
    gamesPlayed: 10,
  },
  {
    id: "2",
    playerId: 2,
    category: "ASSISTS",
    hitRate: 60,
    result: false,
    gamesPlayed: 8,
  },
];

describe("usePicksManager", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it("fetches picks successfully", async () => {
    vi.mocked(picksService.getUserPicks).mockResolvedValue(mockPicks);

    const { result } = renderHook(() => usePicksManager(), { wrapper });

    await waitFor(() => {
      expect(result.current.picks).toEqual(mockPicks);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("handles delete pick successfully", async () => {
    vi.mocked(picksService.deletePick).mockResolvedValue(undefined);
    vi.mocked(picksService.getUserPicks).mockResolvedValue(mockPicks);

    const { result } = renderHook(() => usePicksManager(), { wrapper });

    await waitFor(() => {
      expect(result.current.picks).toEqual(mockPicks);
    });

    await result.current.deletePick("1");

    expect(picksService.deletePick).toHaveBeenCalledWith("1");
    expect(toast.success).toHaveBeenCalledWith("Pick deleted successfully");
  });

  it("handles delete pick failure", async () => {
    vi.mocked(picksService.deletePick).mockRejectedValue(
      new Error("Failed to delete")
    );
    vi.mocked(picksService.getUserPicks).mockResolvedValue(mockPicks);

    const { result } = renderHook(() => usePicksManager(), { wrapper });

    await waitFor(() => {
      expect(result.current.picks).toEqual(mockPicks);
    });

    await result.current.deletePick("1");

    expect(toast.error).toHaveBeenCalledWith("Failed to delete pick");
  });

  it("calculates success rate correctly", async () => {
    vi.mocked(picksService.getUserPicks).mockResolvedValue(mockPicks);

    const { result } = renderHook(() => usePicksManager(), { wrapper });

    await waitFor(() => {
      expect(result.current.picks).toEqual(mockPicks);
    });

    expect(result.current.calculateSuccess()).toBe("50.0"); // 1 out of 2 successful
    expect(result.current.calculateSuccess("POINTS")).toBe("100.0"); // 1 out of 1 successful
    expect(result.current.calculateSuccess("ASSISTS")).toBe("0.0"); // 0 out of 1 successful
  });

  it("handles loading state correctly", () => {
    vi.mocked(picksService.getUserPicks).mockImplementation(
      () => new Promise(() => {}) // Never resolves to simulate loading
    );

    const { result } = renderHook(() => usePicksManager(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.picks).toEqual([]);
  });
});
