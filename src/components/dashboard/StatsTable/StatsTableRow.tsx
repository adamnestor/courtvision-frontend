import { StatsRow } from "../../../types/dashboard";
import { useNavigate } from "react-router-dom";

interface StatsTableRowProps {
  stat: StatsRow;
}

export const StatsTableRow = ({ stat }: StatsTableRowProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/player/${stat.playerId}`);
  };

  return (
    <div
      className="px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <div className="grid grid-cols-6 gap-4 items-center">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {stat.playerName}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {stat.team}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {stat.opponent}
        </div>
        <div className="text-sm text-gray-900 dark:text-white">
          {stat.statLine}
        </div>
        <div className="text-sm font-semibold text-gray-900 dark:text-white">
          {stat.hitRate}%
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {stat.average.toFixed(1)}
        </div>
      </div>
    </div>
  );
};
