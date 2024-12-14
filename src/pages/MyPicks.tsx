import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { picksService } from "../services/picksService";
import PicksList from "../components/picks/PicksList";
import ParlayList from "../components/picks/ParlayList";
import { isToday, isThisWeek, isThisMonth } from "date-fns";
import { UserPickDTO, Parlay } from "../types/picks";

export default function MyPicks() {
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

  const thisWeeksSingles = singles.filter((pick) =>
    isThisWeek(new Date(pick.createdAt))
  );
  const thisWeeksParlays = parlays.filter((parlay) =>
    isThisWeek(new Date(parlay.createdAt))
  );

  const thisMonthsSingles = singles.filter((pick) =>
    isThisMonth(new Date(pick.createdAt))
  );
  const thisMonthsParlays = parlays.filter((parlay) =>
    isThisMonth(new Date(parlay.createdAt))
  );

  // Calculate success rates
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          My Picks
        </h1>

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
                  <PicksList picks={todaysSingles} />
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
                  <ParlayList parlays={todaysParlays} />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No parlays for today
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Time Period Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Yesterday */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Yesterday</h3>
            <div className="space-y-1">
              <p className="text-gray-600 dark:text-gray-400">
                Singles: {singles.filter((pick) => pick.result).length}/
                {singles.length}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Parlays: {parlays.filter((parlay) => parlay.result).length}/
                {parlays.length}
              </p>
              <p className="text-lg font-bold text-green-600">
                {calculateSuccess(singles, parlays)}% Success
              </p>
            </div>
          </div>

          {/* This Week */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">This Week</h3>
            <div className="space-y-1">
              <p className="text-gray-600 dark:text-gray-400">
                Singles: {thisWeeksSingles.filter((pick) => pick.result).length}
                /{thisWeeksSingles.length}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Parlays:{" "}
                {thisWeeksParlays.filter((parlay) => parlay.result).length}/
                {thisWeeksParlays.length}
              </p>
              <p className="text-lg font-bold text-green-600">
                {calculateSuccess(thisWeeksSingles, thisWeeksParlays)}% Success
              </p>
            </div>
          </div>

          {/* This Month */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">This Month</h3>
            <div className="space-y-1">
              <p className="text-gray-600 dark:text-gray-400">
                Singles:{" "}
                {thisMonthsSingles.filter((pick) => pick.result).length}/
                {thisMonthsSingles.length}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Parlays:{" "}
                {thisMonthsParlays.filter((parlay) => parlay.result).length}/
                {thisMonthsParlays.length}
              </p>
              <p className="text-lg font-bold text-green-600">
                {calculateSuccess(thisMonthsSingles, thisMonthsParlays)}%
                Success
              </p>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Performance Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Overall Success
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {calculateSuccess(thisMonthsSingles, thisMonthsParlays)}%
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Picks
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {thisMonthsSingles.length + thisMonthsParlays.length}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["POINTS", "ASSISTS", "REBOUNDS"].map((category) => (
              <div
                key={category}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category} Success
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {calculateSuccess(
                    thisMonthsSingles.filter(
                      (pick) => pick.category === category
                    ),
                    thisMonthsParlays.filter((parlay) =>
                      parlay.picks.some((pick) => pick.category === category)
                    )
                  )}
                  %
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
