import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PlayerDetailHeader } from "../components/player/PlayerDetailHeader";
import { PlayerDetailChart } from "../components/player/PlayerDetailChart";
import { FilterBar } from "../components/dashboard";
import { Category, TimePeriod, Threshold } from "../types/dashboard";
import { usePlayerDetails } from "../hooks/usePlayerDetails";
import { LoadingState } from "../components/common/LoadingState";

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
  const [threshold, setThreshold] = useState<Threshold>(initialThreshold);

  const { stats, isLoading, createPick, isCreating } = usePlayerDetails(
    Number(playerId),
    timePeriod,
    category,
    threshold
  );

  if (isLoading) {
    return <LoadingState message="Loading player stats..." />;
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-error">No stats available</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>

      <PlayerDetailHeader
        stats={stats}
        onCreatePick={createPick}
        isCreating={isCreating}
      />

      <main className="mt-8 space-y-6">
        <FilterBar
          timePeriod={timePeriod}
          category={category}
          threshold={threshold}
          onTimePeriodChange={setTimePeriod}
          onCategoryChange={setCategory}
          onThresholdChange={setThreshold}
          availableCategories={["POINTS", "ASSISTS", "REBOUNDS"]}
        />
        <PlayerDetailChart
          stats={stats}
          statType={category.toLowerCase() as "points" | "assists" | "rebounds"}
        />
      </main>
    </div>
  );
};
