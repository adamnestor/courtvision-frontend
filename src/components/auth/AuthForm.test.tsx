import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthForm } from "./AuthForm";
import { vi } from "vitest";

describe("AuthForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("submits form with email and password", async () => {
    render(<AuthForm type="login" onSubmit={mockOnSubmit} isLoading={false} />);

    // Fill in form
    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "password123");

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Check if onSubmit was called with correct data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("shows loading state", () => {
    render(<AuthForm type="login" onSubmit={mockOnSubmit} isLoading={true} />);

    expect(screen.getByRole("button")).toHaveTextContent("Loading...");
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
