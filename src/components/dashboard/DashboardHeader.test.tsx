import { vi, describe, it, expect } from "vitest";
import { createContext } from "react";

// Mock imports first
vi.mock("../../context/auth-context", async () => {
  const actual = await vi.importActual("../../context/auth-context");
  return {
    ...actual,
    AuthContext: createContext(null),
    useAuth: vi.fn().mockReturnValue({
      user: { id: 1, email: "test@example.com", isAdmin: false },
      isAuthenticated: true,
      isAdmin: false,
      login: async () => {},
      logout: async () => {},
      register: async () => {},
    }),
  };
});

// Then other imports
import { render, screen } from "@testing-library/react";
import { DashboardHeader } from "./DashboardHeader";

describe("DashboardHeader", () => {
  const mockStats = {
    availablePicks: 5,
    highConfidencePicks: 3,
    gamesCount: 10,
    averageHitRate: 75.5,
  };

  it("renders all stats correctly", () => {
    render(
      <DashboardHeader
        title="Dashboard"
        subtitle="Today's Stats"
        stats={mockStats}
      />
    );

    // Test title and subtitle
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Today's Stats")).toBeInTheDocument();

    // Test stat cards
    expect(screen.getByText("Available Picks")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();

    expect(screen.getByText("High Confidence")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    expect(screen.getByText("Games")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();

    expect(screen.getByText("Average Hit Rate")).toBeInTheDocument();
    expect(screen.getByText("75.5%")).toBeInTheDocument();
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
