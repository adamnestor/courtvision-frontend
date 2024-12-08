import { PlayerDetailStats } from "../../types/player";
import { PlusCircle, ListPlus } from "lucide-react";
import { useParlayBuilder } from "../../context/ParlayBuilderContext";
import { v4 as uuidv4 } from "uuid";
import { PickCategory } from "../../types/parlay";
import { toast } from "react-hot-toast";
import { createSinglePick } from "../../services/api";

interface PlayerDetailHeaderProps {
  stats: PlayerDetailStats;
}

export const PlayerDetailHeader = ({ stats }: PlayerDetailHeaderProps) => {
  const { player, summary } = stats;
  const { addPick } = useParlayBuilder();

  const handleAddToParlay = () => {
    addPick({
      id: uuidv4(),
      playerId: player.playerId,
      playerName: `${player.firstName} ${player.lastName}`,
      team: player.teamAbbreviation,
      opponent: stats.games[0]?.opponent || "", // Get latest opponent
      category: summary.category as PickCategory,
      threshold: summary.threshold,
      hitRate: summary.hitRate,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSinglePick = async () => {
    try {
      const response = await createSinglePick({
        playerId: player.playerId,
        category: summary.category as PickCategory,
        threshold: summary.threshold,
        hitRateAtPick: summary.hitRate,
        isParlay: false,
      });

      if (response.error) {
        toast.error(response.error);
        return;
      }

      toast.success("Pick saved successfully!");
    } catch (error) {
      toast.error("Failed to save pick");
      console.error("Error saving pick:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        {/* Left side - Player info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {player.firstName} {player.lastName}
          </h1>
          <div className="text-gray-500 dark:text-gray-400">
            {player.teamAbbreviation} | {player.position}
          </div>
        </div>

        {/* Middle - Hit Rate info */}
        <div className="text-center">
          <div className="text-md text-gray-500 dark:text-gray-400 mb-1">
            Hit Rate ({summary.threshold}+ {summary.category.toLowerCase()})
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {summary.hitRate.toFixed(1)}%
            </span>
            <span className="text-2xl text-gray-900 dark:text-white">
              Avg: {summary.average.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Right side - Buttons with label */}
        <div className="text-center">
          <div className="text-md text-gray-500 dark:text-gray-400 mb-1">
            Picks
          </div>
          <div className="flex items-center gap-3 mb-1">
            <button
              title="Save Single Pick"
              className="hover:text-green-600 transition-colors"
              onClick={handleSinglePick}
            >
              <PlusCircle size={24} />
            </button>
            <button
              title="Add to Parlay"
              className="hover:text-blue-600 transition-colors"
              onClick={handleAddToParlay}
            >
              <ListPlus size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
