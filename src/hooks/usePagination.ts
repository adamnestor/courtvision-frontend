import { create } from "zustand";

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  totalPages: number;
}

export const usePagination = create<PaginationState>((set, get) => ({
  currentPage: 1,
  pageSize: 10,
  totalItems: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
  setTotalItems: (total) => set({ totalItems: total }),
  nextPage: () => {
    const { currentPage, totalPages } = get();
    if (currentPage < totalPages) {
      set({ currentPage: currentPage + 1 });
    }
  },
  prevPage: () => {
    const { currentPage } = get();
    if (currentPage > 1) {
      set({ currentPage: currentPage - 1 });
    }
  },
  get totalPages() {
    const { totalItems, pageSize } = get();
    return Math.ceil(totalItems / pageSize);
  },
}));
