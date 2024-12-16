import { createContext, useState, useEffect } from "react";
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
    if (!formData.username || !formData.password) {
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
    const response = await logoutUserApi();
    if (response.success) {
      setCurrentUser(null);
      return { success: true };
    }
    const errorMessage = response.message || "Logout failed";
    setError(errorMessage);
    return { success: false, message: errorMessage };
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:1234/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Send cookies with request
        });
        console.log(response);
        console.log(response.message);
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data); // Example: store user info in context or state
        } else {
          setCurrentUser(null); // User is not logged in
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setCurrentUser(null);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
