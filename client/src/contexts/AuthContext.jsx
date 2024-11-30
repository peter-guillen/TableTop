// import { createContext, useState, useEffect, useCallback } from "react";
// import {
//   fetchUsers,
//   createUser as createUserApi,
//   loginUser as loginUserApi,
//   logoutUser as logoutUserApi,
// } from "../api/userApi";

// const AuthContext = createContext();

// const AuthContextProvider = ({ children }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const checkAuthStatus = useCallback(async () => {
//     const response = await fetch("http://localhost:1234/api/users/me", {
//       credentials: "include",
//     });

//     if (response.ok) {
//       const loggedInUser = await response.json();
//       setCurrentUser(loggedInUser);
//       setError(null);
//       return { success: true, user: loggedInUser };
//     } else {
//       setCurrentUser(null);
//       setError("Not authenticated");
//       return { success: false, message: "Not authenticated" };
//     }
//   }, []);

//   useEffect(() => {
//     const initializeAuth = async () => {
//       setIsLoading(true);
//       const fetchedUsers = await fetchUsers();
//       setUsers(fetchedUsers);
//       await checkAuthStatus();
//     };
//     initializeAuth();
//   }, [checkAuthStatus]);

//   useEffect(() => {
//     if (!currentUser) return;
//     const refreshInterval = setInterval(checkAuthStatus, 5 * 60 * 1000);
//     return () => clearInterval(refreshInterval);
//   }, [currentUser, checkAuthStatus]);

//   const signup = async (formData) => {
//     setIsLoading(true);
//     const response = await createUserApi(formData);
//     if (response.success) {
//       setUsers([...users, response.user]);
//       await checkAuthStatus();
//       return { success: true };
//     }
//     return { success: false, message: response.message };
//   };

//   const login = async (formData) => {
//     setIsLoading(true);
//     const response = await loginUserApi(formData);
//     if (response?.success) {
//       setCurrentUser(response.user);
//       setError(null);
//       return { success: true, user: response.user };
//     }
//     setError(response?.message || "Login failed");
//     return { success: false, message: response?.message };
//   };

//   const logout = async () => {
//     setIsLoading(true);
//     const response = await logoutUserApi();
//     if (response?.success) {
//       setCurrentUser(null);
//       setError(null);
//       return { success: true };
//     }
//     setError(response?.message || "Logout failed");
//     return { success: false, message: response?.message };
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         users, setUsers,currentUser,setCurrentUser,signup,login,logout,isLoading,error,checkAuthStatus,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthContextProvider };

import { createContext, useState, useEffect, useCallback } from "react";
import {
  fetchUsers,
  createUser as createUserApi,
  // loginUser as loginUserApi,
  logoutUser as logoutUserApi,
} from "../api/userApi";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:1234/api/users/me", {
        credentials: "include",
      });

      if (response.ok) {
        const loggedInUser = await response.json();
        setCurrentUser(loggedInUser);
        setError(null);
        setIsLoading(false);
        return { success: true, user: loggedInUser };
      } else {
        setCurrentUser(null);
        setError("Not authenticated");
        setIsLoading(false);
        return { success: false, message: "Not authenticated" };
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, message: err.message };
    }
  }, []);

  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     try {
  //       setIsLoading(true);
  //       const fetchedUsers = await fetchUsers();
  //       setUsers(fetchedUsers);
  //       await checkAuthStatus();
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   initializeAuth();
  // }, [checkAuthStatus]);

  useEffect(() => {
    if (!currentUser) return;
    const refreshInterval = setInterval(checkAuthStatus, 5 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, [currentUser, checkAuthStatus]);

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
    try {
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
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

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
    // checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
