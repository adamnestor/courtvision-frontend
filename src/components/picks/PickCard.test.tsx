import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { PickCard } from "./PickCard";
import { renderWithProviders } from "../../test/test-utils";
import { QueryClient } from "@tanstack/react-query";

describe("PickCard", () => {
  const mockPick = {
    id: 123,
    playerId: 1,
    playerName: "LeBron James",
    team: "LAL",
    opponent: "GSW",
    category: "POINTS",
    threshold: 25,
    hitRate: 75.5,
    confidenceScore: 85,
    result: null as "WIN" | "LOSS" | null,
    gameTime: "2024-03-15T19:30:00Z",
  };

  const queryClient = new QueryClient();

  it("renders basic pick details", () => {
    renderWithProviders(<PickCard pick={mockPick} />, { queryClient });

    expect(screen.getByText("LeBron James")).toBeInTheDocument();
    expect(screen.getByText("LAL vs GSW")).toBeInTheDocument();
    expect(screen.getByText("POINTS 25+")).toBeInTheDocument();
    expect(screen.getByText("75.5%")).toBeInTheDocument();
    expect(screen.getByText("Mar 15, 2024")).toBeInTheDocument();
  });

  it("shows result status with correct styling", () => {
    renderWithProviders(<PickCard pick={{ ...mockPick, result: "WIN" }} />, {
      queryClient,
    });

    const status = screen.getByText("WIN");
    expect(status).toBeInTheDocument();
    expect(status).toHaveClass("text-success");
  });

  it("handles delete button interaction", () => {
    const onDelete = vi.fn();
    renderWithProviders(<PickCard pick={mockPick} onDelete={onDelete} />, {
      queryClient,
    });

    const deleteButton = screen.getByRole("button");
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith("123");
  });

  it("shows deleting state", () => {
    renderWithProviders(
      <PickCard pick={mockPick} onDelete={() => {}} isDeleting={true} />,
      { queryClient }
    );

    expect(screen.getByText("Deleting...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
