import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { useAuth } from "../../hooks/useAuth";
import { renderWithProviders } from "../../test/utils";

// Mock hooks
vi.mock("../../hooks/useDashboardStats");
vi.mock("../../hooks/useAuth");

describe("Dashboard", () => {
  const mockUser = {
    email: "test@example.com",
    role: "USER" as const,
  };

  const mockStats = [
    {
      playerId: 1,
      playerName: "LeBron James",
      category: "POINTS",
      hitRate: 75,
      gamesPlayed: 10,
      isHighConfidence: true,
    },
    {
      playerId: 2,
      playerName: "Stephen Curry",
      category: "ASSISTS",
      hitRate: 65,
      gamesPlayed: 8,
      isHighConfidence: false,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
    } as any);
  });

  it("renders dashboard with stats", async () => {
    vi.mocked(useDashboardStats).mockReturnValue({
      data: mockStats,
      isLoading: false,
    } as any);

    renderWithProviders(<Dashboard />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("LeBron James")).toBeInTheDocument();
    expect(screen.getByText("Stephen Curry")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.mocked(useDashboardStats).mockReturnValue({
      data: null,
      isLoading: true,
    } as any);

    renderWithProviders(<Dashboard />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("handles filter changes", async () => {
    const mockSetCategory = vi.fn();
    const mockSetTimePeriod = vi.fn();
    const mockSetThreshold = vi.fn();

    vi.mocked(useDashboardStats).mockReturnValue({
      data: mockStats,
      isLoading: false,
      setCategory: mockSetCategory,
      setTimePeriod: mockSetTimePeriod,
      setThreshold: mockSetThreshold,
    } as any);

    renderWithProviders(<Dashboard />);

    // Test category filter
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "POINTS" },
    });
    expect(mockSetCategory).toHaveBeenCalledWith("POINTS");

    // Test time period filter
    fireEvent.change(screen.getByLabelText(/time period/i), {
      target: { value: "L20" },
    });
    expect(mockSetTimePeriod).toHaveBeenCalledWith("L20");
  });

  it("displays correct stats in header", () => {
    vi.mocked(useDashboardStats).mockReturnValue({
      data: mockStats,
      isLoading: false,
    } as any);

    renderWithProviders(<Dashboard />);

    expect(screen.getByText(/75%/)).toBeInTheDocument(); // Hit rate
    expect(screen.getByText(/18/)).toBeInTheDocument(); // Total games
    expect(screen.getByText(/1/)).toBeInTheDocument(); // High confidence picks
  });

  it("handles empty stats", () => {
    vi.mocked(useDashboardStats).mockReturnValue({
      data: [],
      isLoading: false,
    } as any);

    renderWithProviders(<Dashboard />);

    expect(screen.getByText(/no stats available/i)).toBeInTheDocument();
  });

  it("sorts stats correctly", () => {
    vi.mocked(useDashboardStats).mockReturnValue({
      data: mockStats,
      isLoading: false,
    } as any);

    renderWithProviders(<Dashboard />);

    const sortButton = screen.getByText(/hit rate/i);
    fireEvent.click(sortButton);

    // Check if LeBron (75%) appears before Curry (65%)
    const players = screen.getAllByTestId("player-row");
    expect(players[0]).toHaveTextContent("LeBron James");
    expect(players[1]).toHaveTextContent("Stephen Curry");
  });

  it("filters high confidence picks", () => {
    vi.mocked(useDashboardStats).mockReturnValue({
      data: mockStats,
      isLoading: false,
    } as any);

    renderWithProviders(<Dashboard />);

    const confidenceFilter = screen.getByLabelText(/high confidence/i);
    fireEvent.click(confidenceFilter);

    // Should only show LeBron (isHighConfidence: true)
    expect(screen.getByText("LeBron James")).toBeInTheDocument();
    expect(screen.queryByText("Stephen Curry")).not.toBeInTheDocument();
  });
});
