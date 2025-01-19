import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  modalOpen: boolean;
  activeTab: string;
  toggleSidebar: () => void;
  setModalOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
}

export const useUIState = create<UIState>((set) => ({
  sidebarOpen: false,
  modalOpen: false,
  activeTab: "overview",
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setModalOpen: (open) => set({ modalOpen: open }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
