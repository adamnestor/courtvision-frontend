import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AdminDashboard } from "./AdminDashboard";
import { useAdminStats } from "../../hooks/useAdminStats";
import { useAuth } from "../../hooks/useAuth";
import { renderWithProviders } from "../../test/utils";
import { toast } from "react-hot-toast";

// Mock dependencies
vi.mock("../../hooks/useAdminStats");
vi.mock("../../hooks/useAuth");
vi.mock("react-hot-toast");

describe("AdminDashboard", () => {
  const mockStats = {
    totalUsers: 150,
    activeUsers: 85,
    totalPicks: 1200,
    successRate: 68.5,
    recentPicks: [
      {
        id: "1",
        userId: "user1",
        playerName: "LeBron James",
        category: "POINTS",
        threshold: 25,
        result: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        userId: "user2",
        playerName: "Stephen Curry",
        category: "ASSISTS",
        threshold: 8,
        result: false,
        createdAt: new Date().toISOString(),
      },
    ],
    userStats: [
      {
        userId: "user1",
        email: "user1@example.com",
        picksCount: 50,
        successRate: 72,
        lastActive: new Date().toISOString(),
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      user: { role: "ADMIN" },
      isAuthenticated: true,
    } as any);
    vi.mocked(useAdminStats).mockReturnValue({
      data: mockStats,
      isLoading: false,
      invalidateStats: vi.fn(),
    } as any);
  });

  it("renders admin dashboard with stats", () => {
    render(<AdminDashboard />);

    expect(screen.getByText(/total users/i)).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
    expect(screen.getByText(/active users/i)).toBeInTheDocument();
    expect(screen.getByText("85")).toBeInTheDocument();
    expect(screen.getByText(/success rate/i)).toBeInTheDocument();
    expect(screen.getByText("68.5%")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.mocked(useAdminStats).mockReturnValue({
      data: null,
      isLoading: true,
    } as any);

    render(<AdminDashboard />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("handles user management actions", async () => {
    const mockInvalidateStats = vi.fn();
    vi.mocked(useAdminStats).mockReturnValue({
      data: mockStats,
      isLoading: false,
      invalidateStats: mockInvalidateStats,
    } as any);

    render(<AdminDashboard />);

    // Test suspend user
    const suspendButton = screen.getByText(/suspend/i);
    fireEvent.click(suspendButton);

    await waitFor(() => {
      expect(mockInvalidateStats).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("User suspended successfully");
    });
  });

  it("displays recent picks with results", () => {
    render(<AdminDashboard />);

    expect(screen.getByText("LeBron James")).toBeInTheDocument();
    expect(screen.getByText("Stephen Curry")).toBeInTheDocument();

    const successPick = screen.getByText(/success/i);
    const failedPick = screen.getByText(/failed/i);

    expect(successPick).toHaveClass("text-success");
    expect(failedPick).toHaveClass("text-destructive");
  });

  it("allows filtering user stats", () => {
    render(<AdminDashboard />);

    const filterInput = screen.getByPlaceholderText(/search users/i);
    fireEvent.change(filterInput, { target: { value: "user1" } });

    expect(screen.getByText("user1@example.com")).toBeInTheDocument();
    expect(screen.queryByText("user2@example.com")).not.toBeInTheDocument();
  });

  it("exports data to CSV", async () => {
    const mockExportData = vi.fn();
    global.URL.createObjectURL = vi.fn();
    global.URL.revokeObjectURL = vi.fn();

    render(<AdminDashboard exportData={mockExportData} />);

    const exportButton = screen.getByText(/export data/i);
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(mockExportData).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Data exported successfully");
    });
  });

  it("shows error message for non-admin users", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { role: "USER" },
      isAuthenticated: true,
    } as any);

    render(<AdminDashboard />);

    expect(
      screen.getByText(/you don't have permission to access this page/i)
    ).toBeInTheDocument();
  });

  it("displays user activity chart", () => {
    render(<AdminDashboard />);

    expect(screen.getByTestId("activity-chart")).toBeInTheDocument();
    expect(screen.getByText(/user activity/i)).toBeInTheDocument();
  });

  it("allows sorting of user stats", () => {
    render(<AdminDashboard />);

    const successRateHeader = screen.getByText(/success rate/i);
    fireEvent.click(successRateHeader);

    // Check if sorting indicators are present
    expect(successRateHeader).toHaveAttribute("aria-sort", "descending");
  });

  it("handles pagination of user list", () => {
    const manyUsers = Array(25)
      .fill(null)
      .map((_, i) => ({
        userId: `user${i}`,
        email: `user${i}@example.com`,
        picksCount: 50,
        successRate: 70,
        lastActive: new Date().toISOString(),
      }));

    vi.mocked(useAdminStats).mockReturnValue({
      data: { ...mockStats, userStats: manyUsers },
      isLoading: false,
    } as any);

    render(<AdminDashboard />);

    const nextPageButton = screen.getByLabelText(/next page/i);
    fireEvent.click(nextPageButton);

    // Check if page 2 users are visible
    expect(screen.getByText("user15@example.com")).toBeInTheDocument();
  });
});
