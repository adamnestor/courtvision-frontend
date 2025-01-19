import { create } from "zustand";

interface SearchState {
  searchTerm: string;
  searchHistory: string[];
  recentSearches: string[];
  setSearchTerm: (term: string) => void;
  addToHistory: (term: string) => void;
  clearHistory: () => void;
  removeFromHistory: (term: string) => void;
}

export const useSearch = create<SearchState>((set) => ({
  searchTerm: "",
  searchHistory: [],
  recentSearches: [],
  setSearchTerm: (term) => set({ searchTerm: term }),
  addToHistory: (term) =>
    set((state) => ({
      searchHistory: [...new Set([term, ...state.searchHistory])].slice(0, 10),
      recentSearches: [...new Set([term, ...state.recentSearches])].slice(0, 5),
    })),
  clearHistory: () => set({ searchHistory: [], recentSearches: [] }),
  removeFromHistory: (term) =>
    set((state) => ({
      searchHistory: state.searchHistory.filter((t) => t !== term),
      recentSearches: state.recentSearches.filter((t) => t !== term),
    })),
}));
