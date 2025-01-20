import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FilterBar } from "./FilterBar";
import { Category, TimePeriod } from "../../types/dashboard";

describe("FilterBar", () => {
  const defaultProps = {
    category: "POINTS" as const,
    timePeriod: "L10" as const,
    threshold: 25,
    onCategoryChange: vi.fn(),
    onTimePeriodChange: vi.fn(),
    onThresholdChange: vi.fn(),
    availableCategories: ["ALL", "POINTS", "ASSISTS", "REBOUNDS"] as Category[],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all filter options", () => {
    render(<FilterBar {...defaultProps} />);

    // Time period options
    expect(screen.getByLabelText(/time period/i)).toBeInTheDocument();
    expect(screen.getByText("Last 10")).toBeInTheDocument();
    expect(screen.getByText("Last 20")).toBeInTheDocument();
    expect(screen.getByText("Season")).toBeInTheDocument();

    // Category options
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    defaultProps.availableCategories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });

    // Threshold input
    expect(screen.getByLabelText(/threshold/i)).toBeInTheDocument();
  });

  it("calls onTimePeriodChange when time period is changed", () => {
    render(<FilterBar {...defaultProps} />);

    fireEvent.change(screen.getByLabelText(/time period/i), {
      target: { value: "L20" },
    });

    expect(defaultProps.onTimePeriodChange).toHaveBeenCalledWith("L20");
  });

  it("calls onCategoryChange when category is changed", () => {
    render(<FilterBar {...defaultProps} />);

    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "POINTS" },
    });

    expect(defaultProps.onCategoryChange).toHaveBeenCalledWith("POINTS");
  });

  it("calls onThresholdChange with number value", () => {
    render(<FilterBar {...defaultProps} />);

    fireEvent.change(screen.getByLabelText(/threshold/i), {
      target: { value: "25" },
    });

    expect(defaultProps.onThresholdChange).toHaveBeenCalledWith(25);
  });

  it("displays current filter values", () => {
    const currentFilters = {
      ...defaultProps,
      timePeriod: "L20" as TimePeriod,
      category: "POINTS" as Category,
      threshold: 25,
    };

    render(<FilterBar {...currentFilters} />);

    expect(screen.getByLabelText(/time period/i)).toHaveValue("L20");
    expect(screen.getByLabelText(/category/i)).toHaveValue("POINTS");
    expect(screen.getByLabelText(/threshold/i)).toHaveValue(25);
  });

  it("disables threshold input for ALL category", () => {
    render(<FilterBar {...defaultProps} category="ALL" />);

    expect(screen.getByLabelText(/threshold/i)).toBeDisabled();
  });

  it("shows category-specific threshold hints", () => {
    const { rerender } = render(
      <FilterBar {...defaultProps} category="POINTS" />
    );
    expect(screen.getByText(/suggested: 15-30/i)).toBeInTheDocument();

    rerender(<FilterBar {...defaultProps} category="ASSISTS" />);
    expect(screen.getByText(/suggested: 5-15/i)).toBeInTheDocument();

    rerender(<FilterBar {...defaultProps} category="REBOUNDS" />);
    expect(screen.getByText(/suggested: 5-20/i)).toBeInTheDocument();
  });

  it("validates threshold input", async () => {
    render(<FilterBar {...defaultProps} />);
    const input = screen.getByLabelText(/threshold/i);

    // Test negative value
    fireEvent.change(input, { target: { value: "-5" } });
    await waitFor(() => {
      expect(defaultProps.onThresholdChange).not.toHaveBeenCalled();
    });

    // Test too high value
    fireEvent.change(input, { target: { value: "101" } });
    expect(defaultProps.onThresholdChange).not.toHaveBeenCalled();
  });

  it("handles mobile layout", () => {
    // Mock mobile viewport
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(max-width: 640px)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    render(<FilterBar {...defaultProps} />);

    // Check if filters are stacked vertically
    const filterContainer = screen.getByTestId("filter-container");
    expect(filterContainer).toHaveClass("sm:flex-col");
  });
});
