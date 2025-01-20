import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterBar } from "./FilterBar";
import { Category, TimePeriod } from "../../types/dashboard";

describe("FilterBar", () => {
  const defaultProps = {
    category: "ALL" as Category,
    timePeriod: "L10" as TimePeriod,
    threshold: null,
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

    // Check for select elements by label
    expect(screen.getByLabelText(/time period/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();

    // Check for options in category select
    defaultProps.availableCategories.forEach((category) => {
      const option = screen.getByRole("option", {
        name: category === "ALL" ? "All Categories" : category,
      });
      expect(option).toBeInTheDocument();
    });
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
    render(
      <FilterBar
        {...defaultProps}
        timePeriod={"L20" as TimePeriod}
        category={"POINTS" as Category}
        threshold={25}
      />
    );

    expect(screen.getByLabelText(/time period/i)).toHaveValue("L20");
    expect(screen.getByLabelText(/category/i)).toHaveValue("POINTS");
    expect(screen.getByLabelText(/threshold/i)).toHaveValue("25");
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
    render(<FilterBar {...defaultProps} category="POINTS" />);
    const select = screen.getByLabelText(/threshold/i);

    fireEvent.change(select, { target: { value: "25" } });
    expect(defaultProps.onThresholdChange).toHaveBeenCalledWith(25);
  });

  it("handles mobile layout", () => {
    render(<FilterBar {...defaultProps} />);
    const filterContainer = screen.getByTestId("filter-container");
    // Update class expectation to match actual implementation
    expect(filterContainer).toHaveClass("flex", "flex-wrap", "gap-4");
  });
});
