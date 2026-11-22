import { inkSubtle } from "../styles/theme.ts";

interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return <p className={`mt-8 text-center ${inkSubtle}`}>{message}</p>;
};
