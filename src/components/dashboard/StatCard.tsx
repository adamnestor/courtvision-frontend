import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  Icon: LucideIcon;
  children: React.ReactNode;
}

export const StatCard = ({ title, Icon, children }: StatCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="text-primary" size={24} />
        <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
};
