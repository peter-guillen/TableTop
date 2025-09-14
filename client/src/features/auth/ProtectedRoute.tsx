import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../features/auth/context/AuthContext";
import { LoadingSpinner } from "../../shared/components/LoadingSpinner";

interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles,
}) => {
  const { currentUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/forbidden" />;
  }

  return children;
};
