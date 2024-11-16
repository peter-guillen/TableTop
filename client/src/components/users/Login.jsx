import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../hooks/authFastRefreshHook";

import Button from "../Button";
import { fetchUsers, loginUser } from "../../api/userApi"; // Assume 'api' contains our API calls

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const fetchData = async () => {
    try {
      const users = await fetchUsers();
      console.log("Fetched users:", users);
      // Update UI with user data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchData();

  const handleLogin = async (formData) => {
    try {
      const response = await loginUser(formData);
      if (response.message === "Login successful") {
        console.log("User logged in!");
        // Optionally: Redirect user, update UI, etc.
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await loginUser(formData);
    if (response.message === "Login successful") {
      login(response.user); // set user state in AuthContext
      navigate("/");
    } else {
      setErrorMessage(response.message);
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const response = await login(formData);
  //   if (response.success) {
  //     navigate("/");
  //   } else {
  //     setErrorMessage(response.message);
  //   }
  // };

  return (
    <div>
      <div></div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          name="username"
          onChange={handleInputChange}
          value={formData.username}
          id="username"
          type="text"
          placeholder="username"
        />

        <label htmlFor="password">Password:</label>
        <input
          name="password"
          onChange={handleInputChange}
          value={formData.password}
          id="password"
          type="password"
          placeholder="......."
        />
        <Button primary type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Login;
