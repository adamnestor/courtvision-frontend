import { useParams } from "react-router-dom";
import { PlayerStats } from "../components/player/PlayerStats";
import { PlayerHistory } from "../components/player/PlayerHistory";
import { PlayerActions } from "../components/player/PlayerActions";
import { usePlayerDetails } from "../hooks/usePlayerDetails";
import { LoadingState } from "../components/common/LoadingState";

export const PlayerDetail = () => {
  const { playerId } = useParams();
  const { data: player, isLoading, createPick } = usePlayerDetails(playerId);

  if (isLoading || !player) {
    return <LoadingState message="Loading player details..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{player.name}</h1>

      <div className="space-y-6">
        <PlayerStats stats={player.stats} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <PlayerHistory games={player.recentGames} />
          </div>
          <div>
            <PlayerActions onCreatePick={createPick} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};
