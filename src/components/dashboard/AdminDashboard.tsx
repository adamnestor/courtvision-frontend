import { useAuthStore } from "../../hooks/useAuthStore";
import { useAppSettings } from "../../hooks/useAppSettings";
import { useRealtimeUpdates } from "../../hooks/useRealtimeUpdates";
import { useDashboardLayout } from "../../hooks/useDashboardLayout";
import { useAdminStats } from "../../hooks/useAdminStats";
import { LoadingState } from "../common/LoadingState";
import { Activity, Users, Settings, BarChart } from "lucide-react";
import { ConnectionStatus } from "./ConnectionStatus";
import { RefreshControl } from "./RefreshControl";
import { StatCard } from "./StatCard";

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
            <StatCard title="User Management" Icon={Users}>
              <p className="text-muted-foreground">
                Total Users: {stats?.data?.totalUsers ?? 0}
              </p>
              <p className="text-muted-foreground">
                Active Users: {stats?.data?.activeUsers ?? 0}
              </p>
            </StatCard>

            <StatCard title="System Status" Icon={Activity}>
              <p className="text-muted-foreground">
                API Status: {stats?.data?.systemHealth.apiStatus ?? "Unknown"}
              </p>
              <p className="text-muted-foreground">
                Last Check: {stats?.data?.systemHealth.lastCheck ?? "Never"}
              </p>
            </StatCard>

            <StatCard title="System Configuration" Icon={Settings}>
              <p className="text-muted-foreground">
                Average Response Time:{" "}
                {stats?.data?.performanceMetrics.averageResponseTime ?? 0}ms
              </p>
              <p className="text-muted-foreground">
                Uptime: {stats?.data?.performanceMetrics.uptime ?? 0}%
              </p>
            </StatCard>

            <StatCard title="Analytics" Icon={BarChart}>
              <p className="text-muted-foreground">
                System Performance Overview
              </p>
            </StatCard>
          </div>
        </div>
      </main>
    </div>
  );
};
