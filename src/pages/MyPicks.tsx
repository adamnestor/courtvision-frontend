import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, Activity, TrendingUp } from "lucide-react";
import { picksService } from "../services/picksService";
import PicksList from "../components/picks/PicksList";
import ParlayList from "../components/picks/ParlayList";
import { isToday, isYesterday } from "date-fns";
import { UserPickDTO, Parlay } from "../types/picks";
import { toast } from "react-hot-toast";
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

  const total = completedSingles.length + completedParlays.length;
  const successes =
    completedSingles.filter((pick) => pick.result).length +
    completedParlays.filter((parlay) => parlay.result).length;

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

  const { data, isLoading, error } = useQuery({
    queryKey: ["picks"],
    queryFn: picksService.getUserPicks,
  });

  const { mutate: handleDeletePick, isPending: isDeletePickPending } =
    useMutation({
      mutationFn: picksService.deletePick,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["picks"] });
        toast.success("Pick deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete pick");
      },
    });

  const { mutate: handleDeleteParlay, isPending: isDeleteParlayPending } =
    useMutation({
      mutationFn: picksService.deleteParlay,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["picks"] });
        toast.success("Parlay deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete parlay");
      },
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
      <div className="min-h-screen bg-gradient-to-r from-cv-indigo/5 via-cv-purple/5 to-cv-pink/5 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cv-purple" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-cv-indigo/5 via-cv-purple/5 to-cv-pink/5 flex items-center justify-center">
        <div className="text-cv-error-from">Failed to load picks</div>
      </div>
    );
  }

  const { singles = [], parlays = [] } = data || { singles: [], parlays: [] };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cv-indigo/5 via-cv-purple/5 to-cv-pink/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center space-x-2 text-cv-purple hover:text-cv-indigo transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <button
            onClick={processYesterdayResults}
            className="px-4 py-2 bg-gradient-to-r from-cv-indigo/20 to-cv-purple/20 hover:from-cv-indigo/30 hover:to-cv-purple/30 transition-colors rounded-lg text-black border border-white/10"
          >
            Process Yesterday's Results
          </button>
        </div>

        {/* Stats Overview */}
        <div className="bg-gradient-to-r from-cv-indigo via-cv-purple to-cv-pink rounded-lg p-8 shadow-lg mb-8">
          {/* Overall Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="glass-card rounded-lg p-4 bg-white/10">
              <div className="flex items-center gap-3">
                <Activity className="text-cv-success-to" size={24} />
                <div>
                  <p className="text-sm text-white/60">Overall Success</p>
                  <p className="text-2xl font-bold text-white">
                    {calculateSuccess(singles, parlays)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-lg p-4 bg-white/10">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-cv-success-from" size={24} />
                <div>
                  <p className="text-sm text-white/60">Total Picks</p>
                  <p className="text-2xl font-bold text-white">
                    {singles.length + parlays.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-lg p-4 bg-white/10">
              <div className="flex items-center gap-3">
                <Activity className="text-yellow-300" size={24} />
                <div>
                  <p className="text-sm text-white/60">Recent Form</p>
                  <p className="text-2xl font-bold text-white">
                    {calculateRecentForm(singles, parlays)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Category Stats */}
          <div className="grid grid-cols-3 gap-6">
            {["POINTS", "ASSISTS", "REBOUNDS"].map((category) => (
              <div
                key={category}
                className="glass-card rounded-lg p-4 bg-white/10"
              >
                <h3 className="text-white/60 text-sm mb-2">{category}</h3>
                <p className="text-2xl font-bold text-white">
                  {calculateCategorySuccess(singles, parlays, category)}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Picks Section */}
        <div className="glass-card rounded-lg shadow-sm p-4 bg-gradient-to-r from-cv-indigo/10 via-cv-purple/10 to-cv-pink/10">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-white/[0.02] bg-grid" />
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cv-purple/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-cv-pink/30 blur-3xl" />

          <div className="relative">
            <h2 className="text-xl font-semibold text-black mb-6">
              Today's Picks
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Singles */}
              <div className="glass-card rounded-lg p-4">
                <h3 className="font-medium text-black mb-4 flex items-center justify-between">
                  <span>Singles</span>
                  <span className="text-sm text-black/60">
                    (
                    {
                      singles.filter((pick) =>
                        isToday(new Date(pick.createdAt))
                      ).length
                    }
                    )
                  </span>
                </h3>
                <div className="h-[400px] overflow-y-auto">
                  <PicksList
                    picks={singles.filter((pick) =>
                      isToday(new Date(pick.createdAt))
                    )}
                    isToday={true}
                    onDelete={handleDeletePick}
                    isDeleting={isDeletePickPending}
                  />
                </div>
              </div>

              {/* Parlays */}
              <div className="glass-card rounded-lg p-4">
                <h3 className="font-medium text-black mb-4 flex items-center justify-between">
                  <span>Parlays</span>
                  <span className="text-sm text-black/60">
                    (
                    {
                      parlays.filter((parlay) =>
                        isToday(new Date(parlay.createdAt))
                      ).length
                    }
                    )
                  </span>
                </h3>
                <div className="h-[400px] overflow-y-auto">
                  <ParlayList
                    parlays={parlays.filter((parlay) =>
                      isToday(new Date(parlay.createdAt))
                    )}
                    isToday={true}
                    onDelete={handleDeleteParlay}
                    isDeleting={isDeleteParlayPending}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yesterday's Results Section - Similar Structure */}
        <div className="glass-card rounded-lg shadow-sm p-4 bg-gradient-to-r from-cv-indigo/10 via-cv-purple/10 to-cv-pink/10">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-white/[0.02] bg-grid" />
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cv-purple/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-cv-pink/30 blur-3xl" />

          <div className="relative">
            <h2 className="text-xl font-semibold text-black mb-6">
              Yesterday's Results
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Singles */}
              <div className="glass-card rounded-lg p-4">
                <h3 className="font-medium text-black mb-4 flex items-center justify-between">
                  <span>Singles</span>
                  <span className="text-sm text-black/60">
                    (
                    {
                      singles.filter((pick) =>
                        isYesterday(new Date(pick.createdAt))
                      ).length
                    }
                    )
                  </span>
                </h3>
                <div className="h-[400px] overflow-y-auto">
                  <PicksList
                    picks={singles.filter((pick) =>
                      isYesterday(new Date(pick.createdAt))
                    )}
                    isToday={false}
                  />
                </div>
              </div>

              {/* Parlays */}
              <div className="glass-card rounded-lg p-4">
                <h3 className="font-medium text-black mb-4 flex items-center justify-between">
                  <span>Parlays</span>
                  <span className="text-sm text-black/60">
                    (
                    {
                      parlays.filter((parlay) =>
                        isYesterday(new Date(parlay.createdAt))
                      ).length
                    }
                    )
                  </span>
                </h3>
                <div className="h-[400px] overflow-y-auto">
                  <ParlayList
                    parlays={parlays.filter((parlay) =>
                      isYesterday(new Date(parlay.createdAt))
                    )}
                    isToday={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
