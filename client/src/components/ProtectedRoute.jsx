import { useContext } from "react";
import AuthContext from "../hooks/authFastRefreshHook";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const { currentUser } = useContext(AuthContext);
  console.log("Current User", currentUser);
  console.log("Required Roles:", roles);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default ProtectedRoute;
