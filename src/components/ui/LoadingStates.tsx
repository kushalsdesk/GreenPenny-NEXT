import { AlertCircle, RefreshCw } from 'lucide-react';

export function PageLoader() {
  return (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-navy-lighter border-t-primary" />
        <p className="text-sm text-slate-400">Loading overview...</p>
      </div>
    </div>
  );
}

interface PageErrorProps {
  message?: string;
  onRetry: () => void;
}

export function PageError({ message = 'An error occurred while loading data.', onRetry }: PageErrorProps) {
  return (
    <div className="flex h-full min-h-[400px] w-full flex-col items-center justify-center rounded-xl border border-red-500/10 bg-red-500/5 p-8 text-center text-red-400">
      <AlertCircle className="mb-4 h-10 w-10 text-red-500" />
      <h3 className="mb-2 text-lg font-medium text-slate-200">Something went wrong</h3>
      <p className="mb-6 text-sm text-slate-400 max-w-md">{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 rounded-lg bg-navy-lighter px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-navy-light hover:text-white"
      >
        <RefreshCw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}
