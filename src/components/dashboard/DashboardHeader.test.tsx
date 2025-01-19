import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardHeader } from "./DashboardHeader";

describe("DashboardHeader", () => {
  const mockStats = {
    availablePicks: 5,
    highConfidencePicks: 2,
    gamesCount: 20,
    averageHitRate: 70.5,
  };

  it("renders all stats correctly", () => {
    render(
      <DashboardHeader
        title="Dashboard"
        subtitle="Today's Stats"
        stats={mockStats}
      />
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Today's Stats")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument(); // Available picks
    expect(screen.getByText("2")).toBeInTheDocument(); // High confidence picks
    expect(screen.getByText("20")).toBeInTheDocument(); // Games count
    expect(screen.getByText("70.5%")).toBeInTheDocument(); // Average hit rate
  });

  it("renders without subtitle", () => {
    render(<DashboardHeader title="Dashboard" stats={mockStats} />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.queryByTestId("subtitle")).not.toBeInTheDocument();
  });

  it("renders with custom actions", () => {
    render(
      <DashboardHeader
        title="Dashboard"
        stats={mockStats}
        actions={<button>Custom Action</button>}
      />
    );

    expect(screen.getByRole("button")).toHaveTextContent("Custom Action");
  });
});
