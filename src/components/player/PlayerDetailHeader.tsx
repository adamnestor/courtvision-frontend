import { usePlayerDetailHeader } from "../../hooks/usePlayerDetailHeader";
import { useParlayBuilder } from "../../context/parlay-builder-context";
import { toast } from "react-hot-toast";
import { PlayerDetailStats } from "../../types/player";
import { PickCategory } from "../../types/parlay";

interface PlayerDetailHeaderProps {
  stats: PlayerDetailStats;
}

export const PlayerDetailHeader = ({ stats }: PlayerDetailHeaderProps) => {
  const { player, summary } = stats;
  const { addPick } = useParlayBuilder();
  const { createPick, isCreating } = usePlayerDetailHeader(player.playerId);

  const handleAddToParlay = () => {
    if (summary.category === "ALL") {
      toast.error("Cannot add ALL category to parlay");
      return;
    }

    addPick({
      id: crypto.randomUUID(),
      playerId: stats.player.playerId,
      playerName: `${stats.player.firstName} ${stats.player.lastName}`,
      team: stats.player.teamAbbreviation,
      opponent: stats.games[0]?.opponent || "",
      category: stats.summary.category as PickCategory,
      threshold: stats.threshold,
      hitRate: stats.summary.hitRate,
      timestamp: new Date().toISOString(),
      confidenceScore: stats.summary.confidenceScore || 0,
    });
  };

  const handleSinglePick = () => {
    if (summary.category === "ALL") {
      toast.error("Cannot create pick for ALL category");
      return;
    }

    createPick({
      category: summary.category as PickCategory,
      threshold: summary.threshold,
      hitRate: summary.hitRate,
    });
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">
            {player.firstName} {player.lastName}
          </h1>
          <p className="text-muted-foreground">
            {player.teamAbbreviation} • {player.position}
          </p>
          <div className="flex items-center gap-4">
            <div>Hit Rate: {stats.summary.hitRate}%</div>
            <div>Confidence: {stats.summary.confidenceScore}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAddToParlay}
            className="btn btn-secondary"
            disabled={summary.category === "ALL"}
          >
            Add to Parlay
          </button>
          <button
            onClick={handleSinglePick}
            className="btn btn-primary"
            disabled={isCreating || summary.category === "ALL"}
          >
            {isCreating ? "Creating..." : "Create Single Pick"}
          </button>
        </div>
      </div>
    </div>
  );
};
