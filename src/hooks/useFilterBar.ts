import { useState } from "react";
import { Category, TimePeriod, Threshold } from "../types/dashboard";

interface UseFilterBarProps {
  initialCategory?: Category;
  initialTimePeriod?: TimePeriod;
  initialThreshold?: Threshold | null;
}

export function useFilterBar({
  initialCategory = "ALL",
  initialTimePeriod = "L10",
  initialThreshold = null,
}: UseFilterBarProps = {}) {
  const [category, setCategory] = useState<Category>(initialCategory);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(initialTimePeriod);
  const [threshold, setThreshold] = useState<Threshold | null>(
    initialThreshold
  );

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setThreshold(
      newCategory === "POINTS"
        ? 15
        : newCategory === "ASSISTS"
        ? 4
        : newCategory === "REBOUNDS"
        ? 8
        : null
    );
  };

  return {
    filters: {
      category,
      timePeriod,
      threshold,
    },
    setTimePeriod,
    handleCategoryChange,
    setThreshold,
  };
}
