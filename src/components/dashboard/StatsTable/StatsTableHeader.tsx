export const StatsTableHeader = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 px-6 py-3">
      <div className="grid grid-cols-6 gap-4">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          Player
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          Team
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          Opponent
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          Stat Line
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          Hit Rate
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          Average
        </div>
      </div>
    </div>
  );
};
