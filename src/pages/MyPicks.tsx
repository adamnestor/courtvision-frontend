import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserPicks, deletePick } from "../services/api";
import { PickCard } from "../components/picks/PickCard";
import { PicksFilter } from "../components/picks/PicksFilter";
import { LoadingState } from "../components/common/LoadingState";

const MyPicks = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const queryClient = useQueryClient();

  const { data: picks, isLoading } = useQuery({
    queryKey: ["picks"],
    queryFn: getUserPicks,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePick,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["picks"] });
    },
  });

  if (isLoading) return <LoadingState message="Loading picks..." />;

  const filteredPicks = picks?.data.filter((pick) => {
    if (activeFilter === "active") return !pick.result;
    if (activeFilter === "completed") return pick.result;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Picks</h1>

      <PicksFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPicks?.map((pick) => (
          <PickCard
            key={pick.id}
            pick={pick}
            onDelete={() => deleteMutation.mutate(pick.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPicks;
