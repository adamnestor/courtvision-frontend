import { useState } from "react";
import { Category } from "../../types/dashboard";

interface PlayerActionsProps {
  onCreatePick: (category: Category, threshold: number) => void;
  isLoading: boolean;
}

export const PlayerActions = ({
  onCreatePick,
  isLoading,
}: PlayerActionsProps) => {
  const [category, setCategory] = useState<Category>("POINTS");
  const [threshold, setThreshold] = useState(15);

  return (
    <div className="bg-card rounded-lg p-4">
      <h3 className="font-semibold mb-4">Create Pick</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full rounded-md border-gray-300"
          >
            <option value="POINTS">Points</option>
            <option value="ASSISTS">Assists</option>
            <option value="REBOUNDS">Rebounds</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Threshold</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full rounded-md border-gray-300"
          />
        </div>

        <button
          onClick={() => onCreatePick(category, threshold)}
          disabled={isLoading}
          className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Pick"}
        </button>
      </div>
    </div>
  );
};
