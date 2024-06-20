import { useState, useEffect } from "react";

import { loginUser as loginUserApi, fetchUsers } from "../api/userApi";
import AuthContext from "../hooks/authFastRefreshHook";

const AuthContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.log(error, "--- ERROR ---");
      }
    };
    fetchData();
  }, []);

  const login = async (formData) => {
    const response = await loginUserApi(formData);
    console.log(response);
    const loggedInUser = response.user;
    console.log(loggedInUser);
    setCurrentUser(loggedInUser);
    return loggedInUser;
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
