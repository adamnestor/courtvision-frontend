import { Category, TimePeriod } from "../../types/dashboard";

interface FilterBarProps {
  timePeriod: TimePeriod;
  category: Category;
  threshold: number | null;
  onTimePeriodChange: (period: TimePeriod) => void;
  onCategoryChange: (category: Category) => void;
  onThresholdChange: (threshold: number) => void;
  availableCategories: Category[];
}

const getCategoryThresholdRange = (category: Category) => {
  switch (category) {
    case "POINTS":
      return "15-30";
    case "ASSISTS":
      return "5-15";
    case "REBOUNDS":
      return "5-20";
    default:
      return "";
  }
};

export const FilterBar = ({
  timePeriod,
  category,
  threshold,
  onTimePeriodChange,
  onCategoryChange,
  onThresholdChange,
  availableCategories,
}: FilterBarProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex flex-wrap gap-4" data-testid="filter-container">
        <label className="flex flex-col gap-1">
          <span className="text-sm">Time Period</span>
          <select
            aria-label="time period"
            value={timePeriod}
            onChange={(e) => onTimePeriodChange(e.target.value as TimePeriod)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm
                dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          >
            <option value="L5">Last 5</option>
            <option value="L10">Last 10</option>
            <option value="L15">Last 15</option>
            <option value="L20">Last 20</option>
            <option value="SEASON">Season</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Category</span>
          <select
            aria-label="category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as Category)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm
                dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          >
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "ALL" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Threshold</span>
          <select
            aria-label="threshold"
            value={threshold || ""}
            onChange={(e) => onThresholdChange(Number(e.target.value))}
            disabled={category === "ALL"}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm
                dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          >
            <option value="10">10+</option>
            <option value="15">15+</option>
            <option value="20">20+</option>
            <option value="25">25+</option>
          </select>
        </label>

        {category !== "ALL" && (
          <span className="text-sm text-muted-foreground">
            {`Suggested: ${getCategoryThresholdRange(category)}`}
          </span>
        )}
      </div>
    </div>
  );
};
