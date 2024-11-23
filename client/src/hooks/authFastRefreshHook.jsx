import { createContext, useState, useEffect } from "react";
import { logoutUser } from "../api/userApi";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await checkAuthStatus();
      if (response.isAuthenticated) {
        setUser(response.user);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

const AuthContext = createContext();

export default AuthContext;
