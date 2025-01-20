import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingState } from "./LoadingState";

describe("LoadingState", () => {
  it("renders loading spinner by default", () => {
    render(<LoadingState />);
    const svg = screen.getByLabelText(/loading/i);
    expect(svg).toHaveClass("lucide-loader-circle", "animate-spin");
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders custom loading message when provided", () => {
    render(<LoadingState message="Loading data..." />);
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("applies custom size class when provided", () => {
    render(<LoadingState size="lg" />);
    const svg = screen.getByLabelText(/loading/i);
    expect(svg).toHaveClass("h-12", "w-12");
  });

  it("renders in container by default", () => {
    render(<LoadingState />);
    const container = screen.getByTestId("loading-container");
    expect(container).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "min-h-[200px]",
      "p-4"
    );
  });

  it("renders with fullscreen layout when specified", () => {
    render(<LoadingState fullscreen />);
    const container = screen.getByTestId("loading-container");
    expect(container).toHaveClass(
      "fixed",
      "inset-0",
      "flex",
      "items-center",
      "justify-center"
    );
  });
});
