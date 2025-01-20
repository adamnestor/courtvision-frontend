import { render } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { AllTheProviders } from "./test-providers";
import { ReactElement } from "react";

export function renderWithProviders(
  ui: ReactElement,
  { queryClient }: { queryClient: QueryClient }
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders queryClient={queryClient}>{children}</AllTheProviders>
    ),
  });
}
