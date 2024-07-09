import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, role }) => {
//   const { currentUser } = useContext(AuthContext);

//   if (!currentUser) {
//     return <Navigate to="/login" />;
//   }

//   if (role && currentUser.role !== role) {
//     return <Navigate to="/forbidden" />;
//   }

//   return children;
// };

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
