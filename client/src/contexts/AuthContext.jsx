import { useState, useEffect } from "react";

import { loginUser as loginUserApi, fetchUsers } from "../api/userApi";
import AuthContext from "../hooks/authFastRefreshHook";

const AuthContextProvider = ({ children }) => {
  // Update the users state via the useEffect
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const mockToken = "mock-token-123";

  // Fetch the user data from the userApi component
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    fetchData();
  }, []);

  const login = async (formData) => {
    // Get the data from the login function in the userApi
    const response = await loginUserApi(formData);
    if (response.success) {
      const loggedInUser = {
        id: response.user._id,
        username: response.user.username,
        email: response.user.email,
        token: mockToken,
        // token: response.token,
        role: response.user.role,
      };
      setCurrentUser(loggedInUser);
      return { success: true, user: loggedInUser };
    } else {
      console.error("Login failed", response.message);
      return { success: false, message: response.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ users, login, logout, currentUser, token: mockToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
