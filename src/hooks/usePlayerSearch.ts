import { create } from "zustand";

interface PlayerSearchState {
  searchTerm: string;
  sortBy: "name" | "team" | "position" | "hitRate";
  sortDirection: "asc" | "desc";
  filters: {
    teams: string[];
    positions: string[];
  };
  setSearchTerm: (term: string) => void;
  setSortBy: (field: "name" | "team" | "position" | "hitRate") => void;
  toggleSortDirection: () => void;
  setTeamFilters: (teams: string[]) => void;
  setPositionFilters: (positions: string[]) => void;
  resetFilters: () => void;
}

export const usePlayerSearch = create<PlayerSearchState>((set) => ({
  searchTerm: "",
  sortBy: "hitRate",
  sortDirection: "desc",
  filters: {
    teams: [],
    positions: [],
  },
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSortBy: (field) => set({ sortBy: field }),
  toggleSortDirection: () =>
    set((state) => ({
      sortDirection: state.sortDirection === "asc" ? "desc" : "asc",
    })),
  setTeamFilters: (teams) =>
    set((state) => ({ filters: { ...state.filters, teams } })),
  setPositionFilters: (positions) =>
    set((state) => ({ filters: { ...state.filters, positions } })),
  resetFilters: () =>
    set({ searchTerm: "", filters: { teams: [], positions: [] } }),
}));
