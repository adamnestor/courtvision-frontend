import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { DashboardHeader } from "./DashboardHeader";
import { FilterBar } from "./FilterBar";
import { StatsTable } from "./StatsTable";
import {
  Category,
  TimePeriod,
  Threshold,
  StatsRow,
} from "../../types/dashboard";
import api from "../../services/api";

export const Dashboard = () => {
  const { user } = useAuth();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("L10");
  const [category, setCategory] = useState<Category>("ALL");
  const [threshold, setThreshold] = useState<Threshold | null>(null);
  const [stats, setStats] = useState<StatsRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/dashboard/stats", {
          params: {
            timePeriod,
            category,
            threshold,
          },
        });
        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [timePeriod, category, threshold]);

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    if (newCategory === "POINTS") {
      setThreshold(15);
    } else if (newCategory === "ASSISTS") {
      setThreshold(4);
    } else if (newCategory === "REBOUNDS") {
      setThreshold(8);
    } else {
      setThreshold(null);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader stats={stats} />
        <main className="mt-8 space-y-6">
          <FilterBar
            timePeriod={timePeriod}
            category={category}
            threshold={threshold}
            onTimePeriodChange={setTimePeriod}
            onCategoryChange={handleCategoryChange}
            onThresholdChange={setThreshold}
          />
          <StatsTable
            timePeriod={timePeriod}
            category={category}
            threshold={threshold}
          />
        </main>
      </div>
    </div>
  );
};
