import { XCircle, X, Trash2 } from "lucide-react";
import { useParlayBuilder } from "../../context/ParlayBuilderContext";
import { toast } from "react-hot-toast";
import { createParlay } from "../../services/api";

export const ParlayBuilderPanel = () => {
  const { state, removePick, clearPicks, togglePanel } = useParlayBuilder();
  const { picks, isOpen } = state;

  const handleSaveParlay = async () => {
    try {
      if (picks.length < 2) {
        toast.error("Parlays must have at least 2 picks");
        return;
      }

      const pickRequests = picks.map((pick) => ({
        playerId: pick.playerId,
        category: pick.category,
        threshold: pick.threshold,
        hitRateAtPick: pick.hitRate,
        isParlay: true,
      }));

      const response = await createParlay(pickRequests);

      if (response.data) {
        toast.success("Parlay saved successfully!");
        clearPicks();
        togglePanel();
      } else {
        toast.error(response.message || "Failed to save parlay");
      }
    } catch (error) {
      console.error("Error saving parlay:", error);
      toast.error("Failed to save parlay");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-[#7c3aed] bg-opacity-95 backdrop-blur-sm shadow-lg transform transition-transform duration-300 ease-in-out">
      {/* Header */}
      <div className="p-4 border-b border-white/20 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">
          Building Parlay ({picks.length} picks)
        </h2>
        <button
          onClick={togglePanel}
          className="text-white/60 hover:text-white transition-colors"
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
          <div className="text-center text-white/60 py-8">
            No picks added to parlay
          </div>
        ) : (
          picks.map((pick) => (
            <div
              key={pick.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-white">{pick.playerName}</div>
                  <div className="text-sm text-white/60">
                    {pick.threshold}+ {pick.category.toLowerCase()} {pick.hitRate}%
                  </div>
                  <div className="text-xs text-white/40">
                    {pick.team} {pick.opponent}
                  </div>
                </div>
                <button
                  onClick={() => removePick(pick.id)}
                  className="text-white/40 hover:text-white/80 transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20 bg-[#7c3aed]">
        <div className="space-y-2">
          <button
            onClick={handleSaveParlay}
            className="w-full py-2 px-4 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium"
            disabled={picks.length < 2}
          >
            Save Parlay
          </button>
          {picks.length > 0 && (
            <button
              onClick={clearPicks}
              className="w-full py-2 px-4 text-white/60 hover:text-white flex items-center justify-center gap-2 transition-colors"
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