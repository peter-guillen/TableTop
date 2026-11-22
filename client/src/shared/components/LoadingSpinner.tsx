import { inkSubtle } from "../styles/theme.ts";

export const LoadingSpinner = () => {
  return (
    <div
      role="status"
      className={`flex items-center justify-center gap-3 py-16 ${inkSubtle}`}
    >
      <span
        aria-hidden="true"
        className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"
      />
      <span>Loading...</span>
    </div>
  );
};
