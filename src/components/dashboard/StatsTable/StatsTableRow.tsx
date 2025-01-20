import { StatsRow } from "../../../types/dashboard";
import { useNavigate } from "react-router-dom";
import { PlusCircle, ListPlus } from "lucide-react";
import { useParlayBuilder } from "../../../context/ParlayBuilderContext";
import { v4 as uuidv4 } from "uuid";
import { PickCategory } from "../../../types/parlay";
import { toast } from "react-hot-toast";
import { createSinglePick } from "../../../services/api";
import { ApiResponse, PickResponse } from "../../../types/api";

interface StatsTableRowProps {
  stat: StatsRow;
}

export const StatsTableRow = ({ stat }: StatsTableRowProps) => {
  const navigate = useNavigate();
  const { addPick } = useParlayBuilder();

  const handleRowClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      e.stopPropagation();
      return;
    }

    const [category, threshold] = stat.statLine.split(" ");
    navigate(`/player/${stat.playerId}`, {
      state: {
        initialCategory: category.toUpperCase(),
        initialThreshold: parseInt(threshold),
      },
    });
  };

  const handleAddToParlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const [category, thresholdStr] = stat.statLine.split(" ");

    addPick({
      id: uuidv4(),
      playerId: stat.playerId,
      playerName: stat.playerName,
      team: stat.team,
      opponent: stat.opponent,
      category: category.toUpperCase() as PickCategory,
      threshold: parseInt(thresholdStr),
      hitRate: stat.hitRate,
      timestamp: new Date().toISOString(),
      confidenceScore: stat.confidenceScore || 0,
    });
  };

  const handleSinglePick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const [category, thresholdStr] = stat.statLine.split(" ");

    try {
      const response: ApiResponse<PickResponse> = await createSinglePick({
        playerId: stat.playerId,
        category: category.toUpperCase() as PickCategory,
        threshold: parseInt(thresholdStr),
        hitRateAtPick: stat.hitRate,
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
    <div
      className="px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={handleRowClick}
    >
      <div
        className="grid items-center gap-4"
        style={{
          gridTemplateColumns: "250px repeat(6, 1fr)",
        }}
      >
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {stat.playerName}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {stat.team}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {stat.opponent}
        </div>
        <div className="text-sm text-gray-900 dark:text-white text-center">
          {stat.statLine}
        </div>
        <div className="text-sm font-semibold text-gray-900 dark:text-white text-center">
          {stat.hitRate}%
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {stat.average.toFixed(1)}
        </div>
        <div className="text-gray-900 dark:text-white flex gap-4 justify-center">
          <button
            title="Save Single Pick"
            className="hover:text-green-600 transition-colors"
            onClick={handleSinglePick}
          >
            <PlusCircle size={18} />
          </button>
          <button
            title="Add to Parlay"
            className="hover:text-blue-600 transition-colors"
            onClick={handleAddToParlay}
          >
            <ListPlus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
