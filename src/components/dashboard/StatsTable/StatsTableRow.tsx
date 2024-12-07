import { StatsRow } from "../../../types/dashboard";
import { useNavigate } from "react-router-dom";
import { PlusCircle, ListPlus } from "lucide-react";

interface StatsTableRowProps {
  stat: StatsRow;
}

export const StatsTableRow = ({ stat }: StatsTableRowProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const [category, threshold] = stat.statLine.split(" ");
    navigate(`/player/${stat.playerId}`, {
      state: {
        initialCategory: category.toUpperCase(),
        initialThreshold: parseInt(threshold),
      },
    });
  };

  return (
    <div
      className="px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={handleClick}
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
          >
            <PlusCircle size={18} />
          </button>
          <button
            title="Add to Parlay"
            className="hover:text-blue-600 transition-colors"
          >
            <ListPlus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
