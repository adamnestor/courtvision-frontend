export const StatsTableHeader = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 px-6 py-3">
      <div
        className="grid items-center gap-4"
        style={{
          gridTemplateColumns: "250px repeat(6, 1fr)",
        }}
      >
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          Player
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase text-center">
          Team
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase text-center">
          Opponent
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase text-center">
          Stat Line
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase text-center">
          Hit Rate
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase text-center">
          Average
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase text-center">
          Picks
        </div>
      </div>
    </div>
  );
};
