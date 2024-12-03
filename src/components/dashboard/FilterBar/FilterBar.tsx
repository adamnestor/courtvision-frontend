import { useState } from "react";
import { TimePeriodSelect } from "./TimePeriodSelect";
import { CategorySelect } from "./CategorySelect";
import { ThresholdSelect } from "./ThresholdSelect";
import { Category, TimePeriod, Threshold } from "../../../types/dashboard";

export const FilterBar = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("L10");
  const [category, setCategory] = useState<Category>("ALL");
  const [threshold, setThreshold] = useState<Threshold | null>(null);

  const thresholdOptions = {
    POINTS: [10, 15, 20, 25],
    ASSISTS: [2, 4, 6, 8],
    REBOUNDS: [4, 6, 8, 10],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex flex-wrap gap-4">
        <TimePeriodSelect value={timePeriod} onChange={setTimePeriod} />
        <CategorySelect value={category} onChange={setCategory} />
        {category !== "ALL" && (
          <ThresholdSelect
            value={threshold}
            onChange={setThreshold}
            options={
              thresholdOptions[category as keyof typeof thresholdOptions]
            }
          />
        )}
      </div>
    </div>
  );
};
