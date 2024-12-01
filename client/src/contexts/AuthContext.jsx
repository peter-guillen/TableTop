import { createContext, useState, useEffect, useCallback } from "react";
import {
  fetchUsers,
  createUser as createUserApi,
  loginUser as loginUserApi,
  logoutUser as logoutUserApi,
} from "../api/userApi";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const userData = await fetchUsers();
      // console.log(userData);
      setUsers(userData);
    };
    getUsers();
  }, []);

  users.map((user) => console.log(user));

  // const checkAuthStatus = useCallback(async () => {
  //   const response = await fetch("http://localhost:1234/api/users/me", {
  //     credentials: "include",
  //   });

  //   if (response.ok) {
  //     const loggedInUser = await response.json();
  //     setCurrentUser(loggedInUser);
  //     setError(null);
  //     setIsLoading(false);
  //     return { success: true, user: loggedInUser };
  //   } else {
  //     setCurrentUser(null);
  //     setError("Not authenticated");
  //     setIsLoading(false);
  //     return { success: false, message: "Not authenticated" };
  //   }
  // });

  // useEffect(() => {
  //   if (!currentUser) return;
  //   const refreshInterval = setInterval(checkAuthStatus, 1000);
  //   return () => clearInterval(refreshInterval);
  // }, [currentUser, checkAuthStatus]);

  const signup = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await createUserApi(formData);
      if (response.success) {
        setUsers([...users, response.user]);
        await checkAuthStatus();
        return { success: true };
      }
      setError(response.message);
      return { success: false, message: response.message };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (formData) => {
    setIsLoading(true);
    setError(null);
    const response = await loginUserApi(formData);
    if (response?.success) {
      setCurrentUser(response.user);
      return { success: true, user: response.user };
    }
    const errorMessage = response?.message || "Login failed";
    setError(errorMessage);
    return { success: false, message: errorMessage };
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setErrorMessage("");
  //   if (!formData.username || !formData.password) {
  //     setErrorMessage("Please enter both username and password");
  //     return;
  //   }
  //   const response = await loginUser(formData);
  //   // Check if login was successful
  //   if (response.success) {
  //     // Optional: Store user info in localStorage for persistence
  //     localStorage.setItem("user", JSON.stringify(response.user));
  //     navigate("/");
  //   } else {
  //     setErrorMessage(response.message || "Login failed");
  //   }
  // };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await logoutUserApi();
      if (response?.success) {
        setCurrentUser(null);
        return { success: true };
      }
      const errorMessage = response?.message || "Logout failed";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    signup,
    login,
    logout,
    isLoading,
    error,
    // checkUser,
    // checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
