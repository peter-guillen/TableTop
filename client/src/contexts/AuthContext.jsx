import { useState, useEffect } from "react";
import {
  loginUser as loginUserApi,
  fetchUsers,
  logoutUser as logoutUserApi,
  checkAuthStatus,
} from "../api/userApi";
import AuthContext from "../hooks/authFastRefreshHook";

const AuthContextProvider = ({ children }) => {
  // Update the users state via the useEffect
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  // const mockToken = "mock-token-123";

  // Fetch the user data from the userApi component
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchUsers();
      console.log(fetchedUsers, "FETCHED USERS");
      setUsers(fetchedUsers);
    };
    fetchData();
  }, []);

  console.log(users, currentUser);
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const response = await checkAuthStatus();
  //     if (response.isAuthenticated) {
  //       setCurrentUser(response.user);
  //     }
  //   };
  //   checkAuth();
  // }, []);
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const response = await fetch("http://localhost:1234/api/users/me", {
  //       credentials: "include",
  //     });
  //     if (response.ok) {
  //       const user = await response.json();
  //       console.log(user);
  //       setCurrentUser(user);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await fetch("http://localhost:1234/api/users/me", {
  //         credentials: "include",
  //       });
  //       if (response.ok) {
  //         const user = await response.json();
  //         setCurrentUser(user);
  //       } else {
  //         setCurrentUser(null);
  //       }
  //     } catch (error) {
  //       console.error("Failed to check authentication:", error);
  //       setCurrentUser(null);
  //     }
  //   };
  //   checkAuth();
  // }, []);

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
      value={{ users, setUsers, currentUser, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
