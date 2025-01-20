import { usePicks } from "../hooks/usePicks";
import { PickCard } from "../components/picks/PickCard";
import { UserPickDTO } from "../types/picks";

export function MyPicks() {
  const { singles, deletePick, isLoading } = usePicks();

  const renderPicks = () => {
    if (!singles || singles.length === 0) {
      return <div>No picks found</div>;
    }

    return singles.map((pick: UserPickDTO) => (
      <PickCard
        key={pick.id}
        pick={{
          ...pick,
          hitRate: pick.hitRateAtPick,
          gameTime: pick.createdAt,
          confidenceScore: pick.confidenceScore ?? 0,
          result: pick.result ? "WIN" : pick.result === false ? "LOSS" : null,
        }}
        onDelete={() => deletePick(pick.id)}
        isDeleting={isLoading}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Picks</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {renderPicks()}
      </div>
    </div>
  );
}
