import { TimePeriodSelect } from "./TimePeriodSelect";
import { CategorySelect } from "./CategorySelect";
import { ThresholdSelect } from "./ThresholdSelect";
import { Category, TimePeriod, Threshold } from "../../../types/dashboard";

interface FilterBarProps {
  timePeriod: TimePeriod;
  category: Category;
  threshold: Threshold | null;
  onTimePeriodChange: (value: TimePeriod) => void;
  onCategoryChange: (value: Category) => void;
  onThresholdChange: (value: Threshold | null) => void;
  availableCategories?: Category[]; // Added this prop
}

export const FilterBar = ({
  timePeriod,
  category,
  threshold,
  onTimePeriodChange,
  onCategoryChange,
  onThresholdChange,
  availableCategories = ["ALL", "POINTS", "ASSISTS", "REBOUNDS"], // Default value
}: FilterBarProps) => {
  const thresholdOptions = {
    POINTS: [10, 15, 20, 25],
    ASSISTS: [2, 4, 6, 8],
    REBOUNDS: [4, 6, 8, 10],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex flex-wrap gap-4">
        <TimePeriodSelect value={timePeriod} onChange={onTimePeriodChange} />
        <CategorySelect
          value={category}
          onChange={onCategoryChange}
          availableCategories={availableCategories}
        />
        {category !== "ALL" && (
          <ThresholdSelect
            value={threshold}
            onChange={onThresholdChange}
            options={
              thresholdOptions[category as keyof typeof thresholdOptions]
            }
          />
        )}
      </div>
    </div>
  );
};
