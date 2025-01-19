import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PickCard } from "./PickCard";
import { renderWithProviders } from "../../test/utils";

describe("PickCard", () => {
  const mockPick = {
    id: "123",
    playerId: 1,
    playerName: "LeBron James",
    category: "POINTS",
    threshold: 25,
    hitRate: 75.5,
    result: null,
    createdAt: new Date().toISOString(),
    team: "LAL",
    opponent: "GSW",
    gameTime: new Date().toISOString(),
  };

  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders pick details correctly", () => {
    renderWithProviders(<PickCard pick={mockPick} onDelete={mockOnDelete} />);

    expect(screen.getByText(mockPick.playerName)).toBeInTheDocument();
    expect(screen.getByText(/points/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockPick.threshold}+`)).toBeInTheDocument();
    expect(screen.getByText(`${mockPick.hitRate}%`)).toBeInTheDocument();
  });

  it("shows pending status when result is null", () => {
    renderWithProviders(<PickCard pick={mockPick} onDelete={mockOnDelete} />);

    expect(screen.getByText(/pending/i)).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toHaveClass("text-yellow-500");
  });

  it("shows success status when pick hits", () => {
    const hitPick = { ...mockPick, result: true };
    renderWithProviders(<PickCard pick={hitPick} onDelete={mockOnDelete} />);

    expect(screen.getByText(/hit/i)).toBeInTheDocument();
    expect(screen.getByText(/hit/i)).toHaveClass("text-success");
  });

  it("shows failure status when pick misses", () => {
    const missPick = { ...mockPick, result: false };
    renderWithProviders(<PickCard pick={missPick} onDelete={mockOnDelete} />);

    expect(screen.getByText(/miss/i)).toBeInTheDocument();
    expect(screen.getByText(/miss/i)).toHaveClass("text-destructive");
  });

  it("calls onDelete when delete button is clicked", async () => {
    renderWithProviders(<PickCard pick={mockPick} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockPick.id);
  });

  it("shows game information", () => {
    renderWithProviders(<PickCard pick={mockPick} onDelete={mockOnDelete} />);

    expect(
      screen.getByText(`${mockPick.team} vs ${mockPick.opponent}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(new Date(mockPick.gameTime).toLocaleDateString())
    ).toBeInTheDocument();
  });

  it("disables delete button when isDeleting is true", () => {
    renderWithProviders(
      <PickCard pick={mockPick} onDelete={mockOnDelete} isDeleting={true} />
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeDisabled();
    expect(deleteButton).toHaveTextContent(/deleting/i);
  });
});
