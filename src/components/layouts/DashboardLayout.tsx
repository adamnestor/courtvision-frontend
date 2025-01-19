import { ReactNode } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useDashboardLayout } from "../../hooks/useDashboardLayout";

interface DashboardLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
}

export const DashboardLayout = ({
  children,
  header,
  sidebar,
}: DashboardLayoutProps) => {
  const { showSidebar } = useDashboardLayout();
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div
      className={`dashboard-layout ${!showSidebar ? "sidebar-collapsed" : ""}`}
    >
      {header && (
        <header className="flex justify-between items-center mb-6">
          {header}
        </header>
      )}
      <div className="flex">
        {sidebar && showSidebar && (
          <aside className="w-64 mr-8">{sidebar}</aside>
        )}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};
