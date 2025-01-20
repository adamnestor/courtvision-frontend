import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AppProvider } from "./context/AppProvider";
import { AdminRoute } from "./components/shared/AdminRoute";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Dashboard } from "./components/dashboard/Dashboard";
import { AdminDashboard } from "./components/dashboard/AdminDashboard";
import { PlayerDetail } from "./pages/PlayerDetail";
import { MyPicks } from "./pages/MyPicks";
import { useAuthPersistence } from "./hooks/useAuthPersistence";
import { useTheme } from "./hooks/useTheme";
import { useApiErrorHandler } from "./hooks/useApiErrorHandler";
import { useLoadingState } from "./hooks/useLoadingState";
import { useUserPreferences } from "./hooks/useUserPreferences";
import { LoadingOverlay } from "./components/shared/LoadingOverlay";
import { NotificationList } from "./components/notifications/NotificationList";
import { useAuthStore } from "./hooks/useAuthStore";
import { useAppSettings } from "./hooks/useAppSettings";
import { ErrorBoundary } from "./components/error/ErrorBoundary";
import { useSessionTimeout } from "./hooks/useSessionTimeout";

// Create an AppRoutes component to use router-dependent hooks
function AppRoutes() {
  const { isLoading, loadingMessage } = useLoadingState();
  const { compactView } = useUserPreferences();
  const { isLoading: authLoading, isAuthenticated } = useAuthStore();
  const { performance } = useAppSettings();
  const { theme } = useTheme();
  const location = useLocation();

  useAuthPersistence();
  useApiErrorHandler();
  useSessionTimeout();

  const layoutClass = [
    compactView ? "compact-layout" : "default-layout",
    performance.reducedMotion ? "reduce-motion" : "",
    performance.lowBandwidth ? "low-bandwidth" : "",
  ].join(" ");

  if (authLoading) {
    return <LoadingOverlay message="Initializing app..." />;
  }

  const isAuthRoute = ["/login", "/register"].includes(location.pathname);
  if (!isAuthenticated && !isAuthRoute) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`${layoutClass} ${theme}`}>
      {isLoading && <LoadingOverlay message={loadingMessage} />}
      <NotificationList />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/player/:playerId" element={<PlayerDetail />} />
          <Route path="/picks" element={<MyPicks />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

// Main App component with providers
function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
