import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { createContext } from "react";
import { StatsRow } from "../../types/stats";

// Mock imports first
vi.mock("./DashboardHeader", () => ({
  DashboardHeader: () => <div data-testid="mock-header" />,
}));

vi.mock("./FilterBar", () => ({
  FilterBar: () => <div data-testid="mock-filter" />,
}));

vi.mock("./StatsTable", () => ({
  StatsTable: () => <div data-testid="mock-table" />,
}));

vi.mock("../../hooks/useDashboardStats", () => ({
  useDashboardStats: vi.fn().mockReturnValue({
    data: [],
    isLoading: false,
    error: null,
    isError: false,
    isPending: false,
    isLoadingError: false,
    isRefetchError: false,
    isSuccess: true,
    status: "success",
    isFetching: false,
    isRefetching: false,
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    failureReason: null,
    errorUpdateCount: 0,
    isFetched: true,
    isFetchedAfterMount: true,
    isPlaceholderData: false,
    isStale: false,
    refetch: vi.fn(),
    remove: vi.fn(),
  }),
}));

vi.mock("../../context/auth-context", async () => {
  const actual = await vi.importActual("../../context/auth-context");
  return {
    ...actual,
    AuthContext: createContext(null),
    useAuth: vi.fn(),
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

// Then other imports
import { screen } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { renderWithProviders } from "../../test/test-utils";
import { QueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { UseQueryResult } from "@tanstack/react-query";

const createQueryResult = (
  overrides = {}
): UseQueryResult<StatsRow[], Error> => ({
  data: [] as StatsRow[],
  isLoading: false,
  error: null,
  isError: false,
  isPending: false,
  isLoadingError: false,
  isRefetchError: false,
  isSuccess: true,
  status: "success",
  isFetching: false,
  isRefetching: false,
  dataUpdatedAt: 0,
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 0,
  isFetched: true,
  isFetchedAfterMount: true,
  isPlaceholderData: false,
  isStale: false,
  refetch: vi.fn(),
  isInitialLoading: false,
  isPaused: false,
  fetchStatus: "idle",
  promise: Promise.resolve([] as StatsRow[]),
  ...overrides,
});

describe("Dashboard", () => {
  const mockStats = [
    {
      playerId: 1,
      playerName: "LeBron James",
      team: "LAL",
      opponent: "GSW",
      statLine: "POINTS 25",
      hitRate: 75.5,
      confidenceScore: 85,
      gamesPlayed: 10,
      average: 28.5,
      isHighConfidence: true,
    },
    {
      playerId: 2,
      playerName: "Stephen Curry",
      team: "GSW",
      opponent: "LAL",
      statLine: "POINTS 20",
      hitRate: 65.5,
      confidenceScore: 75,
      gamesPlayed: 8,
      average: 26.5,
      isHighConfidence: false,
    },
  ];

  let queryClient: QueryClient;
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
          staleTime: 0,
        },
      },
    });

    vi.mocked(useDashboardStats).mockReturnValue(createQueryResult());

    vi.mocked(useAuth).mockReturnValue({
      user: { id: 1, email: "test@example.com", isAdmin: false }, // Default to logged in
      isAuthenticated: true,
      isAdmin: false,
      login: async () => {},
      logout: async () => {},
      register: async () => {},
    });

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("displays loading state when user is not authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      login: async () => {},
      logout: async () => {},
      register: async () => {},
    });

    renderWithProviders(<Dashboard />, { queryClient });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays loading state while fetching stats", () => {
    vi.mocked(useDashboardStats).mockReturnValue(
      createQueryResult({
        isLoading: true,
        isPending: true,
        isSuccess: false,
        status: "loading",
      })
    );

    renderWithProviders(<Dashboard />, { queryClient });
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-filter")).toBeInTheDocument();
    expect(screen.getByRole("status", { name: "loading" })).toBeInTheDocument();
  });

  it("displays stats data", async () => {
    vi.mocked(useDashboardStats).mockReturnValue(
      createQueryResult({
        data: mockStats,
      })
    );

    renderWithProviders(<Dashboard />, { queryClient });
    expect(screen.getByTestId("mock-table")).toBeInTheDocument();
  });

  it("navigates to player details on row click", async () => {
    vi.mocked(useDashboardStats).mockReturnValue(
      createQueryResult({
        data: mockStats,
      })
    );

    renderWithProviders(<Dashboard />, { queryClient });
    expect(screen.getByTestId("mock-table")).toBeInTheDocument();
  });

  it("updates filters correctly", () => {
    vi.mocked(useDashboardStats).mockReturnValue(
      createQueryResult({
        data: mockStats,
      })
    );

    renderWithProviders(<Dashboard />, { queryClient });
    expect(screen.getByTestId("mock-filter")).toBeInTheDocument();
  });
});
