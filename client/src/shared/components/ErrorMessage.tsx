import { inkDanger } from "../styles/theme.ts";

interface ErrorMessageProps {
  message?: string;
}

// For a request that failed. A missing record shows the NotFound page instead
export const ErrorMessage = ({
  message = "Something went wrong.",
}: ErrorMessageProps) => {
  return (
    <p role="alert" className={`py-16 text-center ${inkDanger}`}>
      {message}
    </p>
  );
};
