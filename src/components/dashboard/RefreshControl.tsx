interface RefreshControlProps {
  interval: number;
  autoRefresh: boolean;
}

export const RefreshControl = ({
  interval,
  autoRefresh,
}: RefreshControlProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {autoRefresh ? `Auto-refresh: ${interval / 1000}s` : "Auto-refresh off"}
      </span>
    </div>
  );
};
