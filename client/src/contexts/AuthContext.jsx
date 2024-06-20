import { useState, useEffect } from "react";

import { loginUser as loginUserApi, fetchUsers } from "../api/userApi";
import AuthContext from "../hooks/authFastRefreshHook";

const AuthContextProvider = ({ children }) => {
  // Update the users state via the useEffect
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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
        username: response.user.username,
        email: response.user.email,
      };
      setCurrentUser(loggedInUser);
      return loggedInUser;
    } else {
      console.log("Login failed");
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ users, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
