import { useState, useEffect } from "react";
import {
  fetchUsers,
  createUser as createUserApi,
  loginUser as loginUserApi,
  logoutUser as logoutUserApi,
} from "../api/userApi";
import { AuthContext } from "../hooks/authFastRefreshHook";

export const AuthContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const userData = await fetchUsers();
      setUsers(userData);
    };
    getUsers();
  }, []);

  const signup = async (formData) => {
    const response = await createUserApi(formData);
    if (response.success) {
      setUsers([...users, response.user]);
      return { success: true };
    }
    setError(response.message);
    return { success: false, message: response.message };
  };

  const login = async (formData) => {
    const response = await loginUserApi(formData);
    if (!formData.email || !formData.password) {
      setError(error.message);
      setErrorMessage("Please enter both username and password");
      return;
    }
    if (response.success) {
      // localStorage.setItem("user", JSON.stringify(response.user));
      setCurrentUser(response.user);
      return { success: true, user: response.user };
    }
    const errorMessage = response.message || "Login failed";
    setError(errorMessage);
    return { success: false, message: errorMessage };
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    setMessage("Successfully logged out!");
    try {
      logoutUserApi();
      setCurrentUser(null);
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || "Logout failed";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:1234/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

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
    errorMessage,
    message,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
