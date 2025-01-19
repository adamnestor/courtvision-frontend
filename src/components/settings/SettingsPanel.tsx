import { useAppSettings } from "../../hooks/useAppSettings";
import { useDashboardLayout } from "../../hooks/useDashboardLayout";

export const SettingsPanel = () => {
  const {
    refreshInterval,
    autoRefresh,
    notifications,
    performance,
    setRefreshInterval,
    toggleAutoRefresh,
    toggleNotifications,
    togglePerformance,
  } = useAppSettings();

  const { tableCompact, toggleTableCompact } = useDashboardLayout();

  return (
    <div className="settings-panel p-6 space-y-6">
      <section>
        <h3 className="text-lg font-semibold mb-4">Display Settings</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={tableCompact}
              onChange={toggleTableCompact}
            />
            Compact Tables
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={performance.reducedMotion}
              onChange={() => togglePerformance("reducedMotion")}
            />
            Reduce Motion
          </label>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <div className="space-y-2">
          {Object.entries(notifications).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value}
                onChange={() =>
                  toggleNotifications(key as keyof typeof notifications)
                }
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">Auto-Refresh</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={toggleAutoRefresh}
            />
            Enable Auto-Refresh
          </label>
          <div className="flex items-center gap-2">
            <span>Interval:</span>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              disabled={!autoRefresh}
            >
              <option value={15000}>15s</option>
              <option value={30000}>30s</option>
              <option value={60000}>1m</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};
