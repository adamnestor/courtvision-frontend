import { LucideIcon } from "lucide-react";

interface StatItem {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
}

interface StatsGridProps {
  items: StatItem[];
  columns?: 2 | 3 | 4;
}

export const StatsGrid = ({ items, columns = 3 }: StatsGridProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
      {items.map((item, index) => (
        <div key={index} className="glass-card rounded-lg p-4">
          <div className="flex items-center gap-3">
            <item.icon className="text-primary" size={24} />
            <div>
              <p className="text-sm text-muted-foreground">{item.title}</p>
              <p className="text-2xl font-bold">{item.value}</p>
              {item.description && (
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
