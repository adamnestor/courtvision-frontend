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

  const [timePeriod, setTimePeriod] = useState<TimePeriod>("L10");
  const [category, setCategory] = useState<Category>(initialCategory);
  const [threshold, setThreshold] = useState<Threshold | null>(
    initialThreshold
  );

  const {
    data: stats,
    isLoading,
    error,
  } = usePlayerStats(Number(playerId), timePeriod, category, threshold ?? 15);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-cv-indigo/5 via-cv-purple/5 to-cv-pink/5 flex items-center justify-center">
        <div className="text-lg text-cv-purple">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-cv-indigo/5 via-cv-purple/5 to-cv-pink/5 flex items-center justify-center">
        <div className="text-lg text-cv-error-from">
          {error instanceof Error
            ? error.message
            : "Failed to load player stats"}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-cv-indigo/5 via-cv-purple/5 to-cv-pink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center space-x-2 text-cv-purple hover:text-cv-indigo transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="space-y-6">
          {/* Player Header with Stats */}
          <div className="bg-gradient-to-r from-cv-indigo via-cv-purple to-cv-pink rounded-lg shadow-lg">
            <PlayerDetailHeader stats={stats} />
          </div>

          {/* Filters */}
          <FilterBar
            timePeriod={timePeriod}
            category={category}
            threshold={threshold}
            onTimePeriodChange={setTimePeriod}
            onCategoryChange={(category) => setCategory(category)}
            onThresholdChange={(threshold) => setThreshold(threshold)}
            availableCategories={["POINTS", "ASSISTS", "REBOUNDS"]}
          />

          {/* Performance Chart */}
          <div className="glass-card rounded-lg p-6">
            <PlayerDetailChart
              stats={stats}
              statType={
                category.toLowerCase() as "points" | "assists" | "rebounds"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
