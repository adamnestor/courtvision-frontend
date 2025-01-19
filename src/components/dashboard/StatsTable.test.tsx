import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { StatsTable } from "./StatsTable";
import { useNavigate } from "react-router-dom";
import { renderWithProviders } from "../../test/utils";

// Mock react-router-dom
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("StatsTable", () => {
  const mockStats = [
    {
      playerId: 1,
      playerName: "LeBron James",
      team: "LAL",
      category: "POINTS",
      hitRate: 75.5,
      gamesPlayed: 10,
      average: 28.5,
      lastGames: [25, 30, 22],
      isHighConfidence: true,
    },
    {
      playerId: 2,
      playerName: "Stephen Curry",
      team: "GSW",
      category: "POINTS",
      hitRate: 65.5,
      gamesPlayed: 8,
      average: 32.0,
      lastGames: [35, 28, 33],
      isHighConfidence: false,
    },
  ];

  const defaultProps = {
    stats: mockStats,
    isLoading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders table headers correctly", () => {
    render(<StatsTable {...defaultProps} />);

    expect(screen.getByText("Player")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Hit Rate")).toBeInTheDocument();
    expect(screen.getByText("Games")).toBeInTheDocument();
    expect(screen.getByText("Average")).toBeInTheDocument();
  });

  it("renders player stats correctly", () => {
    render(<StatsTable {...defaultProps} />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(3); // Header + 2 players

    const firstRow = rows[1];
    expect(within(firstRow).getByText("LeBron James")).toBeInTheDocument();
    expect(within(firstRow).getByText("LAL")).toBeInTheDocument();
    expect(within(firstRow).getByText("75.5%")).toBeInTheDocument();
    expect(within(firstRow).getByText("10")).toBeInTheDocument();
    expect(within(firstRow).getByText("28.5")).toBeInTheDocument();
  });

  it("navigates to player detail on row click", () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(<StatsTable {...defaultProps} />);

    const firstRow = screen.getAllByRole("row")[1];
    fireEvent.click(firstRow);

    expect(mockNavigate).toHaveBeenCalledWith("/player/1");
  });

  it("shows loading state", () => {
    render(<StatsTable {...defaultProps} isLoading={true} />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("shows empty state when no stats", () => {
    render(<StatsTable stats={[]} isLoading={false} />);

    expect(screen.getByText(/no stats available/i)).toBeInTheDocument();
  });

  it("sorts table by hit rate", () => {
    render(<StatsTable {...defaultProps} />);

    // Click hit rate header to sort
    fireEvent.click(screen.getByText("Hit Rate"));

    const rows = screen.getAllByRole("row");
    const firstPlayerName = within(rows[1]).getByText("LeBron James");
    const secondPlayerName = within(rows[2]).getByText("Stephen Curry");

    // LeBron should be first (75.5% > 65.5%)
    expect(firstPlayerName).toBeInTheDocument();
    expect(secondPlayerName).toBeInTheDocument();

    // Click again to reverse sort
    fireEvent.click(screen.getByText("Hit Rate"));
    const reversedRows = screen.getAllByRole("row");
    expect(
      within(reversedRows[1]).getByText("Stephen Curry")
    ).toBeInTheDocument();
  });

  it("highlights high confidence picks", () => {
    render(<StatsTable {...defaultProps} />);

    const rows = screen.getAllByRole("row");
    const highConfidenceRow = rows[1]; // LeBron's row
    const normalRow = rows[2]; // Curry's row

    expect(highConfidenceRow).toHaveClass("bg-success/10");
    expect(normalRow).not.toHaveClass("bg-success/10");
  });

  it("shows trend indicators", () => {
    render(<StatsTable {...defaultProps} />);

    const rows = screen.getAllByRole("row");
    const firstRow = rows[1];

    // Check for trend indicator based on last games
    expect(within(firstRow).getByTestId("trend-indicator")).toHaveClass(
      "text-success"
    );
  });

  it("formats numbers correctly", () => {
    render(<StatsTable {...defaultProps} />);

    // Hit rate should have % symbol
    expect(screen.getByText("75.5%")).toBeInTheDocument();
    // Average should have one decimal place
    expect(screen.getByText("28.5")).toBeInTheDocument();
  });

  it("handles row hover state", () => {
    render(<StatsTable {...defaultProps} />);

    const firstRow = screen.getAllByRole("row")[1];

    fireEvent.mouseEnter(firstRow);
    expect(firstRow).toHaveClass("hover:bg-muted");

    fireEvent.mouseLeave(firstRow);
    expect(firstRow).not.toHaveClass("hover:bg-muted/50");
  });
});
