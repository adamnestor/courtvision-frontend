import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, Activity, TrendingUp } from "lucide-react";
import { picksService } from "../services/picksService";
import PicksList from "../components/picks/PicksList";
import ParlayList from "../components/picks/ParlayList";
import { isToday, isYesterday } from "date-fns";
import { UserPickDTO, Parlay } from "../types/picks";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

const calculateCategorySuccess = (
  picks: UserPickDTO[],
  parlays: Parlay[],
  category: string
) => {
  const categoryPicks = picks
    .filter(
      (pick) => !isToday(new Date(pick.createdAt)) && pick.result !== undefined
    )
    .filter((pick) => pick.category === category);

  const parlayPicks = parlays
    .filter(
      (parlay) =>
        !isToday(new Date(parlay.createdAt)) && parlay.result !== undefined
    )
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
  const completedSingles = singles.filter(
    (pick) => !isToday(new Date(pick.createdAt)) && pick.result !== undefined
  );
  const completedParlays = parlays.filter(
    (parlay) =>
      !isToday(new Date(parlay.createdAt)) && parlay.result !== undefined
  );

  const singlesSuccess = completedSingles.filter((pick) => pick.result).length;
  const parlaysSuccess = completedParlays.filter(
    (parlay) => parlay.result
  ).length;
  const total = completedSingles.length + completedParlays.length;
  const successes = singlesSuccess + parlaysSuccess;

  return total > 0 ? ((successes / total) * 100).toFixed(1) : "0";
};

const calculateRecentForm = (
  singles: UserPickDTO[],
  parlays: Parlay[]
): string => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentSingles = singles.filter(
    (pick) =>
      new Date(pick.createdAt) >= sevenDaysAgo &&
      pick.result !== undefined &&
      !isToday(new Date(pick.createdAt))
  );

  const recentParlays = parlays.filter(
    (parlay) =>
      new Date(parlay.createdAt) >= sevenDaysAgo &&
      parlay.result !== undefined &&
      !isToday(new Date(parlay.createdAt))
  );

  const totalRecent = recentSingles.length + recentParlays.length;
  if (totalRecent === 0) return "0.0";

  const successfulRecent =
    recentSingles.filter((pick) => pick.result).length +
    recentParlays.filter((parlay) => parlay.result).length;

  return ((successfulRecent / totalRecent) * 100).toFixed(1);
};

export default function MyPicks() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<{
    singles: UserPickDTO[];
    parlays: Parlay[];
  }>({
    queryKey: ["picks"],
    queryFn: picksService.getUserPicks,
  });

  const processYesterdayResults = async () => {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const formattedDate = yesterday.toISOString().split("T")[0];

      const response = await api.post(
        `/picks/results/process/${formattedDate}`
      );

      if (response.data.success) {
        toast.success("Results processed successfully");
        queryClient.invalidateQueries({ queryKey: ["picks"] });
      } else {
        throw new Error(response.data.message || "Failed to process results");
      }
    } catch (error) {
      toast.error("Failed to process results");
      console.error("Error processing results:", error);
    }
  };

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

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Picks
          </h1>
          <button
            onClick={processYesterdayResults}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Process Yesterday's Results
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-6 gap-4 mb-8">
          {/* Primary Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center gap-3">
              <Activity className="text-green-500" size={24} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Overall Success
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {calculateSuccess(singles, parlays)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-blue-500" size={24} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Picks
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {singles.length + parlays.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center gap-3">
              <Activity className="text-yellow-500" size={24} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Recent Form
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {calculateRecentForm(singles, parlays)}%
                </p>
              </div>
            </div>
          </div>

          {/* Category Stats */}
          {[
            {
              name: "POINTS",
              icon: (props) => (
                <TrendingUp {...props} className="text-purple-500" />
              ),
            },
            {
              name: "ASSISTS",
              icon: (props) => (
                <Activity {...props} className="text-indigo-500" />
              ),
            },
            {
              name: "REBOUNDS",
              icon: (props) => (
                <TrendingUp {...props} className="text-pink-500" />
              ),
            },
          ].map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
            >
              <div className="flex items-center gap-3">
                <Icon size={24} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {calculateCategorySuccess(singles, parlays, name)}%
                  </p>
                </div>
              </div>
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

        {/* Yesterday's Results Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Yesterday's Results
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Yesterday's Singles */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Singles ({yesterdaySingles.length})
              </h3>
              <div className="h-64 overflow-y-auto">
                {yesterdaySingles.length > 0 ? (
                  <PicksList picks={yesterdaySingles} isToday={false} />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No single picks from yesterday
                  </p>
                )}
              </div>
            </div>

            {/* Yesterday's Parlays */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Parlays ({yesterdayParlays.length})
              </h3>
              <div className="h-64 overflow-y-auto">
                {yesterdayParlays.length > 0 ? (
                  <ParlayList parlays={yesterdayParlays} isToday={false} />
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
  );
}
