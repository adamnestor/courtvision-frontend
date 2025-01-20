import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { PickCard } from "./PickCard";
import { renderWithProviders } from "../../test/test-utils";
import { QueryClient } from "@tanstack/react-query";

describe("PickCard", () => {
  const mockPick = {
    id: "1",
    playerId: 1,
    playerName: "LeBron James",
    teamAbbreviation: "LAL",
    opposingTeamAbbreviation: "GSW",
    category: "POINTS",
    threshold: 25,
    hitRate: 75.5,
    confidenceScore: 85,
    status: "PENDING" as const,
    gameTime: "2023-12-31T00:00:00Z",
  };

  const mockOnDelete = vi.fn();
  const queryClient = new QueryClient();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders pick details correctly", () => {
    render(<PickCard pick={mockPick} onDelete={() => {}} />);

    expect(screen.getByText(mockPick.playerName)).toBeInTheDocument();
    expect(screen.getByText(/POINTS/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockPick.threshold}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockPick.hitRate}%`)).toBeInTheDocument();
  });

  it("shows success status when pick hits", () => {
    render(
      <PickCard pick={{ ...mockPick, status: "HIT" }} onDelete={() => {}} />
    );

    const statusElement = screen.getByText(/hit/i);
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass("text-success");
  });

  it("shows game information", () => {
    render(<PickCard pick={mockPick} onDelete={() => {}} />);

    expect(
      screen.getByText(
        `${mockPick.teamAbbreviation} vs ${mockPick.opposingTeamAbbreviation}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Dec 31, 2023")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", async () => {
    renderWithProviders(
      <PickCard pick={mockPick} onDelete={mockOnDelete} isDeleting={false} />,
      { queryClient }
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockPick.id);
  });

  it("disables delete button when isDeleting is true", () => {
    renderWithProviders(
      <PickCard pick={mockPick} onDelete={mockOnDelete} isDeleting={true} />,
      { queryClient }
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeDisabled();
    expect(deleteButton).toHaveTextContent(/deleting/i);
  });
});
