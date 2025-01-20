import { LoaderCircle } from "lucide-react";
import { cn } from "../../lib/utils";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullscreen?: boolean;
}

export const LoadingState = ({
  message = "Loading...",
  size = "md",
  fullscreen = false,
}: LoadingStateProps) => {
  return (
    <div
      data-testid="loading-container"
      className={cn(
        "flex flex-col items-center justify-center min-h-[200px] p-4",
        fullscreen && "fixed inset-0"
      )}
    >
      <div className="flex items-center justify-center">
        <LoaderCircle
          aria-label="loading"
          className={cn(
            "animate-spin text-gray-500",
            size === "sm" && "h-8 w-8",
            size === "md" && "h-10 w-10",
            size === "lg" && "h-12 w-12"
          )}
        />
      </div>
      <p className="mt-4 text-muted-foreground">{message}</p>
    </div>
  );
};
