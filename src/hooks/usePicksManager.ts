import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { picksService } from "../services/picksService";
import { toast } from "react-hot-toast";
import { UserPickDTO } from "../types/picks";

interface PicksData {
  singles: UserPickDTO[];
  parlays: Array<{
    id: string;
    picks: UserPickDTO[];
  }>;
}

export function usePicksManager() {
  const queryClient = useQueryClient();

  const { data = { singles: [], parlays: [] }, isLoading } =
    useQuery<PicksData>({
      queryKey: ["picks"],
      queryFn: async () => {
        const response = await picksService.getUserPicks();
        return response ?? { singles: [], parlays: [] };
      },
    });

  // Delete mutations
  const deleteSingleMutation = useMutation({
    mutationFn: picksService.deletePick,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["picks"] });
      toast.success("Pick deleted successfully");
    },
    onError: () => toast.error("Failed to delete pick"),
  });

  const deleteParlayMutation = useMutation({
    mutationFn: picksService.deleteParlay,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["picks"] });
      toast.success("Parlay deleted successfully");
    },
    onError: () => toast.error("Failed to delete parlay"),
  });

  // Calculate success rates
  const calculateSuccess = (category?: string) => {
    const filteredPicks = category
      ? data.singles.filter((pick: UserPickDTO) => pick.category === category)
      : data.singles;

    if (!filteredPicks.length) return 0;

    const successfulPicks = filteredPicks.filter(
      (pick: UserPickDTO) => pick.result
    ).length;
    return ((successfulPicks / filteredPicks.length) * 100).toFixed(1);
  };

  const getFilteredPicks = (category: string) => {
    if (!data.singles) return [];
    return data.singles.filter(
      (pick: UserPickDTO) => pick.category === category
    );
  };

  const getPicksByResult = (result: boolean) => {
    if (!data.singles) return [];
    return data.singles.filter((pick: UserPickDTO) => pick.result === result);
  };

  return {
    picks: data,
    isLoading,
    deletePick: deleteSingleMutation.mutate,
    deleteParlay: deleteParlayMutation.mutate,
    isDeletingPick: deleteSingleMutation.isPending,
    isDeletingParlay: deleteParlayMutation.isPending,
    calculateSuccess,
    getFilteredPicks,
    getPicksByResult,
  };
}
