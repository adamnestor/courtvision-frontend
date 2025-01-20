import { LoadingSpinner } from "../../components/shared/LoadingSpinner";

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay = ({
  message = "Loading...",
}: LoadingOverlayProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};
