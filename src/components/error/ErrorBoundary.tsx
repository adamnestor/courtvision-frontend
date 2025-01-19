import { Component, ErrorInfo, ReactNode } from "react";
import { useErrorBoundary } from "../../hooks/useErrorBoundary";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    useErrorBoundary.getState().setError(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback />;
    }

    return this.props.children;
  }
}

const ErrorFallback = () => {
  const { error, resetErrorBoundary } = useErrorBoundary();

  return (
    <div className="error-boundary p-4 border border-destructive rounded-md">
      <h2 className="text-lg font-semibold text-destructive">
        Something went wrong
      </h2>
      <pre className="mt-2 text-sm">{error?.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
      >
        Try again
      </button>
    </div>
  );
};
