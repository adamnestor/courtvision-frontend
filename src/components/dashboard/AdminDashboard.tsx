import { useAuthStore } from "../../hooks/useAuthStore";
import { useAppSettings } from "../../hooks/useAppSettings";
import { useRealtimeUpdates } from "../../hooks/useRealtimeUpdates";
import { useDashboardLayout } from "../../hooks/useDashboardLayout";
import { useAdminStats } from "../../hooks/useAdminStats";
import { LoadingState } from "../common/LoadingState";
import { Activity, Users, Settings, BarChart } from "lucide-react";
import { ConnectionStatus } from "./ConnectionStatus";
import { RefreshControl } from "./RefreshControl";

export const AdminDashboard = () => {
  const { user, logout } = useAuthStore();
  const { refreshInterval, autoRefresh } = useAppSettings();
  const { connected } = useRealtimeUpdates();
  const { showSidebar, tableCompact } = useDashboardLayout();
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return <LoadingState message="Loading admin dashboard..." />;
  }

  return (
    <div
      className={`admin-dashboard ${!showSidebar ? "sidebar-collapsed" : ""}`}
    >
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <ConnectionStatus connected={connected} />
          <RefreshControl
            interval={refreshInterval}
            autoRefresh={autoRefresh}
          />
        </div>
      </header>

      <main className={`stats-grid ${tableCompact ? "compact" : ""}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Admin: {user?.email}
              </p>
            </div>
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-primary" size={24} />
                <h2 className="text-xl font-semibold text-card-foreground">
                  User Management
                </h2>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Total Users: {stats?.totalUsers || 0}
                </p>
                <p className="text-muted-foreground">
                  Active Users: {stats?.activeUsers || 0}
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="text-primary" size={24} />
                <h2 className="text-xl font-semibold text-card-foreground">
                  System Status
                </h2>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  API Status: {stats?.systemHealth.apiStatus || "Unknown"}
                </p>
                <p className="text-muted-foreground">
                  Last Check: {stats?.systemHealth.lastCheck || "Never"}
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="text-primary" size={24} />
                <h2 className="text-xl font-semibold text-card-foreground">
                  System Configuration
                </h2>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Average Response Time:{" "}
                  {stats?.performanceMetrics.averageResponseTime || 0}ms
                </p>
                <p className="text-muted-foreground">
                  Uptime: {stats?.performanceMetrics.uptime || 0}%
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart className="text-primary" size={24} />
                <h2 className="text-xl font-semibold text-card-foreground">
                  Analytics
                </h2>
              </div>
              <p className="text-muted-foreground">
                System Performance Overview
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
