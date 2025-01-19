import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { picksService } from "../services/picksService";
import { UserPickDTO, Parlay } from "../types/picks";
import { toast } from "react-hot-toast";

export function usePicks() {
  const queryClient = useQueryClient();

  const { data: singles = [], isLoading: singlesLoading } = useQuery<
    UserPickDTO[]
  >({
    queryKey: ["singles"],
    queryFn: () => picksService.getSingles(),
  });

  const { data: parlays = [], isLoading: parlaysLoading } = useQuery<Parlay[]>({
    queryKey: ["parlays"],
    queryFn: () => picksService.getParlays(),
  });

  const deleteMutation = useMutation({
    mutationFn: (pickId: string) => picksService.deletePick(pickId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singles"] });
      queryClient.invalidateQueries({ queryKey: ["parlays"] });
      toast.success("Pick deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete pick");
    },
  });

  return {
    singles,
    parlays,
    isLoading: singlesLoading || parlaysLoading,
    deletePick: deleteMutation.mutate,
  };
}
