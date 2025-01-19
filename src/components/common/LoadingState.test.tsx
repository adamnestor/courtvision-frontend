import { render, screen } from "@testing-library/react";
import { LoadingState } from "./LoadingState";

describe("LoadingState", () => {
  it("renders with default message", () => {
    render(<LoadingState />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders with custom message", () => {
    render(<LoadingState message="Custom loading..." />);
    expect(screen.getByText("Custom loading...")).toBeInTheDocument();
  });
});
