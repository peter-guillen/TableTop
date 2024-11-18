import { useState, useEffect } from "react";
import {
  fetchUsers,
  createUser as createUserApi,
  loginUser as loginUserApi,
  logoutUser as logoutUserApi,
} from "../api/userApi";
import AuthContext from "../hooks/authFastRefreshHook";

const AuthContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch the user data from the userApi component and SET the current user
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
      const response = await fetch("http://localhost:1234/api/users/me", {
        credentials: "include", // Ensure cookies are sent with the request
      });

      if (response.ok) {
        const loggedInUser = await response.json();
        setCurrentUser(loggedInUser);
      } else {
        setCurrentUser(null); // Clear currentUser if no logged-in user is found
      }
    };

    fetchData();
  }, []);

  const signup = async (formData) => {
    const response = await createUserApi(formData);
    if (response.success) {
      setUsers([...users, response.user]);
      return { success: true };
    } else {
      return { success: false, message: response.message };
    }
  };

  const login = async (formData) => {
    const response = await loginUserApi(formData);
    if (response && response.success) {
      setCurrentUser(response.user);
      return { success: true, user: response.user };
    } else {
      return { success: false, message: response.message };
    }
  };

  const logout = async () => {
    const response = await logoutUserApi();
    if (response && response.success) {
      setCurrentUser(null);
      return { success: true };
    } else {
      return { success: false, message: response.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
