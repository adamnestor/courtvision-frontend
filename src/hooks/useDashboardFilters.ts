import { useState, useCallback } from "react";
import { Category, TimePeriod, Threshold } from "../types/dashboard";

export const useDashboardFilters = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("L10");
  const [category, setCategory] = useState<Category>("ALL");
  const [threshold, setThreshold] = useState<Threshold | null>(null);

  const handleCategoryChange = useCallback((newCategory: Category) => {
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
  }, []);

  const resetFilters = useCallback(() => {
    setTimePeriod("L10");
    setCategory("ALL");
    setThreshold(null);
  }, []);

  return {
    filters: {
      timePeriod,
      category,
      threshold,
    },
    setTimePeriod,
    handleCategoryChange,
    resetFilters,
  };
};
