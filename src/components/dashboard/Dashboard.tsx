import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { DashboardHeader } from "./DashboardHeader";
import { FilterBar } from "./FilterBar";
import { StatsTable } from "./StatsTable";
import { Category, TimePeriod, Threshold } from "../../types/dashboard";
import { useDashboardStats } from "../../hooks/useDashboardStats";

export const Dashboard = () => {
  const { user } = useAuth();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("L10");
  const [category, setCategory] = useState<Category>("ALL");
  const [threshold, setThreshold] = useState<Threshold | null>(null);

  const { data: stats, isLoading } = useDashboardStats({
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

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader stats={stats || []} />
      <FilterBar
        timePeriod={timePeriod}
        category={category}
        threshold={threshold}
        onTimePeriodChange={setTimePeriod}
        onCategoryChange={handleCategoryChange}
      />
      <StatsTable stats={stats || []} isLoading={isLoading} />
    </div>
  );
};
