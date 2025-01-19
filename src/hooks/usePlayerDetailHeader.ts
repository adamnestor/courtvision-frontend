import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSinglePick } from "../services/api";
import { toast } from "react-hot-toast";
import { PickCategory } from "../types/parlay";

export function usePlayerDetailHeader(playerId: number) {
  const queryClient = useQueryClient();

  const createPickMutation = useMutation({
    mutationFn: (data: {
      category: PickCategory;
      threshold: number;
      hitRate: number;
    }) =>
      createSinglePick({
        playerId,
        ...data,
        isParlay: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["picks"] });
      toast.success("Pick created successfully!");
    },
    onError: () => {
      toast.error("Failed to create pick");
    },
  });

  return {
    createPick: createPickMutation.mutate,
    isCreating: createPickMutation.isPending,
  };
}
