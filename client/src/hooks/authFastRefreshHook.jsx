import { createContext } from "react";

const AuthProvider = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

const AuthContext = createContext();

export default AuthContext;
