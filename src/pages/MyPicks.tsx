import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import { picksService } from "../services/picksService";
import PicksList from "../components/picks/PicksList";
import ParlayList from "../components/picks/ParlayList";
import { isToday, isYesterday } from "date-fns";
import { UserPickDTO, Parlay } from "../types/picks";

const calculateCategorySuccess = (
  picks: UserPickDTO[],
  parlays: Parlay[],
  category: string
) => {
  const categoryPicks = picks.filter((pick) => pick.category === category);
  const parlayPicks = parlays
    .flatMap((parlay) => parlay.picks)
    .filter((pick) => pick.category === category);

  const allPicks = [...categoryPicks, ...parlayPicks];
  if (allPicks.length === 0) return 0;

  const successfulPicks = allPicks.filter((pick) => pick.result).length;
  return ((successfulPicks / allPicks.length) * 100).toFixed(1);
};

const calculateSuccess = (
  singles: UserPickDTO[],
  parlays: Parlay[]
): string => {
  const singlesSuccess = singles.filter((pick) => pick.result).length;
  const parlaysSuccess = parlays.filter((parlay) => parlay.result).length;
  const total = singles.length + parlays.length;
  const successes = singlesSuccess + parlaysSuccess;
  return total > 0 ? ((successes / total) * 100).toFixed(1) : "0";
};

export default function MyPicks() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery<{
    singles: UserPickDTO[];
    parlays: Parlay[];
  }>({
    queryKey: ["picks"],
    queryFn: picksService.getUserPicks,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-red-500">Failed to load picks</div>
      </div>
    );
  }

  const { singles = [], parlays = [] } = data || { singles: [], parlays: [] };

  // Filter picks by time period
  const todaysSingles = singles.filter((pick) =>
    isToday(new Date(pick.createdAt))
  );
  const todaysParlays = parlays.filter((parlay) =>
    isToday(new Date(parlay.createdAt))
  );
  const yesterdaySingles = singles.filter((pick) =>
    isYesterday(new Date(pick.createdAt))
  );
  const yesterdayParlays = parlays.filter((parlay) =>
    isYesterday(new Date(parlay.createdAt))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          My Picks
        </h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {/* Time Period Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Yesterday</span>
                <span className="font-semibold">
                  {calculateSuccess(
                    [...todaysSingles, ...yesterdaySingles],
                    [...todaysParlays, ...yesterdayParlays]
                  )}
                  %
                </span>
              </div>
              <div className="text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>
                    Singles: {todaysSingles.length + yesterdaySingles.length}
                  </span>
                  <span>
                    Parlays: {todaysParlays.length + yesterdayParlays.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Success Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-sm text-gray-500">Overall</h3>
            <p className="text-2xl font-bold">
              {calculateSuccess(singles, parlays)}%
            </p>
            <p className="text-xs text-gray-500">
              Total Picks: {singles.length + parlays.length}
            </p>
          </div>

          {/* Category Cards */}
          {["POINTS", "ASSISTS", "REBOUNDS"].map((category) => (
            <div
              key={category}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
            >
              <h3 className="text-sm text-gray-500">{category}</h3>
              <p className="text-2xl font-bold">
                {calculateCategorySuccess(singles, parlays, category)}%
              </p>
              <p className="text-xs text-gray-500">
                {singles.filter((pick) => pick.category === category).length +
                  parlays
                    .flatMap((p) => p.picks)
                    .filter((pick) => pick.category === category).length}{" "}
                picks
              </p>
            </div>
          ))}
        </div>

        {/* Today's Picks Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Today's Picks
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Singles */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Singles ({todaysSingles.length})
              </h3>
              <div className="h-64 overflow-y-auto">
                {todaysSingles.length > 0 ? (
                  <PicksList picks={todaysSingles} isToday={true} />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No single picks for today
                  </p>
                )}
              </div>
            </div>

            {/* Parlays */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Parlays ({todaysParlays.length})
              </h3>
              <div className="h-64 overflow-y-auto">
                {todaysParlays.length > 0 ? (
                  <ParlayList parlays={todaysParlays} isToday={true} />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No parlays for today
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
