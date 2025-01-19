import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DashboardLayout {
  showSidebar: boolean;
  sidebarWidth: number;
  tableCompact: boolean;
  chartHeight: number;
  toggleSidebar: () => void;
  setSidebarWidth: (width: number) => void;
  toggleTableCompact: () => void;
  setChartHeight: (height: number) => void;
}

export const useDashboardLayout = create<DashboardLayout>()(
  persist(
    (set) => ({
      showSidebar: true,
      sidebarWidth: 280,
      tableCompact: false,
      chartHeight: 400,
      toggleSidebar: () =>
        set((state) => ({ showSidebar: !state.showSidebar })),
      setSidebarWidth: (width) => set({ sidebarWidth: width }),
      toggleTableCompact: () =>
        set((state) => ({ tableCompact: !state.tableCompact })),
      setChartHeight: (height) => set({ chartHeight: height }),
    }),
    {
      name: "dashboard-layout",
    }
  )
);
