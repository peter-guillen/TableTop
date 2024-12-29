import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";
import { AuthContext } from "../hooks/authFastRefreshHook";

export const ProtectedRoute = ({ children, roles }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/forbidden" />;
  }

  return children;
};
