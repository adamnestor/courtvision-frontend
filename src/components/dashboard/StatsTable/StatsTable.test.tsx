import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { StatsTable } from ".";

describe("StatsTable", () => {
  const mockStats = [
    {
      playerId: "1",
      playerName: "LeBron James",
      team: "LAL",
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
      hitRate: 65.5,
      confidenceScore: 75,
      gamesPlayed: 8,
      average: 32.0,
      isHighConfidence: false,
    },
  ];

  const mockHandleRowClick = vi.fn();

  const defaultProps = {
    stats: mockStats,
    handleRowClick: mockHandleRowClick,
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

    const rows = screen.getAllByTestId("player-row");
    expect(rows).toHaveLength(2);

    const firstRow = rows[0];
    expect(within(firstRow).getByText("LeBron James")).toBeInTheDocument();
    expect(within(firstRow).getByText("LAL")).toBeInTheDocument();
    expect(within(firstRow).getByText("75.5%")).toBeInTheDocument();
    expect(within(firstRow).getByText("10")).toBeInTheDocument();
    expect(within(firstRow).getByText("28.5")).toBeInTheDocument();
  });

  it("calls handleRowClick when row is clicked", () => {
    render(<StatsTable {...defaultProps} />);

    const firstRow = screen.getAllByTestId("player-row")[0];
    fireEvent.click(firstRow);

    expect(mockHandleRowClick).toHaveBeenCalledWith("1");
  });

  it("highlights high confidence picks", () => {
    render(<StatsTable {...defaultProps} />);

    const rows = screen.getAllByTestId("player-row");
    const highConfidenceRow = rows[0]; // LeBron's row
    const normalRow = rows[1]; // Curry's row

    expect(highConfidenceRow).toHaveClass("bg-success/10");
    expect(normalRow).not.toHaveClass("bg-success/10");
  });

  it("formats numbers correctly", () => {
    render(<StatsTable {...defaultProps} />);

    expect(screen.getByText("75.5%")).toBeInTheDocument();
    expect(screen.getByText("28.5")).toBeInTheDocument();
  });
});
