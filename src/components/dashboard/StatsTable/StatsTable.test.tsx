import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StatsTable } from "./StatsTable";
import { Stats } from "../../../types/stats";

describe("StatsTable", () => {
  const mockData: Stats.StatsRow[] = [
    {
      playerId: 1,
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
      playerId: 2,
      playerName: "Stephen Curry",
      team: "GSW",
      opponent: "LAL",
      statLine: "POINTS 20",
      hitRate: 65.5,
      confidenceScore: 75,
      gamesPlayed: 8,
      average: 32.0,
      isHighConfidence: false,
    },
  ];

  const mockOnRowClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders table headers correctly", () => {
    render(<StatsTable data={mockData} onRowClick={mockOnRowClick} />);

    expect(screen.getByText("Player")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Hit Rate")).toBeInTheDocument();
    expect(screen.getByText("Confidence")).toBeInTheDocument();
    expect(screen.getByText("Games")).toBeInTheDocument();
  });

  it("renders player data correctly", () => {
    render(<StatsTable data={mockData} onRowClick={mockOnRowClick} />);

    expect(screen.getByText("LeBron James")).toBeInTheDocument();
    expect(screen.getByText("LAL")).toBeInTheDocument();
    expect(screen.getByText("75.5%")).toBeInTheDocument();
  });

  it("calls onRowClick with correct playerId", () => {
    render(<StatsTable data={mockData} onRowClick={mockOnRowClick} />);

    const row = screen.getByText("LeBron James").closest("tr");
    fireEvent.click(row!);

    expect(mockOnRowClick).toHaveBeenCalledWith(1);
  });

  it("applies high confidence styling", () => {
    render(<StatsTable data={mockData} onRowClick={mockOnRowClick} />);

    const row = screen.getByText("LeBron James").closest("tr");
    expect(row).toHaveClass("bg-green-50");
  });

  it("highlights high confidence picks", () => {
    render(<StatsTable data={mockData} onRowClick={mockOnRowClick} />);

    const rows = screen.getAllByRole("row");
    const highConfidenceRow = rows[1]; // First data row (after header)
    expect(highConfidenceRow).toHaveClass("bg-green-50");
  });

  it("formats numbers correctly", () => {
    render(<StatsTable data={mockData} onRowClick={mockOnRowClick} />);

    expect(
      screen.getByText((content) => content.includes("75.5"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("28.5"))
    ).toBeInTheDocument();
  });
});
