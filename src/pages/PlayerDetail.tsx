import { useParams } from "react-router-dom";
import { usePlayerDetails } from "../hooks/usePlayerDetails";
import { PlayerDetailHeader } from "../components/player/PlayerDetailHeader";
import { PlayerStats } from "../components/player/PlayerStats";
import { PlayerHistory } from "../components/player/PlayerHistory";
import { LoadingSpinner } from "../components/shared/LoadingSpinner";
import { GameResult } from "../types/player";

export function PlayerDetail() {
  const { playerId } = useParams();
  const { data, isLoading } = usePlayerDetails({
    playerId: playerId ? parseInt(playerId, 10) : 0,
  });

  if (isLoading || !data) return <LoadingSpinner />;

  const gameResults: GameResult[] = data.games.map((game) => ({
    id: game.gameId,
    date: game.gameDate,
    opponent: game.opponent,
    statValue: game.selectedStatValue,
    hitThreshold: game.metThreshold,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{`${data.player.firstName} ${data.player.lastName}`}</h1>

      <PlayerDetailHeader stats={data} />

      <PlayerStats
        stats={{
          hitRate: data.summary.hitRate,
          average: data.summary.average,
          gamesPlayed: data.metrics.totalGames,
        }}
      />

      <PlayerHistory games={gameResults} />
    </div>
  );
}
