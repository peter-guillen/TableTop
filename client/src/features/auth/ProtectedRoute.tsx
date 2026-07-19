import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../auth/api/authApi.tsx";
import { LoadingSpinner } from "../../shared/components/LoadingSpinner";
import type { UserType } from "../users/userTypes.ts";

interface ProtectedRouteProps {
  children: ReactElement;
  roles?: UserType["role"][];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles,
}) => {
  const { data: currentUser, isLoading, isFetching } = useGetCurrentUserQuery();

  if (isLoading || isFetching) return <LoadingSpinner />;
  if (!currentUser) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};
