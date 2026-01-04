import { useState, useEffect, createContext } from "react";
import API_URL from "../../../shared/api/api";
import {
  fetchUsers,
  createUser as createUserApi,
  loginUser as loginUserApi,
  logoutUser as logoutUserApi,
  deleteUser as deleteUserApi,
} from "../../users/api/userApi";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
      setUserList(users);
    };
    getUsers();
  }, []);

  const signup = async (formData) => {
    const response = await createUserApi(formData);
    if (response.success) {
      setUserList([...userList, response.user]);
      return { success: true };
    }
    setError(response.message);
    return { success: false, message: response.message };
  };

  const login = async (formData) => {
    const response = await loginUserApi(formData);
    if (!formData.email || !formData.password) {
      setError("Missing credentials");
      setErrorMessage("Please enter both email and password");
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

  const deleteUser = async (id) => {
    await deleteUserApi(id);
    const updatedUsers = await userList.filter((user) => user._id !== id);
    setUserList(updatedUsers);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/me`, {
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
    userList,
    setUserList,
    currentUser,
    setCurrentUser,
    signup,
    login,
    logout,
    deleteUser,
    isLoading,
    error,
    errorMessage,
    message,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
