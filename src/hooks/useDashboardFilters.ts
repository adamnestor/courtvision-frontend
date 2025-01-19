import { create } from "zustand";
import { Category, TimePeriod, Threshold } from "../types/dashboard";

interface DashboardFiltersState {
  timePeriod: TimePeriod;
  category: Category;
  threshold: Threshold | null;
  setTimePeriod: (period: TimePeriod) => void;
  setCategory: (category: Category) => void;
  setThreshold: (threshold: Threshold | null) => void;
  resetFilters: () => void;
}

export const useDashboardFilters = create<DashboardFiltersState>((set) => ({
  timePeriod: "L10",
  category: "ALL",
  threshold: null,
  setTimePeriod: (period) => set({ timePeriod: period }),
  setCategory: (category) => set({ category }),
  setThreshold: (threshold) => set({ threshold }),
  resetFilters: () =>
    set({ timePeriod: "L10", category: "ALL", threshold: null }),
}));
