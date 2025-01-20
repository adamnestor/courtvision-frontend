import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, act, waitFor } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { renderWithProviders } from "../../test/test-utils";
import { QueryClient } from "@tanstack/react-query";

// Mock hooks
vi.mock("../../hooks/useDashboardStats", () => ({
  useDashboardStats: vi.fn(),
}));

describe("Dashboard", () => {
  const mockStats = [
    {
      playerId: "1",
      playerName: "LeBron James",
      team: "LAL",
      category: "POINTS",
      hitRate: 75.5,
      confidenceScore: 85,
      gamesPlayed: 10,
      average: 28.5,
      isHighConfidence: true,
    },
    {
      playerId: "2",
      playerName: "Stephen Curry",
      team: "GSW",
      category: "POINTS",
      hitRate: 65.5,
      confidenceScore: 75,
      gamesPlayed: 8,
      average: 26.5,
      isHighConfidence: false,
    },
  ];

  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: 0,
          staleTime: 0,
        },
      },
    });
  });

  it("displays loading state", () => {
    const mock = vi.mocked(useDashboardStats);
    mock.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
      isFetching: true,
    });

    renderWithProviders(<Dashboard />, { queryClient });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("displays error state", async () => {
    const error = new Error("Failed to fetch stats");
    const mock = vi.mocked(useDashboardStats);
    mock.mockReturnValue({
      data: undefined,
      isLoading: false,
      error,
      isError: true,
      isFetching: false,
    });

    renderWithProviders(<Dashboard />, { queryClient });

    await waitFor(() => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });
  });

  it("displays stats data", async () => {
    const mock = vi.mocked(useDashboardStats);
    mock.mockReturnValue({
      data: mockStats,
      isLoading: false,
      error: null,
      isError: false,
      isFetching: false,
    });

    renderWithProviders(<Dashboard />, { queryClient });

    await waitFor(() => {
      expect(screen.getByText("LeBron James")).toBeInTheDocument();
      expect(screen.getByText("Stephen Curry")).toBeInTheDocument();
      expect(screen.getByText("75.5%")).toBeInTheDocument();
    });
  });

  it("filters high confidence picks", async () => {
    const mock = vi.mocked(useDashboardStats);
    mock.mockReturnValue({
      data: mockStats,
      isLoading: false,
      error: null,
      isError: false,
      isFetching: false,
    });

    renderWithProviders(<Dashboard />, { queryClient });

    const filterButton = await waitFor(() =>
      screen.getByRole("button", { name: /high confidence/i })
    );

    await act(async () => {
      fireEvent.click(filterButton);
    });

    expect(screen.getByText("LeBron James")).toBeInTheDocument();
    expect(screen.queryByText("Stephen Curry")).not.toBeInTheDocument();
  });

  it("sorts stats by hit rate", async () => {
    const mock = vi.mocked(useDashboardStats);
    mock.mockReturnValue({
      data: mockStats,
      isLoading: false,
      error: null,
      isError: false,
      isFetching: false,
    });

    renderWithProviders(<Dashboard />, { queryClient });

    const sortButton = await waitFor(() =>
      screen.getByRole("button", { name: /hit rate/i })
    );

    await act(async () => {
      fireEvent.click(sortButton);
    });

    await waitFor(() => {
      const rows = screen.getAllByTestId("player-row");
      expect(rows[0]).toHaveTextContent("LeBron James");
      expect(rows[1]).toHaveTextContent("Stephen Curry");
    });
  });
});
