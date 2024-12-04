import { useState, useEffect } from "react";
import api from "../../../services/api";
import { StatsRow } from "../../../types/dashboard";
import { StatsTableRow } from "./StatsTableRow";
import { StatsTableHeader } from "./StatsTableHeader";
import { Category, TimePeriod, Threshold } from "../../../types/dashboard";
import { ApiResponse } from "../../../types/api";
import { authService } from "../../../services/authService";

interface StatsTableProps {
  timePeriod: TimePeriod;
  category: Category;
  threshold: Threshold | null;
}

export const StatsTable = ({
  timePeriod,
  category,
  threshold,
}: StatsTableProps) => {
  const [stats, setStats] = useState<StatsRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Current user:", authService.getCurrentUser());

    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<ApiResponse<StatsRow[]>>(
          "/dashboard/stats",
          {
            params: {
              timePeriod,
              category,
              threshold,
            },
          }
        );
        setStats(response.data.data);
      } catch (err) {
        setError("Failed to fetch stats");
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [timePeriod, category, threshold]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <div className="text-center text-gray-600 dark:text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <StatsTableHeader />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {stats.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No stats available for the selected filters
          </div>
        ) : (
          stats.map((stat) => (
            <StatsTableRow
              key={`${stat.playerId}-${stat.statLine}`}
              stat={stat}
            />
          ))
        )}
      </div>
    </div>
  );
};
