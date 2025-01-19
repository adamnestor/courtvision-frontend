import { create } from "zustand";

type SortDirection = "asc" | "desc";

interface SortState {
  field: string | null;
  direction: SortDirection;
  setSorting: (field: string, direction?: SortDirection) => void;
  toggleDirection: () => void;
  clearSort: () => void;
  sortedBy: (field: string) => boolean;
}

export const useSort = create<SortState>((set, get) => ({
  field: null,
  direction: "asc",
  setSorting: (field, direction = "asc") => set({ field, direction }),
  toggleDirection: () =>
    set((state) => ({
      direction: state.direction === "asc" ? "desc" : "asc",
    })),
  clearSort: () => set({ field: null, direction: "asc" }),
  sortedBy: (field) => get().field === field,
}));
