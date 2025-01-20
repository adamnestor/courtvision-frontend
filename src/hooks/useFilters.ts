import { create } from "zustand";

type FilterValue = string | number | boolean | null;

interface FiltersState {
  filters: Record<string, FilterValue>;
  activeFilters: string[];
  setFilter: (key: string, value: FilterValue) => void;
  removeFilter: (key: string) => void;
  clearFilters: () => void;
  toggleFilter: (key: string) => void;
}

export const useFilters = create<FiltersState>((set) => ({
  filters: {},
  activeFilters: [],
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      activeFilters: [...new Set([...state.activeFilters, key])],
    })),
  removeFilter: (key) =>
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: removed, ...rest } = state.filters;
      return {
        filters: rest,
        activeFilters: state.activeFilters.filter((k) => k !== key),
      };
    }),
  clearFilters: () => set({ filters: {}, activeFilters: [] }),
  toggleFilter: (key) =>
    set((state) => ({
      activeFilters: state.activeFilters.includes(key)
        ? state.activeFilters.filter((k) => k !== key)
        : [...state.activeFilters, key],
    })),
}));
