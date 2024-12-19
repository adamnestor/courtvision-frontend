import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { DashboardHeader } from "./DashboardHeader";
import { FilterBar } from "./FilterBar";
import { StatsTable } from "./StatsTable/StatsTable";
import { Category, TimePeriod, Threshold } from "../../types/dashboard";

export const Dashboard = () => {
  const { user } = useAuth();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("L10");
  const [category, setCategory] = useState<Category>("ALL");
  const [threshold, setThreshold] = useState<Threshold | null>(null);

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    // Set default threshold based on category
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <DashboardHeader />

        <main className="space-y-6">
          <FilterBar
            timePeriod={timePeriod}
            category={category}
            threshold={threshold}
            onTimePeriodChange={setTimePeriod}
            onCategoryChange={handleCategoryChange}
            onThresholdChange={setThreshold}
          />
          <div className="bg-gradient-to-r from-cv-indigo/5 via-cv-purple/5 to-cv-pink/5 rounded-lg p-1">
            <StatsTable
              timePeriod={timePeriod}
              category={category}
              threshold={threshold}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
