import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { renderWithProviders } from "../../test/test-utils";
import { QueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// Mock hooks
vi.mock("../../hooks/useDashboardStats", () => ({
  useDashboardStats: vi.fn(),
}));

vi.mock("../../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("Dashboard", () => {
  const mockStats = [
    {
      playerId: "1",
      playerName: "LeBron James",
      team: "LAL",
      opponent: "GSW",
      statLine: "POINTS 25",
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
      opponent: "LAL",
      statLine: "POINTS 20",
      hitRate: 65.5,
      confidenceScore: 75,
      gamesPlayed: 8,
      average: 26.5,
      isHighConfidence: false,
    },
  ];

  let queryClient: QueryClient;
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
          staleTime: 0,
        },
      },
    });
    vi.mocked(useAuth).mockReturnValue({
      user: {
        email: "test@example.com",
        id: "1",
        token: "mock-token",
        role: "USER",
      },
      isAuthenticated: true,
    });
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("displays loading state when user is not authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
    });

    renderWithProviders(<Dashboard />, { queryClient });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays loading state while fetching stats", () => {
    vi.mocked(useDashboardStats).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
      isFetching: true,
    });

    renderWithProviders(<Dashboard />, { queryClient });
    expect(screen.getByTestId("loading-container")).toBeInTheDocument();
  });

  it("displays stats data", async () => {
    vi.mocked(useDashboardStats).mockReturnValue({
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
    });
  });

  it("navigates to player details on row click", async () => {
    vi.mocked(useDashboardStats).mockReturnValue({
      data: mockStats,
      isLoading: false,
      error: null,
      isError: false,
      isFetching: false,
    });

    renderWithProviders(<Dashboard />, { queryClient });

    const row = await screen.findByText("LeBron James");
    fireEvent.click(row);

    expect(mockNavigate).toHaveBeenCalledWith("/player/1");
  });

  it("updates filters correctly", async () => {
    const mockSetStats = vi.fn();
    vi.mocked(useDashboardStats).mockReturnValue({
      data: mockStats,
      isLoading: false,
      error: null,
      isError: false,
      isFetching: false,
    });

    renderWithProviders(<Dashboard />, { queryClient });

    // Test category change
    const categorySelect = screen.getByRole("combobox", { name: /category/i });
    fireEvent.change(categorySelect, { target: { value: "POINTS" } });

    await waitFor(() => {
      expect(vi.mocked(useDashboardStats)).toHaveBeenCalledWith(
        expect.objectContaining({
          category: "POINTS",
          threshold: 15, // Default threshold for POINTS
        })
      );
    });
  });
});
