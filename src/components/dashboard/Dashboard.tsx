import { useState } from "react";
import { useAuth } from "../../context/auth-context";
import { DashboardHeader } from "./DashboardHeader";
import { FilterBar } from "./FilterBar";
import { StatsTable } from "./StatsTable";
import { Category, TimePeriod, Threshold } from "../../types/dashboard";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { useNavigate } from "react-router-dom";
import { Stats } from "../../types/stats";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const Dashboard = () => {
  const { user } = useAuth();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("L10");
  const [category, setCategory] = useState<Category>("ALL");
  const [threshold, setThreshold] = useState<Threshold | null>(null);
  const navigate = useNavigate();

  const {
    data: stats,
    isLoading,
    error,
  } = useDashboardStats({
    timePeriod,
    category,
    threshold,
  });

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setThreshold(
      newCategory === "POINTS"
        ? 15
        : newCategory === "ASSISTS"
        ? 4
        : newCategory === "REBOUNDS"
        ? 8
        : null
    );
  };

  const handleRowClick = (playerId: number) => {
    navigate(`/player/${playerId}`);
  };

  const calculateSummary = (
    stats: Stats.StatsRow[]
  ): Stats.DashboardSummary => ({
    availablePicks: stats.length,
    highConfidencePicks: stats.filter((s) => s.isHighConfidence).length,
    gamesCount: stats.reduce((max, s) => Math.max(max, s.gamesPlayed), 0),
    averageHitRate:
      stats.reduce((sum, s) => sum + s.hitRate, 0) / stats.length || 0,
  });

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader
        title="Dashboard"
        stats={calculateSummary(stats || [])}
      />
      <FilterBar
        timePeriod={timePeriod}
        category={category}
        threshold={threshold}
        onTimePeriodChange={setTimePeriod}
        onCategoryChange={handleCategoryChange}
        onThresholdChange={setThreshold}
        availableCategories={["ALL", "POINTS", "ASSISTS", "REBOUNDS"]}
      />
      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-center py-8 text-destructive">
          {error instanceof Error ? error.message : "Failed to load stats"}
        </div>
      ) : !stats?.length ? (
        <div className="text-center py-8 text-muted-foreground">
          No stats available
        </div>
      ) : (
        <StatsTable data={stats} onRowClick={handleRowClick} />
      )}
    </div>
  );
};
