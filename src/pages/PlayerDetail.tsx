import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PlayerDetailHeader } from "../components/player/PlayerDetailHeader";
import { PlayerDetailChart } from "../components/player/PlayerDetailChart";
import { FilterBar } from "../components/dashboard";
import { usePlayerStats } from "../hooks/usePlayerStats";
import { Category, TimePeriod, Threshold } from "../types/dashboard";

export const PlayerDetail = () => {
  const { playerId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { initialCategory = "POINTS", initialThreshold = 20 } =
    (location.state as {
      initialCategory: Category;
      initialThreshold: number;
    }) || {};

  const getDefaultThreshold = (category: Category): number => {
    switch (category) {
      case "POINTS":
        return 15;
      case "ASSISTS":
        return 4;
      case "REBOUNDS":
        return 8;
      default:
        return 15;
    }
  };

  const [timePeriod, setTimePeriod] = useState<TimePeriod>("L10");
  const [category, setCategory] = useState<Category>(initialCategory);
  const [threshold, setThreshold] = useState<Threshold | null>(
    initialThreshold
  );

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setThreshold(getDefaultThreshold(newCategory));
  };

  const handleThresholdChange = (value: Threshold | null) => {
    setThreshold(value);
  };

  const {
    data: stats,
    isLoading,
    error,
  } = usePlayerStats(
    Number(playerId),
    timePeriod,
    category,
    threshold ?? getDefaultThreshold(category) // Use category-specific default
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">
          {error instanceof Error
            ? error.message
            : "Failed to load player stats"}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">No stats available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <PlayerDetailHeader stats={stats} />
        <main className="mt-8 space-y-6">
          <FilterBar
            timePeriod={timePeriod}
            category={category}
            threshold={threshold}
            onTimePeriodChange={setTimePeriod}
            onCategoryChange={handleCategoryChange}
            onThresholdChange={handleThresholdChange}
            availableCategories={["POINTS", "ASSISTS", "REBOUNDS"]}
          />
          <PlayerDetailChart
            stats={stats}
            statType={
              category.toLowerCase() as "points" | "assists" | "rebounds"
            }
          />
        </main>
      </div>
    </div>
  );
};
