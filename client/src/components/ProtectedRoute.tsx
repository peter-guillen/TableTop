import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../hooks/authFastRefreshHook";
import { LoadingSpinner } from "./LoadingSpinner";

interface;

export const ProtectedRoute = ({ children, roles }) => {
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
