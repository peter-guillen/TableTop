// import { useState, useEffect } from "react";
// import {
//   fetchUsers,
//   createUser as createUserApi,
//   loginUser as loginUserApi,
//   logoutUser as logoutUserApi,
// } from "../api/userApi";
// import AuthContext from "../hooks/authFastRefreshHook";

// const AuthContextProvider = ({ children }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   // Fetch the user data from the userApi component and SET the current user
//   useEffect(() => {
//     const fetchData = async () => {
//       const fetchedUsers = await fetchUsers();
//       setUsers(fetchedUsers);
//       const response = await fetch("http://localhost:1234/api/users/me", {
//         credentials: "include", // Ensure cookies are sent with the request
//       });

//       if (response.ok) {
//         const loggedInUser = await response.json();
//         setCurrentUser(loggedInUser);
//       } else {
//         setCurrentUser(null); // Clear currentUser if no logged-in user is found
//       }
//     };

//     fetchData();
//   }, []);

//   const signup = async (formData) => {
//     const response = await createUserApi(formData);
//     if (response.success) {
//       setUsers([...users, response.user]);
//       return { success: true };
//     } else {
//       return { success: false, message: response.message };
//     }
//   };

//   const login = async (formData) => {
//     const response = await loginUserApi(formData);
//     if (response && response.success) {
//       setCurrentUser(response.user);
//       return { success: true, user: response.user };
//     } else {
//       return { success: false, message: response.message };
//     }
//   };

//   const logout = async () => {
//     const response = await logoutUserApi();
//     if (response && response.success) {
//       setCurrentUser(null);
//       return { success: true };
//     } else {
//       return { success: false, message: response.message };
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         users,
//         setUsers,
//         currentUser,
//         setCurrentUser,
//         signup,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;
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

  // Memoized function to check authentication status
  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:1234/api/users/me", {
        credentials: "include",
      });

      if (response.ok) {
        const loggedInUser = await response.json();
        setCurrentUser(loggedInUser);
        setError(null);
        return { success: true, user: loggedInUser };
      } else {
        setCurrentUser(null);
        setError("Not authenticated");
        return { success: false, message: "Not authenticated" };
      }
    } catch (error) {
      setCurrentUser(null);
      setError(error.message);
      return { success: false, message: error.message };
    }
  }, []);

  // Initial data fetch and auth check
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        // Fetch all users
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);

        // Check authentication status
        await checkAuthStatus();
      } catch (error) {
        console.error("Initialization error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [checkAuthStatus]);

  // Auto refresh authentication periodically (optional)
  useEffect(() => {
    if (!currentUser) return;

    const refreshInterval = setInterval(checkAuthStatus, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(refreshInterval);
  }, [currentUser, checkAuthStatus]);

  const signup = async (formData) => {
    try {
      setIsLoading(true);
      const response = await createUserApi(formData);
      if (response.success) {
        setUsers([...users, response.user]);
        await checkAuthStatus(); // Verify authentication after signup
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (formData) => {
    try {
      setIsLoading(true);
      const response = await loginUserApi(formData);
      console.log(response, "----------------");
      if (response?.success) {
        setCurrentUser(response.user);
        setError(null);
        return { success: true, user: response.user };
      }
      setError(response?.message || "Login failed");
      return { success: false, message: response?.message };
    } catch (error) {
      setError(error.message);
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await logoutUserApi();
      if (response?.success) {
        setCurrentUser(null);
        setError(null);
        return { success: true };
      }
      setError(response?.message || "Logout failed");
      return { success: false, message: response?.message };
    } catch (error) {
      setError(error.message);
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
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
        isLoading,
        error,
        checkAuthStatus, // Expose the refresh function
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
