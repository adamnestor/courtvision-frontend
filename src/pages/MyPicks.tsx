import { useQuery } from "@tanstack/react-query";
import { getUserPicks } from "../services/api";
import PicksList from "../components/picks/PicksList";
import ParlayList from "../components/picks/ParlayList";
import { Loader2 } from "lucide-react";

export const MyPicks = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["picks"],
    queryFn: getUserPicks,
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

  const allPicks = data?.data || [];

  const todaysSingles = allPicks.filter(
    (pick) => !pick.isParlay && isToday(new Date(pick.createdAt))
  );

  const todaysParlays = allPicks.filter(
    (pick) => pick.isParlay && isToday(new Date(pick.createdAt))
  );

  const yesterdaySingles = allPicks.filter(
    (pick) => !pick.isParlay && isYesterday(new Date(pick.createdAt))
  );

  const yesterdayParlays = allPicks.filter(
    (pick) => pick.isParlay && isYesterday(new Date(pick.createdAt))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          My Picks
        </h1>

        <div className="space-y-6">
          {/* Today's Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Today's Picks
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Singles
                  </h3>
                  {todaysSingles.length > 0 ? (
                    <PicksList picks={todaysSingles} />
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No single picks for today
                    </p>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Parlays
                  </h3>
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

          {/* Yesterday's Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Yesterday's Results
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Singles ({yesterdaySingles.filter((p) => p.result).length}/
                    {yesterdaySingles.length})
                  </h3>
                  {yesterdaySingles.length > 0 ? (
                    <PicksList picks={yesterdaySingles} />
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No single picks from yesterday
                    </p>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Parlays
                  </h3>
                  {yesterdayParlays.length > 0 ? (
                    <ParlayList parlays={yesterdayParlays} />
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No parlays from yesterday
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isYesterday(date: Date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}
