import { XCircle, X, Trash2 } from "lucide-react";
import { useParlayBuilder } from "../../context/ParlayBuilderContext";
import { useParlay } from "../../hooks/useParlay";
import { toast } from "react-hot-toast";
import { ParlayPick } from "../../types/parlay";

export const ParlayBuilderPanel = () => {
  const { state, removePick, clearPicks, togglePanel } = useParlayBuilder();
  const { picks, isOpen } = state;
  const { createParlay, isCreating } = useParlay();

  const handleSaveParlay = () => {
    if (picks.length < 2) {
      toast.error("Parlays must have at least 2 picks");
      return;
    }
    createParlay(picks);
  };

  const calculateParlayHitRate = (picks: ParlayPick[]): number => {
    if (picks.length === 0) return 0;

    const combinedRate =
      picks.reduce((acc, pick) => acc * (pick.hitRate / 100), 1) * 100;

    return Number(combinedRate.toFixed(1));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Building Parlay ({picks.length} picks)
        </h2>
        {picks.length > 1 && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Combined Hit Rate: {calculateParlayHitRate(picks)}%
          </div>
        )}
        <button
          onClick={togglePanel}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>
      </div>

      {/* Picks List */}
      <div
        className="p-4 space-y-4 overflow-y-auto"
        style={{ height: "calc(100% - 140px)" }}
      >
        {picks.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            No picks added to parlay
          </div>
        ) : (
          picks.map((pick) => (
            <div
              key={pick.id}
              className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex-1">
                <div className="font-medium">{pick.playerName}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {pick.threshold}+ {pick.category.toLowerCase()}({pick.hitRate}
                  % | Confidence: {pick.confidenceScore})
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  {pick.team} {pick.opponent}
                </div>
              </div>
              <button
                onClick={() => removePick(pick.id)}
                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
              >
                <XCircle size={20} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="space-y-2">
          <button
            onClick={handleSaveParlay}
            disabled={isCreating || picks.length < 2}
            className="btn btn-primary w-full"
          >
            {isCreating ? "Saving..." : "Save Parlay"}
          </button>
          {picks.length > 0 && (
            <button
              onClick={clearPicks}
              className="w-full py-2 px-4 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
