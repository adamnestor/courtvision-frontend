import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { AuthForm } from "./AuthForm";

describe("AuthForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  const renderAuthForm = (props = {}) => {
    return render(
      <BrowserRouter>
        <AuthForm
          type="login"
          onSubmit={mockOnSubmit}
          isLoading={false}
          {...props}
        />
      </BrowserRouter>
    );
  };

  // Core functionality tests
  it("submits form with valid credentials", async () => {
    renderAuthForm();

    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "password123");
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("prevents submission with invalid email", async () => {
    renderAuthForm();

    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, "invalid-email");
    await userEvent.type(screen.getByLabelText(/password/i), "password123");

    // HTML5 validation should prevent submission
    expect(emailInput).toBeInvalid();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows loading state", () => {
    renderAuthForm({ isLoading: true });

    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/loading/i);
  });

  it("switches between login and register modes", () => {
    const { rerender } = renderAuthForm();

    // Login mode shows register link
    expect(screen.getByRole("button")).toHaveTextContent(/sign in/i);
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();

    // Register mode shows login link
    rerender(
      <BrowserRouter>
        <AuthForm type="register" onSubmit={mockOnSubmit} isLoading={false} />
      </BrowserRouter>
    );

    expect(screen.getByRole("button")).toHaveTextContent(/sign up/i);
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
