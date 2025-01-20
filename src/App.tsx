import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { useThemePersistence } from "./hooks/useThemePersistence";
import { useApiErrorHandler } from "./hooks/useApiErrorHandler";
import { useLoadingState } from "./hooks/useLoadingState";
import { useUserPreferences } from "./hooks/useUserPreferences";
import { LoadingOverlay } from "./components/shared/LoadingOverlay";
import { NotificationList } from "./components/notifications/NotificationList";
import { useAuthStore } from "./hooks/useAuthStore";
import { useAppSettings } from "./hooks/useAppSettings";
import { ErrorBoundary } from "./components/error/ErrorBoundary";
import { useSessionTimeout } from "./hooks/useSessionTimeout";

function App() {
  useAuthPersistence();
  useThemePersistence();
  useApiErrorHandler();
  useSessionTimeout();
  const { isLoading, loadingMessage } = useLoadingState();
  const { compactView } = useUserPreferences();
  const { isLoading: authLoading } = useAuthStore();
  const { performance } = useAppSettings();

  // Apply performance settings
  const layoutClass = [
    compactView ? "compact-layout" : "default-layout",
    performance.reducedMotion ? "reduce-motion" : "",
    performance.lowBandwidth ? "low-bandwidth" : "",
  ].join(" ");

  if (authLoading) {
    return <LoadingOverlay message="Initializing app..." />;
  }

  return (
    <ErrorBoundary>
      <AppProvider>
        <div className={layoutClass}>
          <BrowserRouter>
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
          </BrowserRouter>
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
